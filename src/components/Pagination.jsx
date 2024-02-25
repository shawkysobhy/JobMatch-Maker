
function Pagination({ page, nextPage, prevPage,count }) {
	return (
		<div className='flex items-center space-x-2 text-white font-semibold '>
			<button
				disabled={page == 1}
				className=' px-4 py-2 rounded-md bg-darkCyan hover:bg-slate-500 '
				onClick={prevPage}>
				Previous
			</button>
			<button
				disabled={page == count}
				className=' px-4 py-2 rounded-md bg-darkCyan hover:bg-slate-500'
				onClick={nextPage}>
				Next
			</button>
		</div>
	);
}

export default Pagination;
