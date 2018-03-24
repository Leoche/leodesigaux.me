<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;

class ContactController extends Controller
{

  public function send(Request $req){
    $data = json_decode(key($req->all()));
    var_dump($_POST);
    exit();
    $errors = [];
    if ($data->name === ''){
      array_push($errors, ['name'=>'name', 'message'=>"Le champ nom et prénom est vide."]);
    }

    if ($data->email === ''){
      array_push($errors, ['name'=>'email', 'message'=>"Le champ email est vide."]);
    }
    else if (!preg_match_all("/(?![[:alnum:]]|@|-|_|\.)./", $data->email)) {
      array_push($errors, ['name'=>'email', 'message'=>$data->email]);
    }

    if ($data->message === ''){
      array_push($errors, ['name'=>'message', 'message'=>"Le champ message est vide."]);
    }
    else if (strlen($data->message) < 10){
      array_push($errors, ['name'=>'message', 'message'=>"Le champ message doit contenir au moins 10 charactères."]);
    }
    else if (strlen($data->message) > 800){
      array_push($errors, ['name'=>'message', 'message'=>"Le champ message doit contenir au maximum 800 charactères."]);
    }

    if(count($errors) > 0) {
      return response()->json(['success' => false, 'errors'=>$errors], 200, ['Access-Control-Allow-Origin' => '*', 'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS']);
    }
    return response()->json(['success' => true], 200, ['Access-Control-Allow-Origin' => '*', 'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS']);
  }

}
