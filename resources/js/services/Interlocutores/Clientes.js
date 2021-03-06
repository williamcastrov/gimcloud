import url from "../../components/Url";
const baseUrl = `${url}/api/clientes`;   
import axios from "axios";
const clientes = {};

clientes.save = async (data) => {
    console.log(data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

clientes.listClientes = async () => {
    const urlList = baseUrl+"/listar_clientes"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

clientes.listUnCliente = async (id_cli) => {
    const urlList = baseUrl+"/get/"+id_cli
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

clientes.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_cli
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

clientes.delete = async (id_cli) => {
    const urlDelete = baseUrl+"/delete/"+id_cli
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default clientes;