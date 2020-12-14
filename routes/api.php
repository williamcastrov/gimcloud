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

// Rutas definidas para los Parametros del Sistema
Route::get('/paises/listar_paises', 'App\Http\Controllers\API\Parameters\PaisesController@listar_paises');
Route::post('/paises/create', 'App\Http\Controllers\API\Parameters\PaisesController@create');
Route::get('/paises/get/{id}', 'App\Http\Controllers\API\Parameters\PaisesController@get');
Route::delete('/paises/delete/{id}', 'App\Http\Controllers\API\Parameters\PaisesController@delete');
Route::put('/paises/update/{id}', 'App\Http\Controllers\API\Parameters\PaisesController@update');

Route::get('/regiones/listar_regiones', 'App\Http\Controllers\API\Parameters\RegionesController@listar_regiones');
Route::post('/regiones/create', 'App\Http\Controllers\API\Parameters\RegionesController@create');
Route::get('/regiones/get/{id}', 'App\Http\Controllers\API\Parameters\RegionesController@get');
Route::delete('/regiones/delete/{id}', 'App\Http\Controllers\API\Parameters\RegionesController@delete');
Route::put('/regiones/update/{id}', 'App\Http\Controllers\API\Parameters\RegionesController@update');

Route::get('/departamentos/listar_departamentos', 'App\Http\Controllers\API\Parameters\DepartamentosController@listar_departamentos');
Route::post('/departamentos/create', 'App\Http\Controllers\API\Parameters\DepartamentosController@create');
Route::get('/departamentos/get/{id}', 'App\Http\Controllers\API\Parameters\DepartamentosController@get');
Route::delete('/departamentos/delete/{id}', 'App\Http\Controllers\API\Parameters\DepartamentosController@delete');
Route::put('/departamentos/update/{id}', 'App\Http\Controllers\API\Parameters\DepartamentosController@update');

Route::get('/ciudades/listar_ciudades', 'App\Http\Controllers\API\Parameters\CiudadesController@listar_ciudades');
Route::post('/ciudades/create', 'App\Http\Controllers\API\Parameters\CiudadesController@create');
Route::get('/ciudades/get/{id}', 'App\Http\Controllers\API\Parameters\CiudadesController@get');
Route::delete('/ciudades/delete/{id}', 'App\Http\Controllers\API\Parameters\CiudadesController@delete');
Route::put('/ciudades/update/{id}', 'App\Http\Controllers\API\Parameters\CiudadesController@update');

Route::get('/unidades/listar_unidades', 'App\Http\Controllers\API\Parameters\UnidadesController@listar_unidades');
Route::post('/unidades/create', 'App\Http\Controllers\API\Parameters\UnidadesController@create');
Route::get('/unidades/get/{id}', 'App\Http\Controllers\API\Parameters\UnidadesController@get');
Route::delete('/unidades/delete/{id}', 'App\Http\Controllers\API\Parameters\UnidadesController@delete');
Route::put('/unidades/update/{id}', 'App\Http\Controllers\API\Parameters\UnidadesController@update');

Route::get('/estados/listar_estados', 'App\Http\Controllers\API\Parameters\EstadosController@listar_estados');
Route::post('/estados/create', 'App\Http\Controllers\API\Parameters\EstadosController@create');
Route::get('/estados/get/{id}', 'App\Http\Controllers\API\Parameters\EstadosController@get');
Route::delete('/estados/delete/{id}', 'App\Http\Controllers\API\Parameters\EstadosController@delete');
Route::put('/estados/update/{id}', 'App\Http\Controllers\API\Parameters\EstadosController@update');

Route::get('/frecuencias/listar_frecuencias', 'App\Http\Controllers\API\Parameters\FrecuenciasController@listar_frecuencias');
Route::post('/frecuencias/create', 'App\Http\Controllers\API\Parameters\FrecuenciasController@create');
Route::get('/frecuencias/get/{id}', 'App\Http\Controllers\API\Parameters\FrecuenciasController@get');
Route::delete('/frecuencias/delete/{id}', 'App\Http\Controllers\API\Parameters\FrecuenciasController@delete');
Route::put('/frecuencias/update/{id}', 'App\Http\Controllers\API\Parameters\FrecuenciasController@update');

