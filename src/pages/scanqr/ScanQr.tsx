import { PiQrCodeThin, PiX, PiCamera, PiInfo } from "react-icons/pi"
import { useScanQr } from './useScanQr'

const PageScanQr = () => {
	const { isScanning, startScanning, setIsScanning } = useScanQr();

	return (
		<section className="w-full min-h-screen flex flex-col items-center justify-center px-7 gap-7">
			<div className="w-full md:w-[600px] border border-gray-300 rounded-sm flex flex-col gap-3 p-8 mx-5">
				<div className="flex justify-between items-center">
					<div className="flex flex-col">
						<h2 className="text-3xl font-bold">Escáner QR</h2>
						<p className="text-gray-500 text-sm">Registro Congreso Magno 3.0</p>
					</div>
					<PiQrCodeThin className="text-4xl text-gray-500" />
				</div>
				{!isScanning &&
					<>
						<div className="border border-gray-300 p-4 rounded-sm flex  gap-3 mt-3">
							<PiInfo className="text-4xl" />
							<div className="flex flex-col gap-1">
								<h3 className="font-medium">Se Recomienda Escaneo Móvil</h3>
								<p className="text-sm text-gray-600">
									Coloca el código QR dentro del marco para escanearlo.
									Evita movimientos bruscos para obtener resultados rápidamente.
								</p>
							</div>
						</div>
						<div className="hidden w-full h-[250px] border border-gray-300 rounded-sm md:flex flex-col items-center justify-center bg-gray-50 p-4">
							<PiQrCodeThin className="text-7xl text-gray-400" />
							<h3 className="text-xl font-medium">Escanee el Código QR</h3>
						</div>
					</>
				}
				<div
					id="reader"
					className={`${isScanning ? 'block' : 'hidden'
						} w-full h-[250px] md:h-[400px] border-2 border-gray-300 rounded-sm overflow-hidden`}
				>
				</div>
				{isScanning && (
					<p className="text-center text-gray-600">
						Posicione el código QR dentro del marco
					</p>
				)}
				<button
					onClick={() => isScanning ? setIsScanning(false) : startScanning()}
					className={`w-full px-4 py-2 rounded-sm cursor-pointer flex items-center justify-center gap-3  text-sm md:text-lg transition-colors ${isScanning ? "bg-white text-primary text-sm md:text-lg border border-gray-500" : "bg-primary text-white"
						}`}
				>
					{isScanning ? <PiX className="text-xl text-primary" /> : <PiCamera className="text-xl" />}
					{isScanning ? "Cancelar" : "Usar cámara del dispositivo"}
				</button>
			</div>
		</section>
	)
}

export default PageScanQr
