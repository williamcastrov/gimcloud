import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List } from "@material-ui/core";
import Parametros from "./Parametros";
import Usuarios from "./Usuarios";
import Interlocutores from "./Interlocutores";
import Activos from "./Activos";
import Almacenes from "./Almacenes";
import Mantenimiento from "./Mantenimiento";
import Ordenes from "./Ordenes";
import Planeacion from "./Planeacion";
import ListaChequeo from "./ListaChequeo";
import Informes from "./Informes";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function UsuarioDos() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    USUARIO UNO
                </ListSubheader>
            }
            className={classes.root}
        >
           
            <Interlocutores />
            <Almacenes />
            <Mantenimiento />
            <Ordenes />
            <ListaChequeo />
            <Planeacion />
            <Informes />
        </List>
    );
}

/* <Parametros />
   <Usuarios />
   <Activos />

*/

export default UsuarioDos;

