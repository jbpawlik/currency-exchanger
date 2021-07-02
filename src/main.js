import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeCurrency from './services/exchangerate';

//CurrencyXChange UI Logic



//Call API to get USD conversion rates when user loads the page, save to sessionStorage
ExchangeCurrency.getRates('USD')
  .then(function(response) {
    if (response instanceof Error) {
      throw Error(response.message);
    }
    let conversionRates = response.conversion_rates;
    sessionStorage.setItem('usdExchangeRates', JSON.stringify(conversionRates));
  })
  .catch(function(error) {
    $('#errorOutput').html(error);
  });


//Click to convert USD into other currencies
$('#convertUSD').click(function() {
  let rates = sessionStorage.getItem('usdExchangeRates');
  let ratesArray = JSON.parse(rates);
  let amount = $('#enterAmount').val();
  let currency = $('#outputDropdown').val();

  let exchangeRate = ratesArray[currency];
  console.log(exchangeRate);
  let convertedAmount = (amount * exchangeRate).toFixed(2);
  $('#outputAmount').html(convertedAmount);
});