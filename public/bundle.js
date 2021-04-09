/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game/GameBoard.ts":
/*!*******************************!*\
  !*** ./src/game/GameBoard.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst skynode_1 = __webpack_require__(/*! @hanul/skynode */ \"../skynode/lib/index.js\");\r\nclass GameBoard extends skynode_1.DomNode {\r\n    constructor() {\r\n        super(document.createElement(\"div\"));\r\n        this.appendText(\"Game Board\");\r\n    }\r\n}\r\nexports.default = GameBoard;\r\n\n\n//# sourceURL=webpack://defantasy/./src/game/GameBoard.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst skynode_1 = __webpack_require__(/*! @hanul/skynode */ \"../skynode/lib/index.js\");\r\nconst GameBoard_1 = __importDefault(__webpack_require__(/*! ./game/GameBoard */ \"./src/game/GameBoard.ts\"));\r\nskynode_1.BodyNode.style({\r\n    background: \"#faf8ef\",\r\n});\r\nconst buttonStyle = {\r\n    display: \"block\",\r\n    background: \"#8f7a66\",\r\n    color: \"#f9f6f2\",\r\n    lineHeight: 42,\r\n    padding: \"0 20px\",\r\n    borderRadius: 3,\r\n};\r\nskynode_1.el(\"div\", {\r\n    style: {\r\n        width: 500,\r\n    },\r\n}, skynode_1.el(\"h1\", \"Defantasy\", {\r\n    style: {\r\n        fontFamily: \"font1\",\r\n        fontSize: 80,\r\n        color: \"#776e65\",\r\n    },\r\n}), skynode_1.el(\"p\", \"This is defantasy game.\", {\r\n    style: {\r\n        fontSize: 18,\r\n        color: \"#776e65\",\r\n    },\r\n}), new GameBoard_1.default(), skynode_1.el(\"div\", {\r\n    style: {\r\n        display: \"flex\",\r\n    },\r\n}, skynode_1.el(\"a\", \"Be Summoner\", {\r\n    style: buttonStyle,\r\n    click: () => { },\r\n}), skynode_1.el(\"div\", { style: { flexGrow: 1 } }), skynode_1.el(\"a\", \"Be Supporter\", {\r\n    style: buttonStyle,\r\n    click: () => { },\r\n}))).appendTo(skynode_1.BodyNode);\r\n\n\n//# sourceURL=webpack://defantasy/./src/main.ts?");

/***/ }),

/***/ "../eventcontainer/EventContainer.js":
/*!*******************************************!*\
  !*** ../eventcontainer/EventContainer.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst skyutil_1 = __importDefault(__webpack_require__(/*! skyutil */ \"../eventcontainer/node_modules/skyutil/SkyUtil.js\"));\r\nclass EventContainer {\r\n    constructor() {\r\n        this.eventMap = {};\r\n        this.deleted = false;\r\n    }\r\n    on(eventName, eventHandler) {\r\n        if (this.eventMap[eventName] === undefined) {\r\n            this.eventMap[eventName] = [];\r\n        }\r\n        this.eventMap[eventName].push(eventHandler);\r\n    }\r\n    toss(eventName, to, toEventName) {\r\n        this.on(eventName, (...params) => to.fireEvent(toEventName === undefined ? eventName : toEventName, ...params));\r\n    }\r\n    off(eventName, eventHandler) {\r\n        if (this.eventMap[eventName] !== undefined) {\r\n            skyutil_1.default.pull(this.eventMap[eventName], eventHandler);\r\n            if (this.eventMap[eventName].length === 0) {\r\n                delete this.eventMap[eventName];\r\n            }\r\n        }\r\n    }\r\n    async fireEvent(eventName, ...params) {\r\n        if (this.eventMap[eventName] !== undefined) {\r\n            for (const eventHandler of this.eventMap[eventName]) {\r\n                await eventHandler(...params);\r\n            }\r\n        }\r\n    }\r\n    delete() {\r\n        this.fireEvent(\"delete\");\r\n        this.eventMap = undefined;\r\n        this.deleted = true;\r\n    }\r\n}\r\nexports.default = EventContainer;\r\n//# sourceMappingURL=EventContainer.js.map\n\n//# sourceURL=webpack://defantasy/../eventcontainer/EventContainer.js?");

