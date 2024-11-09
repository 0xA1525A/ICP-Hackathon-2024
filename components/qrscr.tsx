import cn from "@/lib/cn";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { useMemo } from "react";
import { Drawer } from "vaul";

const method = {
	send: {
		name: "Send",
	},
	scan: {
		name: "Scan",
	},
	recive: {
		name: "Receive",
	},
} as const;

export default function Qrscr() {
	const router = useRouter();
	const query = router.query;
	const isOpen = useMemo(
		() => Object.keys(method).some((key) => key === query.transfer),
		[query],
	);
	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={(e) => {
				if (e === false) {
					router.push(`/${router.pathname}`, undefined, {
						scroll: false,
						shallow: false,
					});
				}
			}}
		>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40" />
				<Drawer.Content className="bg-white rounded-t-2xl h-fit fixed bottom-0 left-0 right-0 outline-none overflow-hidden">
					<div className="relative">
						<div className="absolute z-10 w-full top-4">
							<div className="w-12 h-1 rounded-full mx-auto mb-4 invert mix-blend-difference bg-white" />
							<div className="flex text-sm">
								<div className="flex bg-gray-200 rounded-full mx-auto">
									{Object.entries(method).map(([key, value]) => (
										<Link
											href={`?transfer=${key}`}
											key={key}
											type="button"
											className={cn(
												"py-2 rounded-full font-bold px-3 transition",
												router.query.transfer === key
													? "bg-primary text-white px-4"
													: "",
											)}
										>
											{value.name}
										</Link>
									))}
								</div>
							</div>
						</div>
						<div className="max-w-2xl w-full mx-auto">
							{query.transfer === "scan" && (
								<div className="aspect-square w-full h-dvh flex items-center flex-col justify-center backdrop-blur-2xl bg-gradient-to-b from-slate-900 to-slate-700 bg-black">
									<div className="p-6 rounded-2xl overflow-hidden">
										<Scanner
											onScan={(result) => alert(result)}
											classNames={{
												container:
													"w-full aspect-sqaure overflow-hidden rounded-2xl max-w-96",
												video: "w-full aspect-square",
											}}
										/>
									</div>
								</div>
							)}
							{query.transfer === "send" && (
								<div className="px-4 pt-24 pb-4">
									<h1 className="text-3xl font-bold mb-4">Send</h1>
									<form className="flex flex-col gap-4 [&>div]:space-y-2">
										<div className="">
											<label htmlFor="address" className="font-bold">
												Address
											</label>
											<input
												id="address"
												type="text"
												className="border rounded-lg px-4 py-2 block w-full"
											/>
										</div>
										<div className="">
											<div className="flex items-center justify-between">
												<label htmlFor="address" className="font-bold">
													Amount
												</label>
												<div className="flex bg-gray-200 gap-2 p-1 rounded-full font-bold">
													<button
														className="rounded-full bg-white px-2"
														type="button"
													>
														THB
													</button>
													<button
														className=" flex gap-1 items-center"
														type="button"
													>
														BTC <ChevronDown className="size-4" />
													</button>
												</div>
											</div>
											<input
												id="address"
												type="text"
												className="border rounded-lg px-4 py-2 block w-full"
											/>
										</div>
										<button
											type="button"
											className="px-4 py-3 rounded-lg bg-primary text-white w-full font-bold"
										>
											Transfer
										</button>
									</form>
								</div>
							)}
							{query.transfer === "recive" && (
								<div className="px-4 pt-24 pb-4">
									<h1 className="text-lg font-bold mb-2 text-center">
										My QR Code
									</h1>
									<div className="border-primary bg-white border-4 mb-2 rounded-2xl p-6 aspect-square max-w-80 mx-auto">
										<QRCodeSVG
											value="https://a1um1.github.io"
											className="w-full h-full max-w-80"
										/>
									</div>
									<h2 className="mb-2 text-center">My Wallet Address</h2>
									<input
										className="w-full rounded-full px-4 py-2 border read"
										defaultValue="0xd9dB889D1253F8052e8333FCA9a04eb05b659aF3"
										readOnly
									/>
								</div>
							)}
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}