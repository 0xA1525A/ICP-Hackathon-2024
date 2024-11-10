import { backend } from "@/declarations/backend";
import { useRouter } from "next/router";
import seedrandom from "seedrandom";

import useWindowFocus from "@/lib/onFocus";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { toast } from "react-toastify";

export const cardDesign = {
	CARD1: {
		image: "/14.-Prim_1.jpg",
	},
	CARD2: {
		image: "/100.-test.webp",
	},
} as const;

type User = {
	id: string;
	firstname: string;
	balance: number;
	password: string;
	isSuspended: boolean;
	lastname: string;
};

type UserContextType = {
	user?: User;
	card: {
		number: string;
		expiry: string;
		cvv: string;
		name: string;
		design: keyof typeof cardDesign;
		balance: number;
	};
	signIn: (email: string, password: string) => void;
	isSignedIn: boolean;
	isLoading: boolean;
	setCardDesign: (design: keyof typeof cardDesign) => void;
	signOut: () => void;
	refetchBalance: () => void;
};
const UserContext = createContext<UserContextType | undefined>(undefined);
const UserProvierContext = ({ children }: { children: ReactNode }) => {
	const windowFocused = useWindowFocus();

	const [user, setUser] = useState<User | undefined>(undefined);
	const [card, setCard] = useState<UserContextType["card"]>({
		number: "5142 7512 3412 3456",
		expiry: "04/25",
		cvv: "123",
		name: "John Smith",
		design: "CARD1",
		balance: 0,
	});
	const refetchBalance = () => {
		if (!user) return;
		backend.getBalance(user.id).then((data) => {
			setCard((v) => ({ ...v, balance: data }));
		});
	};
	useEffect(() => {
		if (!user) return;
		const myrng = seedrandom(user.id);
		setCard((prev) => ({
			...prev,
			number: `5142 ${Math.floor(myrng() * 10000)} ${Math.floor(myrng() * 10000)} ${Math.floor(myrng() * 10000)}`,
		}));

		const i = setInterval(() => {
			refetchBalance();
		}, 30_000);
		refetchBalance();
		return () => clearInterval(i);
	}, [user]);

	const [loading, setLoading] = useState(true);
	const isSignedIn = useMemo(() => user !== undefined, [user]);
	const router = useRouter();

	useEffect(() => {
		if (!windowFocused) return;
		refetchBalance();
	}, [windowFocused]);

	const signIn = async (email: string, password: string) => {
		const res = await backend.validateLogin(email, password);
		if (!res) return toast.error("Invalid email or password");
		const userData = await backend.getData(email);
		const data = { id: email, ...userData };
		setUser(data);
		localStorage.setItem("user", JSON.stringify(data));
		router.push("/");
	};

	const signOut = () => {
		setUser(undefined);
		localStorage.removeItem("user");
		router.push("/signin");
	};

	useEffect(() => {
		if (!window) return;
		const user = localStorage.getItem("user");
		if (user) setUser(JSON.parse(user));
		setLoading(false);
	}, []);

	const setCardDesign = (design: keyof typeof cardDesign) => {
		setCard((prev) => ({ ...prev, design }));
	};

	return (
		<UserContext.Provider
			value={{
				user,
				signIn,
				isSignedIn,
				isLoading: loading,
				signOut,
				card,
				setCardDesign,
				refetchBalance,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error("useUser must be used within UserProvider");
	return context;
};

const IsAuthed = ({ children }: { children: ReactNode }) => {
	const { isSignedIn, isLoading } = useUser();
	const router = useRouter();
	useEffect(() => {
		if (!isSignedIn && !isLoading) {
			router.replace("/signin");
		}
	}, [isSignedIn, isLoading]);
	if (isLoading) return null;
	if (isSignedIn) return <>{children}</>;

	return null;
};
export { IsAuthed, UserContext, UserProvierContext, useUser };
