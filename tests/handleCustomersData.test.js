const {
    getCustomersBudgets,
    getCustomerAllergieProduct,
    checkAllergiExist
} = require('../dataHandlers/handleCustomersData');

describe("Test handle customers budgets data - getCustomersBudgets", () => {
    const data = [
        { customer: 'Julie Mirage', budget: '100' },
        { customer: 'Elon Carousel', budget: '50' },
        { customer: 'Adam Smith', budget: ' 100' },
        { customer: 'Alexandra Smith', budget: '500' },
        { customer: 'Barbara Smith', budget: '250' },
        { customer: 'Christian Donnovan', budget: '500' },
        { customer: 'Bernard Unfortunate', budget: '15' }
      ];
    const expected  = {
        'Julie Mirage': [ '100' ],
        'Elon Carousel': [ '50' ],
        'Adam Smith': [ ' 100' ],
        'Alexandra Smith': [ '500' ],
        'Barbara Smith': [ '250' ],
        'Christian Donnovan': [ '500' ],
        'Bernard Unfortunate': [ '15' ]
      }
    test("getCustomersBudgets should return parse data as array of jsons", () => {
        expect(getCustomersBudgets(data)).toStrictEqual(expected);
    });

    test("getCustomersBudgets should not return data as array of jsons", () => {
        expect(getCustomersBudgets(data)).not.toStrictEqual(data);
    });
})


describe("Test handle customers allergie products - getCustomerAllergieProduct", () => {
    const data = [
        { name: 'Julie Mirage', product: 'Soy' },
        { name: 'Elon Carousel', product: 'Vinegar, olives' },
        { name: 'Adam Smith', product: '' },
        { name: 'Alexandra Smith', product: '' },
        { name: 'Barbara Smith', product: 'Chocolate' },
        { name: 'Christian Donnovan', product: 'Paprika' },
        { name: 'Bernard Unfortunate', product: 'Potatoes' }
      ];
    const customer = "Julie Mirage"

    const expected  = ['Soy']
       
    test("getCustomersBudgets should return data as aaray of jsons", () => {
        expect(getCustomerAllergieProduct(data, customer)).toStrictEqual(expected);
    });

    test("getCustomersBudgets should not return data as aaray of jsons", () => {
        expect(getCustomerAllergieProduct(data, customer)).not.toStrictEqual(data);
    });
})


describe("Test handle customers allergie exist - checkAllergiExist", () => {
    const orderIngridients = [ 'Chicken', 'Asparagus', 'Milk', 'Honey' ];
    const customersAllergiesList = {
        'Julie Mirage': 'Soy',
        'Elon Carousel': 'Vinegar, olives',
        'Adam Smith': '',
        'Alexandra Smith': '',
        'Barbara Smith': 'Chocolate',
        'Christian Donnovan': 'Paprika',
        'Bernard Unfortunate': 'Potatoes'
      };
    const data = [
        { customer: 'Julie Mirage', budget: '80' },
        { customer: 'Elon Carousel', budget: '50' },
        { customer: 'Adam Smith', budget: '500' },
        { customer: 'Alexandra Smith', budget: '500' },
        { customer: 'Barbara Smith', budget: '250' },
        { customer: 'Christian Donnovan', budget: '500' },
        { customer: 'Bernard Unfortunate', budget: '15' }
      ];
    const customer = "Julie Mirage"

    const order = "Princess Chicken"

    const expected  = customer + " - " + "can’t order " + order + " allergic to: " + customerAllergieProduct.join();
       
    test("getCustomersBudgets should return data as aaray of jsons", () => {
        expect(checkAllergiExist(orderIngridients, customersAllergiesList, customer, order)).toStrictEqual(expected);
    });

    test("getCustomersBudgets should not return data as aaray of jsons", () => {
        expect(checkAllergiExist(orderIngridients, customersAllergiesList, customer, order)).not.toStrictEqual(data);
    });
})


