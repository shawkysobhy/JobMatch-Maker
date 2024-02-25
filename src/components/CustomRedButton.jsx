function CustomRedButton({ onClick, children }) {
	return (
		<button
			className='bg-red-500 hover:bg-red-400 font-bold text-white p-2 rounded-md '
			onClick={onClick}>
			{children}
		</button>
	);
}

export default CustomRedButton;
