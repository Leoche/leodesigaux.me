@extends('layout')
@section('content')
<section class="container content blog-post is-padded-mobile">
  <figure class="image is-thumb" style="box-shadow: 0 5px 35px {{ $entry->getColor() }}; background: {{ $entry->getColor() }};">
      <img src="{{ $entry->getImg()->getFile()->getUrl() }}" alt="Image {{ $entry->getTitle() }}">
  </figure>
  <h1 class="has-text-centered">{{ $entry->getTitle() }}</h1>
  <p class="has-text-grey has-text-centered">Écrit par {{ $entry->getAuthor() }} le {{ ucwords(strftime('%d %B %G', $entry->getDate()->getTimestamp())) }}</p>
  <p class="is-tags">
  @foreach($entry->getTags() as $tag)
  <span class="tag">{{ $tag }}</span>
  @endforeach
  </p>
  <div class="spacer is-large"></div>
  <div class="content-post">
  {!! markdown($entry->getContent()) !!}
  </div>
</section>
@endsection

@push("scripts")
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/css.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/javascript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/xml.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.3.0/highlightjs-line-numbers.min.js"></script>
<script>
  hljs.initHighlightingOnLoad()
</script>
@endpush

@push("styles")
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-light.min.css">
@endpush