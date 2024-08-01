const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre del usuario.
 *                 example: "Juan Pérez"
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del usuario creado.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: El nombre del usuario.
 *                   example: "Juan Pérez"
 *       400:
 *         description: Campos obligatorios faltantes o usuario duplicado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: "Ya existe un usuario con ese nombre"
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
 *                   example: "Error al crear el usuario"
 */
router.post('/', userController.createUser)

router.get('/', userController.getUser)

module.exports = router