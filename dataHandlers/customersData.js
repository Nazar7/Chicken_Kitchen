class CustomersDatas {
    getParseAllergiesData (allergiData){
      console.log(allergiData)
      let customersAllergies = {}
      allergiData.forEach((element, index) => {
        customersAllergies[allergiData[index].name] = allergiData[index].product
      })
      return customersAllergies
    }
  }
  
  const getCustomersDatas = new CustomersDatas();
  
  module.exports = getCustomersDatas;