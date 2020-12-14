import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import StoreIcon from '@material-ui/icons/Store';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import Divider from '@material-ui/core/Divider';

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

function Almacenes() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openGA, setOpenGA] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickGA = () => {
    setOpenGA(!openGA);
  };

  return (     
      <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Almacenes" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
   
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          <ListItem button className={classes.nested} button onClick={handleClickGA} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Parametros Almacenes" />
            {openGA ? <ExpandLess /> : <ExpandMore />}  
          </ListItem>
          <Collapse in={openGA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Tipos de Almacenes" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <CenterFocusWeakIcon />
                </ListItemIcon>
                <ListItemText primary="Sin Asignar" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión de Almacenes" />
          </ListItem>
        </List>
      </Collapse>
      </div>
  );
}

export default Almacenes;