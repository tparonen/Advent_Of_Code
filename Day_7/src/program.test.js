const Program = require('./program');
const stdin = require('mock-stdin').stdin();



describe('Program', () => {

    beforeEach(() => {
        global.console = {
            log: jest.fn(),
            error: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('add (part 1)', async () => {
        const input = '1,0,0,0,99';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory).toEqual([2,0,0,0,99]);
        expect(retval).toBe(2);
    });

    test('add (part 2)', async () => {
        const input = '1,1,1,4,99,5,6,0,99';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory).toEqual([30,1,1,4,2,5,6,0,99]);
        expect(retval).toBe(30);
    });

    test('multiply (part 1)', async () => {
        const input = '2,3,0,3,99';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory).toEqual([2,3,0,6,99]);
        expect(retval).toBe(2);
    });

    test('multiply (part 2)', async () => {
        const input = '2,4,4,5,99,0';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory).toEqual([2,4,4,5,99,9801]);
        expect(retval).toBe(2);
    });

    test('add and multiply', async () => {
        const input = '1,9,10,3,2,3,11,0,99,30,40,50';
        const program = new Program(input);
        const retval = await program.execute();
        expect(program.memory).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
        expect(retval).toBe(3500);
    });

    test('input and output', async () => {
        const input = '3,0,4,0,99';
        const program = new Program(input);
        const promise = program.execute();

        stdin.reset().send('123\n').end();

        const retval = await promise;
        expect(retval).toBe(123);
        expect(global.console.log).toHaveBeenCalledWith('OUTPUT: 123');
    });

    test('parameter modes', async () => {
        const input = '1002,4,3,4,33';
        const program = new Program(input);
        const retval = await program.execute();
        expect(retval).toBe(1002);
    });

    test('jump 1', async () => {
        const input = '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9';
        const program = new Program(input);
        const promise = program.execute();

        stdin.reset().send('0\n').end();

        const retval = await promise;
        expect(global.console.log).toHaveBeenCalledWith('OUTPUT: 0');
    });

    test('jump 2', async () => {
        const input = '3,3,1105,-1,9,1101,0,0,12,4,12,99,1';
        const program = new Program(input);
        const promise = program.execute();

        stdin.reset().send('5\n').end();

        const retval = await promise;
        expect(global.console.log).toHaveBeenCalledWith('OUTPUT: 1');
    });

    test('less than eight using position mode', async () => {
        const input = '3,9,7,9,10,9,4,9,99,-1,8';
        const program = new Program(input);
        const promise = program.execute();

        stdin.reset().send('4\n').end();

        const retval = await promise;
        expect(global.console.log).toHaveBeenCalledWith('OUTPUT: 1');
    });

    test('less than eight using immediate mode', async () => {
        const input = '3,3,1107,-1,8,3,4,3,99';
        const program = new Program(input);
        const promise = program.execute();

        stdin.reset().send('12\n').end();

        const retval = await promise;
        expect(global.console.log).toHaveBeenCalledWith('OUTPUT: 0');
    });

    test('equal to eight using position mode', async () => {
        const input = '3,9,8,9,10,9,4,9,99,-1,8';
        const program = new Program(input);
        const promise = program.execute();

        const outputSpy = jest.spyOn(process.stdout, 'write');
        stdin.reset().send('8\n').end();

        const retval = await promise;
        expect(global.console.log).toHaveBeenCalledWith('OUTPUT: 1');
    });

    test('equal to eight using immediate mode', async () => {
        const input = '3,3,1108,-1,8,3,4,3,99';
        const program = new Program(input);
        const promise = program.execute();

        const outputSpy = jest.spyOn(process.stdout, 'write');
        stdin.reset().send('12\n').end();

        const retval = await promise;
        expect(global.console.log).toHaveBeenCalledWith('OUTPUT: 0');
    });

});