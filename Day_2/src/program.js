const {
    AddInstruction,
    MultiplyInstruction,
    TerminateInstruction
} = require("./instruction");

class Program {

    constructor(input) {
        this.pc = 0;
        this.memory = input.split(',').map(num => parseInt(num, 10));
        this.running = true;
    }

    readValue(offset) {
        if ((this.pc + offset) >= this.memory.length) {
            throw new Error('Program counter overflow');
        }
        return this.memory[this.pc + offset];
    }

    readZeroParameters() {
        return [];
    }

    readThreeParameters() {
        return [
            this.readValue(1),
            this.readValue(2),
            this.readValue(3)
        ]
    }

    terminate() {
        this.running = false;
    }

    fetchInstruction(opcode) {
        switch (opcode) {
            case 1:
                return new AddInstruction(opcode, this.readThreeParameters());
            case 2:
                return new MultiplyInstruction(opcode, this.readThreeParameters());
            case 99:
                return new TerminateInstruction(opcode, this.readZeroParameters());
        }
        throw new Error('Invalid opcode: ' + opcode);
    }

    execute() {
        while (this.running) {
            const instruction = this.fetchInstruction(this.readValue(0));
            instruction.process(this);
            this.pc += 1 + instruction.params.length;
        }
        return this.memory[0];
    }

    readValueAtAddress(address) {
        if (address >= this.memory.length) {
            throw new Error('Address overflow at read value');
        }
        return this.memory[address];
    }

    writeValueAtAddress(address, value) {
        if (address >= this.memory.length) {
            throw new Error('Address overflow at write value');
        }
        this.memory[address] = value;
    }
}

module.exports = Program;