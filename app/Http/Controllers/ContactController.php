<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;

class ContactController extends Controller
{

  public function send(Request $req){

    $errors = [];
    if ($req->input('name') === ''){
      array_push($errors, ['name'=>'name', 'message'=>"Le champ nom et prénom est vide."]);
    }

    if ($req->input('email') === ''){
      array_push($errors, ['name'=>'email', 'message'=>"Le champ email est vide."]);
    }
    else if (!filter_var($req->input('email'), FILTER_VALIDATE_EMAIL)) {
      array_push($errors, ['name'=>'email', 'message'=>"Votre email est invalide."]);
    }

    if ($req->input('message') === ''){
      array_push($errors, ['name'=>'message', 'message'=>"Le champ message est vide."]);
    }
    else if (strlen($req->input('message')) < 10){
      array_push($errors, ['name'=>'message', 'message'=>"Le champ message doit contenir au moins 10 charactères."]);
    }
    else if (strlen($req->input('message')) > 800){
      array_push($errors, ['name'=>'message', 'message'=>"Le champ message doit contenir au maximum 800 charactères."]);
    }

    if(count($errors) > 0) {
      return response()->json(['success' => false, 'errors'=>$errors], 200, ['Access-Control-Allow-Origin' => '*', 'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS']);
    }

    $transporter = new \Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl');
    $transporter->setUsername(env('GMAIL_ID'));
    $transporter->setPassword(env('GMAIL_PASSWORD'));

    $mailer = new \Swift_Mailer($transporter);

    $message = new \Swift_Message('●●● Message de ' . $req->input('name'));
    $message->setReplyTo(array($req->input('email') => $req->input('name')));
    $message->setTo(array(env('GMAIL_TO')));
    $message->setFrom(array(env('GMAIL_TO')));
    $message->setBody(view('components.email')->with('content', $req->input('message'))->with('email', $req->input('email'))->with('name', $req->input('name')), 'text/html');

    if (!$mailer->send($message, $emailerrors)) {
      array_push($errors, ['name'=>'message', 'message'=>$emailerrors]);
      return response()->json(['success' => false, 'errors'=>$errors], 200, ['Access-Control-Allow-Origin' => '*', 'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS']);
    }

    return response()->json(['success' => true], 200, ['Access-Control-Allow-Origin' => '*', 'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS']);

  }

}
