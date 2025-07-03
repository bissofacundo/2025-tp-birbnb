
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './ReservaUsuario.css'


const ReservaUsuario = () => {
    return <div className="reserva-usuario">
        <div>
            <h5>Reserva</h5>
            <CalendarMonthIcon /><p>Fechas</p>
        </div>
        <img src='' alt='Reserva del usuario ' />
    </div>
}