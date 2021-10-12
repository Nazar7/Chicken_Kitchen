const { mainFunc } = require('../app');

describe("Test mainFunc", () => {
    test("First test", () => {
        mainFunc((result) => {
            expect(result).toBe("blabal");    
        })
    })
})