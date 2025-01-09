// Импортируем необходимые модули из Selenium WebDriver
// - Builder: используется для создания экземпляра WebDriver, который управляет браузером.
// - By: предоставляет методы для поиска элементов на веб-странице с помощью селекторов (CSS, XPath, ID и т.д.).
// - Key: используется для работы с клавишами клавиатуры, такими как Enter, Tab, и т.д.
// - until: содержит условия для ожидания, например, когда элемент станет видимым или доступным для взаимодействия.
const { Builder, By, Key, until } = require('selenium-webdriver');

// Импортируем модуль assert, который используется для выполнения проверок в тестах.
const assert = require('assert');

// Импортируем модуль path для работы с путями файлов в файловой системе.
// Это необходимо для создания абсолютных путей к файлам, которые будут загружаться.
const path = require('path');

// Описание тестового набора
describe('test 1', function() {
  this.timeout(200000); // Устанавливаем тайм-аут для выполнения теста с учетом слипов после каждого файла.
  let driver; // Переменная для управления браузером (WebDriver).
  let vars; // Переменная для хранения данных между тестами.

  // Блок, выполняющийся перед каждым тестом
  beforeEach(async function() {
    // Создаем экземпляр WebDriver для управления браузером Microsoft Edge.
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
    vars = {}; // Инициализируем объект для хранения промежуточных данных.

    // Загружаем веб-приложение для тестирования.
    console.log("Step 1: Opening the test application");
    await driver.get("https://file-sharing-dev.netlify.app/");
  });

  // Блок, выполняющийся после каждого теста
  afterEach(async function() {
    // Закрываем браузер и освобождаем ресурсы, связанные с WebDriver.
    if (driver) {
      await driver.quit();
    }
  });

  // Основной тест
  it('test 1', async function() {
    // Устанавливаем размеры окна браузера.
    console.log("Step 2: Resizing browser window");
    await driver.manage().window().setRect({ width: 1936, height: 1048 });
    await driver.sleep(3000); // Ожидание 3 секунды

    // Находим и кликаем на кнопку загрузки файла.
    console.log("Step 3: Clicking upload button");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем pdf файл.
    console.log("Step 4: Uploading the first file");
    const firstFilePath = path.join(__dirname, "..", "test_files", "1.pdf");
    await driver.findElement(By.css(".border")).sendKeys(firstFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку первого файла.
    console.log("Step 5: Confirming the first file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем JPEG файл.
    console.log("Step 6: Uploading the second file");
    const secondFilePath = path.join(__dirname, "..", "test_files", "Full.jpeg");
    await driver.findElement(By.css(".border")).sendKeys(secondFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку второго файла.
    console.log("Step 7: Confirming the second file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем GIF файл.
    console.log("Step 8: Uploading the third file");
    const thirdFilePath = path.join(__dirname, "..", "test_files", "response.gif");
    await driver.findElement(By.css(".border")).sendKeys(thirdFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку третьего файла.
    console.log("Step 9: Confirming the third file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем ZIP файл.
    console.log("Step 10: Uploading the fourth file");
    const fourthFilePath = path.join(__dirname, "..", "test_files", "ZIP.zip");
    await driver.findElement(By.css(".border")).sendKeys(fourthFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку четвертого файла.
    console.log("Step 11: Confirming the fourth file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем RAR файл.
    console.log("Step 12: Uploading the fifth file");
    const fifthFilePath = path.join(__dirname, "..", "test_files", "RAR.rar");
    await driver.findElement(By.css(".border")).sendKeys(fifthFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку пятого файла.
    console.log("Step 13: Confirming the fifth file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем XLSX файл.
    console.log("Step 14: Uploading the sixth file");
    const sixthFilePath = path.join(__dirname, "..", "test_files", "Tels.xlsx");
    await driver.findElement(By.css(".border")).sendKeys(sixthFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку шестого файла.
    console.log("Step 15: Confirming the sixth file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем XLS файл.
    console.log("Step 16: Uploading the seventh file");
    const seventhFilePath = path.join(__dirname, "..", "test_files", "test1.xls");
    await driver.findElement(By.css(".border")).sendKeys(seventhFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку седьмого файла.
    console.log("Step 17: Confirming the seventh file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем DOCX файл.
    console.log("Step 18: Uploading the eighth file");
    const eighthFilePath = path.join(__dirname, "..", "test_files", "test2.docx");
    await driver.findElement(By.css(".border")).sendKeys(eighthFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку восьмого файла.
    console.log("Step 19: Confirming the eighth file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем DOC файл.
    console.log("Step 20: Uploading the ninth file");
    const ninthFilePath = path.join(__dirname, "..", "test_files", "doc.doc");
    await driver.findElement(By.css(".border")).sendKeys(ninthFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку девятого файла.
    console.log("Step 21: Confirming the ninth file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Загружаем JPG файл.
    console.log("Step 22: Uploading the tenth file");
    const tenthFilePath = path.join(__dirname, "..", "test_files", "Нормальный.jpg");
    await driver.findElement(By.css(".border")).sendKeys(tenthFilePath);
    await driver.sleep(3000); // Ожидание 3 секунды

    // Подтверждаем загрузку десятого файла.
    console.log("Step 23: Confirming the tenth file upload");
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ожидание 3 секунды

    // Завершаем тест.
    console.log("Step 24: Test completed");
  });
});
