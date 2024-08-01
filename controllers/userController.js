// Crea usuarios en la base de datos (lo pense como empleados)

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