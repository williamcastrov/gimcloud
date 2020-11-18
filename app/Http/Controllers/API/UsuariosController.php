<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsuariosController extends Controller
{
    //
    public function create(Request $request){

        try {
            
            $insert['nit']          = $request['nit'];
            $insert['nombre']       = $request['nombre'];
            $insert['company']      = $request['company'];
            $insert['email']        = $request['email'];
            $insert['telefono']     = $request['telefono'];
            $insert['pais']         = $request['pais'];
            $insert['ciudad']       = $request['ciudad'];
            $insert['uid']          = $request['uid'];
            $insert['tipo']         = $request['tipo'];
            $insert['foto']         = $request['foto'];
            $insert['celular']      = $request['celular'];
            $insert['direccion']    = $request['direccion'];
            $insert['activo']       = $request['activo'];

            Usuarios::insert($insert);
  
            $response['message'] = "Grabado de forma correcta";
            $response['success'] = true;

        } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = true;
        }
        return $response;
    }

    public function listar_usuarios(){

        try {

          $data = Usuarios::get();

          $response['data'] = $data;
          $response['message'] = "load successful";
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
      }
}
