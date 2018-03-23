@extends('components.layout')
@section('content')
<section class="container is-padded-mobile">
    <div class="level is-pagetitle is-mobile">
      <div class="level-left content">
        <h1>Labo</h1>
      </div>
      <div class="level-right">
        <a class="toggle" href="#"><i class="ld ld-filter"></i> Filtres</a>
        <p class="filters">
          <span>:</span>
          <span class="tag">defe</span>
          <span class="tag is-info">defe</span>
        </p>
      </div>
    </div>
    <hr>
  <div class="column-grid column-duo">
    @foreach(array_reverse($entries->getItems()) as $entry)
    <a href="labo/{{ $entry->getSlug() }}" class="card card-lab">
      <div class="card-image">
        <figure class="image is-square">
          <img src="{{ $entry->getImg()->getFile()->getUrl() }}" alt="thumb">
        </figure>
      </div>
      <div class="card-content">
        <p class="title is-4">{{ $entry->getTitle() }}</p>
        <div class="level is-mobile">
          <div class="level-left">
            <p class="subtitle">{{ ucwords(strftime('%e %B %G', $entry->getCreatedAt()->getTimestamp())) }}</p>
          </div>
          <div class="level-right">
            <span class="tag">{{ ucfirst($entry->getCategory()) }}</span>
          </div>
        </div>
      </div>
    </a>
    @endforeach
  </div>
</section>
@endsection