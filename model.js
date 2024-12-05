const tf = require('@tensorflow/tfjs-node'); // Menggunakan TensorFlow.js di Node.js

async function predictModel(file) {
    // Muat model TensorFlow.js
    const model = await tf.loadGraphModel('gs://path-to-your-model/model.json');
    
    // Proses gambar dan konversi ke tensor (misalnya dengan library seperti sharp)
    const imageTensor = processImage(file);

    // Prediksi
    const prediction = model.predict(imageTensor);
    return prediction.dataSync()[0]; // Mengambil hasil prediksi
}
