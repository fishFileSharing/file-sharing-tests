const assert = require("assert")
const { Builder, By, until } = require("selenium-webdriver")

describe("Google", function () {
  let driver

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build()
  })

  afterEach(async function () {
    await driver.quit()
  })

  it("should open Google", async function () {
    await driver.get("https://www.google.com/")
    const title = await driver.getTitle()
    assert.strictEqual(title, "Google")
  })
})