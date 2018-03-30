@extends('layout')
@section('content')
<section class="container blog-list is-padded-mobile">
<iframe class="ludumdare" src="/sandbox/ludumdare/{{ $edition }}" frameborder="0"></iframe>
</section>
@endsection
@push('scripts')
<script>
  window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
</script>
@endpush