import { Outlet } from "react-router-dom";
import BuyerNavbar from "./components/BuyerNavbar";
import BuyerFooter from "./components/BuyerFooter";
import "./styles/Layout.css";

export default function BuyerLayout() {
  return (
    <div className="buyer-layout">
      <BuyerNavbar />
      <main className="buyer-content">
        <Outlet />
      </main>
      <BuyerFooter />
    </div>
  );
}
