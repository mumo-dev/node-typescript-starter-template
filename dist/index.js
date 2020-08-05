/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "776782eb6f94e132b6ea";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\nmodule.exports.formatError = function(err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t} else {\n\t\treturn stack;\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/common/error-formatter.ts":
/*!***************************************!*\
  !*** ./src/common/error-formatter.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.formatMongooseValidationErrors = void 0;\r\nexports.formatMongooseValidationErrors = function (errors) {\r\n    var errorMessages = [];\r\n    for (var fieldError in errors) {\r\n        var formattedError = {};\r\n        formattedError[fieldError] = errors[fieldError][\"properties\"][\"message\"];\r\n        errorMessages.push(formattedError);\r\n    }\r\n    return errorMessages;\r\n};\r\n\n\n//# sourceURL=webpack:///./src/common/error-formatter.ts?");

/***/ }),

/***/ "./src/common/http-exception.ts":
/*!**************************************!*\
  !*** ./src/common/http-exception.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.ValidationException = exports.BadRequestException = exports.ResourceNotFoundException = void 0;\r\nvar http_status_codes_1 = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\r\nvar HttpException = /** @class */ (function (_super) {\r\n    __extends(HttpException, _super);\r\n    function HttpException(statusCode, message) {\r\n        var _this = _super.call(this, message) || this;\r\n        _this.statusCode = statusCode;\r\n        _this.message = message;\r\n        return _this;\r\n    }\r\n    return HttpException;\r\n}(Error));\r\nexports.default = HttpException;\r\nvar ResourceNotFoundException = /** @class */ (function (_super) {\r\n    __extends(ResourceNotFoundException, _super);\r\n    function ResourceNotFoundException(message) {\r\n        return _super.call(this, http_status_codes_1.NOT_FOUND, message) || this;\r\n    }\r\n    return ResourceNotFoundException;\r\n}(HttpException));\r\nexports.ResourceNotFoundException = ResourceNotFoundException;\r\nvar BadRequestException = /** @class */ (function (_super) {\r\n    __extends(BadRequestException, _super);\r\n    function BadRequestException(message) {\r\n        return _super.call(this, http_status_codes_1.BAD_REQUEST, message) || this;\r\n    }\r\n    return BadRequestException;\r\n}(HttpException));\r\nexports.BadRequestException = BadRequestException;\r\nvar ValidationException = /** @class */ (function (_super) {\r\n    __extends(ValidationException, _super);\r\n    function ValidationException(errors) {\r\n        var _this = _super.call(this, http_status_codes_1.BAD_REQUEST, 'Input data validation failed') || this;\r\n        Object.setPrototypeOf(_this, ValidationException.prototype);\r\n        _this.errors = errors;\r\n        return _this;\r\n    }\r\n    return ValidationException;\r\n}(HttpException));\r\nexports.ValidationException = ValidationException;\r\n\n\n//# sourceURL=webpack:///./src/common/http-exception.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Required External Modules\r\n */\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\nvar server_1 = __importDefault(__webpack_require__(/*! ./server */ \"./src/server.ts\"));\r\ndotenv.config();\r\n/**\r\n * App Variables\r\n */\r\nif (!process.env.PORT) {\r\n    process.exit(1);\r\n}\r\nvar PORT = parseInt(process.env.PORT, 10);\r\nvar server = new server_1.default().start(PORT);\r\nif (true) {\r\n    module.hot.accept();\r\n    module.hot.dispose(function () { return server.close(); });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/items/index.ts":
/*!****************************!*\
  !*** ./src/items/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.itemController = exports.itemService = void 0;\r\nvar items_service_1 = __webpack_require__(/*! ./items.service */ \"./src/items/items.service.ts\");\r\nvar items_controller_1 = __webpack_require__(/*! ./items.controller */ \"./src/items/items.controller.ts\");\r\nvar item_repository_1 = __webpack_require__(/*! ./item.repository */ \"./src/items/item.repository.ts\");\r\nvar itemRepository = new item_repository_1.ItemRepository();\r\nvar itemService = new items_service_1.ItemService(itemRepository);\r\nexports.itemService = itemService;\r\nvar itemController = new items_controller_1.ItemController(itemService);\r\nexports.itemController = itemController;\r\n\n\n//# sourceURL=webpack:///./src/items/index.ts?");

/***/ }),

