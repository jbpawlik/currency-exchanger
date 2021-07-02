export default class GlobalCurrency {
  static async convertCurrency(amount, startingCurrency, endingCurrency) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${startingCurrency}/${endingCurrency}/${amount}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}