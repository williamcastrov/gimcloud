import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, InputAdornment, Container, Table,
  TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, FormControlLabel, Switch,
  Paper, Checkbox, ButtonGroup
} from "@material-ui/core";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { blue, blueGrey, red } from '@material-ui/core/colors';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

// Componentes de Conexion con el Backend
import inventariosServices from "../../../services/Almacenes/Inventarios";
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import cumplimientooservServices from "../../../services/GestionOrdenes/CumplimientoOserv";
import tipooperacionServices from "../../../services/GestionOrdenes/TipoOperacion";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  modalcumplimiento: {
    position: 'absolute',
    width: 1400,
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
    minWidth: 515,
    maxWidth: 515,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 220,
    maxWidth: 220,
  },
  typography: {
    fontSize: 13,
    color: "#ff3d00"
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[200]),
    margin: theme.spacing(0),
    '&:hover': {
      backgroundColor: blueGrey[200],
    },
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  button2: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blue[900],
    margin: theme.spacing(0),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[900],
    },
  },
  button3: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: red[700],
    margin: theme.spacing(0),
    fontSize: 11,
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}));


function NumberFormatCustom(props) {
  const { inputRef, ...other } = props;
  //console.log(inputRef);
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      thousandSeparator={'.'}
      decimalSeparator={','}
    />
  );
}
function ActividadesOservChequeo(props) {
  const { id_otr, nombre_emp, razonsocial_cli, telefono_cli, nombre_ciu, email_cli, descripcion_mar, modelo_dequ,
          fechainicia_otr, descripcion_tser, descripcion_tmt, serie_dequ, codigo_equ, descripcion_con, tipooperacion_otr,
          referencia_dequ } = props.ordenSeleccionado;

  const styles = useStyles();
  const [listInventarios, setListInventarios] = useState([]);
  const [listUnCumplimiento, setListUnCumplimiento] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalCumplimiento, setModalCumplimiento] = useState(false);
  const [modalCerrarOrden, setModalCerrarOrden] = useState(false);
  const [modalRevisarCumplimiento, setModalRevisarCumplimiento] = useState(false);
  const [modalActualizarCumplimiento, setModalActualizarCumplimiento] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarTipoOperacion, setListarTipoOperacion] = useState([]);
  const [grabar, setGrabar] = React.useState(false);
  const [grabarCambios, setGrabarCambios] = React.useState(false)
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [activo, setActivo] = useState(false);
  const [actualiza, setActualiza] = useState(false);

  const [listChequeoEntrega, setListChequeoEntrega] = useState([]);
  const [listChequeoRecepcion, setListChequeoRecepcion] = useState([]);
  const [tipooperacion, setTipoOperacion] = useState(0);
  const [referencia, setReferencia] = useState(0);
  const [actividadrealizada, setActividadrealizada] = useState(0);
  const [fechainicial, setFechainicial] = useState(0);
  const [fechafinal, setFechafinal] = useState(0);
  const [horainicial, setHorainicial] = useState(0);
  const [horafinal, setHorafinal] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [valorunitario, setValorunitario] = useState(0);
  const [valortotal, setValortotal] = useState(0);
  const [serviciorealizado, setServicioRealizado] = useState(0);
  const [observacion, setObservacion] = useState(0);
  const [idCumplimiento, setIdCumplimiento] = useState(0);

  const [inventariosSeleccionado, setInventariosSeleccionado] = useState([]);

  const [cumplimientoSeleccionado, setCumplimientoSeleccionado] = useState({
    id: idCumplimiento,
    id_cosv: id_otr,
    descripcion_cosv: "",
    tipooperacion_cosv: tipooperacion_otr,
    referencia_cosv: referencia_dequ,
    fechainicia_cosv: fechaactual,
    fechafinal_cosv: fechaactual,
    horainiciacosv: horaactual,
    horafinal_cosv: horaactual,
    cantidad_cosv: 0,
    valorunitario_cosv: 0,
    valortotal_cosv: 0,
    servicio_cosv: 2,
    observacion_cosv: ""
  });

  useEffect(() => {
    async function fetchDataListaChequeoEntrega() {
      const res = await inventariosServices.listEntregaEquipos();
      setListChequeoEntrega(res.data);
      setActualiza(false);
      //console.log("LISTA CHEQUEO ENTREGA : ", res.data);
    }
    fetchDataListaChequeoEntrega();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataListaChequeoRecepcion() {
      const res = await inventariosServices.listRecepcionEquipos();
      setListChequeoRecepcion(res.data);
      setActualiza(false);
      //console.log("LISTA CHEQUEO RECEPCION : ", res.data);
    }
    fetchDataListaChequeoRecepcion();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataInventarios() {
      const res = await inventariosServices.listInventarios();
      setListInventarios(res.data);
    }
    fetchDataInventarios();
  }, [])

  useEffect(() => {
    async function fetchDataTipoOperacion() {
      const res = await tipooperacionServices.listTipooperacion();
      setListarTipoOperacion(res.data);
    }
    fetchDataTipoOperacion();
  }, [])

  useEffect(() => {
    async function fetchDataUnCumplimiento() {
      const res = await cumplimientooservServices.listUnCumplimiento(id_otr);
      setListUnCumplimiento(res.data);
      if (res.data) {
        setActivo(true)
      } else { setActivo(false) }
      //console.log("UN CUMPLIMIENTO : ", listUnCumplimiento);
    }
    fetchDataUnCumplimiento();
  }, [])

  /*
  const calculoValorTotal = (resultado) => {
    console.log("CANTIDAD : ", cantidad, valorunitario)
    setValortotal( cantidad * valorunitario)
  }
*/
  const handleChange = e => {
    const { name, value } = e.target;

    setCumplimientoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarInventarios = (inventarios, caso) => {
    setInventariosSeleccionado(inventarios);
    setActividadrealizada(inventarios.descripcion_inv);
    let nuevoid = id_otr + inventarios.referencia_inv;
    setReferencia(inventarios.referencia_inv);
    setIdCumplimiento(nuevoid);
    //console.log("NUEVO ID DE INVENTARIO : ", nuevoid);
    (caso === "Editar") ? abrirCerrarModalCumplimiento() : abrirCerrarModalInsertar()
  }

  const seleccionarCumplimiento = (cumplimiento, caso) => {
    //console.log(cumplimiento)
    setCumplimientoSeleccionado(cumplimiento);
    setActividadrealizada(cumplimiento.descripcion_cosv);
    setObservacion(cumplimiento.observacion_cosv);
    (caso === "Editar") ? abrirCerrarModalActualizarCumplimiento() : abrirCerrarModalEliminarActividad()
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalCumplimiento = () => {
    setModalCumplimiento(!modalCumplimiento);
  }

  const abrirCerrarModalActualizarCumplimiento = () => {
    setModalActualizarCumplimiento(!modalActualizarCumplimiento);
  }

  const consultarCumplimiento = () => {
    async function fetchDataUnCumplimiento() {
      const res = await cumplimientooservServices.listUnCumplimiento(props.ordenSeleccionado.id_otr);
      setListUnCumplimiento(res.data);
      //console.log("LEE DATOS CUMPLIMIENTO ORDEN : ", res.data)
      if (res.data) {
        setActivo(true)
      } else { setActivo(false) }
      abrirCerrarModalRevisarCumplimiento();
    }
    fetchDataUnCumplimiento();
  }

  const abrirCerrarModalRevisarCumplimiento = () => {
    setModalRevisarCumplimiento(!modalRevisarCumplimiento);
  }

  const abrirCerrarModalCerrarOrden = () => {
    setModalCerrarOrden(!modalCerrarOrden);
  }

  const adicionarCumplimiento = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    {
      let resultado = (cantidad * valorunitario)
      //console.log("RESULTADO : ", resultado)
      //console.log("REFERENCIA : ", referencia)
      //console.log("ACTIVIDAD : ", actividadrealizada)
      //Asignar Valores al Estado Cumplimiento
      setCumplimientoSeleccionado([{
        id: idCumplimiento,
        id_cosv: props.ordenSeleccionado.id_otr,
        descripcion_cosv: actividadrealizada,
        tipooperacion_cosv: tipooperacion_otr,
        referencia_cosv: referencia,
        fechainicia_cosv: fechaactual,
        fechafinal_cosv: fechaactual,
        horainiciacosv: horaactual,
        horafinal_cosv: horaactual,
        cantidad_cosv: cantidad,
        valorunitario_cosv: valorunitario,
        valortotal_cosv: resultado,
        servicio_cosv: serviciorealizado,
        observacion_cosv: observacion
        //cumplimientoSeleccionado
      }]);
    }
    setGrabar(true);
  }

  const guardarCambiosCumplimiento = async () => {

    {
     //console.log("DATOS A GRABAR EN CUMPLIMIENTO : ",cumplimientoSeleccionado)
      
      let resultado = (cantidad * valorunitario)
      //Asignar Valores al Estado Cumplimiento
      setCumplimientoSeleccionado([{
        id: cumplimientoSeleccionado.id,
        id_cosv: props.ordenSeleccionado.id_otr,
        descripcion_cosv: cumplimientoSeleccionado.descripcion_cosv,
        tipooperacion_cosv: cumplimientoSeleccionado.tipooperacion_cosv,
        referencia_cosv: cumplimientoSeleccionado.referencia_cosv,
        fechainicia_cosv: fechaactual,
        fechafinal_cosv: fechaactual,
        horainiciacosv: horainicial,
        horafinal_cosv: horafinal,
        cantidad_cosv: cantidad,
        valorunitario_cosv: valorunitario,
        valortotal_cosv: resultado,
        servicio_cosv: cumplimientoSeleccionado.servicio_cosv,
        observacion_cosv: cumplimientoSeleccionado.observacion_cosv
        //cumplimientoSeleccionado
      }]);
    }
    setGrabarCambios(true);
  }


  useEffect(() => {
    async function guardarCambiosCumplimiento() {
      if (grabarCambios) {

        const res = await cumplimientooservServices.update(cumplimientoSeleccionado[0]);

        if (res.success) {
          swal("Orden de Servicio", "Orden de Servicio Actualizada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalActualizarCumplimiento();
        } else {
          swal("Orden de Servicio", "Error Actualizando la Orden de Servicio!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalActualizarCumplimiento();
        }
        setGrabarCambios(false);
        abrirCerrarModalActualizarCumplimiento();
      }
    }
    guardarCambiosCumplimiento();
  }, [grabarCambios])

  useEffect(() => {
    async function grabarCumplimiento() {

      if (grabar) {
        //console.log("VALIDAR DATOS A GRABAR : ",cumplimientoSeleccionado[0])
        
        const res = await cumplimientooservServices.save(cumplimientoSeleccionado[0]);

        if (res.success) {
          swal("Actividades Orden de Servicio", "Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
        } else {
          swal("Actividades Orden de Servicio", "Error registrando la Actividad!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        
        setGrabar(false);
        abrirCerrarModalCumplimiento();
      }
    }
    grabarCumplimiento();
  }, [grabar])

  const cumplimiento = [
    {
      title: 'Actividad',
      field: 'descripcion_inv',
      cellStyle: { minWidth: 300 }
    },
    {
      title: 'Referencia',
      field: 'referencia_inv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Inicia',
      field: 'fechaactualizacion_inv',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Fin',
      field: 'fechaactualizacion_inv',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Tipo Operación',
      field: 'descripcion_tprd',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Descripción',
      field: 'descripcion_tope',
      cellStyle: { minWidth: 200 }
    }
  ]

  const consultacumplimiento = [
    {
      title: 'Id Cumplimiento',
      field: 'id',
      cellStyle: { minWidth: 80 }
    },
    {
      title: 'Actividad',
      field: 'descripcion_cosv',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Referencia',
      field: 'referencia_cosv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Inicia',
      field: 'fechainicia_cosv',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Fin',
      field: 'fechafinal_cosv',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Servicio',
      field: 'servicio_cosv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Observación',
      field: 'observacion_cosv',
      cellStyle: { minWidth: 250 }
    }
  ]

  const CumplimientoOrden = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Registrar Actividades Lista de Chequeo
        </Typography>
        <br />
        <Grid container spacing={2} >
        <Grid item xs={12} md={2}> <TextField name="id" label="Id Cumplimiento" disabled="true"
            defaultValue={idCumplimiento}
            fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={2}> <TextField name="id_cosv" label="# Orden de Servicio" disabled="true"
            defaultValue={id_otr}
            fullWidth onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.id_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="idselecttipooperacion_cosv">Tipo</InputLabel>
              <Select
                disabled="true"
                labelId="selecttipooperacion_cosv"
                name="tipooperacion_cosv"
                id="idselecttipooperacion_cosv"
                defaultValue={tipooperacion_otr}
                onChange={(e) => setTipoOperacion(e.target.value)}
                fullWidth onChange={handleChange}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoOperacion.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tope}>{itemselect.descripcion_tope}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField name="referencia_cosv" label="Referencia Producto"
              defaultValue={referencia_dequ}
              onChange={(e) => setReferencia(e.target.value)}
              fullWidth
              disabled="true"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Actividad Realizada" name="descripcion_cosv"
              value={actividadrealizada}
              onChange={(e) => setActividadrealizada(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="servicio_cosv">Servicio Realizado</InputLabel>
              <Select
                labelId="selectservicio_cosv"
                name="servicio_cosv"
                id="idselectservicio_cosv"
                value={1}
                onChange={(e) => setServicioRealizado(e.target.value)}
              >
                <MenuItem value="1"> Cambiado </MenuItem>
                <MenuItem value="2"> Revisado </MenuItem>
                <MenuItem value="3"> Limpiar </MenuItem>
                <MenuItem value="4"> Reparar </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechaactual).format('YYYY-MM-DD')}
            label="Fecha Inicia Actividad" fullWidth
            value={fechaactual}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechaactual).format('YYYY-MM-DD')}
            label="Fecha Finaliza Actividad" fullWidth
            value={fechaactual}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horainiciacosv"
            label="Hora Inicia Actividad" fullWidth
            defaultValue={Moment(inventariosSeleccionado.horaactual).format('HH:mm:ss')}
            value={horaactual}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horafinal_cosv"
            label="Hora Final Actividad" fullWidth
            defaultValue={Moment(inventariosSeleccionado.horaactual).format('HH:mm:ss')}
            value={horaactual}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Observación" name="observacion_cosv"
              onChange={(e) => setObservacion(e.target.value)}  />
          </Grid>
        </Grid>
        <br />
        <div align="right">
          <Button color="primary" onClick={() => adicionarCumplimiento()} >Guardar</Button>
          <Button onClick={() => abrirCerrarModalCumplimiento()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const actualizarCumplimiento = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Actualizar Cumplimiento
      </Typography>
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={2}>
            <TextField name="id" label="Id Cumplimiento" disabled="true"
              defaultValue={cumplimientoSeleccionado.id}
              fullWidth onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.id} />
          </Grid>
          <Grid item xs={12} md={2}> <TextField name="id_cosv" label="# Orden de Servicio" disabled="true"
            defaultValue={id_otr}
            fullWidth onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.id_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="idselecttipooperacion_cosv">Tipo</InputLabel>
              <Select
                disabled="true"
                labelId="selecttipooperacion_cosv"
                name="tipooperacion_cosv"
                id="idselecttipooperacion_cosv"
                value={tipooperacion}
                onChange={(e) => setOperario(e.target.value)}
                fullWidth onChange={handleChange}
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.tipooperacion_cosv}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoOperacion.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tope}>{itemselect.descripcion_tope}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField name="referencia_cosv" label="Referencia Producto"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              fullWidth
              disabled="true"
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.referencia_cosv}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Actividad Realizada" name="descripcion_cosv"
              value={actividadrealizada}
              onChange={(e) => setActividadrealizada(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="servicio_cosv">Servicio Realizado</InputLabel>
              <Select
                labelId="selectservicio_cosv"
                name="servicio_cosv"
                id="idselectservicio_cosv"
                value={1}
                onChange={(e) => setServicioRealizado(e.target.value)}
              >
                <MenuItem value="1"> Cambiado </MenuItem>
                <MenuItem value="2"> Revisado </MenuItem>
                <MenuItem value="3"> Limpiar </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechaactual).format('YYYY-MM-DD')}
            label="Fecha Inicia Actividad" fullWidth value={fechaactual} onChange={(e) => setFechainicial(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechaactual).format('YYYY-MM-DD')}
            label="Fecha Finaliza Actividad" fullWidth value={fechaactual} onChange={(e) => setFechafinal(e.target.value)}  />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horainiciacosv"
            label="Hora Inicia Actividad" fullWidth defaultValue={Moment(inventariosSeleccionado.horaactual).format('HH:mm:ss')}
            value={horaactual} onChange={(e) => ssetHorainicial(e.target.value)}  />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horafinal_cosv"
            label="Hora Final Actividad" fullWidth defaultValue={Moment(inventariosSeleccionado.horaactual).format('HH:mm:ss')}
            value={horaactual} onChange={(e) => setHorafinal(e.target.value)}  />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className={styles.inputMaterial} label="Observaciones o Comentarios" name="observacion_cosv"
              value={observacion} onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.observacion_cosv} />
          </Grid>
        </Grid>
        <br />
        <div align="right">
          <Button color="primary" onClick={() => guardarCambiosCumplimiento()} >Guardar</Button>
          <Button onClick={() => abrirCerrarModalActualizarCumplimiento()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const RevisarCumplimiento = (
    <div className={styles.modalcumplimiento}>
      <br />
      <MaterialTable
        columns={consultacumplimiento}
        data={listUnCumplimiento}
        title="CONSULTA CUMPLIMIENTO ORDEN DE SERVICIO"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Item',
            onClick: (event, rowData) => seleccionarCumplimiento(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Eliminar Item',
            onClick  : (event, rowData) =>   seleccionarCumplimiento(rowData, "Eliminar")
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
      />
    </div>
  )

  const CerrarOrden = (
    <div className={styles.modal}>
      <p>Estás seguro que desea Cerrar la Orden de Servicio <b> {id_otr} </b>? </p>
      <div align="right">
        <Button color="secondary"> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalCerrarOrden()}> Cancelar </Button>
      </div>
    </div>
  )
  // onClick={() => borrarLineaProducto()}

  // <Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => leerOrdenes()} >Todas las Ordenes</Button>
  return (
    <div className="App">
      <br />
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        ORDEN DE SERVICIO # {props.ordenSeleccionado.id_otr}
      </Typography>

      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button>EMPRESA : {nombre_emp} </Button>
        <Button>CLIENTE : {razonsocial_cli} </Button>
        <Button>TELEFONO : {telefono_cli} </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >CONTACTO : XXXXXXXXXXXXXXXXXXXXXXXXXX </Button>
        <Button >CIUDAD : {nombre_ciu} </Button>
        <Button >CORREO : {email_cli} </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >MARCA : {descripcion_mar} </Button>
        <Button >MODELO : {modelo_dequ} </Button>
        <Button >FECHA : {fechainicia_otr} </Button>
      </ButtonGroup>
      <ButtonGroup className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >SERIE : {serie_dequ}  </Button>
        <Button >ID INTERNO : {codigo_equ}  </Button>
        <Button >HOROMETRO : XX </Button>
      </ButtonGroup>
      <ButtonGroup className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >TIPO DE SERVICIO : {descripcion_tser} </Button>
        <Button >TIPO DE ACTIVIDAD : {descripcion_tmt}  </Button>
      </ButtonGroup>  
      <div>
        {
          activo ? (
            <div>
              <Button className={styles.button2} onClick={() => consultarCumplimiento()} >Revisar Cumplimiento </Button>
              <Button className={styles.button3} onClick={() => abrirCerrarModalCerrarOrden()} >Cerrar Orden </Button>
            </div>

          )
            :
            (
              <div>
                <Typography align="center" className={styles.typography2} variant="button" display="block" >
                  No hay Registros de Actividades a la Orden # {props.ordenSeleccionado.id_otr}
                </Typography>
              </div>
            )
        }
      </div>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Dar Click sobre el Item que quieres agregar al Cumplimiento de la Orden de Servicio
      </Typography>
      {
        tipooperacion === 3 ?
          (
            <MaterialTable
              columns={cumplimiento}
              data={listChequeoEntrega}
              title="ACTIVIDADES CHEQUEO ENTREGA"
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Editar Item',
                  onClick: (event, rowData) => seleccionarInventarios(rowData, "Editar")
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
            />
          )
          :
          (
            <MaterialTable
              columns={cumplimiento}
              data={listChequeoRecepcion}
              title="ACTIVIDADES CHEQUEO RECEPCION"
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Editar Item',
                  onClick: (event, rowData) => seleccionarInventarios(rowData, "Editar")
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
            />

          )
      }
    
      <Modal
        open={modalCumplimiento}
        onClose={abrirCerrarModalCumplimiento}
      >
        {CumplimientoOrden}
      </Modal>

      <Modal
        open={modalRevisarCumplimiento}
        onClose={abrirCerrarModalRevisarCumplimiento}
      >
        {RevisarCumplimiento}
      </Modal>

      <Modal
        open={modalCerrarOrden}
        onClose={abrirCerrarModalCerrarOrden}
      >
        {CerrarOrden}
      </Modal>

      <Modal
        open={modalActualizarCumplimiento}
        onClose={abrirCerrarModalActualizarCumplimiento}
      >
        {actualizarCumplimiento}
      </Modal>

    </div>
  );
}

export default ActividadesOservChequeo;

