const Program = require('./program');
const stdin = require('mock-stdin').stdin();

describe('Program', () => {

    beforeEach(() => {
        // global.console = {
        //     log: jest.fn(),
        //     error: jest.fn()
        // };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('opcode 1: add', async () => {
        const input = '1,0,0,0,99';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory.slice(0,5)).toEqual([2,0,0,0,99]);
        expect(retval).toEqual([]);
    });

    test('opcode 2: multiply (part 1)', async () => {
        const input = '2,3,0,3,99';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory.slice(0,5)).toEqual([2,3,0,6,99]);
        expect(retval).toEqual([]);
    });

    test('opcode 2: multiply (part 2)', async () => {
        const input = '2,4,4,5,99,0';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory.slice(0,6)).toEqual([2,4,4,5,99,9801]);
        expect(retval).toEqual([]);
    });

    test('opcodes 1 and 2: add and multiply (part 1)', async () => {
        const input = '1,9,10,3,2,3,11,0,99,30,40,50';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory.slice(0,12)).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
        expect(retval).toEqual([]);
    });

    test('opcodes 1 and 2: add and multiply (part 2)', async () => {
        const input = '1,1,1,4,99,5,6,0,99';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory.slice(0,9)).toEqual([30,1,1,4,2,5,6,0,99]);
        expect(retval).toEqual([]);
    });

    test('parameter modes', async () => {
        const input = '1002,4,3,4,33';
        const program = new Program(input);
        const retval = await program.execute();
        expect(retval).toEqual([]);
        expect(program.memory.slice(0, 5)).toEqual([1002, 4, 3, 4, 99]);
    });

    test('opcodes 3 and 4: input and output using position mode', async () => {
        const input = '3,0,4,0,99';
        const program = new Program(input);
        const retval = await program.execute([123]);
        expect(retval).toEqual([123]);
    });

    test('opcode 3: input using relative mode', async () => {
        const input = '109,1,203,9,4,9,4,10,99,0,0';
        const program = new Program(input);
        const retval = await program.execute([123]);
        expect(retval).toEqual([0,123]);
    });

    test('opcode 4: output using relative mode', async () => {
        const input = '109,1,204,5,99,8,9';
        const program = new Program(input);
        const retval = await program.execute();
        expect(retval).toEqual([9]);
    });

    test('opcodes 5 and 6: jump 1', async () => {
        const input = '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9';
        const program = new Program(input);
        const retval = await program.execute([0]);
        expect(retval).toEqual([0]);
    });

    test('opcodes 5 and 6: jump 2', async () => {
        const input = '3,3,1105,-1,9,1101,0,0,12,4,12,99,1';
        const program = new Program(input);
        const retval = await program.execute([5]);
        expect(retval).toEqual([1]);
    });

    test('opcode 7: less than eight using position mode', async () => {
        const input = '3,9,7,9,10,9,4,9,99,-1,8';
        const program = new Program(input);
        const retval = await program.execute([4]);
        expect(retval).toEqual([1]);
    });

    test('opcode 7: less than eight using immediate mode', async () => {
        const input = '3,3,1107,-1,8,3,4,3,99';
        const program = new Program(input);
        const retval = await program.execute([12]);
        expect(retval).toEqual([0]);
    });

    test('opcode 8: equal to eight using position mode', async () => {
        const input = '3,9,8,9,10,9,4,9,99,-1,8';
        const program = new Program(input);
        const retval = await program.execute([8]);
        expect(retval).toEqual([1]);
    });

    test('opcode 8: equal to eight using immediate mode', async () => {
        const input = '3,3,1108,-1,8,3,4,3,99';
        const program = new Program(input);
        const retval = await program.execute([12]);
        expect(retval).toEqual([0]);
    });

    test('opcode 9: relative base offset (part 1)', async () => {
        const input = '109,7,2101,1,1,7,99,0,5';
        const program = new Program(input);
        const retval = await program.execute();
        expect(retval).toEqual([]);
        expect(program.memory.slice(0,9)).toEqual([109, 7, 2101, 1, 1, 7, 99, 6, 5]);
    });

    test('opcode 9: relative base offset (part 2)', async() => {
        const input = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
        const program = new Program(input);
        const retval = await program.execute();
        expect(retval).toEqual([109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]);
    });

    test('large numbers (part 1)', async () => {
        const input = '1102,34915192,34915192,7,4,7,99,0';
        const program = new Program(input);
        const retval = await program.execute();
        expect(retval).toEqual([1219070632396864]);
    });

    test('large numbers (part 2)', async () => {
        const input = '104,1125899906842624,99';
        const program = new Program(input);
        const retval = await program.execute();
        expect(retval).toEqual([1125899906842624]);
    });

});