/***/ "./src/items/item.interface.ts":
/*!*************************************!*\
  !*** ./src/items/item.interface.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.ItemModel = void 0;\r\nvar mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar ItemSchema = new mongoose_1.Schema({\r\n    name: {\r\n        type: String,\r\n        required: [true, 'Name is required']\r\n    },\r\n    price: {\r\n        type: Number,\r\n        required: [true, 'Price is required'],\r\n        min: [20, 'Minimum price for acceptable is 20']\r\n    },\r\n    description: {\r\n        type: String,\r\n        required: [true, 'Description is required']\r\n    },\r\n    image: {\r\n        type: String,\r\n        required: [true, 'Image is required']\r\n    }\r\n});\r\nexports.ItemModel = mongoose_1.model('Item', ItemSchema);\r\n\n\n//# sourceURL=webpack:///./src/items/item.interface.ts?");

/***/ }),

/***/ "./src/items/item.repository.ts":
/*!**************************************!*\
  !*** ./src/items/item.repository.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.ItemRepository = void 0;\r\nvar item_interface_1 = __webpack_require__(/*! ./item.interface */ \"./src/items/item.interface.ts\");\r\nvar ItemRepository = /** @class */ (function () {\r\n    function ItemRepository() {\r\n    }\r\n    ItemRepository.prototype.fetchAll = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, item_interface_1.ItemModel.find({})];\r\n                    case 1: return [2 /*return*/, _a.sent()];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    ItemRepository.prototype.create = function (data) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, item_interface_1.ItemModel.create(data)];\r\n                    case 1: return [2 /*return*/, _a.sent()];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return ItemRepository;\r\n}());\r\nexports.ItemRepository = ItemRepository;\r\n\n\n//# sourceURL=webpack:///./src/items/item.repository.ts?");

/***/ }),

/***/ "./src/items/items.controller.ts":
/*!***************************************!*\
  !*** ./src/items/items.controller.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.ItemController = void 0;\r\nvar core_1 = __webpack_require__(/*! @overnightjs/core */ \"@overnightjs/core\");\r\nvar http_status_codes_1 = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\r\nvar item_interface_1 = __webpack_require__(/*! ./item.interface */ \"./src/items/item.interface.ts\");\r\nvar http_exception_1 = __importStar(__webpack_require__(/*! ../common/http-exception */ \"./src/common/http-exception.ts\"));\r\nvar error_formatter_1 = __webpack_require__(/*! ../common/error-formatter */ \"./src/common/error-formatter.ts\");\r\nvar auth_middleware_1 = __webpack_require__(/*! ../modules/auth/middleware/auth.middleware */ \"./src/modules/auth/middleware/auth.middleware.ts\");\r\nvar ItemController = /** @class */ (function () {\r\n    function ItemController(itemService) {\r\n        this.itemService = itemService;\r\n    }\r\n    ItemController.prototype.findAll = function (req, res, next) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var items, e_1;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        _a.trys.push([0, 2, , 3]);\r\n                        return [4 /*yield*/, this.itemService.findAll()];\r\n                    case 1:\r\n                        items = _a.sent();\r\n                        return [2 /*return*/, res.status(http_status_codes_1.OK).send(items)];\r\n                    case 2:\r\n                        e_1 = _a.sent();\r\n                        next(new http_exception_1.default(http_status_codes_1.NOT_FOUND, e_1.message));\r\n                        return [3 /*break*/, 3];\r\n                    case 3: return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    ItemController.prototype.findOne = function (req, res, next) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var id, item, e_2;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        id = parseInt(req.params.id, 10);\r\n                        _a.label = 1;\r\n                    case 1:\r\n                        _a.trys.push([1, 3, , 4]);\r\n                        return [4 /*yield*/, this.itemService.find(id)];\r\n                    case 2:\r\n                        item = _a.sent();\r\n                        return [2 /*return*/, res.status(http_status_codes_1.OK).send(item)];\r\n                    case 3:\r\n                        e_2 = _a.sent();\r\n                        next(new http_exception_1.ResourceNotFoundException(e_2.message));\r\n                        return [3 /*break*/, 4];\r\n                    case 4: return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    ItemController.prototype.createItem = function (req, res, next) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var item, error, errors, e_3;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        _a.trys.push([0, 2, , 3]);\r\n                        item = req.body.item;\r\n                        error = new item_interface_1.ItemModel(item).validateSync();\r\n                        if (error) {\r\n                            errors = error_formatter_1.formatMongooseValidationErrors(error.errors);\r\n                            return [2 /*return*/, next(new http_exception_1.ValidationException(errors))];\r\n                        }\r\n                        return [4 /*yield*/, this.itemService.create(item)];\r\n                    case 1:\r\n                        _a.sent();\r\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.CREATED)];\r\n                    case 2:\r\n                        e_3 = _a.sent();\r\n                        return [2 /*return*/, next(new http_exception_1.ResourceNotFoundException(e_3.message))];\r\n                    case 3: return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    ItemController.prototype.updateItem = function (req, res, next) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var item, e_4;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        _a.trys.push([0, 2, , 3]);\r\n                        item = req.body.item;\r\n                        return [4 /*yield*/, this.itemService.update(item)];\r\n                    case 1:\r\n                        _a.sent();\r\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.CREATED)];\r\n                    case 2:\r\n                        e_4 = _a.sent();\r\n                        next(new http_exception_1.default(http_status_codes_1.INTERNAL_SERVER_ERROR, e_4.message));\r\n                        return [3 /*break*/, 3];\r\n                    case 3: return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    ItemController.prototype.deleteItem = function (req, res, next) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var id, e_5;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        _a.trys.push([0, 2, , 3]);\r\n                        id = parseInt(req.params.id, 10);\r\n                        return [4 /*yield*/, this.itemService.remove(id)];\r\n                    case 1:\r\n                        _a.sent();\r\n                        return [2 /*return*/, res.sendStatus(http_status_codes_1.OK)];\r\n                    case 2:\r\n                        e_5 = _a.sent();\r\n                        next(new http_exception_1.default(http_status_codes_1.INTERNAL_SERVER_ERROR, e_5.message));\r\n                        return [3 /*break*/, 3];\r\n                    case 3: return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    __decorate([\r\n        core_1.Middleware([auth_middleware_1.isAuthenticated, auth_middleware_1.hasRole('CLIENT')]),\r\n        core_1.Get(\"\")\r\n    ], ItemController.prototype, \"findAll\", null);\r\n    __decorate([\r\n        core_1.Get(\":id\")\r\n    ], ItemController.prototype, \"findOne\", null);\r\n    __decorate([\r\n        core_1.Post(\"\")\r\n    ], ItemController.prototype, \"createItem\", null);\r\n    __decorate([\r\n        core_1.Put(\"\")\r\n    ], ItemController.prototype, \"updateItem\", null);\r\n    __decorate([\r\n        core_1.Delete(\":id\")\r\n    ], ItemController.prototype, \"deleteItem\", null);\r\n    ItemController = __decorate([\r\n        core_1.Controller(\"api/items/\")\r\n    ], ItemController);\r\n    return ItemController;\r\n}());\r\nexports.ItemController = ItemController;\r\n\n\n//# sourceURL=webpack:///./src/items/items.controller.ts?");

