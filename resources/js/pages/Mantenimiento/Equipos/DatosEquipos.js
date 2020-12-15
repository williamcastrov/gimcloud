import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListAltIcon from '@material-ui/icons/ListAlt';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';


// Floating Button
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

import Garantias from "../Garantias";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 600,
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
    minWidth: 250,
  }
}));

export default function DatosEquipos(props) {
  const { equipoID, equipoCodigo } = props;

  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const fecha = new Date();
  const ano = fecha.getFullYear();

  const [listGarantia, setListGarantia] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalGarantias, setModalGarantias] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalGarantias = () => {
    setModalGarantias(!modalGarantias);
  }

  const garantias = (
    <div>
      <Garantias equipoID={equipoID} equipoCodigo={equipoCodigo} />
    </div>
  )

  return (
    <div>
      <Modal
        open={modalGarantias}
        onClose={abrirCerrarModalGarantias}
      >
        {garantias}
      </Modal>

      <Container>
        <Button
          tooltip="Garantias"
          rotate={true}
          styles={{ backgroundColor: darkColors.grey, color: lightColors.white }}
          onClick={() => setModalGarantias(true)} ><VerifiedUserIcon /></Button>
        <Button
          tooltip="Ficha Técnica"
          rotate={true}
          styles={{ backgroundColor: darkColors.cyan, color: lightColors.white }}
          onClick={() => handleClick()} ><ListAltIcon /></Button>
        <Button
          tooltip="Contrato"
          rotate={true}
          styles={{ backgroundColor: darkColors.green, color: lightColors.white }}
          onClick={() => setModalListar(true)} ><SupervisorAccountIcon /></Button>
        <Button
          tooltip="Mas Acciones!"
          rotate={true}
          styles={{ backgroundColor: darkColors.lightBlue, color: lightColors.white }}
          onClick={() => alert('FAB Rocks!')} ><ZoomOutMapIcon /></Button>
      </Container>
    </div>

  );
}
