<?php

namespace App\Http\Controllers\API\GestionOrdenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;
use App\Models\Parameters\Ciudades;
use App\Models\Interlocutores\Interlocutores;
use App\Models\Interlocutores\Interlocutores_cli;
use App\Models\Interlocutores\Interlocutores_emp;
use App\Models\GestionOrdenes\Conceptososerv;
use App\Models\Mantenimiento\SubGruposEquipos;
use App\Models\Mantenimiento\GruposEquipos;
use App\Models\Mantenimiento\Equipos;
use App\Models\Mantenimiento\ClasificacionABC;
use App\Models\Mantenimiento\Tiposmtto;
use App\Models\GestionOrdenes\Ordenes;

class OrdenesController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['estado_otr']             = $request['estado_otr'];
          $insert['tipo_otr']               = $request['tipo_otr'];
          $insert['concepto_otr']           = $request['concepto_otr'];
          $insert['fechaprogramada_otr']    = $request['fechaprogramada_otr'];
          $insert['fechainicia_otr']        = $request['fechainicia_otr'];
          $insert['fechafinal_otr']         = $request['fechafinal_otr'];
          $insert['diasoperacion_otr']      = $request['diasoperacion_otr'];
          $insert['equipo_otr']             = $request['equipo_otr'];
          $insert['proveedor_otr']          = $request['proveedor_otr'];
          $insert['cliente_otr']            = $request['cliente_otr'];
          $insert['operario_otr']           = $request['operario_otr'];
          $insert['grupoequipo_otr']        = $request['grupoequipo_otr'];
          $insert['subgrupoequipo_otr']     = $request['subgrupoequipo_otr'];
          $insert['ciudad_otr']             = $request['ciudad_otr'];
          $insert['resumenorden_otr']       = $request['resumenorden_otr'];
          $insert['prioridad_otr']          = $request['prioridad_otr'];
          $insert['empresa_otr']            = $request['empresa_otr'];
          
          Ordenes::insert($insert);
      
          $response['message'] = "Orden de Servicio Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }
    
      public function listar_ordenesserv(){  
        try {
          //Muestra Unicamente los tipos de Interlocutores PROVEEDORES = 1
          $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est,        t3.nombre_ciu,       t4.razonsocial_int,
                                     t5.razonsocial_cli,  t6.razonsocial_emp,   t7.descripcion_con,  t8.descripcion_sgre,
                                     t9.descripcion_grp,  t10.descripcion_equ,  t11.descripcion_abc, t12.descripcion_tmt
          FROM ordenservicio as t0 INNER JOIN empresa as t1 INNER JOIN estados  as t2 INNER JOIN ciudades as t3
                                   INNER JOIN interlocutores as t4 INNER JOIN interlocutores_cli as t5 
                                   INNER JOIN interlocutores_emp as t6  INNER JOIN conceptooserv  as t7 
                                   INNER JOIN subgruposequipos as t8  INNER JOIN gruposequipos as t9 
                                   INNER JOIN equipos as t10  INNER JOIN clasificacionABC as t11 
                                   INNER JOIN tiposmantenimiento as t12  INNER JOIN ordenservicio as t13
          WHERE t0.ciudad_otr     = t3.id_ciu and t0.cliente_otr        = t5.id_cli  and t0.concepto_otr  = t7.id_con
            and t0.operario_otr   = t6.id_emp and t0.empresa_otr        = t1.id_emp  and t0.equipo_otr    = t10.id_equ
            and t0.estado_otr     = t2.id_est and t0.grupoequipo_otr    = t9.id_grp  and t0.prioridad_otr = t11.id_abc  
            and t0.proveedor_otr  = t4.id_int and t0.subgrupoequipo_otr = t8.id_sgre and t0.tipo_otr      = t12.id_tmt");

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
    
      public function get($id_otr){
        try { 
          //$data = Frecuencias::find($id_fre);
         
          $data = DB::select("SELECT t0.*, t1.nombre_emp,       t2.nombre_est,        t3.nombre_ciu,       t4.razonsocial_int,
                                           t5.razonsocial_cli,  t6.razonsocial_emp,   t7.descripcion_con,  t8.descripcion_sgre,
                                           t9.descripcion_grp,  t10.descripcion_equ,  t11.descripcion_abc, t12.descripcion_tmt
          FROM ordenservicio as t0 INNER JOIN empresa            as t1  INNER JOIN estados            as t2 INNER JOIN ciudades as t3
                                   INNER JOIN interlocutores     as t4  INNER JOIN interlocutores_cli as t5 
                                   INNER JOIN interlocutores_emp as t6  INNER JOIN conceptooserv      as t7 
                                   INNER JOIN subgruposequipos   as t8  INNER JOIN gruposequipos      as t9 
                                   INNER JOIN equipos            as t10 INNER JOIN clasificacionABC   as t11 
                                   INNER JOIN tiposmantenimiento as t12 INNER JOIN ordenservicio      as t13
          WHERE t0.ciudad_otr     = t3.id_ciu and t0.cliente_otr        = t5.id_cli  and t0.concepto_otr  = t7.id_con
            and t0.operario_otr   = t6.id_emp and t0.empresa_otr        = t1.id_emp  and t0.equipo_otr    = t10.id_equ
            and t0.estado_otr     = t2.id_est and t0.grupoequipo_otr    = t9.id_grp  and t0.prioridad_otr = t11.id_abc  
            and t0.proveedor_otr  = t4.id_int and t0.subgrupoequipo_otr = t8.id_sgre and t0.tipo_otr      = t12.id_tmt 
            and t0.id_otr         = $id_otr");

          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_equ => $id_otr";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
      }
    
      public function update(Request $request, $id_otr){
        try {
            $data['estado_otr']             = $request['estado_otr'];
            $data['tipo_otr']               = $request['tipo_otr'];
            $data['concepto_otr']           = $request['concepto_otr'];
            $data['fechaprogramada_otr']    = $request['fechaprogramada_otr'];
            $data['fechainicia_otr']        = $request['fechainicia_otr'];
            $data['fechafinal_otr']         = $request['fechafinal_otr'];
            $data['diasoperacion_otr']      = $request['diasoperacion_otr'];
            $data['equipo_otr']             = $request['equipo_otr'];
            $data['proveedor_otr']          = $request['proveedor_otr'];
            $data['cliente_otr']            = $request['cliente_otr'];
            $data['operario_otr']           = $request['operario_otr'];
            $data['grupoequipo_otr']        = $request['grupoequipo_otr'];
            $data['subgrupoequipo_otr']     = $request['subgrupoequipo_otr'];
            $data['ciudad_otr']             = $request['ciudad_otr'];
            $data['resumenorden_otr']       = $request['resumenorden_otr'];
            $data['prioridad_otr']          = $request['prioridad_otr'];
            $data['empresa_otr']            = $request['empresa_otr'];
            
          $res = Ordenes::where("id_otr",$id_otr)->update($data);
    
          $response['res'] = $res;
          $response['message'] = "Updated successful";
          $response['success'] = true;
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
    
      public function delete($id_otr){ 
        try {
          $res = Ordenes::where("id_otr",$id_otr)->delete($id_otr);
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
