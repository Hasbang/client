import { QRCodeSVG } from 'qrcode.react';


const QRCodePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold mb-4">Scan to View Our Menu</h2>
      <QRCodeSVG value="http://localhost:3000/view-menu" size={200} />
    </div>
  );
};

export default QRCodePage;