import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import ciudadesServices from "../../../services/Parameters/Ciudades";
import departamentosServices from "../../../services/Parameters/Departamentos";


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
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
    minWidth: 315,
  }
}));

function Ciudades() {
  const styles = useStyles();
  const [listCiudades, setListCiudades] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarDepartamentos, setListarDepartamentos] = useState([]);
  const [ciudadSeleccionado, setCiudadSeleccionado] = useState({
    id_ciu: "",
    codigo_ciu: "",
    nombre_ciu: "",
    departamento_ciu: ""
  })

  useEffect (() => {
      async function fetchDataDepartamentos() {
      const res = await departamentosServices.listDepartamentos();
      setListarDepartamentos(res.data) 
      console.log(res.data);
    }
    fetchDataDepartamentos();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setCiudadSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarCiudad=(ciudad, caso)=>{
    setCiudadSeleccionado(ciudad);
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

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListCiudades(res.data);
    }
    fetchDataCiudades();
  }, [])

  const grabarCiudad = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!ciudadSeleccionado.codigo_ciu) {
      errors.codigo_ciu = true;
      formOk = false;
    }

    if (!ciudadSeleccionado.nombre_ciu) {
      errors.nombre_ciu = true;
      formOk = false;
    }

    if (!ciudadSeleccionado.departamento_ciu) {
      errors.departamento_ciu = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(ciudadSeleccionado);
      const res = await ciudadesServices.save(ciudadSeleccionado);

      if (res.success) {
        alert("Ciudad Creada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete ciudadSeleccionado.codigo_ciu;
        delete ciudadSeleccionado.nombre_ciu;
        delete ciudadSeleccionado.departamento_ciu;
      } else
      {
        alert("Error Creando la Ciudad");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando la Ciudad");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarCiudad = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!ciudadSeleccionado.codigo_ciu) {
      errors.codigo_ciu = true;
      formOk = false;
    }

    if (!ciudadSeleccionado.nombre_ciu) {
      errors.nombre_ciu = true;
      formOk = false;
    }

    if (!ciudadSeleccionado.departamento_ciu) {
      errors.departamento_ciu = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await ciudadesServices.update(ciudadSeleccionado);

    if (res.success) {
        alert("Ciudad actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete ciudadSeleccionado.codigo_ciu;
        delete ciudadSeleccionado.nombre_ciu;
        delete ciudadSeleccionado.departamento_ciu;
    } else
    {
        alert("Error Actualizando la Ciudad");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando la Ciudad");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarCiudad = async()=>{
   
    const res = await ciudadesServices.delete(ciudadSeleccionado.id_ciu);

    if (res.success) {
        alert("Ciudad Borrada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando la Ciudad");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_ciu',
      type: 'numeric'
    },
    {
      title: 'Codigo',
      field: 'codigo_ciu'
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu'
    },
    {
      title: 'Codigo Departamento',
      field: 'departamento_ciu'
    },
    {
      title: 'Nombre Departamento',
      field: 'departamento.nombre_dep'
    }
  ]

  const ciudadInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Ciudad</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_ciu" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Ciudad" name="nombre_ciu" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectDepartamento">Departamento</InputLabel>
        <Select
          labelId="selectDepartamento"
          name="departamento_ciu"
          id="idselectDepartamento"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarDepartamentos.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_dep }>{itemselect.nombre_dep}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarCiudad() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const ciudadEditar=(
    <div className={styles.modal}>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Código" name="codigo_ciu" fullWidth
          onChange={handleChange} value={ciudadSeleccionado&&ciudadSeleccionado.codigo_ciu}/>
        </Grid>
      </Grid>
      
      <Grid container spacing={2} >   
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Ciudad" name="nombre_ciu" fullWidth
          onChange={handleChange} value={ciudadSeleccionado&&ciudadSeleccionado.nombre_ciu}/>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl} value={ciudadSeleccionado&&ciudadSeleccionado.departamento_ciu} >
            <InputLabel id="idselectDepartamento">Departamento</InputLabel>
            <Select
              labelId="selectDepartamento"
              name="departamento_ciu"
              id="idselectDepartamento"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarDepartamentos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_dep }>{itemselect.nombre_dep}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid> 
      </Grid>
      
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarCiudad()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const ciudadEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Ciudad <b>{ciudadSeleccionado && ciudadSeleccionado.nombre_ciu}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarCiudad() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Insertar Ciudad</Button>
    <MaterialTable
       columns={columnas}
       data={listCiudades}
       title="Maestra de Ciudades"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Ciudad',
           onClick  : (event, rowData) => seleccionarCiudad(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Ciudad',
          onClick  : (event, rowData) =>   seleccionarCiudad(rowData, "Eliminar")
         } 
       ]}
       options={{
         actionsColumnIndex: -1
       }}
       localization={{
         header: {
           actions: "Acciones"
         }
       }}
    />{}
    <Modal
      open={modalInsertar}
      onClose={abrirCerrarModalInsertar}
    >
      {ciudadInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {ciudadEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {ciudadEliminar}
    </Modal>
    </div>
  );
}

export default Ciudades;