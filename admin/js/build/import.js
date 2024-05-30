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

/***/ "./admin/js/import/screen.jsx":
/*!************************************!*\
  !*** ./admin/js/import/screen.jsx ***!
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
 * JavaScript code for the "Import Screen" component.
 *
 * @package TablePress
 * @subpackage Import Screen
 * @author Tobias Bäthge
 * @since 2.2.0
 */

/* globals tp */

/**
 * WordPress dependencies.
 */





// Details for the available import sources.
const importSources = {
  'file-upload': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('File Upload', 'tablepress'),
    instruction: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select files', 'tablepress')
  },
  url: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('URL', 'tablepress'),
    instruction: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('File URL', 'tablepress')
  },
  server: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('File on server', 'tablepress'),
    instruction: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Server Path to file', 'tablepress')
  },
  'form-field': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Manual Input', 'tablepress'),
    instruction: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Import data', 'tablepress')
  }
};
if (!tp.import.showImportSourceServer) {
  delete importSources.server;
}

// Number of tables.
const tablesCount = Object.keys(tp.import.tables).length;

// The <option> entries for the dropdown do not depend on the state, so they can be created once.
const tablesSelectOptions = Object.entries(tp.import.tables).map(([tableId, tableName]) => {
  if ('' === tableName.trim()) {
    tableName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('(no name)', 'tablepress');
  }
  const optionText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('ID %1$s: %2$s', 'tablepress'), tableId, tableName);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: tableId,
    value: tableId
  }, optionText);
});

/**
 * Returns the "Import Screen" component's JSX markup.
 *
 * @return {Object} Import Screen component.
 */
