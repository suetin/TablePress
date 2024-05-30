/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./admin/js/common/functions.js":
/*!**************************************!*\
  !*** ./admin/js/common/functions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ $)
/* harmony export */ });
/**
 * Common functions that are used in TablePress JS.
 *
 * @package TablePress
 * @subpackage Views JavaScript
 * @author Tobias Bäthge
 * @since 2.0.0
 */

/**
 * Alias for document.getElementById and document.querySelectorAll, depending on the first character of the passed selector string. Resembles jQuery.
 *
 * @param {string} selector Selector string. If it starts with #, a single ID is selected, all matching selectors otherwise.
 * @return {Element|NodeList} A single DOM Element or a DOM NodeList matching the selector.
 */
const $ = selector => '#' === selector[0] ? document.getElementById(selector.slice(1)) : document.querySelectorAll(selector);

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./admin/js/list.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/functions */ "./admin/js/common/functions.js");
/**
 * JavaScript code for the "List Tables" screen
 *
 * @package TablePress
 * @subpackage Views JavaScript
 * @author Tobias Bäthge
 * @since 1.0.0
 */

/* globals confirm, prompt, tb_show, ajaxurl */

/**
 * WordPress dependencies.
 */


/**
 * Internal dependencies.
 */

document.querySelector('.tablepress-all-tables').addEventListener('click', event => {
  if (!event.target) {
    return;
  }

  /**
   * Show a popup box with the table's Shortcode.
   *
   * @since 1.0.0
   */
  if (event.target.matches('.shortcode a')) {
    prompt((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('To embed this table into a post or page, use this Shortcode:', 'tablepress'), event.target.title);
    event.preventDefault();
    return;
  }

  /**
   * Load a Thickbox with a table preview.
   *
   * @since 1.0.0
   */
  if (event.target.matches('.table-preview a')) {
    const width = window.innerWidth - 120;
    const height = window.innerHeight - 120;
    tb_show(event.target.title, `${event.target.href}#TB_iframe=true&height=${height}&width=${width}`, false);
    event.preventDefault();
    return;
  }
});

/**
 * Process links with an "ajax-link" class with AJAX.
 *
 * @since 1.0.0
 */
(0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.$)('#tablepress-page').addEventListener('click', event => {
  if (!event.target) {
    return;
  }
  if (event.target.matches('.ajax-link')) {
    fetch(`${ajaxurl}?${event.target.href.split('?')['1']}`) // Append original link's query string to AJAX endpoint.
    .then(response => response.text()).then(result => {
      if ('1' !== result) {
        return;
      }
      if ('hide_message' === event.target.dataset.action) {
        // Remove original message.
        event.target.closest('div').remove();
      }
    });
    event.preventDefault();
    return;
  }
});

/**
 * Submit Bulk Actions only if an action was selected and at least one table was selected.
 *
 * Only the top button and the top bulk selector dropdown have to be evaluated, as WP mirrors them.
 *
 * @since 1.0.0
 */
const bulk_action_dropdown = (0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.$)('#doaction');
// The bulk action dropdown is only in the DOM if at least one table is shown in the list, thus an existence check is needed.
if (bulk_action_dropdown) {
  bulk_action_dropdown.addEventListener('click', event => {
    const action = (0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.$)('#bulk-action-selector-top').value;
    const num_selected = (0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.$)('.tablepress-all-tables tbody input:checked').length;

    // Do nothing if no action or no tables were selected.
    if ('-1' === action || 0 === num_selected) {
      event.preventDefault();
      return;
    }

    // Show AYS prompt when deleting tables.
    if ('delete' === action) {
      if (!confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._n)('Do you really want to delete this table?', 'Do you really want to delete these tables?', num_selected, 'tablepress'))) {
        event.preventDefault();
        return;
      }
    }
  });
}
})();

/******/ })()
;
//# sourceMappingURL=list.js.map