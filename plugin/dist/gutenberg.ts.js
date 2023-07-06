/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/CorrectorsControl.tsx":
/*!**********************************************!*\
  !*** ./src/components/CorrectorsControl.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CorrectorsControl)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global */ "./src/global.ts");




function CorrectorsControl({
  value,
  onChange
}) {
  const [receiversCandidates, setReceiversCandidates] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormTokenField, {
    label: "Receivers",
    onChange: value => {
      setReceiversCandidates(value);
    },
    suggestions: (0,_global__WEBPACK_IMPORTED_MODULE_2__.getReceiverSuggestions)(),
    value: receiversCandidates
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: () => {
      setReceiversCandidates([]);
      onChange([...value, ...receiversCandidates]);
    }
  }, "Add receivers"));
}

/***/ }),

/***/ "./src/container/MessagesPanelContainer.tsx":
/*!**************************************************!*\
  !*** ./src/container/MessagesPanelContainer.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessagesPaneContainer)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_use_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/use-messages */ "./src/hooks/use-messages.ts");
/* harmony import */ var _components_CorrectorsControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/CorrectorsControl */ "./src/components/CorrectorsControl.tsx");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global */ "./src/global.ts");
/* harmony import */ var _hooks_use_message_content__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/use-message-content */ "./src/hooks/use-message-content.ts");







function MessagesPaneContainer({
  title = "Request",
  initialOpen = false
}) {
  const messages = (0,_hooks_use_messages__WEBPACK_IMPORTED_MODULE_1__.useMessages)();
  const [messageContent, setMessageContent] = (0,_hooks_use_message_content__WEBPACK_IMPORTED_MODULE_5__.useMessageContent)();
  const [recipients, setRecipients] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const pending = messages.filter(m => m.sent_timestamp === null);
  const pendingReceivers = pending.map(p => p.receiver);
  const contentStructure = (0,_global__WEBPACK_IMPORTED_MODULE_4__.getContentStructure)();
  const onChange = key => value => {
    setMessageContent({
      ...messageContent,
      [key]: value
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: title,
    initialOpen: initialOpen
  }, contentStructure.map(widget => {
    var _messageContent$widge, _messageContent$widge2, _messageContent$widge3;
    switch (widget.type) {
      case "text":
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          key: widget.key,
          label: widget.label,
          value: (_messageContent$widge = messageContent[widget.key]) !== null && _messageContent$widge !== void 0 ? _messageContent$widge : widget.defaultValue,
          onChange: onChange(widget.key),
          help: widget.help
        });
      case "textarea":
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
          key: widget.key,
          label: widget.label,
          value: (_messageContent$widge2 = messageContent[widget.key]) !== null && _messageContent$widge2 !== void 0 ? _messageContent$widge2 : widget.defaultValue,
          onChange: onChange(widget.key),
          help: widget.help
        });
      case "toggle":
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
          key: widget.key,
          label: widget.label,
          onChange: onChange(widget.key),
          checked: (_messageContent$widge3 = messageContent[widget.key]) !== null && _messageContent$widge3 !== void 0 ? _messageContent$widge3 : widget.defaultValue == "1",
          help: widget.help
        });
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      key: widget.key
    }, "Unknown: ", widget.label);
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CorrectorsControl__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: recipients,
    onChange: setRecipients
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "TODO: check recipient is valid"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Add recipient to queue"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, recipients.map(r => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: r
    }, r);
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Sent messages"));
}

/***/ }),

/***/ "./src/container/RevisionsPanelContainer.tsx":
/*!***************************************************!*\
  !*** ./src/container/RevisionsPanelContainer.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RevisionsPanelContainer)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_use_revisions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/use-revisions */ "./src/hooks/use-revisions.ts");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global */ "./src/global.ts");




const locale = new Intl.DateTimeFormat().resolvedOptions().locale;
const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});
function RevisionsPanelContainer({
  title = "Latest revisions",
  initialOpen = true
}) {
  const revisions = (0,_hooks_use_revisions__WEBPACK_IMPORTED_MODULE_1__.useRevisionsGroupByAuthorSortByTime)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: title,
    initialOpen: initialOpen
  }, revisions.map(revision => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, {
      key: revision.revision_post_id
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, revision.author_name, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", null, dateFormatter.format(new Date(revision.timestamp * 1000)))));
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    href: (0,_global__WEBPACK_IMPORTED_MODULE_3__.getAllRevisionsUrl)(),
    variant: "link"
  }, "All revisions"));
}

/***/ }),

/***/ "./src/feature/document-panel.tsx":
/*!****************************************!*\
  !*** ./src/feature/document-panel.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_use_revisions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/use-revisions */ "./src/hooks/use-revisions.ts");
