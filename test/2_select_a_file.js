const { Builder, By, until, Key } = require("selenium-webdriver")
const assert = require("assert")
const path = require("path")

describe("Select a file and check if it's name appears on page", function () {
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

    let selectFilesInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="select-files-input"]')),
      5000
    )

    const filePath = path.join(__dirname, "..", "1.pdf")

    selectFilesInput.sendKeys(filePath)
    await driver.sleep(1000) // Пауза 1 секунда

    let selectedFileName = await driver.wait(
      until.elementLocated(By.css('[data-testid="selected-file-name"]')),
      5000
    )

    let selectedFileNameText = await selectedFileName.getText()

    assert(
      selectedFileNameText.includes("1.pdf", "Something is wrong with filename")
    )
  })
})
