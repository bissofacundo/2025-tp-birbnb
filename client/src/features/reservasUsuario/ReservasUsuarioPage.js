import { useState } from "react"
import {ReservaUsuario} from "../../components/reservaUsuario/ReservaUsuario"

export const ReservasUsuario = () => {
    const [reservas, setReservas] = useState([])
    
    return <div className="reservas-usuario">
        <h3>Reservas actuales</h3>
        <main>
            { reservas.map( reserva => <ReservaUsuario  /> ) }
        </main>
    </div>
}