<?php

namespace App\Http\Controllers\API\GestionOrdenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GestionOrdenes\CumplimientoOServ;
use App\Models\GestionOrdenes\Ordenes;
use App\Models\GestionOrdenes\TipoOperacion;

class CumplimientoOServController extends Controller
{
    //
    public function create(Request $request){
        try { 
          $insert['id']                 = $request['id'];
          $insert['id_cosv']            = $request['id_cosv'];
          $insert['descripcion_cosv']   = $request['descripcion_cosv'];
          $insert['tipooperacion_cosv'] = $request['tipooperacion_cosv'];
          $insert['referencia_cosv']    = $request['referencia_cosv'];
          $insert['fechainicia_cosv']   = $request['fechainicia_cosv'];
          $insert['fechafinal_cosv']    = $request['fechafinal_cosv'];
          $insert['horainiciacosv']     = $request['horainiciacosv'];
          $insert['horafinal_cosv']     = $request['horafinal_cosv'];
          $insert['cantidad_cosv']      = $request['cantidad_cosv'];
          $insert['valorunitario_cosv'] = $request['valorunitario_cosv'];
          $insert['valortotal_cosv']    = $request['valortotal_cosv'];
          $insert['servicio_cosv']      = $request['servicio_cosv'];
          $insert['observacion_cosv']   = $request['observacion_cosv'];
              
          CumplimientoOServ::insert($insert);
      
          $response['message'] = "Cumplimiento Orden de Servicio Grabada de forma correcta";
          $response['success'] = true;

          
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
      }

      public function getoser($id_cosv){  
        try {
          
            $data = DB::select("SELECT t0.*
            FROM  ordenservicio as t0
            WHERE t0.id_cosv = $id_cosv");
  
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
    
      public function listar_cumplimiento(){  
        try {
          
            $data = DB::select("SELECT t0.*, t1.descripcion_tope, t2.descripcion_are
            FROM  cumplimientooserv as t0 INNER JOIN tipooperacion as t1 INNER JOIN actividadrealizada as t2
            WHERE t0.tipooperacion_cosv = t1.id_tope and t0.servicio_cosv = t2.id_are");
  
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
    
      public function get($id_cosv){
        try { 
          $data = DB::select("SELECT t0.*, t1.descripcion_tope, t2.descripcion_are
          FROM cumplimientooserv as t0 INNER JOIN tipooperacion as t1 INNER JOIN actividadrealizada as t2
          WHERE t0.id_cosv = $id_cosv and t0.tipooperacion_cosv = t1.id_tope and t0.servicio_cosv = t2.id_are ");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cosv => $id_cosv";
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
          $data['id']                 = $request['id'];
          $data['id_cosv']            = $request['id_cosv'];
          $data['descripcion_cosv']   = $request['descripcion_cosv'];
          $data['tipooperacion_cosv'] = $request['tipooperacion_cosv'];
          $data['referencia_cosv']    = $request['referencia_cosv'];
          $data['fechainicia_cosv']   = $request['fechainicia_cosv'];
          $data['fechafinal_cosv']    = $request['fechafinal_cosv'];
          $data['horainiciacosv']     = $request['horainiciacosv'];
          $data['horafinal_cosv']     = $request['horafinal_cosv'];
          $data['cantidad_cosv']      = $request['cantidad_cosv'];
          $data['valorunitario_cosv'] = $request['valorunitario_cosv'];
          $data['valortotal_cosv']    = $request['valortotal_cosv'];
          $data['servicio_cosv']      = $request['servicio_cosv'];
          $data['observacion_cosv']   = $request['observacion_cosv'];
    
          $res = CumplimientoOServ::where("id",$id)->update($data);
    
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
          $res = CumplimientoOServ::where("id",$id)->delete($id);
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
