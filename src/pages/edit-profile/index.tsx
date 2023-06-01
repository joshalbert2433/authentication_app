import ProfileNavbar from "@/components/ProfileNavbar";
import React from "react";
import Image from "next/image";
import { IoMdCamera } from "react-icons/io";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

function index() {
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
				<form noValidate className="space-y-6">
					<div className="flex flex-col">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Enter your name..."
							className="rounded-lg border border-black p-4 text-[13px]"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="bio">Bio</label>
						<textarea
							name="bio"
							id="bio"
							placeholder="Enter your bio..."
							className="h-[100px] resize-none rounded-lg border border-black p-4 text-[13px]"
						></textarea>
					</div>
					<div className="flex flex-col">
						<label htmlFor="phone">Phone</label>
						<input
							type="text"
							name="phone"
							id="phone"
							placeholder="Enter your phone number..."
							className="rounded-lg border border-black p-4 text-[13px]"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="phone">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter your phone email..."
							className="rounded-lg border border-black p-4 text-[13px]"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="phone">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter your phone password..."
							className="rounded-lg border border-black p-4 text-[13px]"
						/>
					</div>

					<button className="rounded-lg bg-[#2F80ED] px-6 py-2 font-medium text-white">
						Save
					</button>
				</form>
			</div>
		</div>
	);
}

export default index;
