import DebitCard from "@/components/card";
import { Floatbar } from "@/components/floatbar";
import { Navbar } from "@/components/navbar";
import { IsAuthed } from "@/lib/userContext";
import { ArrowRightLeft, DollarSign, ShuffleIcon } from "lucide-react";
import Link from "next/link";
const coinLists = [
	{
		image: "/bitcoin-btc-logo.svg",
		price: 0.0042,
	},
	{
		image: "/ethereum-eth-logo.svg",
		price: 0.0007,
	},
	{
		image: "/tether-usdt-logo.svg",
		price: 400.0,
	},
];

const mockTransactions = [
	{
		name: "Bitcoin",
		amount: 0.0042,
		description: "Bought 0.0042 BTC",
	},
	{
		name: "Ethereum",
		amount: -0.0007,
		description: "Sold 0.0007 ETH",
	},
	{
		name: "Tether",
		amount: 400.0,
		description: "Bought 400.0 USDT",
	},
	{
		name: "P2P",
		amount: -200.0,
		description: "Sent 200.0 USDT",
	},
	{
		name: "Debit Card",
		amount: -100.0,
		description: "Spent 100.0 USDT",
	},
];

export default function Home() {
	return (
		<IsAuthed>
			<Navbar />
			<div className="flex flex-col md:flex-row gap-4">
				<div className="bg-gray-200 rounded-2xl shadow-xl md:p-6 flex flex-col md:flex-row mb-8 w-full">
					<DebitCard />
					<div className="flex items-start justify-between gap-6 px-6 pb-6 md:pb-0 md:flex-col">
						<div>
							<p>Account Balance</p>
							<h1 className="text-4xl font-bold">$ 4,210</h1>
						</div>
						<div className="flex flex-col justify-between gap-2">
							{coinLists.map((v, i) => (
								<div
									key={`item-k-${v.image}`}
									className="flex gap-2 items-center"
								>
									<img src={v.image} alt="coin" className="w-4 aspect-square" />
									<p className="text-xs font-bold">{v.price}</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="mb-8 flex gap-4 md:flex-col">
					<Link
						href="?transfer=send"
						className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/40 transition rounded-2xl p-4 flex flex-col items-center justify-center font-bold gap-2 grow w-full whitespace-nowrap"
					>
						<ArrowRightLeft className="size-10" />
						Transfer / Receive
					</Link>
					<Link
						href="https://www.bitkub.com/th/market/btc"
						className="bg-green-500/20 text-primary hover:bg-green-500/40 transition rounded-2xl p-4 flex flex-col items-center justify-center font-bold gap-2 grow w-full"
						target="_blank"
					>
						<ShuffleIcon className="size-10" />
						Exchange
					</Link>
				</div>
			</div>
			<div className="mb-3 flex items-center justify-between">
				<h2 className="text-3xl font-bold">Transactions</h2>
				<button
					type="button"
					className="px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
				>
					All Transactions
				</button>
			</div>
			<div className="flex flex-col divide-y-2">
				{mockTransactions.map((v) => (
					<div
						key={`${v.name}_${v.description}`}
						className="flex items-center py-2 px-6 gap-4"
					>
						<div className="aspect-square h-full max-h-12 flex items-center justify-center bg-green-500/20 p-2 text-green-500 rounded-2xl">
							<DollarSign />
						</div>
						<div className="flex flex-col">
							<h2 className="text-lg font-bold">{v.name}</h2>
							<span>{v.description}</span>
						</div>
					</div>
				))}
			</div>
			<Floatbar />
		</IsAuthed>
	);
}
