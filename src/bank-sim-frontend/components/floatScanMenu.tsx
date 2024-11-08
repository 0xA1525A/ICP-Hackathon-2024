import cn from "@/lib/cn";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FloatScanMenu() {
	const router = useRouter();
	return (
		<div className="flex gap-2">
			<div className="bg-white p-2 rounded-full flex flex-nowrap text-black grow w-full">
				<Link
					href="/transfer"
					className={cn(
						"aspect-square py-2 rounded-full font-bold grow w-full",

						router.pathname === "/transfer" ? "bg-primary text-white" : "",
					)}
				>
					<ChevronLeft />
				</Link>
			</div>
			<div className="bg-white p-2 rounded-full flex flex-nowrap text-black">
				<Link
					href="/transfer"
					className={cn(
						"px-4 py-2 rounded-full font-bold",
						router.pathname === "/transfer" ? "bg-primary text-white" : "",
					)}
				>
					TRANSFER
				</Link>
				<Link
					href="/scan"
					className={cn(
						"px-4 py-2 rounded-full font-bold",
						router.pathname === "/scan" ? "bg-primary text-white" : "",
					)}
				>
					SCAN
				</Link>
				<Link
					href="/myqr"
					className={cn(
						"px-4 py-2 rounded-full font-bold",
						router.pathname === "/myqr" ? "bg-primary text-white" : "",
					)}
				>
					RECIVE
				</Link>
			</div>
		</div>
	);
}