/***/ }),

/***/ "./src/items/items.service.ts":
/*!************************************!*\
  !*** ./src/items/items.service.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Data Model Interfaces\r\n */\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.ItemService = void 0;\r\n/**\r\n * In-Memory Store\r\n \r\n\r\nconst items: Items = {\r\n  1: {\r\n    id: 1,\r\n    name: \"Burger\",\r\n    price: 5.99,\r\n    description: \"Tasty\",\r\n    image: \"https://cdn.auth0.com/blog/whatabyte/burger-sm.png\",\r\n  },\r\n  2: {\r\n    id: 2,\r\n    name: \"Pizza\",\r\n    price: 2.99,\r\n    description: \"Cheesy\",\r\n    image: \"https://cdn.auth0.com/blog/whatabyte/pizza-sm.png\",\r\n  },\r\n  3: {\r\n    id: 3,\r\n    name: \"Tea\",\r\n    price: 1.99,\r\n    description: \"Informative\",\r\n    image: \"https://cdn.auth0.com/blog/whatabyte/tea-sm.png\",\r\n  },\r\n};\r\n*/\r\nvar ItemService = /** @class */ (function () {\r\n    function ItemService(itemRepository) {\r\n        this.itemRepository = itemRepository;\r\n    }\r\n    ItemService.prototype.findAll = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                return [2 /*return*/, this.itemRepository.fetchAll()];\r\n            });\r\n        });\r\n    };\r\n    ItemService.prototype.find = function (id) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                // const record: Item = items[id];\r\n                // if (record) {\r\n                //   return record;\r\n                // }\r\n                throw new Error(\"No item found\");\r\n            });\r\n        });\r\n    };\r\n    ItemService.prototype.create = function (newItem) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                return [2 /*return*/, this.itemRepository.create(newItem)];\r\n            });\r\n        });\r\n    };\r\n    ItemService.prototype.update = function (updatedItem) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                // if (items[updatedItem.id]) {\r\n                //   items[updatedItem.id] = updatedItem;\r\n                //   return;\r\n                // }\r\n                throw new Error(\"No record found to update\");\r\n            });\r\n        });\r\n    };\r\n    ItemService.prototype.remove = function (id) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                // const record: Item = items[id];\r\n                // if (record) {\r\n                //   delete items[id];\r\n                //   return;\r\n                // }\r\n                throw new Error(\"No record found to delete\");\r\n            });\r\n        });\r\n    };\r\n    return ItemService;\r\n}());\r\nexports.ItemService = ItemService;\r\n\n\n//# sourceURL=webpack:///./src/items/items.service.ts?");

/***/ }),

