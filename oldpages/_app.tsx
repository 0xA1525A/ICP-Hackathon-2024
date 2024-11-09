import Qrscr from "@/components/qrscr";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Figtree } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cn from "../lib/cn";
import { UserProvierContext } from "../lib/userContext";

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
			<UserProvierContext>
				<Qrscr />
				<Component {...pageProps} />
				<ToastContainer />
			</UserProvierContext>
		</div>
	);
}
