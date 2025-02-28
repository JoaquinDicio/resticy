import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Button from "@mui/material/Button";

const QRCodeGenerator = ({ restaurantID, tableID, tableNumber }) => {
    const qrCanvasRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [qrReady, setQrReady] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        if (restaurantID && tableID) {
            const url = `http://localhost:5173/neworder/${restaurantID}/${tableID}`;
            import("qrcode").then((QRCode) => {
                QRCode.toCanvas(qrCanvasRef.current, url, {
                    width: 350,
                })
                    .then(() => setQrReady(true))
                    .catch((err) => console.error("Ocurrió un error al generar el QR", err));
            });
        }
    };

    const handleClose = () => setOpen(false);

    const handlePrint = () => {
        const canvas = qrCanvasRef.current;
        if (!canvas) {
            console.error("El canvas no está disponible.");
            return;
        }
    
        const image = canvas.toDataURL("image/png");
        if (!image) {
            console.error("No se pudo generar la imagen del QR.");
            return;
        }
    
        setTimeout(() => {
            const printWindow = window.open("", "_blank", "width=600,height=600");
    
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                      <head>
                      <title>Imprimir QR Code</title>
                      <style>
                          body {
                          font-family: 'Arial', sans-serif;
                          background-color: #f9f9f9;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          height: 100vh;
                          margin: 0;
                          }
                          .container {
                          text-align: center;
                          background-color: #ffffff;
                          padding: 100px;
                          border-radius: 10px;
                          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                          max-width: 512px;
                          width: 100%;
                          }
                          h1 {
                          font-size: 24px;
                          color: #333333;
                          margin-bottom: 20px;
                          }
                          img {
                          max-width: 100%;
                          height: auto;
                          border: 1px solid #dddddd;
                          border-radius: 10px;
                          padding: 10px;
                          background-color: #f9f9f9;
                          }
                          .footer {
                          margin-top: 20px;
                          font-size: 14px;
                          color: #777777;
                          }
                      </style>
                      </head>
                      <body>
                      <div class="container">
                          <h1>MESA ${tableNumber}</h1>
                          <img src="${image}" alt="QR Code" />
                          <div class="footer">
                          Escanea el código para acceder al menú.
                          </div>
                      </div>
                      </body>
                  </html>
                `);
    
                printWindow.document.close();
                printWindow.focus();
    
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 500);
            } else {
                console.error("No se pudo abrir la ventana de impresión.");
            }
        }, 100);
    };
    

    return (
        <>
            <QrCodeIcon sx={{ fontSize: 40 }} onClick={handleOpen}  className='cursor-pointer hover:text-blue-500' />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="w-full h-[100vh] flex justify-center items-center flex-col text-dark"
            >
                <Box className="pt-4 p-4 md:p-4 bg-white flex justify-center flex-col rounded-lg" data-aos="fade-up">
                    <p className="text-xl text-center">Escanea el QR para ir a la mesa.</p>
                    <a target='_blank' href={`http://localhost:5173/neworder/${restaurantID}/${tableID}`}>
                    <canvas ref={qrCanvasRef} />
                    </a>
                    {qrReady && (
                        <Button variant="contained" color="primary" onClick={handlePrint} sx={{ mt: 2 }}>
                            Imprimir QR
                        </Button>
                    )}
                </Box>
            </Modal>
        </>
    );
}

export default QRCodeGenerator