const baseUrl = "http://127.0.0.1:8000/api/subgruposequipos";   
import axios from "axios";
const subgruposequipos = {};

subgruposequipos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

subgruposequipos.listSubGruposequipos = async () => {
    const urlList = baseUrl+"/listar_subgruposequipos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

subgruposequipos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_sgre
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

subgruposequipos.delete = async (id_sgre) => {
    const urlDelete = baseUrl+"/delete/"+id_sgre
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default subgruposequipos;