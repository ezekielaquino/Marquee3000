/**
 * MARQUEE 3000 MARQUEE 3000 MARQUEE 3000 MARQUEE 3000 MARQUEE 3000
 * http://github.com/ezekielaquino/marquee3000
 * Marquees for the new millenium
 * MIT License
 */

(function() {
  'use strict';

  window.Marquee3k = function(options) {
    var options = options || {};
    var selector = options.selector || '.marquee3k';
    var spacing = options.spacing || '30px';
    var marquees = document.querySelectorAll(selector);
    var winWidth = window.innerWidth;


    init();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);


    /**
     * INITIALIZE
     */
    function init() {
      for (var i = 0; i < marquees.length; i++) {
        var marquee = marquees[i];
        var marqueeContent = marquee.innerHTML;
        var marqueeContentWrap = document.createElement('div');
        var marqueeElem = document.createElement('span');
        var marqueeContentWrapWidth = 0;
        var marqueeElemClone, marqueeElemWidth;

        // Style the inner wrapper
        marquee.innerHTML = '';
        marquee.appendChild(marqueeContentWrap);
        marqueeContentWrap = marquee.children[0];
        marqueeContentWrap.style.whiteSpace = 'nowrap';
        marqueeContentWrap.style.position = 'absolute';

        // Set marquee properties
        marquee.position = 0;
        marquee.vertical = marquee.dataset.vertical;
        marquee.content = marqueeContent;
        marquee.direction = marquee.dataset.reverse ? 1 : -1;
        marquee.speed = (marquee.dataset.speed ? (marquee.dataset.speed / 60) : (50/60)) * marquee.direction;
        marquee.delay = 0;

        // Random speed
        if (options.randomSpeed && !marquee.dataset.speed) {
          var random = Math.floor(Math.random() * 50) + 10;
          marquee.speed = (random / 60) * marquee.direction;
        }

        // Insert content and create a clone
        marqueeElem.innerHTML = marquee.content;
        marqueeElem.style.display = 'inline-block';
        marqueeElem.style.paddingRight = spacing;
        marqueeElemClone = marqueeElem.cloneNode(true);

        // Append first copy
        marqueeContentWrap.appendChild(marqueeElem);

        // Save initial width / height
        marquee.contentWidth = marqueeContentWrap.offsetWidth;
        marquee.contentHeight = marqueeContentWrap.offsetHeight;

        // Set marquee elem style
        marquee.style.overflow = 'hidden';
        marquee.style.visibility = 'hidden';
        marquee.style.position = 'relative';
        marquee.style.height = marquee.contentHeight + 'px';

        // We make at least two copies (e.g. for LARGE elements, only needs two)
        marqueeContentWrap.appendChild(marqueeElemClone);

        // Sset initial wrap width
        marqueeContentWrapWidth = marqueeContentWrap.offsetWidth;

        // Set conditional styling (vertical / reversed)
        if (marquee.dataset.vertical) {
          marquee.classList.add('marquee3k--vertical');
          marquee.style.width = marquee.contentHeight + 'px';
          marquee.style.height = '100%';
          marqueeContentWrap.style.transform = 'rotate(-90deg)';

          if (!marquee.dataset.reverse) {
            marqueeContentWrap.style.transformOrigin = '0% 0%';
            marqueeContentWrap.style.left = 0;
            marqueeContentWrap.style.top = '100%';
          } else {
            marqueeContentWrap.style.transformOrigin = '100% 100%';
            marqueeContentWrap.style.bottom = '100%';
            marqueeContentWrap.style.right = 0;
          }
        } else {
          marqueeContentWrap.style.top = 'calc(50% - ' + (marquee.contentHeight / 2) + 'px)';

          if (marquee.dataset.reverse) {
            marqueeContentWrap.style.right = 0;
          }
        }

        // Multiply the contents to fit the container's width + allowance
        while (marqueeContentWrapWidth < winWidth + (marquee.contentWidth * 2)) {
          marqueeElemClone = marqueeElem.cloneNode(true);
          marqueeContentWrap.appendChild(marqueeElemClone);
          marqueeContentWrapWidth += marquee.contentWidth;
        }

        marquee.style.visibility = 'visible';
        marquee.classList.add('is-ready');
      }

      animate();
    }


    /**
     * ANIMATE
     */
    function animate() {
      for (var i = 0; i < marquees.length; i++) {
        var marquee = marquees[i];

        if (marquee.delay < marquee.dataset.delay * 60) {
            marquee.delay += 1;
        } else if (!marquee.isPaused) {
          if (!marquee.vertical) {
            if (marquee.dataset.reverse) {
              if (marquee.position >= marquee.contentWidth) marquee.position = 0;
            } else {
              if (marquee.position <= marquee.contentWidth * -1) marquee.position = 0;
            }

            marquee.position += marquee.speed;
            marquee.children[0].style.transform = 'translate3d(' + marquee.position + 'px, 0, 0)';
          } else {
            if (marquee.dataset.reverse) {
              if (marquee.position <= marquee.contentWidth * -1) marquee.position = 0;
            } else {
              if (marquee.position >= marquee.contentWidth) marquee.position = 0;
            }

            marquee.position -= marquee.speed;
            marquee.children[0].style.transform = 'translate3d(0, ' + marquee.position + 'px, 0) rotate(-90deg)';
          }
        }
      }

      window.requestAnimationFrame(animate);
    }


    /**
     * RESIZE
     */
    function onResize() {
      debounce(function() {
        if (window.innerWidth > winWidth) {
          for (var i = 0; i < marquees.length; i++) {
            var marquee = marquees[i];
            var marqueeWrap = marquee.children[0];
            var marqueeWrapWidth = marqueeWrap.offsetWidth;
            var repeated = marquee.querySelector('span');

            while (marqueeWrapWidth < window.innerWidth + (marquee.contentWidth * 2)) {
              var clone = repeated.cloneNode(true);
              marqueeWrap.appendChild(clone);
              marqueeWrapWidth += repeated.offsetWidth;
            }
          }

          winWidth = window.innerWidth;
        }
      }, 1000);
    }


    function onScroll() {
      debounce(function() {
        for (var i = 0; i < marquees.length; i++) {
          if (isInViewport(marquees[i])) {
            marquees[i].isPaused = false;
          } else {
            marquees[i].isPaused = true;
          }
        }
      }, 500);
    }


    // MARQUEE 3000™
  }


  /**
   * DEBOUNCE via David Walsh
   */
  function debounce(func, wait, immediate) {
    var timeout;
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };




  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth) || window.getComputedStyle(element, null).getPropertyValue('position') == 'fixed'
    );
  }





})();