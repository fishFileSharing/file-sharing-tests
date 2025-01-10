const { Builder, By, until, Key } = require("selenium-webdriver")
// Импортируем модули из Selenium WebDriver.
// - `Builder` используется для создания экземпляра WebDriver.
// - `By` позволяет находить элементы на странице.
// - `until` предоставляет условия ожидания.
// - `Key` позволяет использовать специальные клавиши клавиатуры.

const assert = require("assert")
// Импортируем библиотеку `assert` для выполнения проверок (assertions) в тестах.

const path = require("path")
// Импортируем модуль `path` для работы с путями файловой системы, например, для создания полного пути к файлу.

describe("Select a file and check if it's name appears on page", function () {
  this.timeout(20000)

  // Описываем тестовый набор (test suite) с названием "Выбрать файл и проверить, отображается ли его имя на странице".

  let driver
  // Объявляем переменную `driver`, которая будет использоваться для управления браузером.

  beforeEach(async function () {
    // Хук `beforeEach` запускается перед каждым тестом внутри тестового набора.
    driver = await new Builder().forBrowser("MicrosoftEdge").build()
    // Создаем экземпляр WebDriver для браузера Microsoft Edge.
  })

  afterEach(async function () {
    // Хук `afterEach` запускается после каждого теста внутри тестового набора.
    if (driver) {
      await driver.quit()
      // Завершаем работу WebDriver, чтобы закрыть браузер и освободить ресурсы.
    }
  })

  it("should open https://file-sharing-dev.netlify.app/ and check for title", async function () {
    // Описываем отдельный тест с названием: "Открыть сайт и проверить заголовок".
    // Устанавливаем тайм-аут для теста в 10 секунд.

    await driver.get("https://file-sharing-dev.netlify.app/")
    // Загружаем указанную веб-страницу в браузере.

    await driver.sleep(5000)
    // Ждем 3 секунды, чтобы страница успела полностью загрузиться.

    let selectFilesInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="select-files-input"]')),
      10000
    )
    // Ожидаем, пока на странице появится элемент с CSS-селектором `data-testid="select-files-input"`.
    // Максимальное время ожидания — 5 секунд.

    const filePath = path.join(__dirname, "..", "test_files", "jpg.jpg")
    // Создаем абсолютный путь к файлу `pdf.pdf`, который находится в папке `test_files`.

    selectFilesInput.sendKeys(filePath)
    // Отправляем путь к файлу в поле ввода, чтобы загрузить файл на сайт.

    await driver.sleep(5000)
    // Ждем 3 секунды, чтобы система успела обработать загрузку файла.

    let selectedFileName = await driver.wait(
      until.elementLocated(By.css('[data-testid="selected-file-name"]')),
      10000
    )
    await driver.sleep(1000)
    // Ожидаем, пока на странице появится элемент с CSS-селектором `data-testid="selected-file-name"`.
    // Этот элемент отображает имя загруженного файла.

    let selectedFileNameText = await selectedFileName.getText()
    // Считываем текст из элемента, который отображает имя файла.
    
    assert(
      selectedFileNameText.includes("jpg", "Something is wrong with filename")
    )
    // Проверяем, содержит ли текст имя файла "jpg.jpg". Если нет, выбрасывается ошибка с сообщением.
    await driver.findElement(By.css(".end")).click()
    await driver.sleep(1000)
// Додаємо перевірку на успішне завантаження файлу
let successMessage = await driver.wait(
  until.elementLocated(By.xpath('/html/body/div/div/main/section/div[1]/div[1]/div/input')),
  7000
);
  // Ожидаем, пока на странице появится элемент с CSS-селектором `data-testid="upload-success-message"`
  // Этот элемент отображает сообщение об успешной загрузке файла.   


    let successMessageText = await successMessage.getText()
     console.log(111111,successMessageText)
    // Считываем текст из элемента, который отображает сообщение об успешной загрузке файла.
    
    // Проверяем, соответствует ли текст сообщению "File uploaded successfully". Если нет, выбрасывается ошибка с сообщением.
    
    await driver.sleep(1000)
  })
})
