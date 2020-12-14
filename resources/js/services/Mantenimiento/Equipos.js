const baseUrl = "http://127.0.0.1:8000/api/equipos";
import axios from "axios";
const equipos = {};

equipos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

equipos.listEquipos = async () => {
    const urlList = baseUrl+"/listar_equipos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.update = async (data) => {
    //console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_equ
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.delete = async (id_equ) => {
    const urlDelete = baseUrl+"/delete/"+id_equ
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default equipos;