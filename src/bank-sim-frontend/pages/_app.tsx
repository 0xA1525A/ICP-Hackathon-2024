import cn from "@/lib/cn";
import { UserProvierContext } from "@/lib/userContext";
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
			<UserProvierContext>
				<Component {...pageProps} />
			</UserProvierContext>
		</div>
	);
}
