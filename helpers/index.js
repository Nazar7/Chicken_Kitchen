const getCustomerAllergieProduct = (data, customer) => {
  return data.find((o) => o.name === customer).product.split(", ");
};

const getFoodIngredients = (foodIngredients) => {
  let parsFood = {};
  for (element in foodIngredients) {
    parsFood[foodIngredients[element].food] =
      foodIngredients[element].ingredients.split(", ");
  }
  return parsFood;
};

function getCapitalize(order) {
  const capitalizeFoodName = order
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
  return capitalizeFoodName;
}

module.exports = {
  getCustomerAllergieProduct,
  getFoodIngredients,
  getCapitalize,
};
