import type { FC } from "react";

import {
	ChartCandlestick,
	HomeIcon,
	QrCode,
	ReceiptText,
	Settings2,
} from "lucide-react";
const navbarIcons = [
	{
		icon: HomeIcon,
		name: "Home",
	},
	{
		icon: ReceiptText,
		name: "History",
	},
	{
		icon: QrCode,
		name: "SCAN",
	},
	{
		icon: ChartCandlestick,
		name: "Market",
	},
	{
		icon: Settings2,
		name: "Settings",
	},
];

export const Floatbar: FC = () => {
	return (
		<>
			<div className="h-32 w-full"></div>
			<div className="fixed bottom-3 max-w-sm w-full left-1/2 -translate-x-1/2 px-3 md:hidden">
				<div className="bg-primary rounded-2xl w-full">
					<div className="flex items-center gap-4 justify-between h-full text-white px-2 py-2">
						{navbarIcons.map((v, i) =>
							i === 2 ? (
								<div
									className="w-full grow relative"
									key={`${v.icon.displayName}_${v.name}_Name`}
								>
									<div className="bg-white aspect-square grow flex items-center justify-center rounded-full w-20 text-primary border-4 border-primary absolute left-1/2 -top-14 -translate-x-1/2 transition-all hover:bg-primary hover:text-white">
										{<v.icon className="size-9" />}
									</div>
									<p className="text-center text-xs font-bold mt-7">{v.name}</p>
								</div>
							) : (
								<div
									key={`${v.name}_Name`}
									className="w-full grow  aspect-square flex flex-col font-bold text-xxs items-center justify-center rounded-xl hover:bg-black/20 transition-all"
								>
									{<v.icon className="size-7" />}
									<span className="mt-1">{v.name}</span>
								</div>
							),
						)}
					</div>
				</div>
			</div>
		</>
	);
};
