const buttonStyle = {
	deleteButton: 'bg-red-500 hover:bg-red-400',
	cancelButton: 'bg-red-500 hover:bg-red-400',
	editButton: 'bg-gray  hover:bg-black',
	addButton: 'bg-VeryDarkGrayishCyan   hover:bg-DarkGrayishCyan',
};
function Button({ onClick, children, mode }) {
	return (
		<button
			className={` ${buttonStyle[mode]} font-bold text-white p-2 rounded-md `}
			onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
