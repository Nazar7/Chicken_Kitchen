const {
    getParseInputData,
} = require('../dataHandlers/handleInputData');

describe("Test helpers getBaseIngredientsPrices", () => {
    const ordersList = [
        'Buy, Julie Mirage, Princess Chicken',
        'Order, Tuna, 1',
        'Buy, Barbara Smith, Tuna Cake',
        'Buy, Alexandra Smith, Fries'
      ];
    const expected  = [
        {
          action: 'Buy',
          arg: [ 'Julie Mirage' ],
          val: [ 'Princess Chicken' ]
        },
        { action: 'Order', arg: [ 'Tuna' ], val: [ '1' ] },
        { action: 'Buy', arg: [ 'Barbara Smith' ], val: [ 'Tuna Cake' ] },
        { action: 'Buy', arg: [ 'Alexandra Smith' ], val: [ 'Fries' ] }
      ]
    test("getParseInputData should return parse data as array of json", () => {
        expect(getParseInputData(ordersList)).toStrictEqual(expected);
    });

    test("getParseInputData should not return data as array of json", () => {
        expect(getParseInputData(ordersList)).not.toStrictEqual(ordersList);
    });
})