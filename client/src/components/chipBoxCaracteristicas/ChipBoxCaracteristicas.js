import Chip from '@mui/material/Chip';


export const ChipBoxCaracteristicas = ({caracteristicas}) => {
    return <div class="chips-box">
                        {caracteristicas.map(carac => {
                        return (<Chip label={carac} key={carac}></Chip>)
                    })}
                    </div>
}