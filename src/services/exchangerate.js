//Call ExchangeRate API to request USD conversion rates

export default class ExchangeCurrency {
  static async getRates(currency) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}

//Example of how to use Windows.sessionStorage
// async function getSavedMeetingData() {
//   const meetingData = await getMeetingData();
// }

// async function getMeetingData() {
//   const preloadedData = sessionStorage.getItem('meetingData');

//   if (!preloadedData) {
//     try {
//       const response = await fetch('https://myapiurl.com/');
//       const data = validate(response.json());
//       sessionStorage.setItem('meetingData', JSON.stringify(data));
//       return data;
//     } catch (e) {
//       console.log('Whoa! Fetch error with getMeetingData()');
//     }
//   } else {
//     return JSON.parse(preloadedData);
//   }
// }