/***/ }),

/***/ "../eventcontainer/node_modules/skyutil/SkyUtil.js":
/*!*********************************************************!*\
  !*** ../eventcontainer/node_modules/skyutil/SkyUtil.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass SkyUtil {\r\n    static pull(array, ...removeList) {\r\n        for (const el of removeList) {\r\n            const index = array.indexOf(el);\r\n            if (index !== -1) {\r\n                array.splice(index, 1);\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.default = SkyUtil;\r\n//# sourceMappingURL=SkyUtil.js.map\n\n//# sourceURL=webpack://defantasy/../eventcontainer/node_modules/skyutil/SkyUtil.js?");

/***/ }),

/***/ "../skynode/lib/BodyNode.js":
/*!**********************************!*\
  !*** ../skynode/lib/BodyNode.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst DomNode_1 = __importDefault(__webpack_require__(/*! ./DomNode */ \"../skynode/lib/DomNode.js\"));\r\nclass BodyNode extends DomNode_1.default {\r\n    constructor() {\r\n        super(document.body);\r\n    }\r\n}\r\nexports.default = new BodyNode();\r\n//# sourceMappingURL=BodyNode.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/lib/BodyNode.js?");

/***/ }),

/***/ "../skynode/lib/ClosableFloatingDomNode.js":
/*!*************************************************!*\
  !*** ../skynode/lib/ClosableFloatingDomNode.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst BodyNode_1 = __importDefault(__webpack_require__(/*! ./BodyNode */ \"../skynode/lib/BodyNode.js\"));\r\nconst FloatingDomNode_1 = __importDefault(__webpack_require__(/*! ./FloatingDomNode */ \"../skynode/lib/FloatingDomNode.js\"));\r\nconst Popup_1 = __importDefault(__webpack_require__(/*! ./Popup */ \"../skynode/lib/Popup.js\"));\r\nclass ClosableFloatingDomNode extends FloatingDomNode_1.default {\r\n    constructor(position, domElement) {\r\n        super(position, domElement);\r\n        this.touchCloseZone = () => {\r\n            this.delete();\r\n        };\r\n        this.on(\"mousedown\", (event) => {\r\n            this.deleteChildren(this);\r\n            event.stopPropagation();\r\n        });\r\n    }\r\n    deleteChildren(domNode) {\r\n        for (const child of domNode.children) {\r\n            if (child instanceof ClosableFloatingDomNode) {\r\n                child.delete();\r\n            }\r\n            else {\r\n                this.deleteChildren(child);\r\n            }\r\n        }\r\n    }\r\n    appendTo(node, index) {\r\n        const that = super.appendTo(node, index);\r\n        if ((node instanceof ClosableFloatingDomNode) !== true) {\r\n            let ancestor = this.parent;\r\n            while (ancestor !== undefined) {\r\n                if (ancestor === BodyNode_1.default || ancestor instanceof Popup_1.default) {\r\n                    this.closeZone = ancestor;\r\n                    this.closeZone.on(\"mousedown\", this.touchCloseZone);\r\n                    break;\r\n                }\r\n                ancestor = ancestor.parent;\r\n            }\r\n        }\r\n        return that;\r\n    }\r\n    exceptFromParent() {\r\n        super.exceptFromParent();\r\n        if (this.closeZone !== undefined && this.closeZone.deleted !== true) {\r\n            this.closeZone.off(\"mousedown\", this.touchCloseZone);\r\n        }\r\n    }\r\n}\r\nexports.default = ClosableFloatingDomNode;\r\n//# sourceMappingURL=ClosableFloatingDomNode.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/lib/ClosableFloatingDomNode.js?");

/***/ }),

