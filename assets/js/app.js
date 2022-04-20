let btcTicker = "btc";
const coins = document.querySelector("#coins");

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
		"X-RapidAPI-Key": "e7d9710815msh122213a08c14487p1d2ed7jsnfcc325940b79",
	},
};

async function fetchPrice(ticker) {
	const data = await axios.get(
		`https://alpha-vantage.p.rapidapi.com/query?from_currency=${ticker}&from_currency=btc&function=CURRENCY_EXCHANGE_RATE&to_currency=USD`,
		options
	);
	return data;
}


async function getCoinData(ticker) {
	let dataCoin = await fetchPrice(ticker);
	let price =
		dataCoin.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
	price = parseFloat(price).toFixed(2);
	let modPrice = "$ " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let name =
		dataCoin.data["Realtime Currency Exchange Rate"]["2. From_Currency Name"];
	const coinData = {
		name,
		price: modPrice,
	};
	console.log(modPrice);
	return coinData;
}

async function buildPriceList() {
	const coinData = await getCoinData(btcTicker);
	const ulEl = document.createElement("ul");
	const liEl = document.createElement("li");

	liEl.innerText = coinData.name;
	ulEl.append(liEl);
	coins.append(ulEl)
}

buildPriceList();