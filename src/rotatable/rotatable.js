/**
 * Rotatable.js
 *
 * @license
 * The MIT License (MIT)
 * Copyright (c) 2020 Icy Hippo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(() => {
  /**
   * Set the `transform` CSS property of the given element
   *
   * @param {HTMLElement} elem
   * @param {string} transform
   */
  const setTransform = (elem, transform) => {
    // eslint-disable-next-line no-param-reassign
    elem.style.transform = transform;
  };

  /**
   * Rotate the given element around both the x-axis and the y-axis
   *
   * @param {HTMLElement} elem
   * @param {number} mouseX
   * @param {number} mouseY
   */
  const rotateXY = (elem, mouseX, mouseY) => {
    let maxDegreesX = elem.getAttribute('data-max-rotation-x');
    let maxDegreesY = elem.getAttribute('data-max-rotation-y');

    maxDegreesX = maxDegreesX ? parseFloat(maxDegreesX) : 10;
    maxDegreesY = maxDegreesY ? parseFloat(maxDegreesY) : 10;

    const x = (maxDegreesY * -mouseY) / 100;
    const y = (maxDegreesX * mouseX) / 100;

    setTransform(elem, `perspective(400px) rotateX(${x}deg) rotateY(${y}deg)`);
  };

  /**
   * Handle the mouse move event
   *
   * @param {MouseEvent} event
   */
  const onMouseEnter = (event) => {
    event.target.classList.add('is-rotating');
  };

  /**
   * Handle the mouse move event
   *
   * @param {MouseEvent} event
   */
  const onMouseLeave = (event) => {
    event.target.classList.remove('is-rotating');
    setTransform(event.target, 'perspective(400px) rotateX(0deg) rotateY(0deg)');
  };

  /**
   * Return the mouse position relative to the target
   *
   * @param {MouseEvent} event
   * @return {{ x: number, y: number }}
   */
  const getMousePos = (event) => {
    const rect = event.target.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  /**
   * Handle the mouse move event
   *
   * @param {MouseEvent} event
   */
  const onMouseMove = (event) => {
    const { target } = event;
    const { clientWidth, clientHeight } = target;

    const { x: mouseX, y: mouseY } = getMousePos(event);

    const halfWidth = clientWidth / 2;
    const halfHeight = clientHeight / 2;

    const x = (mouseX - halfWidth) / (halfWidth / 100);
    const y = (mouseY - halfHeight) / (halfHeight / 100);

    rotateXY(target, x, y);
    event.target.classList.add('is-rotating');
  };

  const init = () => {
    document
      .querySelectorAll('[data-rotatable]')
      .forEach((elem) => {
        elem.removeEventListener('mouseenter', onMouseEnter);
        elem.removeEventListener('mouseleave', onMouseLeave);
        elem.removeEventListener('mousemove', onMouseMove);

        elem.addEventListener('mouseenter', onMouseEnter);
        elem.addEventListener('mouseleave', onMouseLeave);
        elem.addEventListener('mousemove', onMouseMove);
      });
  };

  // Expose `init` function
  window.initRotatable = init;

  init();
})();
