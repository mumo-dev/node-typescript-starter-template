exports.id = "main";
exports.modules = {

/***/ "./src/common/http-exception.ts":
/*!**************************************!*\
  !*** ./src/common/http-exception.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ValidationException = exports.BadRequestException = exports.ResourceNotFoundException = void 0;\nvar http_status_codes_1 = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\nvar HttpException = /** @class */ (function (_super) {\n    __extends(HttpException, _super);\n    function HttpException(statusCode, message) {\n        var _this = _super.call(this, message) || this;\n        _this.statusCode = statusCode;\n        _this.message = message;\n        return _this;\n    }\n    return HttpException;\n}(Error));\nexports.default = HttpException;\nvar ResourceNotFoundException = /** @class */ (function (_super) {\n    __extends(ResourceNotFoundException, _super);\n    function ResourceNotFoundException(message) {\n        return _super.call(this, http_status_codes_1.NOT_FOUND, message) || this;\n    }\n    return ResourceNotFoundException;\n}(HttpException));\nexports.ResourceNotFoundException = ResourceNotFoundException;\nvar BadRequestException = /** @class */ (function (_super) {\n    __extends(BadRequestException, _super);\n    function BadRequestException(message) {\n        return _super.call(this, http_status_codes_1.BAD_REQUEST, message) || this;\n    }\n    return BadRequestException;\n}(HttpException));\nexports.BadRequestException = BadRequestException;\nvar ValidationException = /** @class */ (function (_super) {\n    __extends(ValidationException, _super);\n    function ValidationException(errors) {\n        var _this = _super.call(this, http_status_codes_1.BAD_REQUEST, 'Input data validation failed') || this;\n        Object.setPrototypeOf(_this, ValidationException.prototype);\n        _this.errors = errors;\n        return _this;\n    }\n    return ValidationException;\n}(HttpException));\nexports.ValidationException = ValidationException;\n\n\n//# sourceURL=webpack:///./src/common/http-exception.ts?");

/***/ }),

/***/ "./src/items/items.controller.ts":
/*!***************************************!*\
  !*** ./src/items/items.controller.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ItemController = void 0;\nvar core_1 = __webpack_require__(/*! @overnightjs/core */ \"@overnightjs/core\");\nvar http_status_codes_1 = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\nvar item_interface_1 = __webpack_require__(/*! ./item.interface */ \"./src/items/item.interface.ts\");\nvar http_exception_1 = __importStar(__webpack_require__(/*! ../common/http-exception */ \"./src/common/http-exception.ts\"));\nvar error_formatter_1 = __webpack_require__(/*! ../common/error-formatter */ \"./src/common/error-formatter.ts\");\nvar ItemController = /** @class */ (function () {\n    function ItemController(itemService) {\n        this.itemService = itemService;\n    }\n    ItemController.prototype.findAll = function (req, res, next) {\n        return __awaiter(this, void 0, void 0, function () {\n            var items, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        return [4 /*yield*/, this.itemService.findAll()];\n                    case 1:\n                        items = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.OK).send(items)];\n                    case 2:\n                        e_1 = _a.sent();\n                        next(new http_exception_1.default(http_status_codes_1.NOT_FOUND, e_1.message));\n                        return [3 /*break*/, 3];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.findOne = function (req, res, next) {\n        return __awaiter(this, void 0, void 0, function () {\n            var id, item, e_2;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        id = parseInt(req.params.id, 10);\n                        _a.label = 1;\n                    case 1:\n                        _a.trys.push([1, 3, , 4]);\n                        return [4 /*yield*/, this.itemService.find(id)];\n                    case 2:\n                        item = _a.sent();\n                        return [2 /*return*/, res.status(http_status_codes_1.OK).send(item)];\n                    case 3:\n                        e_2 = _a.sent();\n                        next(new http_exception_1.ResourceNotFoundException(e_2.message));\n                        return [3 /*break*/, 4];\n                    case 4: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.createItem = function (req, res, next) {\n        return __awaiter(this, void 0, void 0, function () {\n            var item, error, errors, e_3;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        item = req.body.item;\n                        error = new item_interface_1.ItemModel(item).validateSync();\n                        if (error) {\n                            errors = error_formatter_1.formatMongooseValidationErrors(error.errors);\n                            return [2 /*return*/, next(new http_exception_1.ValidationException('Invalid data passed', errors))];\n                        }\n                        return [4 /*yield*/, this.itemService.create(item)];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.CREATED)];\n                    case 2:\n                        e_3 = _a.sent();\n                        return [2 /*return*/, next(new http_exception_1.ResourceNotFoundException(e_3.message))];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.updateItem = function (req, res, next) {\n        return __awaiter(this, void 0, void 0, function () {\n            var item, e_4;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        item = req.body.item;\n                        return [4 /*yield*/, this.itemService.update(item)];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.CREATED)];\n                    case 2:\n                        e_4 = _a.sent();\n                        next(new http_exception_1.default(http_status_codes_1.INTERNAL_SERVER_ERROR, e_4.message));\n                        return [3 /*break*/, 3];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    ItemController.prototype.deleteItem = function (req, res, next) {\n        return __awaiter(this, void 0, void 0, function () {\n            var id, e_5;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        id = parseInt(req.params.id, 10);\n                        return [4 /*yield*/, this.itemService.remove(id)];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.OK)];\n                    case 2:\n                        e_5 = _a.sent();\n                        next(new http_exception_1.default(http_status_codes_1.INTERNAL_SERVER_ERROR, e_5.message));\n                        return [3 /*break*/, 3];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    __decorate([\n        core_1.Get(\"\")\n    ], ItemController.prototype, \"findAll\", null);\n    __decorate([\n        core_1.Get(\":id\")\n    ], ItemController.prototype, \"findOne\", null);\n    __decorate([\n        core_1.Post(\"\")\n    ], ItemController.prototype, \"createItem\", null);\n    __decorate([\n        core_1.Put(\"\")\n    ], ItemController.prototype, \"updateItem\", null);\n    __decorate([\n        core_1.Delete(\":id\")\n    ], ItemController.prototype, \"deleteItem\", null);\n    ItemController = __decorate([\n        core_1.Controller(\"api/items/\")\n    ], ItemController);\n    return ItemController;\n}());\nexports.ItemController = ItemController;\n\n\n//# sourceURL=webpack:///./src/items/items.controller.ts?");

/***/ }),

/***/ "./src/middleware/error.middleware.ts":
/*!********************************************!*\
  !*** ./src/middleware/error.middleware.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.errorHandler = void 0;\nvar http_exception_1 = __webpack_require__(/*! ../common/http-exception */ \"./src/common/http-exception.ts\");\nexports.errorHandler = function (error, request, response, next) {\n    var status = error.statusCode || 500;\n    var message = error.message || \"It's not you. It's us. We are having some problems.\";\n    if (error instanceof http_exception_1.ValidationException) {\n        console.log(\"Is instance of validation error\" + error);\n        response.status(status).json({\n            status: \"validation error\",\n            statusCode: status,\n            message: message,\n            errors: error.errors,\n        });\n    }\n    else {\n        console.log(\"Is not instance of validation error\" + error);\n        response.status(status).json({\n            status: \"error\",\n            statusCode: status,\n            message: message,\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/middleware/error.middleware.ts?");

/***/ })

};