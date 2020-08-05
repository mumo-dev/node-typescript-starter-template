exports.id = "main";
exports.modules = {

/***/ "./src/middleware/error.middleware.ts":
/*!********************************************!*\
  !*** ./src/middleware/error.middleware.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.errorHandler = void 0;\nvar http_exception_1 = __webpack_require__(/*! ../common/http-exception */ \"./src/common/http-exception.ts\");\nexports.errorHandler = function (error, request, response, next) {\n    var status = error.statusCode || 500;\n    var message = error.message || \"It's not you. It's us. We are having some problems.\";\n    if (error instanceof http_exception_1.ValidationException) {\n        response.status(status).json({\n            status: \"validation error\",\n            statusCode: status,\n            message: message,\n            errors: error.errors,\n        });\n    }\n    else {\n        response.status(status).json({\n            status: \"error\",\n            statusCode: status,\n            message: message,\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/middleware/error.middleware.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar core_1 = __webpack_require__(/*! @overnightjs/core */ \"@overnightjs/core\");\nvar error_middleware_1 = __webpack_require__(/*! ./middleware/error.middleware */ \"./src/middleware/error.middleware.ts\");\nvar notFound_middleware_1 = __webpack_require__(/*! ./middleware/notFound.middleware */ \"./src/middleware/notFound.middleware.ts\");\nvar items_1 = __webpack_require__(/*! ./items */ \"./src/items/index.ts\");\nvar mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nvar AppServer = /** @class */ (function (_super) {\n    __extends(AppServer, _super);\n    function AppServer() {\n        var _this = _super.call(this, true) || this;\n        _this.app.use(helmet_1.default());\n        _this.app.use(cors_1.default());\n        _this.app.use(express_1.default.json());\n        _this.app.use(express_1.default.urlencoded({ extended: true }));\n        _this.setupControllers();\n        _this.setupDatabase();\n        _this.app.use(error_middleware_1.errorHandler);\n        _this.app.use(notFound_middleware_1.notFoundHandler);\n        return _this;\n    }\n    AppServer.prototype.setupControllers = function () {\n        _super.prototype.addControllers.call(this, [items_1.itemController]);\n    };\n    AppServer.prototype.setupDatabase = function () {\n        var mongoDBConnectionUrl = process.env.DB_URL;\n        mongoose_1.default.connect(mongoDBConnectionUrl, {\n            useNewUrlParser: true,\n            useUnifiedTopology: true,\n        });\n    };\n    /**** @param {Integer} port - Port which the server will listen.*/\n    AppServer.prototype.start = function (port) {\n        return this.app.listen(port, function () {\n            console.log(\"Listening on port \" + port);\n        });\n    };\n    return AppServer;\n}(core_1.Server));\nexports.default = AppServer;\n\n\n//# sourceURL=webpack:///./src/server.ts?");

/***/ })

};