<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;

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

Route::group(['middleware' => 'api'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::apiResource('companies', 'CompanyController');
    // Need to use post requests for update as PHP seems to struggle with multipart forms PUT requests
    // https://github.com/laravel/framework/issues/13457
    Route::post('companies/{company}', [CompanyController::class, 'update']);
    Route::get('counters/companies', [CompanyController::class, 'count']);


    Route::apiResource('employees', 'EmployeeController');
    Route::post('employees/{employee}', [EmployeeController::class, 'update']);
    Route::get('counters/employees', [EmployeeController::class, 'count']);
});
