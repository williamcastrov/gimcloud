import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import tipointerlocutoresServices from "../../../../services/Interlocutores/TipoInterlocutores";
import empresasServices from "../../../../services/Empresa";

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

function TipoInterlocutores() {
  const styles = useStyles();
  const [listTipoInterlocutores, setListTipoInterlocutores] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [tipointerlocutorSeleccionado, setTipoInterlocutorSeleccionado] = useState({
    id_tint: "",
    codigo_tint: "",
    nombre_tint: "",
    empresa_tint: ""
  })

  useEffect(() => {
    async function fetchDataTipoInterlocutores() {
      const res = await tipointerlocutoresServices.listTipoInterlocutor();
      setListTipoInterlocutores(res.data);
    }
    fetchDataTipoInterlocutores();
  }, [])

  useEffect (() => {
      async function fetchDataEmpresa() {
      const res = await empresasServices.listEmpresas();
      console.log(res.data);
      setListarEmpresas(res.data);
    }
    fetchDataEmpresa();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setTipoInterlocutorSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTipoInterlocutores=(tipointerlocutor, caso)=>{
    setTipoInterlocutorSeleccionado(tipointerlocutor);
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

  const grabarTipoInterlocutores = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipointerlocutorSeleccionado.codigo_tint) {
      errors.codigo_tint = true;
      formOk = false;
    }

    if (!tipointerlocutorSeleccionado.nombre_tint) {
      errors.nombre_tint = true;
      formOk = false;
    }

    if (!tipointerlocutorSeleccionado.empresa_tint) {
      errors.empresa_tint = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tipointerlocutorSeleccionado);
      const res = await tipointerlocutoresServices.save(tipointerlocutorSeleccionado);

      if (res.success) {
        alert("Tipo Interlocutor Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tipointerlocutorSeleccionado.codigo_tint;
        delete tipointerlocutorSeleccionado.nombre_tint;
        delete tipointerlocutorSeleccionado.empresa_tint;
      } else
      {
        alert("Error Creando el Tipo de Interlocutor");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Tipo de Interlocutor");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarTipoInterlocutor = async () => {
  console.log("NTRE")
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipointerlocutorSeleccionado.codigo_tint) {
      errors.codigo_tint = true;
      formOk = false;
    }

    if (!tipointerlocutorSeleccionado.nombre_tint) {
      errors.nombre_tint = true;
      formOk = false;
    }

    if (!tipointerlocutorSeleccionado.empresa_tint) {
      errors.empresa_tint = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await tipointerlocutoresServices.update(tipointerlocutorSeleccionado);

    if (res.success) {
        alert("Tipo de Interlocutor actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tipointerlocutorSeleccionado.codigo_tint;
        delete tipointerlocutorSeleccionado.nombre_tint;
        delete tipointerlocutorSeleccionado.empresa_tint;
    } else
    {
        alert("Error Actualizando el Tipo de Interlocutor");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Tipo de Interlocutor");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarTipoInterlocutor = async()=>{
   
    const res = await tipointerlocutoresServices.delete(tipointerlocutorSeleccionado.id_tint);

    if (res.success) {
        alert("Tipo de Interlocutor Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando el Tipo de Interlocutor");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tint',
      type: 'numeric'
    },
    {
      title: 'Codigo',
      field: 'codigo_tint'
    },
    {
      title: 'Descripción',
      field: 'nombre_tint'
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_tint'
    },
    {
      title: 'Nombre Empresa',
      field: 'empresa.nombre_emp'
    }
  ]

  const tipointerlocutorInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Tipo Interlocutor</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_tint" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_tint" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tint"
          id="idselectEmpresa"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarTipoInterlocutores() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tipointerlocutorEditar=(
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Tipo Interlocutor</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_tint" onChange={handleChange} value={tipointerlocutorSeleccionado&&tipointerlocutorSeleccionado.codigo_tint}/>
      <br />
      <TextField className={styles.inputMaterial} label="Ciudad" name="nombre_tint" onChange={handleChange} value={tipointerlocutorSeleccionado&&tipointerlocutorSeleccionado.nombre_tint}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tint"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tipointerlocutorSeleccionado&&tipointerlocutorSeleccionado.empresa_tint}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarTipoInterlocutor()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tipointerlocutorEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Interlocutor <b>{tipointerlocutorSeleccionado && tipointerlocutorSeleccionado.nombre_tint}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarTipoInterlocutor() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Tipo Interlocutor</Button>
      <MaterialTable
        columns={columnas}
        data={listTipoInterlocutores}
        title="Maestra de Tipos de Interlocutores"
        actions={[
        {
           icon     : 'edit',
           tooltip  : 'Editar Tipos de Interlocutores',
           onClick  : (event, rowData) => seleccionarTipoInterlocutores(rowData, "Editar")
        },
        {
          icon     : 'delete',
          tooltip  : 'Borrar Tipos de Interlocutores',
          onClick  : (event, rowData) =>   seleccionarTipoInterlocutores(rowData, "Eliminar")
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
      {tipointerlocutorInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {tipointerlocutorEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {tipointerlocutorEliminar}
    </Modal>
    </div>
  );
}

export default TipoInterlocutores;