const baseUrl = "http://127.0.0.1:8000/api/referencias";   
import axios from "axios";
const referencias = {};

referencias.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

referencias.listReferencias = async () => {
    const urlList = baseUrl+"/listar_referencias"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

referencias.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.equipo_ref
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

referencias.delete = async (equipo_ref) => {
    const urlDelete = baseUrl+"/delete/"+equipo_ref
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default referencias;