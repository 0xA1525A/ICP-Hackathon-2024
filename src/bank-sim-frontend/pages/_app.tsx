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
			<div className={cn(figTree.variable, "h-dvh w-full")}>
				<Component {...pageProps} />
			</div>
		);
    
}