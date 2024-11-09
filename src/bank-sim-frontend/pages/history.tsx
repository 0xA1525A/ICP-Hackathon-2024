import { Floatbar } from "@/components/floatbar";
import { Navbar } from "@/components/navbar";
import { IsAuthed } from "@/lib/userContext";
import { DollarSign } from "lucide-react";

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

export default function History() {
	return (
		<IsAuthed>
			<Navbar />
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
