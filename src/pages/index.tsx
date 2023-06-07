import Image from "next/image";
import { Inter } from "next/font/google";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import Link from "next/link";
import SocialAccount from "@/components/SocialAccount";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
	const router = useRouter();

	const { data: session } = useSession();
	const [email, setEmail] = useState<String>("");
	const [password, setPassword] = useState<String>("");

	if (session) {
		console.log(session);
	}

	const loginCredentialsHandler = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const result = await signIn("credentials", {
			callbackUrl: `${window.location.origin}/profile`,
			redirect: false,
			email,
			password,
		});

		if (!result?.ok) {
			toast.remove();
			toast.error("Invalid username or password");
		}

		console.log(result);

		router.push("/profile");
	};

	const getSessionHandler = async () => {
		try {
			const { data } = await Axios.get(
				"http://localhost:3000/api/session"
			);

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className="flex items-center justify-center px-4 py-6 sm:min-h-screen ">
			<div className="flex w-full flex-col justify-center gap-8  rounded-xl border-[#BDBDBD] sm:h-[545px] sm:w-[475px] sm:border-[1px] sm:px-16">
				<Image
					src="/devchallenges.svg"
					alt="dev logo"
					width={132}
					height={132}
				/>
				<p className="text-[18px] font-[600]">Login</p>
				<form
					className="flex w-full flex-col justify-between gap-4"
					noValidate
					onSubmit={(e) => {
						loginCredentialsHandler(e);
					}}
				>
					<div className="relative">
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							className="w-full rounded-lg border px-3 py-2 pl-11"
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
						/>
						<IoMdLock
							size={24}
							className="absolute inset-0 left-3 top-[50%] -translate-y-[50%] text-[#828282]"
						/>
					</div>
					<button className="mt-2 w-full rounded-lg bg-[#2F80ED] py-1 text-[#FFFFFF]">
						Login
					</button>
				</form>

				<div className="flex flex-col items-center gap-4">
					<p className="text-[14px] text-[#828282]">
						or continue with these social profile
					</p>
					<SocialAccount />
					<p className="mt-2 text-[14px] text-[#828282]">
						Don&#39;t have an account yet?{" "}
						<Link href="register">
							<span
								onClick={() => toast.remove()}
								className="text-[#2D9CDB] hover:underline"
							>
								Register
							</span>
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
// 	const session = await getServerSession(
// 		context.req,
// 		context.res,
// 		authOptions
// 	);

// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: "/",
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {
// 			session: JSON.parse(JSON.stringify(session)),
// 		},
// 	};
// }
