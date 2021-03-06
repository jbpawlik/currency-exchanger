# __CurrencyXChange__


<img src="https://github.com/jbpawlik/currency-exchanger/blob/main/src/assets/images/screenshot.PNG" alt="Currency X Change website screenshot" title="Currency X Change Header" width="400">

### by [James Benjamin Pawlik](http://github.com/jbpawlik)

### __Description__
Currency X Change is a proof-of-concept website for a service that converts and exchanges international currencies. It makes calls to an API that provides forex rates and uses the data returned to set prices.


### __Technologies Used__
The Currency X Change website is built using HTML, CSS, and Bootstrap. Service and UI logic are written in Javascript and JQuery. API calls are made with Javascript using the Fetch API, then parsed from JSON. Calls are made to ExchangeRate-API, a service that converts currency using forex data. Postman was used to evaluate API calls.

### __Setup/Installation__
1. Because this project makes calls to an API, it is necessary to register for a free account and API key at [exchangerate-api.com](https://www.exchangerate-api.com/). Click on Get Free Key at the top of the page and follow the instructions.
2. Download or clone the [repository](http://github.com/jbpawlik/currency-exchanger) to your local machine
3. Navigate to the top level of the directory
4. Create an empty file named .env inside the directory
5. Inside the .env file, write "API_Key=" (without quotes), paste in your API key, and save.
6. Open the .gitinore file and add .env to the list of ignored files. This will prevent your .env file and API key from being uploaded to GitHub (to protect your key from unauthorized access)
7. Install Node Package Manager before proceeding with the rest of the instructions
8. Open a terminal in the top level of the directory and run "npm install"
9. Run "npm run build"
10. "npm run start" will open the website in your browser
11. Any API errors will be reported in a text field on the site. Information about API errors can be found [here](https://blog.runscope.com/posts/how-to-debug-common-api-errors)

Alternately, visit the live site at [Github Pages](https://jbpawlik.github.io/currency-exchanger/)

### __Known Bugs / Future Goals__
No bugs have been found or reported. Please contact the author if you experience poor performance.

Future goals for __Currency X Change__:

1. Connect to other financial APIs to track forex price changes
2. Link to financial news about converted currency

### __License__
This software is licensed under the [BSD license](license.txt).

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

Copyright (c) 2021 James Benjamin Pawlik

### __Contact Information__
Contact the author at __james.benjamin.pawlik@gmail.com__
