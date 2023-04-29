import ProfileNavbar from "@/components/ProfileNavbar";
import React from "react";

function index() {
	return (
		<div>
			<ProfileNavbar />
			<div className="p-4">
				<div>
					<h1 className="text-[24px]">Change Info</h1>
					<p className="text-[13px] font-medium text-[#828282]">
						Changes will be reflected to every services
					</p>
				</div>

				<div className="my-10 flex items-center gap-8">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU"
						alt=""
						className="h-[72px] w-[72px] rounded-lg"
					/>

					<p className="text-[13px] font-medium text-[#828282]">
						CHANGE PHOTO
					</p>
				</div>
				<form noValidate>
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
							type="number"
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
