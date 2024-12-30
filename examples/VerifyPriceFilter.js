require('dotenv').config();
const assert = require("assert");
const { Builder, By, until } = require("selenium-webdriver");

describe("Rozetka", function () {
  this.timeout(30000);
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async function () {
    await driver.quit()
  });

    // Open marketplace url. Verify it.

  it("should open Rozetka", async function () {
    const window = await driver.manage().window();
    await window.maximize();
    await driver.get(process.env.URL);
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні');

    // Open category and subcategory.

    await driver.wait(
      until.elementsLocated(By.linkText("Ноутбуки та комп’ютери"))
    )
    await driver.findElement(By.linkText("Ноутбуки та комп’ютери")).click()

    await driver.wait(until.elementsLocated(By.linkText("Ноутбуки")))
    await driver.findElement(By.linkText("Ноутбуки")).click()

    // Navigate to the filters section. Apply 2 filters.

    await driver.wait(until.elementsLocated(By.css('[data-id="ASUS"]')))
    await driver.sleep(1000)
    await driver.findElement(By.css('[data-id="ASUS"]')).click()

    await driver.wait(until.elementsLocated(By.css('[data-id="Acer"]')))
    await driver.sleep(1000)
    await driver.findElement(By.css('[data-id="Acer"]')).click()

    // Verify that all the items on the page are sorted correctly by the from and to price filters you entered.

    await driver.sleep(2000)
    await driver.findElement(By.css(".select-css")).click()
    await driver.wait(until.elementsLocated(By.css('[value="1: cheap"]')))
    await driver.sleep(1000)
    await driver.findElement(By.css('[value="1: cheap"]')).click()

    await driver.sleep(3000)
    const prices = await driver.findElements(By.css(".goods-tile__price-value"))
    const priceValues = await Promise.all(
      prices.map(async (price) => {
        return String(await price.getText()).replace(/\D+/g, "")
      })
    )

    const sortedPriceValues = [...priceValues].sort((a, b) => a - b)
    console.log(priceValues)
    console.log(sortedPriceValues)

    assert.deepEqual(priceValues, sortedPriceValues)

    await driver.sleep(5000);
  });
});