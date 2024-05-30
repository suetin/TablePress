/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./blocks/table/src/common/functions.js":
/*!**********************************************!*\
  !*** ./blocks/table/src/common/functions.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shortcode_attrs_to_string: () => (/* binding */ shortcode_attrs_to_string)
/* harmony export */ });
/**
 * Common functions for the TablePress/table block.
 *
 * @package TablePress
 * @subpackage Blocks
 * @author Tobias Bäthge
 * @since 2.0.0
 */

/**
 * Converts a set of named and numeric Shortcode attributes to a string.
 *
 * This function is similar to @wordpress/shortcode's `string()` function,
 * but only returns the attributes string and not a full Shortcode.
 *
 * @param {Object} shortcodeAttrs The named and numeric Shortcode attributes.
 * @return {string} The attributes as a key=value string.
 */
const shortcode_attrs_to_string = shortcodeAttrs => {
  // Convert named attributes.
  let shortcode_attrs_string = Object.entries(shortcodeAttrs.named).map(([attribute, value]) => {
    let enclose = ''; // Don't enclose values by default.

    // Remove curly quotation marks around a value.
    value = value.replace(/“([^”]*)”/g, '$1');

    // Use " as delimiter if value contains whitespace or is empty.
    if (/\s/.test(value) || '' === value) {
      enclose = '"';
    }

    // Use ' as delimiter if value contains ".
    if (value.includes('"')) {
      enclose = '\'';
    }
    return `${attribute}=${enclose}${value}${enclose}`;
  }).join(' ');

  // Convert numeric attributes.
  shortcodeAttrs.numeric.forEach(value => {
    if (/\s/.test(value)) {
      shortcode_attrs_string += ' "' + value + '"';
    } else {
      shortcode_attrs_string += ' ' + value;
    }
  });
  return shortcode_attrs_string;
};

/***/ }),

/***/ "./blocks/table/src/edit.js":
/*!**********************************!*\
  !*** ./blocks/table/src/edit.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/server-side-render */ "@wordpress/server-side-render");
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_shortcode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/shortcode */ "@wordpress/shortcode");
/* harmony import */ var _wordpress_shortcode__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_shortcode__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../block.json */ "./blocks/table/block.json");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/functions */ "./blocks/table/src/common/functions.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./editor.scss */ "./blocks/table/src/editor.scss");

/**
 * JavaScript code for the TablePress table block in the block editor.
 *
 * @package TablePress
 * @subpackage Blocks
 * @author Tobias Bäthge
 * @since 2.0.0
 */

/**
 * WordPress dependencies.
 */






/**
 * Get the block name from the block.json.
 */


/**
 * Internal dependencies.
 */


/**
 * Load CSS code that only applies inside the block editor.
 */


// Options for the table selection dropdown, in the form [ { value: <id>, label: <text> }, ... ].
const ComboboxControl_options = Object.entries(tp.tables).map(([id, name]) => {
  return {
    value: id,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ID %1$s: “%2$s”', 'tablepress'), id, name)
  };
});

/**
 * Custom component for the "Manage your tables." link.
 */
