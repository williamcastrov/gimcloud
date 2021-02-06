const baseUrl = "http://127.0.0.1:8000/api/ordenesserv";
import axios from "axios";
const crearordenes = {};

crearordenes.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

crearordenes.listOrdenesServActivas = async () => {    
    const urlList = baseUrl+"/listar_ordenesservactivas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

crearordenes.listOrdenesServ = async () => {    
    const urlList = baseUrl+"/listar_ordenesserv"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

crearordenes.listOrdenesChequeo = async () => {    
    const urlList = baseUrl+"/listar_ordeneschequeo"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

crearordenes.listOrdenesChequeoActivas = async () => {    
    const urlList = baseUrl+"/listar_ordeneschequeoactivas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

crearordenes.listUnaOrden = async (id_otr) => {
    console.log("DATA UNA ORDEN : ",id_otr)
    const urlList = baseUrl+"/get/"+id_otr
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

crearordenes.update = async (data) => {
    //console.log(data);
    console.log("DATA : ", data.id_otr);
    const urlUpdate = baseUrl+"/update/"+data.id_otr
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

crearordenes.updateestadoasignado = async (data) => {
    console.log("DATA : ", data.id_otr);
    const urlUpdate = baseUrl+"/updateestadoasignado/"+data.id_otr
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

crearordenes.cancelar = async (data) => {
    console.log("DATA : ", data.id_otr);
    const urlUpdate = baseUrl+"/cancelar/"+data.id_otr
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

crearordenes.delete = async (id_equ) => {
    const urlDelete = baseUrl+"/delete/"+id_otr
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default crearordenes;