import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import tiposmttoServices from "../../../services/Mantenimiento/Tiposmtto";
import estadosServices from "../../../services/Parameters/Estados";
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

function Tiposmtto() {
  const styles = useStyles();
  const [listTiposmtto, setListTiposmtto] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);

  const [tiposmttoSeleccionado, setTiposmttoSeleccionado] = useState({
    id_tmt: "",
    descripcion_tmt: "",
    empresa_tmt: "",
    estado_tmt: "",
  })

  useEffect(() => {
    async function fetchDataTiposmtto() {
      const res = await tiposmttoServices.listTiposmtto();
      setListTiposmtto(res.data);
    }
    fetchDataTiposmtto();
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

  const handleChange = e => {
    const { name, value } = e.target;

    setTiposmttoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTipomtto = (tipomtto, caso) => {
    setTiposmttoSeleccionado(tipomtto);
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

  const grabarTipomtto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposmttoSeleccionado.descripcion_tmt) {
      errors.descripcion_tmt = true;
      formOk = false;
    }

    if (!tiposmttoSeleccionado.empresa_tmt) {
      errors.empresa_tmt = true;
      formOk = false;
    }

    if (!tiposmttoSeleccionado.estado_tmt) {
      errors.estado_tmt = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tiposmttoSeleccionado);
      const res = await tiposmttoServices.save(tiposmttoSeleccionado);

      if (res.success) {
        alert("Tipo de Mantenimiento Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposmttoSeleccionado.descripcion_tmt;
        delete tiposmttoSeleccionado.empresa_tmt;
        delete tiposmttoSeleccionado.estado_tmt;
      } else {
        alert("Error Creando el Tipo de Mantenimiento");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Tipo de Mantenimiento");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarTipomtto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposmttoSeleccionado.descripcion_tmt) {
      errors.descripcion_tmt = true;
      formOk = false;
    }

    if (!tiposmttoSeleccionado.empresa_tmt) {
      errors.empresa_tmt = true;
      formOk = false;
    }

    if (!tiposmttoSeleccionado.estado_tmt) {
      errors.estado_tmt = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {

      const res = await tiposmttoServices.update(tiposmttoSeleccionado);

      if (res.success) {
        alert("Tipo de Mantenimiento actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposmttoSeleccionado.descripcion_tmt;
        delete tiposmttoSeleccionado.empresa_tmt;
        delete tiposmttoSeleccionado.estado_tmt;
      } else {
        alert("Error Actualizando el tipo de Mantenimiento");
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Tipo de Mantenimiento");
      console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  const borrarTipomtto = async () => {

    const res = await tiposmttoServices.delete(tiposmttoSeleccionado.id_tmt);

    if (res.success) {
      alert("Tipo de Mantenimiento Borrada de forma Correcta")
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      alert("Error Borrando el Tipo de Mantenimiento");
      console.log(res.message);
      abrirCerrarModalEliminar();
    }

  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tmt'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_tmt'
    },
    {
      title: 'Código',
      field: 'empresa_tmt'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Codigo',
      field: 'estado_tmt'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const tipomttoInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Tipo de Mantenimiento</h3>
      <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_tmt" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tmt"
          id="idselectEmpresa"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tmt"
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
      <div align="right">
        <Button color="primary" onClick={() => grabarTipomtto()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tipomttoEditar = (
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Tipo de Mantenimiento</h3>
      <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_tmt" onChange={handleChange} value={tiposmttoSeleccionado && tiposmttoSeleccionado.descripcion_tmt} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tmt"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tiposmttoSeleccionado && tiposmttoSeleccionado.empresa_tmt}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
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
          name="estado_tmt"
          id="idselectEstado"
          onChange={handleChange}
          value={tiposmttoSeleccionado && tiposmttoSeleccionado.estado_tmt}
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
      <br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarTipomtto()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tipomttoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Mantenimiento <b>{tiposmttoSeleccionado && tiposmttoSeleccionado.nombre_tmt}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarTipomtto()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Tipo de Mantenimiento</Button>
      <MaterialTable
        columns={columnas}
        data={listTiposmtto}
        title="Maestra Tipos de Mantenimiento"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipo de Mantenimiento',
            onClick: (event, rowData) => seleccionarTipomtto(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipo de Mantenimiento',
            onClick: (event, rowData) => seleccionarTipomtto(rowData, "Eliminar")
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
        {tipomttoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {tipomttoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {tipomttoEliminar}
      </Modal>
    </div>
  );
}

export default Tiposmtto;