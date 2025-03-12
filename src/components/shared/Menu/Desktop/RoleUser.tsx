import { TfiDashboard } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
const RoleUser = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col w-full gap-4 px-2">
			<MenuItem text="Dashboard" onClick={()=>{navigate('/dashboard')}} childrenIcon={<TfiDashboard />} />
			<MenuItem text="Buscar" onClick={()=>{navigate('/search')}} childrenIcon={<IoSearchOutline />} />
			<MenuItem text="Gestion" onClick={()=>{navigate('/management')}} childrenIcon={<HiOutlinePencilSquare />} />
			<MenuItem text="Alertas" onClick={()=>{navigate('/alerts')}} childrenIcon={<GoBell />} />
			<MenuItem text="Perfil" onClick={()=>{navigate('/profile')}} childrenIcon={<HiOutlineUser />} />
		</div>

	);
}

export default RoleUser;