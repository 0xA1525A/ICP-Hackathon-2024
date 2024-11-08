import cn from "@/lib/cn";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);
	useOnClickOutside(ref, () => {
		setIsOpen(false);
	});
	return (
		<div className="flex items-center justify-between mb-5">
			<h1 className="font-bold text-2xl gap-1 flex items-center md:text-3xl">
				<span className="bg-primary text-white aspect-square md:w-10 rounded-xl flex items-center justify-center font-extrabold w-10">
					D
				</span>
				Coin
			</h1>
			<div className="flex items-center gap-2">
				<div className="relative" ref={ref}>
					<button
						className="flex w-10 md:w-14 aspect-square bg-gray-300 rounded-full "
						type="button"
						onClick={() => {
							setIsOpen((v) => !v);
						}}
					>
						<span className="sr-only">Profile</span>
					</button>
					<div
						className={cn(
							isOpen ? "absolute" : "hidden",
							"right-0 top-14 mt-2 rounded-2xl bg-white border-2 w-64 flex flex-col overflow-hidden",
						)}
					>
						<button
							type="button"
							className="hover:bg-black/10 text-left flex gap-2 items-center p-4"
						>
							Settings
						</button>
						<button
							type="button"
							className="hover:bg-black/10 text-left flex gap-2 items-center p-4"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
