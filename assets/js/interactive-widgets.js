(function () {
  'use strict';

  function createCopyButton(target) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code-btn';
    button.textContent = 'Copy';
    button.addEventListener('click', function () {
      var content = target.innerText;
      navigator.clipboard.writeText(content).then(function () {
        button.textContent = 'Copied';
        setTimeout(function () {
          button.textContent = 'Copy';
        }, 1200);
      });
    });
    return button;
  }

  function initCopyButtons() {
    document.querySelectorAll('pre').forEach(function (pre) {
      if (pre.parentElement && pre.parentElement.classList.contains('copy-block')) {
        return;
      }
      var wrapper = document.createElement('div');
      wrapper.className = 'copy-block';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(createCopyButton(pre));
      wrapper.appendChild(pre);
    });
  }

  function initRevealBlocks() {
    document.querySelectorAll('[data-reveal-target]').forEach(function (button) {
      button.addEventListener('click', function () {
        var id = button.getAttribute('data-reveal-target');
        var target = document.getElementById(id);
        if (!target) {
          return;
        }
        var isHidden = target.hasAttribute('hidden');
        if (isHidden) {
          target.removeAttribute('hidden');
          button.textContent = 'Hide answer';
        } else {
          target.setAttribute('hidden', 'hidden');
          button.textContent = 'Reveal answer';
        }
      });
    });
  }

  function initMcq() {
    document.querySelectorAll('[data-mcq]').forEach(function (container) {
      var answer = container.getAttribute('data-answer');
      var output = container.querySelector('.mcq-feedback');
      container.querySelectorAll('[data-choice]').forEach(function (choice) {
        choice.addEventListener('click', function () {
          if (!output) {
            return;
          }
          var selected = choice.getAttribute('data-choice');
          if (selected === answer) {
            output.textContent = 'Correct';
            output.className = 'mcq-feedback mcq-feedback-correct';
          } else {
            output.textContent = 'Not quite. Review the lesson objective and try again.';
            output.className = 'mcq-feedback mcq-feedback-wrong';
          }
        });
      });
    });
  }

  function init() {
    initCopyButtons();
    initRevealBlocks();
    initMcq();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