/***/ "../skynode/lib/DomNode.js":
/*!*********************************!*\
  !*** ../skynode/lib/DomNode.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst skyutil_1 = __importDefault(__webpack_require__(/*! skyutil */ \"../skynode/node_modules/skyutil/SkyUtil.js\"));\r\nconst SkyNode_1 = __importDefault(__webpack_require__(/*! ./SkyNode */ \"../skynode/lib/SkyNode.js\"));\r\nclass DomNode extends SkyNode_1.default {\r\n    constructor(domElement) {\r\n        super();\r\n        this.domElement = domElement;\r\n        this.children = [];\r\n        this.domEventMap = {};\r\n    }\r\n    style(style) {\r\n        for (const [key, value] of Object.entries(style)) {\r\n            if (typeof value === \"number\" &&\r\n                key !== \"zIndex\" &&\r\n                key !== \"opacity\" &&\r\n                key !== \"flexGrow\" &&\r\n                key !== \"flexShrink\") {\r\n                this.domElement.style[key] = `${value}px`;\r\n            }\r\n            else {\r\n                this.domElement.style[key] = value;\r\n            }\r\n        }\r\n    }\r\n    get rect() {\r\n        return this.domElement.getBoundingClientRect();\r\n    }\r\n    on(eventName, eventHandler) {\r\n        if (`on${eventName}` in this.domElement) {\r\n            if (this.domEventMap[eventName] === undefined) {\r\n                this.domEventMap[eventName] = [];\r\n            }\r\n            const domEventHandler = (event) => eventHandler(event, this);\r\n            this.domEventMap[eventName].push({ eventHandler, domEventHandler });\r\n            this.domElement.addEventListener(eventName, domEventHandler);\r\n        }\r\n        else {\r\n            super.on(eventName, eventHandler);\r\n        }\r\n    }\r\n    off(eventName, eventHandler) {\r\n        if (`on${eventName}` in this.domElement) {\r\n            const domEvents = this.domEventMap[eventName];\r\n            if (domEvents !== undefined) {\r\n                const domEvent = domEvents.find((de) => de.eventHandler === eventHandler);\r\n                if (domEvent !== undefined) {\r\n                    this.domElement.removeEventListener(eventName, domEvent.domEventHandler);\r\n                    skyutil_1.default.pull(domEvents, domEvent);\r\n                    if (domEvents.length === 0) {\r\n                        delete this.domEventMap[eventName];\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        else {\r\n            super.off(eventName, eventHandler);\r\n        }\r\n    }\r\n    async fireEvent(eventName, ...params) {\r\n        if (`on${eventName}` in this.domElement) {\r\n            this.domElement.dispatchEvent(new Event(eventName));\r\n        }\r\n        else {\r\n            await super.fireEvent(eventName, ...params);\r\n        }\r\n    }\r\n    appendText(text) {\r\n        this.domElement.append(text);\r\n    }\r\n    appendTo(node, index) {\r\n        if (index !== undefined && index < node.children.length) {\r\n            node.domElement.insertBefore(this.domElement, node.children[index].domElement);\r\n        }\r\n        else {\r\n            node.domElement.append(this.domElement);\r\n        }\r\n        return super.appendTo(node, index);\r\n    }\r\n    exceptFromParent() {\r\n        if (this.parent !== undefined) {\r\n            this.parent.domElement.removeChild(this.domElement);\r\n        }\r\n        super.exceptFromParent();\r\n    }\r\n    empty() {\r\n        super.empty();\r\n        while (this.domElement.firstChild) {\r\n            this.domElement.removeChild(this.domElement.firstChild);\r\n        }\r\n        return this;\r\n    }\r\n    delete() {\r\n        this.domEventMap = undefined;\r\n        super.delete();\r\n    }\r\n}\r\nexports.default = DomNode;\r\n//# sourceMappingURL=DomNode.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/lib/DomNode.js?");

/***/ }),

