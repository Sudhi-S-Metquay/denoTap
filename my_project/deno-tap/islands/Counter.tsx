import { useState } from "preact/hooks";
import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface CounterProps {
	count: Signal<number>;
}

export default function Counter(props: CounterProps) {
	const [predict, setPredict] = useState<number | null>(null);
	const [clickedNumber, setClickedNumber] = useState<number | null>(null);
	const [inputValue, setInputValue] = useState(props.count.value);

	function handleClick(number: number) {
		setClickedNumber(number);
		const randomNum = Math.floor(Math.random() * props.count.value) + 1;
		setPredict(randomNum);
	}

	function getColor(id: number) {
		if (predict === id) {
			return { bg: "rgb(26, 163, 115)", color: "white" };
		} else if (clickedNumber === id)
			return { bg: "rgb(214, 76, 17)", color: "white" };
		return { bg: "white", color: "black" };
	}

	// Create an array of buttons based on the count
	const buttons = Array.from(
		{ length: props.count.value },
		(_, index) => index + 1
	);

	// Handle input value change
	function handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = parseInt(target.value, 10);
		if (!isNaN(newValue) && newValue > 0) {
			props.count.value = newValue;
			setInputValue(newValue);
		}
	}
	console.log(buttons);
	return (
		<div class='py-6 h-screen '>
			<div class='flex items-center justify-center gap-4'>
				<input
					type='number'
					value={inputValue}
					onInput={(e) => handleInputChange(e)}
					min={1}
					class='border-none active:border-none p-2'
				/>
			</div>

			<div class='grid grid-cols-5 gap-8 py-6'>
				{buttons.map((id) => (
					<Button
						key={id}
						onClick={() => handleClick(id)}
						style={{
							backgroundColor: getColor(id).bg,
							border: `2px solid ${getColor(id).bg}`,
							color: getColor(id).color,
						}}
					>
						Tap {id}
					</Button>
				))}
			</div>
		</div>
	);
}
