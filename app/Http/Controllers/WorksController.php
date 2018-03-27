<?php

namespace App\Http\Controllers;

class WorksController extends ContentfulController
{

  public function index()
  {
    $this->query->setContentType("works")->orderBy("fields.date", false);

    $entries = $this->client->getEntries($this->query);
    setlocale (LC_TIME, "fr_FR.utf8");
    $content = array();
    $titles = array(
      "web"=>"Projets web",
      "game"=>"Jeux vidéo",
      "other"=>"Logiciels & autres"
    );
    foreach ($entries->getItems() as $entry) {
      if (isset($content[$entry->getCategory()])) {
        array_push($content[$entry->getCategory()], $entry);
      } else {
        $content[$entry->getCategory()] = [$entry];
      }
    }
    return view("realisations")->with("content", $content)->with("titles", $titles);
  }

}
