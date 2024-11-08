import { Floatbar } from "@/components/floatbar";
import { Navbar } from "@/components/navbar";

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
		price: 400.00,
	},
];

export default function Home() {
  return (
			<>
				<Navbar />
        <div className="bg-gray-200 rounded-2xl shadow-xl">

				<div className="aspect-video rounded-2xl bg-gradient-to-r from-pink-500 to-yellow-500 mb-5 shadow-lg" />
				<div className="flex items-start justify-between gap-6 px-6 pb-6">
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
				<Floatbar />
			</>
		);
}
