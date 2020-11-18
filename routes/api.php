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

Route::get('/paises/listar_paises', 'App\Http\Controllers\API\PaisesController@listar_paises');
Route::post('/paises/create', 'App\Http\Controllers\API\PaisesController@create');
Route::get('/paises/get/{id}', 'App\Http\Controllers\API\PaisesController@get');
Route::delete('/paises/delete/{id}', 'App\Http\Controllers\API\PaisesController@delete');
Route::put('/paises/update/{id}', 'App\Http\Controllers\API\PaisesController@update');

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
