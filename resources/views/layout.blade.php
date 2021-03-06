<!DOCTYPE html>
<html>
<head>
  <title>Léo DESIGAUX - Développeur Créatif</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-light.min.css">
  <link rel="icon" href="{{ url('/favicon.ico?1') }}" />
  <link rel="icon" type="image/png" href="{{ url('/favicon.png?1') }}" />
  <link href="{{ url('/main.css?1') }}" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  @stack('style')
</head>
<body>
  @stack('beforecontent')
  @include('components.navbar')
  @yield('content')
  <footer class="footer">
  <div class="container">
    <div class="content columns">
      <div class="column">
        <div class="logo is-icon"></div>
        <div class="spacer"></div>
        <div class="logo is-text"></div>
        <div class="spacer is-large"></div>
        <p>N'hésitez pas à me contacter :)</p>
        <p class="has-text-grey">
          Téléphone: <a href="tel:+33650102564">+33 6 50 10 25 64</a><br/>
          Email: <a href="mailto:leodesigaux@gmail.com">leo.desigaux@gmail.com</a>
        </p>
        <p class="icons is-clearfix">
          <a target="_blank" href="https://twitter.com/le0che" class="link-twitter"><i class="ld ld-twitter"></i></a>
          <a target="_blank" href="https://github.com/leoche" class="link-github"><i class="ld ld-github"></i></a>
          <a target="_blank" href="https://soundcloud.com/leodes" class="link-soundcloud"><i class="ld ld-soundcloud"></i></a>
        </p>
      </div>
      <div class="column">
        <h3><span>Navigation</span></h3>
        <ul>
          <li><a class="{{ isActive("", false) }}" href="/">Accueil</a></li>
          <li><a class="{{ isActive("realisations", true) }}" href="/realisations">Réalisations</a></li>
          <li><a class="{{ isActive("labo", true) }}" href="/labo">Labo</a></li>
          <li><a class="{{ isActive("blog", true) }}" href="/blog">Blog</a></li>
          <li><a class="{{ isActive("contact", false) }}" href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="column">
        <h3><span>Informations</span></h3>
        <p>Ce site web est sous license <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a><br/>Son code source est disponible sur <a target="_blank" href="https://github.com/Leoche/leodesigaux.me">Github</a>.</p>
        <div class="spacer is-hidden-tablet"></div>
        <p class="credits">
          <a target="_blank" href="https://ovh.com">
            <span>Hébergé par</span>
            <img src="https://www.ovh.com/fr/news/logos/without-baseline/logo-ovh-sans-black-72DPI.png" alt="Hosted by Ovh">
          </a>
          <a target="_blank" href="https://bulma.io">
            <span>Réalisé avec</span>
            <img src="https://bulma.io/images/bulma-logo.png" alt="Made with Bulma">
          </a>
        </p>
      </div>
    </div>
  </div>
</footer>
  <script type="text/javascript" src="{{ url('/main.js') }}?de"></script>
  @stack('scripts')
</body>
</html>
