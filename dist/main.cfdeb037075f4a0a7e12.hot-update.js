exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules\n */\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar server_1 = __importDefault(__webpack_require__(/*! ./server */ \"./src/server.ts\"));\ndotenv.config();\n/**\n * App Variables\n */\nif (!process.env.PORT) {\n    process.exit(1);\n}\nvar PORT = parseInt(process.env.PORT, 10);\nvar server = new server_1.default().start(PORT);\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

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
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ItemController = void 0;\nvar core_1 = __webpack_require__(/*! @overnightjs/core */ \"@overnightjs/core\");\nvar http_status_codes_1 = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\nvar ItemController = /** @class */ (function () {\n    function ItemController(itemService) {\n        this.itemService = itemService;\n    }\n    ItemController.prototype.findAll = function (req, res) {\n        return __awaiter(this, void 0, void 0, function () {\n            var items, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        return [4 /*yield*/, this.itemService.findAll()];\n                    case 1:\n                        items = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.OK).send(items)];\n                    case 2:\n                        e_1 = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.NOT_FOUND).send(e_1.message)];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.findOne = function (req, res) {\n        return __awaiter(this, void 0, void 0, function () {\n            var id, item, e_2;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        id = parseInt(req.params.id, 10);\n                        _a.label = 1;\n                    case 1:\n                        _a.trys.push([1, 3, , 4]);\n                        return [4 /*yield*/, this.itemService.find(id)];\n                    case 2:\n                        item = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.OK).send(item)];\n                    case 3:\n                        e_2 = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.NOT_FOUND).send(e_2.message)];\n                    case 4: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.createItem = function (req, res) {\n        return __awaiter(this, void 0, void 0, function () {\n            var item, e_3;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        item = req.body.item;\n                        return [4 /*yield*/, this.itemService.create(item)];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.CREATED)];\n                    case 2:\n                        e_3 = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.NOT_FOUND).send(e_3.message)];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.updateItem = function (req, res) {\n        return __awaiter(this, void 0, void 0, function () {\n            var item, e_4;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        item = req.body.item;\n                        return [4 /*yield*/, this.itemService.update(item)];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.CREATED)];\n                    case 2:\n                        e_4 = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send(e_4.message)];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.deleteItem = function (req, res) {\n        return __awaiter(this, void 0, void 0, function () {\n            var id, e_5;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        id = parseInt(req.params.id, 10);\n                        return [4 /*yield*/, this.itemService.remove(id)];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.OK)];\n                    case 2:\n                        e_5 = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send(e_5.message)];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    __decorate([\n        core_1.Get(\"/\")\n    ], ItemController.prototype, \"findAll\", null);\n    __decorate([\n        core_1.Get(\"/:id\")\n    ], ItemController.prototype, \"findOne\", null);\n    __decorate([\n        core_1.Post(\"/\")\n    ], ItemController.prototype, \"createItem\", null);\n    __decorate([\n        core_1.Put(\"/\")\n    ], ItemController.prototype, \"updateItem\", null);\n    __decorate([\n        core_1.Delete(\"/:id\")\n    ], ItemController.prototype, \"deleteItem\", null);\n    ItemController = __decorate([\n        core_1.Controller(\"api/items\")\n    ], ItemController);\n    return ItemController;\n}());\nexports.ItemController = ItemController;\n\n\n//# sourceURL=webpack:///./src/items/items.controller.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar core_1 = __webpack_require__(/*! @overnightjs/core */ \"@overnightjs/core\");\nvar items_1 = __webpack_require__(/*! ./items */ \"./src/items/index.ts\");\nvar AppServer = /** @class */ (function (_super) {\n    __extends(AppServer, _super);\n    function AppServer() {\n        var _this = _super.call(this, true) || this;\n        _this.app.use(express_1.default.json());\n        _this.app.use(express_1.default.urlencoded({ extended: true }));\n        _this.setupControllers();\n        _this.setupDatabase();\n        return _this;\n    }\n    AppServer.prototype.setupControllers = function () {\n        _super.prototype.addControllers.call(this, [items_1.itemController]);\n    };\n    AppServer.prototype.setupDatabase = function () { };\n    /**** @param {Integer} port - Port which the server will listen.*/\n    AppServer.prototype.start = function (port) {\n        return this.app.listen(port, function () {\n            console.log(\"Listening on port \" + port);\n        });\n    };\n    return AppServer;\n}(core_1.Server));\nexports.default = AppServer;\n\n\n//# sourceURL=webpack:///./src/server.ts?");

/***/ })

};