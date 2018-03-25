<?php

namespace App\Http\Controllers;

class WorksController extends ContentfulController
{

  public function index()
  {
    $this->query->setContentType("works")->orderBy("fields.date", false);

    $entries = $this->client->getEntries($this->query);
    setlocale (LC_TIME, "fr_FR.utf8");
    return view("realisations")->with("entries", $entries);
  }

}