/***/ "./src/middleware/error.middleware.ts":
/*!********************************************!*\
  !*** ./src/middleware/error.middleware.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.errorHandler = void 0;\r\nvar http_exception_1 = __webpack_require__(/*! ../common/http-exception */ \"./src/common/http-exception.ts\");\r\nexports.errorHandler = function (error, request, response, next) {\r\n    var status = error.statusCode || 500;\r\n    var message = error.message || \"It's not you. It's us. We are having some problems.\";\r\n    if (error instanceof http_exception_1.ValidationException) {\r\n        response.status(status).json({\r\n            status: \"validation error\",\r\n            statusCode: status,\r\n            message: message,\r\n            errors: error.errors,\r\n        });\r\n    }\r\n    else {\r\n        response.status(status).json({\r\n            status: \"error\",\r\n            statusCode: status,\r\n            message: message,\r\n        });\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/middleware/error.middleware.ts?");

/***/ }),

/***/ "./src/middleware/notFound.middleware.ts":
/*!***********************************************!*\
  !*** ./src/middleware/notFound.middleware.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.notFoundHandler = void 0;\r\nexports.notFoundHandler = function (request, response, next) {\r\n    var message = \"Resource not found\";\r\n    response.status(404).json({\r\n        status: 'error',\r\n        statusCode: 404,\r\n        message: message\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./src/middleware/notFound.middleware.ts?");

/***/ }),

/***/ "./src/modules/auth/authController.ts":
/*!********************************************!*\
  !*** ./src/modules/auth/authController.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.AuthController = void 0;\r\nvar registerUserUseCase_1 = __webpack_require__(/*! ./usecases/registerUserUseCase */ \"./src/modules/auth/usecases/registerUserUseCase.ts\");\r\nvar _1 = __webpack_require__(/*! . */ \"./src/modules/auth/index.ts\");\r\nvar core_1 = __webpack_require__(/*! @overnightjs/core */ \"@overnightjs/core\");\r\nvar users_1 = __webpack_require__(/*! ./models/users */ \"./src/modules/auth/models/users.ts\");\r\nvar error_formatter_1 = __webpack_require__(/*! ../../common/error-formatter */ \"./src/common/error-formatter.ts\");\r\nvar http_exception_1 = __importStar(__webpack_require__(/*! ../../common/http-exception */ \"./src/common/http-exception.ts\"));\r\nvar http_status_codes_1 = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\r\nvar AuthController = /** @class */ (function () {\r\n    function AuthController(registerUserUseCase, userLoginUserCase) {\r\n        this.registerUserUseCase = registerUserUseCase;\r\n        this.userLoginUserCase = _1.userLoginInUseCase;\r\n    }\r\n    AuthController.prototype.createClient = function (req, res, next) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var user, error, errors, createdUser, e_1;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        _a.trys.push([0, 2, , 3]);\r\n                        user = req.body.user;\r\n                        error = new users_1.UserModel(user).validateSync();\r\n                        if (error) {\r\n                            errors = error_formatter_1.formatMongooseValidationErrors(error.errors);\r\n                            return [2 /*return*/, next(new http_exception_1.ValidationException(errors))];\r\n                        }\r\n                        return [4 /*yield*/, _1.registerUserUseCase.registerClient(user)];\r\n                    case 1:\r\n                        createdUser = _a.sent();\r\n                        if (createdUser)\r\n                            return [2 /*return*/, res.status(http_status_codes_1.CREATED).json(JSON.parse(createdUser))];\r\n                        else\r\n                            return [2 /*return*/, next(new http_exception_1.default(http_status_codes_1.INTERNAL_SERVER_ERROR, 'Unknown Error'))];\r\n                        return [3 /*break*/, 3];\r\n                    case 2:\r\n                        e_1 = _a.sent();\r\n                        if (e_1 instanceof registerUserUseCase_1.EmailAlreadyExistsException) {\r\n                            return [2 /*return*/, next(new http_exception_1.default(http_status_codes_1.BAD_REQUEST, e_1.message))];\r\n                        }\r\n                        return [2 /*return*/, next(new http_exception_1.default(http_status_codes_1.INTERNAL_SERVER_ERROR, e_1.message))];\r\n                    case 3: return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    AuthController.prototype.login = function (req, res, next) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var _a, email, password, authUser, e_2;\r\n            return __generator(this, function (_b) {\r\n                switch (_b.label) {\r\n                    case 0:\r\n                        _b.trys.push([0, 2, , 3]);\r\n                        _a = req.body, email = _a.email, password = _a.password;\r\n                        return [4 /*yield*/, _1.userLoginInUseCase.loginUser(email, password)];\r\n                    case 1:\r\n                        authUser = _b.sent();\r\n                        return [2 /*return*/, res.status(http_status_codes_1.OK).json(authUser)];\r\n                    case 2:\r\n                        e_2 = _b.sent();\r\n                        console.log(e_2);\r\n                        return [2 /*return*/, next(new http_exception_1.default(http_status_codes_1.BAD_REQUEST, 'Bad login credentials'))];\r\n                    case 3: return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    __decorate([\r\n        core_1.Post(\"client/create\")\r\n    ], AuthController.prototype, \"createClient\", null);\r\n    __decorate([\r\n        core_1.Post(\"login\")\r\n    ], AuthController.prototype, \"login\", null);\r\n    AuthController = __decorate([\r\n        core_1.Controller(\"api/user/\")\r\n    ], AuthController);\r\n    return AuthController;\r\n}());\r\nexports.AuthController = AuthController;\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/authController.ts?");

