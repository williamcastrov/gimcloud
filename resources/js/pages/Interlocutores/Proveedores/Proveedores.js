import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography  } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Componentes de Conexion con el Backend
import proveedoresServices from "../../../services/Interlocutores/Proveedores";
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
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function Proveedores() {
  const styles = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [listarProveedores, setListarProveedores] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEspecialidades, setListarEspecialidades] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [proveedoresSeleccionado, setProveedoresSeleccionado] = useState({
    id_int: "",
    codigo_tipo_int: 1,
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
    async function fetchDataProveedores() {
      const res = await proveedoresServices.listProveedores();
      setListarProveedores(res.data);
      console.log(res.data)
    }
    fetchDataProveedores();
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

    setProveedoresSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarProveedor=(proveedor, caso)=>{
    setProveedoresSeleccionado(proveedor);
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

  const grabarProveedor = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!proveedoresSeleccionado.codigo_tipo_int) {
      errors.codigo_tipo_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.nit_int) {
      errors.nit_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.estado_int) {
      errors.estado_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.razonsocial_int) {
      errors.razonsocial_int = true;
      formOk = false;
    }
    
    if (!proveedoresSeleccionado.ciudad_int) {
      errors.ciudad_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.direccion_int) {
      errors.direccion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.telefono_int) {
      errors.telefono_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.email_int) {
      errors.email_int = true;
      formOk = false;
    }
    
    if (!proveedoresSeleccionado.empresa_int) {
      errors.empresa_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.fecha_creacion_int) {
      errors.fecha_creacion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.fecha_modificacion_int) {
      errors.fecha_modificacion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.especialidad_int) {
      errors.especialidad_int = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(proveedoresSeleccionado);
      const res = await proveedoresServices.save(proveedoresSeleccionado);

      if (res.success) {
        alert("Proveedeor Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete proveedoresSeleccionado.codigo_tipo_int;
        delete proveedoresSeleccionado.nit_int;
        delete proveedoresSeleccionado.estado_int;
        delete proveedoresSeleccionado.razonsocial_int;
        delete proveedoresSeleccionado.ciudad_int;
        delete proveedoresSeleccionado.direccion_int;
        delete proveedoresSeleccionado.telefono_int;
        delete proveedoresSeleccionado.email_int;
        delete proveedoresSeleccionado.empresa_int;
        delete proveedoresSeleccionado.fecha_creacion_int;
        delete proveedoresSeleccionado.fecha_modificacion_int; 
        delete proveedoresSeleccionado.especialidad_int;
      } else
      {
        alert("Error Creando el Proveedor");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Proveedor");
      console.log(proveedoresSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarProveedor = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!proveedoresSeleccionado.codigo_tipo_int) {
      errors.codigo_tipo_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.nit_int) {
      errors.nit_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.estado_int) {
      errors.estado_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.razonsocial_int) {
      errors.razonsocial_int = true;
      formOk = false;
    }
    
    if (!proveedoresSeleccionado.ciudad_int) {
      errors.ciudad_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.direccion_int) {
      errors.direccion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.telefono_int) {
      errors.telefono_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.email_int) {
      errors.email_int = true;
      formOk = false;
    }
    
    if (!proveedoresSeleccionado.empresa_int) {
      errors.empresa_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.fecha_creacion_int) {
      errors.fecha_creacion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.fecha_modificacion_int) {
      errors.fecha_modificacion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.especialidad_int) {
      errors.especialidad_int = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await proveedoresServices.update(proveedoresSeleccionado);

    if (res.success) {
        alert("Proveedor actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete proveedoresSeleccionado.codigo_tipo_int;
        delete proveedoresSeleccionado.nit_int;
        delete proveedoresSeleccionado.estado_int;
        delete proveedoresSeleccionado.razonsocial_int;
        delete proveedoresSeleccionado.ciudad_int;
        delete proveedoresSeleccionado.direccion_int;
        delete proveedoresSeleccionado.telefono_int;
        delete proveedoresSeleccionado.email_int;
        delete proveedoresSeleccionado.empresa_int;
        delete proveedoresSeleccionado.fecha_creacion_int;
        delete proveedoresSeleccionado.fecha_modificacion_int; 
        delete proveedoresSeleccionado.especialidad_int;
    } else
    {
        alert("Error Actualizando el Proveedor");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Proveedor");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarProveedor = async()=>{
   
    const res = await proveedoresServices.delete(proveedoresSeleccionado.id_int);

    if (res.success) {
        alert("Proveedor Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando el Proveedor");
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
    type: 'date',
    cellStyle : { minWidth: 120}
  },
  {
    field: 'fecha_modificacion_int',
    title: 'Fecha de Modificación',
    type: 'date',
    cellStyle : { minWidth: 120}
  },
  {
    field: 'nombre_esp',
    title: 'Especialidad'
  }
  ]
  
  const proveedorInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Proveedor</h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_tipo_int" label="Tipo Interlocutor" defaultValue="1" disabled="true"
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
        <Grid item xs={12} md={6} >
          <TextField type="date" name="fecha_creacion_int" label="Fecha de Creación"
           InputLabelProps={{ shrink: true}} fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <TextField type="date" name="fecha_modificacion_int" label="Fecha Modificación"
           InputLabelProps={{ shrink: true}} fullWidth onChange={handleChange} />
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
        <Button color="primary" onClick = { () => grabarProveedor() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const proveedorEditar=(
    <div className={styles.modal}>
      <h3  align="center" >Actualizar Proveedor</h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_tipo_int" label="Tipo Interlocutor" fullWidth disabled="true"
          onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.codigo_tipo_int} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="nit_int" label="Nit del Interlocutor" fullWidth 
          onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.nit_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}> <TextField  name="razonsocial_int" label="Razon Social" fullWidth 
          onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.razonsocial_int} />
        </Grid>
      </Grid>
      <Grid container spacing={2} > 
         <Grid item xs={12} md={12}> <TextField  name="direccion_int" label="Direccion" fullWidth 
          onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.direccion_int} /> 
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
                onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.ciudad_int}
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
                onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.estado_int}
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
          onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.telefono_int} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="email_int" label="Email" fullWidth 
          onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.email_int} /> </Grid>
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
                onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.empresa_int}
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
          <TextField name="fecha_creacion_int" label="Fecha Creación" fullWidth 
          onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.fecha_creacion_int} />
        </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <TextField name="fecha_modificacion_int" label="Fecha Modificación" fullWidth 
          onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.fecha_modificacion_int} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
              <Select
                labelId="selecEspecialidad"
                name="especialidad_int"
                id="idselectEspecialidad"
                fullWidth 
                onChange={handleChange} value={proveedoresSeleccionado&&proveedoresSeleccionado.especialidad_int}
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
        <Button color="primary"  onClick={()=>actualizarProveedor()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const proveedorEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Proveedor <b>{proveedoresSeleccionado && proveedoresSeleccionado.razonsocial_int}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarProveedor() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Proveedor</Button>
      <MaterialTable
        columns={columnas}
        data={listarProveedores}
        title="Maestra de Proveedores"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Proveedor',
            onClick  : (event, rowData) => seleccionarProveedor(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar Proveedor',
            onClick  : (event, rowData) =>   seleccionarProveedor(rowData, "Eliminar")
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
        {proveedorInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {proveedorEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {proveedorEliminar}
      </Modal>
    </div>
  );
}

export default Proveedores;

