import { BsDatabaseUp } from "react-icons/bs";
import { BsClipboard2Data } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbMessageForward } from "react-icons/tb";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";

const RoleSuper = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col w-full gap-4 px-2">
			<MenuItem text="Datos" onClick={()=>{navigate('/data')}} childrenIcon={<BsDatabaseUp />} />
			<MenuItem text="Reportes" onClick={()=>{navigate('/reports')}} childrenIcon={<BsClipboard2Data />} />
			<MenuItem text="Usuarios" onClick={()=>{navigate('/users')}} childrenIcon={<HiOutlineUsers />} />
			<MenuItem text="Comunicación" onClick={()=>{navigate('/comunication')}} childrenIcon={<TbMessageForward />} />
		</div>

	);
}

export default RoleSuper;