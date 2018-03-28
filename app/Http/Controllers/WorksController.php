<?php

namespace App\Http\Controllers;

class WorksController extends ContentfulController
{

  public function index()
  {
    $this->query->setContentType("works")->orderBy("fields.date", false);

    $entries = $this->client->getEntries($this->query);
    setlocale (LC_TIME, "fr_FR.utf8");
    $categories = array();
    $titles = array(
      "web"=>"Projets web",
      "game"=>"Jeux vidéo",
      "other"=>"Logiciels & autres"
    );
    foreach ($entries->getItems() as $entry) {
      if (isset($categories[$entry->getCategory()])) {
        array_push($categories[$entry->getCategory()], $entry);
      } else {
        $categories[$entry->getCategory()] = [$entry];
      }
    }
    return view("pages.realisations")->with("categories", $categories)->with("titles", $titles)->with("entries", $entries);
  }

}
