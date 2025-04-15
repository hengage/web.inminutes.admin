import { Icon } from "../ui/Icon";
import { CustomInput as Input } from "../ui/custom/input";

const DashboardNav = () => {
  return (
    <nav className="w-full h-[80px] md:p-[12px] shadow-[0px_2px_2px_0px_#0d3f6a0f] flex justify-between items-center sticky top-0 left-0 bg-background z-50">
      <label htmlFor="my-drawer" className="flex lg:hidden text-blue-800 px-3">
        <Icon name="hamburger" className="cursor-pointer" />
      </label>
      <Input
        slotBefore={<Icon className="ml-2" height={20} width={20} name="search" />}
        placeholder="Search"
        className="rounded-full bg-ctm-primary-colour-light px-14 w-[300px]"
      />
      <div className="flex items-center gap-4">
        <Icon height={30} width={30} name="bell" />
        <Icon name="profile" height={40} width={40} className="rounded-full" />
      </div>
    </nav>
  );
};

export default DashboardNav;
