import SignInForm from "./components/sign-in-form";

const SignIn = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[600px] p-6 space-y-6 border border-border rounded-lg">
        <h1 className="text-xl font-semibold text-center">Sign in</h1>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
