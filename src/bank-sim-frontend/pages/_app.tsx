import { Floatbar } from "@/components/floatbar";
import { Navbar } from "@/components/navbar";
import cn from "@/lib/cn";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Figtree } from "next/font/google";

const figTree = Figtree({
	variable: "--font-fig-tree",
	weight: ["400", "700", "900"],
	subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
	return (
		<div
			className={cn(
				figTree.variable,
				"min-h-dvh w-full p-6 md:py-12 max-w-5xl mx-auto",
			)}
		>
			<Navbar />
			<Component {...pageProps} />
			<Floatbar />
		</div>
	);
}
