require("dotenv").config()
const assert = require("assert")
const { Builder, By, until } = require("selenium-webdriver")

describe("Rozetka", function () {
  this.timeout(30000)
  let driver

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build()
  })

  afterEach(async function () {
    await driver.quit()
  })

  // Open category and subcategory.

  it("1", async function () {
    await driver.get(process.env.URL)

    await driver.wait(
      until.elementsLocated(By.linkText("Ноутбуки та комп’ютери"))
    )
    await driver.findElement(By.linkText("Ноутбуки та комп’ютери")).click()

    await driver.wait(until.elementsLocated(By.linkText("Ноутбуки")))
    await driver.findElement(By.linkText("Ноутбуки")).click()

    // Check the correctness adding product to the basket.

    await driver.wait(until.elementsLocated(By.css(".goods-tile__buy-button")))
    await driver.sleep(1000)
    await driver.findElement(By.css(".goods-tile__buy-button")).click()

    await driver.wait(
      until.elementsLocated(By.css(".header__button[_ngcontent-rz-client-c21]"))
    )
    await driver.sleep(1000)
    await driver
      .findElement(By.css(".header__button[_ngcontent-rz-client-c21]"))
      .click()

    await driver.sleep(1000)

    await driver
      .findElement(By.css(".cart-list__item:nth-child(1) .button:nth-child(3)"))
      .click()

    await driver.wait(
      until.elementsLocated(By.css(".badge--green[_ngcontent-rz-client-c19]"))
    )
    await driver.sleep(1000)
    const count = await driver
      .findElement(By.css(".badge--green[_ngcontent-rz-client-c19]"))
      .getText()
    assert.strictEqual(count, "1")

    await driver.sleep(5000)
  })
})