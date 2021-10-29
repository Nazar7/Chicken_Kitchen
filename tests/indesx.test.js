const {
    getCustomerAllergieProduct,
    getFoodIngredients,
    getCapitalize,
    getBaseIngredientsPrices,
    getCustomersBudgets,
    checkAllergiExist,
    getOrderPrice,
    getCustomerBudget,
    getBaseIngridientsOfOrder,
    getOrderDataFromTxt,
    getRestaurantBudget
} = require('../helpers');

describe("Test helpers", () => {
    test("getOrderDataFromTxt should return the same value", () => {
        expect(getOrderDataFromTxt(2)).toBe(2);
    });

    test("getOrderDataFromTxt should not return the same value", () => {
        expect(getOrderDataFromTxt(2)).not.toBe(3);
    });
})


describe("Test helpers getBaseIngredientsPrices", () => {
    const data = [
        { ingredients: 'Chicken', price: '20' },  
        { ingredients: 'Tuna', price: '25' },     
        { ingredients: 'Potatoes', price: '3' },  
        { ingredients: 'Asparagus', price: '50' },
        { ingredients: 'Milk', price: '5' },      
        { ingredients: 'Honey', price: '15' },    
        { ingredients: 'Paprika', price: '4' },   
        { ingredients: 'Garlic', price: '3' },    
        { ingredients: 'Water', price: '1' },     
        { ingredients: 'Lemon', price: '2' },     
        { ingredients: 'Tomatoes', price: '4' },  
        { ingredients: 'Pickles', price: '2' },
        { ingredients: 'Feta', price: '7' },
        { ingredients: 'Vinegar', price: '1' },
        { ingredients: 'Rice', price: '2' },
        { ingredients: 'Chocolate', price: '5' }
      ];
    const expected  = {
        Chicken: [ '20' ],  
        Tuna: [ '25' ],     
        Potatoes: [ '3' ],  
        Asparagus: [ '50' ],
        Milk: [ '5' ],      
        Honey: [ '15' ],    
        Paprika: [ '4' ],   
        Garlic: [ '3' ],    
        Water: [ '1' ],     
        Lemon: [ '2' ],     
        Tomatoes: [ '4' ],
        Pickles: [ '2' ],
        Feta: [ '7' ],
        Vinegar: [ '1' ],
        Rice: [ '2' ],
        Chocolate: [ '5' ]
      }
    test("getBaseIngredientsPrices should return parse data as json", () => {
        expect(getBaseIngredientsPrices(data)).toStrictEqual(expected);
    });

    test("getBaseIngredientsPrices should not return data as jso", () => {
        expect(getBaseIngredientsPrices(data)).not.toStrictEqual(data);
    });
})



describe("Test helpers getCustomersBudgets", () => {
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
    test("getCustomersBudgets should return parse data as json", () => {
        expect(getCustomersBudgets(data)).toStrictEqual(expected);
    });

    test("getCustomersBudgets should not return data as json", () => {
        expect(getCustomersBudgets(data)).not.toStrictEqual(data);
    });
})