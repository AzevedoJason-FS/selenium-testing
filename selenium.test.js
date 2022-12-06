const {Builder, By, Key, Until, until} = require('selenium-webdriver');
require('dotenv').config();

describe("", () => {
    let driver;

    beforeAll(async() => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    afterAll(async () => await driver.quit());

    const setDelay = async () => {
        await driver.sleep(500)
    };

    it("As a user I want to open localhost home page", async () => {
        await driver.get(process.env.url);
        await driver.getTitle().then(title => {
            expect(title).toEqual("Home")
        });
        await setDelay();
    });

    it("As a user I want to open localhost contact page", async () => {
        await driver.get(`${process.env.url}/contact`);
        await driver.getTitle().then(title => {
            expect(title).toEqual("Contact Us")
        });
        await setDelay();
    });

    it("As a user I want to signup with email and read message", async () => {
        await driver.get(driver.getCurrentUrl());
        let element = await driver.findElement(By.name('email'));
        await element.sendKeys('jason@fullsail.com' + Key.ENTER);
        await setDelay();
        let message = await driver.findElement(By.id('message'));
        let value = await message.getText();
        expect(value).toEqual("More info coming to jason@fullsail.com")
        await setDelay();
    });
});