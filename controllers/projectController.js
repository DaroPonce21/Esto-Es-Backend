const Project = require('../models/Project')
const User = require('../models/User')
const { Op } = require('sequelize')

/* 
Get All:
traemos todos los proyectos y los paginamos,
- devolvemos los proyectos,
- la cantidad total que hay,
- las paginas totales,
- la pagina actual
- y los proyectos que estan en esa pagina
*/

exports.getProjects = async (req, res) => {
    const { name, page = 1, size = 10 } = req.query;

    try {
        const queryOptions = {
            limit: parseInt(size),
            offset: (page - 1) * parseInt(size),
            include: [{ model: User, as: 'users' }],
        };

        if (name) {
            queryOptions.where = {
                name: {
                    [Op.like]: `%${name}%`,
                },
            }
        }

        const projects = await Project.findAndCountAll(queryOptions);

        res.json({
            totalItems: projects.count,
            totalPages: Math.ceil(projects.count / size),
            currentPage: parseInt(page),
            data: projects.rows,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los proyectos', error: error.message });
    }
}

// trae el proyecto filtrado por ID

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [{ model: User, as: 'users' }],
        })
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' })
        }
        res.json(project)

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el proyecto', error: error.message })
    }


}

/* Crea proyectos nuevos, 
previamente derifica que no haya proyectos con el mismo nombre, No era un requisito pero imagino que tener 2 proyectos que se llamen "Landing Page para XMarca" seria confuso.
Los participantes de los proyectos se agregan por su ID (los cuales deben estar previamente en la base de datos de User)
*/

exports.createProject = async (req, res) => {
    const { name, description, projectManager, assignedTo = [], status } = req.body;

    if (!name || !description || !projectManager || !status) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }
    try {
        const existingProject = await Project.findOne({ where: { name } })
        if (existingProject) {
            return res.status(400).json({ message: 'Ya existe un proyecto con el mismo nombre' })
        }

        const project = await Project.create({
            name, description, projectManager, status,
        })
        /*
                if (assignedTo.length > 0) {
        
                    const users = await User.findAll({ where: { id: { [Op.in]: assignedTo } } })
                    if (users.length !== assignedTo.length) {
                        return res.status(400).json({ message: 'Uno o más usuarios no existen' })
        
                    }
                               await project.addUsers(users)
                    }*/
        await project.addUsers(assignedTo)
        res.status(201).json(project)

    } catch (error) {
        res.status(500).json({ message: 'Error al crear el proyecto', error: error.message })
    }
}

/* actualiza el proyecto segun id
Al igual que en el de crear decidi verificar que no ser repitan los nombres de los proyectos para que al modificar uno, no termine siendo un duplicado de otro
Los participantes de los proyectos se agregan por su ID (los cuales deben estar previamente en la base de datos de User)
*/


exports.updateProject = async (req, res) => {
    const { name, description, projectManager, assignedTo = [], status } = req.body

    if (!name || !description || !projectManager || !status) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }
    try {
        const project = await Project.findByPk(req.params.id)
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' })
        }
        const existingProject = await Project.findOne({
            where: {
                name,
                id: { [Op.ne]: req.params.id }
            }
        });
        if (existingProject) {
            return res.status(400).json({ message: 'Ya existe un proyecto con el mismo nombre' })
        }
        await project.update({
            name, description, projectManager, status,
        });

        if (assignedTo.length > 0) {

            const users = await User.findAll({ where: { id: { [Op.in]: assignedTo } } })
            if (users.length !== assignedTo.length) {
                return res.status(400).json({ message: 'Uno o más usuarios no existen' })

            }
            await project.addUsers(users)
        }

        else {
            await project.setUsers([])
        }

        res.json(project)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el proyecto', error: error.message })
    }
}

// borra el proyecto por Id

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id)
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' })
        }
        await project.destroy()
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el proyecto', error: error.message })
    }


}
