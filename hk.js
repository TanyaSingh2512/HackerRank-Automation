const puppeteer = require("puppeteer");
let email = "fohej91686@spruzme.com";
let password = "automationproject";
let page; //global varaible so no need to be returned and we can use it
const codeFile=require('./code')

console.log("Before");
let browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});
//promise resolve
//launch gives browser insatance
browserOpen
  .then(function (browserInstance) {
    let openingnewTab = browserInstance.newPage();
    return openingnewTab;
  })
  .then(function (newTab) {
    page = newTab;
    let openingWebsite = newTab.goto("https://www.hackerrank.com/auth/login");
    return openingWebsite;
  })
  .then(function () {
    console.log("Hackerank opened");
    let emailWillBeEnteredPromise = page.type("input[id=input-1]", email, {
      delay: 100,
    });
    //now we have opened hackerrank in that newtab only so page will contain hackerrank now
    // let emailEnteredPromise=page.type('')
    //it will take where to type emai,email and speed
    return emailWillBeEnteredPromise;
  })
  .then(function () {
    let passwordWillBeEnteredPromise = page.type(
      "input[id=input-2]",
      password,
      { delay: 100 }
    );
    return passwordWillBeEnteredPromise;
  })
  .then(function () {
    letloginbuttonCickPromise = page.click(
      "button[data-analytics=LoginPassword]",
      { delay: 50 }
    );
  })
  .then(function () {
    let algoSecClickedPromise = waitAndClick(
      'a[data-attr1="algorithms"]',
      page
    );
    return algoSecClickedPromise;
  })
  .then(function () {
    console.log("Algo section clicked");
  })
  .then(function () {
    let WarmupSectionClickedPromise = waitAndClick(
      'input[value="warmup"]',
      page
    );
    return WarmupSectionClickedPromise;
  })
  .then(function () {
    console.log("Warmup section clicked");
  })
  .then(function () {
    let allquestionsArrPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    return allquestionsArrPromise;
  })
  .then(function (totalquesArr) {
      console.log("Number of Questions->" + totalquesArr.length);
      let questionWillbesolved = questionSolver(page, totalquesArr[0], codeFile.answers[0])
      return questionWillbesolved
  })

function waitAndClick(selector, cPage) {
  //creating a promise
  return new Promise(function (resolve, reject) {
    let waitForModalPromise = cPage.waitForSelector(selector);
    //if the selector is founf then click it
    waitForModalPromise
      .then(function () {
        let clickModal = cPage.click(selector, { delay: 100 });
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });
}

function questionSolver(page, question, answer)
{
    return new Promise(function (resolve, reject)
    {
        let questionWillBeClickedPromise = question.click()
        questionWillBeClickedPromise.then(function () {
            console.log('Question is clicked')
        })
    })
}

console.log("After");
