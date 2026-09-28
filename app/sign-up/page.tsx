import Blur from "../components/Blur";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";

export default function SignUp() {
	return (
		<div className="h-screen w-screen center relative">
			<Blur top={10} left={10} />
			<Blur bottom={20} right={-10} />
			
			<div className="px-8 py-5 bg-black/80 shadow-outside rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit">
				<p className="font-main text-2xl mb-1">Join us</p>
				<p className="mb-8 text-sm">Bring ideas to life</p>
				
				<div className="flex flex-col gap-3 mb-10">
					<Input label={"Username"} placeholder={"username"} />
					<Input label={"Email"} placeholder={"username@email.com"} type="email" />
					<Input label={"Password"} placeholder={""} type="password" />
				</div>

				<PrimaryButton>Sign up</PrimaryButton>
			</div>
		</div>
	)
}
