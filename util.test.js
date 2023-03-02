const puppeteer = require('puppeteer');
const {generateText } = rewuire('./util');

test('should output name and age', () =>{
    const text = generateText('Max', 29);
    expact(text).toBe('Max (29 years old)');
 
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});

test('should create an element with texe and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // sloeMo: 80,
        // args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto(
        'file:///C:/Users/USER/Desktop/udemy/udemy-jest-puppeteer/index.html'
    );
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (28 years old)');

}, 10000);