import Logo from "@/components/logo";
import Link from "next/link";

export default function page() {
	const handleSubmit = (e: React.FormEvent) => {};
	return (
		<div className="h-dvh md:-mx-32 md:-my-24 -m-6 bg-gradient-to-bl from-green-400 via-slate-50 to-slate-50 py-12 p-6">
			<div className="flex flex-col max-w-sm mx-auto items-start  my-0 md:my-12 ">
				<div className="mb-6">
					<Logo />
				</div>
				<h1 className="text-4xl font-bold mb-6">Sign In</h1>
				<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
					<div>
						<label className="font-bold" htmlFor="id">
							Email
						</label>
						<input
							id="email"
							type="email"
							className="w-full border rounded-lg px-4 py-2 mt-1"
							placeholder="a1um1@gmail.com"
						/>
					</div>
					<div>
						<label className="font-bold" htmlFor="password">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="w-full border rounded-lg px-4 py-2 mt-1"
							placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
						/>
					</div>
					<button
						className="w-full px-4 py-3 bg-primary text-white rounded-lg font-bold"
						type="submit"
					>
						Sign In
					</button>
					<Link href={"/signup"}>
						Didn't have account yet? Create a new one
					</Link>
				</form>
			</div>
		</div>
	);
}
