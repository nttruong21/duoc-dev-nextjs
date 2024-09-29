import SignUpForm from "./components/sign-up-form";

const SignUp = () => {
  return (
    <div className="container flex justify-center p-10">
      <div className="w-[600px] p-6 space-y-6 border border-border rounded-lg">
        <h1 className="text-xl font-semibold text-center">Sign up</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
