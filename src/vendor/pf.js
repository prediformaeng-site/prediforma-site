/* pf.js · melhoria progressiva. O site funciona sem este arquivo. */
(function () {
  'use strict';
  // Comparador antes/depois: transforma <div class="pf-ba" data-slider> em slider com <input type="range">.
  document.querySelectorAll('.pf-ba[data-slider]').forEach(function (ba) {
    var label = ba.getAttribute('data-label') || 'Comparar antes e depois';
    var range = document.createElement('input');
    range.type = 'range';
    range.min = 0; range.max = 100; range.value = 50; range.step = 1;
    range.className = 'pf-ba__range';
    range.setAttribute('aria-label', label + '. Mova para revelar o depois.');
    var handle = ba.querySelector('.pf-ba__handle');
    ba.classList.add('is-slider');
    ba.insertBefore(range, handle);
    function set(v) { ba.style.setProperty('--pf-ba-pos', v + '%'); range.setAttribute('aria-valuetext', v + '% do depois visível'); }
    range.addEventListener('input', function () { set(range.value); });
    set(50);
  });
})();
