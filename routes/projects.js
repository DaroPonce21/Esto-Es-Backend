const express = require('express')
const projectController = require('../controllers/projectController')
const router = express.Router()

// creamos y definimos las rutas

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - projectManager
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado del proyecto
 *         name:
 *           type: string
 *           description: El nombre del proyecto
 *         description:
 *           type: string
 *           description: Una breve descripción del proyecto
 *         projectManager:
 *           type: string
 *           description: El nombre del gerente del proyecto
 *         assignedTo:
 *           type: array
 *           items:
 *             type: integer
 *           description: Una lista de IDs de usuarios asignados al proyecto
 *         status:
 *           type: string
 *           description: El estado del proyecto
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora en que se creó el proyecto
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora en que se actualizó por última vez el proyecto
 */



/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene una lista de proyectos con paginación
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de la página a obtener
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Cantidad de proyectos por página
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del proyecto a buscar
 *     responses:
 *       200:
 *         description: Una lista de proyectos paginados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 */
router.get('/', projectController.getProjects)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtiene un proyecto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Proyecto no encontrado
 */
router.get('/:id', projectController.getProjectById)

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crea un nuevo proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Proyecto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Campos obligatorios faltantes o proyecto duplicado
 */
router.post('/', projectController.createProject)

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Actualiza un proyecto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Proyecto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Campos obligatorios faltantes o proyecto duplicado
 *       404:
 *         description: Proyecto no encontrado
 */
router.put('/:id', projectController.updateProject)

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Elimina un proyecto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       204:
 *         description: Proyecto eliminado con éxito
 *       404:
 *         description: Proyecto no encontrado
 */
router.delete('/:id', projectController.deleteProject)


module.exports = router