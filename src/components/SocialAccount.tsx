import React from "react";
import {
	AiFillFacebook,
	AiOutlineGithub,
	AiOutlineTwitter,
	AiOutlineGoogle,
} from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";

function SocialAccount() {
	return (
		<div className="flex gap-5">
			<div
				className="cursor-pointer rounded-full border border-[#828282] p-2 hover:border-[#2F80ED] [&>*:first-child]:hover:fill-[#2F80ED]"
				onClick={() => signIn("google")}
			>
				<AiOutlineGoogle size={18} className="fill-[#828282] " />
			</div>
			<div className="cursor-pointer rounded-full border border-[#828282] p-2 hover:border-[#2F80ED] [&>*:first-child]:hover:fill-[#2F80ED]">
				<AiFillFacebook size={18} className="fill-[#828282]" />
			</div>
			<div className="cursor-pointer rounded-full border border-[#828282] p-2 hover:border-[#2F80ED] [&>*:first-child]:hover:fill-[#2F80ED]">
				<AiOutlineTwitter size={18} className="fill-[#828282]" />
			</div>
			<div className="cursor-pointer rounded-full border border-[#828282] p-2 hover:border-[#2F80ED] [&>*:first-child]:hover:fill-[#2F80ED]">
				<AiOutlineGithub size={18} className="fill-[#828282]" />
			</div>
		</div>
	);
}

export default SocialAccount;
