import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { blue, blueGrey, red } from '@material-ui/core/colors';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';
import Moment from 'moment';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import shortid from "shortid";

// Componentes de Conexion con el Backend
import inventariosServices from "../../../services/Almacenes/Inventarios";
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
  typography2: {
    fontSize: 16,
    color: "#f44336"
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[200]),
    margin: theme.spacing(1),
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
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[900],
    },
  },
  button3: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: red[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: red[700],
    },
  },
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

function ActividadesOserv(props) {
  const { id_otr, nombre_emp, razonsocial_cli, telefono_cli, nombre_ciu, email_cli, descripcion_mar, modelo_dequ,
    fechainicia_otr, descripcion_tser, descripcion_tmt, serie_dequ, codigo_equ, descripcion_con } = props.ordenSeleccionado;

  const styles = useStyles();
  const [listInventarios, setListInventarios] = useState([]);
  const [listUnCumplimiento, setListUnCumplimiento] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminarActividad, setModalEliminarActividad] = useState(false);
  const [modalCumplimiento, setModalCumplimiento] = useState(false);
  const [modalActualizarCumplimiento, setModalActualizarCumplimiento] = useState(false);
  const [modalCerrarOrden, setModalCerrarOrden] = useState(false);
  const [modalRevisarCumplimiento, setModalRevisarCumplimiento] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarTipoOperacion, setListarTipoOperacion] = useState([]);
  const [grabar, setGrabar] = React.useState(false);
  const [grabarCambios, setGrabarCambios] = React.useState(false);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [activo, setActivo] = useState(false);

  const [idCumplimiento, setIdCumplimiento] = useState(0);
  const [tipooperacion, setTipoOperacion] = useState(0);
  const [referencia, setReferencia] = useState(0);
  const [actividadrealizada, setActividadrealizada] = useState(0);
  const [fechainicial, setFechainicial] = useState(fechaactual);
  const [fechafinal, setFechafinal] = useState(fechaactual);
  const [horainicial, setHorainicial] = useState(horaactual);
  const [horafinal, setHorafinal] = useState(horaactual);
  const [cantidad, setCantidad] = useState(0);
  const [valorunitario, setValorunitario] = useState(0);
  const [valortotal, setValortotal] = useState(0);
  const [serviciorealizado, setServicioRealizado] = useState(0);
  const [observacion, setObservacion] = useState(0);

  const [inventariosSeleccionado, setInventariosSeleccionado] = useState([]);

  const [cumplimientoSeleccionado, setCumplimientoSeleccionado] = useState({
    id: "",
    id_cosv: "",
    descripcion_cosv: "",
    tipooperacion_cosv: "",
    referencia_cosv: "",
    fechainicia_cosv: "",
    fechafinal_cosv: "",
    horainiciacosv: "",
    horafinal_cosv: "",
    cantidad_cosv: "",
    valorunitario_cosv: "",
    valortotal_cosv: "",
    servicio_cosv: "",
    observacion_cosv: ""
  });

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

  const seleccionarCumplimiento = (cumplimiento, caso) => {
    console.log(cumplimiento)
    setCumplimientoSeleccionado(cumplimiento);
    (caso === "Editar") ? abrirCerrarModalActualizarCumplimiento() : abrirCerrarModalEliminarActividad()
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEliminarActividad = () => {
    setModalEliminarActividad(!modalEliminarActividad);
  }

  const abrirCerrarModalCumplimiento = () => {
    setModalCumplimiento(!modalCumplimiento);
  }

  const abrirCerrarModalActualizarCumplimiento = () => {
    setModalActualizarCumplimiento(!modalActualizarCumplimiento);
  }

  const consultarCumplimiento = () => {
    async function fetchDataUnCumplimiento() {
      const res = await cumplimientooservServices.listUnCumplimiento(id_otr);
      setListUnCumplimiento(res.data);
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

  const grabarCumplimiento = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    {
      let resultado = (cantidad * valorunitario)
      //Asignar Valores al Estado Cumplimiento
      setCumplimientoSeleccionado([{
        id: idCumplimiento,
        id_cosv: props.ordenSeleccionado.id_otr,
        descripcion_cosv: actividadrealizada,
        tipooperacion_cosv: tipooperacion,
        referencia_cosv: referencia,
        fechainicia_cosv: fechaactual,
        fechafinal_cosv: fechaactual,
        horainiciacosv: horainicial,
        horafinal_cosv: horafinal,
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
      let resultado = (cumplimientoSeleccionado.cantidad_cosv * cumplimientoSeleccionado.valorunitario_cosv)
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
        cantidad_cosv: cumplimientoSeleccionado.cantidad_cosv,
        valorunitario_cosv: cumplimientoSeleccionado.valorunitario_cosv,
        valortotal_cosv: resultado,
        servicio_cosv: cumplimientoSeleccionado.servicio_cosv,
        observacion_cosv: cumplimientoSeleccionado.observacion_cosv
        //cumplimientoSeleccionado
      }]);
    }
    setGrabarCambios(true);
  }

  const borraActividadOrden = async()=>{

    const res = await cumplimientooservServices.delete(cumplimientoSeleccionado.id);

    if (res.success) {
        swal( "Actividad de la Orden", "Borrada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal( "Actividad de la Orden", "Error Borrando Actividad de la Orden!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
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
        abrirCerrarModalCumplimiento();
      }
    }
    guardarCambiosCumplimiento();
  }, [grabarCambios])

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    //console.log(string, results)
  }

  useEffect(() => {
    async function grabarCumplimiento() {

      if (grabar) {
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

  const handleOnSelect = (item) => {
    // the item selected
    {
      setIdCumplimiento(shortid());
      setTipoOperacion(item.tipooperacion_inv);
      setReferencia(item.referencia_inv);
      setActividadrealizada(item.descripcion_inv);
      setFechainicial(fechaactual);
      setFechafinal(fechaactual);
      setHorainicial(horaactual);
      setHorafinal(horaactual);
      setCantidad(0);
      setValorunitario(item.costounitponderado_inv);
      setValortotal(0);

      //item.map((asignar) => (
      setCumplimientoSeleccionado([{
        id: idCumplimiento,
        id_cosv: id_otr,
        descripcion_cosv: item.descripcion_inv,
        tipooperacion_cosv: item.tipooperacion_inv,
        referencia_cosv: item.referencia_inv,
        fechainicia_cosv: fechaactual,
        fechafinal_cosv: fechaactual,
        horainiciacosv: horaactual,
        horafinal_cosv: horaactual,
        cantidad_cosv: 0,
        valorunitario_cosv: item.costounitponderado_inv,
        valortotal_cosv: 0,
        servicio_cosv: 1,
        observacion_cosv: observacion
        //cumplimientoSeleccionado
      }]);
    }
    abrirCerrarModalCumplimiento();
  };

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const cumplimiento = [
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
      title: 'Cantidad',
      field: 'cantidad_cosv',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Valor Unitario',
      field: 'valorunitario_cosv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Valor Total',
      field: 'valortotal_cosv',
      cellStyle: { minWidth: 100 }
    }
  ]

  const CumplimientoOrden = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Registrar Actividad a la Orden de Servicio
        </Typography>
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={2}>
            <TextField name="id" label="Id Cumplimiento" disabled="true"
              defaultValue={idCumplimiento}
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
            label="Fecha Inicia Actividad" fullWidth
            value={fechainicial}
            onChange={(e) => setFechainicial(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechaactual).format('YYYY-MM-DD')}
            label="Fecha Finaliza Actividad" fullWidth
            value={fechafinal}
            onChange={(e) => setFechafinal(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horainiciacosv"
            label="Hora Inicia Actividad" fullWidth
            defaultValue={Moment(inventariosSeleccionado.horaactual).format('HH:mm:ss')}
            value={horainicial}
            onChange={(e) => setHorainicial(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horafinal_cosv"
            label="Hora Final Actividad" fullWidth
            defaultValue={Moment(inventariosSeleccionado.horaactual).format('HH:mm:ss')}
            value={horafinal}
            onChange={(e) => setHorafinal(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="cantidad_cosv" InputLabelProps={{ shrink: true }}
              value={cantidad} onChange={(e) => setCantidad(e.target.value)} label="Cantidad" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="valorunitario_cosv" label="Valor Unitario" fullWidth
              InputLabelProps={{ shrink: true }}  InputProps={{ inputComponent: NumberFormatCustom, }}
              value={valorunitario} onChange={(e) => setValorunitario(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} type="numeric" name="valortotal_cosv" label="Valor Total"
              InputLabelProps={{ shrink: true }} fullWidt />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className={styles.inputMaterial} label="Observaciones o Comentarios" name="observacion_cosv"
              value={observacion} onChange={(e) => setObservacion(e.target.value)} />
          </Grid>
        </Grid>
        <br />
        <div align="right">
          <Button color="primary" onClick={() => grabarCumplimiento()} >Guardar</Button>
          <Button onClick={() => abrirCerrarModalCumplimiento()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  /*
 <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} type="numeric" name="valorunitario_cosv" label="Valor Unitario" fullWidth
              InputLabelProps={{ shrink: true }} value={valorunitario} onChange={(e) => setValorunitario(e.target.value)}
            />
          </Grid>
         
  */

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
              defaultValue={idCumplimiento}
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
              value={actividadrealizada} onChange={handleChange}
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.descripcion_cosv} />
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
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="cantidad_cosv" InputLabelProps={{ shrink: true }}  
              value={cantidad} onChange={handleChange} label="Cantidad" fullWidth
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.cantidad_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="valorunitario_cosv" label="Valor Unitario" fullWidth
              InputLabelProps={{ shrink: true }} value={valorunitario} InputProps={{ inputComponent: NumberFormatCustom, }}
              onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.valorunitario_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} type="numeric" name="valortotal_cosv" label="Valor Total"
              InputLabelProps={{ shrink: true }} fullWidt InputProps={{ inputComponent: NumberFormatCustom, }}
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.valortotal_cosv} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className={styles.inputMaterial} label="Observaciones o Comentarios" name="observacion_cosv"
              value={observacion} onChange={handleChange} 
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.observacion_cosv} />
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
        columns={cumplimiento}
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
          actionsColumnIndex: -1,
          exportButton: true
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

  const ActividadEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Cumplimiento de la Orden <b>{cumplimientoSeleccionado && cumplimientoSeleccionado.id}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borraActividadOrden() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminarActividad()}> Cancelar </Button>
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
        <Button >TIPO DE SERVICIO : {descripcion_tser} </Button>
        <Button >TIPO DE ACTIVIDAD : {descripcion_tmt}  </Button>
      </ButtonGroup>
      <ButtonGroup className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >SERIE : {serie_dequ}  </Button>
        <Button >ID INTERNO : {codigo_equ}  </Button>
        <Button >HOROMETRO : XX </Button>
      </ButtonGroup>

      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Dar Click sobre el Item que quieres agregar al Cumplimiento de la Orden de Servicio
      </Typography>

      <div style={{ placeholderColor: "grey" }}>
        <ReactSearchAutocomplete
          fuseOptions={{ keys: ["descripcion_inv", "descripcion_inv"] }}
          resultStringKeyName="descripcion_inv"
          items={listInventarios}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
        />
      </div>
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

      <Modal
        open={modalEliminarActividad}
        onClose={abrirCerrarModalEliminarActividad}
      >
        {ActividadEliminar}
      </Modal>

    </div>
  );
}

export default ActividadesOserv;

