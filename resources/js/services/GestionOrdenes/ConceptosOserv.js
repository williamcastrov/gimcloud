const baseUrl = "http://127.0.0.1:8000/api/conceptooserv";
import axios from "axios";
const conceptooserv = {};

conceptooserv.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

conceptooserv.listConceptoOserv = async () => {
    const urlList = baseUrl+"/listar_conceptooserv"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

conceptooserv.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_con
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

conceptooserv.delete = async (id_con) => {
    const urlDelete = baseUrl+"/delete/"+id_con
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default conceptooserv;