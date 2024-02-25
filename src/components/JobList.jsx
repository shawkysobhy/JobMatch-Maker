import { Modal, JobItem, NewJobForm } from './';
import { DotLoader } from 'react-spinners';
import { getJobs } from '../services/jobListingApi';
import { useQuery } from '@tanstack/react-query';
import useModal from '../hooks/useModal';
import { useState } from 'react';
import Pagination from './Pagination';
import { PAGE_SIZE } from '../constant';
const overrideLoaderStyle = {
	display: 'block',
	margin: '5rem auto',
	borderColor: 'red',
};

function JobList() {
	const [page, setPage] = useState(1);
	const [openModal, toggle] = useModal();
	const {
		data: { data: jobs, count } = {},
		isLoading,
		error,
	} = useQuery({
		queryFn: () => getJobs(page),
		queryKey: ['jobs', page],
	});
	const pageCount = Math.ceil(count / PAGE_SIZE);
	const nextPage = () => {
		if (page !== pageCount) {
			setPage(page + 1);
		}
	};
	const prevPage = () => {
		if (page !== 1) {
			setPage(page - 1);
		}
	};
	if (isLoading)
		return <DotLoader color='#63baba' cssOverride={overrideLoaderStyle} />;
	if (error) return <h1>{error.message}</h1>;
	console.log(jobs);
	return (
		<main className='w-full bg-LightGrayishCyanBackground custom-h '>
			<div className='max-w-5xl mx-auto px-4 '>
				<ul className='flex flex-col space-y-8 pt-8 pb-8'>
					<button
						onClick={toggle}
						className='text-white font-bold max-w-xs bg-VeryDarkGrayishCyan ml-auto rounded-md p-2 hover:bg-DarkGrayishCyan'>
						Add New Job
					</button>
					{jobs?.map((job) => {
						return <JobItem key={job.id} job={job} />;
					})}
				</ul>
				<div className='flex flex-row justify-between items-center pb-4 py-8'>
					<p className='text-darkGray font-bold'>
						page <span className='text-VeryDarkGrayishCyan'>{page}</span> of
						<span className='text-VeryDarkGrayishCyan'> {pageCount}</span>
					</p>
					<Pagination
						page={page}
						nextPage={nextPage}
						prevPage={prevPage}
						count={count}
					/>
				</div>{' '}
			</div>
			{openModal && (
				<Modal onClose={toggle} modalTitle='Add New Job'>
					<NewJobForm toggle={toggle} type='add' />
				</Modal>
			)}
		</main>
	);
}

export default JobList;
