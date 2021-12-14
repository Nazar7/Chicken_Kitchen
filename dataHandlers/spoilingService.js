// Sofia 6.8.2
class SpoilingService {
    randomizer = (spoilRate) => { // повертає число від 1 до (100 / на те що в конфіг)
        if(spoilRate !== 0) {
            return Math.floor(Math.random() * (100/spoilRate))
        } else return 0
    }

    checkAmountOfSpoiling = (ingredientQuantity, spoilRate) => {
        let amountOfSpoiling = 0;
        for(let i=0; i<ingredientQuantity; i++) {
            const random = this.randomizer(spoilRate);
            if (random === 1) {
               amountOfSpoiling += 1;
                i ++;
            }
        }
        return amountOfSpoiling // к-сть зіпсованих продуктів
    }
}

const spoilingService = new SpoilingService();

module.exports = spoilingService;