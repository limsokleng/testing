const { launch } = require("qawolf");
const selectors = require("../selectors/createuser");

describe('createuser', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: process.env.ENDPOINT || "http://localhost:3000/" });
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
    const hasText = await browser.hasText("TestUser");
    expect(hasText).toBe(true);
  });
});