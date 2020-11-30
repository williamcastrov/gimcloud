const baseUrl = "http://127.0.0.1:8000/api/interlocutores";   
import axios from "axios";
const interlocutores = {};

interlocutores.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

interlocutores.listInterlocutores = async () => {
    const urlList = baseUrl+"/listar_interlocutores"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

interlocutores.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_int
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

interlocutores.delete = async (id_int) => {
    const urlDelete = baseUrl+"/delete/"+id_int
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default interlocutores;