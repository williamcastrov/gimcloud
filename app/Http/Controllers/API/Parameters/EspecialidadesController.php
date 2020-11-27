<?php

namespace App\Http\Controllers\API\Parameters;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Especialidades;

class EspecialidadesController extends Controller
{
    //
    public function create(Request $request){

        try {
      
            $insert['codigo_esp'] = $request['codigo_esp'];
            $insert['nombre_esp'] = $request['nombre_esp'];
            $insert['empresa_esp'] = $request['empresa_esp'];
            $insert['estado_esp'] = $request['estado_esp'];
  
            Especialidades::insert($insert);
    
            $response['message'] = "Especialidad del Interlocutor Grabada de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
          }
           
          return $response;
        }
  
        public function listar_especialidades(){
  
          try {
  
            $data = Especialidades::with("empresa")->get();
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function get($id_esp){
  
          try {
    
            $data = Especialidades::find($id_esp);
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_esp => $id_esp";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function update(Request $request, $id_esp){
  
          try {
          
            $data['codigo_esp'] = $request['codigo_esp'];
            $data['nombre_esp'] = $request['nombre_esp'];
            $data['empresa_esp'] = $request['empresa_esp'];
            $data['estado_esp'] = $request['estado_esp'];
  
            //Console::info('mymessage');
  
            $res = Especialidades::where("id_esp",$id_esp)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_esp){
  
          try {
            $res = Especialidades::where("id_esp",$id_esp)->delete($id_esp);
            $response['res'] = $res;
  
            $response['message'] = "Deleted successful";
            $response['success'] = true; 
            
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
    
          return $response;
        }  
}
