const puppeteer=require('puppeteer')
console.log('Before')
let browserWillLaunchPromise = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport:null
})
// // browserWillLaunchPromise.then(function()
// // {
// //     console.log("Brower Opened")
// })

//this promise when resolved retruns a browser instance which we can use to open other websites
 browserWillLaunchPromise.then(function(browserInsatnce)
 {
     let newTabPromise = browserInsatnce.newPage()
     return newTabPromise
 }).then(function(newTab)
 {
     console.log("New tab opened")
     let websiteWillbeOpenedPromise = newTab.goto("https://www.pepcoding.com/");
     return websiteWillbeOpenedPromise
 }).then(function()
 {
     console.log('Pepcoding Website Opened')
})

console.log('After')