import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type User = {
	id: string;
	name: string;
	password: string;
	email: string;
};

type UserContextType = {
	user?: User;
	signIn: (email: string, password: string) => void;
	isSignedIn: boolean;
	isLoading: boolean;
	signOut: () => void;
};
const UserContext = createContext<UserContextType | undefined>(undefined);
const UserProvierContext = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const isSignedIn = useMemo(() => user !== undefined, [user]);
	const signIn = (email: string, password: string) => {
		setUser({
			id: "1",
			name: "A1um1",
			email,
			password,
		});
	};
	const signOut = () => {
		setUser(undefined);
	};
	useEffect(() => {
		if (!window) return;
		const user = localStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
		setLoading(false);
	});

	return (
		<UserContext.Provider
			value={{ user, signIn, isSignedIn, isLoading: loading, signOut }}
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
	const { isSignedIn } = useUser();
	if (isSignedIn) {
		return <>{children}</>;
	}
	return null;
};
export { UserContext, UserProvierContext, useUser };
