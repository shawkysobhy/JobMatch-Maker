import { Modal, NewJobForm } from './';
function JobApplicationModal({ toggle, job }) {
	return (
		<Modal modalTitle='Edit Job Application ' onClose={toggle}>
			<NewJobForm initailData={job} type='edit' toggle={toggle} />
		</Modal>
	);
}

export default JobApplicationModal;
