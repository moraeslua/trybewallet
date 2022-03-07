const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const currencyQuotesAPI = () => fetch(API_URL).then((response) => response
  .json()
  .then((json) => {
    delete json.USDT;
    return response.ok ? Promise.resolve(json) : Promise.reject(json);
  }));

export default currencyQuotesAPI;
