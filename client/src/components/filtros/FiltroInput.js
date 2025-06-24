import { TextField } from "@mui/material";
import "./FiltroInput.css"


export const FiltrosInput = ({ parametros, modificarInput}) => {

    return (
        <>
            {parametros.map(parametro =>  <Input nombre={parametro.nombreParam} modificarInput={modificarInput} input={parametro.input} />)}
        </>
    )
}

const Input = ({ nombre, modificarInput, input }) => {
    return (
        <div key={nombre} className="input">
             <TextField
                label={nombre}
                variant="outlined"
                onChange={(e) => modificarInput(e.target.value, nombre)}
                value={input}
            />
        </div>
    )
}