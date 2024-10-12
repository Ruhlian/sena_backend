// routes/usuariosR.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosC'); // Asegúrate de que esta ruta sea correcta

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getAllUsers);

// Ruta para iniciar sesión
router.post('/login', usuarioController.login);

// Ruta para registrar un nuevo usuario
router.post('/register', usuarioController.register);

// Ruta para eliminar un usuario por ID
router.delete('/:id', usuarioController.deleteUserById);

// Otras rutas adicionales pueden ser añadidas aquí según sea necesario

module.exports = router;
