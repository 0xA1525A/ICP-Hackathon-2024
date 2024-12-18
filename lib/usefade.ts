import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export const useFade = (
	initial?: boolean,
): [
	boolean,
	Dispatch<SetStateAction<boolean>>,
	{
		style: {
			animation: string;
		};
		onAnimationEnd: () => void;
	},
] => {
	const [show, setShow] = useState(!!initial);
	const [isVisible, setVisible] = useState(show);

	// Update visibility when show changes
	useEffect(() => {
		if (show) setVisible(true);
	}, [show]);

	// When the animation finishes, set visibility to false
	const onAnimationEnd = () => {
		if (!show) setVisible(false);
	};

	const style = { animation: `${show ? "fadeIn" : "fadeOut"} .3s` };

	// These props go on the fading DOM element
	const fadeProps = {
		style,
		onAnimationEnd,
	};

	return [isVisible, setShow, fadeProps];
};
