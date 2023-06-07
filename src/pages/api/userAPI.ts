import axios from "axios";

const UserInfo = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

export const getUserData = async (userEmail: string) => {
	try {
		console.log(userEmail, "from getUserData");

		const response = await UserInfo.get(`/user/${userEmail}`);
		console.log(response.data);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const updateUserData = async (data: any) => {
	try {
		const response = await UserInfo.patch("/user/update", data);
		return response;
	} catch (error) {
		console.log(error);
	}
};
