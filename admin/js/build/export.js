/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/info.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/info.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const info = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 3.2c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8 0-4.8-4-8.8-8.8-8.8zm0 16c-4 0-7.2-3.3-7.2-7.2C4.8 8 8 4.8 12 4.8s7.2 3.3 7.2 7.2c0 4-3.2 7.2-7.2 7.2zM11 17h2v-6h-2v6zm0-8h2V7h-2v2z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (info);
//# sourceMappingURL=info.js.map

/***/ }),

/***/ "./admin/js/common/react-loader.js":
/*!*****************************************!*\
  !*** ./admin/js/common/react-loader.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeReactComponent: () => (/* binding */ initializeReactComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);

/**
 * Common functions for loading React components in TablePress JS.
 *
 * @package TablePress
 * @subpackage Views JavaScript
 * @author Tobias Bäthge
 * @since 2.2.0
 */

/**
 * WordPress dependencies.
 */

 // eslint-disable-line react/no-deprecated

/**
 * Initializes a React component on the page.
 *
 * @param {string}    rootId    HTML ID of the root element for the component.
 * @param {Component} component JSX of the component.
 */
const initializeReactComponent = (rootId, component) => {
  if (true) {
    component = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.StrictMode, null, component);
  }
  const root = document.getElementById(rootId);
  if (root) {
    // Compatibility check for React 17 and 18.
    if ('function' === typeof react_dom__WEBPACK_IMPORTED_MODULE_1__.createRoot) {
      // React 18 (WP 6.2 and newer): Use createRoot().
      (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createRoot)(root).render(component);
    } else {
      // React 17 (WP 6.1 and older): Use render().
      (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.render)(component, root);
    }
  }
};

/***/ }),

/***/ "./admin/js/export/screen.jsx":
/*!************************************!*\
  !*** ./admin/js/export/screen.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/info.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);

/**
 * JavaScript code for the "Export Screen" component.
 *
 * @package TablePress
 * @subpackage Export Screen
 * @author Tobias Bäthge
 * @since 2.2.0
 */

/* globals tp */

/**
 * WordPress dependencies.
 */





// Number of tables.
const tablesCount = Object.keys(tp.export.tables).length;

// Show at least one empty row in the select, and between 3 and 12 total rows.
let exportTablesSelectSize = tablesCount + 1;
const maxExportTablesSelectSize = 12;
exportTablesSelectSize = Math.max(exportTablesSelectSize, 3);
exportTablesSelectSize = Math.min(exportTablesSelectSize, maxExportTablesSelectSize);

// The <option> entries for the dropdowns do not depend on the state, so they can be created once.
const tablesSelectOptions = Object.entries(tp.export.tables).map(([tableId, tableName]) => {
  if ('' === tableName.trim()) {
    tableName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('(no name)', 'tablepress');
  }
  const optionText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('ID %1$s: %2$s', 'tablepress'), tableId, tableName);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: tableId,
    value: tableId
  }, optionText);
});
const exportFormatsSelectOptions = Object.entries(tp.export.exportFormats).map(([exportFormat, exportFormatName]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
  key: exportFormat,
  value: exportFormat
}, exportFormatName));
const csvDelimitersSelectOptions = Object.entries(tp.export.csvDelimiters).map(([csvDelimiter, csvDelimiterName]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
  key: csvDelimiter,
  value: csvDelimiter
}, csvDelimiterName));

/**
 * Returns the "Export Screen" component's JSX markup.
 *
 * @return {Object} Export Screen component.
 */
