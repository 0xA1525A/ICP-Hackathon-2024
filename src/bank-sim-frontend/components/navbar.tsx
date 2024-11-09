import Logo from "@/components/logo";
import cn from "@/lib/cn";
import { useFade } from "@/lib/usefade";
import { useUser } from "@/lib/userContext";
import { User } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

export const Navbar = () => {
	const [isOpen, setIsOpen, fadeProps] = useFade();

	const ref = useRef(null);
	const { signOut } = useUser();
	useOnClickOutside(ref, () => {
		setIsOpen(false);
	});
	return (
		<div className="flex items-center justify-between mb-5">
			<Link href={"/"}>
				<Logo />
			</Link>
			<div className="flex items-center gap-2">
				<div className="relative" ref={ref}>
					<button
						className="w-10 md:w-14 aspect-square bg-gray-300 rounded-full  flex items-center justify-center"
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
							"right-0 top-10 md:top-14 mt-2 rounded-2xl bg-white border-2 w-64 flex flex-col overflow-hidden z-30",
						)}
						{...fadeProps}
					>
						<button
							type="button"
							className="hover:bg-black/10 text-left flex gap-2 items-center p-4 transition"
						>
							Settings
						</button>
						<button
							type="button"
							className="hover:bg-black/10 text-left flex gap-2 items-center p-4 transition"
							onClick={() => signOut()}
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
