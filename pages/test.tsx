import { backend } from '@/declarations/backend';
import { useEffect } from 'react';

export default function page() {
	useEffect(()=>{
		backend.getAllData().then((data) => {
			console.log(data);
		})
	}, [])
	return <>{`Hello`}</>;
}

