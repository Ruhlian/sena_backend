// controllers/usuariosC.js
const connection = require('../config/conexion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    const query = 'SELECT * FROM Usuarios';

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la base de datos.' });
        }
        res.json(results);
    });
};

// Iniciar sesión
const login = (req, res) => {
    const { correo, contrasena } = req.body; // Cambiado de email y password a correo y contrasena

    // Consulta para buscar al usuario por correo
    const query = 'SELECT * FROM Usuarios WHERE Correo_Usuarios = ?';

    connection.query(query, [correo], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la base de datos.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const user = results[0];

        // Comparar la contraseña con bcrypt
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);

        if (!isMatch) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        // Crear un token JWT incluyendo el rol
        const token = jwt.sign({ id: user.UsuarioId, rol: user.ID_Rol }, 'secretojwt', { expiresIn: '1h' });

        res.json({ token, message: 'Login exitoso' });
    });
};

// Registrar un nuevo usuario
const register = (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    // Asegúrate de manejar la encriptación de la contraseña y la lógica de registro
    // Código de registro aquí...

    res.json({ message: 'Registro exitoso' });
};

// Eliminar un usuario por ID
const deleteUserById = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Usuarios WHERE UsuarioId = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la base de datos.' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
};

// Exportar las funciones del controlador
module.exports = {
    getAllUsers,
    login,
    register,
    deleteUserById
};
