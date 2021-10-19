const { test, expect } = require('@jest/globals');
const summer = require('./summ.js');
const reader = require('./get_file_info.js')
var fs = require('fs');

const sum_use = summer("./read_me.txt");

describe("non-mocked unit tests to ensure functionality", () => {
    test('should read numbers from apended file read_me.txt correctly', () => {
        expect(sum_use).toEqual(expect.arrayContaining([1,2,3,6]));
    })
    
    test('should reject a file containing non-numeric entries', () => {
        expect(() => summer("./bad_entries.txt")).toThrow("INVALID FILE: The file contains non-numeric entries.");
    })

    test('should reject a non-existant file', () => {
        expect(() => summer("./im_not_real.txt")).toThrow('INVALID FILE: That file does not exist.');
    })
})

//these mocks were practice tests from https://pawelgrzybek.com/mocking-functions-and-modules-with-jest/
//used to ensure functionality of mocks
describe("practice mocks using jest.fn()", () => {
    //#mock
    it("returns undefined and has been called correct number of times", () => {
        const mock = jest.fn();
        const result = mock();

        expect(result).toBeUndefined();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith();

        mock.mockReset();
    })

    //#fake
    it("has been called with correct arguments and return a correct valule", () => {
        const mock = jest
            .fn()
            .mockReturnValueOnce("first return")
            .mockReturnValueOnce("second return");
        const resultFirst = mock("first call");
        const resultSecond = mock("second call");

        expect(resultFirst).toBe("first return");
        expect(resultSecond).toBe("second return");
        expect(mock).toHaveBeenCalledTimes(2);
        expect(mock).toHaveBeenNthCalledWith(1, "first call");
        expect(mock).toHaveBeenNthCalledWith(2, "second call");

        mock.mockReset();
    })
})

describe("test using test doubles", () => {
    //#fake
    it("should recieve values from file to further use using mock return value", () => {
        const mock = jest.fn(reader).mockReturnValue([1,2,3,6]);

        expect(sum_use).toStrictEqual(expect.arrayContaining([1,2,3,6]))

        mock.mockReset();
    })

    //#fake
    it("should reject non-existant file", () => {
        const mock = jest.fn(reader).mockRejectedValue(new Error("INVALID FILE: That file does not exist."));

        expect(mock("./im_not_real.txt")).rejects.toEqual(Error("INVALID FILE: That file does not exist."))

        mock.mockReset();
    })

    //#fake
    it("should save sum back to file using mock return value", () => {
        // const mock = jest.fn(numbers => {
        //     var tot = 0;
        //     numbers.forEach(element => tot += (Number)(elemnent));
        //     numbers.push(tot);
        // })
        // summer.get_file_info = mock;

        const mock = jest.fn().mockReturnValue([1,2,3,6]);
        reader.get_file_info = mock;
        const result = mock("./read_me.txt");

        expect(result).toStrictEqual(expect.arrayContaining([1,2,3,6]))
        expect(mock).toHaveBeenCalledWith("./read_me.txt")
        expect(mock).toHaveBeenCalledTimes(1)

        mock.mockReset();
    })

    //#fake
    it("should return expected array from read_me.txt using mocked return value", () => {
        const mock = jest.fn().mockReturnValue([1,2,3,6]);
        summer.summ = mock;
        const result = mock("./read_me.txt");
        
        expect(result).toStrictEqual(expect.arrayContaining([1,2,3,6]))
        expect(mock).toHaveBeenCalledWith("./read_me.txt")
        expect(mock).toHaveBeenCalledTimes(1)
        
        mock.mockReset();
    })
    
    //#mock
    it("should return expected array from read_me.txt using mocked function", () => {
        const mock = jest.fn(summer);
        const result = mock("./read_me.txt");
        
        expect(result).toStrictEqual(expect.arrayContaining([1,2,3,6]));
        expect(mock).toHaveBeenCalledWith("./read_me.txt")
        expect(mock).toHaveBeenCalledTimes(1)
        
        mock.mockReset();
    })

    //#mock
    it("should return expected array from read_me.txt using mocked function", () => {
        const mock = jest.fn(reader);
        const result = mock("./read_me.txt");
        
        expect(result).toStrictEqual(expect.arrayContaining([1,2,3,6]));
        expect(mock).toHaveBeenCalledWith("./read_me.txt")
        expect(mock).toHaveBeenCalledTimes(1)
        
        mock.mockReset();
    })
    
    // it("should throw error from bad_entries.txt using mocked implementation", async () => {
        //     const mock = jest.fn().mockImplementationOnce(new Error("INVALID FILE: The file contains non-numeric entries."));
        //     summer.summ = mock;
        //     const result = await mock("./bad_entries.txt");
        
        //     expect(() => result).toThrow("INVALID FILE: The file contains non-numeric entries.");
        //     // expect(result).toThrow(new Error("INVALID FILE: The file contains non-numeric entries."))
        //     expect(mock).toHaveBeenCalledWith("./bad_entries.txt")
        //     expect(mock).toHaveBeenCalledTimes(1)
        
        //     mock.mockReset();
        // })
    // })
    
})