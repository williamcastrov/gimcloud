const baseUrl = "http://127.0.0.1:8000/api/estadosmtto";   
import axios from "axios";
const estadosmtto = {};

estadosmtto.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

estadosmtto.listEstadosMtto = async () => {
    const urlList = baseUrl+"/listar_estadosmtto"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

estadosmtto.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_estmtto
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

estadosmtto.delete = async (id_estmtto) => {
    const urlDelete = baseUrl+"/delete/"+id_estmtto
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default estadosmtto;