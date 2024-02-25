function CustomLabelForm({ children, labelFor }) {
	return (
		<label
			htmlFor={labelFor}
			className='text-md text-darkGray font-bold  block md:basis-32'>
			{children}
		</label>
	);
}

export default CustomLabelForm;
