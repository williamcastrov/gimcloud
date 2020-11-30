import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import paisServices from "../../../services/Parameters/Paises";

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
  }
}));

function Paises() {
  const styles = useStyles();
  const [listPaises, setListPaises] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [paisSeleccionado, setPaisSeleccionado] = useState({
    id_pai: "",
    codigo_pai: "",
    nombre_pai: ""
  })

  const handleChange = e => {
    const {name, value} = e.target;

    setPaisSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarPais=(pais, caso)=>{
    setPaisSeleccionado(pais);
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
    async function fetchDataPais() {
      const res = await paisServices.listPaises();
      setListPaises(res.data);
    }
    fetchDataPais();
  }, [])

  const grabarPais = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!paisSeleccionado.codigo_pai) {
      errors.codigo_pai = true;
      formOk = false;
    }

    if (!paisSeleccionado.nombre_pai) {
      errors.nombre_pai = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      const res = await paisServices.save(paisSeleccionado);

      if (res.success) {
        alert("Pais Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete paisSeleccionado.codigo_pai;
        delete paisSeleccionado.nombre_pai;
      } else
      {
        alert("Error Creando el Pais");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Pais");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarPais = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!paisSeleccionado.codigo_pai) {
      errors.codigo_pai = true;
      formOk = false;
    }

    if (!paisSeleccionado.nombre_pai) {
      errors.nombre_pai = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await paisServices.update(paisSeleccionado);
    console.log(paisSeleccionado);

    if (res.success) {
        alert("Pais Actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete paisSeleccionado.codigo_pai;
        delete paisSeleccionado.nombre_pai;
    } else
    {
        alert("Error Actualizando el Pais");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Pais");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarPais = async()=>{
   
    const res = await paisServices.delete(paisSeleccionado.id_pai);

    if (res.success) {
        alert("Pais Borrada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error brorrando el Pais");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }

  const columnas = [
    {
      title: 'Id',
      field: 'id_pai',
      type: 'number'
    },
    {
      title: 'Codigo',
      field: 'codigo_pai'
    },
    {
      title: 'País',
      field: 'nombre_pai'
    }
  ]

  const paisInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo País</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_pai" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="País" name="nombre_pai" onChange={handleChange} />          
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarPais() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const paisEditar=(
    <div className={styles.modal}>
      <br />
      <TextField className={styles.inputMaterial} label="Código" name="codigo_pai" onChange={handleChange} value={paisSeleccionado&&paisSeleccionado.codigo_pai}/>
      <br />
      <TextField className={styles.inputMaterial} label="País" name="nombre_pai" onChange={handleChange} value={paisSeleccionado&&paisSeleccionado.nombre_pai}/>          
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarPais()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const paisEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el País <b>{paisSeleccionado && paisSeleccionado.nombre_pai}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarPais() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
    <Button onClick={()=> abrirCerrarModalInsertar() } >Insertar Pais</Button>
     <MaterialTable
       columns={columnas}
       data={listPaises}
       title="Maestra de Paises"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Pais',
           onClick  : (event, rowData) => seleccionarPais(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Pais',
          onClick  : (event, rowData) => seleccionarPais(rowData, "Eliminar")
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
      {paisInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {paisEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {paisEliminar}
    </Modal>
    </div>
  );
}

export default Paises;

//onClick={peticionDelete}