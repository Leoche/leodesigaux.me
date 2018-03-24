<?php
use Illuminate\Http\Response;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return view('index')->with("is_home", true);
});

$router->get('/contact', function () use ($router) {
    return view('contact');
});
$router->get('/labo', "LabsController@index");
$router->get('/labo/{slug:[a-z\-]+}', "LabsController@view");


$router->post('/sendmail', function () use ($router) {
  return response()->json(['success' => false, 'errors'=>[["name"=>"name","message"=>"deefef"]]], 200, ['Access-Control-Allow-Origin' => '*', 'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS']);
});
