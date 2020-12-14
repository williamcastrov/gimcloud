<?php

namespace App\Http\Controllers\API\Mantenimiento;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Mantenimiento\Equipos;
use App\Models\Mantenimiento\Referencias;

class ReferenciasController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['equipo_ref']  = $request['equipo_ref'];
          $insert['codigo_ref']  = $request['codigo_ref'];
          $insert['empresa_ref'] = $request['empresa_ref'];
          $insert['nombre_ref']  = $request['nombre_ref'];
          $insert['grupo_ref']   = $request['grupo_ref'];
          $insert['estado_ref']  = $request['estado_ref'];

          Referencias::insert($insert);
      
          $response['message'] = "Referencia del Equipo Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
        }
        return $response;
    }
    
    public function listar_referencias(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_equ
          FROM referencias as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN equipos as t3
          WHERE t0.empresa_ref = t1.id_emp and t0.estado_ref = t2.id_est and t0.equipo_ref = t3.codigo_equ");
  
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
    
    public function get($equipo_ref){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_equ
          FROM referencias as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN equipos as t3
          WHERE t0.equipo_ref = $equipo_ref and t0.empresa_ref = t1.id_emp and t0.estado_ref = t2.id_est and t0.equipo_ref = t3.codigo_equ");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data equipo_ref => $equipo_ref";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $equipo_ref){
        try {
            $data['equipo_ref']  = $request['equipo_ref'];
            $data['codigo_ref']  = $request['codigo_ref'];
            $data['empresa_ref'] = $request['empresa_ref'];
            $data['nombre_ref']  = $request['nombre_ref'];
            $data['grupo_ref']   = $request['grupo_ref'];
            $data['estado_ref']  = $request['estado_ref'];
    
          $res = Referencias::where("equipo_ref",$equipo_ref)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($equipo_ref){ 
        try {
          $res = Referencias::where("equipo_ref",$equipo_ref)->delete($equipo_ref);
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
