const converterForm = document.getElementById("converter-form")
const inputAmount = document.getElementById("amount")
const fromCurrency = document.getElementById("from-currency")
const toCurrency = document.getElementById("to-currency")
const result = document.getElementById("result")


// https://api.exchangerate-api.com/v4/latest/usd
window.addEventListener("load", fetchCurrencies);

converterForm.addEventListener("submit", convertedCurrency);


async function fetchCurrencies(){

 const response = await fetch ("https://api.exchangerate-api.com/v4/latest/usd")
 const data = await response.json();

 const currencyOptions = Object.keys(data.rates);

 currencyOptions.forEach(currency =>{
    const option1 =document.createElement("option")
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1)

    const option2 =document.createElement("option")
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2)
 })


}

async function convertedCurrency(e){
    e.preventDefault();

    const amount = parseFloat(inputAmount.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if (amount < 0){
        alert ("Please enter a valid amount");
        return;
    }

    const response =await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`)
    const data = await response.json();

    const rate = data.rates[toCurrencyValue];
    const convertedAmountRaw = (amount * rate);

    
    const convertedAmount = convertedAmountRaw.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
      });

    result.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;


}