/***/ "../skynode/lib/FloatingDomNode.js":
/*!*****************************************!*\
  !*** ../skynode/lib/FloatingDomNode.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst DomNode_1 = __importDefault(__webpack_require__(/*! ./DomNode */ \"../skynode/lib/DomNode.js\"));\r\nclass FloatingDomNode extends DomNode_1.default {\r\n    constructor(position, domElement) {\r\n        super(domElement);\r\n        this.position = position;\r\n        this.style({ left: position.left, top: position.top });\r\n    }\r\n    putInsideWindow() {\r\n        this.style({ left: this.position.left, top: this.position.top });\r\n        const rect = this.domElement.getBoundingClientRect();\r\n        if (rect.left + rect.width > window.innerWidth) {\r\n            this.style({ left: window.innerWidth - rect.width });\r\n        }\r\n        if (rect.top + rect.height > window.innerHeight) {\r\n            this.style({ top: window.innerHeight - rect.height });\r\n        }\r\n    }\r\n}\r\nexports.default = FloatingDomNode;\r\n//# sourceMappingURL=FloatingDomNode.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/lib/FloatingDomNode.js?");

/***/ }),

/***/ "../skynode/lib/Popup.js":
/*!*******************************!*\
  !*** ../skynode/lib/Popup.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst BodyNode_1 = __importDefault(__webpack_require__(/*! ./BodyNode */ \"../skynode/lib/BodyNode.js\"));\r\nconst DomNode_1 = __importDefault(__webpack_require__(/*! ./DomNode */ \"../skynode/lib/DomNode.js\"));\r\nclass Popup extends DomNode_1.default {\r\n    constructor(domElement) {\r\n        super(domElement);\r\n        this.on(\"mousedown\", (event) => {\r\n            event.stopPropagation();\r\n        });\r\n        BodyNode_1.default.append(this);\r\n    }\r\n}\r\nexports.default = Popup;\r\n//# sourceMappingURL=Popup.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/lib/Popup.js?");

/***/ }),

