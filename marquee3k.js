/**
 * MARQUEE 3000 MARQUEE 3000 MARQUEE 3000 MARQUEE 3000 MARQUEE 3000
 * http://github.com/ezekielaquino/marquee3000
 * Marquees for the new millenium v1.0
 * MIT License
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Marquee3k = factory();
  }
}(this, function() {
  'use strict';

  class Marquee3k {
    constructor(element, options) {
      this.element = element;
      this.selector = options.selector;
      this.speed = element.dataset.speed || 0.25;
      this.pausable = element.dataset.pausable;
      this.reverse = element.dataset.reverse;
      this.paused = false;
      this.parent = element.parentElement;
      this.parentProps = this.parent.getBoundingClientRect();
      this.content = element.children[0];
      this.innerContent = this.content.innerHTML;
      this.wrapStyles = '';
      this.offset = 0;

      this._setupWrapper();
      this._setupContent();
      this._setupEvents();

      this.wrapper.appendChild(this.content);
      this.element.appendChild(this.wrapper);
    }

    _setupWrapper() {
      this.parent.style.overflowX = 'hidden';
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('marquee3k__wrapper');
      this.wrapStyles = 'white-space: nowrap;';
      this.wrapper.setAttribute('style', this.wrapStyles);
    }

    _setupContent() {
      this.content.classList.add(`${this.selector}__copy`);
      this.content.style.display = 'inline-block';
      this.contentWidth = this.content.offsetWidth;

      this.requiredReps = this.contentWidth > this.parentProps.width ? 2 : Math.ceil((this.parentProps.width - this.contentWidth) / this.contentWidth) + 1;

      for (let i = 0; i < this.requiredReps; i++) {
        this._createClone();
      }

      if (this.reverse) {
        this.offset = this.contentWidth * -1;
      }

      this.element.classList.add('is-init');
    }

    _setupEvents() {
      this.element.addEventListener('mouseenter', () => {
        if (this.pausable) this.paused = true;
      });

      this.element.addEventListener('mouseleave', () => {
        if (this.pausable) this.paused = false;
      });
    }

    _createClone() {
      const clone = document.createElement('span');
      clone.style.display = 'inline-block';
      clone.classList.add(`${this.selector}__copy`)
      clone.innerHTML = this.innerContent;
      this.wrapper.appendChild(clone);
    }

    animate() {
      if (!this.paused) {
        if (!this.reverse) {
          if (this.offset > this.contentWidth * -1) this.offset -= this.speed;
          else this.offset = 0;
        } else {
          if (this.offset < 0) this.offset += this.speed;
          else this.offset = this.contentWidth * -1;
        }

        this.wrapper.setAttribute('style', `${this.wrapStyles} transform: translate3d(${this.offset}px, 0, 0);
        `);
      }
    }

    repopulate(difference, isLarger) {
      this.contentWidth = this.content.offsetWidth;

      if (isLarger) {
        const amount = Math.ceil(difference / this.contentWidth) + 1;

        for (let i = 0; i < amount; i++) {
          this._createClone();
        }
      }
    }

    static init(options = { selector: 'marquee3k' }) {
      const INSTANCES = [];
      const marquees = document.querySelectorAll(`.${options.selector}`);
      let previousWidth = window.innerWidth;
      let timer;

      for (let i = 0; i < marquees.length; i++) {
        const marquee = marquees[i];
        const instance = new Marquee3k(marquee, options);
        INSTANCES.push(instance);
      }

      animate();

      function animate() {
        for (const instance of INSTANCES) {
          instance.animate();
        }
        window.requestAnimationFrame(animate);
      }

      window.addEventListener('resize', () => {
        clearTimeout(timer);

        timer = setTimeout(() => {
          const isLarger = previousWidth < window.innerWidth;
          const difference = window.innerWidth - previousWidth;

          for (const instance of INSTANCES) {
            instance.repopulate(difference, isLarger);
          }

          previousWidth = this.innerWidth;
        });
      }, 250);
    }
  }

  return Marquee3k;

}));