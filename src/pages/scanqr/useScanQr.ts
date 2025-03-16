import { useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { toast } from 'sonner'

export const useScanQr = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);

  const startScanning = async () => {
    try {
      const html5QrCode = new Html5Qrcode("reader");
      setScanner(html5QrCode);
      setIsScanning(true);

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText) => {
          console.log("QR DETECTADO!");
          console.log("Contenido:", decodedText);
          
          toast.success('QR detectado exitosamente!', {
            description: decodedText,
            duration: 5000,
            position: 'top-center'
          });

          html5QrCode.stop().then(() => {
            setIsScanning(false);
          });
        },
        (error) => {
          if (typeof error === 'string' && error.includes("No QR code found")) {
            return;
          }
          console.error("Error durante el escaneo:", error);
          toast.error('Error al escanear', {
            description: typeof error === 'string' ? error : 'Error desconocido',
            duration: 3000
          });
        }
      ).catch(err => {
        console.error("Error al iniciar la cámara:", err);
        toast.error('Error de cámara', {
          description: 'Verifica los permisos de la cámara',
          duration: 3000
        });
        setIsScanning(false);
      });
    } catch (err) {
      console.error("Error general:", err);
      toast.error('Error al iniciar', {
        description: 'No se pudo iniciar el escáner',
        duration: 3000
      });
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scanner) {
      try {
        await scanner.stop();
        setScanner(null);
        setIsScanning(false);
      } catch (err) {
        console.error("Error al detener el escáner:", err);
      }
    }
    setIsScanning(false);
  };

  return {
    isScanning,
    startScanning,
    stopScanning,
    setIsScanning
  }
}