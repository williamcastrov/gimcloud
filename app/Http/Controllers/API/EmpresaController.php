<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Paises;

class EmpresaController extends Controller
{
    //
    public function list_paises(){ 
      $data = Paises::get();

      $response['data'] = $data;
      $response['succes'] = true;
      return $response;
    }

    public function create(Request $request){

      try {
          $insert['nombre_emp'] = $request['nombre_emp'];
          $insert['nit_emp'] = $request['nit_emp'];
          $insert['digitochequeo_emp'] = $request['digitochequeo_emp'];
          $insert['direccion_emp'] = $request['direccion_emp'];
          $insert['fecha_creacion_emp'] = $request['fecha_creacion_emp'];
          $insert['fecha_modificacion_emp'] = $request['fecha_modificacion_emp'];
          $insert['ciudad_emp'] = $request['ciudad_emp'];
          $insert['pais_emp'] = $request['pais_emp'];

          Empresa::insert($insert);
  
          $response['message'] = "Grabado de forma correcta";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = true;
        }
         
        return $response;
      }

      public function listar_empresa(){

        try {

          $data = Empresa::with("pais")->get();

          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }

    public function get($id_emp){

        try {
  
          $data = Empresa::find($id_emp);
  
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

      public function update(Request $request, $id_emp){

        try {
  
          $data['nombre_emp'] = $request['nombre_emp'];
          $data['nit_emp'] = $request['nit_emp'];
          $data['digitochequeo_emp'] = $request['digitochequeo_emp'];
          $data['direccion_emp'] = $request['direccion_emp'];
          $data['fecha_creacion_emp'] = $request['fecha_creacion_emp'];
          $data['fecha_modificacion_emp'] = $request['fecha_modificacion_emp'];
          $data['ciudad_emp'] = $request['ciudad_emp'];
          $data['pais_emp'] = $request['pais_emp'];

          //Console::info('mymessage');

          $res = Empresa::where("id_emp",$id_emp)->update($data);

          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
  
      }

      public function delete($id_emp){

        try {
          $res = Empresa::where("id_emp",$id_emp)->delete($id_emp);
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

