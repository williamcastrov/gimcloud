<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/employee/listar_empleados', 'App\Http\Controllers\API\EmployeeController@list');

Route::get('/paises/listar_paises', 'App\Http\Controllers\API\PaisesController@listar_paises');
Route::post('/paises/create', 'App\Http\Controllers\API\PaisesController@create');
Route::get('/paises/get/{id}', 'App\Http\Controllers\API\PaisesController@get');
Route::delete('/paises/delete/{id}', 'App\Http\Controllers\API\PaisesController@delete');
Route::put('/paises/update/{id}', 'App\Http\Controllers\API\PaisesController@update');

Route::get('/regiones/listar_regiones', 'App\Http\Controllers\API\RegionesController@listar_regiones');
Route::post('/regiones/create', 'App\Http\Controllers\API\RegionesController@create');
Route::get('/regiones/get/{id}', 'App\Http\Controllers\API\RegionesController@get');
Route::delete('/regiones/delete/{id}', 'App\Http\Controllers\API\RegionesController@delete');
Route::put('/regiones/update/{id}', 'App\Http\Controllers\API\RegionesController@update');

Route::get('/departamentos/listar_departamentos', 'App\Http\Controllers\API\DepartamentosController@listar_departamentos');
Route::post('/departamentos/create', 'App\Http\Controllers\API\DepartamentosController@create');
Route::get('/departamentos/get/{id}', 'App\Http\Controllers\API\DepartamentosController@get');
Route::delete('/departamentos/delete/{id}', 'App\Http\Controllers\API\DepartamentosController@delete');
Route::put('/departamentos/update/{id}', 'App\Http\Controllers\API\DepartamentosController@update');

Route::get('/ciudades/listar_ciudades', 'App\Http\Controllers\API\CiudadesController@listar_ciudades');
Route::post('/ciudades/create', 'App\Http\Controllers\API\CiudadesController@create');
Route::get('/ciudades/get/{id}', 'App\Http\Controllers\API\CiudadesController@get');
Route::delete('/ciudades/delete/{id}', 'App\Http\Controllers\API\CiudadesController@delete');
Route::put('/ciudades/update/{id}', 'App\Http\Controllers\API\CiudadesController@update');

Route::get('/tipointerlocutor/listar_tipointerlocutor', 'App\Http\Controllers\API\TipoInterlocutorController@listar_tipointerlocutor');
Route::post('/tipointerlocutor/create', 'App\Http\Controllers\API\TipoInterlocutorController@create');
Route::get('/tipointerlocutor/get/{id}', 'App\Http\Controllers\API\TipoInterlocutorController@get');
Route::delete('/tipointerlocutor/delete/{id}', 'App\Http\Controllers\API\TipoInterlocutorController@delete');
Route::put('/tipointerlocutor/update/{id}', 'App\Http\Controllers\API\TipoInterlocutorController@update');

Route::get('/especialidad/listar_especialidades', 'App\Http\Controllers\API\EspecialidadesController@listar_especialidades');
Route::post('/especialidad/create', 'App\Http\Controllers\API\EspecialidadesController@create');
Route::get('/especialidad/get/{id}', 'App\Http\Controllers\API\EspecialidadesController@get');
Route::delete('/especialidad/delete/{id}', 'App\Http\Controllers\API\EspecialidadesController@delete');
Route::put('/especialidad/update/{id}', 'App\Http\Controllers\API\EspecialidadesController@update');

Route::get('/estados/listar_estados', 'App\Http\Controllers\API\EstadosController@listar_estados');
Route::post('/estados/create', 'App\Http\Controllers\API\EstadosController@create');
Route::get('/estados/get/{id}', 'App\Http\Controllers\API\EstadosController@get');
Route::delete('/estados/delete/{id}', 'App\Http\Controllers\API\EstadosController@delete');
Route::put('/estados/update/{id}', 'App\Http\Controllers\API\EstadosController@update');

Route::get('/empresa/listar_empresa', 'App\Http\Controllers\API\EmpresaController@listar_empresa');
Route::post('/empresa/create', 'App\Http\Controllers\API\EmpresaController@create');
Route::get('/empresa/get/{id}', 'App\Http\Controllers\API\EmpresaController@get');
Route::delete('/empresa/delete/{id}', 'App\Http\Controllers\API\EmpresaController@delete');
Route::put('/empresa/update/{id}', 'App\Http\Controllers\API\EmpresaController@update');

Route::get('/usuarios/listar_usuarios', 'App\Http\Controllers\API\UsuariosController@listar_usuarios');
Route::post('/usuarios/create', 'App\Http\Controllers\API\UsuariosController@create');
Route::get('/usuarios/get/{id}', 'App\Http\Controllers\API\UsuariosController@get');
Route::put('/usuarios/update/{id}', 'App\Http\Controllers\API\UsuariosController@update');
Route::delete('/usuarios/delete/{id}', 'App\Http\Controllers\API\UsuariosController@delete');

Route::get('/dashboard/listar_dashboard', 'App\Http\Controllers\API\DashboardController@listar_dashboard');
