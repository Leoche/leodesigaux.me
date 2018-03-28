<?php

namespace App\Http\Controllers;

class LabsController extends ContentfulController
{

  public function index()
  {
    $this->query->setContentType("lab")->orderBy("sys.createdAt", false);

    $entries = $this->client->getEntries($this->query);
    setlocale (LC_TIME, "fr_FR.utf8");
    return view("pages.labo")->with("entries", $entries);
  }

  public function view($slug)
  {
    $this->query->setContentType("lab")->where("fields.slug", $slug);

    $entries = $this->client->getEntries($this->query);
    $items = $entries->getItems();
    if ($items) {
      $item = $items[0];
      return view("pages.labopost")->with("entry", $item);
    } else {
      return abort(404);
    }
 }

  public function iframe($slug)
  {
    $this->query->setContentType("lab")->where("fields.slug", $slug);
    $entries = $this->client->getEntries($this->query);
    $items = $entries->getItems();
    if($items){
       $entry = $items[0];
       $html = htmlspecialchars_decode(strval($entry->getHtml()),ENT_HTML5);
       $html = str_replace("</head>", "<style>".$entry->getCss()."</style></head>", $entry->getHtml());
       $html = str_replace("</body>", "<script src='".$entry->getBundle()->getFile()->getUrl()."'></script></body>", $entry->getHtml());
       header('Content-Type: text/html; charset=utf-8');
       return $html;
    }else{
       return abort(404);
    }
  }
}
