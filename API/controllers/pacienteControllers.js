const Paciente = require('../models/Pacientes');

// Para crear un nuevo paciente
exports.nuevoCliente = async (req, res, next) => {
    
    // ToDo: Insertar en la base de datos
    const paciente = new Paciente(req.body);

    try {
        await paciente.save();
        res.json({ mensaje: 'El cliente se agregó correctamente' });
    } catch (error) {
        console.log(error);
        next();
    }
}

// Para obtener todos los pacientes
exports.obtenerPacientes = async (req ,res, next) => {

    // ToDo: 
    try {
        const pacientes = await Paciente.find({});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Para obtener un paciente por su ID
exports.obtenerPaciente = async (req, res, next) => {

    // ToDo:
    try {
        const paciente = await Paciente.findById(req.params.id);
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Para actualizar un paciente por su ID
exports.actualizarPaciente = async (req, res, next) => {

    // ToDo:
    try {
        const paciente = await Paciente.findOneAndUpdate(
            { _id: req.params.id }, // Indicamos qué registro se debe modificar
            req.body,  // Indicamos los datos con los que se debe modificar el registro
            { new: true } // Indicamos que nos devuelva el resultado de la actualización, si no lo ponemos, nos devolverá los datos del registro antes de ser modificado
        )
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Para eliminar un paciente por su ID
exports.eliminarPaciente = async (req, res, next) => {

    // ToDo:
    try {
        await Paciente.findOneAndDelete({ _id: req.params.id });
        res.json({ mensaje: 'El paciente fue eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}