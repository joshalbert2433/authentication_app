import React from "react";
import Image from "next/image";
import ProfileNavbar from "@/components/ProfileNavbar";

function index() {
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
					<button className="rounded-lg border border-[#828282] px-7 py-1.5 text-[16px] font-medium text-[#828282]">
						Edit
					</button>
				</div>
				<div className="border-b sm:border-t">
					<div className="flex items-center justify-between p-4 sm:justify-start sm:px-12">
						<p className="text-[13px] font-medium text-[#BDBDBD] sm:w-[250px]">
							PHOTO
						</p>
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU"
							alt=""
							className="h-[72px] w-[72px] rounded-lg"
						/>
					</div>
				</div>
				<div className="border-b">
					<div className="flex items-center justify-between p-4 sm:justify-start sm:px-12">
						<p className="text-[13px] font-medium text-[#BDBDBD] sm:w-[250px]">
							NAME
						</p>
						<p>Xanthe Neal</p>
					</div>
				</div>

				<div className="border-b">
					<div className="flex items-center justify-between p-4 sm:justify-start sm:px-12">
						<p className="text-[13px] font-medium text-[#BDBDBD] sm:w-[250px]">
							BIO
						</p>
						{/* <p  className="w-[200px] text-ellipsis">I am a software developer...</p> */}
						<p className="line-clamp-1 w-[200px] text-right sm:line-clamp-none sm:w-auto sm:text-left">
							I am a software developer and a big fan of
							devchallenges...
						</p>
					</div>
				</div>
				<div className="border-b">
					<div className="flex items-center justify-between p-4 sm:justify-start sm:px-12">
						<p className="text-[13px] font-medium text-[#BDBDBD] sm:w-[250px]">
							EMAIL
						</p>
						<p>xanthe.neal@gmail.com</p>
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
}

export default index;
