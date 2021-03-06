import url from "../../components/Url";
const baseUrl = `${url}/api/cumplimiento`;
import axios from "axios";
const cumplimientooserv = {};

cumplimientooserv.save = async (data) => {
    console.log("DATA : ", data.id_cosv)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

cumplimientooserv.listCumplimiento = async () => {
    const urlList = baseUrl+"/listar_cumplimiento"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.listUnCumplimiento = async (id_cosv) => {
    const urlList = baseUrl+"/get/"+id_cosv
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.listOserv = async (id_cosv) => {
    const urlList = baseUrl+"/getoser/"+id_cosv
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.update = async (data) => {
    console.log(data);
    console.log("DATA : ", data.id);
    const urlUpdate = baseUrl+"/update/"+data.id
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.delete = async (id) => {
    const urlDelete = baseUrl+"/delete/"+id
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default cumplimientooserv;