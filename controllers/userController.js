// Crea usuarios en la base de datos (lo pense como empleados)

const User = require("../models/User")

exports.createUser = async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ message: 'El nombre es obligatorio' })
    }
    try {
        const existingUser = await User.findOne({ where: { name } })
        if (existingUser) {
            return res.status(400).json({ message: 'Ya existe un usuario con ese nombre' })
        }
        const user = await User.create({ name })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message })
    }
}

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID del usuario.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: El nombre del usuario.
 *                     example: "Dario"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "Error al obtener los usuarios"
 */
exports.getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
};