@extends('components.layout')
@section('content')
<section>
  <div class="container is-padded-mobile">
    <div class="level is-pagetitle is-mobile">
      <div class="level-left content">
        <h1>Réalisations</h1>
      </div>
      <div class="level-right">
        <a class="toggle" href="#"><i class="ld ld-filter"></i> Filtres</a>
        <p class="filters">
          <span>:</span>
          @foreach($content as $category => $entries)
          <span class="tag" data-target="{{ $category }}">{{ $titles[$category] }}</span>
          @endforeach
        </p>
      </div>
    </div>
    @foreach($content as $category => $entries)
    <div class="filtered" data-target="{{ $category }}">
      <div class="content">
        <h2><span>Coordonnées</span></h2>
      </div>
      <div class="column-grid column-tri">
        @foreach(array_reverse($entries) as $entry)
        <div class="card card-work">
          <div class="card-image">
            <figure class="image is-16by9">
              <img src="{{ $entry->getPreview()->getFile()->getUrl() }}" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="level is-mobile">
              <div class="level-left">
                <div class="content">
                  <div class="title">{{ $entry->getTitle() }}</div>
                  <div class="subtitle">{{ ucwords(strftime('%B %G', $entry->getDate()->getTimestamp())) }}</div>
                </div>
              </div>
              <div class="level-right">
                <i class="ld ld-monitor"></i>
                @if($entry->getResponsive())
                <i class="ld ld-smartphone"></i>
                @endif
              </div>
            </div>
            <div class="content">
              <p>{{ $entry->getDescription() }}</p>
            </div>
          </div>
          <div class="card-footer">
            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <a target="_blank" href="{{ $entry->getLink() }}">VISITER <i class="ld ld-chevrons-right"></i></a>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item tag-container">
                  @foreach($entry->getTags() as $tags)
                  <span>{{ $tags }}</span>
                  @endforeach
                </div>
              </div>
            </div>
          </div>
        </div>
        @endforeach
      </div>
    </div>
    @endforeach
  </div>
</section>
@endsection