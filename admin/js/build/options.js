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

/***/ "./admin/js/common/keyboard-shortcut.js":
/*!**********************************************!*\
  !*** ./admin/js/common/keyboard-shortcut.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   register_save_changes_keyboard_shortcut: () => (/* binding */ register_save_changes_keyboard_shortcut)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Common functions that are used in TablePress JS.
 *
 * @package TablePress
 * @subpackage Views JavaScript
 * @author Tobias Bäthge
 * @since 2.2.0
 */

/**
 * WordPress dependencies.
 */


/**
 * Registers a "Save Changes" keyboard shortcut for a button.
 *
 * @since 2.2.0
 *
 * @param {HTMLElement} $button DOM element for the button.
 */
const register_save_changes_keyboard_shortcut = $button => {
  // Add keyboard shortcut as title attribute to the "Save Changes" button, with correct modifier key for Mac/non-Mac.
  const modifier_key = window?.navigator?.platform?.includes('Mac') ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('⌘', 'keyboard shortcut modifier key on a Mac keyboard', 'tablepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)('Ctrl+', 'keyboard shortcut modifier key on a non-Mac keyboard', 'tablepress');
  const shortcut = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)($button.dataset.shortcut, modifier_key); // eslint-disable-line @wordpress/valid-sprintf
  $button.title = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Keyboard Shortcut: %s', 'tablepress'), shortcut);

  /**
   * Registers keyboard events and triggers corresponding actions by emulating button clicks.
   *
   * @since 2.2.0
   *
   * @param {Event} event Keyboard event.
   */
  const keyboard_shortcuts = event => {
    let action = '';
    if (event.ctrlKey || event.metaKey) {
      if (83 === event.keyCode) {
        // Save Changes: Ctrl/Cmd + S.
        action = 'save-changes';
      }
    }
    if ('save-changes' === action) {
      // Blur the focussed element to make sure that all change events were triggered.
      document.activeElement.blur(); // eslint-disable-line @wordpress/no-global-active-element

      // Emulate a click on the button corresponding to the action.
      $button.click();

      // Prevent the browser's native handling of the shortcut, i.e. showing the Save or Print dialogs.
      event.preventDefault();
    }
  };
  // Register keyboard shortcut handler.
  window.addEventListener('keydown', keyboard_shortcuts, true);
};

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
/*!*****************************!*\
  !*** ./admin/js/options.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/functions */ "./admin/js/common/functions.js");
/* harmony import */ var _common_keyboard_shortcut__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/keyboard-shortcut */ "./admin/js/common/keyboard-shortcut.js");
/**
 * JavaScript code for the "Options" screen, without the CodeMirror handling.
 *
 * @package TablePress
 * @subpackage Views JavaScript
 * @author Tobias Bäthge
 * @since 1.0.0
 */

/* globals confirm */

/**
 * WordPress dependencies.
 */


/**
 * Internal dependencies.
 */



/**
 * Enable/disable the regular textarea according to state of "Load Custom CSS" checkbox.
 *
 * @since 1.0.0
 */
const $cb_use_custom_css = (0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.$)('#option-use-custom-css');
if ($cb_use_custom_css) {
  // The checkbox field only exists for admins!
  $cb_use_custom_css.addEventListener('change', function () {
    (0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.$)('#option-custom-css').disabled = !this.checked;
  });
  $cb_use_custom_css.dispatchEvent(new Event('change'));
}

/**
 * On form submit: Enable disabled fields, so that they are sent in the HTTP POST request.
 *
 * @since 1.0.0
 */
(0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.$)('#tablepress-page-form').addEventListener('submit', function () {
  this.querySelectorAll(':scope input, :scope select, :scope textarea').forEach(field => field.disabled = false);
});
(0,_common_keyboard_shortcut__WEBPACK_IMPORTED_MODULE_2__.register_save_changes_keyboard_shortcut)((0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.$)('#tablepress-options-save-changes'));

/**
 * Require double confirmation when wanting to uninstall TablePress.
 *
 * @since 1.0.0
 */
(0,_common_functions__WEBPACK_IMPORTED_MODULE_1__.$)('#uninstall-tablepress').addEventListener('click', event => {
  if (!confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Do you really want to uninstall TablePress and delete ALL data?', 'tablepress')) || !confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Are you really sure?', 'tablepress'))) {
    event.preventDefault();
  }
});
})();

/******/ })()
;
//# sourceMappingURL=options.js.map