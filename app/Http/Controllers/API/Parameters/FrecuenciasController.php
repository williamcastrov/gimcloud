<?php

namespace App\Http\Controllers\API\Parameters;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Frecuencias;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class FrecuenciasController extends Controller
{
    //
    public function create(Request $request){
      try { 
        $insert['codigo_fre']   = $request['codigo_fre'];
        $insert['nombre_fre']   = $request['nombre_fre'];
        $insert['empresa_fre']  = $request['empresa_fre'];
        $insert['estado_fre']   = $request['estado_fre'];
            
        Frecuencias::insert($insert);
    
        $response['message'] = "Frecuencia Grabada de forma correcta";
        $response['success'] = true;
    
      } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = true;
      }
      return $response;
    }
  
    public function listar_frecuencias(){  
      try {
        //$data = Frecuencias::with("empresa")->get();
        $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est FROM frecuencias as t0 INNER JOIN empresa as t1 
        INNER JOIN estados as t2 WHERE t0.empresa_fre = t1.id_emp and t0.estado_fre = t2.id_est" );

  
        $response['data'] = $data;
        // $response['data'] = $data1;
        $response['message'] = "load successful";
        $response['success'] = true;
    
      } catch (\Exception $e) {
        $response['message'] = $e->getMessage();
        $response['success'] = false;
      }
        return $response;
    }
  
    public function get($id_fre){
      try { 
        //$data = Frecuencias::find($id_fre);
       
        $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est FROM frecuencias as t0 INNER JOIN empresa as t1 
        INNER JOIN estados as t2 WHERE t0.id_fre = $id_fre and t0.empresa_fre = t1.id_emp and t0.estado_fre = t2.id_est" );
    
        if ($data) {
            $response['data'] = $data;
            $response['message'] = "Load successful";
            $response['success'] = true;
        }
        else {
            $response['data'] = null;
            $response['message'] = "Not found data id_fre => $id_fre";
            $response['success'] = false;
        }
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_fre){
      try {
        $data['codigo_fre']   = $request['codigo_fre'];
        $data['nombre_fre']   = $request['nombre_fre'];
        $data['empresa_fre']  = $request['empresa_fre'];      
        $data['estado_fre']   = $request['estado_fre'];
  
        $res = Frecuencias::where("id_fre",$id_fre)->update($data);
  
        $response['res'] = $res;
        $response['message'] = "Updated successful";
        $response['success'] = true;
      } catch (\Exception $e) {
        $response['message'] = $e->getMessage();
        $response['success'] = false;
      }
      return $response;
    }
  
    public function delete($id_fre){ 
      try {
        $res = Frecuencias::where("id_fre",$id_fre)->delete($id_fre);
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
