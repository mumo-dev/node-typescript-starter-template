exports.id = "main";
exports.modules = {

/***/ "./src/items/index.ts":
/*!****************************!*\
  !*** ./src/items/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.itemController = exports.itemService = void 0;\nvar items_service_1 = __webpack_require__(/*! ./items.service */ \"./src/items/items.service.ts\");\nvar items_controller_1 = __webpack_require__(/*! ./items.controller */ \"./src/items/items.controller.ts\");\nvar itemService = new items_service_1.ItemService();\nexports.itemService = itemService;\nvar itemController = new items_controller_1.ItemController(itemService);\nexports.itemController = itemController;\n\n\n//# sourceURL=webpack:///./src/items/index.ts?");

/***/ }),

/***/ "./src/items/items.controller.ts":
/*!***************************************!*\
  !*** ./src/items/items.controller.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ItemController = void 0;\nvar core_1 = __webpack_require__(/*! @overnightjs/core */ \"@overnightjs/core\");\nvar http_status_codes_1 = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\nvar http_exception_1 = __importStar(__webpack_require__(/*! ../common/http-exception */ \"./src/common/http-exception.ts\"));\nvar ItemController = /** @class */ (function () {\n    function ItemController(itemService) {\n        this.itemService = itemService;\n    }\n    ItemController.prototype.findAll = function (req, res) {\n        return __awaiter(this, void 0, void 0, function () {\n            var items, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        return [4 /*yield*/, this.itemService.findAll()];\n                    case 1:\n                        items = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.OK).send(items)];\n                    case 2:\n                        e_1 = _a.sent();\n                        throw new http_exception_1.default(http_status_codes_1.NOT_FOUND, e_1.message);\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.findOne = function (req, res, next) {\n        return __awaiter(this, void 0, void 0, function () {\n            var id, item, e_2;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        id = parseInt(req.params.id, 10);\n                        _a.label = 1;\n                    case 1:\n                        _a.trys.push([1, 3, , 4]);\n                        return [4 /*yield*/, this.itemService.find(id)];\n                    case 2:\n                        item = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.OK).send(item)];\n                    case 3:\n                        e_2 = _a.sent();\n                        next(new http_exception_1.ResourceNotFoundException(e_2.message));\n                        return [3 /*break*/, 4];\n                    case 4: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.createItem = function (req, res) {\n        return __awaiter(this, void 0, void 0, function () {\n            var item, e_3;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        item = req.body.item;\n                        return [4 /*yield*/, this.itemService.create(item)];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.CREATED)];\n                    case 2:\n                        e_3 = _a.sent();\n                        throw new http_exception_1.ResourceNotFoundException(e_3.message);\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.updateItem = function (req, res) {\n        return __awaiter(this, void 0, void 0, function () {\n            var item, e_4;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        item = req.body.item;\n                        return [4 /*yield*/, this.itemService.update(item)];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.CREATED)];\n                    case 2:\n                        e_4 = _a.sent();\n                        throw new http_exception_1.default(http_status_codes_1.INTERNAL_SERVER_ERROR, e_4.message);\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.deleteItem = function (req, res) {\n        return __awaiter(this, void 0, void 0, function () {\n            var id, e_5;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        id = parseInt(req.params.id, 10);\n                        return [4 /*yield*/, this.itemService.remove(id)];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.OK)];\n                    case 2:\n                        e_5 = _a.sent();\n                        throw new http_exception_1.default(http_status_codes_1.INTERNAL_SERVER_ERROR, e_5.message);\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    __decorate([\n        core_1.Get(\"\")\n    ], ItemController.prototype, \"findAll\", null);\n    __decorate([\n        core_1.Get(\":id\")\n    ], ItemController.prototype, \"findOne\", null);\n    __decorate([\n        core_1.Post(\"\")\n    ], ItemController.prototype, \"createItem\", null);\n    __decorate([\n        core_1.Put(\"\")\n    ], ItemController.prototype, \"updateItem\", null);\n    __decorate([\n        core_1.Delete(\":id\")\n    ], ItemController.prototype, \"deleteItem\", null);\n    ItemController = __decorate([\n        core_1.Controller(\"api/items/\")\n    ], ItemController);\n    return ItemController;\n}());\nexports.ItemController = ItemController;\n\n\n//# sourceURL=webpack:///./src/items/items.controller.ts?");

/***/ }),

/***/ "./src/items/items.service.ts":
/*!************************************!*\
  !*** ./src/items/items.service.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Data Model Interfaces\n */\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ItemService = void 0;\n/**\n * In-Memory Store\n */\nvar items = {\n    1: {\n        id: 1,\n        name: \"Burger\",\n        price: 5.99,\n        description: \"Tasty\",\n        image: \"https://cdn.auth0.com/blog/whatabyte/burger-sm.png\",\n    },\n    2: {\n        id: 2,\n        name: \"Pizza\",\n        price: 2.99,\n        description: \"Cheesy\",\n        image: \"https://cdn.auth0.com/blog/whatabyte/pizza-sm.png\",\n    },\n    3: {\n        id: 3,\n        name: \"Tea\",\n        price: 1.99,\n        description: \"Informative\",\n        image: \"https://cdn.auth0.com/blog/whatabyte/tea-sm.png\",\n    },\n};\nvar ItemService = /** @class */ (function () {\n    function ItemService() {\n    }\n    ItemService.prototype.findAll = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, items];\n            });\n        });\n    };\n    ItemService.prototype.find = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            var record;\n            return __generator(this, function (_a) {\n                record = items[id];\n                if (record) {\n                    return [2 /*return*/, record];\n                }\n                throw new Error(\"No item found\");\n            });\n        });\n    };\n    ItemService.prototype.create = function (newItem) {\n        return __awaiter(this, void 0, void 0, function () {\n            var id;\n            return __generator(this, function (_a) {\n                id = new Date().valueOf();\n                items[id] = __assign(__assign({}, newItem), { id: id });\n                return [2 /*return*/];\n            });\n        });\n    };\n    ItemService.prototype.update = function (updatedItem) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                if (items[updatedItem.id]) {\n                    items[updatedItem.id] = updatedItem;\n                    return [2 /*return*/];\n                }\n                throw new Error(\"No record found to update\");\n            });\n        });\n    };\n    ItemService.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            var record;\n            return __generator(this, function (_a) {\n                record = items[id];\n                if (record) {\n                    delete items[id];\n                    return [2 /*return*/];\n                }\n                throw new Error(\"No record found to delete\");\n            });\n        });\n    };\n    return ItemService;\n}());\nexports.ItemService = ItemService;\n\n\n//# sourceURL=webpack:///./src/items/items.service.ts?");

/***/ })

};