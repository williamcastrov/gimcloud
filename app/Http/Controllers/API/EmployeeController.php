<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Perfil;
use App\Models\Employee;

class EmployeeController extends Controller
{
    //

    public function list(){

        try {
          $data = Employee::with("perfiles")->get();
          //$data = Employee::get();
          $response['data'] = $data;
          $response['success'] = true;
  
        } catch (\Exception $e) {
          $response['message'] = $e->getMessage();
          $response['success'] = false;
        }
        return $response;
  
    }
}
