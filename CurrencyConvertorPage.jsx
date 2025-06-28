import React, { useCallback,useState, useEffect } from "react";


function CurruncyConvertorPage() {

  const [amount, setAmount] = useState(1);
  const [formCurrency, setFormCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rates, setrates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  const CurrencyConvertor = useCallback(() => {
    async function FetchingApi() {
      try {
  const url =`https://open.er-api.com/v6/latest/${formCurrency}`;
	const response = await fetch(url);
	const result = await response.json();
	setrates(result.rates);
  console.log(result.rates.INR)
} catch (error) {
	console.error(error);
}
    }
    FetchingApi()
  }, [formCurrency]);

  useEffect(()=>{
    CurrencyConvertor()
  },[CurrencyConvertor])

const currencyCodes = [
  "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
  "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
  "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
  "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
  "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
  "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
  "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
  "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
  "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
  "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
  "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
  "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
  "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
  "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
  "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
  "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR",
  "ZMW", "ZWL"
];


  const handleConvert = () => {
    if (rates[toCurrency]) {
      const changeAmount = amount * rates[toCurrency];
      setConvertedAmount(changeAmount.toFixed(2));
      console.log("Converted:", changeAmount.toFixed(2));
    } else {
      setConvertedAmount("Error");
    }
  };


  const changeCurrencyCountryName = () =>{
      let temp = formCurrency
      setFormCurrency(toCurrency),
      setToCurrency(temp)
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Currency Converter
          </h1>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e)=>{setAmount(e.target.value)}}
                placeholder="Enter amount"
                className="mt-1 w-full px-4 py-2 rounded-lg bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">From</label>
                <select 
                  value={formCurrency}
                  onChange={(e)=>{setFormCurrency(e.target.value)}} 
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-white text-black shadow-md focus:outline-none"

                >
                  {currencyCodes.map((code)=>{
                    return <option key={code} value={code}>{code}</option>
                  })}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-white">To</label>
                <select 
                onChange={(e)=>{setToCurrency(e.target.value)}} 
                value={toCurrency}
                className="mt-1 w-full px-4 py-2 rounded-lg bg-white text-black shadow-md focus:outline-none" 
                >
                 {currencyCodes.map((code)=>{
                  return <option key={code} value={code}>{code}</option>
                 })}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="rounded-full p-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white" onClick={changeCurrencyCountryName}>
                ⇄
              </button>
            </div>

            <div className="text-center text-white text-xl font-semibold pt-4">
              {convertedAmount !== null ? `converted amount ${toCurrency} ${convertedAmount}` : `converted Amount: 0`}
            </div>

            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl" onClick={handleConvert}>
              Convert
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurruncyConvertorPage;
