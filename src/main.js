import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConvertUSD from './services/exchangerate';

//CurrencyXChange UI Logic


//Display errors
function displayErrors(error) {
  $('#errorOutput').html(error);
}


//Call API to get USD conversion rates when user loads the page, save to sessionStorage
ConvertUSD.getRates('USD')
  .then(function(response) {
    if (response instanceof Error) {
      throw Error(response.message);
    }
    let conversionRates = response.conversion_rates;
    sessionStorage.setItem('usdExchangeRates', JSON.stringify(conversionRates));
  })
  .catch(function(error) {
    displayErrors(error);
  });



//Click to convert USD into other currencies
$('#convertUSD').click(function() {
  let rates = sessionStorage.getItem('usdExchangeRates');
  let ratesArray = JSON.parse(rates);
  let amount = $('#enterAmount').val();
  let currency = $('#outputDropdown').val();

  let exchangeRate = ratesArray[currency];
  let convertedAmount = (amount * exchangeRate).toFixed(2);
  if (isNaN(convertedAmount) === false) {
    $('#outputAmount').html(convertedAmount);
    $('#currencyCode').html(currency);
  } else {
    $('#outputAmount').html('');
    $('#currencyCode').html('Currency not supported');
  }
});

//Convert international currencies
