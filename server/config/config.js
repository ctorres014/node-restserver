// ======================================
//  PUERTO
// ======================================
process.env.PORT = process.env.PORT || 3000;

// ======================================
//  Entorno
// ======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================================
//  Base de datos
// ======================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
// Comentar
// urlDB = 'mongodb+srv://ctorres014:dJ1RoT8Td3oG5Kuq@cluster0-gbca6.mongodb.net/cafe';

process.env.URLDB = urlDB;