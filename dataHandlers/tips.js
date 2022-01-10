const wasteLimit = require('../data/tipAmount.json');

class TipsService {
    constructor() {
        this.max_tip = wasteLimit['max tip']
    }

    getTipsValue() {
        this.getRandomChanceOfTips() === 0 ? this.max_tip = 0 : this.max_tip = this.getRandomTipsFromInterval()
        console.log("this.max_tip - " + this.max_tip)
        return this.max_tip
    }

    getRandomChanceOfTips() {
        let rundomTips =  Math.round(Math.random());
        return rundomTips
    }

    getRandomTipsFromInterval() {
        return Math.floor(Math.random() * (this.max_tip - 1 + 1) + 1)
    }

}
const tipsService = new TipsService();

module.exports = tipsService;