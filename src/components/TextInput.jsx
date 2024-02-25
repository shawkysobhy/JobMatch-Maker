function TextInput({ id,  placeholder, value, onChange }) {
	return (
		<input
			className='appearance-none border border-gray rounded flex-grow py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline max-w-sm'
			id={id}
			type='text'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
  
}
export default TextInput;
