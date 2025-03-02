import data from "@/constants/sidebar.json";
import SidebarItem from "./SidebarItem";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { Icon } from "@/components/ui/Icon";

const DashboardSidebar = () => {
  return (
    <div className="drawer-side bg-ctm-primary-colour-light">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="text-[23px] text-center font-[400] p-[12px] shadow-[0px_2px_2px_0px_#0d3f6a0f] w-full h-[80px] p4">
        <span>
          <em className="font-istok_web font-[700] text-ctm-primary-colour">00:00</em> In Minutes
        </span>
      </div>
      <div>
        <ul className="min-h-full w-55 p-4">
          {Object.entries(data).map(([, item]) => (
            <li className="my-2" key={item.key}>
              <SidebarItem href={item.key} label={item.name} key={item.key} />
            </li>
          ))}
        </ul>
        <span className="absolute bottom-[-55%] pl-4">
          <Button
            variant={"ctm-ghost"}
            slotBefore={<Icon name={"logout"} />}
            className={
              "border-none shadow-none text-[#484D57] hover:textwhite text-left w-[12rem] justify-start pl-[3rem] text-[16px] font-[400] bg-ctm-primary-colour-light"
            }
          >
            Logout
          </Button>
        </span>
      </div>
    </div>
  );
};

export default DashboardSidebar;
