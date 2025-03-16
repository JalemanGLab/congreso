import { Outlet } from "react-router-dom";

const PublicLayout = () => {
	return (
		<div className="min-h-screen bg-neutral-100 flex flex-col">
			{/* Header con gradiente */}
			<div className="w-full bg-gradient-to-b from-[#000000] to-[#333333] px-4 md:px-10 py-16 md:py-20 h-[400px]">
				<div className="max-w-7xl px-6 sm:px-0 mx-auto">
					<h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-3 md:mb-4">
						Congreso Magno 3.0
					</h1>
					<h2 className="text-lg md:text-xl text-[#A8A8A8] font-medium mb-2 md:mb-3">
						Únete a la élite de la odontología
					</h2>
					<p className="text-sm md:text-base text-[#A8A8A8] max-w-2xl">
						Completa tu registro para acceder a talleres exclusivos, ponencias internacionales y las últimas 
						innovaciones en tecnología dental.
					</p>
				</div>
			</div>

			{/* Contenido principal */}
			<div className="flex-1 px-4 md:px-10 -mt-32 relative z-10">
				<div className="max-w-7xl mx-auto">
					<div className="min-h-96 bg-white rounded-2xl shadow-xl p-6 md:p-8">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PublicLayout;