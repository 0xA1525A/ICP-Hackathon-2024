import Logo from "@/components/logo";
import cn from "@/lib/cn";
import { useFade } from "@/lib/usefade";
import { useUser } from "@/lib/userContext";
import { Link, useRouterState } from "@tanstack/react-router";
import { User } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useOnClickOutside } from "usehooks-ts";

const navLinks = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Transactions",
		href: "/history",
	},
	{
		name: "Market",
		href: "/market",
	},
];

export const Navbar = () => {
	const [isOpen, setIsOpen, fadeProps] = useFade();

	const ref = useRef(null);
	const { signOut } = useUser();
	useOnClickOutside(ref, () => {
		setIsOpen(false);
	});
	const router = useRouterState();
	const path = router.location.pathname;
	return (
		<div className="flex items-center justify-between mb-5">
			<Link href={"/"}>
				<Logo />
			</Link>
			<div className="bg-gray-200 p-2 rounded-full hidden md:flex gap-2">
				{navLinks.map((v, i) => (
					<Link
						href={v.href}
						className={cn(
							"px-2 py-2 rounded-full transition-all font-bold",
							path === v.href
								? "bg-primary text-white px-5"
								: " hover:bg-black/10",
						)}
						key={`${v.name}_${i}`}
					>
						{v.name}
					</Link>
				))}
			</div>
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
							onClick={() => {
								toast.error("Featured not available yet");
							}}
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
