import FooterComponent from "@/components/FooterComponent";
import SideBarComponent from "@/components/SideBarComponent";
import { Outlet } from "react-router";

const PanelLayoutTemp = () => {
  return (
    <>
      <SideBarComponent>
        <Outlet />
        <FooterComponent />
      </SideBarComponent>
    </>
  );
};

export default PanelLayoutTemp;
