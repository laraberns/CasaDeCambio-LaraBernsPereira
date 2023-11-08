let valueToChange = document.getElementById('inputValueToExchange')
let buttonCalcular = document.getElementById('btnSubmit')
let form = document.getElementById('idForm')
let currencyOrigin = document.querySelector('.coinsListChange')
let currencyDestiny = document.querySelector('.coinsListRecieve')
let cotacaoDeCompra = document.getElementById('idCompra')
let output = document.querySelector('.output')

form.onsubmit = (event) => {
    event.preventDefault()

    if (currencyOrigin.value == currencyDestiny.value) {
        document.querySelector('.output').innerText = "Escolha tipos de moedas diferentes!"
    } else {
        if (cotacaoDeCompra.checked == true) {
            displayCotacaoDeCompraCalc()
        } else {
            displayCotacaoDeVendaCalcInversa()
        }
    }

}

// getting date of today and formatting
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate

if (day < 10 && month >= 10) {
    currentDate = `${month}-0${day}-${year}`;
} else
    if (day < 10 && month < 10) {
        currentDate = `0${month}-0${day}-${year}`;
    } else
        if (day > 10 && month < 10) {
            currentDate = `0${month}-${day}-${year}`;
        } else {
            currentDate = `${month}-${day}-${year}`;
        }


// COTACAO DE COMPRA
// start - getting cotacaoDeCompra - 1. USD (Coin selected - User want to sell) --> REAL 

async function cotacaoDeCompraCalc() {
    let symbolOfCoin = currencyOrigin.value.substring(0, (currencyOrigin.value).search("-") - 1)

    let coinPriceSellingToHouse = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${symbolOfCoin}'&@dataCotacao='${currentDate}'&$top=100&$format=json&$select=cotacaoCompra`)

    return coinPriceSellingToHouse.json()
}

async function displayCotacaoDeCompraCalc() {
    let displayCotacaoDeCompra = await cotacaoDeCompraCalc()
    let valueCotacaoDeCompra = (displayCotacaoDeCompra.value[displayCotacaoDeCompra.value.length - 1])
    // getting full value that user is getting in Reais - Cotação de Compra x Value that user has
    valueCotacaoDeCompra = valueCotacaoDeCompra.cotacaoCompra * valueToChange.value
    displayCotacaoDeVendaCalc(valueCotacaoDeCompra)
}

// end - getting cotacaoDeCompra - Example: 1. USD (Coin selected - Origin) --> REAL


// start - getting cotacaoDeVenda - Example: 1. REAL --> EUR (Coin selected - Destiny) - transforming value in Reais to value in EUR (User is buying coins from the store)

async function cotacaoDeVendaCalc() {
    let symbolOfCoin = currencyDestiny.value.substring(0, (currencyDestiny.value).search("-") - 1)

    let coinPriceBuyingFromHouse = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${symbolOfCoin}'&@dataCotacao='${currentDate}'&$top=100&$format=json&$select=cotacaoVenda`)

    return coinPriceBuyingFromHouse.json()
}

async function displayCotacaoDeVendaCalc(valueInReais) {
    let displayCotacaoDeVenda = await cotacaoDeVendaCalc()
    let valueCotacaoDeVenda = (displayCotacaoDeVenda.value[displayCotacaoDeVenda.value.length - 1])
    valueCotacaoDeVenda = valueCotacaoDeVenda.cotacaoVenda
    // valueTotal is the value that user sold in reais / currency of buying EUR from the store
    valueTotal = valueInReais / valueCotacaoDeVenda

    output.innerText = valueTotal.toFixed(2) + ` ${currencyDestiny.value.substring(0, (currencyDestiny.value).search("-") - 1)} ` + "a receber."

    return valueTotal
}

// end - getting cotacaoDeVenda - Example: 1. REAL --> EUR (Coin selected - Destiny)

// COTACAO DE VENDA
// start - getting cotacaoDeVenda - 1. EUR (Coin selected) --> REAL - Getting how much reais the user needs to buy to get the value that he wants. 

async function cotacaoDeVendaCalcInversa() {
    let symbolOfCoin = currencyDestiny.value.substring(0, (currencyOrigin.value).search("-") - 1)

    let coinPriceBuyingFromHouse = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${symbolOfCoin}'&@dataCotacao='${currentDate}'&$top=100&$format=json&$select=cotacaoVenda`)

    return coinPriceBuyingFromHouse.json()
}

async function displayCotacaoDeVendaCalcInversa() {
    let displayCotacaoDeVenda = await cotacaoDeVendaCalcInversa()
    let valueCotacaoDeVenda = (displayCotacaoDeVenda.value[displayCotacaoDeVenda.value.length - 1])
    valueCotacaoDeVenda = valueCotacaoDeVenda.cotacaoVenda

    //how much reais the user needs to buy to get the value that he wants
    let valueNeeded = (valueToChange.value * valueCotacaoDeVenda)
    displayCotacaoDeCompraCalcInversa(valueNeeded)
}

// end - getting cotacaoDeVenda - Got the value needed in reais to the value set by the user - Example: 100 USD = R$ 522.14)


// start - getting cotacaoDeCompra - 1. REAL --> USD (Coin that person is selling to buy another currency (EUR))

async function cotacaoDeCompraCalcInversa() {
    let symbolOfCoin = currencyOrigin.value.substring(0, (currencyOrigin.value).search("-") - 1)

    let coinPriceSellingToHouse = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${symbolOfCoin}'&@dataCotacao='${currentDate}'&$top=100&$format=json&$select=cotacaoCompra`)

    return coinPriceSellingToHouse.json()
}

async function displayCotacaoDeCompraCalcInversa(valueInReais) {
    let displayCotacaoDeCompra = await cotacaoDeCompraCalcInversa()
    let valueCotacaoDeCompra = (displayCotacaoDeCompra.value[displayCotacaoDeCompra.value.length - 1])
    // getting how much the user needs to pay for the store to get the value in reais / currency of the Cotação de Compra
    let valuePaidByUser = (valueInReais / valueCotacaoDeCompra.cotacaoCompra)

    output.innerText = valuePaidByUser.toFixed(2) + ` ${currencyOrigin.value.substring(0, (currencyOrigin.value).search("-") - 1)} ` + "a pagar."

    return valuePaidByUser
}

// end - getting cotacaoDeCompra - 1. REAL --> USD (Coin selected - Coin that person is selling to buy another currency (EUR))



