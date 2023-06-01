import Image from "next/image";
import SignupForm from "../../components/SignupForm";
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

				<SignupForm />

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
