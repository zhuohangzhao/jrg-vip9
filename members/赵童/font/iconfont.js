;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-ic_my_library_books_px" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M170.666667 256H85.333333v597.333333c0 46.933333 38.4 85.333333 85.333334 85.333334h597.333333v-85.333334H170.666667V256z m682.666666-170.666667H341.333333c-46.933333 0-85.333333 38.4-85.333333 85.333334v512c0 46.933333 38.4 85.333333 85.333333 85.333333h512c46.933333 0 85.333333-38.4 85.333334-85.333333V170.666667c0-46.933333-38.4-85.333333-85.333334-85.333334z m-42.666666 384H384V384h426.666667v85.333333z m-170.666667 170.666667H384v-85.333333h256v85.333333z m170.666667-341.333333H384V213.333333h426.666667v85.333334z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ic_play_arrow_px" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M341.333333 213.333333v597.333334l469.333334-298.666667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ic_queue_music_px" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M640 256H128v85.333333h512V256z m0 170.666667H128v85.333333h512v-85.333333zM128 682.666667h341.333333v-85.333334H128v85.333334zM725.333333 256v349.013333c-13.226667-4.693333-27.733333-7.68-42.666666-7.68-70.826667 0-128 57.173333-128 128s57.173333 128 128 128 128-57.173333 128-128V341.333333h128V256h-213.333334z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ic_radio_px" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M138.24 262.4C107.093333 274.346667 85.333333 305.92 85.333333 341.333333v512a85.333333 85.333333 0 0 0 85.333334 85.333334h682.666666a85.333333 85.333333 0 0 0 85.333334-85.333334V341.333333c0-47.36-37.973333-85.333333-85.333334-85.333333H354.133333l352.426667-142.506667L677.546667 42.666667 138.24 262.4zM298.666667 853.333333c-70.826667 0-128-57.173333-128-128s57.173333-128 128-128 128 57.173333 128 128-57.173333 128-128 128z m554.666666-341.333333h-85.333333v-85.333333h-85.333333v85.333333H170.666667V341.333333h682.666666v170.666667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ic_skip_next_px" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M256 768l362.666667-256L256 256v512zM682.666667 256v512h85.333333V256h-85.333333z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ic_volume_off_px" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M704 512A192 192 0 0 0 597.333333 340.053333v94.293334l104.533334 104.533333c1.28-8.533333 2.133333-17.493333 2.133333-26.88z m106.666667 0c0 40.106667-8.533333 77.653333-23.04 112.64l64.426666 64.426667A375.296 375.296 0 0 0 896 512c0-182.613333-127.573333-335.36-298.666667-374.186667v87.893334c123.306667 36.693333 213.333333 151.04 213.333334 286.293333zM182.186667 128L128 182.186667 329.813333 384H128v256h170.666667l213.333333 213.333333v-287.146666l181.333333 181.333333c-28.586667 22.186667-60.586667 39.68-96 50.346667v87.893333a383.573333 383.573333 0 0 0 157.44-77.226667L841.813333 896 896 841.813333l-384-384L182.186667 128zM512 170.666667L422.826667 259.84 512 349.013333V170.666667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ic_volume_up_px" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M128 384v256h170.666667l213.333333 213.333333V170.666667L298.666667 384H128z m576 128A192 192 0 0 0 597.333333 340.053333v343.466667c63.146667-31.146667 106.666667-96 106.666667-171.52zM597.333333 137.813333v87.893334c123.306667 36.693333 213.333333 151.04 213.333334 286.293333s-90.026667 249.6-213.333334 286.293333v87.893334c171.093333-38.826667 298.666667-191.573333 298.666667-374.186667s-127.573333-335.36-298.666667-374.186667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)