@extends('components.layout')
@section('content')
<section class="container is-lab is-padded-mobile">
  <div class="columns is-nav">
    <div class="column is-narrow"><a href="/labo"><i class="ld ld-arrow-left"></i> Retour</a></div>
    <div class="column has-text-centered content"><h1>{{ $entry->getTitle() }}</h1></div>
    <div class="column is-narrow has-text-right has-text-centered-mobile">
      <a class="button is-rounded has-icon" target="_blank" href="{{ $entry->getGithub() }}">
        <i class="ld ld-github"></i>
        View on Github
      </a>
    </div>
  </div>
  <div class="columns">
    <div class="column has-text-centered has-text-grey">
      Change layout:
      <div class="ld-layout-toggle ld-layout-v is-active"></div>
      <div class="ld-layout-toggle ld-layout-h"></div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div class="spacer"></div>
      <div class="tabs is-fullwidth">
        <ul>
          <li class="tab-toggle" data-target="html">
            <a>
              <span class="icon is-small"><i class="ld ld-layout"></i></span>
              <span>HTML</span>
            </a>
          </li>
          <li class="tab-toggle" data-target="css">
            <a>
              <span class="icon is-small"><i class="ld ld-droplet"></i></span>
              <span>Style</span>
            </a>
          </li>
          <li class="tab-toggle" data-target="js">
            <a>
              <span class="icon is-small"><i class="ld ld-settings"></i></span>
              <span>Javascript</span>
            </a>
          </li>
        </ul>
      </div>
      <pre class="code code-html"><code>{{ $entry->getHtml() }}</code></pre>
      <pre class="code code-css"><code>{{ $entry->getCss() }}</code></pre>
      <pre class="code code-js"><code>{{ $entry->getJs() }}</code></pre>
    </div>
    <div class="column">
      <div class="frame">
        <iframe src="/labo/iframe/{{ $entry->getSlug() }}" frameborder="0" width="100%" height="100%"></iframe>
      </div>
    </div>
  </div>
  <div class="spacer is-large"></div>
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
  hljs.initLineNumbersOnLoad()
</script>
@endpush

@push("styles")
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-light.min.css">
@endpush