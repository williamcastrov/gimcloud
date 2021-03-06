import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import empresasServices from "../../../services/Empresa";
import estadosServices from "../../../services/Parameters/Estados";
import marcasServices from "../../../services/Mantenimiento/Marcas";
import frecuenciasServices from "../../../services/Mantenimiento/Frecuencias";
import propietariosServices from "../../../services/Interlocutores/Proveedores";
import gruposequiposServices from "../../../services/Mantenimiento/GruposEquipos";
import subgruposequiposServices from "../../../services/Mantenimiento/SubGruposPartes";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import estadosclientesServices from "../../../services/Mantenimiento/EstadosClientes";
import estadosmttoServices from "../../../services/Mantenimiento/EstadosMtto";

// Datos Adicionales de los Equipos
import MenuEquipos from "../../DatosEquipos/MenuEquipos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 700,
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
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
  },
  formControlEstados: {
    margin: theme.spacing(0),
    minWidth: 200,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    margin: 0,
    top: 'auto',
    left: 20,
    bottom: 20,
    right: 'auto',
    position: 'fixed',
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

function Accesorios() {
  const styles = useStyles();
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarSubEquipos, setListarSubEquipos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);

  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEstadosClientes, setListarEstadosClientes] = useState([]);
  const [listarEstadosMtto, setListarEstadosMtto] = useState([]);
  const [listarFrecuencias, setListarFrecuencias] = useState([]);
  const [listarPropietarios, setListarPropietarios] = useState([]);
  const [listarMarcas, setListarMarcas] = useState([]);
  const [listarGruposEquipos, setListarGruposEquipos] = useState([]);
  const [listarSubGruposEquipos, setListarSubGruposEquipos] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [actualiza, setActualiza] = useState(false);
  const [equiposSeleccionado, setEquiposSeleccionado] = useState({
    'id_equ': "",
    'codigo_equ': "",
    'tipo_equ': "ACM",
    'descripcion_equ': "",
    'empresa_equ': "",
    'frecuencia_equ': 1,
    'propietario_equ': "",
    'marca_equ': "",
    'antiguedad_equ': "",
    'grupoequipo_equ': "",
    'subgrupoparte_equ': "",
    'valoradquisicion_equ': "",
    'estadocontable_equ': "",
    'estadocliente_equ': "",
    'estadomtto_equ': "",
    'ctacontable_equ': ""
  })

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquiposAccesorios();
      setListarEquipos(res.data);
      setActualiza(false);
      //console.log(res.data)
    }
    fetchDataEquipos();
  }, [actualiza])