/* harmony import */ var _container_MessagesPanelContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../container/MessagesPanelContainer */ "./src/container/MessagesPanelContainer.tsx");
/* harmony import */ var _container_RevisionsPanelContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../container/RevisionsPanelContainer */ "./src/container/RevisionsPanelContainer.tsx");






const sidebarName = "corrections-sidebar";
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)("corrections-plugin", {
  render: () => {
    const revisions = (0,_hooks_use_revisions__WEBPACK_IMPORTED_MODULE_3__.useRevisions)();
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginSidebarMoreMenuItem, {
      target: sidebarName,
      icon: "editor-spellcheck"
    }, "Corrections"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginSidebar, {
      icon: "editor-spellcheck",
      name: sidebarName,
      title: "Corrections"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_container_RevisionsPanelContainer__WEBPACK_IMPORTED_MODULE_5__["default"], {
      initialOpen: true
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_container_MessagesPanelContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      initialOpen: false
    })));
  }
});

/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAllRevisionsUrl: () => (/* binding */ getAllRevisionsUrl),
/* harmony export */   getContentStructure: () => (/* binding */ getContentStructure),
/* harmony export */   getIsValidRecipientEndpoint: () => (/* binding */ getIsValidRecipientEndpoint),
/* harmony export */   getPostId: () => (/* binding */ getPostId),
/* harmony export */   getReceiverSuggestions: () => (/* binding */ getReceiverSuggestions)
/* harmony export */ });
const getPostId = () => window.Corrections.postId;
const getContentStructure = () => window.Corrections.contentStructure;
const getReceiverSuggestions = () => window.Corrections.receiverSuggestions;
const getAllRevisionsUrl = () => window.Corrections.allRevisionsUrl;
const getIsValidRecipientEndpoint = recipient => window.Corrections.endpoints.isValidRecipientBaseUrl + "&recipient=" + encodeURI(recipient);

/***/ }),

/***/ "./src/hooks/use-message-content.ts":
/*!******************************************!*\
  !*** ./src/hooks/use-message-content.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMessageContent: () => (/* binding */ useMessageContent)
/* harmony export */ });
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);


const useMessageContent = () => {
  const content = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    var _select$getEditedPost;
    // @ts-ignore
    return (_select$getEditedPost = select(_wordpress_editor__WEBPACK_IMPORTED_MODULE_0__.store).getEditedPostAttribute("corrections_message_content")) !== null && _select$getEditedPost !== void 0 ? _select$getEditedPost : {};
  }, []);
  const dispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_0__.store);
  return [content, value => {
    console.debug(dispatch, value);
    // @ts-ignore
    dispatch.editPost({
      corrections_message_content: value
    });
  }];
};

/***/ }),

/***/ "./src/hooks/use-messages.ts":
/*!***********************************!*\
  !*** ./src/hooks/use-messages.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMessages: () => (/* binding */ useMessages)
/* harmony export */ });
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);


const useMessages = () => {
  const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select(_wordpress_editor__WEBPACK_IMPORTED_MODULE_0__.store), []);
  // @ts-ignore
  const messages = store.getEditedPostAttribute("corrections_messages");
  return Array.isArray(messages) ? messages : [];
};

/***/ }),

/***/ "./src/hooks/use-revisions.ts":
/*!************************************!*\
  !*** ./src/hooks/use-revisions.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRevisions: () => (/* binding */ useRevisions),
/* harmony export */   useRevisionsGroupByAuthorSortByTime: () => (/* binding */ useRevisionsGroupByAuthorSortByTime)
/* harmony export */ });
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);


const useRevisions = () => {
  const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select(_wordpress_editor__WEBPACK_IMPORTED_MODULE_0__.store), []);
  // @ts-ignore
  const revisions = store.getEditedPostAttribute("corrections_revisions");
  return Array.isArray(revisions) ? revisions : [];
};
const useRevisionsGroupByAuthorSortByTime = () => {
  const revisions = useRevisions();
  const grouped = {};
  revisions.forEach(revision => {
    if (grouped[revision["author_id"]] == undefined) {
      grouped[revision["author_id"]] = {
        ...revision,
        count: 0
      };
    }
    grouped[revision["author_id"]].count++;
    if (grouped[revision["author_id"]].timestamp < revision.timestamp) {
      grouped[revision["author_id"]].timestamp = revision.timestamp;
    }
  });
  return Object.values(grouped).sort((a, b) => b.timestamp - a.timestamp);
};

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["editor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

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
  !*** ./src/gutenberg.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _feature_document_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature/document-panel */ "./src/feature/document-panel.tsx");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global */ "./src/global.ts");


console.debug((0,_global__WEBPACK_IMPORTED_MODULE_1__.getContentStructure)());
})();

/******/ })()
;
//# sourceMappingURL=gutenberg.ts.js.map