/***/ "../skynode/lib/ScrollableDomNode.js":
/*!*******************************************!*\
  !*** ../skynode/lib/ScrollableDomNode.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ScrollItemDomNode = void 0;\r\nconst debouncer_1 = __importDefault(__webpack_require__(/*! @hanul/debouncer */ \"../skynode/node_modules/@hanul/debouncer/Debouncer.js\"));\r\nconst skyutil_1 = __importDefault(__webpack_require__(/*! skyutil */ \"../skynode/node_modules/skyutil/SkyUtil.js\"));\r\nconst DomNode_1 = __importDefault(__webpack_require__(/*! ./DomNode */ \"../skynode/lib/DomNode.js\"));\r\nclass ScrollItemDomNode extends DomNode_1.default {\r\n}\r\nexports.ScrollItemDomNode = ScrollItemDomNode;\r\nclass ScrollableDomNode extends DomNode_1.default {\r\n    constructor(domElement, options, createChild) {\r\n        super(domElement);\r\n        this.options = options;\r\n        this.createChild = createChild;\r\n        this.nodeDataSet = [];\r\n        this.scrollAreaHeight = 0;\r\n        this.scrollStack = [];\r\n        this.refresh = () => {\r\n            var _a, _b, _c;\r\n            const scrollTop = this.domElement.scrollTop;\r\n            if (this.scrollAreaHeight === 0 || (this.scrollStack.length === 2 &&\r\n                this.scrollStack[0].top === scrollTop &&\r\n                this.scrollStack[1].length === this.nodeDataSet.length)) {\r\n                return;\r\n            }\r\n            this.scrollStack.push({ top: scrollTop, length: this.nodeDataSet.length });\r\n            if (this.scrollStack.length > 2) {\r\n                this.scrollStack.splice(0, 1);\r\n            }\r\n            const startTop = scrollTop;\r\n            const endTop = scrollTop + this.scrollAreaHeight;\r\n            let topPadding = 0;\r\n            let bottomPadding = 0;\r\n            let startIndex = -1;\r\n            let endIndex = -1;\r\n            let top = 0;\r\n            for (const [index, info] of this.nodeDataSet.entries()) {\r\n                if (top + info.height < startTop) {\r\n                    topPadding += info.height;\r\n                }\r\n                else if (top > endTop) {\r\n                    bottomPadding += info.height;\r\n                }\r\n                else {\r\n                    if (startIndex === -1) {\r\n                        startIndex = index;\r\n                    }\r\n                    if (endIndex < index) {\r\n                        endIndex = index;\r\n                    }\r\n                    if (info.dom === undefined) {\r\n                        info.dom = this.createChild(info.data, index);\r\n                        info.dom.appendTo(this);\r\n                        info.height = info.dom.rect.height;\r\n                    }\r\n                }\r\n                top += info.height;\r\n            }\r\n            this.bottomPaddingNode.exceptFromParent();\r\n            for (const [index, info] of this.nodeDataSet.entries()) {\r\n                if (startIndex <= index && index <= endIndex) {\r\n                    (_a = info.dom) === null || _a === void 0 ? void 0 : _a.exceptFromParent();\r\n                    (_b = info.dom) === null || _b === void 0 ? void 0 : _b.appendTo(this);\r\n                }\r\n                else {\r\n                    (_c = info.dom) === null || _c === void 0 ? void 0 : _c.delete();\r\n                    delete info.dom;\r\n                }\r\n            }\r\n            this.topPaddingNode.domElement.style.height = `${topPadding}px`;\r\n            this.bottomPaddingNode.domElement.style.height = `${bottomPadding}px`;\r\n            this.bottomPaddingNode.appendTo(this);\r\n        };\r\n        this.calculateSize = () => {\r\n            this.scrollAreaHeight = this.domElement.clientHeight;\r\n            this.refresh();\r\n        };\r\n        this.resizeDebouncer = new debouncer_1.default(100, () => this.calculateSize());\r\n        this.resizeHandler = () => this.resizeDebouncer.run();\r\n        this.append(this.topPaddingNode = new DomNode_1.default(document.createElement(options.childTag)), this.bottomPaddingNode = new DomNode_1.default(document.createElement(options.childTag)));\r\n        this.domElement.style.overflowY = \"scroll\";\r\n        this.on(\"scroll\", () => this.refresh());\r\n        window.addEventListener(\"resize\", this.resizeHandler);\r\n    }\r\n    init(dataSet) {\r\n        var _a;\r\n        for (const nodeData of this.nodeDataSet) {\r\n            (_a = nodeData.dom) === null || _a === void 0 ? void 0 : _a.delete();\r\n        }\r\n        this.nodeDataSet = [];\r\n        for (const data of dataSet) {\r\n            this.nodeDataSet.push({ data, height: this.options.baseChildHeight });\r\n        }\r\n    }\r\n    add(data, index) {\r\n        if (index !== undefined && index < this.nodeDataSet.length) {\r\n            skyutil_1.default.insert(this.nodeDataSet, index, { data, height: this.options.baseChildHeight });\r\n        }\r\n        else {\r\n            this.nodeDataSet.push({ data, height: this.options.baseChildHeight });\r\n        }\r\n        this.refresh();\r\n    }\r\n    findDataIndex(data) {\r\n        return this.nodeDataSet.findIndex((d) => d.data === data);\r\n    }\r\n    remove(data) {\r\n        var _a;\r\n        const index = this.findDataIndex(data);\r\n        if (index !== -1) {\r\n            (_a = this.nodeDataSet[index].dom) === null || _a === void 0 ? void 0 : _a.delete();\r\n            this.nodeDataSet.splice(index, 1);\r\n            this.refresh();\r\n        }\r\n    }\r\n    move(data, to) {\r\n        var _a;\r\n        const index = this.findDataIndex(data);\r\n        if (index !== -1) {\r\n            (_a = this.nodeDataSet[index].dom) === null || _a === void 0 ? void 0 : _a.delete();\r\n            this.nodeDataSet.splice(index, 1);\r\n            if (index < to) {\r\n                to -= 1;\r\n            }\r\n        }\r\n        if (to !== undefined && to < this.nodeDataSet.length) {\r\n            skyutil_1.default.insert(this.nodeDataSet, to, { data, height: this.options.baseChildHeight });\r\n        }\r\n        else {\r\n            this.nodeDataSet.push({ data, height: this.options.baseChildHeight });\r\n        }\r\n        this.refresh();\r\n    }\r\n    appendTo(node, index) {\r\n        const that = super.appendTo(node, index);\r\n        this.calculateSize();\r\n        return that;\r\n    }\r\n    delete() {\r\n        window.removeEventListener(\"resize\", this.resizeHandler);\r\n        super.delete();\r\n    }\r\n}\r\nexports.default = ScrollableDomNode;\r\n//# sourceMappingURL=ScrollableDomNode.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/lib/ScrollableDomNode.js?");

