<?php

namespace App\Http\Controllers;
use Contentful\Delivery\Client as DeliveryClient;
use Contentful\Delivery\Query as Query;

class ContentfulController extends Controller
{
  public $client;
  public $query;

  public function __construct(DeliveryClient $client){
    $this->client = $client;
    $this->query = new Query();
  }

}
