import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import conceptososervServices from "../../../../services/GestionOrdenes/ConceptosOserv";
import estadosServices from "../../../../services/Parameters/Estados";
import empresasServices from "../../../../services/Empresa";

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
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  }
}));

function ConceptosOserv() {
  const styles = useStyles();
  const [listConceptosOserv, setListConceptosOserv] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);

  const [conceptosOservSeleccionado, setConceptosOservSeleccionado] = useState({
    id_con: "",
    descripcion_con: "",
    empresa_con: "",
    estado_con: "",
  })

  useEffect(() => {
    async function fetchDataConceptosOserv() {
      const res = await conceptososervServices.listConceptosOserv();
      setListConceptosOserv(res.data);
    }
    fetchDataConceptosOserv();
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

    setConceptosOservSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarConceptosOserv = (conceptososerv, caso) => {
    setConceptosOservSeleccionado(conceptososerv);
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

  const grabarConceptosOserv = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!conceptosOservSeleccionado.descripcion_con) {
      errors.descripcion_con = true;
      formOk = false;
    }

    if (!conceptosOservSeleccionado.empresa_con) {
      errors.empresa_con = true;
      formOk = false;
    }

    if (!conceptosOservSeleccionado.estado_con) {
      errors.estado_con = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(conceptosOservSeleccionado);
      const res = await  conceptososervServices.save(conceptosOservSeleccionado);

      if (res.success) {
        swal("Conceptos Ordenes Servicio", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete conceptosOservSeleccionado.descripcion_con;
        delete conceptosOservSeleccionado.empresa_con;
        delete conceptosOservSeleccionado.estado_con;
      } else {
        swal("Conceptos Ordenes Servicio", "Error Creando Conceptos Ordenes Servicio!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Conceptos Ordenes Servicio", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarConceptosOserv = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!conceptosOservSeleccionado.descripcion_con) {
      errors.descripcion_con = true;
      formOk = false;
    }

    if (!conceptosOservSeleccionado.empresa_con) {
      errors.empresa_con = true;
      formOk = false;
    }

    if (!conceptosOservSeleccionado.estado_con) {
      errors.estado_con = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {

      const res = await  conceptososervServices.update(conceptosOservSeleccionado);

      if (res.success) {
        swal("Conceptos Ordenes Servicio", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete conceptosOservSeleccionado.descripcion_con;
        delete conceptosOservSeleccionado.empresa_con;
        delete conceptosOservSeleccionado.estado_con;
      } else {
        swal("Conceptos Ordenes Servicio", "Error Actualizando Conceptos Ordenes de Servicio!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Conceptos Ordenes Servicio", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  const borrarConceptosOserv = async () => {

    const res = await  conceptososervServices.delete(conceptosOservSeleccionado.id_con);

    if (res.success) {
      swal("Conceptos Ordenes Servicio", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Conceptos Ordenes Servicio", "Error Borrando Conceptos Ordenes Servicio!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }

  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_con'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_con'
    },
    {
      title: 'Código',
      field: 'empresa_con'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Codigo',
      field: 'estado_con'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const ConceptosOservInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Conceptos Ordenes Servicio</Typography>
      <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_con" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_con"
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
          name="estado_con"
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
        <Button color="primary" onClick={() => grabarConceptosOserv()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const ConceptosOservEditar = (
    <div className={styles.modal}>
       <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Conceptos Ordenes Servicio</Typography>
      <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_con" onChange={handleChange} value={conceptosOservSeleccionado && conceptosOservSeleccionado.descripcion_con} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_con"
          id="idselectEmpresa"
          onChange={handleChange}
          value={conceptosOservSeleccionado && conceptosOservSeleccionado.empresa_con}
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
          name="estado_con"
          id="idselectEstado"
          onChange={handleChange}
          value={conceptosOservSeleccionado && conceptosOservSeleccionado.estado_con}
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
        <Button color="primary" onClick={() => actualizarConceptosOserv()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const ConceptosOservEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Concepto de Mantenimiento <b>{conceptosOservSeleccionado && conceptosOservSeleccionado.descripcion_con}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarConceptosOserv()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Conceptos Ordenes Servicio</Button>
      <MaterialTable
        columns={columnas}
        data={listConceptosOserv}
        title="CONCEPTOS DE MANTENIMIENTO"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Conceptos Ordenes Servicio',
            onClick: (event, rowData) => seleccionarConceptosOserv(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Conceptos Ordenes Servicio',
            onClick: (event, rowData) => seleccionarConceptosOserv(rowData, "Eliminar")
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
        {ConceptosOservInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {ConceptosOservEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {ConceptosOservEliminar}
      </Modal>
    </div>
  );
}

export default ConceptosOserv;