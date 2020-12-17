import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography  } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import clientesServices from "../../../services/Interlocutores/Clientes";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import especialidadesServices from "../../../services/Interlocutores/Especialidades";

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
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
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

function Clientes() {
  const styles = useStyles();
  const [listarClientes, setListarClientes] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEspecialidades, setListarEspecialidades] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [clientesSeleccionado, setClientesSeleccionado] = useState({
    id_int: "",
    codigo_tipo_int: 2,
    nit_int: "",
    estado_int: "",
    primer_nombre_int: "", 
    segundo_nombre_int: "",
    primer_apellido_int: "",
    segundo_apellido_int: "",
    razonsocial_int: "",
    ciudad_int: "",
    direccion_int: "",
    telefono_int: "",
    email_int: "",
    empresa_int: "",
    fecha_creacion_int: fechaHoy,
    fecha_modificacion_int: fechaHoy, 
    especialidad_int: ""
  })

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data);
      //console.log(res.data)
    }
    fetchDataClientes();
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
    async function fetchDataCiudades() {
    const res = await ciudadesServices.listCiudades();
    setListarCiudades(res.data) 
    //console.log(res.data);
  }
  fetchDataCiudades();
  }, [])
  
  useEffect (() => {
    async function fetchDataEspecialidades() {
    const res = await especialidadesServices.listEspecialidades();
    setListarEspecialidades(res.data) 
    //console.log(res.data);
  }
  fetchDataEspecialidades();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setClientesSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarCliente=(cliente, caso)=>{
    setClientesSeleccionado(cliente);
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

  const grabarCliente = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!clientesSeleccionado.codigo_tipo_int) {
      errors.codigo_tipo_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.nit_int) {
      errors.nit_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.estado_int) {
      errors.estado_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.razonsocial_int) {
      errors.razonsocial_int = true;
      formOk = false;
    }
    
    if (!clientesSeleccionado.ciudad_int) {
      errors.ciudad_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.direccion_int) {
      errors.direccion_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.telefono_int) {
      errors.telefono_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.email_int) {
      errors.email_int = true;
      formOk = false;
    }
    
    if (!clientesSeleccionado.empresa_int) {
      errors.empresa_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.fecha_creacion_int) {
      errors.fecha_creacion_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.fecha_modificacion_int) {
      errors.fecha_modificacion_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.especialidad_int) {
      errors.especialidad_int = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(clientesSeleccionado);
      const res = await clientesServices.save(clientesSeleccionado);

      if (res.success) {
        alert("Cliente Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete clientesSeleccionado.codigo_tipo_int;
        delete clientesSeleccionado.nit_int;
        delete clientesSeleccionado.estado_int;
        delete clientesSeleccionado.razonsocial_int;
        delete clientesSeleccionado.ciudad_int;
        delete clientesSeleccionado.direccion_int;
        delete clientesSeleccionado.telefono_int;
        delete clientesSeleccionado.email_int;
        delete clientesSeleccionado.empresa_int;
        delete clientesSeleccionado.fecha_creacion_int;
        delete clientesSeleccionado.fecha_modificacion_int; 
        delete clientesSeleccionado.especialidad_int;
      } else
      {
        alert("Error Creando el Cliente");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Cliente");
      console.log(clientesSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarCliente = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!clientesSeleccionado.codigo_tipo_int) {
      errors.codigo_tipo_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.nit_int) {
      errors.nit_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.estado_int) {
      errors.estado_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.razonsocial_int) {
      errors.razonsocial_int = true;
      formOk = false;
    }
    
    if (!clientesSeleccionado.ciudad_int) {
      errors.ciudad_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.direccion_int) {
      errors.direccion_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.telefono_int) {
      errors.telefono_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.email_int) {
      errors.email_int = true;
      formOk = false;
    }
    
    if (!clientesSeleccionado.empresa_int) {
      errors.empresa_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.fecha_creacion_int) {
      errors.fecha_creacion_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.fecha_modificacion_int) {
      errors.fecha_modificacion_int = true;
      formOk = false;
    }

    if (!clientesSeleccionado.especialidad_int) {
      errors.especialidad_int = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await clientesServices.update(clientesSeleccionado);

    if (res.success) {
        alert("Cliente actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete clientesSeleccionado.codigo_tipo_int;
        delete clientesSeleccionado.nit_int;
        delete clientesSeleccionado.estado_int;
        delete clientesSeleccionado.razonsocial_int;
        delete clientesSeleccionado.ciudad_int;
        delete clientesSeleccionado.direccion_int;
        delete clientesSeleccionado.telefono_int;
        delete clientesSeleccionado.email_int;
        delete clientesSeleccionado.empresa_int;
        delete clientesSeleccionado.fecha_creacion_int;
        delete clientesSeleccionado.fecha_modificacion_int; 
        delete clientesSeleccionado.especialidad_int;
    } else
    {
        alert("Error Actualizando el Cliente");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Cliente");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarCliente= async()=>{
   
    const res = await clientesServices.delete(clientesSeleccionado.id_int);

    if (res.success) {
        alert("Cliente Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando el Cliente");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
  {
    field: 'id_int',
    title: 'Id'
  },
  {
    field: 'nit_int',
    title: 'Nit'
  },
  {
    field: 'nombre_est',
    title: 'Estado'
  },
  {
    field: 'razonsocial_int',
    title: 'Razón Social',
    cellStyle : { minWidth: 200}
  },
  {
    field: 'nombre_ciu',
    title: 'Ciudad'
  },
  {
    field: 'direccion_int',
    title: 'Dirección',
    cellStyle : { minWidth: 150}
  },
  {
    field: 'telefono_int',
    title: 'Teléfono'
  },
  {
    field: 'email_int',
    title: 'Email',
    width: '400'
  },
  {
    field: 'fecha_creacion_int',
    title: 'Fecha de Creación',
    type:  "date",
    cellStyle : { minWidth: 100}
  },
  {
    field: 'fecha_modificacion_int',
    title: 'Fecha de Modificación',
    type:  "date",
    cellStyle : { minWidth: 100}
  },
  {
    field: 'nombre_esp',
    title: 'Especialidad'
  }
  ]
  
  const clienteInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Cliente</h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_tipo_int" label="Tipo Interlocutor" defaultValue="2" disabled="true"
         fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="nit_int" label="Nit del Interlocutor" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}> <TextField  name="razonsocial_int" label="Razon Social" fullWidth  onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}> <TextField  name="direccion_int" label="Direccion" onChange={handleChange} fullWidth /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
              <Select
                labelId="selecCiudad"
                name="ciudad_int"
                id="idselectCiudad"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_ciu }>{itemselect.nombre_ciu}</MenuItem>
                )
                })
              }
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> 
        <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado"  >Estado</InputLabel>
          <Select
            labelId="selectEstado"
            name="estado_int"
            id="idselectEstado"
            fullWidth 
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
        <Grid item xs={12} md={6}> <TextField  name="telefono_int" label="Telefono" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="email_int" label="Email" fullWidth onChange={handleChange} /> </Grid>
      </Grid>     
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
              <Select
                labelId="selecEmpresa"
                name="empresa_int"
                id="idselectEmpresa"
                fullWidth 
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
          <TextField type="date" InputLabelProps={{ shrink: true}} name="fecha_creacion_int" label="Fecha Creación"
           fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <TextField type="date" InputLabelProps={{ shrink: true}} name="fecha_modificacion_int" label="Fecha Modificación"
           fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
              <Select
                labelId="selecEspecialidad"
                name="especialidad_int"
                id="idselectEspecialidad"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEspecialidades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_esp }>{itemselect.nombre_esp}</MenuItem>
                )
                })
              }
              </Select>
          </FormControl>
        </Grid>
      </Grid>      
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarCliente() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const clienteEditar=(
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Clientes</h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_tipo_int" label="Tipo Interlocutor" fullWidth disabled="true"
          onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.codigo_tipo_int} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="nit_int" label="Nit del Interlocutor" fullWidth 
          onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.nit_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}> <TextField  name="razonsocial_int" label="Razon Social" fullWidth 
          onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.razonsocial_int} />
        </Grid>
      </Grid>
      <Grid container spacing={2} > 
         <Grid item xs={12} md={12}> <TextField  name="direccion_int" label="Direccion" fullWidth 
          onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.direccion_int} /> 
        </Grid>
       </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
              <Select
                labelId="selecCiudad"
                name="ciudad_int"
                id="idselectCiudad"
                fullWidth 
                onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.ciudad_int}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_ciu }>{itemselect.nombre_ciu}</MenuItem>
                )
                })
              }
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"  >Estado</InputLabel>
              <Select
                labelId="selectEstado"
                name="estado_int"
                id="idselectEstado"
                fullWidth 
                onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.estado_int}
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
        <Grid item xs={12} md={6}> <TextField  name="telefono_int" label="Telefono" fullWidth 
          onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.telefono_int} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="email_int" label="Email" fullWidth 
          onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.email_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
              <Select
                labelId="selecEmpresa"
                name="empresa_int"
                id="idselectEmpresa"
                fullWidth 
                onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.empresa_int}
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
        <Grid item xs={12} md={6}> <TextField  name="fecha_creacion_int" label="Fecha Creacion" fullWidth 
          onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.fecha_creacion_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="fecha_modificacion_int" label="Fecha Modificación" fullWidth 
          onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.fecha_modificacion_int} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
              <Select
                labelId="selecEspecialidad"
                name="especialidad_int"
                id="idselectEspecialidad"
                fullWidth 
                onChange={handleChange} value={clientesSeleccionado&&clientesSeleccionado.especialidad_int}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEspecialidades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_esp }>{itemselect.nombre_esp}</MenuItem>
                )
                })
              }
              </Select>
          </FormControl>
        </Grid>
      </Grid>           
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarCliente()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const clienteEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Cliente <b>{clientesSeleccionado && clientesSeleccionado.razonsocial_int}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarCliente() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregrar Cliente</Button>
      <MaterialTable
        columns={columnas}
        data={listarClientes}
        title="Maestra de Clientes"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Cliente',
            onClick  : (event, rowData) => seleccionarCliente(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar Cliente',
            onClick  : (event, rowData) =>   seleccionarCliente(rowData, "Eliminar")
          } 
        ]}
        options={{
         actionsColumnIndex: 11
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />
      {}

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {clienteInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {clienteEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {clienteEliminar}
      </Modal>
    </div>
  );
}

export default Clientes;

