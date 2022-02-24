const express = require('express');
const path = require('path');

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '72b9be6f5f7b49f1ac299b3c508392c5',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'))
});

try {nonExistentFunction(); 
} catch (error) {
    rollbar.error(`${nonExistentFunction} does not exist.`);     
    // expected output: ReferenceError: nonExistentFunction is not defined     
    // Note - error messages will vary depending on browser 
    }
try {nonExistentFunction(); 
} catch (error) {
    rollbar.critical(`${nonExistentFunction} does not exist. CRITICAL`);     
    // expected output: ReferenceError: nonExistentFunction is not defined     
    // Note - error messages will vary depending on browser 
    }
const port = process.env.PORT || 4005

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})