const ManageTablesLink = function () {
  return '' !== tp.url && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ExternalLink, {
    href: tp.url
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Manage your tables.', 'tablepress'));
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   params               Function parameters.
 * @param {Object}   params.attributes    Block attributes.
 * @param {Function} params.setAttributes Function to set block attributes.
 * @return {Element} Element to render.
 */
const TablePressTableEdit = ({
  attributes,
  setAttributes
}) => {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  let blockMarkup;
  if (attributes.id && tp.tables.hasOwnProperty(attributes.id)) {
    blockMarkup = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, tp.load_block_preview && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_2___default()), {
      block: _block_json__WEBPACK_IMPORTED_MODULE_6__.name,
      attributes: attributes,
      className: "render-wrapper"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "table-overlay"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('TablePress table %1$s: “%2$s”', 'tablepress'), attributes.id, tp.tables[attributes.id])));
  } else {
    let instructions = 0 < ComboboxControl_options.length ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select the TablePress table that you want to embed in the Settings sidebar.', 'tablepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('There are no TablePress tables on this site yet.', 'tablepress');
    if (attributes.id) {
      // Show an error message if a table could not be found (e.g. after a table was deleted). The tp.tables.hasOwnProperty( attributes.id ) check happens above.
      instructions = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('There is a problem: The TablePress table with the ID “%1$s” could not be found.', 'tablepress'), attributes.id) + ' ' + instructions;
    }
    blockMarkup = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Placeholder, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
        icon: "list-view"
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('TablePress table', 'tablepress'),
      instructions: instructions
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ManageTablesLink, null)));
  }
  const sidebarMarkup = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    opened: true
  }, 0 < ComboboxControl_options.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ComboboxControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Table:', 'tablepress'),
    help: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select the TablePress table that you want to embed.', 'tablepress'), '' !== tp.url && ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ManageTablesLink, null)),
    value: attributes.id,
    options: ComboboxControl_options,
    onChange: id => {
      var _id;
      (_id = id) !== null && _id !== void 0 ? _id : id = '';
      setAttributes({
        id: id.replace(/[^0-9a-zA-Z-_]/g, '')
      });
    }
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('There are no TablePress tables on this site yet.', 'tablepress'), '' !== tp.url && ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ManageTablesLink, null)))), attributes.id && tp.tables.hasOwnProperty(attributes.id) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorAdvancedControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Configuration parameters:', 'tablepress'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('These additional parameters can be used to modify specific table features.', 'tablepress') + ' ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('See the TablePress Documentation for more information.', 'tablepress'),
    value: attributes.parameters,
    onChange: parameters => {
      parameters = _wordpress_shortcode__WEBPACK_IMPORTED_MODULE_5___default().replace(tp.table.shortcode, parameters, ({
        attrs: shortcodeAttrs
      }) => {
        shortcodeAttrs = {
          named: {
            ...shortcodeAttrs.named
          },
          numeric: [...shortcodeAttrs.numeric]
        }; // Use object destructuring to get a clone of the object.
        delete shortcodeAttrs.named.id;
        return ' ' + (0,_common_functions__WEBPACK_IMPORTED_MODULE_7__.shortcode_attrs_to_string)(shortcodeAttrs) + ' '; // Add spaces around replacement text to have separation to possibly already existing parameters.
      });
      parameters = parameters.replace(/=“([^”]*)”/g, '="$1"'); // Replace curly quotation marks around a value with normal ones.
      setAttributes({
        parameters
      });
    },
    onBlur: event => {
      const parameters = event.target.value.trim(); // Remove leading and trailing whitespace from the parameter string.
      setAttributes({
        parameters
      });
    }
  })));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, blockMarkup, sidebarMarkup);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TablePressTableEdit);

/***/ }),

/***/ "./blocks/table/src/example.js":
/*!*************************************!*\
  !*** ./blocks/table/src/example.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * JavaScript code for the TablePress table block in the block editor.
 *
 * @package TablePress
 * @subpackage Blocks
 * @author Tobias Bäthge
 * @since 2.0.0
 */

/* globals tp */

let example = null;
const table_ids = Object.keys(tp.tables);
if (table_ids.length) {
  const random_table_id = table_ids[Math.floor(Math.random() * table_ids.length)];
  example = {
    attributes: {
      id: random_table_id,
      parameters: ''
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (example);

/***/ }),

/***/ "./blocks/table/src/save.js":
/*!**********************************!*\
  !*** ./blocks/table/src/save.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);

/**
 * JavaScript code for the TablePress table block in the block editor.
 *
 * @package TablePress
 * @subpackage Blocks
 * @author Tobias Bäthge
 * @since 2.0.0
 */

/**
 * WordPress dependencies
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} params                       Function parameters.
 * @param {Object} params.attributes            Block attributes.
 * @param {string} params.attributes.id         Table ID.
 * @param {string} params.attributes.parameters Table render attributes.
 * @return {Element} Element to render.
 */
const save = ({
  attributes: {
    id = '',
    parameters = ''
  }
}) => {
  if ('' === id) {
    return '';
  }
  parameters = parameters.trim();
  if ('' !== parameters) {
    parameters += ' ';
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.RawHTML, null, `[${tp.table.shortcode} id=${id} ${parameters}/]`);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (save);

/***/ }),

/***/ "./blocks/table/src/transforms.js":
/*!****************************************!*\
  !*** ./blocks/table/src/transforms.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_shortcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/shortcode */ "@wordpress/shortcode");
/* harmony import */ var _wordpress_shortcode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_shortcode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../block.json */ "./blocks/table/block.json");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/functions */ "./blocks/table/src/common/functions.js");
/**
 * JavaScript code for the TablePress table block in the block editor.
 *
 * @package TablePress
 * @subpackage Blocks
 * @author Tobias Bäthge
 * @since 2.0.0
 */

/* globals tp */

/**
 * WordPress dependencies.
 */



/**
 * Get the block name from the block.json.
 */


/**
 * Internal dependencies.
 */


/**
 * Converts a textual Shortcode to a TablePress table block.
 *
 * @param {string} content The Shortcode as a text string.
 * @return {Object} TablePress table block.
 */
