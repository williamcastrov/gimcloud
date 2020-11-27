<?php

namespace App\Http\Controllers\API\Parameters;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\TipoInterlocutor;

class TipoInterlocutorController extends Controller
{
    //
    public function create(Request $request){

        try {
      
            $insert['codigo_tint'] = $request['codigo_tint'];
            $insert['nombre_tint'] = $request['nombre_tint'];
            $insert['empresa_tint'] = $request['empresa_tint'];
  
            TipoInterlocutor::insert($insert);
    
            $response['message'] = "Tipo de Interlocutor Creado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
          }
           
          return $response;
        }
  
        public function listar_tipointerlocutor(){
  
          try {
  
            $data = TipoInterlocutor::with("empresa")->get();
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
      }
  
        public function get($id_tint){
  
          try {
    
            $data = TipoInterlocutor::find($id_tint);
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_tint => $id_tint";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function update(Request $request, $id_tint){
  
          try {
          
            $data['codigo_tint'] = $request['codigo_tint'];
            $data['nombre_tint'] = $request['nombre_tint'];
            $data['empresa_tint'] = $request['empresa_tint'];
  
            //Console::info('mymessage');
  
            $res = TipoInterlocutor::where("id_tint",$id_tint)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_tint){
  
          try {
            $res = TipoInterlocutor::where("id_tint",$id_tint)->delete($id_tint);
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
