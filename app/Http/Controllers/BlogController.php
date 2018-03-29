<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends ContentfulController
{

  public function index(){
    $this->query->setContentType("blog")->orderBy("sys.createdAt", false);

    $entries = $this->client->getEntries($this->query);
    setlocale (LC_TIME, "fr_FR.utf8");
    return view("pages.blog")->with("entries", $entries);
  }

  public function view($slug)
  {
    $this->query->setContentType("blog")->where("fields.slug", $slug);

    $entries = $this->client->getEntries($this->query);
    $items = $entries->getItems();
    if ($items) {
      $item = $items[0];
      return view("pages.post")->with("entry", $item);
    } else {
      return abort(404);
    }
 }
}