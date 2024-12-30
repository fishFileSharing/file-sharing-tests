const { Builder, By, until } = require("selenium-webdriver")
const assert = require("assert")

describe("Open homepage", function () {
  this.timeout(10000)

  let driver

  beforeEach(async function () {
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
  })

  afterEach(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it("should open https://file-sharing-dev.netlify.app/ and check for title", async function () {
    this.timeout(10000)

    await driver.get("https://file-sharing-dev.netlify.app/")
    await driver.sleep(1000)

    let homePageTitle = await driver.wait(
      until.elementLocated(By.css('[data-testid="home-page-title"]')),
      1000
    )

    let homePageTitleText = await homePageTitle.getText()

    assert(
      homePageTitleText.includes("Fast file sharing without registration"),
      "homepage title text is not Fast file sharing without registration"
    )

    await driver.sleep(1000)

    const pageTitle = await driver.getTitle()

    assert(pageTitle.includes("File Sharing", "The title is not File Sharing"))
  })
})
