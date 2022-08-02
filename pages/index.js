import styles from '../styles/Home.module.css';

export default function Home() {
	const sendMoveRequest = (dir, on) => {
		fetch('/api/move', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ dir, on })
		})
			.then((res) => res.text())
			.then((data) => console.log(data))
			.catch(console.log);
	};

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				backgroundColor: 'black',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '25px'
			}}>
			{['f', 'r', 'b', 'l'].map((dir, index) => {
				const onReq = () => sendMoveRequest(dir, true);
				const offReq = () => sendMoveRequest(dir, false);
				return (
					<button
						key={index}
						onMouseDown={onReq}
						onMouseUp={offReq}
						style={{
							width: '50px',
							height: '50px'
						}}>
						{dir}
					</button>
				);
			})}
		</div>
	);
}
