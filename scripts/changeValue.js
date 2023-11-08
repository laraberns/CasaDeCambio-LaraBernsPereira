let valueToChange = document.getElementById('inputValueToExchange')
let buttonCalcular = document.getElementById('btnSubmit')
let form = document.getElementById('idForm')
let currencyOrigin = document.querySelector('.coinsListChange')
let currencyDestiny = document.querySelector('.coinsListRecieve')
let cotacaoDeCompra = document.getElementById('idCompra')
let output = document.querySelector('.output')

form.onsubmit = (event) => {
    event.preventDefault()

    if (cotacaoDeCompra.checked == true) {
        displayCotacaoDeCompraCalc()
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
// start - getting cotacaoDeCompra - 1. USD (Coin selected) --> REAL 

async function cotacaoDeCompraCalc() {
    let symbolOfCoin = currencyOrigin.value.substring(0, (currencyOrigin.value).search("-") - 1)

    let coinPriceSellingToHouse = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${symbolOfCoin}'&@dataCotacao='${currentDate}'&$top=100&$format=json&$select=cotacaoCompra`)

    return coinPriceSellingToHouse.json()
}

async function displayCotacaoDeCompraCalc() {
    let displayCotacaoDeCompra = await cotacaoDeCompraCalc()
    let valueCotacaoDeCompra = (displayCotacaoDeCompra.value[displayCotacaoDeCompra.value.length - 1])
    valueCotacaoDeCompra = valueCotacaoDeCompra.cotacaoCompra * valueToChange.value
    displayCotacaoDeVendaCalc(valueCotacaoDeCompra)
}

// end - getting cotacaoDeCompra - Example: 1. USD (Coin selected - Origin) --> REAL


// start - getting cotacaoDeVenda - Example: 1. REAL --> EUR (Coin selected - Destiny) 

async function cotacaoDeVendaCalc() {
    let symbolOfCoin = currencyDestiny.value.substring(0, (currencyDestiny.value).search("-") - 1)

    let coinPriceBuyingFromHouse = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${symbolOfCoin}'&@dataCotacao='${currentDate}'&$top=100&$format=json&$select=cotacaoVenda`)

    return coinPriceBuyingFromHouse.json()
}

async function displayCotacaoDeVendaCalc(valueInReais) {
    let displayCotacaoDeVenda = await cotacaoDeVendaCalc()
    let valueCotacaoDeVenda = (displayCotacaoDeVenda.value[displayCotacaoDeVenda.value.length - 1])
    valueCotacaoDeVenda = valueCotacaoDeVenda.cotacaoVenda
    valueTotal = valueInReais / valueCotacaoDeVenda

    output.innerText = valueTotal.toFixed(2)
    return valueTotal
}

// end - getting cotacaoDeVenda - Example: 1. REAL --> EUR (Coin selected - Destiny)



