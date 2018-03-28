<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends ContentfulController
{

  public function index(){
    return view("pages.blog");
  }
}
