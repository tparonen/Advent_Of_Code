const readline = require('./my-readline');

const DATA_SIZE_IN_INTS = 1000;

const {
    AddInstruction,
    MultiplyInstruction,
    InputInstruction,
    OutputInstruction,
    JumpIfTrueInstruction,
    JumpIfFalseInstruction,
    LessThanInstruction,
    EqualsInstruction,
    RelativeBaseOffsetInstruction,
    TerminateInstruction,
    parameterModes
} = require("./instruction");

class Program {

    constructor(program) {
        this.pc = 0;
        this.memory = program.split(',').map(num => parseInt(num, 10)).concat(Array(DATA_SIZE_IN_INTS).fill(0));
        this.relativeBase = 0;
        this.running = true;
        this.terminated = false;
        this.readline = readline;
        this.args = [];
        this.outputArgs = [];
    }

    readValue(offset) {
        if ((this.pc + offset) >= this.memory.length) {
            throw new Error('[ERROR] Program counter overflow');
        }
        return this.memory[this.pc + offset];
    }

    readParameters(count) {
        return [...Array(count).keys()].map(position => {
            return this.readValue(position);
        });
    }

    terminate() {
        this.running = false;
        this.terminated = true;
    }

    fetchInstruction(operation) {
        switch (operation.opcode) {
            case 1:
                return new AddInstruction(operation, this.readParameters(4));
            case 2:
                return new MultiplyInstruction(operation, this.readParameters(4));
            case 3:
                return new InputInstruction(operation, this.readParameters(2));
            case 4:
                return new OutputInstruction(operation, this.readParameters(2));
            case 5:
                return new JumpIfTrueInstruction(operation, this.readParameters(3));
            case 6:
                return new JumpIfFalseInstruction(operation, this.readParameters(3));
            case 7:
                return new LessThanInstruction(operation, this.readParameters(4));
            case 8:
                return new EqualsInstruction(operation, this.readParameters(4));
            case 9:
                return new RelativeBaseOffsetInstruction(operation, this.readParameters(2));
            case 99:
                return new TerminateInstruction(operation, this.readParameters(1));
        }
        throw new Error('[ERROR] Invalid opcode: ' + operation.opcode);
    }

    toParameterModes(mode) {
        switch (mode) {
            case 0:
                return parameterModes.POSITION_MODE;
            case 1:
                return parameterModes.IMMEDIATE_MODE;
            case 2:
                return parameterModes.RELATIVE_MODE;
        }
        throw new Error('[ERROR] Invalid operation mode: ' + mode);
    }

    resolveOpcCodeAndParameterMode(value) {
        const valueAsString = value.toString();
        if (valueAsString.length === 1) {
            return {opcode: value, parameterModes: []};
        }
        const opcode = valueAsString.slice(-2);
        const modes = valueAsString.slice(0, -2);
        return {
            opcode: parseInt(opcode, 10),
            parameterModes: ([...modes]
                    .map(mode => this.toParameterModes(parseInt(mode, 10)))
                    .reverse()
            )
        };
    }

    async processInstructions() {
        const firstValue = this.readValue(0);
        const operation = this.resolveOpcCodeAndParameterMode(firstValue);
        const instruction = this.fetchInstruction(operation);
        return await instruction.process(this);
    }

    async execute(args = []) {
        this.args = args;
        this.running = true;
        try {
            while (this.running && !this.terminated && this.pc < this.memory.length) {
                const retval = await this.processInstructions();
                if (retval === -1) {
                    this.running = false; // wait for next cycle
                }
            }
        } catch (error) {
            console.error(error);
            console.error(this.memory);
        } finally {
            this.readline.close();
        }

        const copyOfOutputArgs = [...this.outputArgs];
        this.outputArgs = [];
        return copyOfOutputArgs;
    }

    readValueAtAddress(address) {
        if (address >= this.memory.length) {
            throw new Error('[ERROR] Address overflow at read value');
        }
        return this.memory[address];
    }

    readValueAtAddressRelative(relativeAddress) {
        const address = this.relativeBase + relativeAddress;
        return this.readValueAtAddress(address);
    }

    writeValueAtAddress(address, value) {
        if (address >= this.memory.length) {
            throw new Error('[ERROR] Address overflow at write value');
        }
        this.memory[address] = value;
    }
}

module.exports = Program;