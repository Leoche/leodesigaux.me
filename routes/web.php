<?php
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

$router->get('/realisations', "WorksController@index");

$router->get('/labo', "LabsController@index");
$router->get('/labo/{slug:[a-z\-]+}', "LabsController@view");


$router->get('/contact', function () use ($router) {
    return view('contact');
});
$router->group(['middleware' => 'throttle:255,1'], function () use ($router) {
  $router->post('/sendmail',"ContactController@send");
});