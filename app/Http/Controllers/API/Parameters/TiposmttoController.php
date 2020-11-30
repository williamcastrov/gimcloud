<?php

namespace App\Http\Controllers\API\Parameters;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Tiposmtto;

class TiposmttoController extends Controller
{
    //

    public function create(Request $request){

        try {
      
            $insert['codigo_tmt'] = $request['codigo_tmt'];
            $insert['nombre_tmt'] = $request['nombre_tmt'];
            $insert['empresa_tmt'] = $request['empresa_tmt'];
  
            Tiposmtto::insert($insert);
    
            $response['message'] = "Tipo de Mantenimiento Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
          }
           
          return $response;
        }
  
        public function listar_tiposmtto(){
  
          try {
  
            $data = Tiposmtto::with("empresa")->get();
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
      }
  
        public function get($id_tmt){
  
          try {
    
            $data = Tiposmtto::find($id_tmt);
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tmt => $id_tmt";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function update(Request $request, $id_tmt){
  
          try {
          
            $data['codigo_tmt'] = $request['codigo_tmt'];
            $data['nombre_tmt'] = $request['nombre_tmt'];
            $data['empresa_tmt'] = $request['empresa_tmt'];
  
            //Console::info('mymessage');
  
            $res = Tiposmtto::where("id_tmt",$id_tmt)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_tmt){
  
          try {
            $res = Tiposmtto::where("id_tmt",$id_tmt)->delete($id_tmt);
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
