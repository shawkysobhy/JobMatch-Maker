import supabase from './supabase';
import { PAGE_SIZE } from '../constant';
const createImagePath = (logo) => {
	let logoName = null;
	let logoPath = null;
	if (typeof logo == 'object') {
		logoName = `${Math.random()}-${logo.name
			?.replaceAll('/', '')
			.replaceAll(' ', '-')}`;
		logoPath = `https://cerqqyruawwpxutetviu.supabase.co/storage/v1/object/public/avatar/${logoName}`;
	}
	return [logoName, logoPath];
};
async function getJobs(page) {
	const from = (page - 1) * PAGE_SIZE;
	const to = from + PAGE_SIZE - 1;
	try {
		let { data, error, count } = await supabase
			.from('jobList')
			.select('*', { count: 'exact' })
			.range(from, to);
		if (error) throw new Error();
		return { data, count } || [];
	} catch (error) {
		return { data: [], error: error };
	}
}

async function getJob(id) {
	try {
		let { data: jobList, error } = await supabase
			.from('jobList')
			.select()
			.eq('id', id);
		if (error) throw new Error(error);
		return jobList[0];
	} catch (error) {
		console.log(error);
	}
}

async function deleteJob(id) {
	try {
		const { error, data } = await supabase
			.from('jobList')
			.delete()
			.eq('id', id);
		if (error) throw new Error(error);
		console.log(data);
	} catch (error) {
		console.log(error);
		return error;
	}
}

async function addJob(data) {
	const [logoName, logoPath] = createImagePath(data.logo);

	try {
		const { error } = await supabase
			.from('jobList')
			.insert([{ ...data, logo: logoPath }])
			.select();
		if (error) throw new Error(error);

		if (logoName && logoPath) {
			const { error: fileError } = supabase.storage
				.from('avatar')
				.upload(logoName, data.logo);
			if (fileError) throw new Error(fileError);
		}
	} catch (error) {
		console.log(error);
	}
}

async function updateJob(data) {
	const { logo: oldLogoPath } = await getJob(data.id);
	const [newLogoName, newLogoPath] = createImagePath(data.logo);
	let currentLogoPath;
	if (newLogoPath !== null) {
		currentLogoPath = newLogoPath;
	} else {
		currentLogoPath = oldLogoPath;
	}
	try {
		const { error } = await supabase
			.from('jobList')
			.update({ ...data, logo: currentLogoPath })
			.eq('id', data.id)
			.select();

		if (error) throw new Error(error);

		// update image in storge if image path updated
		if (newLogoPath != null) {
			console.log('new logo uploading');
			const { error: fileError } = supabase.storage
				.from('avatar')
				.upload(newLogoName, data.logo);
			if (fileError) throw new Error(fileError);
		}

		// delete old image
		// if (oldLogoPath != currentLogoPath) {
		// 	console.log(oldLogoPath);
		// 	let imageName = oldLogoPath.split('/avatar/');
		// 	imageName=`/${imageName[1]}`

		// 	console.log(imageName,typeof imageName);
		// 	const { data, error } = await supabase.storage
		// 		.from('avatars')
		// 		.remove([imageName]);
		// 	if (error) throw new Error(error);
		// 	console.log(data);
		// }
	} catch (error) {
		console.log(error);
	}
}

export { getJobs, deleteJob, addJob, updateJob };
