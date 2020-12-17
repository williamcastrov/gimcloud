import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import marcasServices from "../../../services/Mantenimiento/Marcas";
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
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 315,
  }
}));

function Marcas() {
  const styles = useStyles();
  const [listMarcas, setListMarcas] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [marcasSeleccionado, setMarcasSeleccionado] = useState({
    id_mar: "",
    codigo_mar: "",
    nombre_mar: "",
    empresa_mar: "",
    estado_mar: ""
  })

  useEffect(() => {
    async function fetchDataMarcas() {
      const res = await marcasServices.listMarcas();
      setListMarcas(res.data);
    }
    fetchDataMarcas();
  }, [])

  useEffect (() => {
      async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data) 
      console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstados();
    setListarEstados(res.data) 
    console.log(res.data);
  }
  fetchDataEstados();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setMarcasSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarMarcas=(marca, caso)=>{
    setMarcasSeleccionado(marca);
    (caso==="Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
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

  const grabarMarca = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!marcasSeleccionado.codigo_mar) {
      errors.codigo_mar = true;
      formOk = false;
    }

    if (!marcasSeleccionado.nombre_mar) {
      errors.nombre_mar = true;
      formOk = false;
    }

    if (!marcasSeleccionado.empresa_mar) {
      errors.empresa_mar = true;
      formOk = false;
    }

    if (!marcasSeleccionado.estado_mar) {
      errors.estado_mar = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(marcasSeleccionado);
      const res = await marcasServices.save(marcasSeleccionado);

      if (res.success) {
        alert("Marca Creada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete marcasSeleccionado.codigo_mar;
        delete marcasSeleccionado.nombre_mar;
        delete marcasSeleccionado.empresa_mar;
        delete marcasSeleccionado.estado_mar;
      } else
      {
        alert("Error Creando la Marca");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando la Marca");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarMarca = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!marcasSeleccionado.codigo_mar) {
      errors.codigo_mar = true;
      formOk = false;
    }

    if (!marcasSeleccionado.nombre_mar) {
      errors.nombre_mar = true;
      formOk = false;
    }

    if (!marcasSeleccionado.empresa_mar) {
      errors.empresa_mar = true;
      formOk = false;
    }

    if (!marcasSeleccionado.estado_mar) {
      errors.estado_mar = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await marcasServices.update(marcasSeleccionado);

    if (res.success) {
        alert("Marca actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete marcasSeleccionado.codigo_mar;
        delete marcasSeleccionado.nombre_mar;
        delete marcasSeleccionado.empresa_mar;
        delete marcasSeleccionado.estado_mar;
    } else
    {
        alert("Error Actualizando la Marca");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando la Marca");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarMarca = async()=>{
   
    const res = await marcasServices.delete(marcasSeleccionado.id_mar);

    if (res.success) {
        alert("Marca Borrada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando la Marca");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_mar',
      type: 'numeric'
    },
    {
      title: 'Código',
      field: 'codigo_mar'
    },
    {
      title: 'Descripcion',
      field: 'nombre_mar'
    },
    {
      title: 'Código',
      field: 'empresa_mar'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_mar'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const marcaInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Marca</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_mar" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_mar" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_mar"
          id="idselectEmpresa"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
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
          name="estado_mar"
          id="idselectEstado"
          onChange={handleChange}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est }>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarMarca() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const marcaEditar = (
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Marca del Equipo</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_mar" onChange={handleChange} value={marcasSeleccionado&&marcasSeleccionado.codigo_mar}/>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_mar" onChange={handleChange} value={marcasSeleccionado&&marcasSeleccionado.nombre_mar}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_mar"
          id="idselectEmpresa"
          onChange={handleChange}
          value={marcasSeleccionado&&marcasSeleccionado.empresa_mar}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
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
          name="estado_mar"
          id="idselectEstado"
          onChange={handleChange}
          value={marcasSeleccionado&&marcasSeleccionado.estado_mar}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est }>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarMarca()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const marcaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Marca <b>{marcasSeleccionado && marcasSeleccionado.nombre_mar}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarMarca() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
     <br />
     <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Marca del Equipo</Button>
     <MaterialTable
       columns={columnas}
       data={listMarcas}
       title="Maestra de Marcas"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Marca',
           onClick  : (event, rowData) => seleccionarMarcas(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Marca',
          onClick  : (event, rowData) =>   seleccionarMarcas(rowData, "Eliminar")
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
    />{}
    <Modal
      open={modalInsertar}
      onClose={abrirCerrarModalInsertar}
    >
      {marcaInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {marcaEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {marcaEliminar}
    </Modal>
    </div>
  );
}

export default Marcas;