<?php

namespace App\Http\Controllers\API\Mantenimiento;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Parameters\Frecuencias;
use App\Models\Interlocutores\Interlocutores;
use App\Models\Mantenimiento\Marcas;
use App\Models\Mantenimiento\SubGruposEquipos;
use App\Models\Mantenimiento\GruposEquipos;
use App\Models\Mantenimiento\Equipos;

//DROP TABLE IF EXISTS `grupos`;
//DROP TABLE IF EXISTS `subgrupos`;
class EquiposController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['codigo_equ']              = $request['codigo_equ'];
          $insert['descripcion_equ']         = $request['descripcion_equ'];
          $insert['empresa_equ']             = $request['empresa_equ'];
          $insert['frecuencia_equ']          = $request['frecuencia_equ'];
          $insert['propietario_equ']         = $request['propietario_equ'];
          $insert['marca_equ']               = $request['marca_equ'];
          $insert['antiguedad_equ']          = $request['antiguedad_equ'];
          $insert['grupoequipo_equ']         = $request['grupoequipo_equ'];
          $insert['valoradquisicion_equ']    = $request['valoradquisicion_equ'];
          $insert['estadocontable_equ']      = $request['estadocontable_equ'];
          $insert['estadocliente_equ']       = $request['estadocliente_equ'];
          $insert['estadomtto_equ']          = $request['estadomtto_equ'];
          $insert['ctacontable_equ']         = $request['ctacontable_equ'];
          
          Equipos::insert($insert);
      
          $response['message'] = "Equipo Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_equipos(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.descripcion_fre, t3.razonsocial_int, t4.descripcion_mar,
                                     t5.descripcion_grp,  t5.codigogrupo_grp, t6.nombre_est, t7.nombre_estcli, t8.nombre_estmtto
          FROM equipos as t0 INNER JOIN empresa as t1 INNER JOIN frecuencias   as t2 INNER JOIN interlocutores as t3
                             INNER JOIN marcas  as t4 INNER JOIN gruposequipos as t5 INNER JOIN estados        as t6
                             INNER JOIN estadoscliente as t7 INNER JOIN estadosmtto as t8
          WHERE t0.empresa_equ        = t1.id_emp and t0.frecuencia_equ     = t2.id_fre    and t0.propietario_equ = t3.id_int     and
                t0.marca_equ          = t4.id_mar    and t0.grupoequipo_equ = t5.id_grp    and
                t0.estadocontable_equ = t6.id_est and t0.estadocliente_equ  = t7.id_estcli and t0.estadomtto_equ  = t8.id_estmtto");
  
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
    
      public function get($id_equ){
        try { 
          //$data = Frecuencias::find($id_fre);
         
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.descripcion_fre, t3.razonsocial_int, t4.descripcion_mar,
                                     t5.descripcion_grp,  t5.codigogrupo_grp, t6.nombre_est, t7.nombre_estcli, t8.nombre_estmtto
          FROM equipos as t0 INNER JOIN empresa as t1 INNER JOIN frecuencias   as t2 INNER JOIN interlocutores as t3
                             INNER JOIN marcas  as t4 INNER JOIN gruposequipos as t5 INNER JOIN estados        as t6
                             INNER JOIN estadoscliente as t7 INNER JOIN estadosmtto as t8
          WHERE t0.empresa_equ        = t1.id_emp and t0.frecuencia_equ    = t2.id_fre    and t0.propietario_equ = t3.id_int     and
                t0.marca_equ         = t4.id_mar    and t0.grupoequipo_equ = t5.id_grp    and
                t0.estadocontable_equ = t6.id_est and t0.estadocliente_equ = t7.id_estcli and t0.estadomtto_equ  = t8.id_estmtto and
                t0.id_equ = $id_equ");

          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_equ => $id_equ";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_equ){
        try {
          $data['codigo_equ']           = $request['codigo_equ'];
          $data['descripcion_equ']      = $request['descripcion_equ'];
          $data['empresa_equ']          = $request['empresa_equ'];
          $data['frecuencia_equ']       = $request['frecuencia_equ'];
          $data['propietario_equ']      = $request['propietario_equ'];
          $data['marca_equ']            = $request['marca_equ'];
          $data['antiguedad_equ']       = $request['antiguedad_equ'];
          $data['grupoequipo_equ']      = $request['grupoequipo_equ'];
          $data['valoradquisicion_equ'] = $request['valoradquisicion_equ'];
          $data['estadocontable_equ']   = $request['estadocontable_equ'];
          $data['estadocliente_equ']    = $request['estadocliente_equ'];
          $data['estadomtto_equ']       = $request['estadomtto_equ'];
          $data['ctacontable_equ']      = $request['ctacontable_equ'];
            
          $res = Equipos::where("id_equ",$id_equ)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_equ){ 
        try {
          $res = Equipos::where("id_equ",$id_equ)->delete($id_equ);
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
