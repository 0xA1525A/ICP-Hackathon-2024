import Logo from "@/components/logo";
import { backend } from "@/declarations/backend";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function page() {
	const router = useRouter()
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = (document.getElementById("email") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement)
			.value;
		const firstName = (document.getElementById("firstName") as HTMLInputElement)
			.value;
		const lastName = (document.getElementById("lastName") as HTMLInputElement)
			.value;
    const res = await backend.createAccount(email, password, firstName, lastName);
		if (res[0].length === 0) 
			return toast.error("Account creation failed");
		toast.success("Account created successfully");
		router.push("/signin");
	};
	return (
		<div className="">
			<div className=" bg-gradient-to-bl from-green-400 via-slate-50 to-slate-50  p-6 absolute left-0 top-0 w-full h-dvh -z-10" />
			<div className="flex flex-col max-w-sm mx-auto items-start  my-0 md:my-12 ">
				<div className="mb-6">
					<Logo />
				</div>
				<h1 className="text-4xl font-bold mb-6">Sign Up</h1>
				<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
					<div>
						<label className="font-bold" htmlFor="firstName">
							First Name
						</label>
						<input
							id="firstName"
							type="text"
							name="firstName"
							required
							className="w-full border rounded-lg px-4 py-2 mt-1"
							placeholder="John"
						/>
					</div>
					<div>
						<label className="font-bold" htmlFor="lastName">
							Last Name
						</label>
						<input
							id="lastName"
							type="text"
							name="lastName"
							required
							className="w-full border rounded-lg px-4 py-2 mt-1"
							placeholder="Smith"
						/>
					</div>
					<div>
						<label className="font-bold" htmlFor="email">
							Email
						</label>
						<input
							id="email"
							type="email"
							required
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
							required
							className="w-full border rounded-lg px-4 py-2 mt-1"
							placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
						/>
					</div>
					<button
						className="w-full px-4 py-3 bg-primary text-white rounded-lg font-bold"
						type="submit"
					>
						Sign UP
					</button>
					<Link href={"/signin"}>Already have an account? Signed on</Link>
				</form>
			</div>
		</div>
	);
}
