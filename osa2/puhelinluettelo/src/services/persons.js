import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	// const nonExisting = {
	// 	id: 10000,
	// 	name: "This name is not saved to server",
	// 	number: 666
	// };
	// return request.then(response => response.data.concat(nonExisting));
	return request.then(response => response.data);
};

const create = newEntry => {
	const request = axios.post(baseUrl, newEntry);
	return request.then(response => response.data);
};

const update = (id, newEntry) => {
	const request = axios.put(`${baseUrl}/${id}`, newEntry);
	return request.then(response => response.data);
};

const del = id => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then(response => response.data);
};

export default {
	getAll,
	create,
	update,
	del
};
