const {
    getBaseIngridientsOfOrder,
} = require('../dataHandlers/handleDishData');

describe("Test handleOrderData getBaseIngridientsOfOrder", () => {
    const order = "Fries"
    const foodIngredients = [
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
      ];
      const baseIngredients = [
        'Chicken',  'Tuna',
        'Potatoes', 'Asparagus',
        'Milk',     'Honey',
        'Paprika',  'Garlic',
        'Water',    'Lemon',
        'Tomatoes', 'Pickles',
        'Feta',     'Vinegar',
        'Rice',     'Chocolate'
      ];

    const expected  = [ 'Potatoes' ]
    test("getBaseIngridientsOfOrder should return array of baseIngridientsOfOrder", () => {
        expect(getBaseIngridientsOfOrder(order, foodIngredients, baseIngredients)).toEqual(expect.arrayContaining(expected));
    });

    test("getBaseIngridientsOfOrder should not return array of baseIngridientsOfOrder", () => {
        expect(getBaseIngridientsOfOrder(order, foodIngredients, baseIngredients)).not.toEqual(expect.arrayContaining(expected));
    });
})