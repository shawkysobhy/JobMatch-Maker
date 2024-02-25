import { useState } from 'react';
import { CustomRedButton, ConfirmDeleteModal, JobApplicationModal } from './';
import { deleteJob } from '../services/jobListingApi';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postedAtHandler } from '../helpers';
import useModal from '../hooks/useModal';
import defaultImage from '../assets/defaultImage.jpg';
const jobInfoStyle = 'text-gray text-sm font-semibold';
function JobItem({ job }) {
	const [isOpenModal, toggle] = useModal();
	const [modalType, setModalType] = useState(null);
	const query = useQueryClient();
	const {
		id,
		logo,
		company,
		position,
		role,
		location,
		created_at,
		skillsList,
	} = job;
	const { mutate } = useMutation({
		mutationFn: (id) => deleteJob(id),
		onSuccess: () => {
			query.invalidateQueries({
				queryKey: ['jobs'],
			});
		},
	});
	return (
		<li className='p-7 bg-white rounded-xl flex flex-col  md:flex-row items-center shadow-md flex-wrap'>
			<img
				key={Date.now()}
				src={logo || defaultImage}
				className=' md:mr-4 rounded-full h-20 w-20 '
			/>
			<div className='flex items-center my-2 flex-col space-y-2 md:items-start '>
				<p className='text-sm text-darkCyan font-bold'>{company}</p>
				<p className='text-base font-bold text-darkGray'>{position}</p>
				<div className='flex flex-row space-x-2'>
					<p className={`${jobInfoStyle}`}>{postedAtHandler(created_at)}</p>
					<p className={`${jobInfoStyle}`}>{role}</p>
					<p className={`${jobInfoStyle}`}>{location}</p>
				</div>
			</div>
			<div className=' flex flex-col  space-y-2 md:space-y-0   items-center md:flex-row md:space-x-4 md:ml-auto flex-wrap'>
				<div className='flex items-center space-x-2 flex-row flex-wrap    mr-4'>
					{skillsList?.map((items) => (
						<p
							className='bg-LightGrayishCyanBackground 
							cursor-pointer text-darkCyan text-sm font-bold p-2 rounded-lg hover:text-LightGrayishCyanBackground hover:bg-darkCyan'
							key={items}>
							{items}
						</p>
					))}
				</div>
				<div className='flex flex-row space-x-2 items-center '>
					<button
						onClick={() => {
							setModalType('edit');
							toggle();
						}}
						className='bg-gray hover:bg-black text-white  text-sm font-bold p-2  rounded-lg'>
						Edit
					</button>
					<CustomRedButton
						onClick={() => {
							setModalType('delete');
							toggle();
						}}>
						Delete
					</CustomRedButton>
				</div>
			</div>
			{isOpenModal && modalType == 'delete' && (
				<ConfirmDeleteModal toggle={toggle} mutate={mutate} id={id} />
			)}
			{isOpenModal && modalType == 'edit' && (
				<JobApplicationModal toggle={toggle} job={job} />
			)}
		</li>
	);
}

export default JobItem;