/***/ }),

/***/ "../skynode/lib/SkyNode.js":
/*!*********************************!*\
  !*** ../skynode/lib/SkyNode.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst eventcontainer_1 = __importDefault(__webpack_require__(/*! eventcontainer */ \"../eventcontainer/EventContainer.js\"));\r\nconst skyutil_1 = __importDefault(__webpack_require__(/*! skyutil */ \"../skynode/node_modules/skyutil/SkyUtil.js\"));\r\nclass SkyNode extends eventcontainer_1.default {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.children = [];\r\n    }\r\n    append(...nodes) {\r\n        for (const node of nodes) {\r\n            if (node !== undefined) {\r\n                node.appendTo(this);\r\n            }\r\n        }\r\n    }\r\n    appendTo(node, index) {\r\n        if (this.parent === node && index !== undefined && this.parent.children.indexOf(this) < index) {\r\n            index -= 1;\r\n        }\r\n        this.exceptFromParent();\r\n        if (index !== undefined && index < node.children.length) {\r\n            node.children.splice(index, 0, this);\r\n        }\r\n        else {\r\n            node.children.push(this);\r\n        }\r\n        this.parent = node;\r\n        return this;\r\n    }\r\n    except(...nodes) {\r\n        for (const node of nodes) {\r\n            node.exceptFromParent();\r\n        }\r\n    }\r\n    exceptFromParent() {\r\n        if (this.parent !== undefined) {\r\n            skyutil_1.default.pull(this.parent.children, this);\r\n            this.parent = undefined;\r\n        }\r\n    }\r\n    empty() {\r\n        for (const child of this.children) {\r\n            child.delete();\r\n        }\r\n        return this;\r\n    }\r\n    delete() {\r\n        super.delete();\r\n        this.exceptFromParent();\r\n        this.empty();\r\n        this.children = undefined;\r\n    }\r\n}\r\nexports.default = SkyNode;\r\n//# sourceMappingURL=SkyNode.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/lib/SkyNode.js?");

/***/ }),

/***/ "../skynode/lib/el.js":
/*!****************************!*\
  !*** ../skynode/lib/el.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst DomNode_1 = __importDefault(__webpack_require__(/*! ./DomNode */ \"../skynode/lib/DomNode.js\"));\r\nconst el = (tag, ...children) => {\r\n    const domNode = new DomNode_1.default(document.createElement(tag));\r\n    for (const child of children) {\r\n        if (child !== undefined) {\r\n            if (typeof child === \"string\") {\r\n                domNode.appendText(child);\r\n            }\r\n            else if (child instanceof DomNode_1.default) {\r\n                domNode.append(child);\r\n            }\r\n            else {\r\n                for (const [name, value] of Object.entries(child)) {\r\n                    if (typeof value === \"function\") {\r\n                        domNode.on(name, value);\r\n                    }\r\n                    else if (name === \"style\" && typeof value === \"object\") {\r\n                        domNode.style(value);\r\n                    }\r\n                    else if (value === undefined) {\r\n                        domNode.domElement.removeAttribute(name);\r\n                    }\r\n                    else if (typeof value === \"string\") {\r\n                        domNode.domElement.setAttribute(name, value);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n    return domNode;\r\n};\r\nexports.default = el;\r\n//# sourceMappingURL=el.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/lib/el.js?");

/***/ }),

