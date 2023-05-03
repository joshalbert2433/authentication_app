import Image from "next/image";
import { Inter } from "next/font/google";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";

import Link from "next/link";
import SocialAccount from "@/components/SocialAccount";

export default function Home() {
	return (
		<main className="flex items-center justify-center px-4 py-6 sm:min-h-screen">
			<div className="flex w-full flex-col justify-center gap-4  rounded-xl border-[#BDBDBD] sm:w-[475px] sm:border-[1px] sm:px-16 sm:py-12">
				<Image
					src="/devchallenges.svg"
					alt="dev logo"
					width={132}
					height={132}
				/>
				<p className="text-[18px] font-semibold text-[#333333]">
					Join thousands of learners from around the world
				</p>
				<p className="text-[16px] text-[#333333]">
					Master web development by making real-life projects. There
					are multiple paths for you to choose
				</p>
				<form
					action="#"
					className="mt-4 flex w-full flex-col justify-between gap-4"
					noValidate
				>
					<div className="relative">
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							className="w-full rounded-lg border px-3 py-2 pl-11"
						/>

						<MdEmail
							size={24}
							className="absolute inset-0 left-3 top-[50%] -translate-y-[50%] text-[#828282]"
						/>
					</div>
					<div className="relative">
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							className="w-full rounded-lg border px-3 py-2 pl-11"
						/>
						<IoMdLock
							size={24}
							className="absolute inset-0 left-3 top-[50%] -translate-y-[50%] text-[#828282]"
						/>
					</div>
					<button className="mt-2 w-full rounded-lg bg-[#2F80ED] py-1 text-[#FFFFFF]">
						Start coding now
					</button>
				</form>

				<div className="mt-6 flex flex-col items-center gap-6">
					<p className="text-[14px] text-[#828282]">
						or continue with these social profile
					</p>
					<SocialAccount />
					<p className="mt-2 text-[14px] text-[#828282]">
						Already a member?{" "}
						<Link
							href="/"
							className="text-[#2D9CDB] hover:underline"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
