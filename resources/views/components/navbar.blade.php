<div class="{{ (isset($is_home))?'is-transparent':'' }}">
  <div class="container is-navbar">
    <nav class="navbar" role="navigation" aria-label="main navigation" id="navMenuContainer">
      <div class="navbar-brand" id="navBrand">
        <a class="navbar-item" href="/">
          <div class="logo is-icon"></div>
          <div class="logo is-text"></div>
        </a>

        <div class="navbar-burger" data-target="navMenu" data-targetbrand="navBrand">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-end">
          <a href="/" class="navbar-item"><span>Accueil</span></a>
          <a href="/realisations" class="navbar-item"><span>Réalisations</span></a>
          <a href="/labo" class="navbar-item"><span>Labo</span></a>
          <a href="/blog" class="navbar-item"><span>Blog</span></a>
          <a href="/contact" class="navbar-item"><span>Contact</span></a>
        </div>
      </div>
    </nav>
  </div>
</div>