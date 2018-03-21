@extends('components.layout')
@push('beforecontent')
<div class="landing landing--back">
  <div class="landing--curve"></div>
  <div class="landing--3d"></div>
</div>
@endpush
@section('content')
<div class="landing landing--front">
  <div class="container is-padded-mobile">
    <section class="landing--middle">
      <h4>Freelance</h4>
      <h1>Développeur Créatif</h1>
      <p>Pour tous vos projets Web et Mobile,<br/> je vous accompagne et mets en lumière vos idées et votre<br/> visibilité digitale.</p>
      <p class="buttons">
        <a class="button is-large is-success is-rounded">Contactez moi <i class="ld ld-send"></i></a>
        <a class="button is-large is-rounded has-icon">
          <span class="icon">
            <i class="ld ld-github"></i>
          </span>
        </a>
      </p>
    </section>
  </div>
</div>
<div class="container is-artistic is-padded-mobile">
  <div class="columns">
    <div class="column content has-text-right">
      <div class="title">
        <h3>Un projet qui vous ressemble</h3>
      </div>
      <p>Site web, applications, logiciels, je suis en mesure de metre en oeuvre votre projet à votre image en gardant les contraintes fixées. Restant en contact avec vous pendant tout le processus.</p>
    </div>
    <div class="column">
      <figure>
        <img src="/img/artiste2.png" alt="">
      </figure>
    </div>
  </div>
</div>
<div class="hero is-laptop">
  <div class="container">
    <div class="columns">
      <div class="column is-content">
        <div class="title">
          <h3>Je m'occupe de tout</h3>
          <p>De la création à la mise en ligne de votre projet,<br/>
          je prend soin de vous procurer une solution clé en main</p>
        </div>
        <div class="columns content is-mobile">
          <div class="column is-narrow">
            <div class="box-circle"><i class="ld ld-server"></i></div>
          </div>
          <div class="column">
            <h5>Hébergement</h5>
            <p>J'assure l'hébergement de votre projet via les services d'OVH pour un uptime maximum.</p>
          </div>
        </div>
        <div class="columns content is-mobile">
          <div class="column is-narrow">
            <div class="box-circle"><i class="ld ld-bookmark"></i></div>
          </div>
          <div class="column">
            <h5>Domaines</h5>
            <p>Choisissez votre nom de domaine selon les disponibilités et un renouvelement automatique est mis en place.</p>
          </div>
        </div>
        <div class="columns content is-mobile">
          <div class="column is-narrow">
            <div class="box-circle"><i class="ld ld-lock"></i></div>
          </div>
          <div class="column">
            <h5>Sécurité</h5>
            <p>Jamais trop prudent votre projet bénéficira d'une connexion sécurité sous HTTPS</p>
          </div>
        </div>
        <div class="columns content is-mobile">
          <div class="column is-narrow">
            <div class="box-circle"><i class="ld ld-truck"></i></div>
          </div>
          <div class="column">
            <h5>Disponibilité</h5>
            <p>Je reste disponible et m'engage à rester en contact avec vous quelque soit le problème. </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="laptop-container">
          <div class="laptop">
            <div class="laptop--screen"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection