import FloatScanMenu from "@/components/floatScanMenu";
import { QrCodeIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
	return (
		<div className="absolute h-dvh w-full bg-black top-0 left-0 z-50 flex items-center justify-between flex-col p-12">
			<FloatScanMenu />
			<div className="max-w-xs w-full aspect-square border-8 rounded-2xl border-white" />
			<Link
				href="/myqr"
				className="bg-white text-black px-4 py-2 rounded-full font-bold flex items-center gap-2"
			>
				<QrCodeIcon className="" />
				MY QR
			</Link>
		</div>
	);
}
