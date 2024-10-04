import { Outlet, Navigate } from "react-router-dom";
import sideImg from "@/assets/sideimg.svg"
import { useUserContext } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();
  
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" /> 
      ) : (
        <>
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          <Outlet />
        </section>
        </>
      )}
    </>
  );
}