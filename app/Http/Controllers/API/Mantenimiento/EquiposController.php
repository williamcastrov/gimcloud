<?php

namespace App\Http\Controllers\API\Mantenimiento;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Mantenimiento\ClasificacionABC;
use App\Models\Activos\Cencosto;
use App\Models\Parameters\Frecuencias;
use App\Models\Interlocutores\Interlocutores;
use App\Models\Mantenimiento\Marcas;
use App\Models\Parameters\Monedas;
use App\Models\Mantenimiento\TiposEquipos;
use App\Models\Mantenimiento\Equipos;

//DROP TABLE IF EXISTS `grupos`;
//DROP TABLE IF EXISTS `subgrupos`;
class EquiposController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['codigo_equ']              = $request['codigo_equ'];
          $insert['empresa_equ']             = $request['empresa_equ'];
          $insert['nombre_equ']              = $request['nombre_equ'];
          $insert['frecuencia_equ']          = $request['frecuencia_equ'];
          $insert['estado_equ']              = $request['estado_equ'];
          $insert['propietario_equ']         = $request['propietario_equ'];
          $insert['marca_equ']               = $request['marca_equ'];
          $insert['modelo_equ']              = $request['modelo_equ'];
          $insert['antiguedad_equ']          = $request['antiguedad_equ'];
          $insert['tipoequipo_equ']          = $request['tipoequipo_equ'];
          $insert['serie_equ']               = $request['serie_equ'];
          $insert['fechacreacion_equ']       = $request['fechacreacion_equ'];
          $insert['fechamodificacion_equ']   = $request['fechamodificacion_equ'];
          $insert['direccion_equ']           = $request['direccion_equ'];
          $insert['valoradquisicion']        = $request['valoradquisicion'];
          $insert['tipomoneda_equ']          = $request['tipomoneda_equ'];
          $insert['clasificacionABC_equ']    = $request['clasificacionABC_equ'];
          $insert['centrodecosto_equ']       = $request['centrodecosto_equ'];
              
          Equipos::insert($insert);
      
          $response['message'] = "Equipo Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
        }
        return $response;
      }
    
      public function listar_equipos(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_abc, t4.nombre_cco,  t5.nombre_fre,
                                           t6.razonsocial_int, t7.nombre_mar, t8.nombre_mon, t9.nombre_tequ
          FROM equipos as t0 INNER JOIN empresa as       t1 INNER JOIN estados as     t2 INNER JOIN clasificacionABC as t3
                             INNER JOIN centrodecosto as t4 INNER JOIN frecuencias as t5 INNER JOIN interlocutores   as t6 
                             INNER JOIN marcas as        t7 INNER JOIN monedas as     t8 INNER JOIN tiposequipos     as t9
          WHERE t0.empresa_equ = t1.id_emp       and t0.estado_equ = t2.id_est     and t0.clasificacionABC_equ = t3.id_abc and
                t0.centrodecosto_equ = t4.id_cco and t0.frecuencia_equ = t5.id_fre and t0.propietario_equ = t6.id_int      and
                t6.codigo_tipo_int   = 2         and t0.marca_equ = t7.id_mar      and t0.tipomoneda_equ = t8.id_mon       and
                t0.tipoequipo_equ    = t9.id_tequ");
  
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
         
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est, t3.nombre_abc, t4.nombre_cco,  t5.nombre_fre,
                                           t6.razonsocial_int, t7.nombre_mar, t8.nombre_mon, t9.nombre_tequ
          FROM  equipos as t0 INNER JOIN empresa as      t1 INNER JOIN estados as     t2 INNER JOIN clasificacionABC as t3
                             INNER JOIN centrodecosto as t4 INNER JOIN frecuencias as t5 INNER JOIN interlocutores   as t6 
                             INNER JOIN marcas as        t7 INNER JOIN monedas as     t8 INNER JOIN tiposequipos     as t9
          WHERE t0.empresa_equ = t1.id_emp        and t0.estado_equ = t2.id_est     and t0.clasificacionABC_equ = t3.id_abc and
                t0.centrodecosto_equ = t4.id_cco  and t0.frecuencia_equ = t5.id_fre and t0.propietario_equ = t6.id_int      and
                t6.codigo_tipo_int   = 2          and t0.marca_equ = t7.id_mar      and t0.tipomoneda_equ = t8.id_mon       and
                t0.tipoequipo_equ    = t9.id_tequ and t0.id_equ = $id_equ ");

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
          $data['codigo_equ']              = $request['codigo_equ'];
          $data['empresa_equ']             = $request['empresa_equ'];
          $data['nombre_equ']              = $request['nombre_equ'];
          $data['frecuencia_equ']          = $request['frecuencia_equ'];
          $data['estado_equ']              = $request['estado_equ'];
          $data['propietario_equ']         = $request['propietario_equ'];
          $data['marca_equ']               = $request['marca_equ'];
          $data['modelo_equ']              = $request['modelo_equ'];
          $data['antiguedad_equ']          = $request['antiguedad_equ'];
          $data['tipoequipo_equ']          = $request['tipoequipo_equ'];
          $data['serie_equ']               = $request['serie_equ'];
          $data['fechacreacion_equ']       = $request['fechacreacion_equ'];
          $data['fechamodificacion_equ']   = $request['fechamodificacion_equ'];
          $data['direccion_equ']           = $request['direccion_equ'];
          $data['valoradquisicion']        = $request['valoradquisicion'];
          $data['tipomoneda_equ']          = $request['tipomoneda_equ'];
          $data['clasificacionABC_equ']    = $request['clasificacionABC_equ'];
          $data['centrodecosto_equ']       = $request['centrodecosto_equ'];
         
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
