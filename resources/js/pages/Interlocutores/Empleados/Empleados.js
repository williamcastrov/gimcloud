import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography  } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import empleadosServices from "../../../services/Interlocutores/Empleados";
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

function Empleados() {
  const styles = useStyles();
  const [listarEmpleados, setListarEmpleados] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEspecialidades, setListarEspecialidades] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [empleadosSeleccionado, setEmpleadosSeleccionado] = useState({
    id_int: "",
    codigo_tipo_int: 3,
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
    async function fetchDataEmpleados() {
      const res = await empleadosServices.listEmpleados();
      setListarEmpleados(res.data);
      console.log(res.data)
    }
    fetchDataEmpleados();
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

    setEmpleadosSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEmpleado=(empleado, caso)=>{
    setEmpleadosSeleccionado(empleado);
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

  const grabarEmpleado = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!empleadosSeleccionado.codigo_tipo_int) {
      errors.codigo_tipo_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.nit_int) {
      errors.nit_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.estado_int) {
      errors.estado_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.primer_nombre_int) {
      errors.primer_nombre_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.segundo_nombre_int) {
      errors.segundo_nombre_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.primer_apellido_int) {
      errors.primer_apellido_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.segundo_apellido_int) {
      errors.segundo_apellido_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.ciudad_int) {
      errors.ciudad_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.direccion_int) {
      errors.direccion_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.telefono_int) {
      errors.telefono_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.email_int) {
      errors.email_int = true;
      formOk = false;
    }
    
    if (!empleadosSeleccionado.empresa_int) {
      errors.empresa_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.fecha_creacion_int) {
      errors.fecha_creacion_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.fecha_modificacion_int) {
      errors.fecha_modificacion_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.especialidad_int) {
      errors.especialidad_int = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(empleadosSeleccionado);
      const res = await empleadosServices.save(empleadosSeleccionado);

      if (res.success) {
        alert("Empleado Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete empleadosSeleccionado.codigo_tipo_int;
        delete empleadosSeleccionado.nit_int;
        delete empleadosSeleccionado.estado_int;
        delete empleadosSeleccionado.primer_nombre_int; 
        delete empleadosSeleccionado.segundo_nombre_int;
        delete empleadosSeleccionado.primer_apellido_int;
        delete empleadosSeleccionado.segundo_apellido_int; 
        delete empleadosSeleccionado.ciudad_int;
        delete empleadosSeleccionado.direccion_int;
        delete empleadosSeleccionado.telefono_int;
        delete empleadosSeleccionado.email_int;
        delete empleadosSeleccionado.empresa_int;
        delete empleadosSeleccionado.fecha_creacion_int;
        delete empleadosSeleccionado.fecha_modificacion_int; 
        delete empleadosSeleccionado.especialidad_int;
      } else
      {
        alert("Error Creando el Empleado");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Empleado");
      console.log(empleadosSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarEmpleado = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!empleadosSeleccionado.codigo_tipo_int) {
      errors.codigo_tipo_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.nit_int) {
      errors.nit_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.estado_int) {
      errors.estado_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.primer_nombre_int) {
      errors.primer_nombre_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.segundo_nombre_int) {
      errors.segundo_nombre_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.primer_apellido_int) {
      errors.primer_apellido_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.segundo_apellido_int) {
      errors.segundo_apellido_int = true;
      formOk = false;
    }
    
    if (!empleadosSeleccionado.ciudad_int) {
      errors.ciudad_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.direccion_int) {
      errors.direccion_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.telefono_int) {
      errors.telefono_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.email_int) {
      errors.email_int = true;
      formOk = false;
    }
    
    if (!empleadosSeleccionado.empresa_int) {
      errors.empresa_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.fecha_creacion_int) {
      errors.fecha_creacion_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.fecha_modificacion_int) {
      errors.fecha_modificacion_int = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.especialidad_int) {
      errors.especialidad_int = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await empleadosServices.update(empleadosSeleccionado);

    if (res.success) {
        alert("Empleado actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete empleadosSeleccionado.codigo_tipo_int;
        delete empleadosSeleccionado.nit_int;
        delete empleadosSeleccionado.estado_int;
        delete empleadosSeleccionado.primer_nombre_int; 
        delete empleadosSeleccionado.segundo_nombre_int;
        delete empleadosSeleccionado.primer_apellido_int;
        delete empleadosSeleccionado.segundo_apellido_int; 
        delete empleadosSeleccionado.ciudad_int;
        delete empleadosSeleccionado.direccion_int;
        delete empleadosSeleccionado.telefono_int;
        delete empleadosSeleccionado.email_int;
        delete empleadosSeleccionado.empresa_int;
        delete empleadosSeleccionado.fecha_creacion_int;
        delete empleadosSeleccionado.fecha_modificacion_int; 
        delete empleadosSeleccionado.especialidad_int;
    } else
    {
        alert("Error Actualizando el Empleado");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Empleado");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarEmpleado = async()=>{
   
    const res = await empleadosServices.delete(empleadosSeleccionado.id_int);

    if (res.success) {
        alert("Empleado Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando el Empleado");
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
    field: 'codigo_tipo_int',
    title: 'Codigo',
  },
  {
    field: 'nit_int',
    title: 'Nit'
  },
  {
    field: 'estado_int',
    title: 'Estado'
  },
  {
    field: 'primer_nombre_int',
    title: 'Primero Nombre'
  },
  {
    field: 'segundo_nombre_int',
    title: 'Segundo Nombre'
  },
  {
    field: 'primer_apellido_int',
    title: 'Primer Apelllido'
  },
  {
    field: 'segundo_apellido_int',
    title: 'Segundo Apellido'
  },
  {
    field: 'ciudad_int',
    title: 'Ciudad'
  },
  {
    field: 'direccion_int',
    title: 'Dirección',
    cellStyle : { minWidth: 250}
  },
  {
    field: 'telefono_int',
    title: 'Teléfono',
    cellStyle : { minWidth: 120}
  },
  {
    field: 'email_int',
    title: 'Email',
    width: '400'
  },
  {
    field: 'empresa_int',
    title: 'Empresa'
  },
  {
    field: 'fecha_creacion_int',
    title: 'Fecha de Creación',
    cellStyle : { minWidth: 120}
  },
  {
    field: 'fecha_modificacion_int',
    title: 'Fecha de Modificación',
    cellStyle : { minWidth: 120}
  },
  {
    field: 'especialidad_int',
    title: 'Especialidad'
  }
  ]
  
  const empleadoInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Empleado</h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_tipo_int" label="Tipo Interlocutor" defaultValue="3" disabled="true"
         fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="nit_int" label="Nit del Interlocutor" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
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
        <Grid item xs={12} md={6}> <TextField  name="primer_nombre_int" label="Primero Nombre" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="segundo_nombre_int" label="Segundo Nombre" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="primer_apellido_int" label="Primer Apellido" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="segundo_apellido_int" label="Segundo Apellido" onChange={handleChange} fullWidth /> </Grid>
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
        <Grid item xs={12} md={6}> <TextField  name="direccion_int" label="Direccion" onChange={handleChange} fullWidth /> </Grid>
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
          <TextField type="date" defaultValue="2020-12-03" name="fecha_creacion_int" label="Fecha Creación" fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <TextField type="date" defaultValue="2020-12-03"name="fecha_modificacion_int" label="Fecha Modificación" fullWidth onChange={handleChange} />
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
        <Button color="primary" onClick = { () => grabarEmpleado() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const empleadoEditar=(
    <div className={styles.modal}>
      <h3>Actualizar Empleado</h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_tipo_int" label="Tipo Interlocutor" fullWidth disabled="true"
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.codigo_tipo_int} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="nit_int" label="Nit del Interlocutor" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.nit_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"  >Estado</InputLabel>
              <Select
                labelId="selectEstado"
                name="estado_int"
                id="idselectEstado"
                fullWidth 
                onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.estado_int}
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
        <Grid item xs={12} md={6}> <TextField  name="primer_nombre_int" label="Primero Nombre" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.primer_nombre_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="segundo_nombre_int" label="Segundo Nombre" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.segundo_nombre_int} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="primer_apellido_int" label="Primer Apellido" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.primer_apellido_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="segundo_apellido_int" label="Segundo Apellido" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.segundo_apellido_int} /> </Grid>
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
                onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.ciudad_int}
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
        <Grid item xs={12} md={6}> <TextField  name="direccion_int" label="Direccion" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.direccion_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="telefono_int" label="Telefono" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.telefono_int} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="email_int" label="Email" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.email_int} /> </Grid>
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
                onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.empresa_int}
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
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.fecha_creacion_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="fecha_modificacion_int" label="Fecha Modificación" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.fecha_modificacion_int} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
              <Select
                labelId="selecEspecialidad"
                name="especialidad_int"
                id="idselectEspecialidad"
                fullWidth 
                onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.especialidad_int}
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
        <Button color="primary"  onClick={()=>actualizarEmpleado()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const empleadoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el CLiente <b>{empleadosSeleccionado && empleadosSeleccionado.primer_nombre_int}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarEmpleado() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Insertar</Button>
      <MaterialTable
        columns={columnas}
        data={listarEmpleados}
        title="Maestra de Empleados"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Empleado',
            onClick  : (event, rowData) => seleccionarEmpleado(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar Empleado',
            onClick  : (event, rowData) =>   seleccionarEmpleado(rowData, "Eliminar")
          } 
        ]}
        options={{
         actionsColumnIndex: 12
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
        {empleadoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {empleadoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {empleadoEliminar}
      </Modal>
    </div>
  );
}

export default Empleados;

