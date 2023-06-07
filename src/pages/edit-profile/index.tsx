import ProfileNavbar from "@/components/ProfileNavbar";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getServerSession } from "next-auth/next";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { IoMdCamera } from "react-icons/io";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getUserData } from "../api/userAPI";
import { removeEmptyFields } from "@/utils/removeEmptyFields";
import {
	fetchUserData,
	selectUserData,
	selectLoadingStatus,
	selectError,
} from "../../redux/userSlice";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { toast } from "react-hot-toast";

interface UserInfo {
	name: string;
	bio: string;
	phone: string;
	email: string;
	password: string;
}

const Index: React.FC = () => {
	const { data: session } = useSession();

	const dispatch: AppDispatch = useDispatch<AppDispatch>();
	const userData = useSelector(selectUserData);
	const loading = useSelector(selectLoadingStatus);
	const error = useSelector(selectError);

	const schema = yup.object().shape({
		name: yup.string().required("Required"),
		bio: yup.string().required("Required").min(10, "Minimum of 10 letters"),
		phone: yup
			.string()
			.typeError("Phone my be number only!")
			.required("Required"),
		email: yup.string().required("Required").email("Email must be valid"),
		password: yup.string(),
	});

	const {
		register,
		reset,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<UserInfo>({
		resolver: yupResolver(schema),
	});

	useMemo(() => {
		// Fetch user data when the component mounts

		if (!userData) {
			let sessionEmail = session?.user?.email as string;
			dispatch(fetchUserData(sessionEmail));
			console.log(userData, "userData");
		}

		//eslint-disable-next-line
	}, [dispatch, reset]);

	useEffect(() => {
		if (userData) {
			setValue("name", userData?.name);
			setValue("bio", userData?.bio);
			setValue("phone", userData?.phone);
			setValue("email", userData?.email);
		}
		//eslint-disable-next-line
	}, [setValue, userData]);

	//TODO: USER FORM UPLOAD PICTURE

	//TODO: FIX DROPDOWN NAVBAR

	//TODO: ADD DEV CHALLENGES MARK

	//TODO: REMOVE UNNECESSARY PACKAGE AND CODES

	const onSubmit: SubmitHandler<UserInfo> = async (userInput: UserInfo) => {
		const { password, ...rest } = userInput;

		const filteredData = userInput.password.length === 0 ? rest : userInput;

		console.log(filteredData);

		try {
			const response = await fetch("/api/user/update", {
				method: "PATCH",
				body: JSON.stringify(filteredData),
				headers: {
					"Content-type": "application/json",
				},
			});
			const data = await response.json();
			if (data.error) {
				return toast.error(data.message);
			}
			if (!data.error) {
				reset({ password: "" });
				dispatch(fetchUserData(userInput.email));
				toast.success(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<ProfileNavbar />
			<Link
				href="/profile"
				className="mx-auto flex max-w-[850px] items-center gap-2 px-4 sm:px-0"
			>
				<FiChevronLeft className="fill-[#2D9CDB]" />
				<p className="text-[#2D9CDB]">Back</p>
			</Link>
			<div className="mx-auto mb-12 mt-6 max-w-[850px] p-4 sm:rounded-lg sm:border sm:border-[#E0E0E0] sm:p-8">
				<div>
					<h1 className="text-[24px]">Change Info</h1>
					<p className="text-[13px] font-medium text-[#828282]">
						Changes will be reflected to every services
					</p>
				</div>

				<div className="my-10 flex items-center gap-8">
					<div className="relative">
						<Image
							src="/avatar.jpg"
							height={200}
							width={200}
							alt="avatar image"
							className="h-[72px] w-[72px] rounded-lg"
						/>
						<div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] ">
							<IoMdCamera className="fill-white" size={20} />
						</div>
					</div>

					<p className="text-[13px] font-medium text-[#828282]">
						CHANGE PHOTO
					</p>
				</div>
				<form
					noValidate
					className="space-y-6"
					onSubmit={handleSubmit(onSubmit)}
					autoComplete="off"
				>
					<div className="flex flex-col">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							placeholder="Enter your name..."
							className={`rounded-lg border border-black p-4 text-[13px] outline-none
                            ${errors.name && "border-red-500"}
                            `}
							{...register("name")}
						/>
						{errors.name && (
							<p className="text-red-500">
								{errors.name?.message?.toString()}
							</p>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="bio">Bio</label>
						<textarea
							id="bio"
							placeholder="Enter your bio..."
							className={`h-[100px] resize-none rounded-lg border border-black p-4 text-[13px] outline-none
                            ${errors.bio && "border-red-500"}
                            `}
							{...register("bio")}
						></textarea>
						{errors.bio && (
							<p className="text-red-500">
								{errors.bio?.message?.toString()}
							</p>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="phone">Phone</label>
						<input
							type="text"
							id="phone"
							placeholder="Enter your phone number..."
							className={`rounded-lg border border-black p-4 text-[13px] outline-none
                            ${errors.phone && "border-red-500"}
                            `}
							{...register("phone")}
						/>
						{errors.phone && (
							<p className="text-red-500">
								{errors.phone?.message?.toString()}
							</p>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="phone">Email</label>
						<input
							type="email"
							id="email"
							disabled
							placeholder="Enter your phone email..."
							className={`text-[13px]outline-none rounded-lg border border-black bg-gray-100 p-4 text-gray-400
                            ${errors.email && "border-red-500"}
                            `}
							autoComplete="off"
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-red-500">
								{errors.email?.message?.toString()}
							</p>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="phone">Password</label>
						<input
							type="password"
							id="password"
							placeholder="Enter your new password..."
							className={`rounded-lg border border-black p-4 text-[13px]
                            ${errors.password && "border-red-500"}
                            
                            `}
							autoComplete="off"
							{...register("password")}
						/>
						{errors.password && (
							<p className="text-red-500">
								{errors.password?.message?.toString()}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="rounded-lg bg-[#2F80ED] px-6 py-2 font-medium text-white"
					>
						Save
					</button>
				</form>
			</div>
		</div>
	);
};

export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session: JSON.parse(JSON.stringify(session)),
		},
	};
}
