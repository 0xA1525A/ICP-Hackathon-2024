import FloatScanMenu from "@/components/floatScanMenu";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export default function page() {
	return (
		<div className="absolute h-dvh w-full bg-black top-0 left-0 z-50 flex items-center justify-between flex-col p-12">
			<FloatScanMenu />
			<div className="max-w-xs w-full aspect-square border-8 rounded-2xl border-white">
				<QRCodeSVG
					value="https://reactjs.org/"
					className="w-full h-full rounded-2xl"
				/>
			</div>
			<Link
				href="/myqr"
				className="bg-white text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 opacity-0"
			>
				MY QR
			</Link>
		</div>
	);
}