/*
  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquipos();
      setListarSubEquipos(res.equipo);
      console.log(res.equipo)
    }
    fetchDataEquipos();
  }, [])
*/
  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataEstadosClientes() {
      const res = await estadosclientesServices.listEstadosClientes();
      setListarEstadosClientes(res.data)
      //console.log(res.data);
    }
    fetchDataEstadosClientes();
  }, [])

  useEffect(() => {
    async function fetchDataEstadosMtto() {
      const res = await estadosmttoServices.listEstadosMtto();
      setListarEstadosMtto(res.data)
      //console.log(res.data);
    }
    fetchDataEstadosMtto();
  }, [])

  useEffect(() => {
    async function fetchDataFrecuencias() {
      const res = await frecuenciasServices.listFrecuencias();
      setListarFrecuencias(res.data)
      //console.log(res.data);
    }
    fetchDataFrecuencias();
  }, [])

  useEffect(() => {
    async function fetchDataPropietarios() {
      const res = await propietariosServices.listProveedores();
      setListarPropietarios(res.data)
      //console.log(res.data);
    }
    fetchDataPropietarios();
  }, [])

  useEffect(() => {
    async function fetchDataMarcas() {
      const res = await marcasServices.listMarcas();
      setListarMarcas(res.data)
      //console.log(res.data);
    }
    fetchDataMarcas();
  }, [])

  useEffect(() => {
    async function fetchDataGruposEquipos() {
      const res = await gruposequiposServices.listGruposequipos();
      setListarGruposEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataGruposEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataSubGruposEquipos() {
      const res = await subgruposequiposServices.listSubGrupospartescomponentes();
      setListarSubGruposEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataSubGruposEquipos();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setEquiposSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEquipo = (equipo, caso) => {
    setEquiposSeleccionado(equipo);
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

  const grabarEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!equiposSeleccionado.codigo_equ) {
      errors.codigo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.descripcion_equ) {
      errors.descripcion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.empresa_equ) {
      errors.empresa_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.frecuencia_equ) {
      errors.frecuencia_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.propietario_equ) {
      errors.propietario_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.marca_equ) {
      errors.marca_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.antiguedad_equ) {
      errors.antiguedad_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.grupoequipo_equ) {
      errors.grupoequipo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.subgrupoparte_equ) {
      errors.subgrupoparte_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.valoradquisicion_equ) {
      errors.valoradquisicion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estadocontable_equ) {
      errors.estadocontable_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estadocliente_equ) {
      errors.estadocliente_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estadomtto_equ) {
      errors.estadomtto_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.ctacontable_equ) {
      errors.ctacontable_equ = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(equiposSeleccionado);
      const res = await equiposServices.save(equiposSeleccionado);

      if (res.success) {
        swal("Equipo", "Equipo Creado de forma Correcta!", "success", { button: "Aceptar" });
        //console.log(res.message)
        abrirCerrarModalInsertar();
        delete equiposSeleccionado.codigo_equ;
        delete equiposSeleccionado.descripcion_equ;
        delete equiposSeleccionado.empresa_equ;
        delete equiposSeleccionado.frecuencia_equ;
        delete equiposSeleccionado.propietario_equ;
        delete equiposSeleccionado.marca_equ;
        delete equiposSeleccionado.antiguedad_equ;
        delete equiposSeleccionado.grupoequipo_equ;
        delete equiposSeleccionado.subgrupoparte_equ;
        delete equiposSeleccionado.valoradquisicion_equ;
        delete equiposSeleccionado.estadocontable_equ;
        delete equiposSeleccionado.estadocliente_equ;
        delete equiposSeleccionado.estadomtto_equ;
        delete equiposSeleccionado.ctacontable_equ;
      } else {
        swal("Equipo", "Error Creando el Equipo!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Equipo", "Debe Ingresar Todos los Datos, Error Creando el Equipo!", "warning", { button: "Aceptar" });
      console.log(equiposSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!equiposSeleccionado.codigo_equ) {
      errors.codigo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.descripcion_equ) {
      errors.descripcion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.empresa_equ) {
      errors.empresa_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.frecuencia_equ) {
      errors.frecuencia_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.propietario_equ) {
      errors.propietario_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.marca_equ) {
      errors.marca_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.antiguedad_equ) {
      errors.antiguedad_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.grupoequipo_equ) {
      errors.grupoequipo_equ = true;
      formOk = false;
    }
    
    if (!equiposSeleccionado.subgrupoparte_equ) {
      errors.subgrupoparte_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.valoradquisicion_equ) {
      errors.valoradquisicion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estadocontable_equ) {
      errors.estadocontable_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estadocliente_equ) {
      errors.estadocliente_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estadomtto_equ) {
      errors.estadomtto_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.ctacontable_equ) {
      errors.ctacontable_equ = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(equiposSeleccionado.codigo_equ);
      const res = await equiposServices.update(equiposSeleccionado);

      if (res.success) {
        swal("Equipo", "Equipo Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete equiposSeleccionado.codigo_equ;
        delete equiposSeleccionado.descripcion_equ;
        delete equiposSeleccionado.empresa_equ;
        delete equiposSeleccionado.frecuencia_equ;
        delete equiposSeleccionado.propietario_equ;
        delete equiposSeleccionado.marca_equ;
        delete equiposSeleccionado.antiguedad_equ;
        delete equiposSeleccionado.grupoequipo_equ;
        delete equiposSeleccionado.subgrupoparte_equ;
        delete equiposSeleccionado.valoradquisicion_equ;
        delete equiposSeleccionado.estadocontable_equ;
        delete equiposSeleccionado.estadocliente_equ;
        delete equiposSeleccionado.estadomtto_equ;
        delete equiposSeleccionado.ctacontable_equ;
      } else {
        swal("Equipo", "Error Actualizando el Equipo!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Equipo", "Debe Ingresar Todos los Datos, Error Actualizando el Equipo!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarEquipo = async () => {

    const res = await equiposServices.delete(equiposSeleccionado.id_equ);

    if (res.success) {
      swal("Equipo", "Equipo Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Equipo", "Error Borrando el Equipo!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'codigo_equ',
      title: 'Codigo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'descripcion_equ',
      title: 'Descripci??n  del Componente',
      cellStyle: { minWidth: 220 }
    },
    {
      field: 'nombre_emp',
      title: 'Propietario',
      cellStyle: { minWidth: 150 }
    },
    {
      field: 'razonsocial_int',
      title: 'Nombre del Cliente',
      cellStyle: { minWidth: 150 }
    },
    {
      field: 'descripcion_mar',
      title: 'Marca del Equipo'
    },
    {
      field: 'antiguedad_equ',
      title: 'Antiguedad A??os',
      cellStyle: { width: 10, maxWidth: 10 },
      headerStyle: { width: 10, maxWidth: 10 }

    },
    {
      field: 'codigogrupo_grp',
      title: 'Grupo Equipo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'descripcion_grp',
      title: 'Descripci??n del Grupo del Equipo',
      cellStyle: { minWidth: 180 }
    },
    {
      field: 'valoradquisicion_equ',
      title: 'Valor de Compra',
    }
  ]

  const equipoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block"> Agregar Nuevo Componente </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="codigo_equ" label="Codigo Componente"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}> <TextField name="descripcion_equ" label="Descripci??n del Componente"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_equ"
              id="idselectEmpresa"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectPropietario">Propietario</InputLabel>
            <Select
              labelId="selectPropietario"
              name="propietario_equ"
              id="idselectPropietario"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarPropietarios.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectGrupoEquipo">Grupos del Componente</InputLabel>
            <Select
              labelId="selectGrupoEquipo"
              name="grupoequipo_equ"
              id="idselectGrupoEquipo"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_grp}>{itemselect.descripcion_grp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectSubGrupoParte">SubGrupo Componente</InputLabel>
            <Select
              labelId="selectSubGrupoParte"
              name="subgrupoparte_equ"
              id="idselectSubGrupoParte"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarSubGruposEquipos && listarSubGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_sgre}>{itemselect.descripcion_sgre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectMarca">Marca</InputLabel>
            <Select
              labelId="selectMarca"
              name="marca_equ"
              id="idselectMarca"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarMarcas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_mar}>{itemselect.descripcion_mar}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="antiguedad_equ" label="Antiguedad" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={4}> <TextField name="ctacontable_equ" label="Cuenta Contable" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valoradquisicion_equ" label="Valor de Compra" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoContable">Estado en Contabilidad</InputLabel>
            <Select
              labelId="selectEstadoContable"
              name="estadocontable_equ"
              id="idselectEstadoContable"
              fullWidth
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
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoCliente">Estado del Cliente</InputLabel>
            <Select
              labelId="selectEstadoCliente"
              name="estadocliente_equ"
              id="idselectEstadoCliente"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estcli}>{itemselect.nombre_estcli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoMtto">Estado de Mantenimiento</InputLabel>
            <Select
              labelId="selectEstadoMtto"
              name="estadomtto_equ"
              id="idselectEstadoMantenimiento"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosMtto.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estmtto}>{itemselect.nombre_estmtto}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => grabarEquipo()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const equipoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" > Actualizar Componente </Typography>
      <Grid container spacing={2} >
      <Grid item xs={12} md={6}> <TextField name="codigo_equ" label="Codigo Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.codigo_equ}  />
        </Grid>
        <Grid item xs={12} md={12}> <TextField name="descripcion_equ" label="Descripci??n del Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.descripcion_equ} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_equ"
              id="idselectEmpresa"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.empresa_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectPropietario">Propietario</InputLabel>
            <Select
              labelId="selectPropietario"
              name="propietario_equ"
              id="idselectPropietario"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.propietario_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarPropietarios.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectGrupoEquipo">Grupos de Equipos</InputLabel>
            <Select
              labelId="selectGrupoEquipo"
              name="grupoequipo_equ"
              id="idselectGrupoEquipo"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.grupoequipo_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_grp}>{itemselect.descripcion_grp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectSubGrupoParte">SubGrupo Equipo</InputLabel>
            <Select
              labelId="selectSubGrupoParte"
              name="subgrupoparte_equ"
              id="idselectSubGrupoParte"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.subgrupoparte_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarSubGruposEquipos && listarSubGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_sgre}>{itemselect.descripcion_sgre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectMarca">Marca</InputLabel>
            <Select
              labelId="selectMarca"
              name="marca_equ"
              id="idselectMarca"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.marca_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarMarcas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_mar}>{itemselect.descripcion_mar}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}> 
            <TextField name="antiguedad_equ" label="Antiguedad" fullWidth onChange={handleChange} 
                      value={equiposSeleccionado && equiposSeleccionado.antiguedad_equ} /> 
        </Grid>
        <Grid item xs={12} md={4}> 
            <TextField name="ctacontable_equ" label="Cuenta Contable" fullWidth onChange={handleChange} 
                         value={equiposSeleccionado && equiposSeleccionado.ctacontable_equ} /> 
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valoradquisicion_equ" label="Valor de Compra" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.valoradquisicion_equ}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoContable">Estado en Contabilidad</InputLabel>
            <Select
              labelId="selectEstadoContable"
              name="estadocontable_equ"
              id="idselectEstadoContable"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadocontable_equ}
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
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoCliente">Estado del Cliente</InputLabel>
            <Select
              labelId="selectEstadoCliente"
              name="estadocliente_equ"
              id="idselectEstadoCliente"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadocliente_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estcli}>{itemselect.nombre_estcli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoMtto">Estado de Mantenimiento</InputLabel>
            <Select
              labelId="selectEstadoMtto"
              name="estadomtto_equ"
              id="idselectEstadoMantenimiento"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadomtto_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosMtto.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estmtto}>{itemselect.nombre_estmtto}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarEquipo()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
     
    </div>
  )
  // Al ser un accesorio no se controlan los datos adicionales
  // <MenuEquipos equipoID={equiposSeleccionado.id_equ} equipoCodigo={equiposSeleccionado.codigo_equ} />

  const equipoEliminar = (
    <div className={styles.modal}>
      <p>Est??s seguro que deseas eliminar el Equipo <b>{equiposSeleccionado && equiposSeleccionado.descripcion_equ}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarEquipo()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Componente</Button>
      <MaterialTable
        columns={columnas}
        data={listarEquipos}
        title="COMPONENTES ADICIONALES A EQUIPOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Componente',
            onClick: (event, rowData) => seleccionarEquipo(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Componente',
            onClick: (event, rowData) => seleccionarEquipo(rowData, "Eliminar")
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
        detailPanel={[
          {
            tooltip: 'Estados del Equipo',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#0277bd',
                  }}
                >
                  <Button variant="contained">Estado Contable : {rowData.nombre_est}</Button> {}
                  <Button variant="contained">Estado Cliente  : {rowData.nombre_estcli}</Button> {}
                  <Button variant="contained">Estado Mantenimiento :{rowData.nombre_estmtto}</Button>
                </div>
              )
            },
          },
        ]}
      />
      {}
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {equipoInsertar}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {equipoEditar}
      </Modal>
      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {equipoEliminar}
      </Modal>
    </div>
  );
}

export default Accesorios;

/*
  <Fab variant="extended">
        <NavigationIcon className={styles.extendedIcon} />
        Datos Adicionales Equipos
        onClick
      </Fab>
*/