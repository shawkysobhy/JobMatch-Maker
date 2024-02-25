import { useState } from "react";
const useModal = () => {
	const [isOpenModal, setOpenModal] = useState(false);

	const toggle = () => {
		setOpenModal(!isOpenModal);
	};

	return [isOpenModal, toggle];
};
export default useModal
