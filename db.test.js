const { test, expect } = require('@jest/globals');
const dber = require('./db');
const mongo = require('mongodb');
const insC = require('./insertCustomerDocuments')


describe("practice tests (not mocked)", () => {
    it("should say true is truthy (not connected to functionality of function)", () => {
        expect(true).toBeTruthy;
    })

    it("should insert customers into database", () => {
        expect(dber).toBeUndefined;
    })

    it("should insert customers into database", () => {
        expect(dber).toBeUndefined;
    })
})

describe("practice tests on insertCustomer", () => {
    //#fake
    it("returns undefined and has been called correct number of times", () => {
        const mock = jest.fn(insC).mockReturnValue({id:1, c_name:'Spoon', tot_goods:4});
        expect(mock()).toStrictEqual({id:1, c_name:'Spoon', tot_goods:4})
        mock.mockReset();
    })
})