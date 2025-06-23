
import { Menu } from '@mui/material';
import { FiltroInput } from './FiltroInput';
import { Filtro } from './Filtros';

export const FiltroPrecio = ({ modificarFiltro }) => {
    return (<Menu>
        <FiltroInput modificarFiltro={modificarFiltro} nombreParam="PrecioMin" />
        <FiltroInput modificarFiltro={modificarFiltro} nombreParam="PrecioMax" />
    </Menu>

    );
};
