const baseUrl = "http://127.0.0.1:8000/api/usuarios";
import axios from "axios";
const usuarios = {};

/*
empresa.list = async () => {
    const urlList = baseUrl + "/paises"
    const res = await axios.get(urlList)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}
*/

usuarios.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

usuarios.listUsuarios = async () => {
    const urlList = baseUrl+"/listar_usuarios"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

usuarios.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

usuarios.delete = async (id) => {
    const urlDelete = baseUrl+"/delete/"+id
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default usuarios;