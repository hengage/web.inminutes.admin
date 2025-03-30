import CreateAdminForm from "@/components/forms/Singin/CreateAdminForm";
const Page = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-ctm-primary-700 ctm-header-1 m-auto">Invite Admin</h2>
      <CreateAdminForm />
    </div>
  );
};

export default Page;
