<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Paises;

class PaisesController extends Controller
{
    //
    public function create(Request $request){

      try {
    
          $insert['id'] = $request['id'];
          $insert['nombre_pai'] = $request['nombre_pai'];

          Paises::insert($insert);
  
          $response['message'] = "Grabado de forma correcta";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = true;
        }
         
        return $response;
      }

      public function listar_paises(){

        try {

          $data = Paises::get();

          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }

      public function get($id){

        try {
  
          $data = Paises::find($id);
  
          if ($data) {
            $response['data'] = $data;
            $response['message'] = "Load successful";
            $response['success'] = true;
          }
          else {
            $response['data'] = null;
            $response['message'] = "Not found data id => $id";
            $response['success'] = false;
          }
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }

      public function update(Request $request, $id){

        try {
        
          $data['nombre_pai'] = $request['nombre_pai'];

          //Console::info('mymessage');

          $res = Paises::where("id",$id)->update($data);

          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
  
      }

      public function delete($id){

        try {
          $res = Paises::where("id",$id)->delete($id);
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
