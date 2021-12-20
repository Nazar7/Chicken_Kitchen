const {
    getBaseIngredientsPrices,
} = require('../dataHandlers/dishDataParser');

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



describe("Test handleDishData parseBaseIngridients", () => {
    const data = [
        {
          food: 'Emperor Chicken',
          ingredients: 'Fat Cat Chicken, Spicy Sauce, Tuna Cake'
        },
        {
          food: 'Fat Cat Chicken',
          ingredients: 'Princess Chicken, Youth Sauce, Fries, Diamond Salad'
        },
        { food: 'Princess Chicken', ingredients: 'Chicken, Youth Sauce' },
        { food: 'Youth Sauce', ingredients: 'Asparagus, Milk, Honey' },
        { food: 'Spicy Sauce', ingredients: 'Paprika, Garlic, Water' },
        { food: 'Omega Sauce', ingredients: 'Lemon, Water' },
        { food: 'Diamond Salad', ingredients: 'Tomatoes, Pickles, Feta' },
        { food: 'Ruby Salad', ingredients: 'Tomatoes, Vinegar, Chocolate' },
        { food: 'Fries', ingredients: 'Potatoes' },
        { food: 'Smashed Potatoes', ingredients: 'Potatoes' },
        { food: 'Tuna Cake', ingredients: 'Tuna, Chocolate, Youth Sauce' },
        {
          food: 'Fish In Water',
          ingredients: 'Tuna, Omega Sauce, Ruby Salad'
        },
        { food: 'Irish Fish', ingredients: 'Tuna, Fries, Smashed Potatoes' }
      ]
    const expected  = {
        'Emperor Chicken': [ 'Fat Cat Chicken', 'Spicy Sauce', 'Tuna Cake' ],
        'Fat Cat Chicken': [ 'Princess Chicken', 'Youth Sauce', 'Fries', 'Diamond Salad' ],
        'Princess Chicken': [ 'Chicken', 'Youth Sauce' ],
        'Youth Sauce': [ 'Asparagus', 'Milk', 'Honey' ],
        'Spicy Sauce': [ 'Paprika', 'Garlic', 'Water' ],
        'Omega Sauce': [ 'Lemon', 'Water' ],
        'Diamond Salad': [ 'Tomatoes', 'Pickles', 'Feta' ],
        'Ruby Salad': [ 'Tomatoes', 'Vinegar', 'Chocolate' ],
        Fries: [ 'Potatoes' ],
        'Smashed Potatoes': [ 'Potatoes' ],
        'Tuna Cake': [ 'Tuna', 'Chocolate', 'Youth Sauce' ],
        'Fish In Water': [ 'Tuna', 'Omega Sauce', 'Ruby Salad' ],
        'Irish Fish': [ 'Tuna', 'Fries', 'Smashed Potatoes' ]
      }
    test("getBaseIngredientsPrices should return parse data as json", () => {
        expect(getBaseIngredientsPrices(data)).toStrictEqual(expected);
    });

    test("getBaseIngredientsPrices should not return data as jso", () => {
        expect(getBaseIngredientsPrices(data)).not.toStrictEqual(data);
    });
})


