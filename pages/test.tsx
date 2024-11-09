import { bank_sim_backend } from "@/declarations/backend";
import { useEffect } from "react";
export default function page() {
	useEffect(() => {
		console.log(bank_sim_backend);
	}, [bank_sim_backend]);
	return <>{`Hello, ${bank_sim_backend}`}</>;
}

// export default function page() {
// 	return <></>;
// }
