import {
	canisterId,
	createActor
} from 'declarations/backend';
import { useEffect } from "react";

export default function page() {
	useEffect(()=>{
		console.log(createActor, canisterId	)
	}, [])
	return <>{`Hello`}</>;
}

// export default function page() {
// 	return <></>;
// }
