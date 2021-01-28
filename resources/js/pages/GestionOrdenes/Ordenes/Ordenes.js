import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Box  } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PanToolIcon from '@material-ui/icons/PanTool';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import PeopleIcon from '@material-ui/icons/People';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// Paginas 
import CrearOrdenes from "../../GestionOrdenes/CrearOrdenes";
import CumplirOrden from "../../GestionOrdenes/CumplirOrden";
import OrdenesAprobadas from "../../ListadoOrdenes/OrdenesAprobadas.js";
import OrdenesPorAprobar from "../../ListadoOrdenes/OrdenesPorAprobar.js";
import OrdenesVencidas from '../../ListadoOrdenes/OrdenesVencidas.js';
import OrdenesVencenHoy from '../../ListadoOrdenes/OrdenesVencenHoy.js';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function selectTab(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
      backgroundColor: theme.palette.background.paper,
    },
    tabs: {
      backgroundColor: '#9e9e9e',
      borderBottom: '5px solid #212121',
      padding: theme.spacing(0),
      color: 'white',  
      width: '100%',
    }
}));

function Ordenes() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <div className={classes.tabs} >
          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="wrapped label tabs example">
            <Tab value="1" label="Crear Orden" {...selectTab('1')} icon={<AddBoxOutlinedIcon />} />
            <Tab value="2" label="Cumplimiento" {...selectTab('2')} icon={<ExitToAppIcon />} />
            <Tab value="3" label="Mano de Obra" {...selectTab('3')} icon={ <PeopleIcon  />} />
            <Tab value="4" label="Costos y Gastos" {...selectTab('4')} icon={< MonetizationOnIcon />}  />
          </Tabs>
          </div>
            <TabPanel value={value} index="1">  
              <CrearOrdenes />
            </TabPanel>
            <TabPanel value={value} index="2">
              <CumplirOrden />
            </TabPanel>
            <TabPanel value={value} index="3">
              <OrdenesVencidas />
            </TabPanel>
            <TabPanel value={value} index="4">
              <OrdenesVencenHoy />
            </TabPanel>
          </div>
    );
}
  
export default Ordenes;
  


