import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BE_URL,
	headers: {
		'Content-Type': 'application/json',
		'ngrok-skip-browser-warning': 'true',
	},
});