/***/ "../skynode/lib/index.js":
/*!*******************************!*\
  !*** ../skynode/lib/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ClosableFloatingDomNode = exports.FloatingDomNode = exports.el = exports.ScrollItemDomNode = exports.ScrollableDomNode = exports.BodyNode = exports.DomNode = exports.SkyNode = void 0;\r\nvar SkyNode_1 = __webpack_require__(/*! ./SkyNode */ \"../skynode/lib/SkyNode.js\");\r\nObject.defineProperty(exports, \"SkyNode\", ({ enumerable: true, get: function () { return __importDefault(SkyNode_1).default; } }));\r\nvar DomNode_1 = __webpack_require__(/*! ./DomNode */ \"../skynode/lib/DomNode.js\");\r\nObject.defineProperty(exports, \"DomNode\", ({ enumerable: true, get: function () { return __importDefault(DomNode_1).default; } }));\r\nvar BodyNode_1 = __webpack_require__(/*! ./BodyNode */ \"../skynode/lib/BodyNode.js\");\r\nObject.defineProperty(exports, \"BodyNode\", ({ enumerable: true, get: function () { return __importDefault(BodyNode_1).default; } }));\r\nvar ScrollableDomNode_1 = __webpack_require__(/*! ./ScrollableDomNode */ \"../skynode/lib/ScrollableDomNode.js\");\r\nObject.defineProperty(exports, \"ScrollableDomNode\", ({ enumerable: true, get: function () { return __importDefault(ScrollableDomNode_1).default; } }));\r\nObject.defineProperty(exports, \"ScrollItemDomNode\", ({ enumerable: true, get: function () { return ScrollableDomNode_1.ScrollItemDomNode; } }));\r\nvar el_1 = __webpack_require__(/*! ./el */ \"../skynode/lib/el.js\");\r\nObject.defineProperty(exports, \"el\", ({ enumerable: true, get: function () { return __importDefault(el_1).default; } }));\r\nvar FloatingDomNode_1 = __webpack_require__(/*! ./FloatingDomNode */ \"../skynode/lib/FloatingDomNode.js\");\r\nObject.defineProperty(exports, \"FloatingDomNode\", ({ enumerable: true, get: function () { return __importDefault(FloatingDomNode_1).default; } }));\r\nvar ClosableFloatingDomNode_1 = __webpack_require__(/*! ./ClosableFloatingDomNode */ \"../skynode/lib/ClosableFloatingDomNode.js\");\r\nObject.defineProperty(exports, \"ClosableFloatingDomNode\", ({ enumerable: true, get: function () { return __importDefault(ClosableFloatingDomNode_1).default; } }));\r\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/lib/index.js?");

/***/ }),

/***/ "../skynode/node_modules/@hanul/debouncer/Debouncer.js":
/*!*************************************************************!*\
  !*** ../skynode/node_modules/@hanul/debouncer/Debouncer.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Debouncer {\r\n    constructor(debounceTime, work) {\r\n        this.debounceTime = debounceTime;\r\n        this.work = work;\r\n    }\r\n    run() {\r\n        if (this.debounceTimeout !== undefined) {\r\n            clearTimeout(this.debounceTimeout);\r\n        }\r\n        this.debounceTimeout = setTimeout(() => {\r\n            this.work();\r\n        }, this.debounceTime);\r\n    }\r\n}\r\nexports.default = Debouncer;\r\n//# sourceMappingURL=Debouncer.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/node_modules/@hanul/debouncer/Debouncer.js?");

/***/ }),

/***/ "../skynode/node_modules/skyutil/SkyUtil.js":
/*!**************************************************!*\
  !*** ../skynode/node_modules/skyutil/SkyUtil.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass SkyUtil {\r\n    static pull(array, ...removeList) {\r\n        for (const el of removeList) {\r\n            const index = array.indexOf(el);\r\n            if (index !== -1) {\r\n                array.splice(index, 1);\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.default = SkyUtil;\r\n//# sourceMappingURL=SkyUtil.js.map\n\n//# sourceURL=webpack://defantasy/../skynode/node_modules/skyutil/SkyUtil.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;