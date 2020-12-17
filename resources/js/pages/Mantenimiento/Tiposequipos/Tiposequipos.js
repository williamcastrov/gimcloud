import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import tiposequiposServices from "../../../services/Mantenimiento/TiposEquipos";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";

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

function Tiposequipos() {
  const styles = useStyles();
  const [listTiposequipos, setListTiposequipos] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [tiposequiposSeleccionado, setTiposequiposSeleccionado] = useState({
    id_tequ: "",
    codigo_tequ: "",
    nombre_tequ: "",
    empresa_tequ: "",
    estado_tequ: ""
  })

  useEffect(() => {
    async function fetchDataTiposequipos() {
      const res = await tiposequiposServices.listTiposequipos();
      setListTiposequipos(res.data);
    }
    fetchDataTiposequipos();
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

  const handleChange = e => {
    const {name, value} = e.target;

    setTiposequiposSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTipoequipo=(tipoequipo, caso)=>{
    console.log(tipoequipo)
    setTiposequiposSeleccionado(tipoequipo);
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

  const grabarTipoequipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposequiposSeleccionado.codigo_tequ) {
      errors.codigo_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.nombre_tequ) {
      errors.nombre_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.empresa_tequ) {
      errors.empresa_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.estado_tequ) {
      errors.estado_tequ = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tiposequiposSeleccionado);
      const res = await tiposequiposServices.save(tiposequiposSeleccionado);

      if (res.success) {
        alert("Tipo de Equipo Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposequiposSeleccionado.codigo_tequ;
        delete tiposequiposSeleccionado.nombre_tequ;
        delete tiposequiposSeleccionado.empresa_tequ;
        delete tiposequiposSeleccionado.estado_tequ;
      } else
      {
        alert("Error Creando el Tipo de Equipo");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Tipo de Equipo");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarTipoequipo = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposequiposSeleccionado.codigo_tequ) {
      errors.codigo_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.nombre_tequ) {
      errors.nombre_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.empresa_tequ) {
      errors.empresa_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.estado_tequ) {
      errors.estado_tequ = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await tiposequiposServices.update(tiposequiposSeleccionado);

    if (res.success) {
        alert("Tipo Equipo actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposequiposSeleccionado.codigo_tequ;
        delete tiposequiposSeleccionado.nombre_tequ;
        delete tiposequiposSeleccionado.empresa_tequ;
        delete tiposequiposSeleccionado.estado_tequ;
    } else
    {
        alert("Error Actualizando el Tipo de Equipo");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Tipo de Equipo");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarTipoequipo = async()=>{
   
    const res = await tiposequiposServices.delete(tiposequiposSeleccionado.id_tequ);

    if (res.success) {
        alert("Tipo Equipo Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando el Tipo de Equipo");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tequ'
    },
    {
      title: 'Código',
      field: 'codigo_tequ'
    },
    {
      title: 'Descripcion',
      field: 'nombre_tequ'
    },
    {
      title: 'Código',
      field: 'empresa_tequ'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_tequ'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const tipoequipoInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Marca</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_tequ" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_tequ" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tequ"
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
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tequ"
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
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarTipoequipo() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tipoequipoEditar = (
    <div className={styles.modal}>
      <br />
      <TextField className={styles.inputMaterial} label="Código" name="codigo_tequ" onChange={handleChange} value={tiposequiposSeleccionado&&tiposequiposSeleccionado.codigo_tequ}/>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_tequ" onChange={handleChange} value={tiposequiposSeleccionado&&tiposequiposSeleccionado.nombre_tequ}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tequ"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tiposequiposSeleccionado&&tiposequiposSeleccionado.empresa_tequ}
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
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tequ"
          id="idselectEstado"
          onChange={handleChange}
          value={tiposequiposSeleccionado&&tiposequiposSeleccionado.estado_tequ}
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
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarTipoequipo()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tipoequipoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Equipo <b>{tiposequiposSeleccionado && tiposequiposSeleccionado.nombre_tequ}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarTipoequipo() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
     <br />
     <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Tipo de Equipo</Button>
     <MaterialTable
       columns={columnas}
       data={listTiposequipos}
       title="Maestra de Tipos de Equipos"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Tipo Equipo',
           onClick  : (event, rowData) => seleccionarTipoequipo(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Tipo Equipo',
          onClick  : (event, rowData) =>   seleccionarTipoequipo(rowData, "Eliminar")
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
      {tipoequipoInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {tipoequipoEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {tipoequipoEliminar}
    </Modal>
    </div>
  );
}

export default Tiposequipos;