import { createPortal } from 'react-dom';
import { IoIosCloseCircle } from 'react-icons/io';
const Modal = ({ children, onClose, modalTitle }) => {
	return createPortal(
		<div className='fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-6 rounded-md shadow-md w-4/5 lg:w-2/5'>
				<div className='flex flex-row justify-between items-center mb-4 '>
					<p className='text-lg font-semibold text-darkGray'>
						{modalTitle || 'Window'}
					</p>{' '}
					<IoIosCloseCircle
						size='30'
						className='text-red-400 cursor-pointer hover:text-red-500'
						onClick={onClose}
					/>
				</div>
				{children}
			</div>
		</div>,
		document.body
	);
};
export default Modal;
