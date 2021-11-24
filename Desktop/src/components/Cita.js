import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router';
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from '../config/axios';
import Swal from "sweetalert2";

const Cita = (props) => {
    const { id } = useParams();
    console.log(id)

    const [cita, setCita] = useState([]);
    const [consultar, setConsultar] = useState(true)

    useEffect(() => {
        if (consultar) {
        const consultarAPI = () => {
            clienteAxios.get(`/pacientes/${id}`)
            .then( respuesta => {
                setCita(respuesta.data);

                // Deshabilitar consulta
                setConsultar(false);
            })
            .catch( error => {
                console.log(error);
            })
        }
        consultarAPI();
        }
    }, [consultar] )
    
    console.log(!cita);

    // INCIO: Código del profe adaptado a react-router-dom v6
    const navigate = useNavigate();
    if (cita.length === 0) {
        navigate('/');
    }
    // FIN: Código del profe adaptado a react-router-dom v6

    // Elimina un registro
    const eliminarCita = id => {
        
        
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Una Cita eliminada no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            
            if (result.isConfirmed) {
                
                // Alerta de eliminado
                Swal.fire(
                    'Cita eliminada!',
                    'La cita fue eliminada correctamente',
                    'success'
                    )
                    
                    // Eliminado de la base de datos
                    clienteAxios.delete(`/pacientes/${id}`)
                        .then(respuesta => {
                            props.setConsultar(true);
                            navigate('/');
                        })
                        .catch(error => console.log(error))
                    
                }
            })
    }

    return (
        <Fragment>
            <h1 className="my-5">Sobre Cita: {cita.nombre}</h1>

            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                    </div>

                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="mb-3" >{cita.nombre}</h3>
                                    <small className="fecha-alta">
                                        {cita.fecha} - {cita.hora}
                                    </small>
                                </div>
                                <p className="mb-0">
                                    {cita.sintomas}
                                </p>
                                <div className="contacto py-3">
                                    <p>Dueño: {cita.propietario}</p>
                                    <p>Teléfono: {cita.telefono}</p>
                                </div>

                                <div className="d-flex">
                                    <button type="button"
                                        className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                                        onClick={() => {eliminarCita(cita._id)}}>
                                        Elimnar &times;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}


export default Cita;