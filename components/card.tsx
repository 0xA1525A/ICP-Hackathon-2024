import { cardDesign, useUser } from "@/lib/userContext";
import { FastAverageColor } from "fast-average-color";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Drawer } from "vaul";

function h2hsl(hex: string, valuesOnly = false, isDark = false) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result || result.length !== 4) return null;

	let r = Number.parseInt(result[1], 16);
	let g = Number.parseInt(result[2], 16);
	let b = Number.parseInt(result[3], 16);
	let cssString = "";
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	let l = isDark ? 80 : 30;
	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	h = Math.round(h * 360);
	s = Math.round(s * 100);
	l = Math.round(l);

	cssString = `${h},${s}%,${l}%`;
	cssString = !valuesOnly ? `hsl(${cssString})` : cssString;
	return cssString;
}

export default function DebitCard() {
	const { card, setCardDesign } = useUser();
	const [color, setColor] = useState({ color: "#0f0f0f", isDark: false });
	const [open, setOpen] = useState(false);
	useMemo(async () => {
		const fac = new FastAverageColor();
		const color = await fac.getColorAsync(
			cardDesign[card.design as keyof typeof cardDesign].image,
		);
		setColor({
			color: color.hex,
			isDark: color.isDark,
		});
	}, [cardDesign[card.design as keyof typeof cardDesign].image]);
	return (
		<>
			<button
				onClick={() => setOpen(true)}
				type="button"
				className="mb-5 md:mb-0 overflow-hidden md:max-w-sm rounded-2xl aspect-video relative w-full flex items-center h-full text-left z-0 bg-gray-900/20"
				style={{
					boxShadow: `0 3px 30px 2px ${color.color}`,
				}}
			>
				<div
					className="z-10 p-6 font-bold mt-auto w-full"
					style={{
						color: h2hsl(color.color, false, color.isDark) || "",
					}}
				>
					<h3 className="text-2xl">John Smith</h3>
					<div className="flex items-center justify-between mt-6 w-full">
						<div className="leading-none">
							<small>Valid Thru</small>
							<br />
							<span className="text-lg">12/24</span>
						</div>

						<img src="/visa.png" className="w-16 z-0" alt="visa" />
					</div>
				</div>
				<img
					src={cardDesign[card.design as keyof typeof cardDesign].image}
					alt="banner"
					className="rounded-2xl object-cover aspect-video w-full absolute"
				/>
			</button>
			<Drawer.Root
				open={open}
				onOpenChange={(e) => {
					setOpen(e);
				}}
			>
				<Drawer.Portal>
					<Drawer.Overlay className="fixed inset-0 bg-black/40" />
					<Drawer.Content className=" h-fit fixed bottom-0 left-0 right-0 outline-none text-inherit bg-white rounded-t-xl">
						<div className="p-4">
							<div className="w-12 h-1 rounded-full bg-black mx-auto" />

							<div className="max-w-2xl w-full mx-auto mt-4">
								<div
									className="mb-5 md:mb-0 overflow-hidden md:max-w-sm rounded-2xl aspect-video relative w-full flex items-center h-full text-left z-0 mx-auto"
									style={{
										boxShadow: `0 3px 30px 2px ${color.color}`,
									}}
								>
									<div
										className="z-10 p-6 font-bold mt-auto w-full"
										style={{
											color: h2hsl(color.color, false, color.isDark) || "",
										}}
									>
										<h3 className="text-2xl">{card.number}</h3>
										<div className="flex items-center justify-between mt-6 w-full">
											<div className="leading-none">
												<small>Holder name</small>
												<br />
												<span className="text-lg">{card.name}</span>
											</div>
											<div className="leading-none">
												<small>Valid Thru</small>
												<br />
												<span className="text-lg">12/24</span>
											</div>

											<img src="/visa.png" className="w-16 z-0" alt="visa" />
										</div>
									</div>
									<img
										src={
											cardDesign[card.design as keyof typeof cardDesign].image
										}
										alt="banner"
										className="rounded-2xl object-cover aspect-video w-full absolute"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
									<div>
										<p>Card Number</p>
										<p className="text-lg font-bold">{card.number}</p>
									</div>
									<div>
										<p>Valid Thru</p>
										<p className="text-lg font-bold">{card.expiry}</p>
									</div>
									<div>
										<p>CVV</p>
										<p className="text-lg font-bold">{card.cvv}</p>
									</div>
								</div>
								<hr className="my-4 border" />
								<h3 className="text-xl font-bold mb-3">Card Design</h3>
								<div className="flex flex-wrap gap-4">
									{Object.keys(cardDesign).map((v) => (
										<button
											key={v}
											onClick={() => {
												setCardDesign(v as keyof typeof cardDesign);
											}}
											type="button"
											className=" size-12 rounded-lg overflow-hidden bg-center shadow bg-cover"
											style={{
												backgroundImage: `url(${cardDesign[v as keyof typeof cardDesign].image})`,
											}}
										/>
									))}
									<button
										type="button"
										className=" size-12 rounded-lg overflow-hidden bg-center shadow flex items-center justify-center bg-gray-200"
									>
										<PlusIcon />
									</button>
								</div>
								<button
									type="button"
									className="bg-primary text-white rounded-lg px-4 py-3 mt-4 font-bold w-full"
									onClick={() => setOpen(false)}
								>
									Close
								</button>
							</div>
						</div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</>
	);
}
