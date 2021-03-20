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

Route::get('initial-state', 'PantrioController@retrieveInitialState');
Route::post('areas', 'PantrioController@addArea');
Route::post('items', 'PantrioController@addItem');
Route::post('instances', 'PantrioController@addInstance');
Route::patch('instances/{instance}/quantity', 'PantrioController@setQuantity');
