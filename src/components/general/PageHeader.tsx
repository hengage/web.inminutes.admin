import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

const PageHeader = ({ title, onBack }: PageHeaderProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <div className="p-3">
        <ArrowLeft
          onClick={onBack || (() => router.back())}
          className="cursor-pointer hover:bg-purple-100 text-[#2E323A]"
          size={35}
        />
      </div>
      <h1 className="ctm-header-1 font-semibold text-ctm-primary-700">{title}</h1>
    </div>
  );
};

export default PageHeader;