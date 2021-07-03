import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConvertUSD from './services/exchangerate';
import GlobalCurrency from './services/convertglobalcurrency';

//CurrencyXChange UI Logic

//Display errors
function displayCallErrors(error) {
  $('#errorDiv').show();
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
    displayCallErrors(error);
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
$('#convertGlobal').click(function() {

  let amount = $('#enterAmount2').val();
  let startingCurrency = $('#startingCurrency').val().toUpperCase();
  let endingCurrency = $('#endingCurrency').val().toUpperCase();

  GlobalCurrency.convertCurrency(amount, startingCurrency, endingCurrency)
    .then(function(response) {
      if (response instanceof Error) {
        throw Error(`ExchangeRate-API error: ${response.message}`);
      }
      let internationalAmount = response.conversion_result;
      if (isNaN(internationalAmount) === true) {
        $('#globalOutput').html('Currency not supported');
      } else {
        $('#globalOutput').html(internationalAmount.toFixed(2));
        $('#currencyCode2').html(endingCurrency);}
    })
    .catch(function(error) {
      displayCallErrors(error.message);
    });
});
