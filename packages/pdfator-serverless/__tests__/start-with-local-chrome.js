const { convertWebpage } = require('../dist');

/*
Start with 
➜ DEBUG=true LOCAL_CHROME=true node start-with-local-chrome.js
*/

convertWebpage().then(res => console.log('result', res));
