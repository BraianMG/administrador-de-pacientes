const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteControllers');

module.exports = function() {
    
    // Agrega nuevos pacientes
    router.post('/pacientes', pacienteController.nuevoCliente);

    // Obtiene todos los registros de pacientes
    router.get('/pacientes', pacienteController.obtenerPacientes);

    // Obtiene un paciente por su ID
    router.get('/pacientes/:id', pacienteController.obtenerPaciente);

    // Actualiza un paciente por su ID
    router.put('/pacientes/:id', pacienteController.actualizarPaciente);

    // Elimina un paciente por su ID
    router.delete('/pacientes/:id', pacienteController.eliminarPaciente);

    return router;
}