/***/ }),

/***/ "./src/modules/auth/helpers/bcrypt.helper.ts":
/*!***************************************************!*\
  !*** ./src/modules/auth/helpers/bcrypt.helper.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.BcyrptPasswordHelper = void 0;\r\nvar bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\r\nvar saltRounds = 10;\r\nvar BcyrptPasswordHelper = /** @class */ (function () {\r\n    function BcyrptPasswordHelper() {\r\n    }\r\n    BcyrptPasswordHelper.prototype.hashPassword = function (password) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var hash;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, bcrypt_1.default.hash(password, saltRounds)];\r\n                    case 1:\r\n                        hash = _a.sent();\r\n                        return [2 /*return*/, hash];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    BcyrptPasswordHelper.prototype.comparePassword = function (plainPassword, hashedPassword) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var matched;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, bcrypt_1.default.compare(plainPassword, hashedPassword)];\r\n                    case 1:\r\n                        matched = _a.sent();\r\n                        return [2 /*return*/, matched];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return BcyrptPasswordHelper;\r\n}());\r\nexports.BcyrptPasswordHelper = BcyrptPasswordHelper;\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/helpers/bcrypt.helper.ts?");

/***/ }),

/***/ "./src/modules/auth/helpers/emails/validate-email.helper.ts":
/*!******************************************************************!*\
  !*** ./src/modules/auth/helpers/emails/validate-email.helper.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.ValidateEmailHelper = void 0;\r\nvar ValidateEmailHelper = /** @class */ (function () {\r\n    function ValidateEmailHelper() {\r\n    }\r\n    ValidateEmailHelper.prototype.sendUserValidationEmail = function (user) {\r\n    };\r\n    return ValidateEmailHelper;\r\n}());\r\nexports.ValidateEmailHelper = ValidateEmailHelper;\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/helpers/emails/validate-email.helper.ts?");

/***/ }),

/***/ "./src/modules/auth/helpers/jwt.helper.ts":
/*!************************************************!*\
  !*** ./src/modules/auth/helpers/jwt.helper.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.JwtHelper = void 0;\r\nvar jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\r\nvar JwtHelper = /** @class */ (function () {\r\n    function JwtHelper() {\r\n    }\r\n    JwtHelper.prototype.generateAccessToken = function (user) {\r\n        var tokenSecret = process.env.TOKEN_SECRET;\r\n        var tokenExpiryPeriod = process.env.TOKEN_EXPIRY_PERIOD;\r\n        var payload = {\r\n            userId: user._id,\r\n            email: user.email,\r\n            firstName: user.firstName,\r\n            lastName: user.lastName,\r\n            roles: user.roles\r\n        };\r\n        return jsonwebtoken_1.default.sign(payload, tokenSecret, { expiresIn: tokenExpiryPeriod });\r\n    };\r\n    return JwtHelper;\r\n}());\r\nexports.JwtHelper = JwtHelper;\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/helpers/jwt.helper.ts?");

/***/ }),

