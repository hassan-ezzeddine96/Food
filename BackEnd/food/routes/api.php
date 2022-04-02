<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FoodController;



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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('logout', [AuthController::class, 'logout']);
Route::get('user', [AuthController::class, 'getAuthUser']);

Route::resource('food', FoodController::class);
Route::get('getData', [FoodController::class, 'GetData']);
Route::get('getfood/{id}', [FoodController::class, 'GetFood']);
Route::get('getuser/{id}', [FoodController::class, 'GetUser']);
Route::get('getinbox/{id}', [FoodController::class, 'GetInbox']);
Route::post('inbox/{id}', [FoodController::class, 'UpdateInbox']);