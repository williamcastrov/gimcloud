<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Departamentos;

class DepartamentosController extends Controller
{
    //
    public function create(Request $request){

      try {
    
          $insert['codigo_dep'] = $request['codigo_dep'];
          $insert['nombre_dep'] = $request['nombre_dep'];
          $insert['region_dep'] = $request['region_dep'];

          Departamentos::insert($insert);
  
          $response['message'] = "Departamento Grabado de forma correcta";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = true;
        }
         
        return $response;
    }

    public function listar_departamentos(){

        try {

          $data = Departamentos::with("region")->get();

          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }

    public function get($id_dep){

        try {
  
          $data = Departamentos::find($id_dep);
  
          if ($data) {
            $response['data'] = $data;
            $response['message'] = "Load successful";
            $response['success'] = true;
          }
          else {
            $response['data'] = null;
            $response['message'] = "Not found data id_dep => $id_dep";
            $response['success'] = false;
          }
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }

    public function update(Request $request, $id_dep){

        try {
        
          $data['codigo_dep'] = $request['codigo_dep'];
          $data['nombre_dep'] = $request['nombre_dep'];
          $data['region_dep'] = $request['region_dep'];
          
          //Console::info('mymessage');

          $res = Departamentos::where("id_dep",$id_dep)->update($data);

          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
  
    }

    public function delete($id_dep){

        try {
          $res = Departamentos::where("id_dep",$id_dep)->delete($id_dep);
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
