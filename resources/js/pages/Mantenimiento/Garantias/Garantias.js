import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import garantiasServices from "../../../services/Mantenimiento/Garantias";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import equiposServices from "../../../services/Mantenimiento/Equipos";

//Estilos
import "../Equipos/Equipos.css";

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
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
  }
}));

function Garantias(props) {
  const { equipoID, equipoCodigo } = props;
  console.log(equipoCodigo);

  const styles = useStyles();
  const [listGarantias, setListGarantias] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);

  const [garantiaSeleccionado, setGarantiaSeleccionado] = useState({
    equipo_gar: "",
    idgarantia_gar: "",
    empresa_gar: "",
    fechainicial_gar: "",
    fechafinal_gar: "",
    estado_gar: "",
    observacion_gar: "",
  })

  useEffect(() => {
    async function fetchDataGarantias() {
      const res = await garantiasServices.listUnaGarantia(equipoID);
      setListGarantias(res.data);
    }
    fetchDataGarantias();
  }, [])

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
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquipos();
      setListarEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataEquipos();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setGarantiaSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarGarantia = (garantia, caso) => {
    setGarantiaSeleccionado(garantia);
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

  const grabarGarantia = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!garantiaSeleccionado.equipo_gar) {
      errors.equipo_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.idgarantia_gar) {
      errors.idgarantia_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.empresa_gar) {
      errors.empresa_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.fechainicial_gar) {
      errors.fechainicial_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.fechafinal_gar) {
      errors.fechafinal_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.estado_gar) {
      errors.estado_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.observacion_gar) {
      errors.observacion_gar = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(garantiaSeleccionado);
      const res = await garantiasServices.save(garantiaSeleccionado);

      if (res.success) {
        alert("Garantia Creada de forma Correcta")
        //console.log(res.message)
        abrirCerrarModalInsertar();
        delete garantiaSeleccionado.equipo_gar;
        delete garantiaSeleccionado.idgarantia_gar;
        delete garantiaSeleccionado.empresa_gar;
        delete garantiaSeleccionado.fechainicial_gar;
        delete garantiaSeleccionado.fechafinal_gar;
        delete garantiaSeleccionado.estado_gar;
        delete garantiaSeleccionado.observacion_gar;
      } else {
        alert("Error Creando la Garantia");
        //console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando la Garantia");
      //console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarGarantia = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!garantiaSeleccionado.equipo_gar) {
      errors.equipo_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.idgarantia_gar) {
      errors.idgarantia_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.empresa_gar) {
      errors.empresa_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.fechainicial_gar) {
      errors.fechainicial_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.fechafinal_gar) {
      errors.fechafinal_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.estado_gar) {
      errors.estado_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.observacion_gar) {
      errors.observacion_gar = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await garantiasServices.update(garantiaSeleccionado);

      if (res.success) {
        alert("Garantia actualizada de forma Correcta")
        //console.log(res.message)
        abrirCerrarModalEditar();
        delete garantiaSeleccionado.equipo_gar;
        delete garantiaSeleccionado.idgarantia_gar;
        delete garantiaSeleccionado.empresa_gar;
        delete garantiaSeleccionado.fechainicial_gar;
        delete garantiaSeleccionado.fechafinal_gar;
        delete garantiaSeleccionado.estado_gar;
        delete garantiaSeleccionado.observacion_gar;
      } else {
        alert("Error Actualizando la Garantia");
        //console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando la Garantia");
      //console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  const borrarGarantia = async () => {

    const res = await garantiasServices.delete(garantiaSeleccionado.equipo_gar);

    if (res.success) {
      alert("Garantia Borrada de forma Correcta")
      //console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      alert("Error Borrando la Garantia");
      //console.log(res.message);
      abrirCerrarModalEliminar();
    }

  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Codigo Equipo',
      field: 'equipo_gar'
    },
    {
      title: 'IDGarantía',
      field: 'idgarantia_gar'
    },
    {
      title: 'Descripción',
      field: 'nombre_emp',
      cellStyle: { minWidth: 150 }
    },
    {
      title: 'Fecha Inicial',
      field: 'fechainicial_gar',
      type: 'date'
    },
    {
      title: 'Fecha Final',
      field: 'fechafinal_gar',
      type: 'date'
    },
    {
      title: 'Descripción',
      field: 'nombre_est'
    },
    {
      title: 'Observación',
      field: 'observacion_gar',
      cellStyle: { minWidth: 250 }
    }
  ]

  const garantiaInsertar = (
    <div className={styles.modal}>
      <br />
      <h3>Agregar Nueva Garantia del Equipo</h3>
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} label="ID Garantía" name="id_gar" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} label="Código del Equipo" name="equipo_gar"  defaultValue={equipoCodigo} disabled="true"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} label="ID Garantía" name="idgarantia_gar" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_gar"
              id="idselectEmpresa"
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
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_gar"
              id="idselectEstado"
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
          <TextField className={styles.inputMaterial} label="Fecha Inicial" name="fechainicial_gar" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Fecha Final" name="fechafinal_gar" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observación" name="oberrvacion_gar" fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => grabarGarantia()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const garantiaEditar = (
    <div className={styles.modal}>
      <h3>Actualizar Garantia del Equipo</h3>

      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Código del Equipo" name="equipo_gar"
            fullWidth onChange={handleChange} value={garantiaSeleccionado && garantiaSeleccionado.equipo_gar} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="ID Garantía" name="idgarantia_gar"
            fullWidth onChange={handleChange} value={garantiaSeleccionado && garantiaSeleccionado.idgarantia_gar} />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_gar"
              id="idselectEmpresa"
              onChange={handleChange}
              value={garantiaSeleccionado && garantiaSeleccionado.empresa_gar}
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
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_gar"
              id="idselectEstado"
              onChange={handleChange}
              value={garantiaSeleccionado && garantiaSeleccionado.empresa_gar}
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
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Fecha Inicial" name="fechainicial_gar"
            fullWidth onChange={handleChange} value={garantiaSeleccionado && garantiaSeleccionado.fechainicial_gar} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Fecha Final" name="fechafinal_gar"
            fullWidth onChange={handleChange} value={garantiaSeleccionado && garantiaSeleccionado.fechafinal_gar} />
        </Grid>
      </Grid><Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observación" name="oberrvacion_gar"
            fullWidth onChange={handleChange} value={garantiaSeleccionado && garantiaSeleccionado.observacion_gar} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarGarantia()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const garantiaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Garantia <b>{garantiaSeleccionado && garantiaSeleccionado.idgarantia_gar}</b>? </p>
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
          data={listGarantias}
          title="Maestra de Garantias"
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Garantia',
              onClick: (event, rowData) => seleccionarGarantia(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Borrar Garantia',
              onClick: (event, rowData) => seleccionarGarantia(rowData, "Eliminar")
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
        {garantiaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {garantiaEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {garantiaEliminar}
      </Modal>
    </div>
  );
}

export default Garantias;