import React, { useState, useEffect } from "react";
import {Modal, TextField, Button as Botton, Select, MenuItem, FormControl, InputLabel, Grid } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListAltIcon from '@material-ui/icons/ListAlt';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// Floating Button
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

// Componentes de Conexion con el Backend
import garantiasServices from "../../../services/Mantenimiento/Garantias";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import equiposServices from "../../../services/Mantenimiento/Equipos";

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    },
    formControl: {
      margin: theme.spacing(0),
      minWidth: 250,
    }
}));
  

export default function DatosEquipos(props) {
    const {equipoID} = props;
    const styles = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const fecha = new Date();
    const ano = fecha.getFullYear();

    const [listGarantias, setListGarantias] = useState([]);
    const [modalInsertar, setModalInsertar ] = useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [formError, setFormError] = useState(false);
    const [listarEstados, setListarEstados] = useState([]);
    const [listarEmpresas, setListarEmpresas] = useState([]);
    const [listarEquipos, setListarEquipos] = useState([]);
    const [garantiasSeleccionado, setGarantiasSeleccionado] = useState({
        equipo_gar:       "",
        idgarantia_gar:   "",
        empresa_gar:      "",
        fechainicial_gar: "",
        fechafinal_gar:   "",
        estado_gar:       "",
        observacion_gar:  "",
    })

    const handleClick = () => {
        alert("HandleClick");
    };

    useEffect(() => {
         async function fetchDataGarantias() {
          console.log(equipoID);
         const res = await garantiasServices.listUnaGarantia(equipoID);
         setListGarantias(res.data);
         console.log(res.data)
        }
        fetchDataGarantias();
    }, [])
    
    useEffect (() => {
         async function fetchDataEmpresas() {
         const res = await empresasServices.listEmpresas();
         setListarEmpresas(res.data) 
          //console.log(res.data);
        }
        fetchDataEmpresas();
    }, [])
    
    useEffect (() => {
         async function fetchDataEstados() {
         const res = await estadosServices.listEstados();
         setListarEstados(res.data) 
        //console.log(res.data);
      }
      fetchDataEstados();
    }, [])
      
    useEffect (() => {
         async function fetchDataEquipos() {
         const res = await equiposServices.listEquipos();
         setListarEquipos(res.data) 
        //console.log(res.data);
        }
        fetchDataEquipos();
    }, [])
    
    const handleChange = e => {
        const {name, value} = e.target;
    
        setGarantiaSeleccionado( prevState => ({
          ...prevState,
          [name]: value
        }));
    }
    
    const seleccionarGarantia = (garantia, caso)=>{
        setGarantiaSeleccionado(garantia);
        (caso==="Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }
    
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }
    
    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }
    
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const grabarGarantia = async () => {
        alert("Grabar Garantia")
    }
    const garantiaInsertar=(
        <div className={styles.modal}>
          <br />
          <h3>Agregar Nueva Garantia del Equipo</h3>
     
          <Grid container spacing={2} > 
            <Grid item xs={12} md={6}>
              <TextField className={styles.inputMaterial} label="Id Equipo" name="id_gar"
               defaultValue={equipoID} disabled="true" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}> 
              <TextField className={styles.inputMaterial} label="ID Garantía" name="idgarantia_gar" fullWidth onChange={handleChange} />  
            </Grid>
          </Grid>
          <Grid container spacing={2} > 
            <Grid item xs={12} md={6}>
              <FormControl className={styles.formControl}>
                <InputLabel id="idselectEmpresa">Empresa</InputLabel>
                <Select
                  labelId="selectEmpresa"
                  name="empresa_gar"
                  id="idselectEmpresa"
                  onChange={handleChange}
                >
                  <MenuItem value=""> <em>None</em> </MenuItem>
                  {
                    listarEmpresas.map((itemselect) => {
                      return (
                      <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
                    )
                  })
                }
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={styles.formControl}>
                  <InputLabel id="idselectEstado">Estado</InputLabel>
                  <Select
                    labelId="selectEstado"
                    name="estado_gar"
                    id="idselectEstado"
                    onChange={handleChange}
                  >
                  <MenuItem value=""> <em>None</em> </MenuItem>
                  {
                    listarEstados.map((itemselect) => {
                      return (
                        <MenuItem value={itemselect.id_est }>{itemselect.nombre_est}</MenuItem>
                      )
                    })
                  }
                  </Select>
                </FormControl>
              </Grid>
          </Grid>
          <Grid container spacing={2} > 
            <Grid item xs={12} md={6}>
              <TextField className={styles.inputMaterial} label="Fecha Inicial" name="fechainicial_gar" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}> 
              <TextField className={styles.inputMaterial} label="Fecha Final" name="fechafinal_gar" fullWidth onChange={handleChange} />  
            </Grid>
          </Grid><Grid container spacing={2} > 
            <Grid item xs={12} md={6}>
              <TextField className={styles.inputMaterial} label="Observación" name="oberrvacion_gar" fullWidth onChange={handleChange} />
            </Grid>
          </Grid>
          <br /><br />
          <div align="right">    
            <Botton color="primary" onClick = { () => grabarGarantia() } >Insertar</Botton>
            <Botton color="default" onClick = { () => grabarGarantia() } >Editar</Botton>
            <Botton color="secondary" onClick = { () => grabarGarantia() } >Eliminar</Botton>
            <Botton onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Botton>
          </div>
        </div>
    )
    

    return (
        <div>
            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}
            >  
                {garantiaInsertar}
            </Modal>
            
            <Container>
                <Button
                    tooltip="Garantias"
                    rotate={true}
                    styles={{ backgroundColor: darkColors.grey, color: lightColors.white }}
                    onClick={() => setModalInsertar(true)} ><VerifiedUserIcon /></Button>
                <Button
                    tooltip="Ficha Técnica"
                    rotate={true}
                    styles={{ backgroundColor: darkColors.cyan, color: lightColors.white }}
                    onClick={() => handleClick()} ><ListAltIcon  /></Button>
                <Button
                    tooltip="Contrato"
                    rotate={true}
                    styles={{ backgroundColor: darkColors.green, color: lightColors.white }}
                    onClick={() => setModalInsertar(true)} ><SupervisorAccountIcon /></Button>
                <Button
                    tooltip="Mas Acciones!"
                    rotate={true}
                    styles={{ backgroundColor: darkColors.lightBlue, color: lightColors.white }}
                    onClick={() => alert('FAB Rocks!')} ><ZoomOutMapIcon /></Button>
            </Container>
        </div>

    );
}