const Screen = () => {
  const [screenData, setScreenData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    selectedTables: tp.export.selectedTables,
    exportFormat: tp.export.exportFormat,
    csvDelimiter: tp.export.csvDelimiter,
    createZipFile: false,
    reverseList: false
  });

  // If more than one table is selected, force the ZIP file checkbox to checked.
  const zipFileRequired = screenData.selectedTables.length > 1;

  /**
   * Handles screen data state changes.
   *
   * @param {Object} updatedData Data in the screen data state that should be updated.
   */
  const updateScreenData = updatedData => {
    const newScreenData = {
      ...screenData,
      ...updatedData
    };
    setScreenData(newScreenData);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "tablepress-postbox-table fixed"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "column-1 top-align",
    scope: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-export-list"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tables to Export', 'tablepress'), ":"), tp.export.zipSupportAvailable && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-export-select-all"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    id: "tables-export-select-all",
    checked: screenData.selectedTables.length === tablesCount,
    onChange: () => {
      const selectedTables = screenData.selectedTables.length === tablesCount ? [] : Object.keys(tp.export.tables);
      updateScreenData({
        selectedTables
      });
    }
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select all', 'tablepress')), tablesCount > maxExportTablesSelectSize && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-export-reverse-list"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "tables-export-reverse-list",
    type: "checkbox",
    checked: screenData.reverseList,
    onChange: () => {
      updateScreenData({
        reverseList: !screenData.reverseList
      });
      tablesSelectOptions.reverse();
    }
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reverse list', 'tablepress'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "tables-export-list",
    size: tp.export.zipSupportAvailable ? exportTablesSelectSize : 1,
    multiple: tp.export.zipSupportAvailable,
    value: screenData.selectedTables,
    onChange: event => {
      const selectedTables = [...event.target.selectedOptions].map(option => option.value);
      updateScreenData({
        selectedTables
      });
    },
    style: {
      width: '100%'
    }
  }, tablesSelectOptions), tp.export.zipSupportAvailable && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "info-text"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You can select multiple tables by holding down the “%1$s” key or the “%2$s” key for ranges.', 'tablepress'), window?.navigator?.platform?.includes('Mac') ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._x)('⌘', 'keyboard shortcut modifier key on a Mac keyboard', 'tablepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._x)('Ctrl', 'keyboard key', 'tablepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._x)('Shift', 'keyboard key', 'tablepress'))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "column-1",
    scope: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-export-format"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Export Format', 'tablepress'), ":")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "tables-export-format",
    name: "export[format]",
    value: screenData.exportFormat,
    onChange: event => updateScreenData({
      exportFormat: event.target.value
    })
  }, exportFormatsSelectOptions))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "column-1",
    scope: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-export-csv-delimiter"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('CSV Delimiter', 'tablepress'), ":")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "tables-export-csv-delimiter",
    name: "export[csv_delimiter]",
    disabled: 'csv' !== screenData.exportFormat,
    value: screenData.csvDelimiter,
    onChange: event => updateScreenData({
      csvDelimiter: event.target.value
    })
  }, csvDelimitersSelectOptions), 'csv' !== screenData.exportFormat && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('(Only needed for CSV export.)', 'tablepress'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "bottom-border"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "column-1",
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('ZIP file', 'tablepress'), ":"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, tp.export.zipSupportAvailable && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-export-zip-file"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    id: "tables-export-zip-file",
    checked: screenData.createZipFile || zipFileRequired,
    disabled: zipFileRequired,
    onChange: () => updateScreenData({
      createZipFile: !screenData.createZipFile
    })
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Create a ZIP archive.', 'tablepress'), zipFileRequired && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('(Mandatory if more than one table is selected.)', 'tablepress')))), !tp.export.zipSupportAvailable && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Note: Support for ZIP file creation seems not to be available on this server.', 'tablepress'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "top-border"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-1"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "export[tables_list]",
    value: screenData.selectedTables.join()
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "export[zip_file]",
    value: screenData.createZipFile || zipFileRequired
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "submit",
    value: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Download Export File', 'tablepress'),
    className: "button button-primary button-large",
    disabled: 0 === screenData.selectedTables.length
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Screen);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

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
/*!****************************!*\
  !*** ./admin/js/export.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_react_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/react-loader */ "./admin/js/common/react-loader.js");
/* harmony import */ var _export_screen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./export/screen */ "./admin/js/export/screen.jsx");

/**
 * JavaScript code for the "Export" screen.
 *
 * @package TablePress
 * @subpackage Views JavaScript
 * @author Tobias Bäthge
 * @since 1.0.0
 */

/**
 * Internal dependencies.
 */


(0,_common_react_loader__WEBPACK_IMPORTED_MODULE_1__.initializeReactComponent)('tablepress-export-screen', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_export_screen__WEBPACK_IMPORTED_MODULE_2__["default"], null));
})();

/******/ })()
;
//# sourceMappingURL=export.js.map