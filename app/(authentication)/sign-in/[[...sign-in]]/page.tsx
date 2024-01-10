import { SignIn } from "@clerk/nextjs";

const SignInView: React.FunctionComponent = () => {
  return (
    <div className="h-screen flex flex-row items-center justify-center">
      <SignIn />
    </div>
  )
}

export default SignInView;