import { useEffect, useState } from "react";

export default function fetchCryptoPrice(name: string) {
	const [isLoading, setIsLoading] = useState(true);
	const [price, setPrice] = useState(0);
	useEffect(() => {
		fetch(`https://api.coinbase.com/v2/prices/${name}/buy`)
			.then((res) => res.json())
			.then((data) => {
				setPrice(data?.data?.amount);
			})
			.catch((err) => {
				return 0;
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [name]);
	return price;
}
