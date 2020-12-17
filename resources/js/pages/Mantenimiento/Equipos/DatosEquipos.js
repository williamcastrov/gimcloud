import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListAltIcon from '@material-ui/icons/ListAlt';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import RoomIcon from '@material-ui/icons/Room';
import DescriptionIcon from '@material-ui/icons/Description';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

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
          tooltip="Hoja de Vida"
          rotate={true}
          styles={{ backgroundColor: darkColors.grey, color: lightColors.white }}
          onClick={() => alert('Datos Hoja de Vida del Equipo!')} ><RecentActorsIcon />
        </Button>
        <Button
          tooltip="Ubicación"
          rotate={true}
          styles={{ backgroundColor: darkColors.purple, color: lightColors.white }}
          onClick={() => alert('Aqui van los datos de Ubicación!')} ><RoomIcon />
        </Button>
        <Button
          tooltip="Garantias"
          rotate={true}
          styles={{ backgroundColor: darkColors.green, color: lightColors.white }}
          onClick={() => setModalGarantias(true)} ><VerifiedUserIcon />
        </Button>
        <Button
          tooltip="Ficha Técnica"
          rotate={true}
          styles={{ backgroundColor: darkColors.cyan, color: lightColors.white }}
          onClick={() => alert('Aqui van los datos de la Ficha Técnica!')} ><DescriptionIcon />
        </Button>
        <Button
          tooltip="Contratos"
          rotate={true}
          styles={{ backgroundColor: darkColors.red, color: lightColors.white }}
          onClick={() => alert('Información de Contratos!')} ><SupervisorAccountIcon />
        </Button>
        <Button
          tooltip="Información Equipos!"
          rotate={true}
          styles={{ backgroundColor: darkColors.lightBlue, color: lightColors.white }}
          onClick={() => alert('Selecciona Datos Adicionales de los Equipos!')} ><ZoomOutMapIcon /></Button>
      </Container>
    </div>

  );
}
