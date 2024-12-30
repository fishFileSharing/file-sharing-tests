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
  it("should open https://file-sharing-dev.netlify.app/ and check for title", async function () {
    this.timeout(10000)

    await driver.get("https://file-sharing-dev.netlify.app/")
    await driver.sleep(1000) // Пауза 1 секунда

    await driver.wait(
      until.elementLocated(By.css('[data-testid="home-page-title"]')),
      5000
    )
    let element = await driver.wait(
      until.elementLocated(By.css('[data-testid="home-page-title"]')),
      1000
    )

    await driver.sleep(1000) // Пауза 1 секунда

    assert(text.includes("file"), 'Текст элемента не содержит слово "file".')

    await driver.sleep(1000) // Пауза 1 секунда
  })
})
