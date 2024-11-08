import Logo from "@/components/logo";
import cn from "@/lib/cn";
import { User } from "lucide-react";
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
			<Logo />
			<div className="flex items-center gap-2">
				<div className="relative" ref={ref}>
					<button
						className=" w-10 md:w-14 aspect-square bg-gray-300 rounded-full  flex items-center justify-center"
						type="button"
						onClick={() => {
							setIsOpen((v) => !v);
						}}
					>
						<User />
						<span className="sr-only">Profile</span>
					</button>
					<div
						className={cn(
							isOpen ? "absolute" : "hidden",
							"right-0 top-10 md:top-14 mt-2 rounded-2xl bg-white border-2 w-64 flex flex-col overflow-hidden",
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
