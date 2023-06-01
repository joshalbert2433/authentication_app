import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";

export default function App() {
	const schema = yup.object().shape({
		email: yup.string().required().email("Email must be valid"),
		password: yup
			.string()
			.required()
			.min(8, "Password is too short - should be 8 chars minimum.")
			.max(20),
	});

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data: any) => {
		const { email, password } = data;
		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: {
					"Content-type": "application/json",
				},
			});
			const data = await response.json();

			if (data.error) {
				return toast.error(data.status);
			}

			if (!data.error) {
				toast.success(data.status);
				reset();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form
				action="#"
				className="mt-4 flex w-full flex-col justify-between gap-4"
				noValidate
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<div className="relative">
						<input
							type="email"
							id="email"
							placeholder="Email"
							className={`w-full rounded-lg border px-3 py-2 pl-11 outline-none ${
								errors.email && "border-red-500"
							}`}
							{...register("email")}
						/>

						<MdEmail
							size={24}
							className="absolute inset-0 left-3 top-[50%] -translate-y-[50%] text-[#828282]"
						/>
					</div>
					{errors.email && (
						<p className="text-red-500">
							{errors.email.message?.toString()}
						</p>
					)}
				</div>

				<div>
					<div className="relative">
						<input
							type="password"
							id="password"
							placeholder="Password"
							className={`w-full rounded-lg border px-3 py-2 pl-11 outline-none ${
								errors.password && "border-red-500"
							}`}
							{...register("password")}
						/>
						<IoMdLock
							size={24}
							className="absolute inset-0 left-3 top-[50%] -translate-y-[50%] text-[#828282]"
						/>
					</div>
					{errors.password && (
						<p className="text-red-500">
							{errors.password.message?.toString()}
						</p>
					)}
				</div>

				<button
					className="mt-2 w-full rounded-lg bg-[#2F80ED] py-1 text-[#FFFFFF]"
					type="submit"
				>
					Start coding now
				</button>
			</form>
		</>
	);
}
