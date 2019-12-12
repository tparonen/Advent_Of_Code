const parameterModes = {
    POSITION_MODE: 'POSITION_MODE',
    IMMEDIATE_MODE: 'IMMEDIATE_MODE',
    RELATIVE_MODE: 'RELATIVE_MODE'
};

class Instruction {
    constructor(operation, params) {
        this.opcode = operation.opcode;
        this.parameterModes = operation.parameterModes;
        this.params = params;
    }

    readParameterValue(program, position) {
        const parameter = this.__getParameter(position);
        const parameterMode = this.__getParameterMode(position);

        switch (parameterMode) {
            case parameterModes.POSITION_MODE:
                return program.readValueAtAddress(parameter);
            case parameterModes.IMMEDIATE_MODE:
                return parameter;
            case parameterModes.RELATIVE_MODE:
                return program.readValueAtAddressRelative(parameter);
            default:
                return program.readValueAtAddress(parameter);
        }
    }

    readAddressParameter(program, position) {
        const parameter = this.__getParameter(position);
        const parameterMode = this.__getParameterMode(position);

        switch (parameterMode) {
            case parameterModes.POSITION_MODE:
                return parameter;
            case parameterModes.IMMEDIATE_MODE:
                throw new Error('Address parameter cannot be in immediate mode');
            case parameterModes.RELATIVE_MODE:
                return parameter + program.relativeBase;
            default:
                return parameter;
        }
    }

    __getParameter(position) {
        return this.params[position + 1];
    }

    __getParameterMode(position) {
        return this.parameterModes[position];
    }
}

class AddInstruction extends Instruction {

    async process(program) {
        const inputValueOne = this.readParameterValue(program, 0);
        const inputValueTwo = this.readParameterValue(program, 1);
        const outputAddress = this.readAddressParameter(program, 2);
        program.writeValueAtAddress(outputAddress, inputValueOne + inputValueTwo);
        program.pc += this.params.length;
    }
}

class MultiplyInstruction extends Instruction {

    async process(program) {
        const inputValueOne = this.readParameterValue(program, 0);
        const inputValueTwo = this.readParameterValue(program, 1);
        const outputAddress = this.readAddressParameter(program, 2);
        program.writeValueAtAddress(outputAddress, inputValueOne * inputValueTwo);
        program.pc += this.params.length;
    }

}

class InputInstruction extends Instruction {

    async promptInteger(program) {
        return new Promise((resolve, reject) => {
            program.readline.question('INPUT: ', (answer) => {
                const integerToStore = parseInt(answer, 10);
                if (isNaN(integerToStore)) {
                    console.log('Failed to parse input value');
                    reject(`Input value '${answer}' not an integer`);
                } else {
                    resolve(integerToStore);
                }
            });
        });
    }

    readArgument(program) {
        return program.args.shift();
    }

    async process(program) {
        let programInput = this.readArgument(program);
        if (programInput === undefined) {
            programInput = await this.promptInteger(program);
        }
        const outputAddress = this.readAddressParameter(program, 0);
        program.writeValueAtAddress(outputAddress, programInput);
        program.pc += this.params.length;
    }
}

class OutputInstruction extends Instruction {

    async process(program) {
        const outputValue = this.readParameterValue(program, 0);
        program.outputArgs.push(outputValue);
        program.pc += this.params.length;
    }
}

class JumpIfTrueInstruction extends Instruction {

    async process(program) {
        const inputValueOne = this.readParameterValue(program, 0);
        const inputValueTwo = this.readParameterValue(program, 1);

        if (inputValueOne !== 0) {
            program.pc = inputValueTwo;
        } else {
            program.pc += this.params.length;
        }
    }
}

class JumpIfFalseInstruction extends Instruction {

    async process(program) {
        const inputValueOne = this.readParameterValue(program, 0);
        const inputValueTwo = this.readParameterValue(program, 1);

        if (inputValueOne === 0) {
            program.pc = inputValueTwo;
        } else {
            program.pc += this.params.length;
        }
    }
}

class LessThanInstruction extends Instruction {

    async process(program) {
        const inputValueOne = this.readParameterValue(program, 0);
        const inputValueTwo = this.readParameterValue(program, 1);
        const outputAddress = this.readAddressParameter(program, 2);

        if (inputValueOne < inputValueTwo) {
            program.writeValueAtAddress(outputAddress, 1);
        } else {
            program.writeValueAtAddress(outputAddress, 0);
        }

        program.pc += this.params.length;
    }
}

class EqualsInstruction extends Instruction {

    async process(program) {
        const inputValueOne = this.readParameterValue(program, 0);
        const inputValueTwo = this.readParameterValue(program, 1);
        const outputAddress = this.readAddressParameter(program, 2);

        if (inputValueOne === inputValueTwo) {
            program.writeValueAtAddress(outputAddress, 1);
        } else {
            program.writeValueAtAddress(outputAddress, 0);
        }

        program.pc += this.params.length;
    }
}

class RelativeBaseOffsetInstruction extends Instruction {

    async process(program) {
        const inputValueOne = this.readParameterValue(program, 0);

        program.relativeBase += inputValueOne;

        program.pc += this.params.length;
    }
}

class TerminateInstruction extends Instruction {

    async process(program) {
        program.terminate();
    }
}

module.exports.parameterModes = parameterModes;

module.exports.AddInstruction = AddInstruction;
module.exports.MultiplyInstruction = MultiplyInstruction;
module.exports.InputInstruction = InputInstruction;
module.exports.OutputInstruction = OutputInstruction;
module.exports.JumpIfTrueInstruction = JumpIfTrueInstruction;
module.exports.JumpIfFalseInstruction = JumpIfFalseInstruction;
module.exports.LessThanInstruction = LessThanInstruction;
module.exports.EqualsInstruction = EqualsInstruction;
module.exports.RelativeBaseOffsetInstruction = RelativeBaseOffsetInstruction;
module.exports.TerminateInstruction = TerminateInstruction;