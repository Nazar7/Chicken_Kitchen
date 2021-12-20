class TrashService {
    constructor() {
        this.poisoned = false;
        this.trash = {};
        this.wastePool = {}
    }
    getTrash = () => {
        return this.trash;
    }
    getPoisoned = () => {
        return  this.poisoned;
    }
    getWasteLimit = wasteLimit => {
        return wasteLimit >= 0 ? wasteLimit : 50;
    }
    getValues = (trash) => {
        return Object.values(trash);
    }
    getTotalSumFromTrash = (trash) => {
        const quantities = this.getValues(trash);
        return quantities.reduce((previousValue, currentValue) => {
            return previousValue +  currentValue
        }, 0);
    }
    checkFreeSpaceOfTrash = (wasteLimit, trash, wastedQuantity) => {
        const limit = this.getWasteLimit(wasteLimit);
        const totalSumFromTrash = this.getTotalSumFromTrash(trash)
        return totalSumFromTrash + wastedQuantity <= limit;
    }
    checkIsPoisoned = (trash, wasteLimit) => {
        const totalSum = this.getTotalSumFromTrash(trash);
        if (totalSum > wasteLimit) {
            return this.poisoned = true;
        }
        else return false;
    }
    addToTrash = (ingredient, wastedQuantity) => {
        if (!!this.trash[ingredient]) {
            this.trash[`${ingredient}`] = parseInt(this.trash[ingredient]) + parseInt(wastedQuantity);
        } else {
            this.trash[`${ingredient}`] = wastedQuantity;
        }
    }
    cleaner = () => {
        this.trash = {};
    }
    addToWastePool = () => {
        !Object.keys(this.wastePool).length ? this.wastePool = { ...this.wastePool, ... this.trash } :
            Object.keys(this.trash).forEach(el => {
                const foundItem = Object.keys(this.wastePool).find(key => {
                    return el === key;
                });
                if (foundItem) {
                    this.wastePool[el] += parseInt(this.trash[el]);
                } else {
                    this.wastePool[el] = this.trash[el];
                }
            });
        return this.wastePool;
    }
    trashService = (wasteLimit, trash, wastedQuantity, ingredient) => {
        const freeSpace = this.checkFreeSpaceOfTrash(wasteLimit, trash, wastedQuantity);
        if (freeSpace) {
            this.addToTrash(ingredient, wastedQuantity);
        } else {
            this.addToTrash(ingredient, wastedQuantity);
            this.poisoned = true;
        }
    }
}
const trashService = new TrashService();
module.exports = trashService;