/***/ "./src/modules/auth/index.ts":
/*!***********************************!*\
  !*** ./src/modules/auth/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.authController = exports.userLoginInUseCase = exports.registerUserUseCase = void 0;\r\nvar registerUserUseCase_1 = __webpack_require__(/*! ./usecases/registerUserUseCase */ \"./src/modules/auth/usecases/registerUserUseCase.ts\");\r\nvar userRepository_1 = __webpack_require__(/*! ./repository/userRepository */ \"./src/modules/auth/repository/userRepository.ts\");\r\nvar validate_email_helper_1 = __webpack_require__(/*! ./helpers/emails/validate-email.helper */ \"./src/modules/auth/helpers/emails/validate-email.helper.ts\");\r\nvar bcrypt_helper_1 = __webpack_require__(/*! ./helpers/bcrypt.helper */ \"./src/modules/auth/helpers/bcrypt.helper.ts\");\r\nvar jwt_helper_1 = __webpack_require__(/*! ./helpers/jwt.helper */ \"./src/modules/auth/helpers/jwt.helper.ts\");\r\nvar userLoginUseCase_1 = __webpack_require__(/*! ./usecases/userLoginUseCase */ \"./src/modules/auth/usecases/userLoginUseCase.ts\");\r\nvar authController_1 = __webpack_require__(/*! ./authController */ \"./src/modules/auth/authController.ts\");\r\nvar userRepository = new userRepository_1.UserRepository();\r\nvar validateEmailHelper = new validate_email_helper_1.ValidateEmailHelper();\r\nvar bcryptPasswordHelper = new bcrypt_helper_1.BcyrptPasswordHelper();\r\nvar jwtHelper = new jwt_helper_1.JwtHelper();\r\nvar registerUserUseCase = new registerUserUseCase_1.RegisterUserUseCase(userRepository, bcryptPasswordHelper, validateEmailHelper);\r\nexports.registerUserUseCase = registerUserUseCase;\r\nvar userLoginInUseCase = new userLoginUseCase_1.UserLoginUseCase(userRepository, bcryptPasswordHelper, jwtHelper);\r\nexports.userLoginInUseCase = userLoginInUseCase;\r\nvar authController = new authController_1.AuthController(registerUserUseCase, userLoginInUseCase);\r\nexports.authController = authController;\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/index.ts?");

/***/ }),

/***/ "./src/modules/auth/middleware/auth.middleware.ts":
/*!********************************************************!*\
  !*** ./src/modules/auth/middleware/auth.middleware.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.hasRole = exports.isAuthenticated = void 0;\r\nvar jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\r\nvar http_status_codes_1 = __webpack_require__(/*! http-status-codes */ \"http-status-codes\");\r\nvar http_exception_1 = __importDefault(__webpack_require__(/*! ../../../common/http-exception */ \"./src/common/http-exception.ts\"));\r\nexports.isAuthenticated = function (request, response, next) {\r\n    // Gather the jwt access token from the request header\r\n    var authHeader = request.headers['authorization'];\r\n    var token = authHeader && authHeader.split(' ')[1];\r\n    if (token == null) {\r\n        return next(new http_exception_1.default(http_status_codes_1.UNAUTHORIZED, 'Un Authorized'));\r\n    }\r\n    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, function (err, user) {\r\n        console.log(err);\r\n        if (err) {\r\n            if (err.name == 'TokenExpiredError') {\r\n                return next(new http_exception_1.default(http_status_codes_1.UNAUTHORIZED, 'Token Expired '));\r\n            }\r\n            return next(new http_exception_1.default(http_status_codes_1.FORBIDDEN, 'Un Authorized'));\r\n        }\r\n        request.user = user;\r\n        next(); // pass the execution off to whatever request the client intended\r\n    });\r\n};\r\nexports.hasRole = function (role) {\r\n    var isAllowed = function (roles) { return roles.indexOf(role) > -1; };\r\n    return function (request, response, next) {\r\n        if (request.user && isAllowed(request.user.roles))\r\n            next(); // role is allowed, so continue on the next middleware\r\n        else {\r\n            // user is forbidden\r\n            next(new http_exception_1.default(http_status_codes_1.FORBIDDEN, 'Forbidden'));\r\n        }\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/middleware/auth.middleware.ts?");

/***/ }),

/***/ "./src/modules/auth/models/role.enum.ts":
/*!**********************************************!*\
  !*** ./src/modules/auth/models/role.enum.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.Roles = void 0;\r\nvar Roles;\r\n(function (Roles) {\r\n    Roles[\"CLIENT\"] = \"CLIENT\";\r\n    Roles[\"ADMIN\"] = \"ADMIN\";\r\n    Roles[\"SUPER_ADMIN\"] = \"SUPER_ADMIN\";\r\n})(Roles = exports.Roles || (exports.Roles = {}));\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/models/role.enum.ts?");

/***/ }),

/***/ "./src/modules/auth/models/users.ts":
/*!******************************************!*\
  !*** ./src/modules/auth/models/users.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.UserModel = void 0;\r\nvar mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar validator_1 = __importDefault(__webpack_require__(/*! validator */ \"validator\"));\r\nvar UserSchema = new mongoose_1.Schema({\r\n    firstName: {\r\n        type: String,\r\n        required: [true, 'First Name is required']\r\n    },\r\n    lastName: {\r\n        type: String,\r\n        required: [true, 'Last Name is required']\r\n    },\r\n    activated: {\r\n        type: Boolean,\r\n        default: false\r\n    },\r\n    email: {\r\n        type: String,\r\n        trim: true,\r\n        lowercase: true,\r\n        required: [true, 'Email is required'],\r\n        validate: {\r\n            validator: validator_1.default.isEmail, message: 'Email is invalid'\r\n        }\r\n    },\r\n    password: {\r\n        type: String,\r\n        required: [true, 'Password is required']\r\n    },\r\n    roles: [String]\r\n}, { timestamps: true });\r\nUserSchema.methods.toJSONAuth = function () {\r\n    var user = {\r\n        id: this._id,\r\n        firstName: this.firstName,\r\n        lastName: this.lastName,\r\n        email: this.email\r\n    };\r\n    return JSON.stringify(user);\r\n};\r\n// UserSchema.pre('save', function(next){\r\n//     this.$locals.password = hashPassword(this.$locals.password);\r\n//     next();\r\n// });\r\nexports.UserModel = mongoose_1.model('User', UserSchema);\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/models/users.ts?");

