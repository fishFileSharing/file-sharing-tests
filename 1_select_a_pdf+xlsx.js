const { Builder, By, until, Key } = require("selenium-webdriver");
// Импортируем модули из Selenium WebDriver. 
// - `Builder` используется для создания экземпляра WebDriver.
// - `By` позволяет находить элементы на странице.
// - `until` предоставляет условия ожидания.
// - `Key` позволяет использовать специальные клавиши клавиатуры.

const assert = require("assert");
// Импортируем библиотеку `assert` для выполнения проверок (assertions) в тестах.

const path = require("path");
// Импортируем модуль `path` для работы с путями файловой системы, например, для создания полного пути к файлу.

describe("Select a file and check if it's name appears on page", function () {
// Описываем тестовый набор (test suite) с названием "Выбрать файл и проверить, отображается ли его имя на странице".

  let driver;
  // Объявляем переменную `driver`, которая будет использоваться для управления браузером.

  beforeEach(async function () {
    // Хук `beforeEach` запускается перед каждым тестом внутри тестового набора.
    driver = await new Builder().forBrowser("MicrosoftEdge").build();
    // Создаем экземпляр WebDriver для браузера Microsoft Edge.
  });

  afterEach(async function () {
    // Хук `afterEach` запускается после каждого теста внутри тестового набора.
    if (driver) {
      await driver.quit();
      // Завершаем работу WebDriver, чтобы закрыть браузер и освободить ресурсы.
    }
  });

  it("should open https://file-sharing-dev.netlify.app/ and check for title", async function () {
    // Описываем отдельный тест с названием: "Открыть сайт и проверить заголовок".
    this.timeout(10000);
    // Устанавливаем тайм-аут для теста в 10 секунд.

    await driver.get("https://file-sharing-dev.netlify.app/");
    // Загружаем указанную веб-страницу в браузере.

    await driver.sleep(3000);
    // Ждем 3 секунды, чтобы страница успела полностью загрузиться.

    let selectFilesInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="select-files-input"]')),
      5000
    );
    // Ожидаем, пока на странице появится элемент с CSS-селектором `data-testid="select-files-input"`.
    // Максимальное время ожидания — 5 секунд.

    const filePath1 = path.join(__dirname, "..", "test_files", "pdf.pdf");
    // Создаем абсолютный путь к файлу `pdf.pdf`, который находится в папке `test_files`.
    const filePath2 = path.join(__dirname, "..", "test_files", "xlsx.xlsx");
    // Создаем абсолютный путь к файлу `pdf.pdf`, который находится в папке `test_files`.

    selectFilesInput.sendKeys(`${filePath1}\n${filePath2}`);
    // Отправляем путь к файлу в поле ввода, чтобы загрузить файл на сайт.

    await driver.sleep(3000);
    // Ждем 3 секунды, чтобы система успела обработать загрузку файла.

    let selectedFileName1 = await driver.wait(
        until.elementLocated(By.css('[data-testid="selected-file-name"]')),
        5000
      );
      let selectedFileNameText1 = await selectedFileName1.getText();
      assert(
        selectedFileNameText1.includes("pdf"),
        "PDF file name is not displayed correctly."
      );

      let selectedFileName2 = await driver.wait(
        until.elementLocated(By.css('[data-testid="selected-file-name"]')),
        5000
      );
      let selectedFileNameText2 = await selectedFileName2.getText();
      assert(
        selectedFileNameText2.includes("xlsx"),
        "XLSX file name is not displayed correctly."
      );
});