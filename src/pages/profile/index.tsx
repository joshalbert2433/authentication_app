import React, { useEffect, useMemo } from "react";

import Image from "next/image";
import ProfileNavbar from "@/components/ProfileNavbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
	fetchUserData,
	selectUserData,
	selectLoadingStatus,
	selectError,
} from "../../redux/userSlice";
import type { GetServerSidePropsContext } from "next";

const Index: React.FC = () => {
	const { data: session } = useSession();

	const dispatch: AppDispatch = useDispatch<AppDispatch>();
	const userData = useSelector(selectUserData);
	const loading = useSelector(selectLoadingStatus);
	const error = useSelector(selectError);

	useMemo(() => {
		// Fetch user data when the component mounts
		if (!userData) {
			let sessionEmail = session?.user?.email as string;
			console.log(sessionEmail);
			dispatch(fetchUserData(sessionEmail));
			console.log(userData, "userData");
		}
		//eslint-disable-next-line
	}, [dispatch]);

	console.log(userData);

	return (
		<div>
			<ProfileNavbar />
			<div className="my-8 space-y-2 text-center">
				<h1 className="text-[24px]">Personal info</h1>
				<p className="text-[14px]">
					Basic info, like your name and photo
				</p>
			</div>
			<div className="mx-auto max-w-[850px] sm:rounded-xl sm:border">
				<div className="flex place-items-center justify-between gap-20 p-4 sm:px-12 sm:py-8">
					<div>
						<h2 className="text-[24px]">Profile</h2>
						<p className="text-[13px] text-[#828282]">
							Some info may be visible to other people
						</p>
					</div>
					<Link
						href="/edit-profile"
						className="rounded-lg border border-[#828282] px-7 py-1.5 text-[16px] font-medium text-[#828282]"
					>
						Edit
					</Link>
				</div>
				<div className="border-b sm:border-t">
					<div className="flex items-center justify-between p-4 sm:justify-start sm:px-12">
						<p className="text-[13px] font-medium text-[#BDBDBD] sm:w-[250px]">
							PHOTO
						</p>

						<Image
							src="/avatar.jpg"
							height={200}
							width={200}
							alt="avatar image"
							className="h-[72px] w-[72px] rounded-lg"
						/>
					</div>
				</div>
				<div className="border-b">
					<div className="flex items-center justify-between p-4 sm:justify-start sm:px-12">
						<p className="text-[13px] font-medium text-[#BDBDBD] sm:w-[250px]">
							NAME
						</p>
						<p>{userData?.name ?? "No name yet"}</p>
					</div>
				</div>

				<div className="border-b">
					<div className="flex items-center justify-between p-4 sm:justify-start sm:px-12">
						<p className="text-[13px] font-medium text-[#BDBDBD] sm:w-[250px]">
							BIO
						</p>
						{/* <p  className="w-[200px] text-ellipsis">I am a software developer...</p> */}
						<p className="line-clamp-1 w-[200px] text-right sm:line-clamp-none sm:w-auto sm:text-left">
							{userData?.bio ?? "No bio yet"}
						</p>
					</div>
				</div>
				<div className="border-b">
					<div className="flex items-center justify-between p-4 sm:justify-start sm:px-12">
						<p className="text-[13px] font-medium text-[#BDBDBD] sm:w-[250px]">
							EMAIL
						</p>
						<p>{userData?.email}</p>
					</div>
				</div>
				<div className="border-b">
					<div className="flex items-center justify-between p-4 sm:justify-start sm:px-12">
						<p className="text-[13px] font-medium text-[#BDBDBD] sm:w-[250px]">
							PASSWORD
						</p>
						<p>************</p>
					</div>
				</div>
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
