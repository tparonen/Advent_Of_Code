class Instruction {
    constructor(opcode, params) {
        this.opcode = opcode;
        this.params = params;
    }
}

class AddInstruction extends Instruction {
    constructor(opcode, params) {
        super(opcode, params);
    }

    process(program) {
        const inputValueOne = program.readValueAtAddress(this.params[0]);
        const inputValueTwo = program.readValueAtAddress(this.params[1]);
        const outputAddress = this.params[2];
        program.writeValueAtAddress(outputAddress, inputValueOne + inputValueTwo);
    }
}

class MultiplyInstruction extends Instruction {
    constructor(opcode, params) {
        super(opcode, params);
    }

    process(program) {
        const inputValueOne = program.readValueAtAddress(this.params[0]);
        const inputValueTwo = program.readValueAtAddress(this.params[1]);
        const outputAddress = this.params[2];
        program.writeValueAtAddress(outputAddress, inputValueOne * inputValueTwo);
    }

}

class TerminateInstruction extends Instruction {
    constructor(opcode, params) {
        super(opcode, params);
    }

    process(program) {
        program.terminate();
    }
}

module.exports.AddInstruction = AddInstruction;
module.exports.MultiplyInstruction = MultiplyInstruction;
module.exports.TerminateInstruction = TerminateInstruction;