import { SignUp } from "@clerk/nextjs";

const SignUpView: React.FunctionComponent = () => {
  return (
    <div className="h-screen flex flex-row items-center justify-center">
      <SignUp />
    </div>
  )
}

export default SignUpView;