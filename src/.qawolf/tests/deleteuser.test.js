const { launch } = require("qawolf");
const selectors = require("../selectors/deleteuser");

describe('deleteuser', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: process.env.ENDPOINT || "http://localhost:3000/" });
  });

  afterAll(async() => {
    try {
      await browser.close();
    }catch(err) {
      console.log(err);
    }
  });
  
  it('can click "username" input', async () => {
    await browser.click(selectors[0]);
  });
  
  it('can clear "username" input', async () => {
    await browser.type(selectors[1], "TestUser");
  });
  
  it("can click input", async () => {
    await browser.click(selectors[2]);
  });
  
  it('can click "title" input', async () => {
    await browser.click(selectors[3]);
  });
  
  it('can clear "title" input', async () => {
    await browser.type(selectors[4], "Task 1");
  });
  
  it("can click input", async () => {
    await browser.click(selectors[5]);
    const hasText = await browser.hasText("Task 1");
    expect(hasText).toBe(true);
  });
  
  it('can click "delete" link', async () => {
    await browser.click(selectors[6]);
    const hasText = await browser.hasText("Task 1");
    expect(hasText).toBe(false);
  });
});