var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

module.exports = {
	name:"Ravencoin",
	logoUrl:"/img/logo/rvn.svg",
	siteTitle:"Ravencoin Explorer",
	siteDescriptionHtml:"<b>RVN Explorer</b> is <a href='https://github.com/russkidooski/btc-rpc-explorer). If you run your own [Ravencoin Full Node](https://github.com/RavenProject/Ravencoin/releases), **RVN Explorer** can easily run alongside it, communicating via RPC calls. See the project [ReadMe](https://github.com/russkidooski/btc-rpc-explorer) for a list of features and instructions for running.",
	nodeTitle:"Ravencoin Full Node",
	nodeUrl:"https://github.com/RavenProject/Ravencoin/releases",
	demoSiteUrl: "https://btc.chaintools.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json",
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json"
	],
	maxBlockWeight: 4000000,
	currencyUnits:[
		{
			name:"RVN",
			multiplier:1,
			default:true,
			values:["", "rvn", "RVN"],
			decimalPlaces:8
		},
		{
			name:"mRVN",
			multiplier:1000,
			values:["mbtc"],
			decimalPlaces:5
		},
		{
			name:"bits",
			multiplier:1000000,
			values:["bits"],
			decimalPlaces:2
		},
		{
			name:"sat",
			multiplier:100000000,
			values:["sat", "satoshi"],
			decimalPlaces:0
		}
	],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	genesisBlockHash: "0000006b444bc2f2ffe627be9d9e7e7a0730000870ef6eb6da46c8eae389df90",
	genesisCoinbaseTransactionId: "n/an",
	genesisCoinbaseTransaction: {
		"hex": "0004ffff001d01044c4d5468652054696d65732030332f4a616e2f3230313820426974636f696e206973206e616d65206f66207468652067616d6520666f72206e65772067656e65726174696f6e206f66206669726d73",
		"txid": "28ff00a867739a352523808d301f504bc4547699398d70faf2266a8bae5f3516",
		"hash": "28ff00a867739a352523808d301f504bc4547699398d70faf2266a8bae5f3516",
		"size": 214,
		"vsize": 214,
		"version": 1,
		"confirmations":368594,
		"vin": [
			{
				"coinbase": "0004ffff001d01044c4d5468652054696d65732030332f4a616e2f3230313820426974636f696e206973206e616d65206f66207468652067616d6520666f72206e65772067656e65726174696f6e206f66206669726d73",
				"sequence": 4294967295
			}
		],
		"vout": [
			{
				"value": 5000,
				"n": 0,
				"scriptPubKey": {
					"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
					"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
					"reqSigs": 1,
					"type": "pubkey",
					"addresses": [
						"RJJBTXXfgE5DjiPQpZSnYrQe73NhrBZ3ao"
					]
				}
			}
		],
		"blockhash": "0000006b444bc2f2ffe627be9d9e7e7a0730000870ef6eb6da46c8eae389df90",
		"time": 1514999494,
		"blocktime": 1514999494
	},
	historicalData: [
		{
			type: "blockheight",
			date: "2009-01-03",
			blockHeight: 0,
			blockHash: "0000006b444bc2f2ffe627be9d9e7e7a0730000870ef6eb6da46c8eae389df90",
			summary: "The Ravencoin Genesis Block.",
			alertBodyHtml: "This is the first block in the Ravencoin blockchain, known as the 'Genesis Block'",
			referenceUrl: "https://en.bitcoin.it/wiki/Genesis_block"
		},
    {
			type: "blockheight",
			date: "2009-01-03",
			blockHeight: 0,
			blockHash: "0000006b444bc2f2ffe627be9d9e7e7a0730000870ef6eb6da46c8eae389df90",
			summary: "The First Dark Gravity Wave BLock.",
			alertBodyHtml: "This is the Block Dark Gravity Wave activated on.",
			referenceUrl: "https://en.bitcoin.it/wiki/Genesis_block"
		}
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v2/ticker/2577/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return responseBody[0].price_usd;
			}
			
			return -1;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(5000) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 2100000);

		return eras[index];
	}
};
