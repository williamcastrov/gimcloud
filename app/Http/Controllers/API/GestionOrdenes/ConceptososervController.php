<?php

namespace App\Http\Controllers\API\GestionOrdenes;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GestionOrdenes\Conceptososerv;
use App\Models\Parameters\Empresa;
use App\Models\Parameters\Estados;

class ConceptososervController extends Controller
{
    //
    public function create(Request $request){

        try {
            $insert['id_con']          = $request['id_con'];
            $insert['descripcion_con'] = $request['descripcion_con'];
            $insert['empresa_con']     = $request['empresa_con'];
            $insert['estado_con']      = $request['estado_con'];

            Conceptososerv::insert($insert);
    
            $response['message'] = "Concepto de OTR Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
    }
  
    public function listar_conceptososerv(){
  
        try {
            //$data = Especialidades::with("empresa")->get();
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM conceptooserv as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.empresa_con = t1.id_emp and t0.estado_con = t2.id_est" );
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function get($id_con){
  
        try {    
            //$data = Especialidades::find($id_esp);
            $data = DB::select("SELECT t0.*, t1.nombre_emp, t2.nombre_est 
            FROM conceptooserv as t0 INNER JOIN empresa as t1 INNER JOIN estados as t2 
            WHERE t0.id_con = $id_con and t0.empresa_con = t1.id_emp and t0.estado_con = t2.id_est" );
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_con=> $id_con";
              $response['success'] = false;
            }
    
        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
        return $response;
    }
  
    public function update(Request $request, $id_con){
  
          try {
            $data['id_con']          = $request['id_con'];
            $data['descripcion_con'] = $request['descripcion_con'];
            $data['empresa_con']     = $request['empresa_con'];
            $data['estado_con']      = $request['estado_con'];
  
            //Console::info('mymessage');
  
            $res = Conceptososerv::where("id_con",$id_con)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
    
        }
  
        public function delete($id_con){
  
          try {
            $res = Conceptososerv::where("id_con",$id_con)->delete($id_con);
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
