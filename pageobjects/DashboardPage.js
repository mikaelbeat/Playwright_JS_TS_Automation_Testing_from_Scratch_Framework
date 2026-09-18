
class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body");
        this.productsTitle = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName) {
        await this.page.locator(".card-body b").first().waitFor();
        const titles = await this.productsTitle.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {

            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }


    }

    async navigateToCart() {
       await this.cart.click();
    }

}

module.exports = { DashboardPage };
