const { launch } = require("qawolf");
const selectors = require("../selectors/createtask");

describe('createtask', () => {
  let browser;

  beforeAll(async () => {
    try {
      browser = await launch({ url: process.env.ENDPOINT || "http://localhost:3000/" });
    }catch(err) {
      console.error(err);
    }
  });

  afterAll(async () => {
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
    await browser.type(selectors[4], "TestTask");
  });
  
  it("can click input", async () => {
    await browser.click(selectors[5]);
    const hasText = await browser.hasText("TestTask");
    expect(hasText).toBe(true);
  });

  

});