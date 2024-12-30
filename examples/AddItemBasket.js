require("dotenv").config()
const assert = require("assert")
const { Builder, By, until } = require("selenium-webdriver")
driver = webdriver.Chrome("/home/user/drivers/chromedriver")

describe("Rozetka", function () {
  this.timeout(30000)
  let driver

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build()
  })

  afterEach(async function () {
    await driver.quit()
  })

  // Open marketplace url. Verify it.

  it("should open Rozetka", async function () {
    const window = await driver.manage().window()
    await window.maximize()
    await driver.get(process.env.URL)
    const title = await driver.getTitle()
    assert.strictEqual(
      title,
      "Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні"
    )

    // Open category and subcategory.

    await driver.wait(
      until.elementsLocated(By.linkText("Ноутбуки та комп’ютери"))
    )
    await driver.findElement(By.linkText("Ноутбуки та комп’ютери")).click()

    await driver.wait(until.elementsLocated(By.linkText("Ноутбуки")))
    await driver.findElement(By.linkText("Ноутбуки")).click()

    // Add any item to the basket.

    await driver.wait(until.elementsLocated(By.css(".goods-tile__buy-button")))
    await driver.sleep(1000)
    await driver.findElement(By.css(".goods-tile__buy-button")).click()

    // Select another category and add an item from that category.

    await driver.get(process.env.URL)
    await driver.wait(until.elementsLocated(By.linkText("Зоотовари")))
    await driver.findElement(By.linkText("Зоотовари")).click()

    await driver.wait(until.elementsLocated(By.linkText("Корм")))
    await driver.findElement(By.linkText("Корм")).click()

    await driver.wait(until.elementsLocated(By.css(".goods-tile__buy-button")))
    await driver.sleep(1000)
    await driver.findElement(By.css(".goods-tile__buy-button")).click()

    // Verify information of items inside the basket that the price is calculated correctly and that the delete item button is clickable.

    await driver.wait(
      until.elementsLocated(By.css(".badge--green[_ngcontent-rz-client-c19]"))
    )
    await driver.sleep(1000)
    const count = await driver
      .findElement(By.css(".badge--green[_ngcontent-rz-client-c19]"))
      .getText()
    assert.strictEqual(count, "2")

    await driver.wait(
      until.elementsLocated(By.css(".header__button[_ngcontent-rz-client-c21]"))
    )
    await driver.sleep(1000)
    await driver
      .findElement(By.css(".header__button[_ngcontent-rz-client-c21]"))
      .click()

    await driver.wait(
      until.elementsLocated(
        By.css(".cart-product__price[_ngcontent-rz-client-c128]")
      )
    )
    await driver.sleep(1000)
    const prices = await driver.findElements(
      By.css(".cart-product__price[_ngcontent-rz-client-c128]")
    )

    const priceValues = await Promise.all(
      prices.map(async (price) => {
        return parseInt(String(await price.getText()).replace(/\D+/g, ""))
      })
    )

    const totalPrice = await driver.findElement(
      By.css("    .cart-receipt__sum-price        ")
    )
    const totalPriceValue = parseInt(
      String(await totalPrice.getText()).replace(/\D+/g, "")
    )

    const calculatedTotalPrice = priceValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )
    console.log("priceValues - ", priceValues)
    console.log("totalPriceValue - ", totalPriceValue)
    console.log("calculatedTotalPrice - ", calculatedTotalPrice)

    assert.deepEqual(totalPriceValue, calculatedTotalPrice)

    await driver.findElement(By.id("cartProductActions0")).click()
    await driver.sleep(1000)

    await driver
      .findElement(By.css(".popup-menu__item:nth-child(1) .button"))
      .click()

    await driver.wait(
      until.elementsLocated(By.css(".badge--green[_ngcontent-rz-client-c19]"))
    )
    await driver.sleep(1000)
    const countAfterDelete = await driver
      .findElement(By.css(".badge--green[_ngcontent-rz-client-c19]"))
      .getText()
    assert.strictEqual(countAfterDelete, "1")

    await driver.sleep(5000)
  })
})