Route::get('/tiposmtto/listar_tiposmtto', 'App\Http\Controllers\API\Parameters\TiposmttoController@listar_tiposmtto');
Route::post('/tiposmtto/create', 'App\Http\Controllers\API\Parameters\TiposmttoController@create');
Route::get('/tiposmtto/get/{id}', 'App\Http\Controllers\API\Parameters\TiposmttoController@get');
Route::delete('/tiposmtto/delete/{id}', 'App\Http\Controllers\API\Parameters\TiposmttoController@delete');
Route::put('/tiposmtto/update/{id}', 'App\Http\Controllers\API\Parameters\TiposmttoController@update');

Route::get('/monedas/listar_monedas', 'App\Http\Controllers\API\Parameters\MonedasController@listar_monedas');
Route::post('/monedas/create', 'App\Http\Controllers\API\Parameters\MonedasController@create');
Route::get('/monedas/get/{id}', 'App\Http\Controllers\API\Parameters\MonedasController@get');
Route::delete('/monedas/delete/{id}', 'App\Http\Controllers\API\Parameters\MonedasController@delete');
Route::put('/monedas/update/{id}', 'App\Http\Controllers\API\Parameters\MonedasController@update');

Route::get('/empresa/listar_empresa', 'App\Http\Controllers\API\Parameters\EmpresaController@listar_empresa');
Route::post('/empresa/create', 'App\Http\Controllers\API\Parameters\EmpresaController@create');
Route::get('/empresa/get/{id}', 'App\Http\Controllers\API\Parameters\EmpresaController@get');
Route::delete('/empresa/delete/{id}', 'App\Http\Controllers\API\Parameters\EmpresaController@delete');
Route::put('/empresa/update/{id}', 'App\Http\Controllers\API\Parameters\EmpresaController@update');

// Rutas Gestión Interlocutores
Route::get('/tipointerlocutor/listar_tipointerlocutor', 'App\Http\Controllers\API\Interlocutores\TipoInterlocutoresController@listar_tipointerlocutor');
Route::post('/tipointerlocutor/create', 'App\Http\Controllers\API\Interlocutores\TipoInterlocutoresController@create');
Route::get('/tipointerlocutor/get/{id}', 'App\Http\Controllers\API\v\TipoInterlocutoresController@get');
Route::delete('/tipointerlocutor/delete/{id}', 'App\Http\Controllers\API\Interlocutores\TipoInterlocutoresController@delete');
Route::put('/tipointerlocutor/update/{id}', 'App\Http\Controllers\API\Interlocutores\TipoInterlocutoresController@update');

