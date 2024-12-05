const express = require('express');
const multer = require('multer');
const path = require('path');
const { predictModel } = require('./model'); // Fungsi prediksi yang akan diimplementasikan

const app = express();
const upload = multer({ limits: { fileSize: 1000000 } }); // Membatasi ukuran file hingga 1MB

// Endpoint /predict
app.post('/predict', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            status: 'fail',
            message: 'No file uploaded'
        });
    }

    try {
        const prediction = await predictModel(req.file); // Panggil fungsi prediksi
        const result = prediction > 0.5 ? 'Cancer' : 'Non-cancer';

        res.json({
            status: 'success',
            message: 'Model is predicted successfully',
            data: {
                id: '77bd90fc-c126-4ceb-828d-f048dddff746',
                result: result,
                suggestion: result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.',
                createdAt: new Date().toISOString()
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi'
        });
    }
});

// Menjalankan server di port 8080
app.listen(8080, () => {
    console.log('Server running on port 8080');
});
