<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/gim', function () {
    return view('gim');
});

// Rutas de Logueo y Registro de Usuarios
Route::get('/login', 'App\Http\Controllers\GimController@index');
Route::get('/auth/registrarusuario', 'App\Http\Controllers\GimController@index');

// Rutas de las Opciones de Maestros del sistema
Route::get('/parametros/paises', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/empresa', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/regiones', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/departamentos', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/ciudades', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/estados', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/unidades', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/monedas', 'App\Http\Controllers\GimController@index');

// Rutas del Modulo de Interlocutores
Route::get('/interlocutores/tipointerlocutores', 'App\Http\Controllers\GimController@index');
Route::get('/interlocutores/especialidades', 'App\Http\Controllers\GimController@index');
Route::get('/interlocutores/proveedores', 'App\Http\Controllers\GimController@index');
Route::get('/interlocutores/clientes', 'App\Http\Controllers\GimController@index');
Route::get('/interlocutores/empleados', 'App\Http\Controllers\GimController@index');

// Rutas del Modulo de Mantenimiento
Route::get('/mantenimiento/marcas', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/estadosclientes', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/estadosmtto', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/frecuencias', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/tiposmtto', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/gruposequipos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/subgruposequipos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/clasificacionABC', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/referencias', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/equipos', 'App\Http\Controllers\GimController@index');


// Rutas de Datos Adicionales de los Equipos
Route::get('/mantenimiento/garantias', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/contratos', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/fichatecnica', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/tiposllantas', 'App\Http\Controllers\GimController@index');
Route::get('/mantenimiento/tiposequipos', 'App\Http\Controllers\GimController@index');

// Rutas del Modulo de Activos
Route::get('/activos/areas', 'App\Http\Controllers\GimController@index');
Route::get('/activos/cencostos', 'App\Http\Controllers\GimController@index');

