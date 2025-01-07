const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const path = require("path");

describe("Select files and check if their names appear on page", function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("MicrosoftEdge").build();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("should open https://file-sharing-dev.netlify.app/ and check file names", async function () {
    this.timeout(30000); // Збільшено тайм-аут до 30 секунд

    await driver.get("https://file-sharing-dev.netlify.app/");
    await driver.sleep(3000);

    let selectFilesInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="select-files-input"]')),
      10000 // Збільшено до 10 секунд
    );

    // Перший файл (pdf.pdf)
    const firstFilePath = path.join(__dirname, "..", "test_files", "pdf.pdf");
    selectFilesInput.sendKeys(firstFilePath);
    await driver.sleep(3000);

    // Ожидаємо появу імені першого файлу
    let selectedFileName = await driver.wait(
      until.elementLocated(By.css('[data-testid="selected-file-name"]')),
      10000 // Збільшено до 10 секунд
    );
    let selectedFileNameText = await selectedFileName.getText();
    // Перевіряємо, чи містить текст ім'я першого файлу
    assert(selectedFileNameText.includes("pdf"), "Something is wrong with first filename");

    // Другий файл (xlsx.xlsx)
    const secondFilePath = path.join(__dirname, "..", "test_files", "xlsx.xlsx");
    selectFilesInput.sendKeys(secondFilePath);
    await driver.sleep(3000);

    // Ожидаємо появу імені другого файлу
    selectedFileName = await driver.wait(
      until.elementLocated(By.css('[data-testid="selected-file-name"]')),
      10000 // Збільшено до 10 секунд
    );
    selectedFileNameText = await selectedFileName.getText();
    // Перевіряємо, чи містить текст ім'я другого файлу
    assert(selectedFileNameText.includes("xlsx"), "Something is wrong with second filename");
  });
});
