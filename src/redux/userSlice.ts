import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getUserData } from "../pages/api/userAPI"; // Replace with your Prisma API call

interface UserState {
	userID: string;
	userData: UserData | null;
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
}

export interface UserData {
	// Define the structure of your user data here
	email: string;
	emailVerified: boolean;
	id: string;
	bio: string;
	image: string;
	name: string;
	phone: string;
	password: string;
}

const initialState: UserState = {
	userID: "",
	userData: null,
	loading: "idle",
	error: null,
};

export const fetchUserData = createAsyncThunk(
	"user/fetchUserData",
	async (userEmail: string) => {
		try {
			console.log(userEmail, "from userSlice");
			const response = await getUserData(userEmail); // Call your Prisma API here
			return response?.data;
		} catch (error) {
			throw new Error("Failed to fetch user data");
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserData.pending, (state: UserState) => {
				state.loading = "pending";
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.userData = action.payload;
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.loading = "failed";
				state.error =
					action.error.message || "Failed to fetch user data";
			});
	},
});

export const selectUserData = (state: RootState) => state.user.userData;
export const selectLoadingStatus = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;
