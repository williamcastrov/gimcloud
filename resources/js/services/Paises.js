const baseUrl = "http://127.0.0.1:8000/api/paises";
import axios from "axios";
const pais = {};

/*
empresa.list = async () => {
    const urlList = baseUrl + "/paises"
    const res = await axios.get(urlList)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}
*/

pais.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

pais.listPaises = async () => {
    const urlList = baseUrl+"/listar_paises"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pais.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pais.delete = async (id) => {
    const urlDelete = baseUrl+"/delete/"+id
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default pais;