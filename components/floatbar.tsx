import type { FC } from "react";

import {
	ChartCandlestick,
	HomeIcon,
	QrCode,
	ReceiptText,
	Settings2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

const navbarIcons = [
	{
		icon: HomeIcon,
		name: "Home",
		href: "/",
	},
	{
		icon: ReceiptText,
		name: "Transactions",
		href: "/",
	},
	{
		icon: QrCode,
		name: "SCAN",
		href: "?transfer=scan",
	},
	{
		icon: ChartCandlestick,
		name: "Market",
		href: "/market",
	},
	{
		icon: Settings2,
		name: "Settings",
		onclick: () => {
			toast.error("Featured not available yet");
		},
		href: "/",
	},
];

export const Floatbar: FC = () => {
	return (
		<>
			<div className="h-24 w-full md:hidden" />
			<div className="fixed bottom-3 max-w-sm w-full left-1/2 -translate-x-1/2 px-3 md:hidden">
				<div className="bg-primary rounded-2xl w-full">
					<div className="flex items-center gap-2 justify-between h-full text-white px-2 py-2">
						{navbarIcons.map((v, i) =>
							i === 2 ? (
								<Link
									href="?transfer=scan"
									className="w-full grow relative"
									key={`${v.icon.displayName}_${v.name}_Name`}
								>
									<div className="bg-white aspect-square grow flex items-center justify-center rounded-full w-20 text-primary border-4 border-primary absolute left-1/2 -top-14 -translate-x-1/2 transition-all hover:bg-primary hover:text-white">
										{<v.icon className="size-9" />}
									</div>
									<p className="text-center text-xs font-bold mt-7">{v.name}</p>
								</Link>
							) : (
								<Link
									href={v.onclick ? "#" : v.href}
									key={`${v.name}_Name`}
									onClick={v.onclick || (() => {})}
									className="w-full grow  aspect-square flex flex-col font-bold text-xxs items-center justify-center rounded-xl hover:bg-black/20 transition-all"
								>
									{<v.icon className="size-7" />}
									<span className="mt-1">{v.name}</span>
								</Link>
							),
						)}
					</div>
				</div>
			</div>
		</>
	);
};
