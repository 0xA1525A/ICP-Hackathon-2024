import { useEffect } from 'react';

export default function page() {
	useEffect(()=>{
		console.log(process.env);
		// backend.getAllData().then((data) => {
		// 	console.log(data);
		// })
	}, [])
	return <>{`Hello`}</>;
}

