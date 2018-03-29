@extends('layout')
@section('content')
<section class="container blog-list is-padded-mobile">

<div class="content">
  <h1 class="title">Blog</h1>
  <hr>
</div>
@foreach($entries->getItems() as $entry)
<article class="media">
  <figure class="media-left is-figure" style="box-shadow: 0 3px 15px {{ $entry->getColor() }}; background:{{ $entry->getImg()->getFile()->getUrl() }} cover;">
    <figure class="image is-128x128">
      <img src="{{ $entry->getImg()->getFile()->getUrl() }}" alt="Image {{ $entry->getTitle() }}">
    </figure>
  </figure>
  <div class="media-content">
    <div class="content">
      <div class="level blog-title">
        <div class="level-left"><h2>{{ $entry->getTitle() }}</h2> <small>écrit par <span class="has-text-black">{{ $entry->getAuthor() }}</span> le {{ ucwords(strftime('%d %B %G', $entry->getDate()->getTimestamp())) }}</small></div>
        <div class="level-right">
          @foreach($entry->getTags() as $tag)
          <span class="tag">{{ $tag }}</span>
          @endforeach
        </div>
      </div>
      <p>
        {{ $entry->getPreview() }}
      </p>
    </div>
    <nav>
      <a href="/blog/{{ $entry->getSlug() }}" class="readme">LIRE <i class="ld ld-chevrons-right"></i></a>
    </nav>
  </div>
</article>
@endforeach
</section>
@endsection