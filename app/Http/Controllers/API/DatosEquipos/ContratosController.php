<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Ciudades;
use App\Models\Parameters\Estados;
use App\Models\Mantenimiento\Equipos;
use App\Models\Interlocutores\Interlocutores_emp;
use App\Models\Interlocutores\Interlocutores_cli;
use App\Models\DatosEquipos\Contratos;

class ContratosController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id_ctr']               = $request['id_ctr'];
          $insert['codigocontrato_ctr']   = $request['codigocontrato_ctr'];
          $insert['cliente_ctr']          = $request['cliente_ctr'];
          $insert['asesorcomercial_ctr']  = $request['asesorcomercial_ctr'];
          $insert['duracion_ctr']         = $request['duracion_ctr'];
          $insert['fechainicio_ctr']      = $request['fechainicio_ctr'];
          $insert['fechafinal_ctr']       = $request['fechafinal_ctr'];
          $insert['ciudad_ctr']           = $request['ciudad_ctr'];
          $insert['valorcontrato_ctr']    = $request['valorcontrato_ctr'];
          $insert['estado_ctr']           = $request['estado_ctr'];
          $insert['observacion_ctr']      = $request['observacion_ctr'];

          Contratos::insert($insert);
      
          $response['message'] = "Datos Adicionales del Equipo Grabado de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
         
        }
        return $response;
    }
    
    public function listar_contratos(){  
        try {
          $data = DB::select("SELECT t0.*, t1.nombre_ciu, t2.nombre_est, t3.descripcion_equ, t4.razonsocial_cli, t5.primer_nombre_emp,
                                           t5.segundo_nombre_emp, t5.primer_apellido_emp, t5.segundo_apellido_emp 
          FROM contratos as t0 INNER JOIN ciudades           as t1 INNER JOIN estados            as t2 INNER JOIN equipos as t3
                               INNER JOIN interlocutores_cli as t4 INNER JOIN interlocutores_emp as t5
          WHERE t0.ciudad_ctr  = t1.id_ciu and t0.estado_ctr          = t2.id_est and t0.id_ctr = t3.id_equ and
                t0.cliente_ctr = t4.id_cli and t0.asesorcomercial_ctr = t5.id_emp");
  
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
    
    public function get($id_ctr){
        try {
            $data = DB::select("SELECT t0.*, t1.nombre_ciu, t2.nombre_est, t3.descripcion_equ, t4.razonsocial_cli, t5.primer_nombre_emp,
                                             t5.segundo_nombre_emp, t5.primer_apellido_emp, t5.segundo_apellido_emp 
            FROM contratos as t0 INNER JOIN ciudades           as t1 INNER JOIN estados            as t2 INNER JOIN equipos as t3
                                 INNER JOIN interlocutores_cli as t4 INNER JOIN interlocutores_emp as t5
            WHERE t0.ciudad_ctr  = t1.id_ciu and t0.estado_ctr          = t2.id_est and t0.id_ctr = t3.id_equ and
                  t0.cliente_ctr = t4.id_cli and t0.asesorcomercial_ctr = t5.id_emp and t0.id_ctr = $id_ctr");
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data equipo_gar => $id_ctr";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_ctr){
        try {
            $data['id_ctr']              = $request['id_ctr'];
            $data['codigocontrato_ctr']  = $request['codigocontrato_ctr'];
            $data['cliente_ctr']         = $request['cliente_ctr'];
            $data['asesorcomercial_ctr'] = $request['asesorcomercial_ctr'];
            $data['duracion_ctr']        = $request['duracion_ctr'];
            $data['fechainicio_ctr']     = $request['fechainicio_ctr'];
            $data['fechafinal_ctr']      = $request['fechafinal_ctr'];
            $data['ciudad_ctr']          = $request['ciudad_ctr'];
            $data['valorcontrato_ctr']   = $request['valorcontrato_ctr'];
            $data['estado_ctr']          = $request['estado_ctr'];
            $data['observacion_ctr']     = $request['observacion_ctr'];
    
            $res = Contratos::where("id_ctr",$id_ctr)->update($data);
    
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
            return $response;
    }
    
    public function delete($id_ctr){ 
        $isError = false;
        $message = 'Success';
      
        try {
          $res = Contratos::where("id_ctr",$id_ctr)->delete($id_ctr);
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
