// Импортируем необходимые модули из Selenium WebDriver
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const path = require('path'); // Импортируем модуль path для работы с путями файлов

// Описание тестового набора
describe('test 1', function() {
  this.timeout(30000); // Устанавливаем тайм-аут для выполнения теста в 30 секунд.
  let driver; // Переменная для управления браузером (WebDriver).
  let vars; // Переменная для хранения данных между тестами.

  // Блок, выполняющийся перед каждым тестом
  beforeEach(async function() {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
    vars = {}; // Инициализируем объект для хранения промежуточных данных.

    console.log("Step 1: Opening the test application");
    await driver.get("https://file-sharing-dev.netlify.app/");
  });

  // Блок, выполняющийся после каждого теста
  afterEach(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  // Основной тест
  it('test 1', async function() {
    console.log("Step 2: Resizing browser window");
    await driver.manage().window().setRect({ width: 1936, height: 1048 });

    // Загружаем первый файл
    console.log("Step 3: Uploading the first file (1.pdf)");
    const firstFilePath = path.join(__dirname, "..", "test_files", "1.pdf");
    await driver.findElement(By.css(".border")).sendKeys(firstFilePath);
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ждем 3 секунды для обработки

    // Загружаем второй файл
    console.log("Step 4: Uploading the second file (Full.jpeg)");
    const secondFilePath = path.join(__dirname, "..", "test_files", "Full.jpeg");
    await driver.findElement(By.css(".border")).sendKeys(secondFilePath);
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(3000); // Ждем 3 секунды для обработки

    // Загружаем третий файл
    console.log("Step 5: Uploading the third file (Full.png)");
    const thirdFilePath = path.join(__dirname, "..", "test_files", "Full.png");
    await driver.findElement(By.css(".border")).sendKeys(thirdFilePath);
    await driver.findElement(By.css(".min-w-fit")).click();
    await driver.sleep(5000); // Ждем 5 секунд для завершения обработки

    console.log("Step 6: Test completed");
  });
});
