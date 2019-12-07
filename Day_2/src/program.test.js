const Program = require('./program');

describe('Program', () => {

    it('executes sample program 1 correctly', () => {
        const input = '1,9,10,3,2,3,11,0,99,30,40,50';
        const program = new Program(input);
        const retval = program.execute();
        expect(program.memory).toEqual([3500,9,10,70,2,3,11,0,99,30,40,50])
    });

    it('executes sample program 2 correctly', () => {
        const input = '1,0,0,0,99';
        const program = new Program(input);
        const retval = program.execute();
        expect(program.memory).toEqual([2,0,0,0,99]);
        expect(retval).toBe(2);
    });

    it('executes sample program 3 correctly', () => {
        const input = '2,3,0,3,99';
        const program = new Program(input);
        const retval = program.execute();
        expect(program.memory).toEqual([2,3,0,6,99]);
        expect(retval).toBe(2);
    });

    it('executes sample program 4 correctly', () => {
        const input = '2,4,4,5,99,0';
        const program = new Program(input);
        const retval = program.execute();
        expect(program.memory).toEqual([2,4,4,5,99,9801]);
        expect(retval).toBe(2);
    });

    it('executes sample program 5 correctly', () => {
        const input = '1,1,1,4,99,5,6,0,99';
        const program = new Program(input);
        const retval = program.execute();
        expect(program.memory).toEqual([30,1,1,4,2,5,6,0,99]);
        expect(retval).toBe(30);
    });

});