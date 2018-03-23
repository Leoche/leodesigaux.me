<?php

namespace App\Http\Controllers;

class LabsController extends ContentfulController
{

  public function index()
  {
    $this->query->setContentType("lab");

    $entries = $this->client->getEntries($this->query);
    setlocale (LC_TIME, "fr_FR.utf8");
    return view("labo")->with("entries", $entries);
  }

}
