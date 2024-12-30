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

    // Search random item by name

    await driver.findElement(By.name("search")).sendKeys("ноутбук")
    await driver.findElement(By.css(".button_color_green")).click()

    // Verify that all items are correctly displayed according to your searching request (only on the first page).

    await driver.wait(until.elementsLocated(By.css(".goods-tile__title")))
    await driver.sleep(1000)

    const itemNames = await driver.findElements(By.css(".goods-tile__title"))
    const itemNamesText = await Promise.all(
      itemNames.map(async (name) => {
        return await name.getText()
      })
    )

    console.log("itemNamesText", itemNamesText)

    itemNamesText.forEach((name) => {
      assert.ok(name.toLowerCase().includes("ноутбук"))
    })
    console.log(`Found ${itemNamesText.length} items`);

    await driver.sleep(5000)
  })
})