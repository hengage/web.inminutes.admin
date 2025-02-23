import VerifyForm from "@/components/forms/Singin/VerifyForm";
import { decodeData } from "@/lib/utils";
import { PageProps } from "@root/.next/types/app/(auth)/verify/[email]/page";

const page = async ({ params }: PageProps) => {
  const { email } = await params;
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full flex flex-col gap-2">
        <h2 className="text-ctm-secondary-colour ctm-header-1 m-auto">Verify your Email</h2>
        <VerifyForm email={decodeData(decodeURIComponent(email))} />
      </div>
    </main>
  );
};

export default page;
