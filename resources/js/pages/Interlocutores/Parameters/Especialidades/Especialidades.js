import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import especialidadesServices from "../../../../services/Interlocutores/Especialidades";
import estadosServices from "../../../../services/Parameters/Estados";
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

function Especialidades() {
  const styles = useStyles();
  const [listEspecialidades, setListEspecialidades] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [especialidadesSeleccionado, setEspecialidadesSeleccionado] = useState({
    id_esp: "",
    codigo_esp: "",
    nombre_esp: "",
    estado_esp: ""
  })

  useEffect (() => {
      async function fetchDataEspecialidad() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data) 
      //console.log(res.data);
    }
    fetchDataEspecialidad();
  }, [])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstados();
    setListarEstados(res.data) 
    console.log(res.data);
  }
  fetchDataEstados();
  }, [])


  const handleChange = e => {
    const {name, value} = e.target;

    setEspecialidadesSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEspecialidad=(especialidad, caso)=>{
    setEspecialidadesSeleccionado(especialidad);
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
    async function fetchDataEspecialidad() {
      const res = await especialidadesServices.listEspecialidades();
      setListEspecialidades(res.data);
    }
    fetchDataEspecialidad();
  }, [])

  const grabarEspecialidad = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!especialidadesSeleccionado.codigo_esp) {
      errors.codigo_ciu = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.nombre_esp) {
      errors.nombre_ciu = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.empresa_esp) {
      errors.empresa_esp = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.estado_esp) {
      errors.estado_esp = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(especialidadesSeleccionado);
      const res = await especialidadesServices.save(especialidadesSeleccionado);

      if (res.success) {
        alert("Especialidad del Interlocutor Creada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete especialidadesSeleccionado.codigo_esp;
        delete especialidadesSeleccionado.nombre_esp;
        delete especialidadesSeleccionado.empresa_esp;
        delete especialidadesSeleccionado.estado_esp;
      } else
      {
        alert("Error Creando la Especialidad del Interlocutor");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Especialidad del Interlocutor");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarEspecialidad = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!especialidadesSeleccionado.codigo_esp) {
      errors.codigo_ciu = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.nombre_esp) {
      errors.nombre_ciu = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.empresa_esp) {
      errors.empresa_esp = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.estado_esp) {
      errors.estado_esp = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await especialidadesServices.update(especialidadesSeleccionado);

    if (res.success) {
        alert("Especialidades del Interlocutor actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete especialidadesSeleccionado.codigo_esp;
        delete especialidadesSeleccionado.nombre_esp;
        delete especialidadesSeleccionado.empresa_esp;
        delete especialidadesSeleccionado.estado_esp;
    } else
    {
        alert("Error Actualizando la Especialidad del Interlocutor");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando la Especialidad del Interlocutor");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarEspecialidad = async()=>{
   
    const res = await especialidadesServices.delete(especialidadesSeleccionado.id_esp);

    if (res.success) {
        alert("Especialidad del Interlocutor Borrada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando la Especiliada del Interlocutor");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_esp',
      type: 'numeric'
    },
    {
      title: 'Codigo',
      field: 'codigo_esp'
    },
    {
      title: 'Descripción',
      field: 'nombre_esp'
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_esp'
    },
    {
      title: 'Nombre Empresa',
      field: 'empresa.nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_esp'
    }
  ]

  const especialidadesInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nueva Especialidad</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_esp" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_esp" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_esp"
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
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_esp"
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
        <Button color="primary" onClick = { () => grabarEspecialidad() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const especialidadesEditar=(
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Especialidades</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_esp" onChange={handleChange} value={especialidadesSeleccionado&&especialidadesSeleccionado.codigo_esp}/>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_esp" onChange={handleChange} value={especialidadesSeleccionado&&especialidadesSeleccionado.nombre_esp}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_esp"
          id="idselectEstado"
          onChange={handleChange}
          value={especialidadesSeleccionado&&especialidadesSeleccionado.estado_esp}
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
      <br />
      <FormControl className={styles.formControl} >
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_esp"
          id="idselectEmpresa"
          onChange={handleChange}
          value={especialidadesSeleccionado&&especialidadesSeleccionado.empresa_esp}
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
        <Button color="primary"  onClick={()=>actualizarEspecialidad()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const especialidadesEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Especialidad del Interlocutor <b>{especialidadesSeleccionado && especialidadesSeleccionado.nombre_esp}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarEspecialidad() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Especialidad del Interlocutor</Button>
      <MaterialTable
        columns={columnas}
        data={listEspecialidades}
        title="Maestra de Especialidades"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Especialidad',
            onClick  : (event, rowData) => seleccionarEspecialidad(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar Especialidad',
            onClick  : (event, rowData) =>   seleccionarEspecialidad(rowData, "Eliminar")
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
      {especialidadesInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {especialidadesEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {especialidadesEliminar}
    </Modal>
    </div>
  );
}

export default Especialidades;