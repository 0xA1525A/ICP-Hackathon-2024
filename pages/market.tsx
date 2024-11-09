import { Floatbar } from "@/components/floatbar";
import { Navbar } from "@/components/navbar";
import fetchCryptoPrice from "../lib/fetchCrytoprice";
import { IsAuthed } from "../lib/userContext";

const coinLists = [
	{
		image: "/bitcoin-btc-logo.svg",
		name: "bitcoin",
		unit: "BTC",
		key: "BTC-USD",
	},
	{
		image: "/ethereum-eth-logo.svg",
		name: "ethereum",
		unit: "ETH",
		key: "ETH-USD",
	},
	{
		image: "/ethereum-eth-logo.svg",
		name: "Tether",
		unit: "USDT",
		key: "USDT-USD",
	},
	{
		image: "/ethereum-eth-logo.svg",
		name: "Solana",
		unit: "SOL",
		key: "SOL-USD",
	},
	{
		image: "/ethereum-eth-logo.svg",
		name: "BNB",
		unit: "BNB",
		key: "BNB-USD",
	},
	{
		image: "/ethereum-eth-logo.svg",
		name: "XRP",
		unit: "XRP",
		key: "XRP-USD",
	},
	{
		image: "/ethereum-eth-logo.svg",
		name: "Dogecoin",
		unit: "DOGE",
		key: "DOGE-USD",
	},
];

export default function page() {
	return (
		<IsAuthed>
			<Navbar />
			<h1 className="text-3xl font-bold">Currencies</h1>
			<div className="flex flex-col divide-y-2">
				{coinLists.map((coin, index) => (
					<div
						key={`prices_${coin.unit}`}
						className="flex gap-4 items-center px-4 py-3"
					>
						<img src={coin.image} alt={coin.name} className="size-10" />
						<div>
							<p className="text-lg font-bold capitalize">{coin.name}</p>
							<p className="text-sm">{fetchCryptoPrice(coin.key)} USD</p>
						</div>
					</div>
				))}
			</div>
			<Floatbar />
		</IsAuthed>
	);
}
