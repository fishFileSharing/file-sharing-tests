const { Builder, By, until, Key } = require("selenium-webdriver")
const assert = require("assert")
const path = require("path")

describe("Select a file and check if its name appears on page", function () {
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
    await driver.sleep(2000)

    const selectFilesInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="select-files-input"]')),
      5000
    )

    const filePath1 = path.join(__dirname, "..", "test_files", "pdf.pdf")
    const filePath2 = path.join(__dirname, "..", "test_files", "xlsx.xlsx")

    selectFilesInput.sendKeys(filePath1 + "\n" + filePath2)
    await driver.sleep(2000)

    // Перевіряємо перший файл
    const selectedFileName1 = await driver.wait(
      until.elementLocated(By.css('[data-testid="selected-file-name"]')),
      5000
    )
    const selectedFileNameText1 = await selectedFileName1.getText()
    assert(
      selectedFileNameText1.includes("pdf"),
      "PDF file name is not displayed correctly."
    )

    // Перевіряємо другий файл
    const selectedFileName2 = await driver.wait(
      until.elementLocated(By.css('[data-testid="selected-file-name"]')),
      5000
    )

    const selectedFileNameText2 = await selectedFileName2.getText()
    assert(
      selectedFileNameText2.includes("xlsx"),
      "XLSX file name is not displayed correctly."
    )
  })
})
