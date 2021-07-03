import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConvertUSD from './services/exchangerate';
import GlobalCurrency from './services/convertglobalcurrency';

//CurrencyXChange UI Logic

//Display API errors
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
    sessionStorage.setItem('usdExchangeRates', JSON.stringify(conversionRates, null, "\n"));
  })
  .catch(function(error) {
    displayCallErrors(error);
  });

//Add USD conversion rates to sidebar
$('#USDRates').html(sessionStorage.getItem('usdExchangeRates').replace(/"/g, "").replace(/,/g, '<br>').replace(/{/g, "").replace(/}/g, ""));

//Click to convert USD into other currencies
$('#convertUSD').click(function() {
  let rates = sessionStorage.getItem('usdExchangeRates');
  let ratesArray = JSON.parse(rates);
  let amount = $('#enterAmount').val();
  let currency = $('#outputDropdown').val();

  let exchangeRate = ratesArray[currency];
  let convertedAmount = (amount * exchangeRate).toFixed(2);
  convertUSD(convertedAmount);
});

//Outputs USD conversion or unsupported currency error
function convertUSD(amount) {
  let currency = $('#outputDropdown').val();
  if (isNaN(amount) === false) {
    $('#outputAmount').html(amount);
    $('#currencyCode').html(currency);
  } else {
    $('#outputAmount').html('');
    $('#currencyCode').html('Currency not supported');
  }
}

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
      convertInternational(internationalAmount);
    })
    .catch(function(error) {
      displayCallErrors(error.message);
    });
});

//Outputs international currency conversion or unsupported currency error
function convertInternational(amount) {
  let endingCurrency = $('#endingCurrency').val().toUpperCase();
  if (isNaN(amount) === true) {
    $('#globalOutput').html('Currency not supported');
    $('#currencyCode2').html('');
  } else {
    $('#globalOutput').html(amount.toFixed(2));
    $('#currencyCode2').html(endingCurrency);
  }
}