const Screen = () => {
  const [screenData, setScreenData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    importSource: tp.import.importSource,
    importType: tp.import.importType,
    importFileUpload: [],
    importUrl: tp.import.importUrl,
    importServer: tp.import.importServer,
    importFormField: tp.import.importFormField,
    importExistingTable: tp.import.importExistingTable,
    validationHighlighting: false
  });

  /**
   * Handles screen data state changes.
   *
   * @param {Object} updatedData Data in the screen data state that should be updated.
   */
  const updateScreenData = updatedData => {
    const newScreenData = {
      ...screenData,
      validationHighlighting: false,
      // Reset with every UI state change.
      ...updatedData
    };
    setScreenData(newScreenData);
  };

  // References to DOM elements.
  const importServerInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const appendReplaceDropdown = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const fileUploadDropzone = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Initialize the jSuites dropdown when the component is mounted.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    jSuites.dropdown(appendReplaceDropdown.current, {
      autocomplete: true,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('— Select or type —', 'tablepress'),
      onchange: (element, index, oldValue, newValue) => {
        // Directly update the state with an updater function, as the state is otherwise reset.
        setScreenData(newScreenData => ({
          ...newScreenData,
          validationHighlighting: false,
          importExistingTable: newValue
        }));
      }
    });
  }, []);

  // Update the validation highlighting (using APIs and DOM elements outside of the React components) when the state changes.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.getElementById('tablepress_import-import-form').classList.toggle('no-validation-highlighting', !screenData.validationHighlighting);
    if (!screenData.validationHighlighting) {
      importServerInput.current?.setCustomValidity('');
      appendReplaceDropdown.current.previousElementSibling.querySelector('.jdropdown-header')?.setCustomValidity('');
    }
  }, [screenData.validationHighlighting]);

  // Determine calculated state variables to avoid repeating calculations.
  const fileUploadMultipleFilesChosen = 'file-upload' === screenData.importSource && (1 < screenData.importFileUpload.length || 1 === screenData.importFileUpload.length && screenData.importFileUpload[0].name.endsWith('.zip'));
  const appendReplaceDropdownDisabled = 0 === tablesCount || 'add' === screenData.importType || fileUploadMultipleFilesChosen;

  // Disable the artificial dropdown (not inserted by React) via a class, as it can not use :disabled.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    appendReplaceDropdown.current.previousElementSibling.classList.toggle('disabled', appendReplaceDropdownDisabled);
  }, [appendReplaceDropdownDisabled]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "tablepress-postbox-table fixed"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "column-1",
    scope: "row",
    id: "import-source-header"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Import Source', 'tablepress'), ":"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, Object.entries(importSources).map(([importSource, importSourceData]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    key: importSource,
    htmlFor: `tables-import-source-${importSource}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    name: "import[source]",
    id: `tables-import-source-${importSource}`,
    type: "radio",
    "aria-labelledby": "import-source-header",
    value: importSource,
    checked: importSource === screenData.importSource,
    onChange: event => updateScreenData({
      importSource: event.target.value
    })
  }), " ", importSourceData.label)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "top-border bottom-border"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "column-1 top-align",
    scope: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: `tables-import-${screenData.importSource}`
  }, importSources[screenData.importSource].instruction, ":")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "file-upload-area",
    style: {
      display: 'file-upload' === screenData.importSource ? 'block' : 'none'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    name: "import_file_upload[]",
    id: "tables-import-file-upload",
    type: "file",
    multiple: true,
    required: 'file-upload' === screenData.importSource,
    onChange: event => event.target.files && updateScreenData({
      importFileUpload: event.target.files
    }),
    onDragEnter: () => fileUploadDropzone.current.classList.add('dragover'),
    onDragLeave: () => fileUploadDropzone.current.classList.remove('dragover')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: fileUploadDropzone,
    className: "dropzone"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, 0 === screenData.importFileUpload.length && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Click to select files, or drag them here.', 'tablepress'), 0 < screenData.importFileUpload.length && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._n)('You have selected %1$d file:', 'You have selected %1$d files:', screenData.importFileUpload.length, 'tablepress'), screenData.importFileUpload.length)), [...screenData.importFileUpload].map(file => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    key: file.name
  }, file.name)))), 'url' === screenData.importSource && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "url",
    name: "import[url]",
    id: "tables-import-url",
    className: "large-text code",
    required: true,
    value: screenData.importUrl,
    onChange: event => updateScreenData({
      importUrl: event.target.value
    })
  }), tp.import.showImportSourceServer && 'server' === screenData.importSource && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: importServerInput,
    type: "text",
    name: "import[server]",
    id: "tables-import-server",
    className: "large-text code",
    required: true,
    value: screenData.importServer,
    onChange: event => updateScreenData({
      importServer: event.target.value
    })
  }), 'form-field' === screenData.importSource && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    name: "import[form-field]",
    id: "tables-import-form-field",
    rows: "15",
    cols: "40",
    className: "large-text code",
    required: true,
    value: screenData.importFormField,
    onChange: event => updateScreenData({
      importFormField: event.target.value
    })
  }), 'form-field' !== screenData.importSource && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "info-text",
    style: {
      marginTop: '0.5em'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You can also import multiple tables by placing them in a ZIP file.', 'tablepress'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "top-border"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "column-1",
    scope: "row",
    id: "import-type-header"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add, Replace, or Append?', 'tablepress'), ":"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-import-type-add"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    name: "import[type]",
    id: "tables-import-type-add",
    type: "radio",
    "aria-labelledby": "import-type-header",
    value: "add",
    checked: 'add' === screenData.importType || 0 === tablesCount,
    onChange: event => updateScreenData({
      importType: event.target.value
    })
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add as new table', 'tablepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-import-type-replace"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    name: "import[type]",
    id: "tables-import-type-replace",
    type: "radio",
    "aria-labelledby": "import-type-header",
    value: "replace",
    disabled: 0 === tablesCount,
    checked: 'replace' === screenData.importType,
    onChange: event => updateScreenData({
      importType: event.target.value
    })
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Replace existing table', 'tablepress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-import-type-append"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    name: "import[type]",
    id: "tables-import-type-append",
    type: "radio",
    "aria-labelledby": "import-type-header",
    value: "append",
    disabled: 0 === tablesCount,
    checked: 'append' === screenData.importType,
    onChange: event => updateScreenData({
      importType: event.target.value
    })
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Append rows to existing table', 'tablepress')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "top-border bottom-border"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "column-1",
    scope: "row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "tables-import-existing-table"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Table to replace or append to', 'tablepress'), ":")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    ref: appendReplaceDropdown,
    id: "tables-import-existing-table",
    name: "import[existing_table]",
    disabled: appendReplaceDropdownDisabled,
    value: screenData.importExistingTable
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: ""
  }, ' ' // Use a space as an empty string will be printed as `&nbsp;` by jSuites.
  ), tablesSelectOptions))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "top-border"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-1"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "column-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "import[legacy_import]",
    value: tp.import.legacyImport
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "submit",
    value: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._x)('Import', 'button', 'tablepress'),
    className: "button button-primary button-large",
    id: "import-submit-button",
    onClick: () => {
      // Show validation :invalid CSS pseudo-selector highlighting.
      updateScreenData({
        validationHighlighting: true
      });

      // When importing from the server, the value must have been changed from the default (normally ABSPATH).
      if ('server' === screenData.importSource && tp.import.importServer === screenData.importServer) {
        importServerInput.current.setCustomValidity((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You must specify a path to a file on the server.', 'tablepress'));
      }

      // If the table selection dropdown for replace or append is enabled, a table must be selected.
      if (!appendReplaceDropdownDisabled && '' === screenData.importExistingTable) {
        // Use the jSuites dropdown input field, as the actual <select> is hidden.
        appendReplaceDropdown.current.previousElementSibling.querySelector('.jdropdown-header').setCustomValidity((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You must select a table.', 'tablepress'));
      }
    }
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
  !*** ./admin/js/import.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_react_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/react-loader */ "./admin/js/common/react-loader.js");
/* harmony import */ var _import_screen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./import/screen */ "./admin/js/import/screen.jsx");

/**
 * JavaScript code for the "Import" screen.
 *
 * @package TablePress
 * @subpackage Views JavaScript
 * @author Tobias Bäthge
 * @since 1.0.0
 */

/**
 * Internal dependencies.
 */


(0,_common_react_loader__WEBPACK_IMPORTED_MODULE_1__.initializeReactComponent)('tablepress-import-screen', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_import_screen__WEBPACK_IMPORTED_MODULE_2__["default"], null));
})();

/******/ })()
;
//# sourceMappingURL=import.js.map