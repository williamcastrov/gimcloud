const baseUrl = "http://127.0.0.1:8000/api/ubicaciones";
import axios from "axios";
const ubicaciones = {};

ubicaciones.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

ubicaciones.listUbicaciones = async () => {
    const urlList = baseUrl+"/listar_ubicaciones"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

ubicaciones.listUnaUbicacion = async (equipoID) => {
    const urlList = baseUrl+"/get/"+equipoID
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}


ubicaciones.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.equipo_ubi
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

ubicaciones.delete = async (equipo_ubi) => {
    const urlDelete = baseUrl+"/delete/"+equipo_ubi
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default ubicaciones;