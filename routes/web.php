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
Route::get('/parametros/tipointerlocutores', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/especialidades', 'App\Http\Controllers\GimController@index');
Route::get('/parametros/estados', 'App\Http\Controllers\GimController@index');

