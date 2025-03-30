import LoginForm from "@/components/forms/Singin/LoginForm";
const Page = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-ctm-primary-700 ctm-header-1 m-auto">Log In</h2>
      <LoginForm />
    </div>
  );
};

export default Page;
