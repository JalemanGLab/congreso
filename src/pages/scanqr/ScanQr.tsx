import qrImage from '../../assets/img/qrImage.svg'
import { useScanQr } from './useScanQr'

const PageScanQr = () => {
	const { isScanning, startScanning, setIsScanning } = useScanQr();

	return (
		<div className="w-full h-full flex flex-col items-center justify-center px-7 gap-7">
			<div className="text-3xl sm:text-4xl md:text-5xl font-bold">Escanear codigo QR</div>
			<div className="text-sm sm:text-base md:text-lg text-gray-400 text-center">
				Coloca el código QR dentro del marco para escanearlo.
				Evita movimientos bruscos para obtener resultados rápidamente.
			</div>
			{!isScanning && <img src={qrImage} alt="qr" width="200" height="200"  />}
			<div 
				id="reader" 
				className={`${isScanning ? 'block' : 'hidden'} w-full max-w-[500px] h-[400px] border-2 border-gray-300 rounded-lg overflow-hidden`}
				style={{ minHeight: '400px' }}
			></div>
			<button 
				onClick={() => isScanning ? setIsScanning(false) : startScanning()}
				className=" bg-primary w-full max-w-[400px] sm:w-[400px] text-white font-semibold px-4 py-2 rounded-md"
			>
				{isScanning ? 'Detener' : 'Escanear QR'}
			</button>
			<div className="hidden md:block text-sm text-gray-400 text-center mt-4">
				Nota: El escaneo solo funciona desde un teléfono móvil. Si estás en un PC, usa tu teléfono para acceder a esta página y escanear el código QR.
			</div>
		</div>
	)
}

export default PageScanQr