const convertShortcodeTextToBlock = function (content) {
  let shortcodeAttrs = _wordpress_shortcode__WEBPACK_IMPORTED_MODULE_1___default().next(tp.table.shortcode, content).shortcode.attrs;
  shortcodeAttrs = {
    named: {
      ...shortcodeAttrs.named
    },
    numeric: [...shortcodeAttrs.numeric]
  }; // Use object destructuring to get a clone of the object.
  const id = shortcodeAttrs.named.id;
  delete shortcodeAttrs.named.id;
  let parameters = (0,_common_functions__WEBPACK_IMPORTED_MODULE_3__.shortcode_attrs_to_string)(shortcodeAttrs);
  parameters = parameters.replace(/=“([^”]*)”/g, '="$1"'); // Replace curly quotation marks around a value with normal ones.
  return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
    id,
    parameters
  });
};
const transforms = {
  from: [
  // Detect table Shortcodes that are pasted into the block editor.
  {
    type: 'shortcode',
    tag: tp.table.shortcode,
    attributes: {
      id: {
        type: 'string',
        shortcode: ({
          named: {
            id = ''
          }
        }) => {
          return id;
        }
      },
      parameters: {
        type: 'string',
        shortcode: shortcodeAttrs => {
          shortcodeAttrs = {
            named: {
              ...shortcodeAttrs.named
            },
            numeric: [...shortcodeAttrs.numeric]
          }; // Use object destructuring to get a clone of the object.
          delete shortcodeAttrs.named.id;
          return (0,_common_functions__WEBPACK_IMPORTED_MODULE_3__.shortcode_attrs_to_string)(shortcodeAttrs);
        }
      }
    }
  },
  // Detect table Shortcodes that are typed into the block editor.
  {
    type: 'enter',
    regExp: _wordpress_shortcode__WEBPACK_IMPORTED_MODULE_1___default().regexp(tp.table.shortcode),
    transform: ({
      content
    }) => convertShortcodeTextToBlock(content)
  },
  // Add conversion option from "Shortcode" to "TablePress table" block.
  {
    type: 'block',
    blocks: ['core/shortcode'],
    transform: ({
      text: content
    }) => convertShortcodeTextToBlock(content),
    isMatch: ({
      text
    }) => {
      return undefined !== _wordpress_shortcode__WEBPACK_IMPORTED_MODULE_1___default().next(tp.table.shortcode, text);
    },
    isMultiBlock: false
  }],
  to: [
  // Add conversion option from "TablePress table" to "Shortcode" block.
  {
    type: 'block',
    blocks: ['core/shortcode'],
    transform: ({
      id,
      parameters
    }) => {
      parameters = parameters.trim();
      if ('' !== parameters) {
        parameters += ' ';
      }
      const text = `[${tp.table.shortcode} id=${id} ${parameters}/]`;
      return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('core/shortcode', {
        text
      });
    }
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transforms);

/***/ }),

/***/ "./blocks/table/src/editor.scss":
/*!**************************************!*\
  !*** ./blocks/table/src/editor.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/server-side-render":
/*!******************************************!*\
  !*** external ["wp","serverSideRender"] ***!
  \******************************************/
/***/ ((module) => {

module.exports = window["wp"]["serverSideRender"];

/***/ }),

/***/ "@wordpress/shortcode":
/*!***********************************!*\
  !*** external ["wp","shortcode"] ***!
  \***********************************/
/***/ ((module) => {

module.exports = window["wp"]["shortcode"];

/***/ }),

/***/ "./blocks/table/block.json":
/*!*********************************!*\
  !*** ./blocks/table/block.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"tablepress/table","version":"2.3.1","title":"TablePress table","category":"media","icon":"list-view","description":"Embed a TablePress table.","keywords":["table"],"textdomain":"tablepress","attributes":{"id":{"type":"string","default":""},"parameters":{"type":"string","default":""}},"supports":{"align":false,"html":false,"customClassName":false},"editorScript":"file:build/index.js","editorStyle":["dashicons","file:build/index.css"]}');

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
/*!***********************************!*\
  !*** ./blocks/table/src/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transforms */ "./blocks/table/src/transforms.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./blocks/table/src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./blocks/table/src/save.js");
/* harmony import */ var _example__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./example */ "./blocks/table/src/example.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../block.json */ "./blocks/table/block.json");
/**
 * JavaScript code for the TablePress table block in the block editor.
 *
 * @package TablePress
 * @subpackage Blocks
 * @author Tobias Bäthge
 * @since 2.0.0
 */

/**
 * WordPress dependencies.
 */


/**
 * Internal dependencies.
 */





/**
 * Get the block name from the block.json.
 */


/**
 * Register the block.
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  transforms: _transforms__WEBPACK_IMPORTED_MODULE_1__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"],
  example: _example__WEBPACK_IMPORTED_MODULE_4__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map