import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Button from "@mui/material/Button";

export default function QRCodeGenerator({ restaurantID, tableID, tableNumber }) {
    const qrCanvasRef = useRef(null); // Referencia al elemento <canvas>
    const [open, setOpen] = useState(false); // Estado para controlar la apertura del modal
    const [qrReady, setQrReady] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        if (restaurantID && tableID) {
            const url = `http://localhost:5173/neworder/${restaurantID}/${tableID}`; // URL para el QR
            import("qrcode").then((QRCode) => {
                QRCode.toCanvas(qrCanvasRef.current, url, {
                    width: 400, // Tamaño del QR
                })
                    .then(() => setQrReady(true))
                    .catch((err) => console.error("Ocurrió un error al generar el QR", err));
            });
        }
    };

    const handleClose = () => setOpen(false);

    const handlePrint = () => {
        const canvas = qrCanvasRef.current; 
        const image = canvas.toDataURL("image/png"); 

        const printWindow = window.open("", "_blank", "width=600,height=600");

        if(image){
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
                      max-width: px;
                      width: 512px;
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
                      .QRcontainer{
                      margin:auto;
                      }
                  </style>
                  </head>
                  <body>
                  <div class="container">
                      <h1>MESA ${tableNumber}</h1>
                      <div class="QRcontainer"> </div>
                      <img src="${image}" alt="QR Code" />
                      <div class="footer">
                      Escanea el código para acceder al menú.
                      </div>
                  </div>
                  </body>
              </html>
              `);
        }
        
        printWindow.document.close(); 
        printWindow.focus(); // Enfoca la ventana
        printWindow.print(); // Inicia la impresión
        printWindow.close(); // Cierra la ventana después de imprimir
    };

    return (
        <>
            <QrCodeIcon sx={{ fontSize: 40 }} onClick={handleOpen} />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="w-full h-[100vh] flex justify-center items-center flex-col text-dark"
            >
                <Box className="p-8 bg-white flex justify-center flex-col rounded-lg">
                    <p className="text-xl text-center">Escanea el QR para ir a la mesa.</p>
                    <canvas ref={qrCanvasRef} />
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