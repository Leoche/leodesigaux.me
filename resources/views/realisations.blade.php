@extends('components.layout')
@section('content')
<section>
  <div class="container is-padded-mobile">
    <div class="content">
      <h1>Réalisations</h1>
      <hr>
    </div>
    <div class="column-grid column-tri">
      @foreach(array_reverse($entries->getItems()) as $entry)
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
</section>
@endsection