const { Builder, By, until } = require("selenium-webdriver")
const assert = require("assert")

describe("Open homepage", function () {
  let driver

  // Запускаємо Edge перед кожним тестом
  beforeEach(async function () {
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
  })

  // Закриваємо браузер після кожного тесту
  afterEach(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  // Наш тест
  it("should open https://file-sharing-dev.netlify.app/ and check for title", async function () {
    this.timeout(10000)

    await driver.get("https://file-sharing-dev.netlify.app/")
    await driver.sleep(1000) // Пауза 1 секунда

    let homePageTitle = await driver.wait(
      until.elementLocated(By.css('[data-testid="home-page-title"]')),
      1000
    )

    let homePageTitleText = await homePageTitle.getText()

    assert(
      homePageTitleText.includes("Fast file sharing without registration"),
      "homepage title text is not Fast file sharing without registration"
    )

    await driver.sleep(1000) // Пауза 1 секунда

    const pageTitle = await driver.getTitle()
    // await driver.sleep(1000) // Пауза 1 секунда

    assert(pageTitle.includes("File Sharing", "The title is not File Sharing"))
  })
})
