
// start - display coins on screen
async function searchCoins() {
    let coinsList = await fetch('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json')

    return coinsList.json()
}

async function displayCoins() {
    let displayAllCoins = await searchCoins()
    listCoinsOnScreen(displayAllCoins.value)
}

displayCoins()

function listCoinsOnScreen(listOfCoins) {

    let selectCoinFieldChange = document.querySelector('.coinsListChange')
    let selectCoinFieldRecieve = document.querySelector('.coinsListRecieve')
    
    // display coins - to change field
    for (let index = 0; index < listOfCoins.length; index++) {
        let coinSimbol = listOfCoins[index].simbolo;
        let coinName = listOfCoins[index].nomeFormatado;
        let coin = coinSimbol + ' - ' + coinName

        let createOption = document.createElement('option')
        createOption.innerText = coin
        selectCoinFieldChange.appendChild(createOption)
    }

    // display coins - to recieve field
    for (let index = 0; index < listOfCoins.length; index++) {
        let coinSimbol = listOfCoins[index].simbolo;
        let coinName = listOfCoins[index].nomeFormatado;
        let coin = coinSimbol + ' - ' + coinName

        let createOption = document.createElement('option')
        createOption.innerText = coin
        selectCoinFieldRecieve.appendChild(createOption)
    }
}

// end - display coins on screen