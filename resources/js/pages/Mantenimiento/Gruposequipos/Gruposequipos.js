import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import gruposequiposServices from "../../../services/Mantenimiento/GruposEquipos";
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

function Gruposequipos() {
  const styles = useStyles();
  const [listGruposequipos, setListGruposequipos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [gruposequiposSeleccionado, setGruposequiposSeleccionado] = useState({
    id_grp: "",
    codigogrupo_grp: "",
    descripcion_grp: "",
    empresa_grp: "",
    estado_grp: ""
  })

  useEffect(() => {
    async function fetchDataGruposequipos() {
      const res = await gruposequiposServices.listGruposequipos();
      setListGruposequipos(res.data);
    }
    fetchDataGruposequipos();
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

  const handleChange = e => {
    const { name, value } = e.target;

    setGruposequiposSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarGrupoequipo = (grupoequipo, caso) => {
    console.log(grupoequipo)
    setGruposequiposSeleccionado(grupoequipo);
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

  const grabarGrupoequipo = async () => {

    for (var i = 0; i < gruposequiposSeleccionado.codigogrupo_grp.length; i++) {
      console.log("La cantidad de : ", i);
    }

    if (i !== 3) {
      alert("El Codigo del Grupo debe tener tres Caracteres")
    } else {

      setFormError({});
      let errors = {};
      let formOk = true;

      if (!gruposequiposSeleccionado.codigogrupo_grp) {
        errors.codigogrupo_grp = true;
        formOk = false;
      }

      if (!gruposequiposSeleccionado.descripcion_grp) {
        errors.descripcion_grp = true;
        formOk = false;
      }

      if (!gruposequiposSeleccionado.empresa_grp) {
        errors.empresa_grp = true;
        formOk = false;
      }

      if (!gruposequiposSeleccionado.estado_grp) {
        errors.estado_grp = true;
        formOk = false;
      }

      setFormError(errors);

      if (formOk) {
        console.log(gruposequiposSeleccionado);
        const res = await gruposequiposServices.save(gruposequiposSeleccionado);

        if (res.success) {
          alert("Grupo de Equipo Creado de forma Correcta")
          console.log(res.message)
          abrirCerrarModalInsertar();
          delete gruposequiposSeleccionado.codigogrupo_grp;
          delete gruposequiposSeleccionado.descripcion_grp;
          delete gruposequiposSeleccionado.empresa_grp;
          delete gruposequiposSeleccionado.estado_grp;
        } else {
          alert("Error Creando el Grupo del Equipo");
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
      }
      else {
        alert("Debe Ingresar Todos los Datos, Error Creando el Grupo del Equipo");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
  }

  const actualizarGrupoequipo = async () => {

    for (var i = 0; i < gruposequiposSeleccionado.codigogrupo_grp.length; i++) {
      console.log("La cantidad de : ", i);
    }

    if (i !== 3) {
      alert("El Codigo del Grupo debe tener tres Caracteres")
    } else {

      setFormError({});
      let errors = {};
      let formOk = true;

      if (!gruposequiposSeleccionado.codigogrupo_grp) {
        errors.codigogrupo_grp = true;
        formOk = false;
      }

      if (!gruposequiposSeleccionado.descripcion_grp) {
        errors.descripcion_grp = true;
        formOk = false;
      }

      if (!gruposequiposSeleccionado.empresa_grp) {
        errors.empresa_grp = true;
        formOk = false;
      }

      if (!gruposequiposSeleccionado.estado_grp) {
        errors.estado_grp = true;
        formOk = false;
      }

      setFormError(errors);

      if (formOk) {

        const res = await gruposequiposServices.update(gruposequiposSeleccionado);

        if (res.success) {
          alert("Tipo Equipo actualizado de forma Correcta")
          console.log(res.message)
          abrirCerrarModalEditar();
          delete gruposequiposSeleccionado.codigogrupo_grp;
          delete gruposequiposSeleccionado.descripcion_grp;
          delete gruposequiposSeleccionado.empresa_grp;
          delete gruposequiposSeleccionado.estado_grp;
        } else {
          alert("Error Actualizando el Grupo del Equipo");
          console.log(res.message);
          abrirCerrarModalEditar();
        }
      }
      else {
        alert("Debe Ingresar Todos los Datos, Error Actualizando el Grupo del Equipo");
        console.log(res.message);
        abrirCerrarModalEditar();
      }

    }
  }

  const borrarGrupoequipo = async () => {

    const res = await gruposequiposServices.delete(gruposequiposSeleccionado.id_grp);

    if (res.success) {
      alert("Tipo Equipo Borrado de forma Correcta")
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      alert("Error Borrando el Tipo de Equipo");
      console.log(res.message);
      abrirCerrarModalEliminar();
    }

  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_grp'
    },
    {
      title: 'Grupo',
      field: 'codigogrupo_grp'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_grp'
    },
    {
      title: 'Código',
      field: 'empresa_grp'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_grp'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const grupoequipoInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nueva Marca</h3>
      <TextField className={styles.inputMaterial} label="Grupo" name="codigogrupo_grp" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_grp" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_grp"
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
          name="estado_grp"
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
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => grabarGrupoequipo()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const grupoequipoEditar = (
    <div className={styles.modal}>
      <TextField className={styles.inputMaterial} label="Grupo" name="codigogrupo_grp" onChange={handleChange} value={gruposequiposSeleccionado && gruposequiposSeleccionado.codigogrupo_grp} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_grp" onChange={handleChange} value={gruposequiposSeleccionado && gruposequiposSeleccionado.descripcion_grp} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_grp"
          id="idselectEmpresa"
          onChange={handleChange}
          value={gruposequiposSeleccionado && gruposequiposSeleccionado.empresa_grp}
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
          name="estado_grp"
          id="idselectEstado"
          onChange={handleChange}
          value={gruposequiposSeleccionado && gruposequiposSeleccionado.estado_grp}
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
        <Button color="primary" onClick={() => actualizarGrupoequipo()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const grupoequipoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Equipo <b>{gruposequiposSeleccionado && gruposequiposSeleccionado.descripcion_grp}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarGrupoequipo()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Grupo del Equipo</Button>
      <MaterialTable
        columns={columnas}
        data={listGruposequipos}
        title="Maestra de Grupos de Equipos"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipo Grupo',
            onClick: (event, rowData) => seleccionarGrupoequipo(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipo Grupo',
            onClick: (event, rowData) => seleccionarGrupoequipo(rowData, "Eliminar")
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
        {grupoequipoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {grupoequipoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {grupoequipoEliminar}
      </Modal>
    </div>
  );
}

export default Gruposequipos;