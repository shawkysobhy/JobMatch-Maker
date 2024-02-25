import { useReducer, useState } from 'react';
import { Button, TextInput, CustomLabelForm } from './';
import { addJob, updateJob } from '../services/jobListingApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmptyProperties } from '../helpers';
const fieldWrapperStyle =
	'flex flex-col md:flex-row md:space-x-2 md:items-center md:justify-between';
const initailStateForm = {
	company: '',
	position: '',
	role: '',
	location: '',
	skillsList: [],
	logo: '',
};
const reducer = (state, action) => {
	switch (action.type) {
		case 'company_name': {
			return {
				...state,
				company: action.payload,
			};
		}
		case 'role': {
			return {
				...state,
				role: action.payload,
			};
		}
		case 'position': {
			return {
				...state,
				position: action.payload,
			};
		}
		case 'location': {
			return {
				...state,
				location: action.payload,
			};
		}
		case 'logo': {
			return {
				...state,
				logo: action.payload,
			};
		}
		case 'skills_list': {
			const skillsList = action.payload?.split(',');
			console.log('form', skillsList);
			return {
				...state,
				skillsList,
			};
		}
		default:
			return state;
	}
};
/**
 * toggle function for close modal & form
 * initailData = null in case use form to add new record / not edit
 * type = to "add" incase use form for add
 * type = "edit" use form to edit
 */
function NewJobForm({ toggle, initailData, type }) {
	const formData = type == 'edit' ? initailData : initailStateForm;
	const [formError, setFormError] = useState(null);
	const [state, dispatch] = useReducer(reducer, formData);
	const query = useQueryClient();
	const handleChange = (e, type) => {
		dispatch({ type: type, payload: e.target.value });
	};
	const { mutateAsync: mutateNewJob } = useMutation({
		mutationFn: (state) => addJob(state),
		onSuccess: () => {
			query.invalidateQueries();
			toggle();
		},
	});
	const { mutateAsync: mutateUpdateJob } = useMutation({
		mutationFn: (state) => updateJob(state),
		onSuccess: () => {
			query.invalidateQueries();
			toggle();
		},
	});
	const handleSubmit = async (formType) => {
		const emptyField = getEmptyProperties(state);
		if (emptyField.length) {
			setFormError(emptyField);
			return;
		}
		try {
			if (formType === 'add') {
				await mutateNewJob(state);
			} else if (formType === 'edit') {
				await mutateUpdateJob(state);
				console.log('edit');
			}
		} catch (error) {
			// Handle error
		}
	};
	return (
		<div className='max-w-xl mx-auto'>
			<form
				className='bg-white  rounded    '
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div className='flex flex-col space-y-4'>
					<div className={`${fieldWrapperStyle}`}>
						<CustomLabelForm labelFor='company'>Company Name</CustomLabelForm>
						<TextInput
							id='company'
							placeholder='company Name'
							value={state.company}
							onChange={(e) => handleChange(e, 'company_name')}
						/>
					</div>
					<div className={`${fieldWrapperStyle}`}>
						<CustomLabelForm labelFor='position'>Position</CustomLabelForm>
						<TextInput
							id='position'
							placeholder='full stack , software engineer'
							value={state.position}
							onChange={(e) => handleChange(e, 'position')}
						/>
					</div>
					<div className={`${fieldWrapperStyle}`}>
						<CustomLabelForm labelFor='list'>Job role</CustomLabelForm>
						<TextInput
							id='list'
							value={state.role}
							placeholder='ex part time , full time'
							onChange={(e) => handleChange(e, 'role')}
						/>
					</div>
					<div className={`${fieldWrapperStyle}`}>
						<CustomLabelForm labelFor='location'>Location</CustomLabelForm>
						<TextInput
							id='location'
							placeholder='Enter job location'
							value={state.location}
							onChange={(e) => handleChange(e, 'location')}
						/>
					</div>
					<div className={`${fieldWrapperStyle}`}>
						<CustomLabelForm labelFor='list'>Skills List</CustomLabelForm>
						<TextInput
							id='list'
							type='text'
							value={state.skillsList}
							placeholder=' seprate between each skill with "," comma sign'
							onChange={(e) => handleChange(e, 'skills_list')}
						/>
					</div>
					<input
						type='file'
						accept='image/*'
						onChange={(e) =>
							dispatch({ payload: e.target.files[0], type: 'logo' })
						}
					/>

					<div className='flex flex-col md:flex-row items-center justify-between'>
						{' '}
						{
							<p className='text-red-600 text-sm mb-2 md:mb-0'>
								{formError?.length
									? `${formError?.join(' ')} must be filled`
									: ''}
							</p>
						}
						<div className='flex  flex-row  space-x-2 items-center justify-end'>
							<Button onClick={toggle} mode={'cancelButton'}>
								Cancel
							</Button>
							{type == 'edit' ? (
								<Button
									mode={'editButton'}
									onClick={() => {
										handleSubmit('edit');
									}}>
									Edit
								</Button>
							) : (
								<Button
									mode={'addButton'}
									onClick={() => {
										handleSubmit('add');
									}}>
									Add
								</Button>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default NewJobForm;
