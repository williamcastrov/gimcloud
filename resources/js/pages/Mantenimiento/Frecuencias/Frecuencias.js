import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import frecuenciasServices from "../../../services/Mantenimiento/Frecuencias";
import estadosServices from "../../../services/Parameters/Estados";
import unidadesServices from "../../../services/Parameters/Unidades";
import empresasServices from "../../../services/Empresa";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
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
    minWidth: 315,
  }
}));

function Frecuencias() {
  const styles = useStyles();
  const [listFrecuencias, setListFrecuencias] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarUnidades, setListarUnidades] = useState([]);

  const [frecuenciasSeleccionado, setFrecuenciasSeleccionado] = useState({
    id_fre: "",
    descripcion_fre: "",
    periodicidad_fre: "",
    unidad_fre: "",
    empresa_fre: "",
    estado_fre: ""
  })

  useEffect(() => {
    async function fetchDataFrecuencias() {
      const res = await frecuenciasServices.listFrecuencias();
      setListFrecuencias(res.data);
    }
    fetchDataFrecuencias();
  }, [])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataUnidades() {
      const res = await unidadesServices.listUnidades();
      setListarUnidades(res.data)
      console.log(res.data);
    }
    fetchDataUnidades();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setFrecuenciasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarFrecuencia = (frecuencia, caso) => {
    setFrecuenciasSeleccionado(frecuencia);
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

  const grabarFrecuencia = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!frecuenciasSeleccionado.descripcion_fre) {
      errors.descripcion_fre = true;
      formOk = false;
    }

    if (!frecuenciasSeleccionado.periodicidad_fre) {
      errors.periodicidad_fre = true;
      formOk = false;
    }

    if (!frecuenciasSeleccionado.unidad_fre) {
      errors.unidad_fre = true;
      formOk = false;
    }

    if (!frecuenciasSeleccionado.empresa_fre) {
      errors.empresa_fre = true;
      formOk = false;
    }

    if (!frecuenciasSeleccionado.estado_fre) {
      errors.estado_fre = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(frecuenciasSeleccionado);
      const res = await frecuenciasServices.save(frecuenciasSeleccionado);

      if (res.success) {
        alert("Frecuencia Creada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete frecuenciasSeleccionado.descripcion_fre;
        delete frecuenciasSeleccionado.periodicidad_fre;
        delete frecuenciasSeleccionado.unidad_fre;
        delete frecuenciasSeleccionado.empresa_fre;
        delete frecuenciasSeleccionado.estado_fre;
      } else {
        alert("Error Creando la Frecuencia");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando la Frecuencia");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarFrecuencia = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!frecuenciasSeleccionado.descripcion_fre) {
      errors.descripcion_fre = true;
      formOk = false;
    }

    if (!frecuenciasSeleccionado.periodicidad_fre) {
      errors.periodicidad_fre = true;
      formOk = false;
    }

    if (!frecuenciasSeleccionado.unidad_fre) {
      errors.unidad_fre = true;
      formOk = false;
    }

    if (!frecuenciasSeleccionado.empresa_fre) {
      errors.empresa_fre = true;
      formOk = false;
    }

    if (!frecuenciasSeleccionado.estado_fre) {
      errors.estado_fre = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await frecuenciasServices.update(frecuenciasSeleccionado);

      if (res.success) {
        alert("Frecuencia actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete frecuenciasSeleccionado.descripcion_fre;
        delete frecuenciasSeleccionado.periodicidad_fre;
        delete frecuenciasSeleccionado.unidad_fre;
        delete frecuenciasSeleccionado.empresa_fre;
        delete frecuenciasSeleccionado.estado_fre;
      } else {
        alert("Error Actualizando la Frecuencia");
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando la Frecuencia");
      console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  const borrarFrecuencia = async () => {

    const res = await frecuenciasServices.delete(frecuenciasSeleccionado.id_fre);

    if (res.success) {
      alert("Frecuencia Borrada de forma Correcta")
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      alert("Error Borrando la Frecuencia");
      console.log(res.message);
      abrirCerrarModalEliminar();
    }

  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_fre'
    },
    {
      title: 'Frecuencia',
      field: 'descripcion_fre'
    },
    {
      title: 'Periodicidad',
      field: 'periodicidad_fre'
    },
    {
      title: 'Unidad',
      field: 'descripcion_und'
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_fre'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Código Estado',
      field: 'estado_fre'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const frecuenciaInsertar = (
    <div className={styles.modal}>
      <br />
      <h3>Frecuencias para Mantenimiento</h3>

      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_fre" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Periodicidad" name="periodicidad_fre" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectUnidad">Unidad Asignada a la Frecuencia</InputLabel>
            <Select
              labelId="selectUnidad"
              name="unidad_fre"
              id="idselectUnidad"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarUnidades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_und}>{itemselect.descripcion_und}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_fre"
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
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_fre"
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
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => grabarFrecuencia()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const frecuenciaEditar = (
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Frecuencia de Mantenimiento</h3>
      <TextField className={styles.inputMaterial} label="Frecuencia" name="descripcion_fre" onChange={handleChange} value={frecuenciasSeleccionado && frecuenciasSeleccionado.descripcion_fre} />
      <br />
      <TextField className={styles.inputMaterial} label="Periodicidad" name="periodicidad_fre" onChange={handleChange} value={frecuenciasSeleccionado && frecuenciasSeleccionado.periodicidad_fre} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectUnidad">Unidad Asignada a la Frecuencia</InputLabel>
        <Select
          labelId="selectUnidad"
          name="unidad_fre"
          id="idselectUnidad"
          onChange={handleChange}
          value={frecuenciasSeleccionado && frecuenciasSeleccionado.unidad_fre}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarUnidades.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_und}>{itemselect.descripcion_und}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <FormControl className={styles.formControl} >
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_fre"
          id="idselectEmpresa"
          onChange={handleChange}
          value={frecuenciasSeleccionado && frecuenciasSeleccionado.empresa_fre}
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
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_fre"
          id="idselectEstado"
          onChange={handleChange}
          value={frecuenciasSeleccionado && frecuenciasSeleccionado.estado_fre}
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
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarFrecuencia()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const frecuenciaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Frecuencia <b>{frecuenciasSeleccionado && frecuenciasSeleccionado.descripcion_fre}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarFrecuencia()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Frecuencia</Button>
      <MaterialTable
        columns={columnas}
        data={listFrecuencias}
        title="Maestra de Frecuencias para Mantenimiento"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Frecuencia',
            onClick: (event, rowData) => seleccionarFrecuencia(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Frecuencia',
            onClick: (event, rowData) => seleccionarFrecuencia(rowData, "Eliminar")
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
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {frecuenciaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {frecuenciaEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {frecuenciaEliminar}
      </Modal>
    </div>
  );
}

export default Frecuencias;