const getCustomerAllergieProduct = (data, customer) => {
    return data.find((o) => o.name === customer).product.split(", ");
};

module.exports = {
    getCustomerAllergieProduct
};
