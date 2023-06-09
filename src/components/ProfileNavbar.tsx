import Image from "next/image";
import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { signOut } from "next-auth/react";

function ProfileNavbar() {
	const signOutHandler = () => {
		signOut();
		// signOut({ callbackUrl: `${window.location.origin}/` });
	};

	return (
		<div className="p-4">
			<div className="flex justify-between sm:container sm:mx-auto">
				<Image
					src="/devchallenges.svg"
					alt="dev logo"
					width={132}
					height={132}
				/>
				<div className="relative sm:flex sm:items-center sm:gap-4 ">
					<Image
						src="/avatar.jpg"
						alt="dev logo"
						width={32}
						height={32}
						className="rounded-lg"
					/>

					<p className="hidden text-[12px] sm:block">Xanthe Neal</p>
					<div className="hidden sm:block">
						<AiFillCaretDown size={16} />
					</div>

					<div className="absolute -bottom-[170px] -left-[150px] z-50  rounded-lg border bg-white p-2 sm:-bottom-[180px]  sm:-left-[35px]">
						<div>
							<button className="flex w-[165px] items-center gap-4 rounded-lg px-4 py-3 hover:bg-[#F2F2F2]">
								<FaUserCircle
									size={16}
									className="fill-[#4F4F4F]"
								/>
								<p className="text-[12px] font-medium text-[#4F4F4F]">
									My Profile
								</p>
							</button>
							<button className="my-1 flex w-[165px] items-center gap-4 rounded-lg px-4 py-3 hover:bg-[#F2F2F2]">
								<FaUserFriends
									size={16}
									className="fill-[#4F4F4F]"
								/>
								<p className="text-[12px] font-medium text-[#4F4F4F]">
									Group Chat
								</p>
							</button>
						</div>
						<div className="h-0.5 w-full bg-[#E0E0E0] opacity-50"></div>
						<button
							className="mt-2 flex w-full items-center gap-4 rounded-lg px-4 py-3 hover:bg-[#F2F2F2]"
							onClick={signOutHandler}
						>
							<IoMdExit size={16} className="fill-[#EB5757]" />

							<p className="text-[12px] font-medium text-[#EB5757]">
								Log out
							</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileNavbar;
