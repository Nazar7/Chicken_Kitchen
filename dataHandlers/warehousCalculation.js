module.exports = class WarehouseCalculation{
    constructor(order, warehouse, orderIngridients) {
        this.order = order;
        this.warehouse = warehouse;
        this.orderIngridients = orderIngridients;

   
      }
      warehousDecrease() {     
        if(this.order.join() in this.warehouse){
            console.log(this.warehouse)
            this.warehouse[this.order.join()] = this.warehouse[this.order.join()]-1
          return this.warehouse
        } else {
            console.log(this.orderIngridients.join())
            for(let i = 0; i <= this.orderIngridients.length; i++){
                console.log(this.orderIngridients[i] in this.warehouse)
                if(this.orderIngridients[i] in this.warehouse){
                    this.warehouse[this.orderIngridients[i]] = this.warehouse[this.orderIngridients[i]]-1
                    console.log(this.warehouse)
                 return  this.warehouse
                
                }
            }
        }
    }

    warehousIncrise(){
        if(this.order.join() in this.warehouse){
            console.log(this.warehouse)
            this.warehouse[order.join()] = this.warehouse[order.join()]-1
          return this.warehouse
        } else {
            console.log(this.orderIngridients)
            for(let i = 0; i <= this.orderIngridients.length; i++){
                console.log(this.orderIngridients[i] in this.warehouse)
                if(this.orderIngridients[i] in this.warehouse){
                    this.warehouse[this.orderIngridients[i]] = this.warehouse[this.orderIngridients[i]]-1
                    console.log(this.warehouse)
                 return  this.warehouse
                
                }
            }
        }
    }

}

