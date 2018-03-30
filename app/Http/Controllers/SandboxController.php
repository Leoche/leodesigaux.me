<?php

namespace App\Http\Controllers;

class SandboxController extends ContentfulController
{

  public function ludumdare($edition)
  {
    return view("pages.ludumdare")->with("edition", $edition);
  }
}
