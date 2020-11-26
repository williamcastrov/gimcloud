import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

// Componentes de Conexion con el Backend
import departamentosServices from "../../../services/Departamentos";
import regionesServices from "../../../services/Regiones";

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

function Departamentos() {
  const styles = useStyles();
  const [listDepartamentos, setListDepartamentos] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarRegiones, setListarRegiones] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState({
    id_dep: "",
    codigo_dep: "",
    nombre_dep: "",
    region_dep: ""
  })

  useEffect (() => {
      async function fetchDataRegion() {
      const res = await regionesServices.listRegiones();
      setListarRegiones(res.data) 
      console.log(res.data);
    }
    fetchDataRegion();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setDepartamentoSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarDepartamento=(departamento, caso)=>{
    setDepartamentoSeleccionado(departamento);
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
    async function fetchDataDepartamentos() {
      const res = await departamentosServices.listDepartamentos();
      setListDepartamentos(res.data);
    }
    fetchDataDepartamentos();
  }, [])

  const grabarDepartamentos = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!departamentoSeleccionado.codigo_dep) {
      errors.codigo_dep = true;
      formOk = false;
    }

    if (!departamentoSeleccionado.nombre_dep) {
      errors.nombre_dep = true;
      formOk = false;
    }

    if (!departamentoSeleccionado.region_dep) {
      errors.region_dep = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      const res = await departamentosServices.save(departamentoSeleccionado);

      if (res.success) {
        alert("Departamento Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete departamentoSeleccionado.codigo_dep;
        delete departamentoSeleccionado.nombre_dep;
        delete departamentoSeleccionado.region_dep;
      } else
      {
        alert("Error Creando el Departamento");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Departamento");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarDepartamento = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!departamentoSeleccionado.codigo_dep) {
      errors.codigo_dep = true;
      formOk = false;
    }

    if (!departamentoSeleccionado.nombre_dep) {
      errors.nombre_dep = true;
      formOk = false;
    }

    if (!departamentoSeleccionado.region_dep) {
      errors.region_dep = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await departamentosServices.update(departamentoSeleccionado);

    if (res.success) {
        alert("Departamento actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete departamentoSeleccionado.codigo_dep;
        delete departamentoSeleccionado.nombre_de;
        delete departamentoSeleccionado.region_dep;
    } else
    {
        alert("Error Actualizando el Departamento");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando del Departamento");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarDepartamento = async()=>{
   
    const res = await departamentosServices.delete(departamentoSeleccionado.id_dep);

    if (res.success) {
        alert("Departamento Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando el Departamento");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_dep',
      type: 'numeric'
    },
    {
      title: 'Codigo',
      field: 'codigo_dep'
    },
    {
      title: 'Departamento',
      field: 'nombre_dep'
    },
    {
      title: 'Codigo Región',
      field: 'region_dep'
    },
    {
      title: 'Nombre Región',
      field: 'region.nombre_reg'
    }
  ]

  const departamentoInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Departamento</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_dep" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Departamento" name="nombre_dep" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectRegion">Región</InputLabel>
        <Select
          labelId="selectRegion"
          name="region_dep"
          id="idselectRegion"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarRegiones.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_reg }>{itemselect.nombre_reg}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarDepartamentos() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const departamentoEditar=(
    <div className={styles.modal}>
      <br />
      <TextField className={styles.inputMaterial} label="Código" name="codigo_dep" onChange={handleChange} value={departamentoSeleccionado&&departamentoSeleccionado.codigo_dep}/>
      <br />
      <TextField className={styles.inputMaterial} label="Departamento" name="nombre_dep" onChange={handleChange} value={departamentoSeleccionado&&departamentoSeleccionado.nombre_dep}/>
      <br />
      <TextField className={styles.inputMaterial} label="Región" name="region_dep" onChange={handleChange} value={departamentoSeleccionado&&departamentoSeleccionado.region_dep}/>          
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarDepartamento()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const departamentoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Departamento <b>{departamentoSeleccionado && departamentoSeleccionado.nombre_dep}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarDepartamento() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
    <Button onClick={()=> abrirCerrarModalInsertar() } >Insertar Departamento</Button>
     <MaterialTable
       columns={columnas}
       data={listDepartamentos}
       title="Maestra de Departamento"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Departamento',
           onClick  : (event, rowData) => seleccionarDepartamento(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Departamento',
          onClick  : (event, rowData) => seleccionarDepartamento(rowData, "Eliminar")
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
      {departamentoInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {departamentoEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {departamentoEliminar}
    </Modal>
    </div>
  );
}

export default Departamentos;