import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function Scanner({ onScanSuccess }) {
  const html5QrCode = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = async () => {
    if (!html5QrCode.current) {
      html5QrCode.current = new Html5Qrcode("reader");
    }

    try {
      await html5QrCode.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 220 },
        (decodedText) => {
          onScanSuccess(decodedText);
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.log(err);
    }
  };

  const stopScanner = async () => {
    if (html5QrCode.current && isScanning) {
      try {
        await html5QrCode.current.stop();
      } catch {}
      setIsScanning(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!html5QrCode.current) {
      html5QrCode.current = new Html5Qrcode("reader");
    }

    try {
      const result = await html5QrCode.current.scanFile(file, true);
      onScanSuccess(result);
    } catch {
      alert("Invalid QR Code");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">

      <div className="flex gap-2 justify-center mb-3">

        {!isScanning ? (
          <button
            onClick={startScanner}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Start Camera
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Stop
          </button>
        )}

        <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer">
          Upload
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

      </div>

      <div id="reader" className="w-full max-w-sm mx-auto"></div>

    </div>
  );
}