import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Box  } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PanToolIcon from '@material-ui/icons/PanTool';
import WarningIcon from '@material-ui/icons/Warning';
import AlarmIcon from '@material-ui/icons/Alarm';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

// Paginas 
import OrdenesActivas from "../../pages/ListadoOrdenes/OrdenesActivas.js";
import OrdenesAprobadas from "../../pages/ListadoOrdenes/OrdenesAprobadas.js";
import OrdenesPorAprobar from "../../pages/ListadoOrdenes/OrdenesPorAprobar.js";
import OrdenesVencidas from '../../pages/ListadoOrdenes/OrdenesVencidas.js';
import OrdenesVencenHoy from '../../pages/ListadoOrdenes/OrdenesVencenHoy.js';
import OrdenesVencen8Dias from '../../pages/ListadoOrdenes/OrdenesVencen8Dias.js';
import OrdenesPropias from '../../pages/ListadoOrdenes/OrdenesPropias.js';
import OrdenesTerceros from '../../pages/ListadoOrdenes/OrdenesTerceros.js';

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

function Management() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <div className={classes.tabs} >
          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="wrapped label tabs example">
            <Tab value="1" label="Ord Activas" {...selectTab('1')} icon={<ExitToAppIcon />} />
            <Tab value="2" label="Ord Aprobadas" {...selectTab('2')} icon={<AssignmentTurnedInIcon />} />
            <Tab value="3" label="Por Aprobar" {...selectTab('3')} icon={ <PanToolIcon />}  />
            <Tab value="4" label="Ord Vencidas" {...selectTab('4')} icon={ <WarningIcon />} />
            <Tab value="5" label="Vencen Hoy" {...selectTab('5')} icon={<AlarmIcon />}  />
            <Tab value="6" label="Vencen en 8 dias" {...selectTab('6')} icon={<NextWeekIcon />}  />
            <Tab value="7" label="Ord Propias" {...selectTab('7')} icon={<MyLocationIcon />}  />
            <Tab value="8" label="Ord Terceros" {...selectTab('8')} icon={<DevicesOtherIcon />}  />
          </Tabs>
          </div>
            <TabPanel value={value} index="1">  
              <OrdenesActivas />
            </TabPanel>
            <TabPanel value={value} index="2">
              <OrdenesAprobadas />
            </TabPanel>
            <TabPanel value={value} index="3">
              <OrdenesPorAprobar />
            </TabPanel>
            <TabPanel value={value} index="4">
              <OrdenesVencidas />
            </TabPanel>
            <TabPanel value={value} index="5">
              <OrdenesVencenHoy />
            </TabPanel>
            <TabPanel value={value} index="6">
              <OrdenesVencen8Dias />
            </TabPanel>
            <TabPanel value={value} index="7">
              <OrdenesPropias />
            </TabPanel>       
            <TabPanel value={value} index="8">
              <OrdenesTerceros />
            </TabPanel>
          </div>
    );
}
  
export default Management;
  


