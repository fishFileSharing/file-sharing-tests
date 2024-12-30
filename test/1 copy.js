const { Builder, By, until } = require("selenium-webdriver")
const assert = require("assert")

describe("Test in Edge with Authentication Popup", function () {
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
  it("should open the-internet.herokuapp.com/basic_auth and check the title", async function () {
    this.timeout(10000)

    // Відкриваємо головну сторінку the-internet.herokuapp.com/basic_auth
    await driver.get("http://admin:admin@the-internet.herokuapp.com/basic_auth")

    // Очікуємо, поки сторінка повністю завантажиться (можна також використовувати інші умови)
    await driver.wait(until.titleIs("The Internet"), 5000)

    // Перевіряємо, чи заголовок сторінки містить слово "The Internet"
    const pageTitle = await driver.getTitle()
    assert(pageTitle.includes("The Internet"))
  })
})
