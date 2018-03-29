<?php
use Michelf\MarkdownExtra;

function isActive($beginWith, $isWild){
  if ($beginWith === "" && app("request")->path() === "/")  return "is-active";
  return (app('request')->is($beginWith.(($isWild) ? "*" : ""))) ? "is-active" : "";
}
function markdown($content){
  return MarkdownExtra::defaultTransform($content);
}