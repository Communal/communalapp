import { SignUp } from "@clerk/nextjs";

const SignUpView: React.FunctionComponent = () => {
  return (
    <div className="h-screen flex flex-row items-center justify-center">
      <SignUp afterSignUpUrl={"/onboarding"} redirectUrl={"/onboarding"} />
    </div>
  )
}

export default SignUpView;