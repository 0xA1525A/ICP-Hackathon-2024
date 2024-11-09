import { redirect } from '@tanstack/react-router';
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

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
	name: string;
	password: string;
	email: string;
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
};
const UserContext = createContext<UserContextType | undefined>(undefined);
const UserProvierContext = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const [card, setCard] = useState<UserContextType["card"]>({
		number: "5142 7512 3412 3456",
		expiry: "04/25",
		cvv: "123",
		name: "John Smith",
		design: "CARD1",
		balance: 4000,
	});
	const [loading, setLoading] = useState(true);
	const isSignedIn = useMemo(() => user !== undefined, [user]);
	// const router = useRouterState();
	const signIn = (email: string, password: string) => {
		const data = {
			id: "1",
			name: "A1um1",
			email,
			password,
		};
		setUser(data);
		localStorage.setItem("user", JSON.stringify(data));
		redirect({
			to: "/",
		});
	};
	const signOut = () => {
		setUser(undefined);
		localStorage.removeItem("user");
		redirect({
			to: "/signin",
		});
	};
	useEffect(() => {
		if (!window) return;
		const user = localStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
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
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

const IsAuthed = ({ children }: { children: ReactNode }) => {
	const { isSignedIn, isLoading } = useUser();
	useEffect(() => {
		if (!isSignedIn && !isLoading) {
			redirect({
				to: "/signin",
			})
		}
	}, [isSignedIn, isLoading]);
	if (isLoading) return null;
	if (isSignedIn) return <>{children}</>;

	return null;
};
export { IsAuthed, UserContext, UserProvierContext, useUser };
