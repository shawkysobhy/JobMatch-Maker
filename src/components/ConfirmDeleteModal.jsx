import { CustomRedButton, Modal } from './';
function ConfirmDeleteModal({ toggle, mutate, id }) {
	return (
		<Modal modalTitle='Delete Job Confirmation' onClose={toggle}>
			<div className='flex flex-col space-y-4 items-start'>
				<p className='text-md font-bold text-red-500'>
					Are you sure you want to delete?
				</p>
				<CustomRedButton
					onClick={() => {
						mutate(id);
						toggle();
					}}>
					Confirm Delete
				</CustomRedButton>
			</div>
		</Modal>
	);
}

export default ConfirmDeleteModal;