(function () {
  'use strict';

  var manifestPath = '/data/course-manifests/databricks-troubleshooting.json';
  var fallbackCourseId = 'databricks-troubleshooting';

  function loadManifest() {
    var path = document.body.getAttribute('data-course-manifest') || manifestPath;
    return fetch(path).then(function (response) {
      if (!response.ok) {
        throw new Error('Manifest fetch failed: ' + path);
      }
      return response.json();
    });
  }

  function flattenLessons(manifest) {
    var lessons = [];
    (manifest.modules || []).forEach(function (module) {
      (module.lessons || []).forEach(function (lesson) {
        lessons.push({
          moduleId: module.module_id,
          moduleTitle: module.title,
          lessonId: lesson.lesson_id,
          title: lesson.title,
          url: lesson.url
        });
      });
    });
    return lessons;
  }

  function keyFor(courseId) {
    return 'iexpertify:course-progress:' + courseId;
  }

  function readState(courseId) {
    var raw = localStorage.getItem(keyFor(courseId));
    if (!raw) {
      return { completedLessons: {} };
    }
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') {
        return { completedLessons: {} };
      }
      parsed.completedLessons = parsed.completedLessons || {};
      return parsed;
    } catch (err) {
      return { completedLessons: {} };
    }
  }

  function writeState(courseId, state) {
    localStorage.setItem(keyFor(courseId), JSON.stringify(state));
  }

  function completionPercent(lessons, state) {
    if (!lessons.length) {
      return 0;
    }
    var done = lessons.filter(function (lesson) {
      return !!state.completedLessons[lesson.lessonId];
    }).length;
    return Math.round((done / lessons.length) * 100);
  }

  function updateProgressUI(courseId, lessons, state) {
    var percent = completionPercent(lessons, state);
    var progressText = document.getElementById('js-course-progress');
    if (progressText) {
      progressText.textContent = percent + '% completed';
    }

    var bar = document.getElementById('js-course-progress-bar');
    if (bar) {
      bar.style.width = percent + '%';
      bar.setAttribute('aria-valuenow', String(percent));
    }

    document.querySelectorAll('[data-lesson-id]').forEach(function (node) {
      var lessonId = node.getAttribute('data-lesson-id');
      if (state.completedLessons[lessonId]) {
        node.classList.add('is-complete');
      } else {
        node.classList.remove('is-complete');
      }
    });

    var resumeLink = document.getElementById('js-resume-link');
    if (resumeLink) {
      var nextLesson = lessons.find(function (lesson) {
        return !state.completedLessons[lesson.lessonId];
      }) || lessons[0];
      if (nextLesson) {
        resumeLink.setAttribute('href', nextLesson.url);
        resumeLink.textContent = 'Resume: ' + nextLesson.title;
      }
    }

    var counter = document.getElementById('js-course-counter');
    if (counter) {
      var doneCount = lessons.filter(function (lesson) {
        return !!state.completedLessons[lesson.lessonId];
      }).length;
      counter.textContent = doneCount + ' / ' + lessons.length + ' lessons complete';
    }
  }

  function bindActions(courseId, lessons, state) {
    document.querySelectorAll('.js-toggle-lesson').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lessonId = btn.getAttribute('data-lesson-id');
        if (!lessonId) {
          return;
        }
        state.completedLessons[lessonId] = !state.completedLessons[lessonId];
        writeState(courseId, state);
        updateProgressUI(courseId, lessons, state);
      });
    });

    var markLessonBtn = document.getElementById('js-mark-lesson-complete');
    if (markLessonBtn) {
      markLessonBtn.addEventListener('click', function () {
        var lessonId = document.body.getAttribute('data-lesson-id');
        if (!lessonId) {
          return;
        }
        state.completedLessons[lessonId] = true;
        writeState(courseId, state);
        markLessonBtn.textContent = 'Marked as complete';
      });
    }

    var resetBtn = document.getElementById('js-reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (!window.confirm('Reset all progress for this course?')) {
          return;
        }
        state.completedLessons = {};
        writeState(courseId, state);
        updateProgressUI(courseId, lessons, state);
      });
    }
  }

  function init() {
    loadManifest()
      .then(function (manifest) {
        var courseId = manifest.course_id || fallbackCourseId;
        var lessons = flattenLessons(manifest);
        var state = readState(courseId);
        updateProgressUI(courseId, lessons, state);
        bindActions(courseId, lessons, state);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
