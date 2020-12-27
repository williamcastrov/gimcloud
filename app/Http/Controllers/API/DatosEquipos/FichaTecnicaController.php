<?php

namespace App\Http\Controllers\API\DatosEquipos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Interlocutores\Interlocutores;
use App\Models\DatosEquipos\FichaTecnica;

class FichaTecnicaController extends Controller
{
    //
    public function create(Request $request){
        try { 
        $insert['id_fit']                      = $request['id_fit'];
        $insert['peso_fit']                    = $request['peso_fit'];
	      $insert['dimensiones_fit']             = $request['dimensiones_fit'];
	      $insert['codigoinventario_fit']        = $request['codigoinventario_fit'];
	      $insert['capacidad_fit']               = $request['capacidad_fit'];
	      $insert['alturamaximaelevacion_fit']   = $request['alturamaximaelevacion_fit'];
	      $insert['alturamastilcolapsado_fit']   = $request['alturamastilcolapsado_fit'];
	      $insert['horquillas_fit']              = $request['horquillas_fit'];
	      $insert['centrodecarga_fit']           = $request['centrodecarga_fit'];
	      $insert['tipodeoperacion_fit']         = $request['tipodeoperacion_fit'];
	      $insert['separacionbrazos_fit']        = $request['separacionbrazos_fit'];
	      $insert['alturabrazos_fit']            = $request['alturabrazos_fit'];
	      $insert['sideshift_fit']               = $request['sideshift_fit'];
	      $insert['bateriatraccion_fit']         = $request['bateriatraccion_fit'];
	      $insert['cargador_fit']                = $request['cargador_fit'];
	      $insert['medidacofrebateria_fit']      = $request['medidacofrebateria_fit'];
        $insert['tipoderuedafrontal_fit']      = $request['tipoderuedafrontal_fit'];
        $insert['tipoderuedatrasera_fit']      = $request['tipoderuedatrasera_fit'];
        $insert['tipoderuedadegiro_fit']       = $request['tipoderuedadegiro_fit'];
	      $insert['proveedor_fit']               = $request['proveedor_fit'];
	      $insert['denominacion_fit']            = $request['denominacion_fit'];
	      $insert['numerofabricante_fit']        = $request['numerofabricante_fit'];

          FichaTecnica::insert($insert);
      
          $response['message'] = "Ficha Tecnica del Equipo Grabada de forma correcta";
          $response['success'] = true;
      
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
    
    public function listar_fichatecnica(){  
        try {
          
          $data = DB::select("SELECT t0.*, t1.razonsocial_int, t2.descripcion_llan, t3.descripcion_tequ
          FROM fichatecnica as t0 INNER JOIN interlocutores as t1 INNER JOIN tiposdellantas as t2 INNER JOIN tiposequipos as t3
          WHERE t0.proveedor_fit = t1.id_int and t0.tipoderuedafrontal_fit = t2.id_llan and t0.tipodeoperacion_fit = t3.id_tequ");
  
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
    
    public function get($id_fit){
        try { 

          $data = DB::select("SELECT t0.*, t1.razonsocial_int, t2.descripcion_llan, t3.descripcion_tequ
          FROM fichatecnica as t0 INNER JOIN interlocutores as t1 INNER JOIN tiposdellantas as t2 INNER JOIN tiposequipos as t3
          WHERE t0.id_fit              = $id_fit    and t0.proveedor_fit          = t1.id_int 
          and t0.tipoderuedafrontal_fit = t2.id_llan and t0.tipodeoperacion_fit = t3.id_tequ ");
          
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data equipo_gar => $id_fit";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
    
    public function update(Request $request, $id_fit){
        try {
            $data['id_fit']                      = $request['id_fit'];
            $data['peso_fit']                    = $request['peso_fit'];
            $data['dimensiones_fit']             = $request['dimensiones_fit'];
            $data['codigoinventario_fit']        = $request['codigoinventario_fit'];
            $data['capacidad_fit']               = $request['capacidad_fit'];
            $data['alturamaximaelevacion_fit']   = $request['alturamaximaelevacion_fit'];
            $data['alturamastilcolapsado_fit']   = $request['alturamastilcolapsado_fit'];
            $data['horquillas_fit']              = $request['horquillas_fit'];
            $data['centrodecarga_fit']           = $request['centrodecarga_fit'];
            $data['tipodeoperacion_fit']         = $request['tipodeoperacion_fit'];
            $data['separacionbrazos_fit']        = $request['separacionbrazos_fit'];
            $data['alturabrazos_fit']            = $request['alturabrazos_fit'];
            $data['sideshift_fit']               = $request['sideshift_fit'];
            $data['bateriatraccion_fit']         = $request['bateriatraccion_fit'];
            $data['cargador_fit']                = $request['cargador_fit'];
            $data['medidacofrebateria_fit']      = $request['medidacofrebateria_fit'];
            $data['tipoderuedafrontal_fit']      = $request['tipoderuedafrontal_fit'];
            $data['tipoderuedatrasera_fit']      = $request['tipoderuedatrasera_fit'];
            $data['tipoderuedadegiro_fit']       = $request['tipoderuedadegiro_fit'];
            $data['proveedor_fit']               = $request['proveedor_fit'];
            $data['denominacion_fit']            = $request['denominacion_fit'];
            $data['numerofabricante_fit']        = $request['numerofabricante_fit'];
    
            $res = FichaTecnica::where("id_fit",$id_fit)->update($data);
    
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
        }   catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
            return $response;
    }
    
    public function delete($id_fit){ 
        try {
          $res = FichaTecnica::where("id_fit",$id_fit)->delete($id_fit);
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
