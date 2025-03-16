import MenuItem from "./MenuItem";
import { TfiDashboard } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlinePower } from "react-icons/hi2";
import { HiOutlineQrCode } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

const DesktopMenu = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  const closeSession = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      clearAuth(); // Limpia el store
      toast.success("Sesión cerrada correctamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };
  return (
    <div className="flex  w-full h-full flex-col  justify-between  rounded-lg border border-neutral-300  p-2">
      <div className="flex flex-col  border-neutral-100  gap-3">
        <MenuItem
          text="Dashboard"
          onClick={() => {
            navigate("/dashboard");
          }}
          childrenIcon={<TfiDashboard />}
        />

        <MenuItem
          text="Buscar"
          onClick={() => {
            navigate("/search");
          }}
          childrenIcon={<IoSearchOutline />}
        />
        <MenuItem
          text="Gestion"
          onClick={() => {
            navigate("/management");
          }}
          childrenIcon={<HiOutlinePencilSquare />}
        />
        <MenuItem
          text="Alertas"
          onClick={() => {
            navigate("/alerts");
          }}
          childrenIcon={<GoBell />}
        />
        <MenuItem
          text="Perfil"
          onClick={() => {
            navigate("/profile");
          }}
          childrenIcon={<HiOutlineUser />}
        />
        <MenuItem
          text="Scan QR"
          onClick={() => {
            navigate("/scanqr");
          }}
          childrenIcon={<HiOutlineQrCode />}
        />
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t pt-2 border-neutral-300  ">
        <MenuItem
          text="Salir"
          onClick={closeSession}
          childrenIcon={<HiOutlinePower />}
        />
      </div>
    </div>
  );
};

export default DesktopMenu;

// return (
//    <div className="flex  w-full h-full flex-col justify-between  bg-red-200">
//       <div className="flex flex-col w-full">
//          <div className="flex flex-col border-t border-neutral-100 pt-4 gap-4">
//             <RoleAdmin />
//             <RoleSuper />
//          </div>
//       </div>
//       <div className="sticky inset-x-0 bottom-0 border-t border-neutral-100 bg-white p-2">
//          <MenuItem text="Salir"  onClick={closeSession} childrenIcon={<HiOutlinePower />} />
//       </div>
//    </div>
// );
