const volatilityData = require ('../data/volatility.json')

class Volatility {
    constructor() {
        this.ingredient_volatility = volatilityData['order ingredient volatility'],
        this.dish_volatility = volatilityData['order dish volatility']
    }
    randomVolatilityData() {
        let ingredientVolatility = [(this.ingredient_volatility/100 + 1), (1 - this.ingredient_volatility/100)]
        let dishVolatility = [(this.dish_volatility/100 + 1), (1 - this.ingredient_volatility/100)]
        return [ingredientVolatility[this.randomValue()], dishVolatility[this.randomValue()]]
    }

    randomValue() {
        return Math.round(Math.random());
    }

}

const volatilityAmount = new Volatility();

module.exports = volatilityAmount;