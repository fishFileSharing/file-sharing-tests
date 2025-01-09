const { Builder, By, until } = require("selenium-webdriver");
// Импортируем модули Selenium WebDriver для управления браузером и взаимодействия с элементами страницы.

const assert = require("assert");
// Импортируем библиотеку `assert` для выполнения проверок.

const path = require("path");
// Импортируем модуль `path` для работы с абсолютными и относительными путями к файлам.

describe("Select files and check if their names appear on page", function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("MicrosoftEdge").build();
    // Создаем экземпляр WebDriver для браузера Microsoft Edge.
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
      // Завершаем работу WebDriver, закрываем браузер и освобождаем ресурсы.
    }
  });

  it("should upload two files and verify their names appear", async function () {
    this.timeout(20000); // Увеличиваем тайм-аут для теста до 20 секунд.

    await driver.get("https://file-sharing-dev.netlify.app/");
    // Переходим на страницу загрузки файлов.

    await driver.sleep(3000); // Ждем, чтобы страница успела загрузиться.

    const selectFilesInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="select-files-input"]')),
      5000
    );
    // Находим поле для загрузки файлов.

    const files = [
      path.join(__dirname, "..", "test_files", "1.pdf"),
      path.join(__dirname, "..", "test_files", "Full.jpeg"),
    ];
    // Задаем пути к файлам для загрузки.

    for (const filePath of files) {
      console.log(`Uploading file: ${filePath}`);
      selectFilesInput.sendKeys(filePath); // Загружаем файл.
      await driver.sleep(3000); // Ждем, пока файл будет обработан и появится его имя на странице.

      const selectedFileName = await driver.wait(
        until.elementLocated(By.css('[data-testid="selected-file-name"]')),
        5000
      );
      // Ожидаем появления имени загруженного файла.

      const selectedFileNameText = await selectedFileName.getText();
      console.log(`Displayed file name: ${selectedFileNameText}`);

      const expectedFileName = path.basename(filePath); // Извлекаем только имя файла.
      assert(
        selectedFileNameText.includes(expectedFileName),
        `Expected file name to include "${expectedFileName}", but got "${selectedFileNameText}"`
      );
      // Проверяем, что отображаемое имя файла соответствует загруженному.
    }
  });
});
