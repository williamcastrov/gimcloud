import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

//Estilos 
import "./Ubicaciones.css";

// Componentes de Conexion con el Backend
import ubicacionesServices from "../../../services/DatosEquipos/Ubicaciones"
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import clientesServices from "../../../services/Interlocutores/Clientes";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 650,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 270,
    maxWidth: 270,
  }
}));

function Ubicaciones(props) {
  const { equipoID, equipoCodigo } = props;

  const styles = useStyles();
  const [listarUbicaciones, setListarUbicaciones] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [ubicacionesSeleccionado, setUbicacionesSeleccionado] = useState({
    'id_ubi': "",
    'equipo_ubi': equipoID,
    'cliente_ubi': "",
    'direccion_ubi': "",
    'ciudad_ubi': "",
    'estado_ubi': ""
  })

  useEffect(() => {
    async function fetchDataUbicaciones() {
      const res = await ubicacionesServices.listUnaUbicacion(equipoID);
      console.log("Datos Retornados : ", res.data)
      setListarUbicaciones(res.data);
      setActualiza(false);
    }
    fetchDataUbicaciones();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      console.log(res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data)
      //console.log(res.data);
    }
    fetchDataCiudades();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosGenerales();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setUbicacionesSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarUbicacion = (ubicaciones, caso) => {
    setUbicacionesSeleccionado(ubicaciones);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
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

  const grabarUbicacion = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!ubicacionesSeleccionado.equipo_ubi) {
      errors.equipo_ubi = true;
      formOk = false;
    }

    if (!ubicacionesSeleccionado.cliente_ubi) {
      errors.cliente_ubi = true;
      formOk = false;
    }

    if (!ubicacionesSeleccionado.direccion_ubi) {
      errors.direccion_ubi = true;
      formOk = false;
    }

    if (!ubicacionesSeleccionado.ciudad_ubi) {
      errors.ciudad_ubi = true;
      formOk = false;
    }

    if (!ubicacionesSeleccionado.estado_ubi) {
      errors.estado_ubi = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(ubicacionesSeleccionado);
      const res = await ubicacionesServices.save(ubicacionesSeleccionado);

      if (res.success) {
        swal( "Ubicaci??n", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete ubicacionesSeleccionado.equipo_ubi;
        delete ubicacionesSeleccionado.cliente_ubi;
        delete ubicacionesSeleccionado.direccion_ubi;
        delete ubicacionesSeleccionado.ciudad_ubi;
        delete ubicacionesSeleccionado.estado_ubi;
      } else {
        swal( "Ubicaci??n", "Error Creando la Ubicaci??n del Equipo!", "error", { button: "Aceptar" });
        console.log(ubicacionesSeleccionado);
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal( "Ubicaci??n", "Debe Ingresar Todos los Datos, Error Creando la Ubicaci??n del  Equipo!", "warning", { button: "Aceptar" });
      console.log(ubicacionesSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarUbicacion = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;


    if (!ubicacionesSeleccionado.equipo_ubi) {
      errors.equipo_ubi = true;
      formOk = false;
    }

    if (!ubicacionesSeleccionado.cliente_ubi) {
      errors.cliente_ubi = true;
      formOk = false;
    }

    if (!ubicacionesSeleccionado.direccion_ubi) {
      errors.direccion_ubi = true;
      formOk = false;
    }

    if (!ubicacionesSeleccionado.ciudad_ubi) {
      errors.ciudad_ubi = true;
      formOk = false;
    }

    if (!ubicacionesSeleccionado.estado_ubi) {
      errors.estado_ubi = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await ubicacionesServices.update(ubicacionesSeleccionado);

      if (res.success) {
        swal( "Ubicaci??n", "Tipo de Ubicaci??n del Equipo actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete ubicacionesSeleccionado.equipo_ubi;
        delete ubicacionesSeleccionado.cliente_ubi;
        delete ubicacionesSeleccionado.direccion_ubi;
        delete ubicacionesSeleccionado.ciudad_ubi;
        delete ubicacionesSeleccionado.estado_ubi;
      } else {
        swal( "Ubicaci??n", "Error Actualizando el Tipo de Ubicaci??n del  Equipo!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal( "Ubicaci??n", "Debe Ingresar Todos los Datos, Error Actualizando el Tipo de Ubicaci??n del Equipo!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarUbicacion = async () => {
    const res = await ubicacionesServices.delete(ubicacionesSeleccionado.id_ubi);

    if (res.success) {
      swal( "Ubicaci??n", "El Tipo de Ubicaci??n del Equipo Borrada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal( "Ubicaci??n", "Error Borrando el Tipo de Ubicaci??n del Equipo!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Equipo',
      field: 'codigo_equ',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Descripci??n',
      field: 'descripcion_equ',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Direcci??n',
      field: 'direccion_ubi',
      cellStyle: { minWidth: 400 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu',
      cellStyle: { minWidth: 100 },
      cellStyle: { maxWidth: 100 }
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const ubicacionInsertar = (
    <div className={styles.modal}>
      <h3 align="center" >Agregar Nueva Ubicaci??n del Equipo</h3>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="ID Equipo" name="equipo_ubi" onChange={handleChange}
            defaultValue={equipoID} disabled="true" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="cliente_ubi">Cliente</InputLabel>
            <Select
              labelId="selectcliente_ubi"
              name="cliente_ubi"
              id="idselectcliente_ubi"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="ciudad_ubi">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_ubi"
              name="ciudad_ubi"
              id="idselectciudad_ubi"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="estado_ubi">Estado</InputLabel>
            <Select
              labelId="selectestado_ubi"
              name="estado_ubi"
              id="idselectestado_ubi"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Direcci??n" name="direccion_ubi" onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => grabarUbicacion()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const ubicacionEditar = (
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Ubicaci??n del Equipo</h3>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="ID Equipo" name="equipo_ubi" onChange={handleChange}
            defaultValue={equipoID} disabled="true" value={ubicacionesSeleccionado && ubicacionesSeleccionado.equipo_ubi} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="cliente_ubi">Cliente</InputLabel>
            <Select
              labelId="selectcliente_ubi"
              name="cliente_ubi"
              id="idselectcliente_ubi"
              onChange={handleChange}
              value={ubicacionesSeleccionado && ubicacionesSeleccionado.cliente_ubi}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="ciudad_ubi">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_ubi"
              name="ciudad_ubi"
              id="idselectciudad_ubi"
              onChange={handleChange}
              value={ubicacionesSeleccionado && ubicacionesSeleccionado.ciudad_ubi}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="estado_ubi">Estado</InputLabel>
            <Select
              labelId="selectestado_ubi"
              name="estado_ubi"
              id="idselectestado_ubi"
              onChange={handleChange}
              value={ubicacionesSeleccionado && ubicacionesSeleccionado.estado_ubi}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Direcci??n" name="direccion_ubi" onChange={handleChange}
            value={ubicacionesSeleccionado && ubicacionesSeleccionado.direccion_ubi} />
        </Grid>
      </Grid>

      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarUbicacion()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const ubicacionEliminar = (
    <div className={styles.modal}>
      <p>Est??s seguro que deseas eliminar la Ubicaci??n del Equipo <b>{ubicacionesSeleccionado && ubicacionesSeleccionado.descripcion_equ}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarUbicacion()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <ButtonGroup>
        <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Ubicaci??n del Equipo</Button>
      </ButtonGroup>
      <div className="datosequipos">
        <MaterialTable
          columns={columnas}
          data={listarUbicaciones}
          title="Datos Ubicaci??n del Equipo"
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Ubicaci??n del Equipo',
              onClick: (event, rowData) => seleccionarUbicacion(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Borrar Ubicaci??n del Equipo',
              onClick: (event, rowData) => seleccionarUbicacion(rowData, "Eliminar")
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
        />{ }
      </div>

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {ubicacionInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {ubicacionEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {ubicacionEliminar}
      </Modal>
    </div>
  );
}

export default Ubicaciones;