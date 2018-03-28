@extends('components.layout')
@section('content')
<section>
  <div class="container is-padded-mobile">
    <div class="level is-pagetitle is-mobile">
      <div class="level-left content">
        <h1>Réalisations</h1>
      </div>
      <div class="level-right">
        <a class="filters-toggle" href="#"><i class="ld ld-filter"></i> Filtres</a>
        <p class="filters">
          <span>:</span>
          @foreach($categories as $category => $items)
          <span class="tag" data-target="{{ $category }}">{{ $titles[$category] }}</span>
          @endforeach
        </p>
      </div>
    </div>
    <hr>
    <div class="column-grid column-tri">
      @foreach(array_reverse($entries->getItems()) as $entry)
      <div data-filtered="{{ $entry->getCategory() }}" class="card card-work">
        <div class="card-image">
          <figure class="image is-16by9">
            <img src="{{ $entry->getPreview()->getFile()->getUrl() }}" alt="Prévisualisation {{ $entry->getTitle() }}">
          </figure>
        </div>
        <div class="card-content">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="content">
                <div class="title">{{ $entry->getTitle() }}</div>
                <div class="subtitle">{{ $titles[$entry->getCategory()] }} <small class="has-text-grey has-text-italic">{{ ucwords(strftime('%B %G', $entry->getDate()->getTimestamp())) }}</small></div>
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
                @if( $entry->getLink() !== NULL)
                <a target="_blank" href="{{ explode(';', $entry->getLink())[1] }}">{{ explode(';', $entry->getLink())[0] }} <i class="ld ld-chevrons-right"></i></a>
                @endif
                @if( $entry->getLink2() !== NULL)
                <a target="_blank" href="{{ explode(';', $entry->getLink2())[1] }}">{{ explode(';', $entry->getLink2())[0] }} <i class="ld ld-chevrons-right"></i></a>
                @endif
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