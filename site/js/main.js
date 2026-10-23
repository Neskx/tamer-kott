(function () {
  var DESIGN_W = 1920;

  // The design is a 1920px desktop layout: scale it down proportionally on narrower windows.
  function fit() {
    var w = document.documentElement.clientWidth;
    document.body.style.zoom = w < DESIGN_W ? w / DESIGN_W : 1;
  }
  fit();
  window.addEventListener('resize', fit);

  // Images: use the real asset when it exists, otherwise mark the element as missing (CSS shows a fallback).
  document.querySelectorAll('[data-src]').forEach(function (el) {
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = 'url("' + el.getAttribute('data-src') + '")'; el.classList.add('loaded'); };
    img.onerror = function () { el.classList.add('missing'); };
    img.src = el.getAttribute('data-src');
  });

  // Cart counter (kept in localStorage).
  var KEY = 'tek-cart';
  function read() { try { return parseInt(localStorage.getItem(KEY), 10) || 0; } catch (e) { return 0; } }
  function write(n) { try { localStorage.setItem(KEY, String(n)); } catch (e) {} }
  function paint() {
    document.querySelectorAll('[data-cart-count]').forEach(function (b) { b.textContent = read(); });
  }
  paint();
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.add, .add-pkg');
    if (!btn) return;
    e.preventDefault();
    write(read() + 1);
    paint();
    btn.classList.add('done');
    setTimeout(function () { btn.classList.remove('done'); }, 500);
  });
  document.querySelectorAll('[data-cart]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  // Contact form (front-end only).
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.querySelector('.thanks').style.display = 'block';
      form.reset();
    });
  }
})();
