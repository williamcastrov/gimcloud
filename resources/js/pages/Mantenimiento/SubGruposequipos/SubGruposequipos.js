import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import subgruposequiposServices from "../../../services/Mantenimiento/SubGruposEquipos";
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
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  }
}));

function SubGruposequipos() {
  const styles = useStyles();
  const [listSubGruposequipos, setListSubGruposequipos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarGruposEquipos, setListarGruposEquipos] = useState([]);
  const [subgruposequiposSeleccionado, setSubGruposequiposSeleccionado] = useState({
    id_sgre: "",
    codigo_sgre: "",
    grupo_sgre: "",
    descripcion_sgre: "",
    empresa_sgre: "",
    estado_sgre: ""
  })

  useEffect(() => {
    async function fetchDataSubGruposequipos() {
      const res = await subgruposequiposServices.listSubGruposequipos();
      setListSubGruposequipos(res.data);
    }
    fetchDataSubGruposequipos();
  }, [])


  useEffect(() => {
    async function fetchDataGruposequipos() {
      const res = await gruposequiposServices.listGruposequipos();
      setListarGruposEquipos(res.data);
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

    setSubGruposequiposSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarSubGrupoequipo = (subgrupoequipo, caso) => {
    console.log(subgrupoequipo)
    setSubGruposequiposSeleccionado(subgrupoequipo);
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

  const grabarSubGrupoequipo = async () => {

    for (var i = 0; i < subgruposequiposSeleccionado.codigo_sgre.length; i++) {
      console.log("La cantidad de : ", i);
    }

    if (i !== 3) {
      swal("SubGrupos", "El Codigo del SubGrupo debe tener tres Caracteres!", "warning", { button: "Aceptar" });
    } 
    else 
    {
      setFormError({});
      let errors = {};
      let formOk = true;

      if (!subgruposequiposSeleccionado.codigo_sgre) {
        errors.codigo_sgre = true;
        formOk = false;
      }

      if (!subgruposequiposSeleccionado.grupo_sgre) {
        errors.grupo_sgre = true;
        formOk = false;
      }

      if (!subgruposequiposSeleccionado.descripcion_sgre) {
        errors.descripcion_sgre = true;
        formOk = false;
      }

      if (!subgruposequiposSeleccionado.empresa_sgre) {
        errors.empresa_sgre = true;
        formOk = false;
      }

      if (!subgruposequiposSeleccionado.estado_sgre) {
        errors.estado_sgre = true;
        formOk = false;
      }

      setFormError(errors);

      if (formOk) {
        console.log(subgruposequiposSeleccionado);
        const res = await subgruposequiposServices.save(subgruposequiposSeleccionado);

        if (res.success) {
          swal("SubGrupos", "Creado de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalInsertar();
          delete subgruposequiposSeleccionado.codigo_sgre;
          delete subgruposequiposSeleccionado.grupo_sgre;
          delete subgruposequiposSeleccionado.descripcion_sgre;
          delete subgruposequiposSeleccionado.empresa_sgre;
          delete subgruposequiposSeleccionado.estado_sgre;
        } else {
          swal("SubGrupos", "Error Creando el SubGrupo del Equipo!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
      }
      else {
        swal("SubGrupos", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
  }

  const actualizarSubGrupoequipo = async () => {

    for (var i = 0; i < subgruposequiposSeleccionado.codigo_sgre.length; i++) {
      console.log("La cantidad de : ", i);
    }

    if (i !== 3) {
      swal("SubGrupos", "El Codigo del SubGrupo debe tener tres Caracteres!", "warning", { button: "Aceptar" });
    } 
    else 
    {
      setFormError({});
      let errors = {};
      let formOk = true;

      if (!subgruposequiposSeleccionado.codigo_sgre) {
        errors.codigo_sgre = true;
        formOk = false;
      }

      if (!subgruposequiposSeleccionado.grupo_sgre) {
        errors.grupo_sgre = true;
        formOk = false;
      }

      if (!subgruposequiposSeleccionado.descripcion_sgre) {
        errors.descripcion_sgre = true;
        formOk = false;
      }

      if (!subgruposequiposSeleccionado.empresa_sgre) {
        errors.empresa_sgre = true;
        formOk = false;
      }

      if (!subgruposequiposSeleccionado.estado_sgre) {
        errors.estado_sgre = true;
        formOk = false;
      }

      setFormError(errors);

      if (formOk) {

        const res = await subgruposequiposServices.update(subgruposequiposSeleccionado);

        if (res.success) {
          swal("SubGrupos", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalEditar();
          delete subgruposequiposSeleccionado.codigo_sgre;
          delete subgruposequiposSeleccionado.grupo_sgre;
          delete subgruposequiposSeleccionado.descripcion_sgre;
          delete subgruposequiposSeleccionado.empresa_sgre;
          delete subgruposequiposSeleccionado.estado_sgre;
        } else {
          swal("SubGrupos", "Error Actualizando SubGrupo del Equipo!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalEditar();
        }
      }
      else {
        swal("SubGrupos", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
  }

  const borrarSubGrupoequipo = async () => {

    const res = await subgruposequiposServices.delete(subgruposequiposSeleccionado.id_sgre);

    if (res.success) {
      swal("SubGrupos", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("SubGrupos", "Error Borrando el SubGrupo del Equipo!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_sgre'
    },
    {
      title: 'SubGrupo',
      field: 'codigo_sgre'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_sgre'
    },
    {
      title: 'Grupo',
      field: 'descripcion_grp'
    },
   
    {
      title: 'Código',
      field: 'empresa_sgre'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_sgre'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const subgrupoequipoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar SubGrupo Equipos </Typography>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_sgre" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectGrupo">Grupo Equipo</InputLabel>
        <Select
          labelId="selectGrupo"
          name="grupo_sgre"
          id="idselectGrupo"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarGruposEquipos.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_grp}>{itemselect.descripcion_grp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_sgre" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_sgre"
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
          name="estado_sgre"
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
        <Button color="primary" onClick={() => grabarSubGrupoequipo()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const subgrupoequipoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar SubGrupo Equipos </Typography>
      <TextField className={styles.inputMaterial} label="Codigo" name="codigo_sgre" onChange={handleChange} value={subgruposequiposSeleccionado && subgruposequiposSeleccionado.codigo_sgre} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectGrupo">Grupo Equipo</InputLabel>
        <Select
          labelId="selectGrupo"
          name="grupo_sgre"
          id="idselectGrupo"
          value={subgruposequiposSeleccionado && subgruposequiposSeleccionado.grupo_sgre} 
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarGruposEquipos.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_grp}>{itemselect.descripcion_grp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_sgre"
          id="idselectEmpresa"
          onChange={handleChange}
          value={subgruposequiposSeleccionado && subgruposequiposSeleccionado.empresa_sgre}
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
          name="estado_sgre"
          id="idselectEstado"
          onChange={handleChange}
          value={subgruposequiposSeleccionado && subgruposequiposSeleccionado.estado_sgre}
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
        <Button color="primary" onClick={() => actualizarSubGrupoequipo()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const subgrupoequipoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Sub Grupo del Equipo <b>{subgruposequiposSeleccionado && subgruposequiposSeleccionado.descripcion_sgre}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarSubGrupoequipo()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Sub Grupo del Equipo</Button>
      <MaterialTable
        columns={columnas}
        data={listSubGruposequipos}
        title="SUBGRUPOS EQUIPOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipo Sub Grupo',
            onClick: (event, rowData) => seleccionarSubGrupoequipo(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipo Sub Grupo',
            onClick: (event, rowData) => seleccionarSubGrupoequipo(rowData, "Eliminar")
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
        {subgrupoequipoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {subgrupoequipoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {subgrupoequipoEliminar}
      </Modal>
    </div>
  );
}

export default SubGruposequipos;