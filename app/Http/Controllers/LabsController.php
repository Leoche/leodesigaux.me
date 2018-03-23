<?php

namespace App\Http\Controllers;

class LabsController extends ContentfulController
{

  public function index()
  {
    $this->query->setContentType("lab")->orderBy("sys.createdAt", false);

    $entries = $this->client->getEntries($this->query);
    setlocale (LC_TIME, "fr_FR.utf8");
    return view("labo")->with("entries", $entries);
  }

  public function view($slug)
  {
    $this->query->setContentType("lab")->where("fields.slug", $slug);

    $entries = $this->client->getEntries($this->query);
    $items = $entries->getItems();
    if ($items) {
      $item = $items[0];
      return view("labopost")->with("entry", $item);
    } else {
      return abort(404);
    }

   return view("labo")->with("entries", $entries);
 }

}
