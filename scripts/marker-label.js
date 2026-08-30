(function () {
  'use strict';

  var MARKER_LABELS = {
    '[]': '[ ]',
    '{}': '{ }',
    '##': '# #',
    '@@': '@ @',
    '*': '* *'
  };

  var lastApplied = '';
  var observer = null;

  function getSelectWithOptionValues(values) {
    var selects = document.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
      var select = selects[i];
      var allPresent = true;
      for (var j = 0; j < values.length; j++) {
        if (!select.querySelector('option[value="' + cssEscape(values[j]) + '"]')) {
          allPresent = false;
          break;
        }
      }
      if (allPresent) {
        return select;
      }
    }
    return null;
  }

  function getScoreModeSelect() {
    var selects = document.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
      if (selects[i].querySelector('option[value="fulltext"]') && selects[i].querySelector('option[value="marked"]')) {
        return selects[i];
      }
    }
    return null;
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === 'function') {
      return window.CSS.escape(value);
    }
    return String(value).replace(/(["\\])/g, '\\$1');
  }

  function makeLabel(current, markerText) {
    current = (current || '').replace(/\s+/g, ' ').trim();

    if (/^Markerite\s+.*\s+vaheline osa$/.test(current) || current === 'Ainult märgitud osad / lüngad') {
      return 'Markerite ' + markerText + ' vaheline osa';
    }
    if (/^Content between markers\s+.*$/.test(current) || current === 'Marked parts / gaps only') {
      return 'Content between markers ' + markerText;
    }
    if (/^Inhalt zwischen Markern\s+.*$/.test(current)) {
      return 'Inhalt zwischen Markern ' + markerText;
    }
    if (/^Contenido entre marcadores\s+.*$/.test(current)) {
      return 'Contenido entre marcadores ' + markerText;
    }
    if (/^Текст между маркерами\s+.*$/.test(current)) {
      return 'Текст между маркерами ' + markerText;
    }

    return 'Markerite ' + markerText + ' vaheline osa';
  }

  function updateMarkedOptionLabel() {
    var markerSelect = getSelectWithOptionValues(['[]', '{}', '##', '@@', '*']);
    var scoreSelect = getScoreModeSelect();

    if (!markerSelect || !scoreSelect) {
      return;
    }

    var markerValue = markerSelect.value || '[]';
    var markerText = MARKER_LABELS[markerValue] || '[ ]';
    var markedOption = scoreSelect.querySelector('option[value="marked"]');

    if (!markedOption) {
      return;
    }

    var newLabel = makeLabel(markedOption.textContent, markerText);
    var signature = markerValue + '|' + newLabel;

    if (signature === lastApplied) {
      return;
    }

    markedOption.textContent = newLabel;
    markedOption.label = newLabel;
    lastApplied = signature;
  }

  function bindChangeHandler() {
    var markerSelect = getSelectWithOptionValues(['[]', '{}', '##', '@@', '*']);
    if (markerSelect && !markerSelect.getAttribute('data-correct-errors-marker-label-bound')) {
      markerSelect.setAttribute('data-correct-errors-marker-label-bound', '1');
      markerSelect.addEventListener('change', function () {
        lastApplied = '';
        updateMarkedOptionLabel();
      });
    }
  }

  function normaliseEditorText(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
  }

  function isShowEvaluatedPartsLabel(text) {
    text = normaliseEditorText(text);
    return text === 'Kuva hinnatav osa helesinise taustaga' ||
      text === 'Show evaluated parts with a light blue background' ||
      text === 'Bewertete Teile mit hellblauem Hintergrund anzeigen' ||
      text === 'Mostrar las partes evaluadas con fondo azul claro' ||
      text === 'Показывать оцениваемую часть на светло-синем фоне';
  }

  function findShowEvaluatedPartsField() {
    var candidates = document.querySelectorAll('label, legend, span, div');

    for (var i = 0; i < candidates.length; i++) {
      var node = candidates[i];
      if (!isShowEvaluatedPartsLabel(node.textContent)) {
        continue;
      }

      var current = node;
      while (current && current !== document.body && current !== document.documentElement) {
        if (current.querySelector &&
            current.querySelector('input[type="checkbox"]') &&
            !current.querySelector('select option[value="fulltext"]')) {
          return current;
        }
        current = current.parentElement;
      }
    }

    return null;
  }

  function updateShowEvaluatedPartsVisibility() {
    var scoreSelect = getScoreModeSelect();
    var field = findShowEvaluatedPartsField();

    if (!scoreSelect || !field) {
      return;
    }

    var visible = scoreSelect.value === 'marked';
    field.style.display = visible ? '' : 'none';
    field.setAttribute('aria-hidden', visible ? 'false' : 'true');
  }

  function bindScoreModeChangeHandler() {
    var scoreSelect = getScoreModeSelect();
    if (scoreSelect && !scoreSelect.getAttribute('data-correct-errors-score-mode-bound')) {
      scoreSelect.setAttribute('data-correct-errors-score-mode-bound', '1');
      scoreSelect.addEventListener('change', function () {
        updateShowEvaluatedPartsVisibility();
      });
    }
  }

  function tick() {
    bindChangeHandler();
    bindScoreModeChangeHandler();
    updateMarkedOptionLabel();
    updateShowEvaluatedPartsVisibility();
  }

  function start() {
    tick();
    window.setTimeout(tick, 250);
    window.setTimeout(tick, 1000);

    if (observer) {
      return;
    }

    observer = new MutationObserver(function () {
      tick();
    });
    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  }
  else {
    start();
  }
}());
