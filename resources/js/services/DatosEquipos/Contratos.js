const baseUrl = "http://127.0.0.1:8000/api/contratos";   
import axios from "axios";
const contratos = {};

contratos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

contratos.listContratos = async () => {
    const urlList = baseUrl+"/listar_contratos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.listUnContrato = async (equipoID) => {
    console.log(equipoID);
    const urlList = baseUrl+"/get/"+equipoID
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_ctr
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.delete = async (id_ctr) => {
    const urlDelete = baseUrl+"/delete/"+id_ctr
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default contratos;