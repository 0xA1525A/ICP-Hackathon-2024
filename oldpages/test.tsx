// import { backendActor } from "@/lib/actor";

import { backend } from "@/declarations/backend";


export default function page() {
	const b = async ()=>{
		const v = await backend.getAllData()
		console.log(v)
	}
	return <>
	<button onClick={()=>b()} type="button">Click</button></>;
}

// export default function page() {
// 	return <></>;
// }
