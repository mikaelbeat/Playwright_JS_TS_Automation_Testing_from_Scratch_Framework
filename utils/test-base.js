
const {base} = require('@playwright/test');


exports.customTest = base.test.extend({

testDataForOrder: {
    username: "testihemmo@testi.fi",
    password: "Mustakissa1",
    productName: "ZARA COAT 3"
}

})