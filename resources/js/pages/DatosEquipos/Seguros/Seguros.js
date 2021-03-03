import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import Moment from 'moment';
import NumberFormat from 'react-number-format';

//Estilos 
import "./Seguros.css";

// Componentes de Conexion con el Backend
import segurosServices from "../../../services/DatosEquipos/Seguros"
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
  },
  formControlEstado: {
    margin: theme.spacing(0),
    minWidth: 170,
    maxWidth: 170,
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Seguros(props) {
  const { equipoID, equipoCodigo } = props;

  const styles = useStyles();
  const [listarSeguros, setListarSeguros] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [segurosSeleccionado, setSegurosSeleccionado] = useState({
        'equipo_seg': equipoID,
        'clienteubicacion_seg': "",
        'direccionubicacion_seg': "",
        'ciudad_seg': "",
        'declaracionimportacion_seg': "",
        'fechainicia_seg': "",
        'fechafin_seg': "",
        'estado_seg': "",
        'valorcomercial_seg': 0
  })

  useEffect(() => {
    async function fetchDataSeguros() {
      const res = await segurosServices.listSeguros();
      //console.log("Datos Retornados : ", res.data)
      setListarSeguros(res.data);
      setActualiza(false);
    }
    fetchDataSeguros();
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

    setSegurosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarSeguro = (seguros, caso) => {
    setSegurosSeleccionado(seguros);
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

  const grabarSeguro = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!segurosSeleccionado.equipo_seg) {
      errors.equipo_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.clienteubicacion_seg) {
      errors.clienteubicacion_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.direccionubicacion_seg) {
      errors.direccionubicacion_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.ciudad_seg) {
      errors.ciudad_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.declaracionimportacion_seg) {
      errors.declaracionimportacion_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.fechainicia_seg) {
      errors.fechainicia_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.fechafin_seg) {
      errors.fechafin_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.valorcomercial_seg) {
      errors.valorcomercial_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.estado_seg) {
      errors.estado_seg = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(segurosSeleccionado);
      const res = await segurosServices.save(segurosSeleccionado);

      if (res.success) {
        swal( "Seguro", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete segurosSeleccionado.equipo_seg;
        delete segurosSeleccionado.clienteubicacion_seg;
        delete segurosSeleccionado.direccionubicacion_seg;
        delete segurosSeleccionado.ciudad_seg;
        delete segurosSeleccionado.declaracionimportacion_seg;
        delete segurosSeleccionado.fechainicia_seg;
        delete segurosSeleccionado.fechafin_seg;
        delete segurosSeleccionado.estado_seg;
        delete segurosSeleccionado.valorcomercial_seg;
      } else {
        swal( "Seguro", "Error Creando el Seguro del Equipo!", "error", { button: "Aceptar" });
        //console.log(segurosSeleccionado);
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal( "Seguro", "Debe Ingresar Todos los Datos, Error Creando el Seguro del  Equipo!", "warning", { button: "Aceptar" });
      //console.log(segurosSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarSeguro = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!segurosSeleccionado.equipo_seg) {
      errors.equipo_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.clienteubicacion_seg) {
      errors.clienteubicacion_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.direccionubicacion_seg) {
      errors.direccionubicacion_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.ciudad_seg) {
      errors.ciudad_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.declaracionimportacion_seg) {
      errors.declaracionimportacion_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.fechainicia_seg) {
      errors.fechainicia_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.fechafin_seg) {
      errors.fechafin_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.estado_seg) {
      errors.estado_seg = true;
      formOk = false;
    }

    if (!segurosSeleccionado.valorcomercial_seg) {
      errors.valorcomercial_seg = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await segurosServices.update(segurosSeleccionado);

      if (res.success) {
        swal( "Seguro", "Tipo de Seguro del Equipo actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete segurosSeleccionado.equipo_seg;
        delete segurosSeleccionado.clienteubicacion_seg;
        delete segurosSeleccionado.direccionubicacion_seg;
        delete segurosSeleccionado.ciudad_seg;
        delete segurosSeleccionado.declaracionimportacion_seg;
        delete segurosSeleccionado.fechainicia_seg;
        delete segurosSeleccionado.fechafin_seg;
        delete segurosSeleccionado.estado_seg;
        delete segurosSeleccionado.valorcomercial_seg;
      } else {
        swal( "Seguro", "Error Actualizando el Tipo de Seguro del  Equipo!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal( "Seguro", "Debe Ingresar Todos los Datos, Error Actualizando el Tipo de Seguro del Equipo!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarSeguro = async () => {
    //console.log("ID INTERNO", segurosSeleccionado.IDinterno_seg)

    const res = await segurosServices.delete(segurosSeleccionado.IDinterno_seg);

    if (res.success) {
      swal( "Seguro", "El Tipo de Seguro del Equipo Borrada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal( "Seguro", "Error Borrando el Tipo de Seguro del Equipo!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Equipo',
      field: 'equipo_seg',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Descripción',
      field: 'descripcion_equ',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Dirección',
      field: 'direccionubicacion_seg',
      cellStyle: { minWidth: 400 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu',
      cellStyle: { minWidth: 100 },
      cellStyle: { maxWidth: 100 }
    },
    {
      title: 'Valor Comercial',
      field: 'valorcomercial_seg'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const seguroInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" > Agregar Nuevo Seguro del Equipo </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} label="ID Seguro" name="IDinterno_seg" onChange={handleChange} disabled="true" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} label="ID Equipo" name="equipo_seg" onChange={handleChange}
            defaultValue={equipoID} disabled="true" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} label="Declaración Importación" name="declaracionimportacion_seg"
           onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="clienteubicacion_seg">Cliente</InputLabel>
            <Select
              labelId="selectclienteubicacion_seg"
              name="clienteubicacion_seg"
              id="idselectclienteubicacion_seg"
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
            <InputLabel id="ciudad_seg">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_seg"
              name="ciudad_seg"
              id="idselectciudad_seg"
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
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_seg"
          defaultValue={Moment(segurosSeleccionado.fechainicia_seg).format('YYYY-MM-DD')}
          label="Fecha de inicio del Seguro" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafin_seg"
          defaultValue={Moment(segurosSeleccionado.fechafin_seg).format('YYYY-MM-DD')}
          label="Fecha Terminacion del Seguro" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="estado_seg">Estado</InputLabel>
            <Select
              labelId="selectestado_seg"
              name="estado_seg"
              id="idselectestado_seg"
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
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valorcomercial_seg" label="Valor Comercial" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Dirección" name="direccionubicacion_seg" onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => grabarSeguro()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  /*
  <TextField className={styles.inputMaterial} label="ID Equipo" name="equipo_ubi" onChange={handleChange}
            defaultValue={equipoID} disabled="true" value={segurosSeleccionado && segurosSeleccionado.equipo_ubi} />
  */

  const seguroEditar = (
    <div className={styles.modal}>
     <Typography align="center" className={styles.typography} variant="button" display="block" > Actualizar Seguro del Equipo </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} label="ID Seguro" name="IDinterno_seg" onChange={handleChange} disabled="true" 
           disabled="true" value={segurosSeleccionado && segurosSeleccionado.IDinterno_seg} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} label="ID Equipo" name="equipo_seg" onChange={handleChange}
            defaultValue={equipoID} disabled="true" disabled="true" value={segurosSeleccionado && segurosSeleccionado.equipo_seg} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} label="Declaración Importación" name="declaracionimportacion_seg"
            value={segurosSeleccionado && segurosSeleccionado.declaracionimportacion_seg} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="clienteubicacion_seg">Cliente</InputLabel>
            <Select
              labelId="selectclienteubicacion_seg"
              name="clienteubicacion_seg"
              id="idselectclienteubicacion_seg"
              onChange={handleChange}
              value={segurosSeleccionado && segurosSeleccionado.clienteubicacion_seg}
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
            <InputLabel id="ciudad_seg">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_seg"
              name="ciudad_seg"
              id="idselectciudad_seg"
              onChange={handleChange}
              value={segurosSeleccionado && segurosSeleccionado.ciudad_seg}
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
      
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_seg"
          defaultValue={Moment(segurosSeleccionado.fechainicia_seg).format('YYYY-MM-DD')}
          label="Fecha de inicio del Seguro" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafin_seg"
          defaultValue={Moment(segurosSeleccionado.fechafin_seg).format('YYYY-MM-DD')}
          label="Fecha Terminacion del Seguro" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="estado_seg">Estado</InputLabel>
            <Select
              labelId="selectestado_seg"
              name="estado_seg"
              id="idselectestado_seg"
              onChange={handleChange}
              value={segurosSeleccionado && segurosSeleccionado.estado_seg}
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
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valorcomercial_seg" label="Valor Comercial" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={segurosSeleccionado && segurosSeleccionado.valorcomercial_se}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Dirección" name="direccionubicacion_seg" onChange={handleChange}
            value={segurosSeleccionado && segurosSeleccionado.direccionubicacion_seg} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarSeguro()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const seguroEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Seguro del Equipo <b>{segurosSeleccionado && segurosSeleccionado.descripcion_equ}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarSeguro()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <ButtonGroup>
        <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Seguro del Equipo</Button>
      </ButtonGroup>
      <div className="datosequipos">
        <MaterialTable
          columns={columnas}
          data={listarSeguros}
          title="DATOS SEGURO DEL EQUIPO"
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Seguro del Equipo',
              onClick: (event, rowData) => seleccionarSeguro(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Borrar Seguro del Equipo',
              onClick: (event, rowData) => seleccionarSeguro(rowData, "Eliminar")
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
        {seguroInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {seguroEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {seguroEliminar}
      </Modal>
    </div>
  );
}

export default Seguros;