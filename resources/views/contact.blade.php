@extends('components.layout')
@section('content')
<section class="container is-padded-mobile">
  <div class="columns">
    <div class="column is-half">
      <div class="content">
        <div class="card-contact">
          <div class="card-symbols"></div>
          <div class="card-front">
            <h1>Contact</h1>
            <p class="has-text-grey">Une idée, un projet ou une demande d'informations.<br/>Gardons contact! <i class="ld ld-tag_faces"></i></p>
             <form action="#" class="is-form" method="post" enctype="multipart/form-data" >
              <div class="field">
                <div class="control has-icons-left">
                  <input class="input input-name" type="text" placeholder="Nom est prénom...">
                  <span class="icon is-medium is-left">
                    <i class="ld ld-user ld-md"></i>
                  </span>
                </div>
                <p class="help is-danger"></p>
              </div>

              <div class="field">
                <div class="control has-icons-left">
                  <input class="input input-email" type="email" placeholder="Email...">
                  <span class="icon is-medium is-left">
                    <i class="ld ld-at ld-md"></i>
                  </span>
                </div>
                <p class="help is-danger"></p>
              </div>

              <div class="field">
                <div class="control">
                  <textarea class="textarea input-message" placeholder="Comment puis-je vous aider?"></textarea>
                </div>
                <p class="help is-danger"></p>
              </div>
              <div class="is-global has-text-danger"></div>
              <div class="field is-grouped is-grouped-right">
                <div class="control">
                  <a href="#" class="button is-white is-cancel">Effacer</a>
                  <a href="#" class="button is-info is-submit">Envoyer</a>
                </div>
              </div>
            </form>
            <div class="empty">
              <i class="ld ld-tag_faces ld-5x"></i>
              <h2>Merci de votre message</h2>
              <p>Je prendrais soin de vous répondre dans les premier delais</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column content is-personal-informations">
      <h2><span>Coordonnées</span></h2>
      <div class="info-table">
        <div class="info-th">Email</div>
        <div class="info-tr">leodesigaux@gmail.com</div>
      </div>
      <div class="info-table">
        <div class="info-th">Téléphone</div>
        <div class="info-tr">+33650102564</div>
      </div>
      <div class="info-table">
        <div class="info-th">Adresse</div>
        <div class="info-tr">Tours, 37000<br/>Région Centre, FRANCE</div>
      </div>
      <div class="google-maps">
        <iframe src="https://snazzymaps.com/embed/53429" width="600" height="450" frameborder="0" style="border:none;"></iframe>
      </div>
    </div>
  </div>
</section>
@endsection