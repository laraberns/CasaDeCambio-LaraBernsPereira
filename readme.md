# Currency Exchange Website

## The Challenge ->
The XPTO currency exchange Store has been receiving a large volume of daily currency rate quotation requests from its customers. Currently, these quotation requests come through email, WhatsApp, and phone calls.

To meet the growing demand, the company's management has decided to create a webpage where customers/users can make real-time currency quotations without the need to contact the exchange agencies.

Typically, a quotation request includes the source currency, the target currency, and the amount to convert. This same feature will serve as the basis for creating the currency rate quotation page.

1. The currency exchange deals with all the currencies made available by the Central Bank of Brazil. Currently, this list includes the following:

   - Australian Dollar
   - Canadian Dollar
   - Swiss Franc
   - Danish Krone
   - Euro
   - British Pound
   - Japanese Yen
   - Norwegian Krone
   - Swedish Krona
   - United States Dollar

   **Note:** In case the Central Bank updates the availability of currencies, the conversion page should automatically reflect the new list.

2. The currency exchange always uses the latest quotation from the Central Bank of Brazil.

3. The Central Bank of Brazil provides a public API that can be freely consulted to retrieve the most current exchange rates. The API and its documentation can be accessed through the following link:

   [Central Bank API](https://dadosabertos.bcb.gov.br/dataset/dolar-americano-usd-todos-os-boletins-diarios/resource/ae69aa94-4194-45a6-8bae-12904af7e176)

4. It is desired to allow the user to choose between making the quotation based on the purchase rate or the selling rate. To clarify:

   - "Purchase rate" is the rate the user will receive if they want to sell a foreign currency to the currency exchange.
   - "Selling rate" is the rate the user will pay if they want to buy a foreign currency.

5. The currency exchange does not perform direct conversions (as the exchange will be buying US Dollars) and then a conversion from Brazilian Real to Euro at the selling rate (as the exchange will be selling Euros).

   For example:

   Conversion from USD to EUR:

   1. USD to BRL (Purchase Rate)
   2. BRL to EUR (Selling Rate)


## Overview ->

The Currency Exchange Website is a user-friendly online platform that allows users to convert currency based on a list of currencies provided by the Central Bank of Brazil. Users can easily determine how much they will receive if they want to sell a foreign currency to the currency exchange or how much they will pay if they want to buy a foreign currency. The website is responsive and designed to work seamlessly on mobile devices, tablets, and desktop computers.

## Features

- Currency Conversion: Users can select the source and target currencies, enter the amount to convert, and choose between the purchase rate (how much they will receive) or the selling rate (how much they will pay).

- Real-time Data: The website fetches the latest currency exchange rate data from the Central Bank of Brazil using a public API, ensuring that users always get up-to-date rates.

- User-Friendly Interface: The website is designed with a user-friendly and intuitive interface, making it easy for users to perform currency conversions.

- Responsive Design: The project is responsive, ensuring a seamless user experience on various devices, including mobile phones, tablets, and desktops.

- Bootstrap Customization: Bootstrap was used for the project's responsive design, and the website has been customized to provide a unique and visually appealing experience.

- Data Generation: Images on the website were created using Dall-E, adding a touch of creativity to the project.

## Technologies Used

- JavaScript: Used for the core functionality of the website, including handling user input, making API requests, and performing currency conversions.

- Central Bank of Brazil API: The project utilizes the Central Bank of Brazil's public API to fetch the latest currency exchange rate data.

- Bootstrap: The project's responsive design and layout customization were achieved using the Bootstrap framework.

- Dall-E: Images on the website were generated using Dall-E, adding a creative element to the user interface.
