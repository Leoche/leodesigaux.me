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
          <a class="navbar-item {{ isActive("", false) }}" href="/"><span>Accueil</span></a>
          <a class="navbar-item {{ isActive("realisations", true) }}" href="/realisations"><span>Réalisations</span></a>
          <a class="navbar-item {{ isActive("labo", true) }}" href="/labo"><span>Labo</span></a>
          <a class="navbar-item {{ isActive("blog", true) }}" href="/blog"><span>Blog</span></a>
          <a class="navbar-item {{ isActive("contact", false) }}" href="/contact"><span>Contact</span></a>
        </div>
      </div>
    </nav>
  </div>
</div>