/***/ }),

/***/ "./src/modules/auth/repository/userRepository.ts":
/*!*******************************************************!*\
  !*** ./src/modules/auth/repository/userRepository.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.UserRepository = void 0;\r\nvar users_1 = __webpack_require__(/*! ../models/users */ \"./src/modules/auth/models/users.ts\");\r\nvar UserRepository = /** @class */ (function () {\r\n    function UserRepository() {\r\n    }\r\n    UserRepository.prototype.create = function (data) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, users_1.UserModel.create(data)];\r\n                    case 1: return [2 /*return*/, _a.sent()];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    UserRepository.prototype.findByEmail = function (email) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, users_1.UserModel.findOne({ 'email': email })];\r\n                    case 1: return [2 /*return*/, _a.sent()];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return UserRepository;\r\n}());\r\nexports.UserRepository = UserRepository;\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/repository/userRepository.ts?");

/***/ }),

/***/ "./src/modules/auth/usecases/registerUserUseCase.ts":
/*!**********************************************************!*\
  !*** ./src/modules/auth/usecases/registerUserUseCase.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.EmailAlreadyExistsException = exports.RegisterUserUseCase = void 0;\r\nvar role_enum_1 = __webpack_require__(/*! ../models/role.enum */ \"./src/modules/auth/models/role.enum.ts\");\r\nvar RegisterUserUseCase = /** @class */ (function () {\r\n    function RegisterUserUseCase(userRepository, bcryptPasswordHelper, validateEmailHelper) {\r\n        this.userRepository = userRepository;\r\n        this.bcryptPasswordHelper = bcryptPasswordHelper;\r\n        this.validateEmailHelper = validateEmailHelper;\r\n    }\r\n    RegisterUserUseCase.prototype.registerClient = function (userRequest) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var existingUser, clientRole, hashedPassword, user;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, this.userRepository.findByEmail(userRequest.email)];\r\n                    case 1:\r\n                        existingUser = _a.sent();\r\n                        if (existingUser) {\r\n                            throw new EmailAlreadyExistsException(\"Email \" + userRequest.email + \" already exists\");\r\n                        }\r\n                        clientRole = role_enum_1.Roles.CLIENT;\r\n                        userRequest.roles = [clientRole];\r\n                        return [4 /*yield*/, this.bcryptPasswordHelper.hashPassword(userRequest.password)];\r\n                    case 2:\r\n                        hashedPassword = _a.sent();\r\n                        userRequest.password = hashedPassword;\r\n                        return [4 /*yield*/, this.userRepository.create(userRequest)];\r\n                    case 3:\r\n                        user = _a.sent();\r\n                        if (user != null) {\r\n                            this.validateEmailHelper.sendUserValidationEmail(user);\r\n                        }\r\n                        return [2 /*return*/, user === null || user === void 0 ? void 0 : user.toJSONAuth()];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return RegisterUserUseCase;\r\n}());\r\nexports.RegisterUserUseCase = RegisterUserUseCase;\r\nvar EmailAlreadyExistsException = /** @class */ (function (_super) {\r\n    __extends(EmailAlreadyExistsException, _super);\r\n    function EmailAlreadyExistsException(message) {\r\n        return _super.call(this, message) || this;\r\n    }\r\n    return EmailAlreadyExistsException;\r\n}(Error));\r\nexports.EmailAlreadyExistsException = EmailAlreadyExistsException;\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/usecases/registerUserUseCase.ts?");

/***/ }),