Route::get('/especialidad/listar_especialidades', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@listar_especialidades');
Route::post('/especialidad/create', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@create');
Route::get('/especialidad/get/{id}', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@get');
Route::delete('/especialidad/delete/{id}', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@delete');
Route::put('/especialidad/update/{id}', 'App\Http\Controllers\API\Interlocutores\EspecialidadesController@update');

Route::get('/proveedores/listar_proveedores', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@listar_proveedores');
Route::post('/proveedores/create', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@create');
Route::get('/proveedores/get/{id}', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@get');
Route::delete('/proveedores/delete/{id}', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@delete');
Route::put('/proveedores/update/{id}', 'App\Http\Controllers\API\Interlocutores\ProveedoresController@update');

Route::get('/clientes/listar_clientes', 'App\Http\Controllers\API\Interlocutores\ClientesController@listar_clientes');
Route::post('/clientes/create', 'App\Http\Controllers\API\Interlocutores\ClientesController@create');
Route::get('/clientes/get/{id}', 'App\Http\Controllers\API\Interlocutores\ClientesController@get');
Route::delete('/clientes/delete/{id}', 'App\Http\Controllers\API\Interlocutores\ClientesController@delete');
Route::put('/clientes/update/{id}', 'App\Http\Controllers\API\Interlocutores\ClientesController@update');

Route::get('/empleados/listar_empleados', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@listar_empleados');
Route::post('/empleados/create', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@create');
Route::get('/empleados/get/{id}', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@get');
Route::delete('/empleados/delete/{id}', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@delete');
Route::put('/empleados/update/{id}', 'App\Http\Controllers\API\Interlocutores\EmpleadosController@update');

// Rutas Gestión Usuarios
Route::get('/usuarios/listar_usuarios', 'App\Http\Controllers\API\Parameters\UsuariosController@listar_usuarios');
Route::post('/usuarios/create', 'App\Http\Controllers\API\Parameters\UsuariosController@create');
Route::get('/usuarios/get/{id}', 'App\Http\Controllers\API\Parameters\UsuariosController@get');
Route::put('/usuarios/update/{id}', 'App\Http\Controllers\API\Parameters\UsuariosController@update');
Route::delete('/usuarios/delete/{id}', 'App\Http\Controllers\API\Parameters\UsuariosController@delete');

Route::get('/dashboard/listar_dashboard', 'App\Http\Controllers\API\DashboardController@listar_dashboard');

// Rutas Gestión Equipos
Route::get('/marcas/listar_marcas', 'App\Http\Controllers\API\Mantenimiento\MarcasController@listar_marcas');
Route::post('/marcas/create', 'App\Http\Controllers\API\Mantenimiento\MarcasController@create');
Route::get('/marcas/get/{id}', 'App\Http\Controllers\API\Mantenimiento\MarcasController@get');
Route::delete('/marcas/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\MarcasController@delete');
Route::put('/marcas/update/{id}', 'App\Http\Controllers\API\Mantenimiento\MarcasController@update');

Route::get('/tiposequipos/listar_tiposequipos', 'App\Http\Controllers\API\Mantenimiento\TiposEquiposController@listar_tiposequipos');
Route::post('/tiposequipos/create', 'App\Http\Controllers\API\Mantenimiento\TiposEquiposController@create');
Route::get('/tiposequipos/get/{id}', 'App\Http\Controllers\API\Mantenimiento\TiposEquiposController@get');
Route::delete('/tiposequipos/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\TiposEquiposController@delete');
Route::put('/tiposequipos/update/{id}', 'App\Http\Controllers\API\Mantenimiento\TiposEquiposController@update');

Route::get('/clasificacionabc/listar_clasificacionabc', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@listar_clasificacionabc');
Route::post('/clasificacionabc/create', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@create');
Route::get('/clasificacionabc/get/{id}', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@get');
Route::delete('/clasificacionabc/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@delete');
Route::put('/clasificacionabc/update/{id}', 'App\Http\Controllers\API\Mantenimiento\ClasificacionABCController@update');

Route::get('/referencias/listar_referencias', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@listar_referencias');
Route::post('/referencias/create', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@create');
Route::get('/referencias/get/{id}', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@get');
Route::delete('/referencias/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@delete');
Route::put('/referencias/update/{id}', 'App\Http\Controllers\API\Mantenimiento\ReferenciasController@update');

Route::get('/garantias/listar_garantias', 'App\Http\Controllers\API\Mantenimiento\GarantiasController@listar_garantias');
Route::post('/garantias/create', 'App\Http\Controllers\API\Mantenimiento\GarantiasController@create');
Route::get('/garantias/get/{id}', 'App\Http\Controllers\API\Mantenimiento\GarantiasController@get');
Route::delete('/garantias/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\GarantiasController@delete');
Route::put('/garantias/update/{id}', 'App\Http\Controllers\API\Mantenimiento\GarantiasController@update');

Route::get('/equipos/listar_equipos', 'App\Http\Controllers\API\Mantenimiento\EquiposController@listar_equipos');
Route::post('/equipos/create', 'App\Http\Controllers\API\Mantenimiento\EquiposController@create');
Route::get('/equipos/get/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposController@get');
Route::delete('/equipos/delete/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposController@delete');
Route::put('/equipos/update/{id}', 'App\Http\Controllers\API\Mantenimiento\EquiposController@update');

// Rutas Administración Activos
Route::get('/areas/listar_areas', 'App\Http\Controllers\API\Activos\AreasController@listar_areas');
Route::post('/areas/create', 'App\Http\Controllers\API\Activos\AreasController@create');
Route::get('/areas/get/{id}', 'App\Http\Controllers\API\Activos\AreasController@get');
Route::delete('/areas/delete/{id}', 'App\Http\Controllers\API\Activos\AreasController@delete');
Route::put('/areas/update/{id}', 'App\Http\Controllers\API\Activos\AreasController@update');

Route::get('/cencostos/listar_cencostos', 'App\Http\Controllers\API\Activos\CencostoController@listar_cencostos');
Route::post('/cencostos/create', 'App\Http\Controllers\API\Activos\CencostoController@create');
Route::get('/cencostos/get/{id}', 'App\Http\Controllers\API\Activos\CencostoController@get');
Route::delete('/cencostos/delete/{id}', 'App\Http\Controllers\API\Activos\CencostoController@delete');
Route::put('/cencostos/update/{id}', 'App\Http\Controllers\API\Activos\CencostoController@update');



