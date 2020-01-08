// ======================================
//  PUERTO
// ======================================
process.env.PORT = process.env.PORT || 3000;

// ======================================
//  Entorno
// ======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================================
//  Vencimiento del Token
// ======================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ======================================
//  SEED de autenticacion
// ======================================
process.env.SEED = process.env.SEED || 'seed-desarrollo';

// ======================================
//  Google Client ID
// ======================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '751168631819-e16f103luc2ea94erdcnqt20pu9i52qg.apps.googleusercontent.com'

// ======================================
//  Base de datos
// ======================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;