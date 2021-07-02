import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeCurrency from './services/exchangerate';

//CurrencyXChange UI Logic

let currency = 'USD';

//Call API to get USD conversion rates when user loads the page, save to sessionStorage
ExchangeCurrency.getRates(currency)
  .then(function(response) {
    if (response instanceof Error) {
      throw Error(response.message)
    }
    console.log(response);
    sessionStorage.setItem('usdExchangeRates', JSON.stringify(response.conversion_rates));
    console.log(sessionStorage);
  });
$