import { ReactNode } from "react";

interface ContactCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const ContactCard = ({ title, className, children }: ContactCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 w-full ${className} `}>
      <h2 className="text-lg font-semibold text-[#160A62] border-b border-[#EAEAEC] mb-6 pb-2">
        {title}
      </h2>
      <div className="text-[#656667]">{children}</div>
    </div>
  );
};