/***/ "./src/modules/auth/usecases/userLoginUseCase.ts":
/*!*******************************************************!*\
  !*** ./src/modules/auth/usecases/userLoginUseCase.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.PasswordDoesNotMatchException = exports.UserNotFoundException = exports.UserLoginUseCase = void 0;\r\nvar UserLoginUseCase = /** @class */ (function () {\r\n    function UserLoginUseCase(userRepository, bcryptPasswordHelper, jwtHelper) {\r\n        this.userRepository = userRepository;\r\n        this.bcryptPasswordHelper = bcryptPasswordHelper;\r\n        this.jwtHelper = jwtHelper;\r\n    }\r\n    UserLoginUseCase.prototype.loginUser = function (email, password) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var user, matched, token, authUser;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, this.userRepository.findByEmail(email)];\r\n                    case 1:\r\n                        user = _a.sent();\r\n                        if (!user) {\r\n                            throw new UserNotFoundException(\"User with email \" + email + \"  Not Found\");\r\n                        }\r\n                        return [4 /*yield*/, this.bcryptPasswordHelper.comparePassword(password, user.password)];\r\n                    case 2:\r\n                        matched = _a.sent();\r\n                        if (!matched) {\r\n                            throw new PasswordDoesNotMatchException();\r\n                        }\r\n                        token = this.jwtHelper.generateAccessToken(user);\r\n                        authUser = {\r\n                            token: token,\r\n                            userId: user._id,\r\n                            firstName: user.firstName,\r\n                            lastName: user.lastName,\r\n                            email: user.email\r\n                        };\r\n                        return [2 /*return*/, authUser];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return UserLoginUseCase;\r\n}());\r\nexports.UserLoginUseCase = UserLoginUseCase;\r\nvar UserNotFoundException = /** @class */ (function (_super) {\r\n    __extends(UserNotFoundException, _super);\r\n    function UserNotFoundException(message) {\r\n        return _super.call(this, message) || this;\r\n    }\r\n    return UserNotFoundException;\r\n}(Error));\r\nexports.UserNotFoundException = UserNotFoundException;\r\nvar PasswordDoesNotMatchException = /** @class */ (function (_super) {\r\n    __extends(PasswordDoesNotMatchException, _super);\r\n    function PasswordDoesNotMatchException() {\r\n        return _super.call(this) || this;\r\n    }\r\n    return PasswordDoesNotMatchException;\r\n}(Error));\r\nexports.PasswordDoesNotMatchException = PasswordDoesNotMatchException;\r\n\n\n//# sourceURL=webpack:///./src/modules/auth/usecases/userLoginUseCase.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar core_1 = __webpack_require__(/*! @overnightjs/core */ \"@overnightjs/core\");\r\nvar error_middleware_1 = __webpack_require__(/*! ./middleware/error.middleware */ \"./src/middleware/error.middleware.ts\");\r\nvar notFound_middleware_1 = __webpack_require__(/*! ./middleware/notFound.middleware */ \"./src/middleware/notFound.middleware.ts\");\r\nvar items_1 = __webpack_require__(/*! ./items */ \"./src/items/index.ts\");\r\nvar mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nvar auth_1 = __webpack_require__(/*! ./modules/auth */ \"./src/modules/auth/index.ts\");\r\nvar AppServer = /** @class */ (function (_super) {\r\n    __extends(AppServer, _super);\r\n    function AppServer() {\r\n        var _this = _super.call(this, true) || this;\r\n        _this.app.use(helmet_1.default());\r\n        _this.app.use(cors_1.default());\r\n        _this.app.use(express_1.default.json());\r\n        _this.app.use(express_1.default.urlencoded({ extended: true }));\r\n        _this.setupControllers();\r\n        _this.setupDatabase();\r\n        _this.app.use(error_middleware_1.errorHandler);\r\n        _this.app.use(notFound_middleware_1.notFoundHandler);\r\n        return _this;\r\n    }\r\n    AppServer.prototype.setupControllers = function () {\r\n        _super.prototype.addControllers.call(this, [items_1.itemController, auth_1.authController]);\r\n    };\r\n    AppServer.prototype.setupDatabase = function () {\r\n        var mongoDBConnectionUrl = process.env.DB_URL;\r\n        mongoose_1.default.connect(mongoDBConnectionUrl, {\r\n            useNewUrlParser: true,\r\n            useUnifiedTopology: true,\r\n        });\r\n    };\r\n    /**** @param {Integer} port - Port which the server will listen.*/\r\n    AppServer.prototype.start = function (port) {\r\n        return this.app.listen(port, function () {\r\n            console.log(\"Listening on port \" + port);\r\n        });\r\n    };\r\n    return AppServer;\r\n}(core_1.Server));\r\nexports.default = AppServer;\r\n\n\n//# sourceURL=webpack:///./src/server.ts?");

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/index.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! ./src/index.ts */\"./src/index.ts\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "@overnightjs/core":
/*!************************************!*\
  !*** external "@overnightjs/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@overnightjs/core\");\n\n//# sourceURL=webpack:///external_%22@overnightjs/core%22?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http-status-codes":
/*!************************************!*\
  !*** external "http-status-codes" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-status-codes\");\n\n//# sourceURL=webpack:///external_%22http-status-codes%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"validator\");\n\n//# sourceURL=webpack:///external_%22validator%22?");

/***/ })

/******/ });