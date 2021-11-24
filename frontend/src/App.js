import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import clienteAxios from "./config/axios";

// Componenetes
import Pacientes from "./components/Pacientes";
import NuevaCita from "./components/NuevaCita";
import Cita from "./components/Cita";

function App() {

  // State de la app
  const [citas, setCitas] = useState([]);
  const [consultar, setConsultar] = useState(true)

  useEffect(() => {
    if (consultar) {
      const consultarAPI = () => {
        clienteAxios.get('/pacientes')
          .then( respuesta => {
            setCitas(respuesta.data);

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
  
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={ <Pacientes citas={citas} /> }
        />
        <Route 
          path='/nueva'
          element={ <NuevaCita setConsultar={setConsultar} /> }
        />
        <Route 
          path="/cita/:id"
          element={ <Cita setConsultar={setConsultar} /> }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
