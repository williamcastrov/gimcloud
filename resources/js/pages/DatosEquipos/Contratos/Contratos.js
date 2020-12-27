import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Box, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

// Componentes de Conexion con el Backend
import contratosServices from "../../../services/DatosEquipos/Contratos";
import estadosServices from "../../../services/Parameters/Estados";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import clientesServices from "../../../services/Interlocutores/Clientes";
import empleadosServices from "../../../services/Interlocutores/Empleados";

//Estilos
import "../../Mantenimiento/Equipos/Equipos.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 750,
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
    minWidth: 300,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 640,
  }
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
      prefix={'$'}
    />
  );
}

function Contratos(props) {
  const { equipoID, equipoCodigo } = props;
  //console.log(equipoCodigo);

  //const valorcontrato_ctr = 1480900123.9898

  const styles = useStyles();
  const [listContratos, setListContratos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarEmpleados, setListarEmpleados] = useState([]);

  const [contratoSeleccionado, setContratoSeleccionado] = useState({
    'id_ctr': equipoID,
    'codigocontrato_ctr': "",
    'cliente_ctr': "",
    'asesorcomercial_ctr': "",
    'duracion_ctr': "",
    'fechainicio_ctr': "",
    'fechafinal_ctr': "",
    'ciudad_ctr': "",
    'valorcontrato_ctr': 0,
    'estado_ctr': "",
    'observacion_ctr': ""
  })

  useEffect(() => {
    async function fetchDataContratos() {
      const res = await contratosServices.listUnContrato(equipoID);
      setListContratos(res.data);
    }
    fetchDataContratos();
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
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquipos();
      setListarEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      console.log(res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataEmpleados() {
      const res = await empleadosServices.listEmpleados();
      setListarEmpleados(res.data)
      //console.log(res.data);
    }
    fetchDataEmpleados();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setContratoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarContratos = (contrato, caso) => {
    setContratoSeleccionado(contrato);
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

  const grabarContrato = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!contratoSeleccionado.id_ctr) {
      errors.id_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.codigocontrato_ctr) {
      errors.codigocontrato_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.cliente_ctr) {
      errors.cliente_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.asesorcomercial_ctr) {
      errors.asesorcomercial_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.duracion_ctr) {
      errors.duracion_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.fechainicio_ctr) {
      errors.fechainicio_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.fechafinal_ctr) {
      errors.fechafinal_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.ciudad_ctr) {
      errors.ciudad_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.valorcontrato_ctr) {
      errors.valorcontrato_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.estado_ctr) {
      errors.estado_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.observacion_ctr) {
      errors.observacion_ctr = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(contratoSeleccionado);
      const res = await contratosServices.save(contratoSeleccionado);

      if (res.success) {
        alert("Contrato del Equipo Creado de forma Correcta")
        //console.log(res.message)
        abrirCerrarModalInsertar();
        delete contratoSeleccionado.id_ctr;
        delete contratoSeleccionado.codigocontrato_ctr;
        delete contratoSeleccionado.cliente_ctr;
        delete contratoSeleccionado.asesorcomercial_ctr;
        delete contratoSeleccionado.duracion_ctr;
        delete contratoSeleccionado.fechainicio_ctr;
        delete contratoSeleccionado.fechafinal_ctr;
        delete contratoSeleccionado.ciudad_ctr;
        delete contratoSeleccionado.valorcontrato_ctr;
        delete contratoSeleccionado.estado_ctr;
        delete contratoSeleccionado.observacion_ctr;
      } else {
        alert("Error Creando Contrato del Equipo");
        console.log(res.success);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando Contrato del Equipo");
      //console.log(contratoSeleccionado);
      //console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarContrato = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!contratoSeleccionado.id_ctr) {
      errors.id_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.codigocontrato_ctr) {
      errors.codigocontrato_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.cliente_ctr) {
      errors.cliente_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.asesorcomercial_ctr) {
      errors.asesorcomercial_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.duracion_ctr) {
      errors.duracion_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.fechainicio_ctr) {
      errors.fechainicio_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.fechafinal_ctr) {
      errors.fechafinal_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.ciudad_ctr) {
      errors.ciudad_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.valorcontrato_ctr) {
      errors.valorcontrato_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.estado_ctr) {
      errors.estado_ctr = true;
      formOk = false;
    }

    if (!contratoSeleccionado.observacion_ctr) {
      errors.observacion_ctr = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await contratosServices.update(contratoSeleccionado);
      console.log(contratoSeleccionado);

      if (res.success) {
        alert("Contrato del Equipo actualizado de forma Correcta")
        //console.log(res.message)
        abrirCerrarModalEditar();
        delete contratoSeleccionado.id_ctr;
        delete contratoSeleccionado.codigocontrato_ctr;
        delete contratoSeleccionado.cliente_ctr;
        delete contratoSeleccionado.asesorcomercial_ctr;
        delete contratoSeleccionado.duracion_ctr;
        delete contratoSeleccionado.fechainicio_ctr;
        delete contratoSeleccionado.fechafinal_ctr;
        delete contratoSeleccionado.ciudad_ctr;
        delete contratoSeleccionado.valorcontrato_ctr;
        delete contratoSeleccionado.estado_ctr;
        delete contratoSeleccionado.observacion_ctr;
      } else {
        alert("Error Actualizando Contrato del Equipo");
        //console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando Contrato del Equipo");
      //console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  const borrarContrato = async () => {

    const res = await contratosServices.delete(contratoSeleccionado.id_ctr);

    if (res.success) {
      alert("Contrato Borrada de forma Correcta")
      //console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      alert("Error Borrando el Contrato");
      //console.log(res.message);
      abrirCerrarModalEliminar();
    }

  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'ID Contrato',
      field: 'codigocontrato_ctr'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 150 }
    },
    {
      title: 'Asesor Comercial',
      field: 'primer_nombre_emp'
    },
    {
      title: 'Duración',
      field: 'duracion_ctr'
    },
    {
      title: 'Fecha de Inicio',
      field: 'fechainicio_ctr',
      type: 'date'
    },
    {
      title: 'Fecha Final',
      field: 'fechafinal_ctr',
      type: 'date'
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu',
      cellStyle: { minWidth: 80 }
    },
    {
      title: 'Valor Contrato',
      field: 'valorcontrato_ctr',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Estado',
      field: 'nombre_est',
      cellStyle: { minWidth: 60 }
    }
  ]

  const contratoInsertar = (
    <div className={styles.modal}>
      <h3 align="center" >Agregar Contrato del Equipo { } {equipoCodigo} </h3>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="id_ctr" label="ID del Contrato" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="codigocontrato_ctr" label="Número del Contrato"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectcliente_ctr" >Cliente que contrata</InputLabel>
            <Select
              labelId="selectcliente_ctr"
              name="cliente_ctr"
              id="idselectcliente_ctr"
              fullWidth
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
            <InputLabel id="asesorcomercial_ctr" >Asesor comercial que atiende al Cliente</InputLabel>
            <Select
              labelId="selectasesorcomercial_ctr"
              name="asesorcomercial_ctr"
              id="idselectasesorcomercial_ctr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{ } {itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectestado_ctr" >Estado del Contrato</InputLabel>
            <Select
              labelId="selectestado_ctr"
              name="estado_ctr"
              id="idselectestado_ctr"
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
        <Grid item xs={12} md={4}> <TextField name="duracion_ctr" label="Duración del Contrato"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicio_ctr"
          label="Fecha de inicio del Contrato" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_ctr"
          label="Fecha Final del Contrato" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectciudad_ctr" >Ciudad donde se realiza el contrato</InputLabel>
            <Select
              labelId="selectciudad_ctr"
              name="ciudad_ctr"
              id="idselectciudad_ctr"
              fullWidth
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
          <TextField type="number" name="valorcontrato_ctr" label="Valor del Contrato" InputLabelProps={{ shrink: true }}
            id="valorcontrato_ctr" InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  < AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            fullWidth onChange={handleChange} />
        </Grid>

        <Grid item xs={12} md={12}> <TextField name="observacion_ctr" label="Observaciones sobre el Contrato"
          fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => grabarContrato()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const contratoEditar = (
    <div className={styles.modal}>
      <h3 align="center" >Agregar Contrato del Equipo { } {equipoCodigo} </h3>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="id_ctr" label="ID del Contrato" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.id_ctr} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="codigocontrato_ctr" label="Número del Contrato"
          fullWidth onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.codigocontrato_ctr} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectcliente_ctr" >Cliente que contrata</InputLabel>
            <Select
              labelId="selectcliente_ctr"
              name="cliente_ctr"
              id="idselectcliente_ctr"
              fullWidth
              onChange={handleChange}
              value={contratoSeleccionado && contratoSeleccionado.cliente_ctr}
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
            <InputLabel id="asesorcomercial_ctr" >Asesor comercial que atiende al Cliente</InputLabel>
            <Select
              labelId="selectasesorcomercial_ctr"
              name="asesorcomercial_ctr"
              id="idselectasesorcomercial_ctr"
              fullWidth
              onChange={handleChange}
              value={contratoSeleccionado && contratoSeleccionado.asesorcomercial_ctr}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{ } {itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectestado_ctr" >Estado del Contrato</InputLabel>
            <Select
              labelId="selectestado_ctr"
              name="estado_ctr"
              id="idselectestado_ctr"
              fullWidth
              onChange={handleChange}
              value={contratoSeleccionado && contratoSeleccionado.estado_ctr}
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
        <Grid item xs={12} md={4}> <TextField name="duracion_ctr" label="Duración del Contrato"
          fullWidth onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.duracion_ctr} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField InputLabelProps={{ shrink: true }} name="fechainicio_ctr"
          label="Fecha de inicio del Contrato" fullWidth onChange={handleChange}
          value={contratoSeleccionado && contratoSeleccionado.fechainicio_ctr} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField InputLabelProps={{ shrink: true }} name="fechafinal_ctr"
          label="Fecha Final del Contrato" fullWidth onChange={handleChange}
          value={contratoSeleccionado && contratoSeleccionado.fechafinal_ctr} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectciudad_ctr" >Ciudad donde se realiza el contrato</InputLabel>
            <Select
              labelId="selectciudad_ctr"
              name="ciudad_ctr"
              id="idselectciudad_ctr"
              fullWidth
              onChange={handleChange}
              value={contratoSeleccionado && contratoSeleccionado.ciudad_ctr}
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
          <TextField name="valorcontrato_ctr" label="Valor del Contrato" InputLabelProps={{ shrink: true }}
            value={contratoSeleccionado.valorcontrato_ctr} id="valorcontrato_ctr"
            fullWidth onChange={handleChange} InputProps={{ inputComponent: NumberFormatCustom, }} />
        </Grid>
        
        <Grid item xs={12} md={12}> <TextField name="observacion_ctr" label="Observaciones sobre el Contrato"
          fullWidth onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.observacion_ctr} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarContrato()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const contratoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Contrato <b>{contratoSeleccionado && contratoSeleccionado.codigocontrato_ctr}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarGarantia()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Insertar</Button>
      <div className="datosequipos">
        <MaterialTable
          columns={columnas}
          data={listContratos}
          title="Datos del Contrato"
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Contrato',
              onClick: (event, rowData) => seleccionarContratos(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Borrar Contrato',
              onClick: (event, rowData) => seleccionarContratos(rowData, "Eliminar")
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
          detailPanel={[
            {
              tooltip: 'Observaciones relacionadas con los contratos',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      color: 'white',
                    }}
                  >
                    <Box bgcolor="text.disabled" color="background.paper" p={1}>
                      Observación : {rowData.observacion_ctr}</Box> {}

                  </div>
                )
              },
            },
          ]}
        />{ }
      </div>

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {contratoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {contratoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {contratoEliminar}
      </Modal>
    </div>
  );
}

export default Contratos;