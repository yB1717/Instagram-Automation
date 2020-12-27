const puppeteer = require("puppeteer");
const loginData = require("./insta.json");
let noOfPosts = process.argv[2];

(async () => {
  //Launching chromium browser.
  const browser = await puppeteer.launch({ headless: false });

  //Opening new tab in that opened browser.
  const page = await browser.newPage();

  //Opens the given URL into the previously opened page.
  await page.goto("https://www.instagram.com/", {
    waitUntil: "networkidle2",
    timeout: 0,
  });

  await page.waitForSelector("input[name='username']");

  //Type the username with delay option to have a user-like experience.
  await page.type("input[name='username']", loginData.email, { delay: 100 });

  //Type the password with delay option to have a user-like experience.
  await page.type("input[name='password']", loginData.pwd, { delay: 100 });

  //Click on the login button
  await page.click("button[type='submit']");

  await page.waitForNavigation({ timeout: 0, waitUntil: "networkidle2" });
  await page.waitForSelector(".Fifk5 ._2dbep.qNELH ._6q-tv");
  await page.click(".Fifk5 ._2dbep.qNELH ._6q-tv");
  await page.click(".-qQT3");

//   console.log("1");
  await page.waitForSelector(".v1Nh3.kIKUG._bz0w .eLAPa .KL4Bh");
//   console.log("2");
  await page.click(".v1Nh3.kIKUG._bz0w .eLAPa .KL4Bh");

  let i = 0;
  while (i++ < noOfPosts) {
    await page.waitForSelector(".fr66n .wpO6b");
    await page.click(".fr66n .wpO6b" , {delay : 100});
    console.log("Post " + i + " liked");

    await page.waitForSelector("._65Bje.coreSpriteRightPaginationArrow");
    await page.click("._65Bje.coreSpriteRightPaginationArrow" , {delay : 200});
  }

  await browser.close();

})();


