import React from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ApartmentIcon from '@material-ui/icons/Apartment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BusinessIcon from '@material-ui/icons/Business';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import ContactsIcon from '@material-ui/icons/Contacts';
import DialerSipIcon from '@material-ui/icons/DialerSip';
import LanguageIcon from '@material-ui/icons/Language';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import PeopleIcon from '@material-ui/icons/People';
import PublicIcon from '@material-ui/icons/Public';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import StoreIcon from '@material-ui/icons/Store';
import SyncIcon from '@material-ui/icons/Sync';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';


import InboxIcon from "@material-ui/icons/MoveToInbox";

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

function Parametros() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Parametros del Sistema" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItem component={Link} button to="/parametros/paises" className={classes.nested} >
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Paises"  />
                    </ListItem>

                    <ListItem component={Link} button to="/parametros/regiones" className={classes.nested}>
                        <ListItemIcon>
                            <PublicIcon />
                        </ListItemIcon>
                        <ListItemText primary="Regiones" />
                    </ListItem>

                    <ListItem component={Link} button to="/parametros/departamentos" className={classes.nested}>
                        <ListItemIcon>
                            <ApartmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Departamentos" />
                    </ListItem>

                    <ListItem  component={Link} button to="/parametros/ciudades" className={classes.nested}>
                        <ListItemIcon>
                            <NaturePeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ciudades" />
                    </ListItem>
                    
                    <ListItem component={Link} button to="/parametros/tipointerlocutores" className={classes.nested}>
                        <ListItemIcon>
                            <DialerSipIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tipo de Interlocutores" />
                    </ListItem>
     
                    <ListItem component={Link} button to="/parametros/especialidades" className={classes.nested}>
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Especialidades" />
                    </ListItem>

                    <ListItem component={Link} button to="/parametros/estados" className={classes.nested}>
                        <ListItemIcon>
                            < PlaylistAddCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Estados" />
                    </ListItem>
                    

                    <ListItem component={Link} button to="/parametros/empresa" className={classes.nested}>
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary="Empresa" />
                    </ListItem>

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <SettingsBackupRestoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="Proveedores" />
                    </ListItem>

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clientes" />
                    </ListItem>                 
                 
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <ContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contactos" />
                    </ListItem>

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <SyncIcon />
                        </ListItemIcon>
                        <ListItemText primary="Frecuencia" />
                    </ListItem>

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bodegas" />
                    </ListItem>

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <VerticalAlignCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Areas" />
                    </ListItem>

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <CenterFocusWeakIcon />
                        </ListItemIcon>
                        <ListItemText primary="Centros de costos" />
                    </ListItem>

                </List>
            </Collapse>
        </div>

    );
}

export default Parametros;