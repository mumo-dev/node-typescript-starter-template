exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Required External Modules\r\n */\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\nvar server_1 = __importDefault(__webpack_require__(/*! ./server */ \"./src/server.ts\"));\r\ndotenv.config();\r\n/**\r\n * App Variables\r\n */\r\nif (!process.env.PORT) {\r\n    process.exit(1);\r\n}\r\nvar PORT = parseInt(process.env.PORT, 10);\r\nvar server = new server_1.default().start(PORT);\r\nif (true) {\r\n    module.hot.accept();\r\n    module.hot.dispose(function () { return server.close(); });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar core_1 = __webpack_require__(/*! @overnightjs/core */ \"@overnightjs/core\");\r\nvar error_middleware_1 = __webpack_require__(/*! ./middleware/error.middleware */ \"./src/middleware/error.middleware.ts\");\r\nvar notFound_middleware_1 = __webpack_require__(/*! ./middleware/notFound.middleware */ \"./src/middleware/notFound.middleware.ts\");\r\nvar items_1 = __webpack_require__(/*! ./items */ \"./src/items/index.ts\");\r\nvar mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nvar auth_1 = __webpack_require__(/*! ./modules/auth */ \"./src/modules/auth/index.ts\");\r\nvar AppServer = /** @class */ (function (_super) {\r\n    __extends(AppServer, _super);\r\n    function AppServer() {\r\n        var _this = _super.call(this, true) || this;\r\n        _this.app.use(helmet_1.default());\r\n        _this.app.use(cors_1.default());\r\n        _this.app.use(express_1.default.json());\r\n        _this.app.use(express_1.default.urlencoded({ extended: true }));\r\n        _this.setupControllers();\r\n        _this.setupDatabase();\r\n        _this.app.use(error_middleware_1.errorHandler);\r\n        _this.app.use(notFound_middleware_1.notFoundHandler);\r\n        return _this;\r\n    }\r\n    AppServer.prototype.setupControllers = function () {\r\n        _super.prototype.addControllers.call(this, [items_1.itemController, auth_1.authController]);\r\n    };\r\n    AppServer.prototype.setupDatabase = function () {\r\n        var mongoDBConnectionUrl = process.env.DB_URL;\r\n        mongoose_1.default.connect(mongoDBConnectionUrl, {\r\n            useNewUrlParser: true,\r\n            useUnifiedTopology: true,\r\n        });\r\n    };\r\n    /**** @param {Integer} port - Port which the server will listen.*/\r\n    AppServer.prototype.start = function (port) {\r\n        return this.app.listen(port, function () {\r\n            console.log(\"Listening on port \" + port);\r\n        });\r\n    };\r\n    return AppServer;\r\n}(core_1.Server));\r\nexports.default = AppServer;\r\n\n\n//# sourceURL=webpack:///./src/server.ts?");

/***/ })

};