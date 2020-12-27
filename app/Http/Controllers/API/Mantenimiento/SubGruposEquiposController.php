<?php

namespace App\Http\Controllers\API\Mantenimiento;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Mantenimiento\GruposEquipos;
use App\Models\Mantenimiento\SubGruposEquipos;

class SubGruposEquiposController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['codigo_sgre']        = $request['codigo_sgre'];
          $insert['grupo_sgre']         = $request['grupo_sgre'];
          $insert['descripcion_sgre']   = $request['descripcion_sgre'];
          $insert['empresa_sgre']       = $request['empresa_sgre'];
          $insert['estado_sgre']        = $request['estado_sgre'];
              
          SubGruposEquipos::insert($insert);
      
          $response['message'] = "Sub Grupo del Equipo Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
    
    public function listar_subgruposequipos(){  
        try {

          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.descripcion_grp
          FROM subgruposequipos as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN gruposequipos as t3
          WHERE t0.empresa_sgre = t1.id_emp and t0.estado_sgre = t2.id_est  and t0.grupo_sgre = t3.id_grp");
  
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
    
    public function get($id_sgre){
        try { 
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.descripcion_grp
          FROM subgruposequipos as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 INNER JOIN gruposequipos as t3
          WHERE t0.id_sgre = $id_sgre and t0.empresa_sgre = t1.id_emp and 
                t0.estado_sgre = t2.id_est and t0.grupo_sgre = t3.id_grp ");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_sgre => $id_sgre";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_sgre){
        try {
          $data['codigo_sgre']        = $request['codigo_sgre'];
          $data['grupo_sgre']         = $request['grupo_sgre'];
          $data['descripcion_sgre']   = $request['descripcion_sgre'];
          $data['empresa_sgre']       = $request['empresa_sgre'];
          $data['estado_sgre']        = $request['estado_sgre'];
    
          $res = SubGruposEquipos::where("id_sgre",$id_sgre)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
    }
    
    public function delete($id_sgre){ 
        try {
          $res = SubGruposEquipos::where("id_sgre",$id_sgre)->delete($id_sgre);
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
