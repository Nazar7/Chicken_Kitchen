const volatility = require("./volatility")

describe('VolatilityService Class', () => {
    test("Checkin randomVolatilityData function, if volatility value is array which include any of two numbers from expecting array ", function () {
        volatility.randomValue = jest.fn(() => 1);
        let result = volatility.randomVolatilityData();
        expect([0.9, 1.1, 1.25, 0.75])
            .toEqual(expect.arrayContaining(result));
        // expect(result).toEqual([0.9, 1.1]);

    });
});