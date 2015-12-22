/*
  Copyright 2014 The Lovefield Project Authors. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
(function(){'use strict';var $jscomp = {scope:{}}, goog = goog || {};
goog.global = this;
goog.isDef = function(val) {
  return void 0 !== val;
};
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split("."), cur = opt_objectToExportTo || goog.global;
  parts[0] in cur || !cur.execScript || cur.execScript("var " + parts[0]);
  for (var part;parts.length && (part = parts.shift());) {
    !parts.length && goog.isDef(opt_object) ? cur[part] = opt_object : cur = cur[part] ? cur[part] : cur[part] = {};
  }
};
goog.define = function(name, defaultValue) {
  var value = defaultValue;
  goog.exportPath_(name, value);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(name) {
  goog.constructNamespace_(name);
};
goog.constructNamespace_ = function(name, opt_obj) {
  goog.exportPath_(name, opt_obj);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(name) {
  if (!goog.isString(name) || !name || -1 == name.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInModuleLoader_()) {
    throw Error("Module " + name + " has been loaded incorrectly.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = name;
};
goog.module.get = function(name) {
  return goog.module.getInternal_(name);
};
goog.module.getInternal_ = function() {
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return null != goog.moduleLoaderState_;
};
goog.module.declareTestMethods = function() {
  if (!goog.isInModuleLoader_()) {
    throw Error("goog.module.declareTestMethods must be called from within a goog.module");
  }
  goog.moduleLoaderState_.declareTestMethods = !0;
};
goog.module.declareLegacyNamespace = function() {
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(opt_message) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw opt_message = opt_message || "", Error("Importing test-only code into non-debug environment" + (opt_message ? ": " + opt_message : "."));
  }
};
goog.forwardDeclare = function() {
};
goog.getObjectByName = function(name, opt_obj) {
  for (var parts = name.split("."), cur = opt_obj || goog.global, part;part = parts.shift();) {
    if (goog.isDefAndNotNull(cur[part])) {
      cur = cur[part];
    } else {
      return null;
    }
  }
  return cur;
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global, x;
  for (x in obj) {
    global[x] = obj[x];
  }
};
goog.addDependency = function(relPath, provides, requires, opt_isModule) {
  if (goog.DEPENDENCIES_ENABLED) {
    for (var provide, require, path = relPath.replace(/\\/g, "/"), deps = goog.dependencies_, i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path, deps.pathIsModule[path] = !!opt_isModule;
    }
    for (var j = 0;require = requires[j];j++) {
      path in deps.requires || (deps.requires[path] = {}), deps.requires[path][require] = !0;
    }
  }
};
goog.useStrictRequires = !1;
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(msg) {
  goog.global.console && goog.global.console.error(msg);
};
goog.require = function() {
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor);
    return ctor.instance_ = new ctor;
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !1;
goog.DEPENDENCIES_ENABLED && (goog.included_ = {}, goog.dependencies_ = {pathIsModule:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}}, goog.inHtmlDocument_ = function() {
  var doc = goog.global.document;
  return "undefined" != typeof doc && "write" in doc;
}, goog.findBasePath_ = function() {
  if (goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else {
    if (goog.inHtmlDocument_()) {
      for (var doc = goog.global.document, scripts = doc.getElementsByTagName("SCRIPT"), i = scripts.length - 1;0 <= i;--i) {
        var script = scripts[i], src = script.src, qmark = src.lastIndexOf("?"), l = -1 == qmark ? src.length : qmark;
        if ("base.js" == src.substr(l - 7, 7)) {
          goog.basePath = src.substr(0, l - 7);
          break;
        }
      }
    }
  }
}, goog.importScript_ = function(src, opt_sourceText) {
  var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  importScript(src, opt_sourceText) && (goog.dependencies_.written[src] = !0);
}, goog.IS_OLD_IE_ = !goog.global.atob && goog.global.document && goog.global.document.all, goog.importModule_ = function(src) {
  var bootstrap = 'goog.retrieveAndExecModule_("' + src + '");';
  goog.importScript_("", bootstrap) && (goog.dependencies_.written[src] = !0);
}, goog.queuedModules_ = [], goog.wrapModule_ = function(srcUrl, scriptText) {
  return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(scriptText + "\n//# sourceURL=" + srcUrl + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + scriptText + "\n;return exports});\n//# sourceURL=" + srcUrl + "\n";
}, goog.loadQueuedModules_ = function() {
  var count = goog.queuedModules_.length;
  if (0 < count) {
    var queue = goog.queuedModules_;
    goog.queuedModules_ = [];
    for (var i = 0;i < count;i++) {
      var path = queue[i];
      goog.maybeProcessDeferredPath_(path);
    }
  }
}, goog.maybeProcessDeferredDep_ = function(name) {
  if (goog.isDeferredModule_(name) && goog.allDepsAreAvailable_(name)) {
    var path = goog.getPathFromDeps_(name);
    goog.maybeProcessDeferredPath_(goog.basePath + path);
  }
}, goog.isDeferredModule_ = function(name) {
  var path = goog.getPathFromDeps_(name);
  if (path && goog.dependencies_.pathIsModule[path]) {
    var abspath = goog.basePath + path;
    return abspath in goog.dependencies_.deferred;
  }
  return !1;
}, goog.allDepsAreAvailable_ = function(name) {
  var path = goog.getPathFromDeps_(name);
  if (path && path in goog.dependencies_.requires) {
    for (var requireName in goog.dependencies_.requires[path]) {
      if (!goog.isProvided_(requireName) && !goog.isDeferredModule_(requireName)) {
        return !1;
      }
    }
  }
  return !0;
}, goog.maybeProcessDeferredPath_ = function(abspath) {
  if (abspath in goog.dependencies_.deferred) {
    var src = goog.dependencies_.deferred[abspath];
    delete goog.dependencies_.deferred[abspath];
    goog.globalEval(src);
  }
}, goog.loadModule = function(moduleDef) {
  var previousState = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:void 0, declareTestMethods:!1};
    var exports;
    if (goog.isFunction(moduleDef)) {
      exports = moduleDef.call(goog.global, {});
    } else {
      if (goog.isString(moduleDef)) {
        exports = goog.loadModuleFromSource_.call(goog.global, moduleDef);
      } else {
        throw Error("Invalid module definition");
      }
    }
    var moduleName = goog.moduleLoaderState_.moduleName;
    if (!goog.isString(moduleName) || !moduleName) {
      throw Error('Invalid module name "' + moduleName + '"');
    }
    goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(moduleName, exports) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(exports);
    goog.loadedModules_[moduleName] = exports;
    if (goog.moduleLoaderState_.declareTestMethods) {
      for (var entry in exports) {
        if (0 === entry.indexOf("test", 0) || "tearDown" == entry || "setUp" == entry || "setUpPage" == entry || "tearDownPage" == entry) {
          goog.global[entry] = exports[entry];
        }
      }
    }
  } finally {
    goog.moduleLoaderState_ = previousState;
  }
}, goog.loadModuleFromSource_ = function(source) {
  var exports = {};
  eval(source);
  return exports;
}, goog.writeScriptSrcNode_ = function(src) {
  goog.global.document.write('<script type="text/javascript" src="' + src + '">\x3c/script>');
}, goog.appendScriptSrcNode_ = function(src) {
  var doc = goog.global.document, scriptEl = doc.createElement("script");
  scriptEl.type = "text/javascript";
  scriptEl.src = src;
  scriptEl.defer = !1;
  scriptEl.async = !1;
  doc.head.appendChild(scriptEl);
}, goog.writeScriptTag_ = function(src, opt_sourceText) {
  if (goog.inHtmlDocument_()) {
    var doc = goog.global.document;
    if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == doc.readyState) {
      var isDeps = /\bdeps.js$/.test(src);
      if (isDeps) {
        return !1;
      }
      throw Error('Cannot write "' + src + '" after document load');
    }
    var isOldIE = goog.IS_OLD_IE_;
    if (void 0 === opt_sourceText) {
      if (isOldIE) {
        var state = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
        doc.write('<script type="text/javascript" src="' + src + '"' + state + ">\x3c/script>");
      } else {
        goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(src) : goog.writeScriptSrcNode_(src);
      }
    } else {
      doc.write('<script type="text/javascript">' + opt_sourceText + "\x3c/script>");
    }
    return !0;
  }
  return !1;
}, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(script, scriptIndex) {
  "complete" == script.readyState && goog.lastNonModuleScriptIndex_ == scriptIndex && goog.loadQueuedModules_();
  return !0;
}, goog.writeScripts_ = function() {
  function visitNode(path) {
    if (!(path in deps.written)) {
      if (!(path in deps.visited) && (deps.visited[path] = !0, path in deps.requires)) {
        for (var requireName in deps.requires[path]) {
          if (!goog.isProvided_(requireName)) {
            if (requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName]);
            } else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      path in seenScript || (seenScript[path] = !0, scripts.push(path));
    }
  }
  var scripts = [], seenScript = {}, deps = goog.dependencies_, path$$0;
  for (path$$0 in goog.included_) {
    deps.written[path$$0] || visitNode(path$$0);
  }
  for (var i = 0;i < scripts.length;i++) {
    path$$0 = scripts[i], goog.dependencies_.written[path$$0] = !0;
  }
  var moduleState = goog.moduleLoaderState_;
  goog.moduleLoaderState_ = null;
  for (i = 0;i < scripts.length;i++) {
    if (path$$0 = scripts[i]) {
      deps.pathIsModule[path$$0] ? goog.importModule_(goog.basePath + path$$0) : goog.importScript_(goog.basePath + path$$0);
    } else {
      throw goog.moduleLoaderState_ = moduleState, Error("Undefined script input");
    }
  }
  goog.moduleLoaderState_ = moduleState;
}, goog.getPathFromDeps_ = function(rule) {
  return rule in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[rule] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.normalizePath_ = function(path) {
  for (var components = path.split("/"), i = 0;i < components.length;) {
    "." == components[i] ? components.splice(i, 1) : i && ".." == components[i] && components[i - 1] && ".." != components[i - 1] ? components.splice(--i, 2) : i++;
  }
  return components.join("/");
};
goog.loadFileSync_ = function(src) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(src);
  }
  var xhr = new goog.global.XMLHttpRequest;
  xhr.open("get", src, !1);
  xhr.send();
  return xhr.responseText;
};
goog.retrieveAndExecModule_ = function() {
};
goog.typeOf = function(value) {
  var s = typeof value;
  if ("object" == s) {
    if (value) {
      if (value instanceof Array) {
        return "array";
      }
      if (value instanceof Object) {
        return s;
      }
      var className = Object.prototype.toString.call(value);
      if ("[object Window]" == className) {
        return "object";
      }
      if ("[object Array]" == className || "number" == typeof value.length && "undefined" != typeof value.splice && "undefined" != typeof value.propertyIsEnumerable && !value.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == className || "undefined" != typeof value.call && "undefined" != typeof value.propertyIsEnumerable && !value.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == s && "undefined" == typeof value.call) {
      return "object";
    }
  }
  return s;
};
goog.isNull = function(val) {
  return null === val;
};
goog.isDefAndNotNull = function(val) {
  return null != val;
};
goog.isArray = function(val) {
  return "array" == goog.typeOf(val);
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return "array" == type || "object" == type && "number" == typeof val.length;
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && "function" == typeof val.getFullYear;
};
goog.isString = function(val) {
  return "string" == typeof val;
};
goog.isBoolean = function(val) {
  return "boolean" == typeof val;
};
goog.isNumber = function(val) {
  return "number" == typeof val;
};
goog.isFunction = function(val) {
  return "function" == goog.typeOf(val);
};
goog.isObject = function(val) {
  var type = typeof val;
  return "object" == type && null != val || "function" == type;
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(obj) {
  return !!obj[goog.UID_PROPERTY_];
};
goog.removeUid = function(obj) {
  "removeAttribute" in obj && obj.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete obj[goog.UID_PROPERTY_];
  } catch (ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if ("object" == type || "array" == type) {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = "array" == type ? [] : {}, key;
    for (key in obj) {
      clone[key] = goog.cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments);
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if (!fn) {
    throw Error();
  }
  if (2 < arguments.length) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };
  }
  return function() {
    return fn.apply(selfObj, arguments);
  };
};
goog.bind = function(fn, selfObj, var_args) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs);
  };
};
goog.mixin = function(target, source) {
  for (var x in source) {
    target[x] = source[x];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return +new Date;
};
goog.globalEval = function(script) {
  if (goog.global.execScript) {
    goog.global.execScript(script, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_) {
        if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
          try {
            delete goog.global._evalTest_;
          } catch (ignore) {
          }
          goog.evalWorksForGlobals_ = !0;
        } else {
          goog.evalWorksForGlobals_ = !1;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval(script);
      } else {
        var doc = goog.global.document, scriptElt = doc.createElement("SCRIPT");
        scriptElt.type = "text/javascript";
        scriptElt.defer = !1;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName;
  }, renameByParts = function(cssName) {
    for (var parts = cssName.split("-"), mapped = [], i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]));
    }
    return mapped.join("-");
  }, rename;
  rename = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? getMapping : renameByParts : function(a) {
    return a;
  };
  return opt_modifier ? className + "-" + rename(opt_modifier) : rename(className);
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style;
};
goog.getMsg = function(str, opt_values) {
  opt_values && (str = str.replace(/\{\$([^}]+)}/g, function(match, key) {
    return key in opt_values ? opt_values[key] : match;
  }));
  return str;
};
goog.getMsgWithFallback = function(a) {
  return a;
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo);
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol;
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor;
  childCtor.base = function(me, methodName, var_args) {
    for (var args = Array(arguments.length - 2), i = 2;i < arguments.length;i++) {
      args[i - 2] = arguments[i];
    }
    return parentCtor.prototype[methodName].apply(me, args);
  };
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !caller) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (caller.superClass_) {
    for (var ctorArgs = Array(arguments.length - 1), i = 1;i < arguments.length;i++) {
      ctorArgs[i - 1] = arguments[i];
    }
    return caller.superClass_.constructor.apply(me, ctorArgs);
  }
  for (var args = Array(arguments.length - 2), i = 2;i < arguments.length;i++) {
    args[i - 2] = arguments[i];
  }
  for (var foundCaller = !1, ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = !0;
    } else {
      if (foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args);
      }
    }
  }
  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(fn) {
  fn.call(goog.global);
};
goog.MODIFY_FUNCTION_PROTOTYPES = !1;
goog.defineClass = function(superClass, def) {
  var constructor = def.constructor, statics = def.statics;
  constructor && constructor != Object.prototype.constructor || (constructor = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  var cls = goog.defineClass.createSealingConstructor_(constructor, superClass);
  superClass && goog.inherits(cls, superClass);
  delete def.constructor;
  delete def.statics;
  goog.defineClass.applyProperties_(cls.prototype, def);
  null != statics && (statics instanceof Function ? statics(cls) : goog.defineClass.applyProperties_(cls, statics));
  return cls;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(ctr, superClass) {
  if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
    if (superClass && superClass.prototype && superClass.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) {
      return ctr;
    }
    var wrappedCtr = function() {
      var instance = ctr.apply(this, arguments) || this;
      instance[goog.UID_PROPERTY_] = instance[goog.UID_PROPERTY_];
      this.constructor === wrappedCtr && Object.seal(instance);
      return instance;
    };
    return wrappedCtr;
  }
  return ctr;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(target, source) {
  for (var key in source) {
    Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
  }
  for (var i = 0;i < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;i++) {
    key = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[i], Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
  }
};
goog.tagUnsealableClass = function() {
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.debug = {};
goog.debug.Error = function(opt_msg) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var stack = Error().stack;
    stack && (this.stack = stack);
  }
  opt_msg && (this.message = String(opt_msg));
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return 0 == str.lastIndexOf(prefix, 0);
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return 0 <= l && str.indexOf(suffix, l) == l;
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return 0 == goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length));
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return 0 == goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length));
};
goog.string.caseInsensitiveEquals = function(str1, str2) {
  return str1.toLowerCase() == str2.toLowerCase();
};
goog.string.subs = function(str, var_args) {
  for (var splitParts = str.split("%s"), returnString = "", subsArguments = Array.prototype.slice.call(arguments, 1);subsArguments.length && 1 < splitParts.length;) {
    returnString += splitParts.shift() + subsArguments.shift();
  }
  return returnString + splitParts.join("%s");
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(str) {
  return /^[\s\xa0]*$/.test(str);
};
goog.string.isEmptyString = function(str) {
  return 0 == str.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(str) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(str));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(str) {
  return !/[^\t\n\r ]/.test(str);
};
goog.string.isAlpha = function(str) {
  return !/[^a-zA-Z]/.test(str);
};
goog.string.isNumeric = function(str) {
  return !/[^0-9]/.test(str);
};
goog.string.isAlphaNumeric = function(str) {
  return !/[^a-zA-Z0-9]/.test(str);
};
goog.string.isSpace = function(ch) {
  return " " == ch;
};
goog.string.isUnicodeChar = function(ch) {
  return 1 == ch.length && " " <= ch && "~" >= ch || "\u0080" <= ch && "\ufffd" >= ch;
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(str) {
  return str.trim();
} : function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase(), test2 = String(str2).toLowerCase();
  return test1 < test2 ? -1 : test1 == test2 ? 0 : 1;
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if (str1 == str2) {
    return 0;
  }
  if (!str1) {
    return -1;
  }
  if (!str2) {
    return 1;
  }
  for (var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_), tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_), count = Math.min(tokens1.length, tokens2.length), i = 0;i < count;i++) {
    var a = tokens1[i], b = tokens2[i];
    if (a != b) {
      var num1 = parseInt(a, 10);
      if (!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if (!isNaN(num2) && num1 - num2) {
          return num1 - num2;
        }
      }
      return a < b ? -1 : 1;
    }
  }
  return tokens1.length != tokens2.length ? tokens1.length - tokens2.length : str1 < str2 ? -1 : 1;
};
goog.string.urlEncode = function(str) {
  return encodeURIComponent(String(str));
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if (opt_isLikelyToContainHtmlChars) {
    str = str.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (str = str.replace(goog.string.E_RE_, "&#101;"));
  } else {
    if (!goog.string.ALL_RE_.test(str)) {
      return str;
    }
    -1 != str.indexOf("&") && (str = str.replace(goog.string.AMP_RE_, "&amp;"));
    -1 != str.indexOf("<") && (str = str.replace(goog.string.LT_RE_, "&lt;"));
    -1 != str.indexOf(">") && (str = str.replace(goog.string.GT_RE_, "&gt;"));
    -1 != str.indexOf('"') && (str = str.replace(goog.string.QUOT_RE_, "&quot;"));
    -1 != str.indexOf("'") && (str = str.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
    -1 != str.indexOf("\x00") && (str = str.replace(goog.string.NULL_RE_, "&#0;"));
    goog.string.DETECT_DOUBLE_ESCAPING && -1 != str.indexOf("e") && (str = str.replace(goog.string.E_RE_, "&#101;"));
  }
  return str;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(str) {
  return goog.string.contains(str, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(str) : goog.string.unescapePureXmlEntities_(str) : str;
};
goog.string.unescapeEntitiesWithDocument = function(str, document) {
  return goog.string.contains(str, "&") ? goog.string.unescapeEntitiesUsingDom_(str, document) : str;
};
goog.string.unescapeEntitiesUsingDom_ = function(str, opt_document) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, div;
  div = opt_document ? opt_document.createElement("div") : goog.global.document.createElement("div");
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if (value) {
      return value;
    }
    if ("#" == entity.charAt(0)) {
      var n = Number("0" + entity.substr(1));
      isNaN(n) || (value = String.fromCharCode(n));
    }
    value || (div.innerHTML = s + " ", value = div.firstChild.nodeValue.slice(0, -1));
    return seen[s] = value;
  });
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        if ("#" == entity.charAt(0)) {
          var n = Number("0" + entity.substr(1));
          if (!isNaN(n)) {
            return String.fromCharCode(n);
          }
        }
        return s;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml);
};
goog.string.preserveSpaces = function(str) {
  return str.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(str, quoteChars) {
  for (var length = quoteChars.length, i = 0;i < length;i++) {
    var quoteChar = 1 == length ? quoteChars : quoteChars.charAt(i);
    if (str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1);
    }
  }
  return str;
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  opt_protectEscapedCharacters && (str = goog.string.unescapeEntities(str));
  str.length > chars && (str = str.substring(0, chars - 3) + "...");
  opt_protectEscapedCharacters && (str = goog.string.htmlEscape(str));
  return str;
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  opt_protectEscapedCharacters && (str = goog.string.unescapeEntities(str));
  if (opt_trailingChars && str.length > chars) {
    opt_trailingChars > chars && (opt_trailingChars = chars);
    var endPoint = str.length - opt_trailingChars, startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint);
  } else {
    if (str.length > chars) {
      var half = Math.floor(chars / 2), endPos = str.length - half, half = half + chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos);
    }
  }
  opt_protectEscapedCharacters && (str = goog.string.htmlEscape(str));
  return str;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  if (s.quote) {
    return s.quote();
  }
  for (var sb = ['"'], i = 0;i < s.length;i++) {
    var ch = s.charAt(i), cc = ch.charCodeAt(0);
    sb[i + 1] = goog.string.specialEscapeChars_[ch] || (31 < cc && 127 > cc ? ch : goog.string.escapeChar(ch));
  }
  sb.push('"');
  return sb.join("");
};
goog.string.escapeString = function(str) {
  for (var sb = [], i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i));
  }
  return sb.join("");
};
goog.string.escapeChar = function(c) {
  if (c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c];
  }
  if (c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c];
  }
  var rv = c, cc = c.charCodeAt(0);
  if (31 < cc && 127 > cc) {
    rv = c;
  } else {
    if (256 > cc) {
      if (rv = "\\x", 16 > cc || 256 < cc) {
        rv += "0";
      }
    } else {
      rv = "\\u", 4096 > cc && (rv += "0");
    }
    rv += cc.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[c] = rv;
};
goog.string.contains = function(str, subString) {
  return -1 != str.indexOf(subString);
};
goog.string.caseInsensitiveContains = function(str, subString) {
  return goog.string.contains(str.toLowerCase(), subString.toLowerCase());
};
goog.string.countOf = function(s, ss) {
  return s && ss ? s.split(ss).length - 1 : 0;
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  0 <= index && index < s.length && 0 < stringLength && (resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength));
  return resultStr;
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "");
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "");
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = function(string, length) {
  return Array(length + 1).join(string);
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num), index = s.indexOf(".");
  -1 == index && (index = s.length);
  return goog.string.repeat("0", Math.max(0, length - index)) + s;
};
goog.string.makeSafe = function(obj) {
  return null == obj ? "" : String(obj);
};
goog.string.buildString = function(var_args) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(version1, version2) {
  for (var order = 0, v1Subs = goog.string.trim(String(version1)).split("."), v2Subs = goog.string.trim(String(version2)).split("."), subCount = Math.max(v1Subs.length, v2Subs.length), subIdx = 0;0 == order && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "", v2Sub = v2Subs[subIdx] || "", v1CompParser = /(\d*)(\D*)/g, v2CompParser = /(\d*)(\D*)/g;
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""], v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if (0 == v1Comp[0].length && 0 == v2Comp[0].length) {
        break;
      }
      var v1CompNum = 0 == v1Comp[1].length ? 0 : parseInt(v1Comp[1], 10), v2CompNum = 0 == v2Comp[1].length ? 0 : parseInt(v2Comp[1], 10), order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(0 == v1Comp[2].length, 0 == v2Comp[2].length) || goog.string.compareElements_(v1Comp[2], v2Comp[2]);
    } while (0 == order);
  }
  return order;
};
goog.string.compareElements_ = function(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  for (var result = 0, i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i), result %= goog.string.HASHCODE_MAX_;
  }
  return result;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  return 0 == num && goog.string.isEmptyOrWhitespace(str) ? NaN : num;
};
goog.string.isLowerCamelCase = function(str) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(str);
};
goog.string.isUpperCamelCase = function(str) {
  return /^([A-Z][a-z]*)+$/.test(str);
};
goog.string.toCamelCase = function(str) {
  return String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase();
  });
};
goog.string.toSelectorCase = function(str) {
  return String(str).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(str, opt_delimiters) {
  var delimiters = goog.isString(opt_delimiters) ? goog.string.regExpEscape(opt_delimiters) : "\\s", delimiters = delimiters ? "|[" + delimiters + "]+" : "", regexp = new RegExp("(^" + delimiters + ")([a-z])", "g");
  return str.replace(regexp, function(all, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};
goog.string.capitalize = function(str) {
  return String(str.charAt(0)).toUpperCase() + String(str.substr(1)).toLowerCase();
};
goog.string.parseInt = function(value) {
  isFinite(value) && (value = String(value));
  return goog.isString(value) ? /^\s*-?0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10) : NaN;
};
goog.string.splitLimit = function(str, separator, limit) {
  for (var parts = str.split(separator), returnVal = [];0 < limit && parts.length;) {
    returnVal.push(parts.shift()), limit--;
  }
  parts.length && returnVal.push(parts.join(separator));
  return returnVal;
};
goog.string.editDistance = function(a, b) {
  var v0 = [], v1 = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (var i = 0;i < b.length + 1;i++) {
    v0[i] = i;
  }
  for (i = 0;i < a.length;i++) {
    v1[0] = i + 1;
    for (var j = 0;j < b.length;j++) {
      var cost = a[i] != b[j];
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (j = 0;j < v0.length;j++) {
      v0[j] = v1[j];
    }
  }
  return v1[b.length];
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(e) {
  throw e;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if (givenMessage) {
    var message = message + (": " + givenMessage), args = givenArgs
  } else {
    defaultMessage && (message += ": " + defaultMessage, args = defaultArgs);
  }
  var e = new goog.asserts.AssertionError("" + message, args || []);
  goog.asserts.errorHandler_(e);
};
goog.asserts.setErrorHandler = function(errorHandler) {
  goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = errorHandler);
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !condition && goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2));
  return condition;
};
goog.asserts.fail = function(opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(value) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(value) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(value) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertElement = function(value, opt_message, var_args) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject(value) && value.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  !goog.asserts.ENABLE_ASSERTS || value instanceof type || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(type), goog.asserts.getType_(value)], opt_message, Array.prototype.slice.call(arguments, 3));
  return value;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var key in Object.prototype) {
    goog.asserts.fail(key + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function(value) {
  return value instanceof Function ? value.displayName || value.name || "unknown type name" : value instanceof Object ? value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value) : null === value ? "null" : typeof value;
};
goog.async = {};
goog.async.FreeList = function(create, reset, limit) {
  this.limit_ = limit;
  this.create_ = create;
  this.reset_ = reset;
  this.occupants_ = 0;
  this.head_ = null;
};
goog.async.FreeList.prototype.get = function() {
  var item;
  0 < this.occupants_ ? (this.occupants_--, item = this.head_, this.head_ = item.next, item.next = null) : item = this.create_();
  return item;
};
goog.async.FreeList.prototype.put = function(item) {
  this.reset_(item);
  this.occupants_ < this.limit_ && (this.occupants_++, item.next = this.head_, this.head_ = item);
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function(callback) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = callback;
  if (goog.debug.entryPointRegistry.monitorsMayExist_) {
    for (var monitors = goog.debug.entryPointRegistry.monitors_, i = 0;i < monitors.length;i++) {
      callback(goog.bind(monitors[i].wrap, monitors[i]));
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function(monitor) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
  for (var transformer = goog.bind(monitor.wrap, monitor), i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  goog.debug.entryPointRegistry.monitors_.push(monitor);
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(monitor) {
  var monitors = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(monitor == monitors[monitors.length - 1], "Only the most recent monitor can be unwrapped.");
  for (var transformer = goog.bind(monitor.unwrap, monitor), i = 0;i < goog.debug.entryPointRegistry.refList_.length;i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  monitors.length--;
};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", ARTICLE:"ARTICLE", ASIDE:"ASIDE", AUDIO:"AUDIO", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDI:"BDI", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", COMMAND:"COMMAND", DATA:"DATA", DATALIST:"DATALIST", DD:"DD", DEL:"DEL", DETAILS:"DETAILS", DFN:"DFN", 
DIALOG:"DIALOG", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", EMBED:"EMBED", FIELDSET:"FIELDSET", FIGCAPTION:"FIGCAPTION", FIGURE:"FIGURE", FONT:"FONT", FOOTER:"FOOTER", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HEADER:"HEADER", HGROUP:"HGROUP", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", KEYGEN:"KEYGEN", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", 
MAP:"MAP", MARK:"MARK", MATH:"MATH", MENU:"MENU", META:"META", METER:"METER", NAV:"NAV", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", OUTPUT:"OUTPUT", P:"P", PARAM:"PARAM", PRE:"PRE", PROGRESS:"PROGRESS", Q:"Q", RP:"RP", RT:"RT", RUBY:"RUBY", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SECTION:"SECTION", SELECT:"SELECT", SMALL:"SMALL", SOURCE:"SOURCE", SPAN:"SPAN", STRIKE:"STRIKE", STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUMMARY:"SUMMARY", 
SUP:"SUP", SVG:"SVG", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEMPLATE:"TEMPLATE", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TIME:"TIME", TITLE:"TITLE", TR:"TR", TRACK:"TRACK", TT:"TT", U:"U", UL:"UL", VAR:"VAR", VIDEO:"VIDEO", WBR:"WBR"};
goog.functions = {};
goog.functions.constant = function(retValue) {
  return function() {
    return retValue;
  };
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(opt_returnValue) {
  return opt_returnValue;
};
goog.functions.error = function(message) {
  return function() {
    throw Error(message);
  };
};
goog.functions.fail = function(err) {
  return function() {
    throw err;
  };
};
goog.functions.lock = function(f, opt_numArgs) {
  opt_numArgs = opt_numArgs || 0;
  return function() {
    return f.apply(this, Array.prototype.slice.call(arguments, 0, opt_numArgs));
  };
};
goog.functions.nth = function(n) {
  return function() {
    return arguments[n];
  };
};
goog.functions.withReturnValue = function(f, retValue) {
  return goog.functions.sequence(f, goog.functions.constant(retValue));
};
goog.functions.equalTo = function(value, opt_useLooseComparison) {
  return function(other) {
    return opt_useLooseComparison ? value == other : value === other;
  };
};
goog.functions.compose = function(fn, var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    var result;
    length && (result = functions[length - 1].apply(this, arguments));
    for (var i = length - 2;0 <= i;i--) {
      result = functions[i].call(this, result);
    }
    return result;
  };
};
goog.functions.sequence = function(var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    for (var result, i = 0;i < length;i++) {
      result = functions[i].apply(this, arguments);
    }
    return result;
  };
};
goog.functions.and = function(var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    for (var i = 0;i < length;i++) {
      if (!functions[i].apply(this, arguments)) {
        return !1;
      }
    }
    return !0;
  };
};
goog.functions.or = function(var_args) {
  var functions = arguments, length = functions.length;
  return function() {
    for (var i = 0;i < length;i++) {
      if (functions[i].apply(this, arguments)) {
        return !0;
      }
    }
    return !1;
  };
};
goog.functions.not = function(f) {
  return function() {
    return !f.apply(this, arguments);
  };
};
goog.functions.create = function(constructor, var_args) {
  var temp = function() {
  };
  temp.prototype = constructor.prototype;
  var obj = new temp;
  constructor.apply(obj, Array.prototype.slice.call(arguments, 1));
  return obj;
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function(fn) {
  var called = !1, value;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return fn();
    }
    called || (value = fn(), called = !0);
    return value;
  };
};
goog.functions.once = function(f) {
  var inner = f;
  return function() {
    if (inner) {
      var tmp = inner;
      inner = null;
      tmp();
    }
  };
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(array) {
  return array[array.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.indexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = null == opt_fromIndex ? 0 : 0 > opt_fromIndex ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if (goog.isString(arr)) {
    return goog.isString(obj) && 1 == obj.length ? arr.indexOf(obj, fromIndex) : -1;
  }
  for (var i = fromIndex;i < arr.length;i++) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.lastIndexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(null != arr.length);
  var fromIndex = null == opt_fromIndex ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = null == opt_fromIndex ? arr.length - 1 : opt_fromIndex;
  0 > fromIndex && (fromIndex = Math.max(0, arr.length + fromIndex));
  if (goog.isString(arr)) {
    return goog.isString(obj) && 1 == obj.length ? arr.lastIndexOf(obj, fromIndex) : -1;
  }
  for (var i = fromIndex;0 <= i;i--) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.forEach) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    i in arr2 && f.call(opt_obj, arr2[i], i, arr);
  }
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = l - 1;0 <= i;--i) {
    i in arr2 && f.call(opt_obj, arr2[i], i, arr);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.filter) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, res = [], resLength = 0, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2) {
      var val = arr2[i];
      f.call(opt_obj, val, i, arr) && (res[resLength++] = val);
    }
  }
  return res;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.map) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, res = Array(l), arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    i in arr2 && (res[i] = f.call(opt_obj, arr2[i], i, arr));
  }
  return res;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduce) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(null != arr.length);
  opt_obj && (f = goog.bind(f, opt_obj));
  return goog.array.ARRAY_PROTOTYPE_.reduce.call(arr, f, val);
} : function(arr, f, val$$0, opt_obj) {
  var rval = val$$0;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduceRight) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(null != arr.length);
  opt_obj && (f = goog.bind(f, opt_obj));
  return goog.array.ARRAY_PROTOTYPE_.reduceRight.call(arr, f, val);
} : function(arr, f, val$$0, opt_obj) {
  var rval = val$$0;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.some) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return !0;
    }
  }
  return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.every) ? function(arr, f, opt_obj) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return !1;
    }
  }
  return !0;
};
goog.array.count = function(arr$$0, f, opt_obj) {
  var count = 0;
  goog.array.forEach(arr$$0, function(element, index, arr) {
    f.call(opt_obj, element, index, arr) && ++count;
  }, opt_obj);
  return count;
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return 0 > i ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndex = function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = 0;i < l;i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return -1;
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return 0 > i ? null : goog.isString(arr) ? arr.charAt(i) : arr[i];
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = goog.isString(arr) ? arr.split("") : arr, i = l - 1;0 <= i;i--) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return -1;
};
goog.array.contains = function(arr, obj) {
  return 0 <= goog.array.indexOf(arr, obj);
};
goog.array.isEmpty = function(arr) {
  return 0 == arr.length;
};
goog.array.clear = function(arr) {
  if (!goog.isArray(arr)) {
    for (var i = arr.length - 1;0 <= i;i--) {
      delete arr[i];
    }
  }
  arr.length = 0;
};
goog.array.insert = function(arr, obj) {
  goog.array.contains(arr, obj) || arr.push(obj);
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj);
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd);
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  2 == arguments.length || 0 > (i = goog.array.indexOf(arr, opt_obj2)) ? arr.push(obj) : goog.array.insertAt(arr, obj, i);
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj), rv;
  (rv = 0 <= i) && goog.array.removeAt(arr, i);
  return rv;
};
goog.array.removeAt = function(arr, i) {
  goog.asserts.assert(null != arr.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length;
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return 0 <= i ? (goog.array.removeAt(arr, i), !0) : !1;
};
goog.array.removeAllIf = function(arr, f, opt_obj) {
  var removedCount = 0;
  goog.array.forEachRight(arr, function(val, index) {
    f.call(opt_obj, val, index, arr) && goog.array.removeAt(arr, index) && removedCount++;
  });
  return removedCount;
};
goog.array.concat = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.join = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.toArray = function(object) {
  var length = object.length;
  if (0 < length) {
    for (var rv = Array(length), i = 0;i < length;i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(arr1, var_args) {
  for (var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    if (goog.isArrayLike(arr2)) {
      var len1 = arr1.length || 0, len2 = arr2.length || 0;
      arr1.length = len1 + len2;
      for (var j = 0;j < len2;j++) {
        arr1[len1 + j] = arr2[j];
      }
    } else {
      arr1.push(arr2);
    }
  }
};
goog.array.splice = function(arr, index, howMany, var_args) {
  goog.asserts.assert(null != arr.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1));
};
goog.array.slice = function(arr, start, opt_end) {
  goog.asserts.assert(null != arr.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start) : goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end);
};
goog.array.removeDuplicates = function(arr, opt_rv, opt_hashFn) {
  for (var returnArray = opt_rv || arr, defaultHashFn = function(item) {
    return goog.isObject(item) ? "o" + goog.getUid(item) : (typeof item).charAt(0) + item;
  }, hashFn = opt_hashFn || defaultHashFn, seen = {}, cursorInsert = 0, cursorRead = 0;cursorRead < arr.length;) {
    var current = arr[cursorRead++], key = hashFn(current);
    Object.prototype.hasOwnProperty.call(seen, key) || (seen[key] = !0, returnArray[cursorInsert++] = current);
  }
  returnArray.length = cursorInsert;
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, !1, target);
};
goog.array.binarySelect = function(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, !0, void 0, opt_obj);
};
goog.array.binarySearch_ = function(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  for (var left = 0, right = arr.length, found;left < right;) {
    var middle = left + right >> 1, compareResult;
    compareResult = isEvaluator ? compareFn.call(opt_selfObj, arr[middle], middle, arr) : compareFn(opt_target, arr[middle]);
    0 < compareResult ? left = middle + 1 : (right = middle, found = !compareResult);
  }
  return found ? left : ~left;
};
goog.array.sort = function(arr, opt_compareFn) {
  arr.sort(opt_compareFn || goog.array.defaultCompare);
};
goog.array.stableSort = function(arr, opt_compareFn) {
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index;
  }
  for (var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]};
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, stableCompareFn);
  for (i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value;
  }
};
goog.array.sortByKey = function(arr, keyFn, opt_compareFn) {
  var keyCompareFn = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return keyCompareFn(keyFn(a), keyFn(b));
  });
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  goog.array.sortByKey(arr, function(obj) {
    return obj[key];
  }, opt_compareFn);
};
goog.array.isSorted = function(arr, opt_compareFn, opt_strict) {
  for (var compare = opt_compareFn || goog.array.defaultCompare, i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if (0 < compareResult || 0 == compareResult && opt_strict) {
      return !1;
    }
  }
  return !0;
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if (!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return !1;
  }
  for (var l = arr1.length, equalsFn = opt_equalsFn || goog.array.defaultCompareEquality, i = 0;i < l;i++) {
    if (!equalsFn(arr1[i], arr2[i])) {
      return !1;
    }
  }
  return !0;
};
goog.array.compare3 = function(arr1, arr2, opt_compareFn) {
  for (var compare = opt_compareFn || goog.array.defaultCompare, l = Math.min(arr1.length, arr2.length), i = 0;i < l;i++) {
    var result = compare(arr1[i], arr2[i]);
    if (0 != result) {
      return result;
    }
  }
  return goog.array.defaultCompare(arr1.length, arr2.length);
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(a, b) {
  return -goog.array.defaultCompare(a, b);
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b;
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return 0 > index ? (goog.array.insertAt(array, value, -(index + 1)), !0) : !1;
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return 0 <= index ? goog.array.removeAt(array, index) : !1;
};
goog.array.bucket = function(array, sorter, opt_obj) {
  for (var buckets = {}, i = 0;i < array.length;i++) {
    var value = array[i], key = sorter.call(opt_obj, value, i, array);
    if (goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value);
    }
  }
  return buckets;
};
goog.array.toObject = function(arr, keyFunc, opt_obj) {
  var ret = {};
  goog.array.forEach(arr, function(element, index) {
    ret[keyFunc.call(opt_obj, element, index, arr)] = element;
  });
  return ret;
};
goog.array.range = function(startOrEnd, opt_end, opt_step) {
  var array = [], start = 0, end = startOrEnd, step = opt_step || 1;
  void 0 !== opt_end && (start = startOrEnd, end = opt_end);
  if (0 > step * (end - start)) {
    return [];
  }
  if (0 < step) {
    for (var i = start;i < end;i += step) {
      array.push(i);
    }
  } else {
    for (i = start;i > end;i += step) {
      array.push(i);
    }
  }
  return array;
};
goog.array.repeat = function(value, n) {
  for (var array = [], i = 0;i < n;i++) {
    array[i] = value;
  }
  return array;
};
goog.array.flatten = function(var_args) {
  for (var result = [], i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    if (goog.isArray(element)) {
      for (var c = 0;c < element.length;c += 8192) {
        for (var chunk = goog.array.slice(element, c, c + 8192), recurseResult = goog.array.flatten.apply(null, chunk), r = 0;r < recurseResult.length;r++) {
          result.push(recurseResult[r]);
        }
      }
    } else {
      result.push(element);
    }
  }
  return result;
};
goog.array.rotate = function(array, n) {
  goog.asserts.assert(null != array.length);
  array.length && (n %= array.length, 0 < n ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n)) : 0 > n && goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n)));
  return array;
};
goog.array.moveItem = function(arr, fromIndex, toIndex) {
  goog.asserts.assert(0 <= fromIndex && fromIndex < arr.length);
  goog.asserts.assert(0 <= toIndex && toIndex < arr.length);
  var removedItems = goog.array.ARRAY_PROTOTYPE_.splice.call(arr, fromIndex, 1);
  goog.array.ARRAY_PROTOTYPE_.splice.call(arr, toIndex, 0, removedItems[0]);
};
goog.array.zip = function(var_args) {
  if (!arguments.length) {
    return [];
  }
  for (var result = [], i = 0;;i++) {
    for (var value = [], j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if (i >= arr.length) {
        return result;
      }
      value.push(arr[i]);
    }
    result.push(value);
  }
};
goog.array.shuffle = function(arr, opt_randFn) {
  for (var randFn = opt_randFn || Math.random, i = arr.length - 1;0 < i;i--) {
    var j = Math.floor(randFn() * (i + 1)), tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
};
goog.array.copyByIndex = function(arr, index_arr) {
  var result = [];
  goog.array.forEach(index_arr, function(index) {
    result.push(arr[index]);
  });
  return result;
};
goog.object = {};
goog.object.forEach = function(obj, f, opt_obj) {
  for (var key in obj) {
    f.call(opt_obj, obj[key], key, obj);
  }
};
goog.object.filter = function(obj, f, opt_obj) {
  var res = {}, key;
  for (key in obj) {
    f.call(opt_obj, obj[key], key, obj) && (res[key] = obj[key]);
  }
  return res;
};
goog.object.map = function(obj, f, opt_obj) {
  var res = {}, key;
  for (key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj);
  }
  return res;
};
goog.object.some = function(obj, f, opt_obj) {
  for (var key in obj) {
    if (f.call(opt_obj, obj[key], key, obj)) {
      return !0;
    }
  }
  return !1;
};
goog.object.every = function(obj, f, opt_obj) {
  for (var key in obj) {
    if (!f.call(opt_obj, obj[key], key, obj)) {
      return !1;
    }
  }
  return !0;
};
goog.object.getCount = function(obj) {
  var rv = 0, key;
  for (key in obj) {
    rv++;
  }
  return rv;
};
goog.object.getAnyKey = function(obj) {
  for (var key in obj) {
    return key;
  }
};
goog.object.getAnyValue = function(obj) {
  for (var key in obj) {
    return obj[key];
  }
};
goog.object.contains = function(obj, val) {
  return goog.object.containsValue(obj, val);
};
goog.object.getValues = function(obj) {
  var res = [], i = 0, key;
  for (key in obj) {
    res[i++] = obj[key];
  }
  return res;
};
goog.object.getKeys = function(obj) {
  var res = [], i = 0, key;
  for (key in obj) {
    res[i++] = key;
  }
  return res;
};
goog.object.getValueByKeys = function(obj, var_args) {
  for (var isArrayLike = goog.isArrayLike(var_args), keys = isArrayLike ? var_args : arguments, i = isArrayLike ? 0 : 1;i < keys.length && (obj = obj[keys[i]], goog.isDef(obj));i++) {
  }
  return obj;
};
goog.object.containsKey = function(obj, key) {
  return key in obj;
};
goog.object.containsValue = function(obj, val) {
  for (var key in obj) {
    if (obj[key] == val) {
      return !0;
    }
  }
  return !1;
};
goog.object.findKey = function(obj, f, opt_this) {
  for (var key in obj) {
    if (f.call(opt_this, obj[key], key, obj)) {
      return key;
    }
  }
};
goog.object.findValue = function(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key];
};
goog.object.isEmpty = function(obj) {
  for (var key in obj) {
    return !1;
  }
  return !0;
};
goog.object.clear = function(obj) {
  for (var i in obj) {
    delete obj[i];
  }
};
goog.object.remove = function(obj, key) {
  var rv;
  (rv = key in obj) && delete obj[key];
  return rv;
};
goog.object.add = function(obj, key, val) {
  if (key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val);
};
goog.object.get = function(obj, key, opt_val) {
  return key in obj ? obj[key] : opt_val;
};
goog.object.set = function(obj, key, value) {
  obj[key] = value;
};
goog.object.setIfUndefined = function(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value;
};
goog.object.setWithReturnValueIfNotSet = function(obj, key, f) {
  if (key in obj) {
    return obj[key];
  }
  var val = f();
  return obj[key] = val;
};
goog.object.equals = function(a, b) {
  for (var k in a) {
    if (!(k in b) || a[k] !== b[k]) {
      return !1;
    }
  }
  for (k in b) {
    if (!(k in a)) {
      return !1;
    }
  }
  return !0;
};
goog.object.clone = function(obj) {
  var res = {}, key;
  for (key in obj) {
    res[key] = obj[key];
  }
  return res;
};
goog.object.unsafeClone = function(obj) {
  var type = goog.typeOf(obj);
  if ("object" == type || "array" == type) {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = "array" == type ? [] : {}, key;
    for (key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.object.transpose = function(obj) {
  var transposed = {}, key;
  for (key in obj) {
    transposed[obj[key]] = key;
  }
  return transposed;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(target, var_args) {
  for (var key, source, i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for (key in source) {
      target[key] = source[key];
    }
    for (var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j], Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
  }
};
goog.object.create = function(var_args) {
  var argLength = arguments.length;
  if (1 == argLength && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var rv = {}, i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1];
  }
  return rv;
};
goog.object.createSet = function(var_args) {
  var argLength = arguments.length;
  if (1 == argLength && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  for (var rv = {}, i = 0;i < argLength;i++) {
    rv[arguments[i]] = !0;
  }
  return rv;
};
goog.object.createImmutableView = function(obj) {
  var result = obj;
  Object.isFrozen && !Object.isFrozen(obj) && (result = Object.create(obj), Object.freeze(result));
  return result;
};
goog.object.isImmutableView = function(obj) {
  return !!Object.isFrozen && Object.isFrozen(obj);
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
  var navigator = goog.labs.userAgent.util.getNavigator_();
  if (navigator) {
    var userAgent = navigator.userAgent;
    if (userAgent) {
      return userAgent;
    }
  }
  return "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(opt_userAgent) {
  goog.labs.userAgent.util.userAgent_ = opt_userAgent || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(userAgent, str);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(str) {
  var userAgent = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(userAgent, str);
};
goog.labs.userAgent.util.extractVersionTuples = function(userAgent) {
  for (var versionRegExp = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, data = [], match;match = versionRegExp.exec(userAgent);) {
    data.push([match[1], match[2], match[3] || void 0]);
  }
  return data;
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR");
};
goog.labs.userAgent.browser.matchIE_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchEdge_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
};
goog.labs.userAgent.browser.matchCoast_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchOpera_() && !goog.labs.userAgent.browser.matchEdge_();
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
  function lookUpValueWithKeys(keys) {
    var key = goog.array.find(keys, versionMapHasKey);
    return versionMap[key] || "";
  }
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(userAgentString);
  }
  var versionTuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString), versionMap = {};
  goog.array.forEach(versionTuples, function(tuple) {
    var key = tuple[0], value = tuple[1];
    versionMap[key] = value;
  });
  var versionMapHasKey = goog.partial(goog.object.containsKey, versionMap);
  if (goog.labs.userAgent.browser.isOpera()) {
    return lookUpValueWithKeys(["Version", "Opera", "OPR"]);
  }
  if (goog.labs.userAgent.browser.isEdge()) {
    return lookUpValueWithKeys(["Edge"]);
  }
  if (goog.labs.userAgent.browser.isChrome()) {
    return lookUpValueWithKeys(["Chrome", "CriOS"]);
  }
  var tuple = versionTuples[2];
  return tuple && tuple[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function(version) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), version);
};
goog.labs.userAgent.browser.getIEVersion_ = function(userAgent) {
  var rv = /rv: *([\d\.]*)/.exec(userAgent);
  if (rv && rv[1]) {
    return rv[1];
  }
  var version = "", msie = /MSIE +([\d\.]+)/.exec(userAgent);
  if (msie && msie[1]) {
    var tridentVersion = /Trident\/(\d.\d)/.exec(userAgent);
    if ("7.0" == msie[1]) {
      if (tridentVersion && tridentVersion[1]) {
        switch(tridentVersion[1]) {
          case "4.0":
            version = "8.0";
            break;
          case "5.0":
            version = "9.0";
            break;
          case "6.0":
            version = "10.0";
            break;
          case "7.0":
            version = "11.0";
        }
      } else {
        version = "7.0";
      }
    } else {
      version = msie[1];
    }
  }
  return version;
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isEdge = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.engine.isWebKit = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.isGecko = function() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.getVersion = function() {
  var userAgentString = goog.labs.userAgent.util.getUserAgent();
  if (userAgentString) {
    var tuples = goog.labs.userAgent.util.extractVersionTuples(userAgentString), engineTuple = goog.labs.userAgent.engine.getEngineTuple_(tuples);
    if (engineTuple) {
      return "Gecko" == engineTuple[0] ? goog.labs.userAgent.engine.getVersionForKey_(tuples, "Firefox") : engineTuple[1];
    }
    var browserTuple = tuples[0], info;
    if (browserTuple && (info = browserTuple[2])) {
      var match = /Trident\/([^\s;]+)/.exec(info);
      if (match) {
        return match[1];
      }
    }
  }
  return "";
};
goog.labs.userAgent.engine.getEngineTuple_ = function(tuples) {
  if (!goog.labs.userAgent.engine.isEdge()) {
    return tuples[1];
  }
  for (var i = 0;i < tuples.length;i++) {
    var tuple = tuples[i];
    if ("Edge" == tuple[0]) {
      return tuple;
    }
  }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(version) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), version);
};
goog.labs.userAgent.engine.getVersionForKey_ = function(tuples, key) {
  var pair = goog.array.find(tuples, function(pair) {
    return key == pair[0];
  });
  return pair && pair[1] || "";
};
goog.async.throwException = function(exception) {
  goog.global.setTimeout(function() {
    throw exception;
  }, 0);
};
goog.async.nextTick = function(callback, opt_context, opt_useSetImmediate) {
  var cb = callback;
  opt_context && (cb = goog.bind(callback, opt_context));
  cb = goog.async.nextTick.wrapCallback_(cb);
  !goog.isFunction(goog.global.setImmediate) || !opt_useSetImmediate && goog.global.Window && goog.global.Window.prototype && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(cb)) : goog.global.setImmediate(cb);
};
goog.async.nextTick.getSetImmediateEmulator_ = function() {
  var Channel = goog.global.MessageChannel;
  "undefined" === typeof Channel && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (Channel = function() {
    var iframe = document.createElement(goog.dom.TagName.IFRAME);
    iframe.style.display = "none";
    iframe.src = "";
    document.documentElement.appendChild(iframe);
    var win = iframe.contentWindow, doc = win.document;
    doc.open();
    doc.write("");
    doc.close();
    var message = "callImmediate" + Math.random(), origin = "file:" == win.location.protocol ? "*" : win.location.protocol + "//" + win.location.host, onmessage = goog.bind(function(e) {
      if (("*" == origin || e.origin == origin) && e.data == message) {
        this.port1.onmessage();
      }
    }, this);
    win.addEventListener("message", onmessage, !1);
    this.port1 = {};
    this.port2 = {postMessage:function() {
      win.postMessage(message, origin);
    }};
  });
  if ("undefined" !== typeof Channel && !goog.labs.userAgent.browser.isIE()) {
    var channel = new Channel, head = {}, tail = head;
    channel.port1.onmessage = function() {
      if (goog.isDef(head.next)) {
        head = head.next;
        var cb = head.cb;
        head.cb = null;
        cb();
      }
    };
    return function(cb) {
      tail.next = {cb:cb};
      tail = tail.next;
      channel.port2.postMessage(0);
    };
  }
  return "undefined" !== typeof document && "onreadystatechange" in document.createElement(goog.dom.TagName.SCRIPT) ? function(cb) {
    var script = document.createElement(goog.dom.TagName.SCRIPT);
    script.onreadystatechange = function() {
      script.onreadystatechange = null;
      script.parentNode.removeChild(script);
      script = null;
      cb();
      cb = null;
    };
    document.documentElement.appendChild(script);
  } : function(cb) {
    goog.global.setTimeout(cb, 0);
  };
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.async.nextTick.wrapCallback_ = transformer;
});
goog.testing = {};
goog.testing.watchers = {};
goog.testing.watchers.resetWatchers_ = [];
goog.testing.watchers.signalClockReset = function() {
  for (var watchers = goog.testing.watchers.resetWatchers_, i = 0;i < watchers.length;i++) {
    goog.testing.watchers.resetWatchers_[i]();
  }
};
goog.testing.watchers.watchClockReset = function(fn) {
  goog.testing.watchers.resetWatchers_.push(fn);
};
goog.async.WorkQueue = function() {
  this.workTail_ = this.workHead_ = null;
};
goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100;
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
  return new goog.async.WorkItem;
}, function(item) {
  item.reset();
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
goog.async.WorkQueue.prototype.add = function(fn, scope) {
  var item = this.getUnusedItem_();
  item.set(fn, scope);
  this.workTail_ ? this.workTail_.next = item : (goog.asserts.assert(!this.workHead_), this.workHead_ = item);
  this.workTail_ = item;
};
goog.async.WorkQueue.prototype.remove = function() {
  var item = null;
  this.workHead_ && (item = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), item.next = null);
  return item;
};
goog.async.WorkQueue.prototype.returnUnused = function(item) {
  goog.async.WorkQueue.freelist_.put(item);
};
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
  return goog.async.WorkQueue.freelist_.get();
};
goog.async.WorkItem = function() {
  this.next = this.scope = this.fn = null;
};
goog.async.WorkItem.prototype.set = function(fn, scope) {
  this.fn = fn;
  this.scope = scope;
  this.next = null;
};
goog.async.WorkItem.prototype.reset = function() {
  this.next = this.scope = this.fn = null;
};
goog.async.run = function(callback, opt_context) {
  goog.async.run.schedule_ || goog.async.run.initializeRunner_();
  goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
  goog.async.run.workQueue_.add(callback, opt_context);
};
goog.async.run.initializeRunner_ = function() {
  if (goog.global.Promise && goog.global.Promise.resolve) {
    var promise = goog.global.Promise.resolve(void 0);
    goog.async.run.schedule_ = function() {
      promise.then(goog.async.run.processWorkQueue);
    };
  } else {
    goog.async.run.schedule_ = function() {
      goog.async.nextTick(goog.async.run.processWorkQueue);
    };
  }
};
goog.async.run.forceNextTick = function(opt_realSetTimeout) {
  goog.async.run.schedule_ = function() {
    goog.async.nextTick(goog.async.run.processWorkQueue);
    opt_realSetTimeout && opt_realSetTimeout(goog.async.run.processWorkQueue);
  };
};
goog.async.run.workQueueScheduled_ = !1;
goog.async.run.workQueue_ = new goog.async.WorkQueue;
goog.DEBUG && (goog.async.run.resetQueue_ = function() {
  goog.async.run.workQueueScheduled_ = !1;
  goog.async.run.workQueue_ = new goog.async.WorkQueue;
}, goog.testing.watchers.watchClockReset(goog.async.run.resetQueue_));
goog.async.run.processWorkQueue = function() {
  for (var item = null;item = goog.async.run.workQueue_.remove();) {
    try {
      item.fn.call(item.scope);
    } catch (e) {
      goog.async.throwException(e);
    }
    goog.async.run.workQueue_.returnUnused(item);
  }
  goog.async.run.workQueueScheduled_ = !1;
};
goog.promise = {};
goog.promise.Resolver = function() {
};
goog.Thenable = function() {
};
goog.Thenable.prototype.then = function() {
};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function(ctor) {
  goog.exportProperty(ctor.prototype, "then", ctor.prototype.then);
  ctor.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0;
};
goog.Thenable.isImplementedBy = function(object) {
  if (!object) {
    return !1;
  }
  try {
    return !!object[goog.Thenable.IMPLEMENTED_BY_PROP];
  } catch (e) {
    return !1;
  }
};
goog.Promise = function(resolver, opt_context) {
  this.state_ = goog.Promise.State_.PENDING;
  this.result_ = void 0;
  this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
  this.executing_ = !1;
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
  goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
  if (resolver != goog.nullFunction) {
    try {
      var self = this;
      resolver.call(opt_context, function(value) {
        self.resolve_(goog.Promise.State_.FULFILLED, value);
      }, function(reason) {
        if (goog.DEBUG && !(reason instanceof goog.Promise.CancellationError)) {
          try {
            if (reason instanceof Error) {
              throw reason;
            }
            throw Error("Promise rejected.");
          } catch (e) {
          }
        }
        self.resolve_(goog.Promise.State_.REJECTED, reason);
      });
    } catch (e$$0) {
      this.resolve_(goog.Promise.State_.REJECTED, e$$0);
    }
  }
};
goog.Promise.LONG_STACK_TRACES = !1;
goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
goog.Promise.State_ = {PENDING:0, BLOCKED:1, FULFILLED:2, REJECTED:3};
goog.Promise.CallbackEntry_ = function() {
  this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
  this.always = !1;
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
  this.context = this.onRejected = this.onFulfilled = this.child = null;
  this.always = !1;
};
goog.Promise.DEFAULT_MAX_UNUSED = 100;
goog.Promise.freelist_ = new goog.async.FreeList(function() {
  return new goog.Promise.CallbackEntry_;
}, function(item) {
  item.reset();
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(onFulfilled, onRejected, context) {
  var entry = goog.Promise.freelist_.get();
  entry.onFulfilled = onFulfilled;
  entry.onRejected = onRejected;
  entry.context = context;
  return entry;
};
goog.Promise.returnEntry_ = function(entry) {
  goog.Promise.freelist_.put(entry);
};
goog.Promise.resolve = function(opt_value) {
  if (opt_value instanceof goog.Promise) {
    return opt_value;
  }
  var promise = new goog.Promise(goog.nullFunction);
  promise.resolve_(goog.Promise.State_.FULFILLED, opt_value);
  return promise;
};
goog.Promise.reject = function(opt_reason) {
  return new goog.Promise(function(resolve, reject) {
    reject(opt_reason);
  });
};
goog.Promise.resolveThen_ = function(value, onFulfilled, onRejected) {
  var isThenable = goog.Promise.maybeThen_(value, onFulfilled, onRejected, null);
  isThenable || goog.async.run(goog.partial(onFulfilled, value));
};
goog.Promise.race = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    promises.length || resolve(void 0);
    for (var i = 0, promise;i < promises.length;i++) {
      promise = promises[i], goog.Promise.resolveThen_(promise, resolve, reject);
    }
  });
};
goog.Promise.all = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toFulfill = promises.length, values = [];
    if (toFulfill) {
      for (var onFulfill = function(index, value) {
        toFulfill--;
        values[index] = value;
        0 == toFulfill && resolve(values);
      }, onReject = function(reason) {
        reject(reason);
      }, i = 0, promise;i < promises.length;i++) {
        promise = promises[i], goog.Promise.resolveThen_(promise, goog.partial(onFulfill, i), onReject);
      }
    } else {
      resolve(values);
    }
  });
};
goog.Promise.allSettled = function(promises) {
  return new goog.Promise(function(resolve) {
    var toSettle = promises.length, results = [];
    if (toSettle) {
      for (var onSettled = function(index, fulfilled, result) {
        toSettle--;
        results[index] = fulfilled ? {fulfilled:!0, value:result} : {fulfilled:!1, reason:result};
        0 == toSettle && resolve(results);
      }, i = 0, promise;i < promises.length;i++) {
        promise = promises[i], goog.Promise.resolveThen_(promise, goog.partial(onSettled, i, !0), goog.partial(onSettled, i, !1));
      }
    } else {
      resolve(results);
    }
  });
};
goog.Promise.firstFulfilled = function(promises) {
  return new goog.Promise(function(resolve, reject) {
    var toReject = promises.length, reasons = [];
    if (toReject) {
      for (var onFulfill = function(value) {
        resolve(value);
      }, onReject = function(index, reason) {
        toReject--;
        reasons[index] = reason;
        0 == toReject && reject(reasons);
      }, i = 0, promise;i < promises.length;i++) {
        promise = promises[i], goog.Promise.resolveThen_(promise, onFulfill, goog.partial(onReject, i));
      }
    } else {
      resolve(void 0);
    }
  });
};
goog.Promise.withResolver = function() {
  var resolve, reject, promise = new goog.Promise(function(rs, rj) {
    resolve = rs;
    reject = rj;
  });
  return new goog.Promise.Resolver_(promise, resolve, reject);
};
goog.Promise.prototype.then = function(opt_onFulfilled, opt_onRejected, opt_context) {
  null != opt_onFulfilled && goog.asserts.assertFunction(opt_onFulfilled, "opt_onFulfilled should be a function.");
  null != opt_onRejected && goog.asserts.assertFunction(opt_onRejected, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
  return this.addChildPromise_(goog.isFunction(opt_onFulfilled) ? opt_onFulfilled : null, goog.isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(opt_onFulfilled, opt_onRejected, opt_context) {
  null != opt_onFulfilled && goog.asserts.assertFunction(opt_onFulfilled, "opt_onFulfilled should be a function.");
  null != opt_onRejected && goog.asserts.assertFunction(opt_onRejected, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
  this.addCallbackEntry_(goog.Promise.getCallbackEntry_(opt_onFulfilled || goog.nullFunction, opt_onRejected || null, opt_context));
};
goog.Promise.prototype.thenCatch = function(onRejected, opt_context) {
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch"));
  return this.addChildPromise_(null, onRejected, opt_context);
};
goog.Promise.prototype.addCallbackEntry_ = function(callbackEntry) {
  this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
  this.queueEntry_(callbackEntry);
};
goog.Promise.prototype.addChildPromise_ = function(onFulfilled, onRejected, opt_context) {
  var callbackEntry = goog.Promise.getCallbackEntry_(null, null, null);
  callbackEntry.child = new goog.Promise(function(resolve, reject) {
    callbackEntry.onFulfilled = onFulfilled ? function(value) {
      try {
        var result = onFulfilled.call(opt_context, value);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    } : resolve;
    callbackEntry.onRejected = onRejected ? function(reason) {
      try {
        var result = onRejected.call(opt_context, reason);
        !goog.isDef(result) && reason instanceof goog.Promise.CancellationError ? reject(reason) : resolve(result);
      } catch (err) {
        reject(err);
      }
    } : reject;
  });
  callbackEntry.child.parent_ = this;
  this.addCallbackEntry_(callbackEntry);
  return callbackEntry.child;
};
goog.Promise.prototype.unblockAndFulfill_ = function(value) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.FULFILLED, value);
};
goog.Promise.prototype.unblockAndReject_ = function(reason) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.REJECTED, reason);
};
goog.Promise.prototype.resolve_ = function(state, x) {
  if (this.state_ == goog.Promise.State_.PENDING) {
    this == x && (state = goog.Promise.State_.REJECTED, x = new TypeError("Promise cannot resolve to itself"));
    this.state_ = goog.Promise.State_.BLOCKED;
    var isThenable = goog.Promise.maybeThen_(x, this.unblockAndFulfill_, this.unblockAndReject_, this);
    isThenable || (this.result_ = x, this.state_ = state, this.parent_ = null, this.scheduleCallbacks_(), state != goog.Promise.State_.REJECTED || x instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, x));
  }
};
goog.Promise.maybeThen_ = function(value, onFulfilled, onRejected, context) {
  if (value instanceof goog.Promise) {
    return value.thenVoid(onFulfilled, onRejected, context), !0;
  }
  if (goog.Thenable.isImplementedBy(value)) {
    return value.then(onFulfilled, onRejected, context), !0;
  }
  if (goog.isObject(value)) {
    try {
      var then = value.then;
      if (goog.isFunction(then)) {
        return goog.Promise.tryThen_(value, then, onFulfilled, onRejected, context), !0;
      }
    } catch (e) {
      return onRejected.call(context, e), !0;
    }
  }
  return !1;
};
goog.Promise.tryThen_ = function(thenable, then, onFulfilled, onRejected, context) {
  var called = !1, resolve = function(value) {
    called || (called = !0, onFulfilled.call(context, value));
  }, reject = function(reason) {
    called || (called = !0, onRejected.call(context, reason));
  };
  try {
    then.call(thenable, resolve, reject);
  } catch (e) {
    reject(e);
  }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
  this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this));
};
goog.Promise.prototype.hasEntry_ = function() {
  return !!this.callbackEntries_;
};
goog.Promise.prototype.queueEntry_ = function(entry) {
  goog.asserts.assert(null != entry.onFulfilled);
  this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = entry : this.callbackEntries_ = entry;
  this.callbackEntriesTail_ = entry;
};
goog.Promise.prototype.popEntry_ = function() {
  var entry = null;
  this.callbackEntries_ && (entry = this.callbackEntries_, this.callbackEntries_ = entry.next, entry.next = null);
  this.callbackEntries_ || (this.callbackEntriesTail_ = null);
  null != entry && goog.asserts.assert(null != entry.onFulfilled);
  return entry;
};
goog.Promise.prototype.executeCallbacks_ = function() {
  for (var entry = null;entry = this.popEntry_();) {
    goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(entry, this.state_, this.result_);
  }
  this.executing_ = !1;
};
goog.Promise.prototype.executeCallback_ = function(callbackEntry, state, result) {
  state == goog.Promise.State_.REJECTED && callbackEntry.onRejected && !callbackEntry.always && this.removeUnhandledRejection_();
  if (callbackEntry.child) {
    callbackEntry.child.parent_ = null, goog.Promise.invokeCallback_(callbackEntry, state, result);
  } else {
    try {
      callbackEntry.always ? callbackEntry.onFulfilled.call(callbackEntry.context) : goog.Promise.invokeCallback_(callbackEntry, state, result);
    } catch (err) {
      goog.Promise.handleRejection_.call(null, err);
    }
  }
  goog.Promise.returnEntry_(callbackEntry);
};
goog.Promise.invokeCallback_ = function(callbackEntry, state, result) {
  state == goog.Promise.State_.FULFILLED ? callbackEntry.onFulfilled.call(callbackEntry.context, result) : callbackEntry.onRejected && callbackEntry.onRejected.call(callbackEntry.context, result);
};
goog.Promise.prototype.addStackTrace_ = function(err) {
  if (goog.Promise.LONG_STACK_TRACES && goog.isString(err.stack)) {
    var trace = err.stack.split("\n", 4)[3], message = err.message, message = message + Array(11 - message.length).join(" ");
    this.stack_.push(message + trace);
  }
};
goog.Promise.prototype.appendLongStack_ = function(err) {
  if (goog.Promise.LONG_STACK_TRACES && err && goog.isString(err.stack) && this.stack_.length) {
    for (var longTrace = ["Promise trace:"], promise = this;promise;promise = promise.parent_) {
      for (var i = this.currentStep_;0 <= i;i--) {
        longTrace.push(promise.stack_[i]);
      }
      longTrace.push("Value: [" + (promise.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(promise.result_) + ">");
    }
    err.stack += "\n\n" + longTrace.join("\n");
  }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
  if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY) {
    for (var p = this;p && p.unhandledRejectionId_;p = p.parent_) {
      goog.global.clearTimeout(p.unhandledRejectionId_), p.unhandledRejectionId_ = 0;
    }
  } else {
    if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY) {
      for (p = this;p && p.hadUnhandledRejection_;p = p.parent_) {
        p.hadUnhandledRejection_ = !1;
      }
    }
  }
};
goog.Promise.addUnhandledRejection_ = function(promise, reason) {
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? promise.unhandledRejectionId_ = goog.global.setTimeout(function() {
    promise.appendLongStack_(reason);
    goog.Promise.handleRejection_.call(null, reason);
  }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (promise.hadUnhandledRejection_ = !0, goog.async.run(function() {
    promise.hadUnhandledRejection_ && (promise.appendLongStack_(reason), goog.Promise.handleRejection_.call(null, reason));
  }));
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(handler) {
  goog.Promise.handleRejection_ = handler;
};
goog.Promise.CancellationError = function(opt_message) {
  goog.debug.Error.call(this, opt_message);
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(promise, resolve, reject) {
  this.promise = promise;
  this.resolve = resolve;
  this.reject = reject;
};

var lf = {Row:function(id, payload) {
  this.id_ = id;
  this.payload_ = payload || this.defaultPayload();
}};
lf.Row.nextId_ = 0;
lf.Row.DUMMY_ID = -1;
lf.Row.getNextId = function() {
  return lf.Row.nextId_++;
};
lf.Row.setNextId = function(nextId) {
  lf.Row.nextId_ = nextId;
};
lf.Row.prototype.id = function() {
  return this.id_;
};
lf.Row.prototype.assignRowId = function(id) {
  this.id_ = id;
};
lf.Row.prototype.payload = function() {
  return this.payload_;
};
lf.Row.prototype.defaultPayload = function() {
  return {};
};
lf.Row.prototype.toDbPayload = function() {
  return this.payload_;
};
lf.Row.prototype.serialize = function() {
  return {id:this.id_, value:this.toDbPayload()};
};
lf.Row.prototype.keyOfIndex = function(indexName) {
  return "#" == indexName.substr(-1) ? this.id_ : null;
};
lf.Row.deserialize = function(data) {
  return new lf.Row(data.id, data.value);
};
lf.Row.create = function(opt_payload) {
  return new lf.Row(lf.Row.getNextId(), opt_payload || {});
};
lf.Row.binToHex = function(buffer) {
  if (!goog.isDefAndNotNull(buffer)) {
    return null;
  }
  for (var uint8Array = new Uint8Array(buffer), s = "", i = 0;i < uint8Array.length;++i) {
    var chr = uint8Array[i].toString(16), s = s + (2 > chr.length ? "0" + chr : chr)
  }
  return s;
};
lf.Row.hexToBin = function(hex) {
  if (!goog.isDefAndNotNull(hex) || "" == hex) {
    return null;
  }
  0 != hex.length % 2 && (hex = "0" + hex);
  for (var buffer = new ArrayBuffer(hex.length / 2), uint8Array = new Uint8Array(buffer), i = 0, j = 0;i < hex.length;i += 2) {
    uint8Array[j++] = parseInt(hex.substr(i, 2), 16);
  }
  return buffer;
};
lf.index = {};
lf.index.IndexMetadata = function(type) {
  this.type = type;
};
lf.index.IndexMetadata.Type = {ROW_ID:"rowid", BTREE:"btree"};
lf.index.IndexMetadataRow = function(payload) {
  lf.Row.call(this, lf.index.IndexMetadataRow.ROW_ID, payload);
};
goog.inherits(lf.index.IndexMetadataRow, lf.Row);
lf.index.IndexMetadataRow.ROW_ID = -1;
lf.index.IndexMetadataRow.forType = function(indexType) {
  var indexMetadata = new lf.index.IndexMetadata(indexType);
  return new lf.index.IndexMetadataRow(indexMetadata);
};
goog.math = {};
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function(value, min, max) {
  return Math.min(Math.max(value, min), max);
};
goog.math.modulo = function(a, b) {
  var r = a % b;
  return 0 > r * b ? r + b : r;
};
goog.math.lerp = function(a, b, x) {
  return a + x * (b - a);
};
goog.math.nearlyEquals = function(a, b, opt_tolerance) {
  return Math.abs(a - b) <= (opt_tolerance || 1E-6);
};
goog.math.standardAngle = function(angle) {
  return goog.math.modulo(angle, 360);
};
goog.math.standardAngleInRadians = function(angle) {
  return goog.math.modulo(angle, 2 * Math.PI);
};
goog.math.toRadians = function(angleDegrees) {
  return angleDegrees * Math.PI / 180;
};
goog.math.toDegrees = function(angleRadians) {
  return 180 * angleRadians / Math.PI;
};
goog.math.angleDx = function(degrees, radius) {
  return radius * Math.cos(goog.math.toRadians(degrees));
};
goog.math.angleDy = function(degrees, radius) {
  return radius * Math.sin(goog.math.toRadians(degrees));
};
goog.math.angle = function(x1, y1, x2, y2) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(y2 - y1, x2 - x1)));
};
goog.math.angleDifference = function(startAngle, endAngle) {
  var d = goog.math.standardAngle(endAngle) - goog.math.standardAngle(startAngle);
  180 < d ? d -= 360 : -180 >= d && (d = 360 + d);
  return d;
};
goog.math.sign = Math.sign || function(x) {
  return 0 < x ? 1 : 0 > x ? -1 : x;
};
goog.math.longestCommonSubsequence = function(array1, array2, opt_compareFn, opt_collectorFn) {
  for (var compare = opt_compareFn || function(a, b) {
    return a == b;
  }, collect = opt_collectorFn || function(i1) {
    return array1[i1];
  }, length1 = array1.length, length2 = array2.length, arr = [], i = 0;i < length1 + 1;i++) {
    arr[i] = [], arr[i][0] = 0;
  }
  for (var j = 0;j < length2 + 1;j++) {
    arr[0][j] = 0;
  }
  for (i = 1;i <= length1;i++) {
    for (j = 1;j <= length2;j++) {
      compare(array1[i - 1], array2[j - 1]) ? arr[i][j] = arr[i - 1][j - 1] + 1 : arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
    }
  }
  for (var result = [], i = length1, j = length2;0 < i && 0 < j;) {
    compare(array1[i - 1], array2[j - 1]) ? (result.unshift(collect(i - 1, j - 1)), i--, j--) : arr[i - 1][j] > arr[i][j - 1] ? i-- : j--;
  }
  return result;
};
goog.math.sum = function(var_args) {
  return goog.array.reduce(arguments, function(sum, value) {
    return sum + value;
  }, 0);
};
goog.math.average = function(var_args) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(var_args) {
  var sampleSize = arguments.length;
  if (2 > sampleSize) {
    return 0;
  }
  var mean = goog.math.average.apply(null, arguments), variance = goog.math.sum.apply(null, goog.array.map(arguments, function(val) {
    return Math.pow(val - mean, 2);
  })) / (sampleSize - 1);
  return variance;
};
goog.math.standardDeviation = function(var_args) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(num) {
  return isFinite(num) && 0 == num % 1;
};
goog.math.isFiniteNumber = function(num) {
  return isFinite(num) && !isNaN(num);
};
goog.math.isNegativeZero = function(num) {
  return 0 == num && 0 > 1 / num;
};
goog.math.log10Floor = function(num) {
  if (0 < num) {
    var x = Math.round(Math.log(num) * Math.LOG10E);
    return x - (parseFloat("1e" + x) > num);
  }
  return 0 == num ? -Infinity : NaN;
};
goog.math.safeFloor = function(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || 0 < opt_epsilon);
  return Math.floor(num + (opt_epsilon || 2E-15));
};
goog.math.safeCeil = function(num, opt_epsilon) {
  goog.asserts.assert(!goog.isDef(opt_epsilon) || 0 < opt_epsilon);
  return Math.ceil(num - (opt_epsilon || 2E-15));
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {message:"StopIteration", stack:""};
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function() {
  return this;
};
goog.iter.toIterator = function(iterable) {
  if (iterable instanceof goog.iter.Iterator) {
    return iterable;
  }
  if ("function" == typeof iterable.__iterator__) {
    return iterable.__iterator__(!1);
  }
  if (goog.isArrayLike(iterable)) {
    var i = 0, newIter = new goog.iter.Iterator;
    newIter.next = function() {
      for (;;) {
        if (i >= iterable.length) {
          throw goog.iter.StopIteration;
        }
        if (i in iterable) {
          return iterable[i++];
        }
        i++;
      }
    };
    return newIter;
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(iterable, f, opt_obj) {
  if (goog.isArrayLike(iterable)) {
    try {
      goog.array.forEach(iterable, f, opt_obj);
    } catch (ex) {
      if (ex !== goog.iter.StopIteration) {
        throw ex;
      }
    }
  } else {
    iterable = goog.iter.toIterator(iterable);
    try {
      for (;;) {
        f.call(opt_obj, iterable.next(), void 0, iterable);
      }
    } catch (ex$$0) {
      if (ex$$0 !== goog.iter.StopIteration) {
        throw ex$$0;
      }
    }
  }
};
goog.iter.filter = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), newIter = new goog.iter.Iterator;
  newIter.next = function() {
    for (;;) {
      var val = iterator.next();
      if (f.call(opt_obj, val, void 0, iterator)) {
        return val;
      }
    }
  };
  return newIter;
};
goog.iter.filterFalse = function(iterable, f, opt_obj) {
  return goog.iter.filter(iterable, goog.functions.not(f), opt_obj);
};
goog.iter.range = function(startOrStop, opt_stop, opt_step) {
  var start = 0, stop = startOrStop, step = opt_step || 1;
  1 < arguments.length && (start = startOrStop, stop = opt_stop);
  if (0 == step) {
    throw Error("Range step argument must not be zero");
  }
  var newIter = new goog.iter.Iterator;
  newIter.next = function() {
    if (0 < step && start >= stop || 0 > step && start <= stop) {
      throw goog.iter.StopIteration;
    }
    var rv = start;
    start += step;
    return rv;
  };
  return newIter;
};
goog.iter.join = function(iterable, deliminator) {
  return goog.iter.toArray(iterable).join(deliminator);
};
goog.iter.map = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), newIter = new goog.iter.Iterator;
  newIter.next = function() {
    var val = iterator.next();
    return f.call(opt_obj, val, void 0, iterator);
  };
  return newIter;
};
goog.iter.reduce = function(iterable, f, val$$0, opt_obj) {
  var rval = val$$0;
  goog.iter.forEach(iterable, function(val) {
    rval = f.call(opt_obj, rval, val);
  });
  return rval;
};
goog.iter.some = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    for (;;) {
      if (f.call(opt_obj, iterable.next(), void 0, iterable)) {
        return !0;
      }
    }
  } catch (ex) {
    if (ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return !1;
};
goog.iter.every = function(iterable, f, opt_obj) {
  iterable = goog.iter.toIterator(iterable);
  try {
    for (;;) {
      if (!f.call(opt_obj, iterable.next(), void 0, iterable)) {
        return !1;
      }
    }
  } catch (ex) {
    if (ex !== goog.iter.StopIteration) {
      throw ex;
    }
  }
  return !0;
};
goog.iter.chain = function(var_args) {
  return goog.iter.chainFromIterable(arguments);
};
goog.iter.chainFromIterable = function(iterable) {
  var iterator = goog.iter.toIterator(iterable), iter = new goog.iter.Iterator, current = null;
  iter.next = function() {
    for (;;) {
      if (null == current) {
        var it = iterator.next();
        current = goog.iter.toIterator(it);
      }
      try {
        return current.next();
      } catch (ex) {
        if (ex !== goog.iter.StopIteration) {
          throw ex;
        }
        current = null;
      }
    }
  };
  return iter;
};
goog.iter.dropWhile = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), newIter = new goog.iter.Iterator, dropping = !0;
  newIter.next = function() {
    for (;;) {
      var val = iterator.next();
      if (!dropping || !f.call(opt_obj, val, void 0, iterator)) {
        return dropping = !1, val;
      }
    }
  };
  return newIter;
};
goog.iter.takeWhile = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), iter = new goog.iter.Iterator;
  iter.next = function() {
    var val = iterator.next();
    if (f.call(opt_obj, val, void 0, iterator)) {
      return val;
    }
    throw goog.iter.StopIteration;
  };
  return iter;
};
goog.iter.toArray = function(iterable) {
  if (goog.isArrayLike(iterable)) {
    return goog.array.toArray(iterable);
  }
  iterable = goog.iter.toIterator(iterable);
  var array = [];
  goog.iter.forEach(iterable, function(val) {
    array.push(val);
  });
  return array;
};
goog.iter.equals = function(iterable1, iterable2, opt_equalsFn) {
  var fillValue = {}, pairs = goog.iter.zipLongest(fillValue, iterable1, iterable2), equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  return goog.iter.every(pairs, function(pair) {
    return equalsFn(pair[0], pair[1]);
  });
};
goog.iter.nextOrValue = function(iterable, defaultValue) {
  try {
    return goog.iter.toIterator(iterable).next();
  } catch (e) {
    if (e != goog.iter.StopIteration) {
      throw e;
    }
    return defaultValue;
  }
};
goog.iter.product = function(var_args) {
  var someArrayEmpty = goog.array.some(arguments, function(arr) {
    return !arr.length;
  });
  if (someArrayEmpty || !arguments.length) {
    return new goog.iter.Iterator;
  }
  var iter = new goog.iter.Iterator, arrays = arguments, indicies = goog.array.repeat(0, arrays.length);
  iter.next = function() {
    if (indicies) {
      for (var retVal = goog.array.map(indicies, function(valueIndex, arrayIndex) {
        return arrays[arrayIndex][valueIndex];
      }), i = indicies.length - 1;0 <= i;i--) {
        goog.asserts.assert(indicies);
        if (indicies[i] < arrays[i].length - 1) {
          indicies[i]++;
          break;
        }
        if (0 == i) {
          indicies = null;
          break;
        }
        indicies[i] = 0;
      }
      return retVal;
    }
    throw goog.iter.StopIteration;
  };
  return iter;
};
goog.iter.cycle = function(iterable) {
  var baseIterator = goog.iter.toIterator(iterable), cache = [], cacheIndex = 0, iter = new goog.iter.Iterator, useCache = !1;
  iter.next = function() {
    var returnElement = null;
    if (!useCache) {
      try {
        return returnElement = baseIterator.next(), cache.push(returnElement), returnElement;
      } catch (e) {
        if (e != goog.iter.StopIteration || goog.array.isEmpty(cache)) {
          throw e;
        }
        useCache = !0;
      }
    }
    returnElement = cache[cacheIndex];
    cacheIndex = (cacheIndex + 1) % cache.length;
    return returnElement;
  };
  return iter;
};
goog.iter.count = function(opt_start, opt_step) {
  var counter = opt_start || 0, step = goog.isDef(opt_step) ? opt_step : 1, iter = new goog.iter.Iterator;
  iter.next = function() {
    var returnValue = counter;
    counter += step;
    return returnValue;
  };
  return iter;
};
goog.iter.repeat = function(value) {
  var iter = new goog.iter.Iterator;
  iter.next = goog.functions.constant(value);
  return iter;
};
goog.iter.accumulate = function(iterable) {
  var iterator = goog.iter.toIterator(iterable), total = 0, iter = new goog.iter.Iterator;
  iter.next = function() {
    return total += iterator.next();
  };
  return iter;
};
goog.iter.zip = function(var_args) {
  var args = arguments, iter = new goog.iter.Iterator;
  if (0 < args.length) {
    var iterators = goog.array.map(args, goog.iter.toIterator);
    iter.next = function() {
      var arr = goog.array.map(iterators, function(it) {
        return it.next();
      });
      return arr;
    };
  }
  return iter;
};
goog.iter.zipLongest = function(fillValue, var_args) {
  var args = goog.array.slice(arguments, 1), iter = new goog.iter.Iterator;
  if (0 < args.length) {
    var iterators = goog.array.map(args, goog.iter.toIterator);
    iter.next = function() {
      var iteratorsHaveValues = !1, arr = goog.array.map(iterators, function(it) {
        var returnValue;
        try {
          returnValue = it.next(), iteratorsHaveValues = !0;
        } catch (ex) {
          if (ex !== goog.iter.StopIteration) {
            throw ex;
          }
          returnValue = fillValue;
        }
        return returnValue;
      });
      if (!iteratorsHaveValues) {
        throw goog.iter.StopIteration;
      }
      return arr;
    };
  }
  return iter;
};
goog.iter.compress = function(iterable, selectors) {
  var selectorIterator = goog.iter.toIterator(selectors);
  return goog.iter.filter(iterable, function() {
    return !!selectorIterator.next();
  });
};
goog.iter.GroupByIterator_ = function(iterable, opt_keyFunc) {
  this.iterator = goog.iter.toIterator(iterable);
  this.keyFunc = opt_keyFunc || goog.functions.identity;
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
  for (;this.currentKey == this.targetKey;) {
    this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
  }
  this.targetKey = this.currentKey;
  return [this.currentKey, this.groupItems_(this.targetKey)];
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(targetKey) {
  for (var arr = [];this.currentKey == targetKey;) {
    arr.push(this.currentValue);
    try {
      this.currentValue = this.iterator.next();
    } catch (ex) {
      if (ex !== goog.iter.StopIteration) {
        throw ex;
      }
      break;
    }
    this.currentKey = this.keyFunc(this.currentValue);
  }
  return arr;
};
goog.iter.groupBy = function(iterable, opt_keyFunc) {
  return new goog.iter.GroupByIterator_(iterable, opt_keyFunc);
};
goog.iter.starMap = function(iterable, f, opt_obj) {
  var iterator = goog.iter.toIterator(iterable), iter = new goog.iter.Iterator;
  iter.next = function() {
    var args = goog.iter.toArray(iterator.next());
    return f.apply(opt_obj, goog.array.concat(args, void 0, iterator));
  };
  return iter;
};
goog.iter.tee = function(iterable, opt_num) {
  var iterator = goog.iter.toIterator(iterable), num = goog.isNumber(opt_num) ? opt_num : 2, buffers = goog.array.map(goog.array.range(num), function() {
    return [];
  }), addNextIteratorValueToBuffers = function() {
    var val = iterator.next();
    goog.array.forEach(buffers, function(buffer) {
      buffer.push(val);
    });
  }, createIterator = function(buffer) {
    var iter = new goog.iter.Iterator;
    iter.next = function() {
      goog.array.isEmpty(buffer) && addNextIteratorValueToBuffers();
      goog.asserts.assert(!goog.array.isEmpty(buffer));
      return buffer.shift();
    };
    return iter;
  };
  return goog.array.map(buffers, createIterator);
};
goog.iter.enumerate = function(iterable, opt_start) {
  return goog.iter.zip(goog.iter.count(opt_start), iterable);
};
goog.iter.limit = function(iterable, limitSize) {
  goog.asserts.assert(goog.math.isInt(limitSize) && 0 <= limitSize);
  var iterator = goog.iter.toIterator(iterable), iter = new goog.iter.Iterator, remaining = limitSize;
  iter.next = function() {
    if (0 < remaining--) {
      return iterator.next();
    }
    throw goog.iter.StopIteration;
  };
  return iter;
};
goog.iter.consume = function(iterable, count) {
  goog.asserts.assert(goog.math.isInt(count) && 0 <= count);
  for (var iterator = goog.iter.toIterator(iterable);0 < count--;) {
    goog.iter.nextOrValue(iterator, null);
  }
  return iterator;
};
goog.iter.slice = function(iterable, start, opt_end) {
  goog.asserts.assert(goog.math.isInt(start) && 0 <= start);
  var iterator = goog.iter.consume(iterable, start);
  goog.isNumber(opt_end) && (goog.asserts.assert(goog.math.isInt(opt_end) && opt_end >= start), iterator = goog.iter.limit(iterator, opt_end - start));
  return iterator;
};
goog.iter.hasDuplicates_ = function(arr) {
  var deduped = [];
  goog.array.removeDuplicates(arr, deduped);
  return arr.length != deduped.length;
};
goog.iter.permutations = function(iterable, opt_length) {
  var elements = goog.iter.toArray(iterable), length = goog.isNumber(opt_length) ? opt_length : elements.length, sets = goog.array.repeat(elements, length), product = goog.iter.product.apply(void 0, sets);
  return goog.iter.filter(product, function(arr) {
    return !goog.iter.hasDuplicates_(arr);
  });
};
goog.iter.combinations = function(iterable, length) {
  function getIndexFromElements(index) {
    return elements[index];
  }
  var elements = goog.iter.toArray(iterable), indexes = goog.iter.range(elements.length), indexIterator = goog.iter.permutations(indexes, length), sortedIndexIterator = goog.iter.filter(indexIterator, function(arr) {
    return goog.array.isSorted(arr);
  }), iter = new goog.iter.Iterator;
  iter.next = function() {
    return goog.array.map(sortedIndexIterator.next(), getIndexFromElements);
  };
  return iter;
};
goog.iter.combinationsWithReplacement = function(iterable, length) {
  function getIndexFromElements(index) {
    return elements[index];
  }
  var elements = goog.iter.toArray(iterable), indexes = goog.array.range(elements.length), sets = goog.array.repeat(indexes, length), indexIterator = goog.iter.product.apply(void 0, sets), sortedIndexIterator = goog.iter.filter(indexIterator, function(arr) {
    return goog.array.isSorted(arr);
  }), iter = new goog.iter.Iterator;
  iter.next = function() {
    return goog.array.map(sortedIndexIterator.next(), getIndexFromElements);
  };
  return iter;
};
goog.structs = {};
goog.structs.Map = function(opt_map, var_args) {
  this.map_ = {};
  this.keys_ = [];
  this.version_ = this.count_ = 0;
  var argLength = arguments.length;
  if (1 < argLength) {
    if (argLength % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var i = 0;i < argLength;i += 2) {
      this.set(arguments[i], arguments[i + 1]);
    }
  } else {
    opt_map && this.addAll(opt_map);
  }
};
goog.structs.Map.prototype.getCount = function() {
  return this.count_;
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  for (var rv = [], i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    rv.push(this.map_[key]);
  }
  return rv;
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat();
};
goog.structs.Map.prototype.containsKey = function(key) {
  return goog.structs.Map.hasKey_(this.map_, key);
};
goog.structs.Map.prototype.containsValue = function(val) {
  for (var i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    if (goog.structs.Map.hasKey_(this.map_, key) && this.map_[key] == val) {
      return !0;
    }
  }
  return !1;
};
goog.structs.Map.prototype.equals = function(otherMap, opt_equalityFn) {
  if (this === otherMap) {
    return !0;
  }
  if (this.count_ != otherMap.getCount()) {
    return !1;
  }
  var equalityFn = opt_equalityFn || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for (var key, i = 0;key = this.keys_[i];i++) {
    if (!equalityFn(this.get(key), otherMap.get(key))) {
      return !1;
    }
  }
  return !0;
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b;
};
goog.structs.Map.prototype.isEmpty = function() {
  return 0 == this.count_;
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0;
};
goog.structs.Map.prototype.remove = function(key) {
  return goog.structs.Map.hasKey_(this.map_, key) ? (delete this.map_[key], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1;
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if (this.count_ != this.keys_.length) {
    for (var srcIndex = 0, destIndex = 0;srcIndex < this.keys_.length;) {
      var key = this.keys_[srcIndex];
      goog.structs.Map.hasKey_(this.map_, key) && (this.keys_[destIndex++] = key);
      srcIndex++;
    }
    this.keys_.length = destIndex;
  }
  if (this.count_ != this.keys_.length) {
    for (var seen = {}, destIndex = srcIndex = 0;srcIndex < this.keys_.length;) {
      key = this.keys_[srcIndex], goog.structs.Map.hasKey_(seen, key) || (this.keys_[destIndex++] = key, seen[key] = 1), srcIndex++;
    }
    this.keys_.length = destIndex;
  }
};
goog.structs.Map.prototype.get = function(key, opt_val) {
  return goog.structs.Map.hasKey_(this.map_, key) ? this.map_[key] : opt_val;
};
goog.structs.Map.prototype.set = function(key, value) {
  goog.structs.Map.hasKey_(this.map_, key) || (this.count_++, this.keys_.push(key), this.version_++);
  this.map_[key] = value;
};
goog.structs.Map.prototype.addAll = function(map) {
  var keys, values;
  map instanceof goog.structs.Map ? (keys = map.getKeys(), values = map.getValues()) : (keys = goog.object.getKeys(map), values = goog.object.getValues(map));
  for (var i = 0;i < keys.length;i++) {
    this.set(keys[i], values[i]);
  }
};
goog.structs.Map.prototype.forEach = function(f, opt_obj) {
  for (var keys = this.getKeys(), i = 0;i < keys.length;i++) {
    var key = keys[i], value = this.get(key);
    f.call(opt_obj, value, key, this);
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this);
};
goog.structs.Map.prototype.transpose = function() {
  for (var transposed = new goog.structs.Map, i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i], value = this.map_[key];
    transposed.set(value, key);
  }
  return transposed;
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  for (var obj = {}, i = 0;i < this.keys_.length;i++) {
    var key = this.keys_[i];
    obj[key] = this.map_[key];
  }
  return obj;
};
goog.structs.Map.prototype.__iterator__ = function(opt_keys) {
  this.cleanupKeysArray_();
  var i = 0, version = this.version_, selfObj = this, newIter = new goog.iter.Iterator;
  newIter.next = function() {
    if (version != selfObj.version_) {
      throw Error("The map has changed since the iterator was created");
    }
    if (i >= selfObj.keys_.length) {
      throw goog.iter.StopIteration;
    }
    var key = selfObj.keys_[i++];
    return opt_keys ? key : selfObj.map_[key];
  };
  return newIter;
};
goog.structs.Map.hasKey_ = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

lf.structs = {};
lf.structs.map = {};
lf.structs.MapPolyFill_ = function() {
  this.map_ = new goog.structs.Map;
  Object.defineProperty(this, "size", {get:function() {
    return this.map_.getCount();
  }});
};
lf.structs.MapPolyFill_.prototype.clear = function() {
  this.map_.clear();
};
goog.exportProperty(lf.structs.MapPolyFill_.prototype, "clear", lf.structs.MapPolyFill_.prototype.clear);
lf.structs.MapPolyFill_.prototype.delete = function(key) {
  return this.map_.remove(key);
};
goog.exportProperty(lf.structs.MapPolyFill_.prototype, "delete", lf.structs.MapPolyFill_.prototype.delete);
lf.structs.MapPolyFill_.prototype.forEach = function(callback, opt_thisArg) {
  return this.map_.forEach(callback, opt_thisArg);
};
goog.exportProperty(lf.structs.MapPolyFill_.prototype, "forEach", lf.structs.MapPolyFill_.prototype.forEach);
lf.structs.MapPolyFill_.prototype.get = function(key) {
  return this.map_.get(key);
};
goog.exportProperty(lf.structs.MapPolyFill_.prototype, "get", lf.structs.MapPolyFill_.prototype.get);
lf.structs.MapPolyFill_.prototype.has = function(key) {
  return this.map_.containsKey(key);
};
goog.exportProperty(lf.structs.MapPolyFill_.prototype, "has", lf.structs.MapPolyFill_.prototype.has);
lf.structs.MapPolyFill_.prototype.set = function(key, value) {
  return this.map_.set(key, value);
};
goog.exportProperty(lf.structs.MapPolyFill_.prototype, "set", lf.structs.MapPolyFill_.prototype.set);
lf.structs.map.create = function() {
  return window.Map && window.Map.prototype.values && window.Map.prototype.forEach ? new Map : new lf.structs.MapPolyFill_;
};
lf.structs.map.keys = function(map) {
  if (map instanceof lf.structs.MapPolyFill_) {
    return map.map_.getKeys();
  }
  var i = 0, array = Array(map.size);
  map.forEach(function(v, k) {
    array[i++] = k;
  });
  return array;
};
lf.structs.map.values = function(map) {
  if (map instanceof lf.structs.MapPolyFill_) {
    return map.map_.getValues();
  }
  var i = 0, array = Array(map.size);
  map.forEach(function(v) {
    array[i++] = v;
  });
  return array;
};
lf.TransactionType = {};
goog.exportSymbol("lf.TransactionType", lf.TransactionType);
lf.TransactionType.READ_ONLY = 0;
goog.exportProperty(lf.TransactionType, "READ_ONLY", lf.TransactionType.READ_ONLY);
lf.TransactionType.READ_WRITE = 1;
goog.exportProperty(lf.TransactionType, "READ_WRITE", lf.TransactionType.READ_WRITE);
lf.Transaction = function() {
};
lf.backstore = {};
lf.backstore.Tx = function() {
};
lf.backstore.BaseTx = function(journal, txType) {
  this.journal_ = journal;
  this.txType = txType;
  this.resolver = goog.Promise.withResolver();
};
lf.backstore.BaseTx.prototype.getJournal = function() {
  return this.journal_;
};
lf.backstore.BaseTx.prototype.commit = function() {
  try {
    this.journal_.checkDeferredConstraints();
  } catch (e) {
    return goog.Promise.reject(e);
  }
  var mergeIntoBackstore = goog.bind(function() {
    return this.txType == lf.TransactionType.READ_ONLY ? this.commitInternal() : this.mergeIntoBackstore_();
  }, this);
  return mergeIntoBackstore().then(goog.bind(function(results) {
    this.journal_.commit();
    return results;
  }, this));
};
lf.backstore.BaseTx.prototype.mergeIntoBackstore_ = function() {
  this.mergeTableChanges_();
  this.mergeIndexChanges_();
  return this.commitInternal();
};
lf.backstore.BaseTx.prototype.mergeTableChanges_ = function() {
  var diff = this.journal_.getDiff();
  diff.forEach(function(tableDiff, tableName) {
    var tableSchema = this.journal_.getScope().get(tableName), table = this.getTable(tableSchema.getName(), goog.bind(tableSchema.deserializeRow, tableSchema)), toDeleteRowIds = lf.structs.map.values(tableDiff.getDeleted()).map(function(row) {
      return row.id();
    });
    0 < toDeleteRowIds.length && table.remove(toDeleteRowIds).thenCatch(this.handleError_, this);
    var toPut = lf.structs.map.values(tableDiff.getModified()).map(function(modification) {
      return modification[1];
    }).concat(lf.structs.map.values(tableDiff.getAdded()));
    table.put(toPut).thenCatch(this.handleError_, this);
  }, this);
};
lf.backstore.BaseTx.prototype.mergeIndexChanges_ = function() {
  var indices = this.journal_.getIndexDiff();
  indices.forEach(function(index) {
    var indexTable = this.getTable(index.getName(), lf.Row.deserialize), metadataRows;
    indexTable.get([lf.index.IndexMetadataRow.ROW_ID]).then(function(rows) {
      metadataRows = rows;
      return indexTable.remove([]);
    }).then(function() {
      indexTable.put(metadataRows);
      indexTable.put(index.serialize());
    }, goog.bind(this.handleError_, this));
  }, this);
};
lf.backstore.BaseTx.prototype.handleError_ = function(e) {
  this.resolver.reject(e);
};
lf.service = {};
lf.service.ServiceId = function(serviceId) {
  this.serviceId_ = serviceId;
};
lf.service.ServiceId.prototype.toString = function() {
  return this.serviceId_;
};
lf.service.BACK_STORE = new lf.service.ServiceId("backstore");
lf.service.CACHE = new lf.service.ServiceId("cache");
lf.service.INDEX_STORE = new lf.service.ServiceId("indexstore");
lf.service.QUERY_ENGINE = new lf.service.ServiceId("engine");
lf.service.RUNNER = new lf.service.ServiceId("runner");
lf.service.OBSERVER_REGISTRY = new lf.service.ServiceId("observerregistry");
lf.service.SCHEMA = new lf.service.ServiceId("schema");
lf.Table = function() {
};
goog.structs.Collection = function() {
};
goog.structs.getCount = function(col) {
  return "function" == typeof col.getCount ? col.getCount() : goog.isArrayLike(col) || goog.isString(col) ? col.length : goog.object.getCount(col);
};
goog.structs.getValues = function(col) {
  if ("function" == typeof col.getValues) {
    return col.getValues();
  }
  if (goog.isString(col)) {
    return col.split("");
  }
  if (goog.isArrayLike(col)) {
    for (var rv = [], l = col.length, i = 0;i < l;i++) {
      rv.push(col[i]);
    }
    return rv;
  }
  return goog.object.getValues(col);
};
goog.structs.getKeys = function(col) {
  if ("function" == typeof col.getKeys) {
    return col.getKeys();
  }
  if ("function" != typeof col.getValues) {
    if (goog.isArrayLike(col) || goog.isString(col)) {
      for (var rv = [], l = col.length, i = 0;i < l;i++) {
        rv.push(i);
      }
      return rv;
    }
    return goog.object.getKeys(col);
  }
};
goog.structs.contains = function(col, val) {
  return "function" == typeof col.contains ? col.contains(val) : "function" == typeof col.containsValue ? col.containsValue(val) : goog.isArrayLike(col) || goog.isString(col) ? goog.array.contains(col, val) : goog.object.containsValue(col, val);
};
goog.structs.isEmpty = function(col) {
  return "function" == typeof col.isEmpty ? col.isEmpty() : goog.isArrayLike(col) || goog.isString(col) ? goog.array.isEmpty(col) : goog.object.isEmpty(col);
};
goog.structs.clear = function(col) {
  "function" == typeof col.clear ? col.clear() : goog.isArrayLike(col) ? goog.array.clear(col) : goog.object.clear(col);
};
goog.structs.forEach = function(col, f, opt_obj) {
  if ("function" == typeof col.forEach) {
    col.forEach(f, opt_obj);
  } else {
    if (goog.isArrayLike(col) || goog.isString(col)) {
      goog.array.forEach(col, f, opt_obj);
    } else {
      for (var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
        f.call(opt_obj, values[i], keys && keys[i], col);
      }
    }
  }
};
goog.structs.filter = function(col, f, opt_obj) {
  if ("function" == typeof col.filter) {
    return col.filter(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.filter(col, f, opt_obj);
  }
  var rv, keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length;
  if (keys) {
    rv = {};
    for (var i = 0;i < l;i++) {
      f.call(opt_obj, values[i], keys[i], col) && (rv[keys[i]] = values[i]);
    }
  } else {
    for (rv = [], i = 0;i < l;i++) {
      f.call(opt_obj, values[i], void 0, col) && rv.push(values[i]);
    }
  }
  return rv;
};
goog.structs.map = function(col, f, opt_obj) {
  if ("function" == typeof col.map) {
    return col.map(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.map(col, f, opt_obj);
  }
  var rv, keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length;
  if (keys) {
    rv = {};
    for (var i = 0;i < l;i++) {
      rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col);
    }
  } else {
    for (rv = [], i = 0;i < l;i++) {
      rv[i] = f.call(opt_obj, values[i], void 0, col);
    }
  }
  return rv;
};
goog.structs.some = function(col, f, opt_obj) {
  if ("function" == typeof col.some) {
    return col.some(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.some(col, f, opt_obj);
  }
  for (var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
    if (f.call(opt_obj, values[i], keys && keys[i], col)) {
      return !0;
    }
  }
  return !1;
};
goog.structs.every = function(col, f, opt_obj) {
  if ("function" == typeof col.every) {
    return col.every(f, opt_obj);
  }
  if (goog.isArrayLike(col) || goog.isString(col)) {
    return goog.array.every(col, f, opt_obj);
  }
  for (var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
    if (!f.call(opt_obj, values[i], keys && keys[i], col)) {
      return !1;
    }
  }
  return !0;
};
goog.structs.Set = function(opt_values) {
  this.map_ = new goog.structs.Map;
  opt_values && this.addAll(opt_values);
};
goog.structs.Set.getKey_ = function(val) {
  var type = typeof val;
  return "object" == type && val || "function" == type ? "o" + goog.getUid(val) : type.substr(0, 1) + val;
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount();
};
goog.structs.Set.prototype.add = function(element) {
  this.map_.set(goog.structs.Set.getKey_(element), element);
};
goog.structs.Set.prototype.addAll = function(col) {
  for (var values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
    this.add(values[i]);
  }
};
goog.structs.Set.prototype.removeAll = function(col) {
  for (var values = goog.structs.getValues(col), l = values.length, i = 0;i < l;i++) {
    this.remove(values[i]);
  }
};
goog.structs.Set.prototype.remove = function(element) {
  return this.map_.remove(goog.structs.Set.getKey_(element));
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear();
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty();
};
goog.structs.Set.prototype.contains = function(element) {
  return this.map_.containsKey(goog.structs.Set.getKey_(element));
};
goog.structs.Set.prototype.difference = function(col) {
  var result = this.clone();
  result.removeAll(col);
  return result;
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues();
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this);
};
goog.structs.Set.prototype.equals = function(col) {
  return this.getCount() == goog.structs.getCount(col) && this.isSubsetOf(col);
};
goog.structs.Set.prototype.isSubsetOf = function(col) {
  var colCount = goog.structs.getCount(col);
  if (this.getCount() > colCount) {
    return !1;
  }
  !(col instanceof goog.structs.Set) && 5 < colCount && (col = new goog.structs.Set(col));
  return goog.structs.every(this, function(value) {
    return goog.structs.contains(col, value);
  });
};
goog.structs.Set.prototype.__iterator__ = function() {
  return this.map_.__iterator__(!1);
};
lf.structs.set = {};
lf.structs.SetPolyFill_ = function(opt_values) {
  this.set_ = new goog.structs.Set(opt_values);
  Object.defineProperty(this, "size", {get:function() {
    return this.set_.getCount();
  }});
};
lf.structs.SetPolyFill_.prototype.add = function(value) {
  this.set_.add(value);
};
goog.exportProperty(lf.structs.SetPolyFill_.prototype, "add", lf.structs.SetPolyFill_.prototype.add);
lf.structs.SetPolyFill_.prototype.clear = function() {
  this.set_.clear();
};
goog.exportProperty(lf.structs.SetPolyFill_.prototype, "clear", lf.structs.SetPolyFill_.prototype.clear);
lf.structs.SetPolyFill_.prototype.delete = function(value) {
  return this.set_.remove(value);
};
goog.exportProperty(lf.structs.SetPolyFill_.prototype, "delete", lf.structs.SetPolyFill_.prototype.delete);
lf.structs.SetPolyFill_.prototype.forEach = function(fn, opt_this) {
  this.set_.getValues().forEach(fn, opt_this);
};
lf.structs.SetPolyFill_.prototype.has = function(value) {
  return this.set_.contains(value);
};
goog.exportProperty(lf.structs.SetPolyFill_.prototype, "has", lf.structs.SetPolyFill_.prototype.has);
lf.structs.set.create = function(opt_iterable) {
  return window.Set && window.Set.prototype.values && window.Set.prototype.forEach ? new window.Set(opt_iterable) : new lf.structs.SetPolyFill_(opt_iterable);
};
lf.structs.set.values = function(set) {
  if (set instanceof lf.structs.SetPolyFill_) {
    return set.set_.getValues();
  }
  var i = 0, array = Array(set.size);
  set.forEach(function(v) {
    array[i++] = v;
  });
  return array;
};
lf.structs.set.diff = function(set1, set2) {
  if (set1 instanceof lf.structs.SetPolyFill_) {
    var result = new lf.structs.SetPolyFill_;
    result.set_ = set1.set_.difference(set2.set_);
  } else {
    result = lf.structs.set.create(), lf.structs.set.values(set1).forEach(function(v) {
      set2.has(v) || result.add(v);
    });
  }
  return result;
};
lf.structs.set.isSubset = function(set1, set2) {
  if (set2.size > set1.size) {
    return !1;
  }
  var result = !0;
  set2.forEach(function(value) {
    result = result && set1.has(value);
  });
  return result;
};
lf.structs.set.equals = function(set1, set2) {
  return set1.size == set2.size && lf.structs.set.isSubset(set1, set2);
};
lf.backstore.Page = function(id, opt_payload) {
  this.id_ = id;
  this.payload_ = opt_payload || {};
};
lf.backstore.Page.BUNDLE_EXPONENT = 9;
lf.backstore.Page.toPageIds = function(rowIds) {
  var pageIds = lf.structs.set.create();
  rowIds.forEach(function(id) {
    pageIds.add(lf.backstore.Page.toPageId(id));
  });
  return lf.structs.set.values(pageIds);
};
lf.backstore.Page.toPageId = function(rowId) {
  return rowId >> lf.backstore.Page.BUNDLE_EXPONENT;
};
lf.backstore.Page.getPageRange = function(pageId) {
  return [pageId << lf.backstore.Page.BUNDLE_EXPONENT, (pageId + 1 << lf.backstore.Page.BUNDLE_EXPONENT) - 1];
};
lf.backstore.Page.prototype.getId = function() {
  return this.id_;
};
lf.backstore.Page.prototype.getPayload = function() {
  return this.payload_;
};
lf.backstore.Page.prototype.setRows = function(rows) {
  rows.forEach(function(row) {
    this.payload_[row.id()] = row.serialize();
  }, this);
};
lf.backstore.Page.prototype.removeRows = function(ids) {
  ids.forEach(function(id) {
    goog.object.remove(this.payload_, id);
  }, this);
};
lf.backstore.Page.prototype.serialize = function() {
  return {id:this.id_, value:JSON.stringify(this.payload_)};
};
lf.backstore.Page.deserialize = function(data) {
  return new lf.backstore.Page(data.id, JSON.parse(data.value));
};
lf.backstore.TableType = {DATA:0, INDEX:1};
lf.backstore.BundledObjectStore = function(store, deserializeFn, retrievePageFn) {
  this.store_ = store;
  this.deserializeFn_ = deserializeFn;
  this.retrievePageFn_ = retrievePageFn;
};
lf.backstore.BundledObjectStore.prototype.get = function(ids) {
  return 0 == ids.length ? this.getAll_() : this.getPagesByRowIds_(ids).then(goog.bind(function(pages) {
    return ids.map(function(id) {
      var page = pages.get(lf.backstore.Page.toPageId(id));
      goog.asserts.assert(page, "Containing page is empty");
      return this.deserializeFn_(page.getPayload()[id]);
    }, this);
  }, this));
};
lf.backstore.BundledObjectStore.prototype.getPagesByRowIds_ = function(rowIds) {
  var results = lf.structs.map.create(), resolver = goog.Promise.withResolver(), pageIds = lf.backstore.Page.toPageIds(rowIds), promises = pageIds.map(function(id) {
    return new goog.Promise(function(resolve, reject) {
      var request;
      try {
        request = this.store_.get(id);
      } catch (e) {
        reject(e);
        return;
      }
      request.onerror = reject;
      request.onsuccess = goog.bind(function(ev) {
        var page = lf.backstore.Page.deserialize(ev.target.result);
        results.set(page.getId(), page);
        resolve();
      }, this);
    }, this);
  }, this);
  goog.Promise.all(promises).then(function() {
    resolver.resolve(results);
  });
  return resolver.promise;
};
lf.backstore.BundledObjectStore.prototype.getAll_ = function() {
  return new goog.Promise(function(resolve, reject) {
    var rows = [], request;
    try {
      request = this.store_.openCursor();
    } catch (e) {
      reject(e);
      return;
    }
    request.onerror = reject;
    request.onsuccess = goog.bind(function() {
      var cursor = request.result;
      if (cursor) {
        var page = lf.backstore.Page.deserialize(cursor.value), data = page.getPayload(), key;
        for (key in data) {
          rows.push(this.deserializeFn_(data[key]));
        }
        cursor.continue();
      } else {
        resolve(rows);
      }
    }, this);
  }, this);
};
lf.backstore.BundledObjectStore.prototype.performWriteOp_ = function(reqFactory) {
  return new goog.Promise(function(resolve, reject) {
    var request;
    try {
      request = reqFactory();
    } catch (e) {
      reject(e);
      return;
    }
    request.onsuccess = resolve;
    request.onerror = reject;
  }, this);
};
lf.backstore.BundledObjectStore.prototype.put = function(rows) {
  if (0 == rows.length) {
    return goog.Promise.resolve();
  }
  var pages = lf.structs.map.create();
  rows.forEach(function(row) {
    var pageId = lf.backstore.Page.toPageId(row.id()), page = pages.get(pageId) || null;
    goog.isNull(page) && (page = this.retrievePageFn_(this.store_.name, pageId));
    page.setRows([row]);
    pages.set(pageId, page);
  }, this);
  var promises = lf.structs.map.values(pages).map(function(page) {
    return this.performWriteOp_(goog.bind(function() {
      return this.store_.put(page.serialize());
    }, this));
  }, this);
  return goog.Promise.all(promises);
};
lf.backstore.BundledObjectStore.prototype.remove = function(ids) {
  if (0 == ids.length) {
    return this.performWriteOp_(goog.bind(function() {
      return this.store_.clear();
    }, this));
  }
  var pages = lf.structs.map.create();
  ids.forEach(function(id) {
    var pageId = lf.backstore.Page.toPageId(id), page = pages.get(pageId) || null;
    goog.isNull(page) && (page = this.retrievePageFn_(this.store_.name, pageId));
    page.removeRows([id]);
    pages.set(pageId, page);
  }, this);
  var promises = lf.structs.map.values(pages).map(function(page) {
    return this.performWriteOp_(goog.bind(function() {
      return goog.object.isEmpty(page.getPayload()) ? this.store_.delete(page.getId()) : this.store_.put(page.serialize());
    }, this));
  }, this);
  return goog.Promise.all(promises);
};
lf.backstore.BundledObjectStore.getDataTablePage_ = function(global, tableName, pageId) {
  var cache = global.getService(lf.service.CACHE), range = lf.backstore.Page.getPageRange(pageId), rows = cache.getRange(tableName, range[0], range[1]), page = new lf.backstore.Page(pageId);
  page.setRows(rows);
  return page;
};
lf.backstore.BundledObjectStore.getIndexTablePage_ = function(tableName, pageId) {
  return new lf.backstore.Page(pageId);
};
lf.backstore.BundledObjectStore.forTableType = function(global, store, deserializeFn, tableType) {
  var retrievePageFn = tableType == lf.backstore.TableType.DATA ? goog.partial(lf.backstore.BundledObjectStore.getDataTablePage_, global) : lf.backstore.BundledObjectStore.getIndexTablePage_;
  return new lf.backstore.BundledObjectStore(store, deserializeFn, retrievePageFn);
};
lf.index.Favor = {RHS:-1, TIE:0, LHS:1};
lf.index.Comparator = function() {
};
lf.index.Index = function() {
};
lf.cache = {};
lf.cache.InMemoryUpdater = function(global) {
  this.cache_ = global.getService(lf.service.CACHE);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.schema_ = global.getService(lf.service.SCHEMA);
};
lf.cache.InMemoryUpdater.prototype.update = function(tableDiffs) {
  tableDiffs.forEach(function(tableDiff) {
    this.updateIndicesForDiff_(tableDiff);
    this.updateCacheForDiff_(tableDiff);
  }, this);
};
lf.cache.InMemoryUpdater.prototype.updateCacheForDiff_ = function(diff) {
  var tableName = diff.getName();
  diff.getDeleted().forEach(function(row, rowId) {
    this.cache_.remove(tableName, [rowId]);
  }, this);
  diff.getAdded().forEach(function(row) {
    this.cache_.set(tableName, [row]);
  }, this);
  diff.getModified().forEach(function(modification) {
    this.cache_.set(tableName, [modification[1]]);
  }, this);
};
lf.cache.InMemoryUpdater.prototype.updateIndicesForDiff_ = function(diff) {
  var table = this.schema_.table(diff.getName()), modifications = diff.getAsModifications();
  modifications.forEach(function(modification) {
    this.updateTableIndicesForRow(table, modification);
  }, this);
};
lf.cache.InMemoryUpdater.prototype.updateTableIndicesForRow = function(table, modification) {
  var indices = this.indexStore_.getTableIndices(table.getName()), updatedIndices = [];
  indices.forEach(function(index$$0) {
    try {
      this.updateTableIndexForRow_(index$$0, modification), updatedIndices.push(index$$0);
    } catch (e) {
      throw updatedIndices.forEach(function(index) {
        this.updateTableIndexForRow_(index, [modification[1], modification[0]]);
      }, this), e;
    }
  }, this);
};
lf.cache.InMemoryUpdater.prototype.updateTableIndexForRow_ = function(index, modification) {
  var keyNow = goog.isNull(modification[1]) ? void 0 : modification[1].keyOfIndex(index.getName()), keyThen = goog.isNull(modification[0]) ? void 0 : modification[0].keyOfIndex(index.getName());
  if (!goog.isDef(keyThen) && goog.isDef(keyNow)) {
    index.add(keyNow, modification[1].id());
  } else {
    if (goog.isDef(keyThen) && goog.isDef(keyNow)) {
      if (goog.isNull(keyNow) || goog.isNull(keyThen)) {
        if (keyNow == keyThen) {
          return;
        }
      } else {
        if (index.comparator().compare(keyThen, keyNow) == lf.index.Favor.TIE) {
          return;
        }
      }
      index.add(keyNow, modification[1].id());
      index.remove(keyThen, modification[0].id());
    } else {
      goog.isDef(keyThen) && !goog.isDef(keyNow) && index.remove(keyThen, modification[0].id());
    }
  }
};
lf.type = {};
lf.ConstraintAction = {};
goog.exportSymbol("lf.ConstraintAction", lf.ConstraintAction);
lf.ConstraintAction.RESTRICT = 0;
goog.exportProperty(lf.ConstraintAction, "RESTRICT", lf.ConstraintAction.RESTRICT);
lf.ConstraintAction.CASCADE = 1;
goog.exportProperty(lf.ConstraintAction, "CASCADE", lf.ConstraintAction.CASCADE);
lf.ConstraintTiming = {};
goog.exportSymbol("lf.ConstraintTiming", lf.ConstraintTiming);
lf.ConstraintTiming.IMMEDIATE = 0;
goog.exportProperty(lf.ConstraintTiming, "IMMEDIATE", lf.ConstraintTiming.IMMEDIATE);
lf.ConstraintTiming.DEFERRABLE = 1;
goog.exportProperty(lf.ConstraintTiming, "DEFERRABLE", lf.ConstraintTiming.DEFERRABLE);
lf.Order = {};
goog.exportSymbol("lf.Order", lf.Order);
lf.Order.DESC = 0;
goog.exportProperty(lf.Order, "DESC", lf.Order.DESC);
lf.Order.ASC = 1;
goog.exportProperty(lf.Order, "ASC", lf.Order.ASC);
lf.Type = {};
goog.exportSymbol("lf.Type", lf.Type);
lf.Type.ARRAY_BUFFER = 0;
goog.exportProperty(lf.Type, "ARRAY_BUFFER", lf.Type.ARRAY_BUFFER);
lf.Type.BOOLEAN = 1;
goog.exportProperty(lf.Type, "BOOLEAN", lf.Type.BOOLEAN);
lf.Type.DATE_TIME = 2;
goog.exportProperty(lf.Type, "DATE_TIME", lf.Type.DATE_TIME);
lf.Type.INTEGER = 3;
goog.exportProperty(lf.Type, "INTEGER", lf.Type.INTEGER);
lf.Type.NUMBER = 4;
goog.exportProperty(lf.Type, "NUMBER", lf.Type.NUMBER);
lf.Type.STRING = 5;
goog.exportProperty(lf.Type, "STRING", lf.Type.STRING);
lf.Type.OBJECT = 6;
goog.exportProperty(lf.Type, "OBJECT", lf.Type.OBJECT);
lf.type.DEFAULT_VALUES = {0:null, 1:!1, 2:Object.freeze(new Date(0)), 3:0, 4:0, 5:"", 6:null};
goog.exportSymbol("lf.type.DEFAULT_VALUES", lf.type.DEFAULT_VALUES);

lf.Exception = function(code, var_args) {
  this.code = code;
  this.message = "http://sn.im/2a0j3wn?c=" + code;
  if (1 < arguments.length) {
    for (var i = 1;i <= Math.min(4, arguments.length - 1);++i) {
      this.message += "&p" + (i - 1) + "=" + goog.string.urlEncode(arguments[i].toString().slice(0, 64));
    }
  }
};
goog.inherits(lf.Exception, Error);
lf.cache.ConstraintChecker = function(global) {
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.schema_ = global.getService(lf.service.SCHEMA);
};
lf.cache.ConstraintChecker.prototype.findExistingRowIdInPkIndex = function(table, row) {
  var pkIndexSchema = table.getConstraint().getPrimaryKey();
  return goog.isNull(pkIndexSchema) ? null : this.findExistingRowIdInIndex_(pkIndexSchema, row);
};
lf.cache.ConstraintChecker.prototype.findExistingRowIdInIndex_ = function(indexSchema, row) {
  var indexName = indexSchema.getNormalizedName(), indexKey = row.keyOfIndex(indexName), index = this.indexStore_.get(indexName), rowIds = index.get(indexKey);
  return 0 == rowIds.length ? null : rowIds[0];
};
lf.cache.ConstraintChecker.prototype.checkNotNullable = function(table, rows) {
  var notNullable = table.getConstraint().getNotNullable();
  rows.forEach(function(row) {
    notNullable.forEach(function(column) {
      if (!goog.isDefAndNotNull(row.payload()[column.getName()])) {
        throw new lf.Exception(202, column.getNormalizedName());
      }
    }, this);
  }, this);
};
lf.cache.ConstraintChecker.prototype.checkReferredKeys_ = function(table, modifications, constraintTiming) {
  var foreignKeySpecs = table.getConstraint().getForeignKeys();
  foreignKeySpecs.forEach(function(foreignKeySpec) {
    foreignKeySpec.timing == constraintTiming && this.checkReferredKey_(foreignKeySpec, modifications);
  }, this);
};
lf.cache.ConstraintChecker.prototype.checkReferredKey_ = function(foreignKeySpec, modifications) {
  var parentIndex = this.getParentIndex_(foreignKeySpec);
  modifications.forEach(function(modification) {
    var didColumnValueChange = lf.cache.ConstraintChecker.didColumnValueChange_(modification[0], modification[1], foreignKeySpec.name);
    if (didColumnValueChange) {
      var rowAfter = modification[1], parentKey = rowAfter.payload()[foreignKeySpec.childColumn];
      if (!goog.isNull(parentKey) && !parentIndex.containsKey(parentKey)) {
        throw new lf.Exception(203, foreignKeySpec.name);
      }
    }
  }, this);
};
lf.cache.ConstraintChecker.prototype.getParentIndex_ = function(foreignKeySpec) {
  var parentTable = this.schema_.table(foreignKeySpec.parentTable), parentColumn = parentTable[foreignKeySpec.parentColumn], parentIndexSchema = parentColumn.getIndices().filter(function(indexSchema) {
    return 1 == indexSchema.columns.length && indexSchema.columns[0].schema.getName() == foreignKeySpec.parentColumn;
  })[0];
  return this.indexStore_.get(parentIndexSchema.getNormalizedName());
};
lf.cache.ConstraintChecker.didColumnValueChange_ = function(rowBefore, rowAfter, indexName) {
  var deletionOrAddition = goog.isNull(rowBefore) ? !goog.isNull(rowAfter) : goog.isNull(rowAfter);
  return deletionOrAddition || rowBefore.keyOfIndex(indexName) != rowAfter.keyOfIndex(indexName);
};
lf.cache.ConstraintChecker.prototype.checkReferringKeys_ = function(table, modifications, constraintTiming) {
  var parentForeignKeys = this.schema_.info().getReferencingForeignKeys(table.getName());
  goog.isDefAndNotNull(parentForeignKeys) && parentForeignKeys.forEach(function(foreignKeySpec) {
    if (foreignKeySpec.timing == constraintTiming) {
      var childIndex = this.indexStore_.get(foreignKeySpec.name);
      modifications.forEach(function(modification) {
        var parentIndex = this.getParentIndex_(foreignKeySpec), didColumnValueChange = lf.cache.ConstraintChecker.didColumnValueChange_(modification[0], modification[1], parentIndex.getName());
        if (didColumnValueChange) {
          var rowBefore = modification[0], parentKey = rowBefore.payload()[foreignKeySpec.parentColumn];
          if (childIndex.containsKey(parentKey)) {
            throw new lf.Exception(203, foreignKeySpec.name);
          }
        }
      }, this);
    }
  }, this);
};
lf.cache.ConstraintChecker.prototype.checkForeignKeysForInsert = function(table, rows, constraintTiming) {
  if (0 != rows.length) {
    var modifications = rows.map(function(row) {
      return [null, row];
    });
    this.checkReferredKeys_(table, modifications, constraintTiming);
  }
};
lf.cache.ConstraintChecker.prototype.checkForeignKeysForUpdate = function(table, modifications, constraintTiming) {
  0 != modifications.length && (this.checkReferredKeys_(table, modifications, constraintTiming), this.checkReferringKeys_(table, modifications, constraintTiming));
};
lf.cache.ConstraintChecker.prototype.checkForeignKeysForDelete = function(table, rows, constraintTiming) {
  if (0 != rows.length) {
    var modifications = rows.map(function(row) {
      return [row, null];
    });
    this.checkReferringKeys_(table, modifications, constraintTiming);
  }
};
lf.cache.TableDiff = function(name) {
  this.added_ = lf.structs.map.create();
  this.modified_ = lf.structs.map.create();
  this.deleted_ = lf.structs.map.create();
  this.name_ = name;
};
lf.cache.TableDiff.prototype.getName = function() {
  return this.name_;
};
lf.cache.TableDiff.prototype.getAdded = function() {
  return this.added_;
};
lf.cache.TableDiff.prototype.getModified = function() {
  return this.modified_;
};
lf.cache.TableDiff.prototype.getDeleted = function() {
  return this.deleted_;
};
lf.cache.TableDiff.prototype.add = function(row) {
  if (this.deleted_.has(row.id())) {
    var modification = [this.deleted_.get(row.id()), row];
    this.modified_.set(row.id(), modification);
    this.deleted_.delete(row.id());
  } else {
    this.added_.set(row.id(), row);
  }
};
lf.cache.TableDiff.prototype.modify = function(modification) {
  var oldValue = modification[0], newValue = modification[1];
  goog.asserts.assert(oldValue.id() == newValue.id(), "Row ID mismatch between old/new values.");
  var id = oldValue.id();
  if (this.added_.has(id)) {
    this.added_.set(id, newValue);
  } else {
    if (this.modified_.has(id)) {
      var overallModification = [this.modified_.get(modification[0].id())[0], newValue];
      this.modified_.set(id, overallModification);
    } else {
      this.modified_.set(id, modification);
    }
  }
};
lf.cache.TableDiff.prototype.delete = function(row) {
  if (this.added_.has(row.id())) {
    this.added_.delete(row.id());
  } else {
    if (this.modified_.has(row.id())) {
      var originalRow = this.modified_.get(row.id())[0];
      this.modified_.delete(row.id());
      this.deleted_.set(row.id(), originalRow);
    } else {
      this.deleted_.set(row.id(), row);
    }
  }
};
lf.cache.TableDiff.prototype.getAsModifications = function() {
  var modifications = [];
  this.added_.forEach(function(row) {
    modifications.push([null, row]);
  });
  this.modified_.forEach(function(modification) {
    modifications.push(modification);
  });
  this.deleted_.forEach(function(row) {
    modifications.push([row, null]);
  });
  return modifications;
};
lf.cache.TableDiff.prototype.toString = function() {
  return "[" + lf.structs.map.keys(this.added_).toString() + "], [" + lf.structs.map.keys(this.modified_).toString() + "], [" + lf.structs.map.keys(this.deleted_).toString() + "]";
};
lf.cache.TableDiff.prototype.getReverse = function() {
  var reverseDiff = new lf.cache.TableDiff(this.name_);
  this.added_.forEach(function(row) {
    reverseDiff.delete(row);
  });
  this.deleted_.forEach(function(row) {
    reverseDiff.add(row);
  });
  this.modified_.forEach(function(modification) {
    reverseDiff.modify([modification[1], modification[0]]);
  });
  return reverseDiff;
};
lf.cache.TableDiff.prototype.isEmpty = function() {
  return 0 == this.added_.size && 0 == this.deleted_.size && 0 == this.modified_.size;
};
lf.cache.Journal = function(global, scope) {
  this.scope_ = lf.structs.map.create();
  scope.forEach(function(tableSchema) {
    this.scope_.set(tableSchema.getName(), tableSchema);
  }, this);
  this.cache_ = global.getService(lf.service.CACHE);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.constraintChecker_ = new lf.cache.ConstraintChecker(global);
  this.inMemoryUpdater_ = new lf.cache.InMemoryUpdater(global);
  this.pendingRollback_ = this.terminated_ = !1;
  this.tableDiffs_ = lf.structs.map.create();
};
lf.cache.Journal.prototype.getDiff = function() {
  return this.tableDiffs_;
};
lf.cache.Journal.prototype.getIndexDiff = function() {
  var tableSchemas = lf.structs.map.keys(this.tableDiffs_).map(function(tableName) {
    return this.scope_.get(tableName);
  }, this), indices = [];
  tableSchemas.forEach(function(tableSchema) {
    if (tableSchema.persistentIndex()) {
      var tableIndices = tableSchema.getIndices();
      tableIndices.forEach(function(indexSchema) {
        indices.push(this.indexStore_.get(indexSchema.getNormalizedName()));
      }, this);
      indices.push(this.indexStore_.get(tableSchema.getName() + ".#"));
    }
  }, this);
  return indices;
};
lf.cache.Journal.prototype.getScope = function() {
  return this.scope_;
};
lf.cache.Journal.prototype.getIndexScope = function() {
  var indexScope = [];
  this.scope_.forEach(function(tableSchema) {
    if (tableSchema.persistentIndex()) {
      var tableIndices = tableSchema.getIndices();
      tableIndices.forEach(function(indexSchema) {
        indexScope.push(indexSchema.getNormalizedName());
      });
      indexScope.push(tableSchema.getName() + ".#");
    }
  });
  return indexScope;
};
lf.cache.Journal.prototype.insert = function(table, rows) {
  this.assertJournalWritable_();
  this.checkScope_(table);
  this.constraintChecker_.checkNotNullable(table, rows);
  this.constraintChecker_.checkForeignKeysForInsert(table, rows, lf.ConstraintTiming.IMMEDIATE);
  for (var i = 0;i < rows.length;i++) {
    this.modifyRow_(table, [null, rows[i]]);
  }
};
lf.cache.Journal.prototype.modifyRow_ = function(table, modification) {
  var tableName = table.getName(), diff = this.tableDiffs_.get(tableName) || new lf.cache.TableDiff(tableName);
  this.tableDiffs_.set(tableName, diff);
  try {
    this.inMemoryUpdater_.updateTableIndicesForRow(table, modification);
  } catch (e) {
    throw this.pendingRollback_ = !0, e;
  }
  var rowBefore = modification[0], rowNow = modification[1];
  goog.isNull(rowBefore) && !goog.isNull(rowNow) ? (this.cache_.set(tableName, [rowNow]), diff.add(rowNow)) : goog.isNull(rowBefore) || goog.isNull(rowNow) ? !goog.isNull(rowBefore) && goog.isNull(rowNow) && (this.cache_.remove(tableName, [rowBefore.id()]), diff.delete(rowBefore)) : (this.cache_.set(tableName, [rowNow]), diff.modify(modification));
};
lf.cache.Journal.prototype.update = function(table, rows) {
  this.assertJournalWritable_();
  this.checkScope_(table);
  this.constraintChecker_.checkNotNullable(table, rows);
  for (var i = 0;i < rows.length;i++) {
    var row = rows[i], rowBefore = this.cache_.get([row.id()])[0], modification = [rowBefore, row];
    this.constraintChecker_.checkForeignKeysForUpdate(table, [modification], lf.ConstraintTiming.IMMEDIATE);
    this.modifyRow_(table, modification);
  }
};
lf.cache.Journal.prototype.insertOrReplace = function(table, rows) {
  this.assertJournalWritable_();
  this.checkScope_(table);
  this.constraintChecker_.checkNotNullable(table, rows);
  for (var i = 0;i < rows.length;i++) {
    var rowNow = rows[i], rowBefore = null, existingRowId = this.constraintChecker_.findExistingRowIdInPkIndex(table, rowNow);
    if (goog.isDefAndNotNull(existingRowId)) {
      rowBefore = this.cache_.get([existingRowId])[0];
      rowNow.assignRowId(existingRowId);
      var modification = [rowBefore, rowNow];
      this.constraintChecker_.checkForeignKeysForUpdate(table, [modification], lf.ConstraintTiming.IMMEDIATE);
    } else {
      this.constraintChecker_.checkForeignKeysForInsert(table, [rowNow], lf.ConstraintTiming.IMMEDIATE);
    }
    this.modifyRow_(table, [rowBefore, rowNow]);
  }
};
lf.cache.Journal.prototype.remove = function(table, rows) {
  this.assertJournalWritable_();
  this.checkScope_(table);
  this.constraintChecker_.checkForeignKeysForDelete(table, rows, lf.ConstraintTiming.IMMEDIATE);
  for (var i = 0;i < rows.length;i++) {
    this.modifyRow_(table, [rows[i], null]);
  }
};
lf.cache.Journal.prototype.checkDeferredConstraints = function() {
  this.tableDiffs_.forEach(function(tableDiff) {
    var table = this.scope_.get(tableDiff.getName());
    this.constraintChecker_.checkForeignKeysForInsert(table, lf.structs.map.values(tableDiff.getAdded()), lf.ConstraintTiming.DEFERRABLE);
    this.constraintChecker_.checkForeignKeysForDelete(table, lf.structs.map.values(tableDiff.getDeleted()), lf.ConstraintTiming.DEFERRABLE);
    this.constraintChecker_.checkForeignKeysForUpdate(table, lf.structs.map.values(tableDiff.getModified()), lf.ConstraintTiming.DEFERRABLE);
  }, this);
};
lf.cache.Journal.prototype.commit = function() {
  this.assertJournalWritable_();
  this.terminated_ = !0;
};
lf.cache.Journal.prototype.assertJournalWritable_ = function() {
  goog.asserts.assert(!this.pendingRollback_, "Attemptted to use journal that needs to be rolled back.");
  goog.asserts.assert(!this.terminated_, "Attemptted to commit a terminated journal.");
};
lf.cache.Journal.prototype.rollback = function() {
  goog.asserts.assert(!this.terminated_, "Attempted to rollback a terminated journal.");
  var reverseDiffs = lf.structs.map.values(this.tableDiffs_).map(function(tableDiff) {
    return tableDiff.getReverse();
  });
  this.inMemoryUpdater_.update(reverseDiffs);
  this.terminated_ = !0;
  this.pendingRollback_ = !1;
};
lf.cache.Journal.prototype.checkScope_ = function(tableSchema) {
  if (!this.scope_.has(tableSchema.getName())) {
    throw new lf.Exception(106, tableSchema.getName());
  }
};
lf.index.SingleKeyRange = function(from, to, excludeLower, excludeUpper) {
  this.from = from;
  this.to = to;
  this.excludeLower = goog.isNull(this.from) ? !1 : excludeLower;
  this.excludeUpper = goog.isNull(this.to) ? !1 : excludeUpper;
};
lf.index.SingleKeyRange.prototype.toString = function() {
  return (this.excludeLower ? "(" : "[") + (goog.isNull(this.from) ? "unbound" : this.from) + ", " + (goog.isNull(this.to) ? "unbound" : this.to) + (this.excludeUpper ? ")" : "]");
};
lf.index.SingleKeyRange.prototype.complement = function() {
  if (goog.isNull(this.from) && goog.isNull(this.to)) {
    return [];
  }
  var keyRangeLow = null, keyRangeHigh = null;
  goog.isNull(this.from) || (keyRangeLow = new lf.index.SingleKeyRange(null, this.from, !1, !this.excludeLower));
  goog.isNull(this.to) || (keyRangeHigh = new lf.index.SingleKeyRange(this.to, null, !this.excludeUpper, !1));
  return [keyRangeLow, keyRangeHigh].filter(function(keyRange) {
    return !goog.isNull(keyRange);
  });
};
lf.index.SingleKeyRange.prototype.reverse = function() {
  return new lf.index.SingleKeyRange(this.to, this.from, this.excludeUpper, this.excludeLower);
};
lf.index.SingleKeyRange.prototype.overlaps = function(range) {
  var favor = lf.index.SingleKeyRange.compareKey_(this.from, range.from, !0, this.excludeLower, range.excludeLower);
  if (favor == lf.index.Favor.TIE) {
    return !0;
  }
  var left = favor == lf.index.Favor.RHS ? this : range, right = favor == lf.index.Favor.LHS ? this : range;
  return goog.isNull(left.to) || left.to > right.from || left.to == right.from && !left.excludeUpper && !right.excludeLower;
};
lf.index.SingleKeyRange.upperBound = function(key, opt_shouldExclude) {
  return new lf.index.SingleKeyRange(null, key, !1, opt_shouldExclude || !1);
};
lf.index.SingleKeyRange.lowerBound = function(key, opt_shouldExclude) {
  return new lf.index.SingleKeyRange(key, null, opt_shouldExclude || !1, !1);
};
lf.index.SingleKeyRange.only = function(key) {
  return new lf.index.SingleKeyRange(key, key, !1, !1);
};
lf.index.SingleKeyRange.all = function() {
  return new lf.index.SingleKeyRange(null, null, !1, !1);
};
lf.index.SingleKeyRange.prototype.isAll = function() {
  return goog.isNull(this.from) && goog.isNull(this.to);
};
lf.index.SingleKeyRange.prototype.isOnly = function() {
  return goog.isDefAndNotNull(this.from) && this.from == this.to && !this.excludeLower && !this.excludeUpper;
};
lf.index.SingleKeyRange.prototype.contains = function(key) {
  var left = goog.isNull(this.from) || key > this.from || key == this.from && !this.excludeLower, right = goog.isNull(this.to) || key < this.to || key == this.to && !this.excludeUpper;
  return left && right;
};
lf.index.SingleKeyRange.prototype.equals = function(range) {
  return this.from == range.from && this.excludeLower == range.excludeLower && this.to == range.to && this.excludeUpper == range.excludeUpper;
};
lf.index.SingleKeyRange.xor = function(a, b) {
  return a ? !b : b;
};
lf.index.SingleKeyRange.compareKey_ = function(l, r, isLeftHandSide, opt_excludeL, opt_excludeR) {
  var Favor = lf.index.Favor, excludeL = opt_excludeL || !1, excludeR = opt_excludeR || !1, flip = function(favor) {
    return isLeftHandSide ? favor : favor == Favor.LHS ? Favor.RHS : Favor.LHS;
  }, tieLogic = function() {
    return lf.index.SingleKeyRange.xor(excludeL, excludeR) ? excludeL ? flip(Favor.LHS) : flip(Favor.RHS) : Favor.TIE;
  };
  return goog.isNull(l) ? goog.isNull(r) ? tieLogic() : flip(Favor.RHS) : goog.isNull(r) ? flip(Favor.LHS) : l < r ? Favor.RHS : l == r ? tieLogic() : Favor.LHS;
};
lf.index.SingleKeyRange.compare = function(lhs, rhs) {
  var result = lf.index.SingleKeyRange.compareKey_(lhs.from, rhs.from, !0, lhs.excludeLower, rhs.excludeLower);
  result == lf.index.Favor.TIE && (result = lf.index.SingleKeyRange.compareKey_(lhs.to, rhs.to, !1, lhs.excludeUpper, rhs.excludeUpper));
  return result;
};
lf.index.SingleKeyRange.getBoundingRange = function(r1, r2) {
  var r = lf.index.SingleKeyRange.all();
  if (!goog.isNull(r1.from) && !goog.isNull(r2.from)) {
    var favor = lf.index.SingleKeyRange.compareKey_(r1.from, r2.from, !0);
    favor != lf.index.Favor.LHS ? (r.from = r1.from, r.excludeLower = favor != lf.index.Favor.TIE ? r1.excludeLower : r1.excludeLower && r2.excludeLower) : (r.from = r2.from, r.excludeLower = r2.excludeLower);
  }
  goog.isNull(r1.to) || goog.isNull(r2.to) || (favor = lf.index.SingleKeyRange.compareKey_(r1.to, r2.to, !1), favor != lf.index.Favor.RHS ? (r.to = r1.to, r.excludeUpper = favor != lf.index.Favor.TIE ? r1.excludeUpper : r1.excludeUpper && r2.excludeUpper) : (r.to = r2.to, r.excludeUpper = r2.excludeUpper));
  return r;
};
lf.index.SingleKeyRange.and = function(r1, r2) {
  if (!r1.overlaps(r2)) {
    return null;
  }
  var r = lf.index.SingleKeyRange.all(), favor = lf.index.SingleKeyRange.compareKey_(r1.from, r2.from, !0), left = favor == lf.index.Favor.TIE ? r1.excludeLower ? r1 : r2 : favor != lf.index.Favor.RHS ? r1 : r2;
  r.from = left.from;
  r.excludeLower = left.excludeLower;
  var right;
  goog.isNull(r1.to) || goog.isNull(r2.to) ? right = goog.isNull(r1.to) ? r2 : r1 : (favor = lf.index.SingleKeyRange.compareKey_(r1.to, r2.to, !1), right = favor == lf.index.Favor.TIE ? r1.excludeUpper ? r1 : r2 : favor == lf.index.Favor.RHS ? r1 : r2);
  r.to = right.to;
  r.excludeUpper = right.excludeUpper;
  return r;
};
lf.proc = {};
lf.proc.Relation = function(entries, tables) {
  this.entries = entries;
  this.tables_ = lf.structs.set.create(tables);
  this.aggregationResults_ = null;
};
lf.proc.Relation.prototype.isCompatible = function(relation) {
  return lf.structs.set.equals(this.tables_, relation.tables_);
};
lf.proc.Relation.assertCompatible_ = function(lhs, rhs) {
  goog.asserts.assert(lhs.isCompatible(rhs), "Intersection/union operations only apply to compatible relations.");
};
lf.proc.Relation.prototype.getTables = function() {
  return lf.structs.set.values(this.tables_);
};
lf.proc.Relation.prototype.isPrefixApplied = function() {
  return 1 < this.tables_.size;
};
lf.proc.Relation.prototype.getPayloads = function() {
  return this.entries.map(function(entry) {
    return entry.row.payload();
  });
};
lf.proc.Relation.prototype.getRowIds = function() {
  return this.entries.map(function(entry) {
    return entry.row.id();
  });
};
lf.proc.Relation.prototype.setAggregationResult = function(column, result) {
  goog.isNull(this.aggregationResults_) && (this.aggregationResults_ = lf.structs.map.create());
  this.aggregationResults_.set(column.getNormalizedName(), result);
};
lf.proc.Relation.prototype.getAggregationResult = function(column) {
  goog.asserts.assert(!goog.isNull(this.aggregationResults_), "getAggregationResult called before any results have been calculated.");
  var result = this.aggregationResults_.get(column.getNormalizedName());
  goog.asserts.assert(goog.isDef(result), "Could not find result for " + column.getNormalizedName());
  return result;
};
lf.proc.Relation.prototype.hasAggregationResult = function(column) {
  return !goog.isNull(this.aggregationResults_) && this.aggregationResults_.has(column.getNormalizedName());
};
lf.proc.Relation.emptyRelation_ = null;
lf.proc.Relation.createEmpty = function() {
  goog.isNull(lf.proc.Relation.emptyRelation_) && (lf.proc.Relation.emptyRelation_ = new lf.proc.Relation([], []));
  return lf.proc.Relation.emptyRelation_;
};
lf.proc.Relation.intersect = function(relations) {
  if (0 == relations.length) {
    return lf.proc.Relation.createEmpty();
  }
  for (var totalCount = relations.reduce(function(soFar, relation) {
    lf.proc.Relation.assertCompatible_(relations[0], relation);
    return soFar + relation.entries.length;
  }, 0), allEntries = Array(totalCount), entryCounter = 0, relationMaps = relations.map(function(relation) {
    var map = lf.structs.map.create();
    relation.entries.forEach(function(entry) {
      allEntries[entryCounter++] = entry;
      map.set(entry.id, entry);
    });
    return map;
  }), intersection = lf.structs.map.create(), i = 0;i < allEntries.length;i++) {
    var existsInAll = relationMaps.every(function(relation) {
      return relation.has(allEntries[i].id);
    });
    existsInAll && intersection.set(allEntries[i].id, allEntries[i]);
  }
  return new lf.proc.Relation(lf.structs.map.values(intersection), lf.structs.set.values(relations[0].tables_));
};
lf.proc.Relation.union = function(relations) {
  if (0 == relations.length) {
    return lf.proc.Relation.createEmpty();
  }
  var union = lf.structs.map.create();
  relations.forEach(function(relation) {
    lf.proc.Relation.assertCompatible_(relations[0], relation);
    relation.entries.forEach(function(entry) {
      union.set(entry.id, entry);
    });
  });
  return new lf.proc.Relation(lf.structs.map.values(union), lf.structs.set.values(relations[0].tables_));
};
lf.proc.Relation.fromRows = function(rows, tables) {
  var isPrefixApplied = 1 < tables.length, entries = rows.map(function(row) {
    return new lf.proc.RelationEntry(row, isPrefixApplied);
  });
  return new lf.proc.Relation(entries, tables);
};
lf.proc.RelationEntry = function(row, isPrefixApplied) {
  this.row = row;
  this.id = lf.proc.RelationEntry.getNextId_();
  this.isPrefixApplied_ = isPrefixApplied;
};
lf.proc.RelationEntry.id_ = 0;
lf.proc.RelationEntry.getNextId_ = function() {
  return lf.proc.RelationEntry.id_++;
};
lf.proc.RelationEntry.prototype.getField = function(column) {
  var alias = column.getAlias();
  return !goog.isNull(alias) && this.row.payload().hasOwnProperty(alias) ? this.row.payload()[alias] : this.isPrefixApplied_ ? this.row.payload()[column.getTable().getEffectiveName()][column.getName()] : this.row.payload()[column.getName()];
};
lf.proc.RelationEntry.prototype.setField = function(column, value) {
  var alias = column.getAlias();
  if (goog.isDefAndNotNull(alias)) {
    this.row.payload()[alias] = value;
  } else {
    if (this.isPrefixApplied_) {
      var tableName = column.getTable().getEffectiveName(), containerObj = this.row.payload()[tableName];
      goog.isDefAndNotNull(containerObj) || (containerObj = {}, this.row.payload()[tableName] = containerObj);
      containerObj[column.getName()] = value;
    } else {
      this.row.payload()[column.getName()] = value;
    }
  }
};
lf.proc.RelationEntry.combineEntries = function(leftEntry, leftEntryTables, rightEntry, rightEntryTables) {
  var result = {}, mergeEntry = function(entry, entryTables) {
    if (entry.isPrefixApplied_) {
      var payload = entry.row.payload(), prefix;
      for (prefix in payload) {
        result[prefix] = payload[prefix];
      }
    } else {
      goog.asserts.assert(!result.hasOwnProperty(entryTables[0]), "Attempted to join table with itself, without using table alias, or same alias " + entryTables[0] + "is reused for multiple tables."), result[entryTables[0]] = entry.row.payload();
    }
  };
  mergeEntry(leftEntry, leftEntryTables);
  mergeEntry(rightEntry, rightEntryTables);
  var row = new lf.Row(lf.Row.DUMMY_ID, result);
  return new lf.proc.RelationEntry(row, !0);
};
lf.bind = function(index) {
  return new lf.Binder(index);
};
goog.exportSymbol("lf.bind", lf.bind);
lf.Binder = function(index) {
  this.index_ = index;
};
goog.exportSymbol("lf.Binder", lf.Binder);
lf.Binder.prototype.getIndex = function() {
  return this.index_;
};
lf.eval = {};
lf.eval.Type = {BETWEEN:"between", EQ:"eq", GTE:"gte", GT:"gt", IN:"in", LTE:"lte", LT:"lt", MATCH:"match", NEQ:"neq"};
lf.eval.Registry = function() {
  var numberOrIntegerEvalMap = lf.eval.buildNumberEvaluatorMap_();
  this.evalMaps_ = lf.structs.map.create();
  this.evalMaps_.set(lf.Type.BOOLEAN, lf.eval.buildBooleanEvaluatorMap_());
  this.evalMaps_.set(lf.Type.DATE_TIME, lf.eval.buildDateEvaluatorMap_());
  this.evalMaps_.set(lf.Type.NUMBER, numberOrIntegerEvalMap);
  this.evalMaps_.set(lf.Type.INTEGER, numberOrIntegerEvalMap);
  this.evalMaps_.set(lf.Type.STRING, lf.eval.buildStringEvaluatorMap_());
};
goog.addSingletonGetter(lf.eval.Registry);
lf.eval.Registry.prototype.getEvaluator = function(columnType, evaluatorType) {
  var evaluationMap = this.evalMaps_.get(columnType) || null;
  goog.asserts.assert(!goog.isNull(evaluationMap), "Could not find evaluation map for " + columnType);
  var evaluatorFn = evaluationMap.get(evaluatorType) || null;
  goog.asserts.assert(!goog.isNull(evaluatorFn), "Could not find evaluator for " + columnType + ", " + evaluatorType);
  return evaluatorFn;
};
lf.eval.buildBooleanEvaluatorMap_ = function() {
  var map = lf.structs.map.create();
  map.set(lf.eval.Type.EQ, function(a, b) {
    return a == b;
  });
  map.set(lf.eval.Type.NEQ, function(a, b) {
    return a != b;
  });
  return map;
};
lf.eval.buildCommonEvaluatorMap_ = function() {
  var map = lf.eval.buildBooleanEvaluatorMap_();
  map.set(lf.eval.Type.BETWEEN, function(a, range) {
    return goog.isNull(a) || goog.isNull(range[0]) || goog.isNull(range[1]) ? !1 : a >= range[0] && a <= range[1];
  });
  map.set(lf.eval.Type.GTE, function(a, b) {
    return goog.isNull(a) || goog.isNull(b) ? !1 : a >= b;
  });
  map.set(lf.eval.Type.GT, function(a, b) {
    return goog.isNull(a) || goog.isNull(b) ? !1 : a > b;
  });
  map.set(lf.eval.Type.IN, function(rowValue, values) {
    return -1 != values.indexOf(rowValue);
  });
  map.set(lf.eval.Type.LTE, function(a, b) {
    return goog.isNull(a) || goog.isNull(b) ? !1 : a <= b;
  });
  map.set(lf.eval.Type.LT, function(a, b) {
    return goog.isNull(a) || goog.isNull(b) ? !1 : a < b;
  });
  return map;
};
lf.eval.buildNumberEvaluatorMap_ = function() {
  return lf.eval.buildCommonEvaluatorMap_();
};
lf.eval.buildStringEvaluatorMap_ = function() {
  var map = lf.eval.buildCommonEvaluatorMap_();
  map.set(lf.eval.Type.MATCH, function(value, regex) {
    if (goog.isNull(value) || goog.isNull(regex)) {
      return !1;
    }
    var re = new RegExp(regex);
    return re.test(value);
  });
  return map;
};
lf.eval.buildDateEvaluatorMap_ = function() {
  var map = lf.structs.map.create();
  map.set(lf.eval.Type.BETWEEN, function(a, range) {
    return goog.isNull(a) || goog.isNull(range[0]) || goog.isNull(range[1]) ? !1 : a.getTime() >= range[0].getTime() && a.getTime() <= range[1].getTime();
  });
  map.set(lf.eval.Type.EQ, function(a, b) {
    var aTime = goog.isNull(a) ? -1 : a.getTime(), bTime = goog.isNull(b) ? -1 : b.getTime();
    return aTime == bTime;
  });
  map.set(lf.eval.Type.GTE, function(a, b) {
    return goog.isNull(a) || goog.isNull(b) ? !1 : a.getTime() >= b.getTime();
  });
  map.set(lf.eval.Type.GT, function(a, b) {
    return goog.isNull(a) || goog.isNull(b) ? !1 : a.getTime() > b.getTime();
  });
  map.set(lf.eval.Type.IN, function(targetValue, values) {
    return values.some(function(value) {
      return value.getTime() == targetValue.getTime();
    });
  });
  map.set(lf.eval.Type.LTE, function(a, b) {
    return goog.isNull(a) || goog.isNull(b) ? !1 : a.getTime() <= b.getTime();
  });
  map.set(lf.eval.Type.LT, function(a, b) {
    return goog.isNull(a) || goog.isNull(b) ? !1 : a.getTime() < b.getTime();
  });
  map.set(lf.eval.Type.NEQ, function(a, b) {
    var aTime = goog.isNull(a) ? -1 : a.getTime(), bTime = goog.isNull(b) ? -1 : b.getTime();
    return aTime != bTime;
  });
  return map;
};
goog.structs.Node = function(key, value) {
  this.key_ = key;
  this.value_ = value;
};
goog.structs.Node.prototype.getKey = function() {
  return this.key_;
};
goog.structs.Node.prototype.getValue = function() {
  return this.value_;
};
goog.structs.Node.prototype.clone = function() {
  return new goog.structs.Node(this.key_, this.value_);
};
goog.structs.TreeNode = function(key, value) {
  goog.structs.Node.call(this, key, value);
  this.children_ = this.parent_ = null;
};
goog.inherits(goog.structs.TreeNode, goog.structs.Node);
goog.structs.TreeNode.EMPTY_ARRAY_ = [];
goog.structs.TreeNode.prototype.clone = function() {
  return new goog.structs.TreeNode(this.getKey(), this.getValue());
};
goog.structs.TreeNode.prototype.getParent = function() {
  return this.parent_;
};
goog.structs.TreeNode.prototype.isLeaf = function() {
  return !this.getChildCount();
};
goog.structs.TreeNode.prototype.getChildren = function() {
  return this.children_ || goog.structs.TreeNode.EMPTY_ARRAY_;
};
goog.structs.TreeNode.prototype.getChildAt = function(index) {
  return this.getChildren()[index] || null;
};
goog.structs.TreeNode.prototype.getChildCount = function() {
  return this.getChildren().length;
};
goog.structs.TreeNode.prototype.getDepth = function() {
  for (var depth = 0, node = this;node.getParent();) {
    depth++, node = node.getParent();
  }
  return depth;
};
goog.structs.TreeNode.prototype.getRoot = function() {
  for (var root = this;root.getParent();) {
    root = root.getParent();
  }
  return root;
};
goog.structs.TreeNode.prototype.contains = function(node) {
  var current = node;
  do {
    current = current.getParent();
  } while (current && current != this);
  return Boolean(current);
};
goog.structs.TreeNode.findCommonAncestor = function(var_args) {
  var ret = arguments[0];
  if (!ret) {
    return null;
  }
  for (var retDepth = ret.getDepth(), i = 1;i < arguments.length;i++) {
    for (var node = arguments[i], depth = node.getDepth();node != ret;) {
      depth <= retDepth && (ret = ret.getParent(), retDepth--), depth > retDepth && (node = node.getParent(), depth--);
    }
  }
  return ret;
};
goog.structs.TreeNode.prototype.traverse = function(f, opt_this) {
  if (!1 !== f.call(opt_this, this)) {
    for (var children = this.getChildren(), i = 0;i < children.length;i++) {
      children[i].traverse(f, opt_this);
    }
  }
};
goog.structs.TreeNode.prototype.setParent = function(parent) {
  this.parent_ = parent;
};
goog.structs.TreeNode.prototype.addChild = function(child) {
  this.addChildAt(child, this.children_ ? this.children_.length : 0);
};
goog.structs.TreeNode.prototype.addChildAt = function(child, index) {
  goog.asserts.assert(!child.getParent());
  child.setParent(this);
  this.children_ = this.children_ || [];
  goog.asserts.assert(0 <= index && index <= this.children_.length);
  goog.array.insertAt(this.children_, child, index);
};
goog.structs.TreeNode.prototype.removeChildAt = function(index) {
  var child = this.children_ && this.children_[index];
  return child ? (child.setParent(null), goog.array.removeAt(this.children_, index), 0 == this.children_.length && (this.children_ = null), child) : null;
};
goog.structs.TreeNode.prototype.removeChild = function(child) {
  return this.removeChildAt(goog.array.indexOf(this.getChildren(), child));
};
lf.Predicate = function() {
};
lf.PredicateProvider = function() {
};
lf.pred = {};
lf.pred.PredicateNode = function() {
  goog.structs.TreeNode.call(this, "", "");
  this.id_ = lf.pred.PredicateNode.nextId_++;
};
goog.inherits(lf.pred.PredicateNode, goog.structs.TreeNode);
lf.pred.PredicateNode.nextId_ = 0;
lf.pred.PredicateNode.prototype.getId = function() {
  return this.id_;
};
lf.pred.PredicateNode.prototype.setId = function(id) {
  this.id_ = id;
};
lf.pred.ValuePredicate = function(column, value, evaluatorType) {
  lf.pred.PredicateNode.call(this);
  this.column = column;
  this.value = value;
  this.evaluatorType = evaluatorType;
  var registry = lf.eval.Registry.getInstance();
  this.evaluatorFn_ = registry.getEvaluator(this.column.getType(), this.evaluatorType);
  this.isComplement_ = !1;
  this.binder_ = value;
};
goog.inherits(lf.pred.ValuePredicate, lf.pred.PredicateNode);
lf.pred.ValuePredicate.prototype.copy = function() {
  var clone = new lf.pred.ValuePredicate(this.column, this.value, this.evaluatorType);
  clone.setBinder(this.binder_);
  clone.setComplement(this.isComplement_);
  clone.setId(this.getId());
  return clone;
};
lf.pred.ValuePredicate.prototype.getColumns = function(opt_results) {
  return goog.isDefAndNotNull(opt_results) ? (opt_results.push(this.column), opt_results) : [this.column];
};
lf.pred.ValuePredicate.prototype.setComplement = function(isComplement) {
  this.isComplement_ = isComplement;
};
lf.pred.ValuePredicate.prototype.setBinder = function(binder) {
  this.binder_ = binder;
};
lf.pred.ValuePredicate.prototype.checkBinding_ = function() {
  var bound = !1;
  this.value instanceof lf.Binder || (bound = goog.isArray(this.value) ? !this.value.some(function(val) {
    return val instanceof lf.Binder;
  }) : !0);
  if (!bound) {
    throw new lf.Exception(501);
  }
};
lf.pred.ValuePredicate.prototype.eval = function(relation) {
  this.checkBinding_();
  if (this.evaluatorType == lf.eval.Type.IN) {
    return this.evalAsIn_(relation);
  }
  var entries = relation.entries.filter(function(entry) {
    return this.evaluatorFn_(entry.getField(this.column), this.value) != this.isComplement_;
  }, this);
  return new lf.proc.Relation(entries, relation.getTables());
};
lf.pred.ValuePredicate.prototype.bind = function(values) {
  var checkIndexWithinRange = function(index) {
    if (values.length <= index) {
      throw new lf.Exception(510);
    }
  };
  if (this.binder_ instanceof lf.Binder) {
    var index$$0 = this.binder_.getIndex();
    checkIndexWithinRange(index$$0);
    this.value = values[index$$0];
  } else {
    goog.isArray(this.binder_) && (this.value = this.binder_.map(function(val) {
      return val instanceof lf.Binder ? (checkIndexWithinRange(val.getIndex()), values[val.getIndex()]) : val;
    }));
  }
};
lf.pred.ValuePredicate.prototype.evalAsIn_ = function(relation) {
  goog.asserts.assert(this.evaluatorType == lf.eval.Type.IN, "ValuePredicate#evalAsIn_() called for wrong predicate type.");
  var valueSet = lf.structs.set.create(this.value), evaluatorFn = goog.bind(function(rowValue) {
    return goog.isNull(rowValue) ? !1 : valueSet.has(rowValue) != this.isComplement_;
  }, this), entries = relation.entries.filter(function(entry) {
    return evaluatorFn(entry.getField(this.column));
  }, this);
  return new lf.proc.Relation(entries, relation.getTables());
};
lf.pred.ValuePredicate.prototype.toString = function() {
  return "value_pred(" + this.column.getNormalizedName() + " " + this.evaluatorType + (this.isComplement_ ? "(complement)" : "") + " " + this.value + ")";
};
lf.pred.ValuePredicate.prototype.isKeyRangeCompatible = function() {
  this.checkBinding_();
  return !goog.isNull(this.value) && (this.evaluatorType == lf.eval.Type.BETWEEN || this.evaluatorType == lf.eval.Type.EQ || this.evaluatorType == lf.eval.Type.GT || this.evaluatorType == lf.eval.Type.GTE || this.evaluatorType == lf.eval.Type.LT || this.evaluatorType == lf.eval.Type.LTE);
};
lf.pred.ValuePredicate.prototype.toKeyRange = function() {
  goog.asserts.assert(this.isKeyRangeCompatible(), "Could not convert predicate to key range.");
  var keyRange = null, keyRange = this.evaluatorType == lf.eval.Type.BETWEEN ? new lf.index.SingleKeyRange(this.value[0], this.value[1], !1, !1) : this.evaluatorType == lf.eval.Type.EQ ? lf.index.SingleKeyRange.only(this.value) : this.evaluatorType == lf.eval.Type.GTE ? lf.index.SingleKeyRange.lowerBound(this.value) : this.evaluatorType == lf.eval.Type.GT ? lf.index.SingleKeyRange.lowerBound(this.value, !0) : this.evaluatorType == lf.eval.Type.LTE ? lf.index.SingleKeyRange.upperBound(this.value) : 
  lf.index.SingleKeyRange.upperBound(this.value, !0);
  return this.isComplement_ ? keyRange.complement() : [keyRange];
};
lf.query = {};
lf.query.Context = function(schema) {
  this.schema = schema;
  this.clonedFrom = this.predicateMap_ = null;
};
lf.query.Context.prototype.getPredicate = function(id) {
  goog.isNull(this.predicateMap_) && goog.isDefAndNotNull(this.where) && (this.predicateMap_ = lf.query.Context.buildPredicateMap_(this.where));
  var predicate = this.predicateMap_.get(id) || null;
  goog.asserts.assert(!goog.isNull(predicate));
  return predicate;
};
lf.query.Context.buildPredicateMap_ = function(rootPredicate) {
  var predicateMap = lf.structs.map.create();
  rootPredicate.traverse(function(node) {
    predicateMap.set(node.getId(), node);
  });
  return predicateMap;
};
lf.query.Context.prototype.cloneBase = function(context) {
  context.where && (this.where = context.where.copy());
  this.clonedFrom = context;
};
lf.query.Context.prototype.bind = function() {
  goog.asserts.assert(!goog.isDefAndNotNull(this.clonedFrom));
  return this;
};
lf.query.Context.prototype.bindValuesInSearchCondition = function(values) {
  var searchCondition = this.where;
  goog.isDefAndNotNull(searchCondition) && searchCondition.traverse(function(node) {
    node instanceof lf.pred.ValuePredicate && node.bind(values);
  });
};
lf.query.SelectContext = function(schema) {
  lf.query.Context.call(this, schema);
};
goog.inherits(lf.query.SelectContext, lf.query.Context);
lf.query.SelectContext.orderByToString = function(orderBy) {
  var out = "";
  orderBy.forEach(function(orderByEl, index) {
    out += orderByEl.column.getNormalizedName() + " ";
    out += orderByEl.order == lf.Order.ASC ? "ASC" : "DESC";
    index < orderBy.length - 1 && (out += ", ");
  });
  return out;
};
lf.query.SelectContext.prototype.getScope = function() {
  return lf.structs.set.create(this.from);
};
lf.query.SelectContext.prototype.clone = function() {
  var context = new lf.query.SelectContext(this.schema);
  context.cloneBase(this);
  this.columns && (context.columns = this.columns.slice());
  this.from && (context.from = this.from.slice());
  context.limit = this.limit;
  context.skip = this.skip;
  this.orderBy && (context.orderBy = this.orderBy.slice());
  this.groupBy && (context.groupBy = this.groupBy.slice());
  this.limitBinder && (context.limitBinder = this.limitBinder);
  this.skipBinder && (context.skipBinder = this.skipBinder);
  context.outerJoinPredicates = this.outerJoinPredicates;
  return context;
};
lf.query.SelectContext.prototype.bind = function(values) {
  lf.query.SelectContext.superClass_.bind.call(this, values);
  goog.isDefAndNotNull(this.limitBinder) && (this.limit = values[this.limitBinder.getIndex()]);
  goog.isDefAndNotNull(this.skipBinder) && (this.skip = values[this.skipBinder.getIndex()]);
  this.bindValuesInSearchCondition(values);
  return this;
};
lf.proc.PhysicalQueryPlan = function(rootNode, scope) {
  this.rootNode_ = rootNode;
  this.scope_ = scope;
};
lf.proc.PhysicalQueryPlan.prototype.getRoot = function() {
  return this.rootNode_;
};
lf.proc.PhysicalQueryPlan.prototype.explain = function() {
  return "plan description";
};
lf.proc.PhysicalQueryPlan.prototype.getScope = function() {
  return this.scope_;
};
lf.proc.PhysicalQueryPlan.getCombinedScope = function(plans) {
  var tableSet = lf.structs.set.create();
  plans.forEach(function(plan) {
    plan.getScope().forEach(tableSet.add.bind(tableSet));
  });
  return tableSet;
};
lf.proc.Task = function() {
};
lf.proc.TaskPriority = {OBSERVER_QUERY_TASK:0, EXTERNAL_CHANGE_TASK:1, USER_QUERY_TASK:2, TRANSACTION_TASK:2};
lf.proc.QueryTask = function(global, items) {
  this.global = global;
  this.backStore_ = global.getService(lf.service.BACK_STORE);
  this.queries = items.map(function(item) {
    return item.context;
  });
  this.plans_ = items.map(function(item) {
    return item.plan;
  });
  this.combinedScope_ = lf.proc.PhysicalQueryPlan.getCombinedScope(this.plans_);
  this.txType_ = this.detectType_();
  this.resolver_ = goog.Promise.withResolver();
};
lf.proc.QueryTask.prototype.detectType_ = function() {
  var txType = this.queries.some(function(query) {
    return !(query instanceof lf.query.SelectContext);
  }) ? lf.TransactionType.READ_WRITE : lf.TransactionType.READ_ONLY;
  return txType;
};
lf.proc.QueryTask.prototype.exec = function() {
  var journal = new lf.cache.Journal(this.global, this.combinedScope_), results = [], remainingPlans = this.plans_.slice(), sequentiallyExec = goog.bind(function() {
    var plan = remainingPlans.shift();
    if (plan) {
      var queryContext = this.queries[results.length];
      return plan.getRoot().exec(journal, queryContext).then(function(relations) {
        results.push(relations[0]);
        return sequentiallyExec();
      });
    }
    return goog.Promise.resolve();
  }, this);
  return sequentiallyExec().then(goog.bind(function() {
    var tx = this.backStore_.createTx(this.txType_, journal);
    return tx.commit();
  }, this)).then(goog.bind(function() {
    this.onSuccess(results);
    return results;
  }, this), goog.bind(function(e) {
    journal.rollback();
    throw e;
  }, this));
};
lf.proc.QueryTask.prototype.getType = function() {
  return this.txType_;
};
lf.proc.QueryTask.prototype.getScope = function() {
  return this.combinedScope_;
};
lf.proc.QueryTask.prototype.getResolver = function() {
  return this.resolver_;
};
lf.proc.QueryTask.prototype.getId = function() {
  return goog.getUid(this);
};
lf.proc.QueryTask.prototype.onSuccess = function() {
};
lf.proc.ObserverQueryTask = function(global, items) {
  lf.proc.QueryTask.call(this, global, items);
  this.observerRegistry_ = global.getService(lf.service.OBSERVER_REGISTRY);
};
goog.inherits(lf.proc.ObserverQueryTask, lf.proc.QueryTask);
lf.proc.ObserverQueryTask.prototype.getPriority = function() {
  return lf.proc.TaskPriority.OBSERVER_QUERY_TASK;
};
lf.proc.ObserverQueryTask.prototype.onSuccess = function(results) {
  var queries = this.queries;
  queries.forEach(function(query, index) {
    this.observerRegistry_.updateResultsForQuery(query, results[index]);
  }, this);
};
lf.proc.ExternalChangeTask = function(global, tableDiffs) {
  this.global_ = global;
  this.observerRegistry_ = global.getService(lf.service.OBSERVER_REGISTRY);
  this.runner_ = global.getService(lf.service.RUNNER);
  this.inMemoryUpdater_ = new lf.cache.InMemoryUpdater(global);
  this.tableDiffs_ = tableDiffs;
  var schema = global.getService(lf.service.SCHEMA), tableSchemas = this.tableDiffs_.map(function(tableDiff) {
    return schema.table(tableDiff.getName());
  });
  this.scope_ = lf.structs.set.create(tableSchemas);
  this.resolver_ = goog.Promise.withResolver();
};
lf.proc.ExternalChangeTask.prototype.exec = function() {
  this.inMemoryUpdater_.update(this.tableDiffs_);
  this.scheduleObserverTask_();
  return goog.Promise.resolve();
};
lf.proc.ExternalChangeTask.prototype.getType = function() {
  return lf.TransactionType.READ_WRITE;
};
lf.proc.ExternalChangeTask.prototype.getScope = function() {
  return this.scope_;
};
lf.proc.ExternalChangeTask.prototype.getResolver = function() {
  return this.resolver_;
};
lf.proc.ExternalChangeTask.prototype.getId = function() {
  return goog.getUid(this);
};
lf.proc.ExternalChangeTask.prototype.getPriority = function() {
  return lf.proc.TaskPriority.EXTERNAL_CHANGE_TASK;
};
lf.proc.ExternalChangeTask.prototype.scheduleObserverTask_ = function() {
  var items = this.observerRegistry_.getTaskItemsForTables(this.scope_);
  if (0 != items.length) {
    var observerTask = new lf.proc.ObserverQueryTask(this.global_, items);
    this.runner_.scheduleTask(observerTask);
  }
};
lf.backstore.ExternalChangeObserver = function(global) {
  this.global_ = global;
  this.backStore_ = global.getService(lf.service.BACK_STORE);
  this.runner_ = global.getService(lf.service.RUNNER);
};
lf.backstore.ExternalChangeObserver.prototype.startObserving = function() {
  this.backStore_.subscribe(this.onChange_.bind(this));
};
lf.backstore.ExternalChangeObserver.prototype.onChange_ = function(tableDiffs) {
  var externalChangeTask = new lf.proc.ExternalChangeTask(this.global_, tableDiffs);
  this.runner_.scheduleTask(externalChangeTask);
};
lf.BackStore = function() {
};
lf.raw = {};
lf.raw.BackStore = function() {
};
lf.backstore.FirebaseRawBackStore = function(version, dbRef) {
  this.version_ = version;
  this.db_ = dbRef;
  this.tableIds_ = lf.structs.map.create();
};
goog.exportSymbol("lf.backstore.FirebaseRawBackStore", lf.backstore.FirebaseRawBackStore);
lf.backstore.FirebaseRawBackStore.prototype.getRawDBInstance = function() {
  return this.db_;
};
lf.backstore.FirebaseRawBackStore.prototype.getRawTransaction = function() {
  throw new lf.Exception(351);
};
lf.backstore.FirebaseRawBackStore.getValue = function(ref, path) {
  var resolver = goog.Promise.withResolver(), valRef = ref;
  path.length && (valRef = ref.child(path));
  valRef.once("value", function(snapshot) {
    resolver.resolve(snapshot.val());
  }, function(e) {
    resolver.reject(e);
  });
  return resolver.promise;
};
lf.backstore.FirebaseRawBackStore.setValue = function(ref, value, opt_overwrite) {
  var overwrite = opt_overwrite || !1, resolver = goog.Promise.withResolver(), handler = function(e) {
    e ? resolver.reject(e) : resolver.resolve();
  };
  overwrite ? ref.set(value, handler) : ref.update(value, handler);
  return resolver.promise;
};
lf.backstore.FirebaseRawBackStore.prototype.init = function(schema) {
  return lf.backstore.FirebaseRawBackStore.getValue(this.db_, "@rev/R").then(function(revision) {
    this.revision_ = revision;
    return lf.backstore.FirebaseRawBackStore.getValue(this.db_, "@table");
  }.bind(this)).then(function(tableIdMap) {
    var maxTableId = 0, t;
    for (t in tableIdMap) {
      this.tableIds_.set(t, tableIdMap[t]), tableIdMap[t] > maxTableId && (maxTableId = tableIdMap[t]);
    }
    schema.tables().forEach(function(table) {
      this.tableIds_.has(table.getName()) || (tableIdMap[table.getName()] = ++maxTableId);
    }, this);
    var ref = this.db_.child("@table");
    return lf.backstore.FirebaseRawBackStore.setValue(ref, tableIdMap);
  }.bind(this));
};
lf.backstore.FirebaseRawBackStore.prototype.transform_ = function(tableName, callback) {
  var tableId = this.tableIds_.get(tableName);
  if (!goog.isDefAndNotNull(tableId)) {
    return goog.Promise.resolve();
  }
  var getRowUpdates = function() {
    var toUpdate = {}, resolver = goog.Promise.withResolver();
    this.db_.orderByChild("T").equalTo(tableId).once("value", function(snapshot) {
      snapshot.forEach(function(row) {
        var newRow = callback(row.val());
        toUpdate[parseInt(row.key(), 10)] = newRow;
      });
      resolver.resolve(toUpdate);
    });
    return resolver.promise;
  }.bind(this);
  return getRowUpdates().then(function(toUpdate) {
    toUpdate["@rev"] = {R:++this.revision_};
    return lf.backstore.FirebaseRawBackStore.setValue(this.db_, toUpdate);
  }.bind(this));
};
lf.backstore.FirebaseRawBackStore.prototype.dropTable = function(tableName) {
  return this.transform_(tableName, function() {
    return null;
  }).then(function() {
    this.tableIds_.delete(tableName);
    return lf.backstore.FirebaseRawBackStore.setValue(this.db_.child("@table/" + tableName), null, !0);
  }.bind(this));
};
goog.exportProperty(lf.backstore.FirebaseRawBackStore.prototype, "dropTable", lf.backstore.FirebaseRawBackStore.prototype.dropTable);
lf.backstore.FirebaseRawBackStore.prototype.addTableColumn = function(tableName, columnName, defaultValue) {
  return this.transform_(tableName, function(row) {
    var payload = row.P;
    payload[columnName] = defaultValue;
    return {R:this.revision_ + 1, T:row.T, P:payload};
  }.bind(this));
};
goog.exportProperty(lf.backstore.FirebaseRawBackStore.prototype, "addTableColumn", lf.backstore.FirebaseRawBackStore.prototype.addTableColumn);
lf.backstore.FirebaseRawBackStore.prototype.dropTableColumn = function(tableName, columnName) {
  return this.transform_(tableName, function(row) {
    var payload = row.P;
    delete payload[columnName];
    return {R:this.revision_ + 1, T:row.T, P:payload};
  }.bind(this));
};
goog.exportProperty(lf.backstore.FirebaseRawBackStore.prototype, "dropTableColumn", lf.backstore.FirebaseRawBackStore.prototype.dropTableColumn);
lf.backstore.FirebaseRawBackStore.prototype.renameTableColumn = function(tableName, oldColumnName, newColumnName) {
  return this.transform_(tableName, function(row) {
    var payload = row.P;
    payload[newColumnName] = payload[oldColumnName];
    delete payload[oldColumnName];
    return {R:this.revision_ + 1, T:row.T, P:payload};
  }.bind(this));
};
goog.exportProperty(lf.backstore.FirebaseRawBackStore.prototype, "renameTableColumn", lf.backstore.FirebaseRawBackStore.prototype.renameTableColumn);
lf.backstore.FirebaseRawBackStore.prototype.createRow = function() {
  throw new lf.Exception(351);
};
goog.exportProperty(lf.backstore.FirebaseRawBackStore.prototype, "createRow", lf.backstore.FirebaseRawBackStore.prototype.createRow);
lf.backstore.FirebaseRawBackStore.prototype.getVersion = function() {
  return this.version_;
};
goog.exportProperty(lf.backstore.FirebaseRawBackStore.prototype, "getVersion", lf.backstore.FirebaseRawBackStore.prototype.getVersion);
lf.backstore.FirebaseRawBackStore.prototype.dumpTable_ = function(tableName) {
  var resolver = goog.Promise.withResolver(), tableId = this.tableIds_.get(tableName);
  this.db_.orderByChild("T").equalTo(tableId).once("value", function(snapshot) {
    var values = [];
    snapshot.forEach(function(row) {
      values.push(row.val().P);
    });
    resolver.resolve(values);
  });
  return resolver.promise;
};
lf.backstore.FirebaseRawBackStore.prototype.dump = function() {
  var contents = {}, promises = lf.structs.map.keys(this.tableIds_).map(function(tableName) {
    return this.dumpTable_(tableName).then(function(rows) {
      contents[tableName] = rows;
    });
  }.bind(this));
  return goog.Promise.all(promises).then(function() {
    return contents;
  });
};
goog.exportProperty(lf.backstore.FirebaseRawBackStore.prototype, "dump", lf.backstore.FirebaseRawBackStore.prototype.dump);
lf.backstore.FirebaseTx = function(db, type, journal) {
  lf.backstore.BaseTx.call(this, journal, type);
  this.db_ = db;
};
goog.inherits(lf.backstore.FirebaseTx, lf.backstore.BaseTx);
lf.backstore.FirebaseTx.prototype.getTable = function(name) {
  return this.db_.getTableInternal(name);
};
lf.backstore.FirebaseTx.prototype.commitInternal = function() {
  var diffs = this.getJournal().getDiff(), numTableAffected = diffs.size;
  if (0 == numTableAffected) {
    this.resolver.resolve();
  } else {
    var rev = this.db_.getRevision() + 1;
    this.db_.setRevision(rev);
    var update = {"@rev":{R:rev}};
    diffs.forEach(function(diff, tableName) {
      var tid = this.db_.getTableId(tableName);
      diff.getAdded().forEach(function(row, rowId) {
        update[rowId] = {R:rev, T:tid, P:row.payload()};
      });
      diff.getModified().forEach(function(rowPair, rowId) {
        update[rowId] = {R:rev, T:tid, P:rowPair[1].payload()};
      });
      diff.getDeleted().forEach(function(row, rowId) {
        update[rowId] = null;
      });
    }, this);
    this.db_.getRef().update(update, function(e) {
      if (goog.isNull(e)) {
        this.resolver.resolve();
      } else {
        this.db_.setRevision(rev - 1);
        var promises = lf.structs.map.values(diffs).map(function(diff) {
          return this.db_.reloadTable(diff.getName());
        }, this);
        goog.Promise.all(promises).then(this.resolver.reject.bind(this.resolver), this.resolver.reject.bind(this.resolver));
      }
    }.bind(this));
  }
  return this.resolver.promise;
};
lf.backstore.MemoryTable = function() {
  this.data_ = lf.structs.map.create();
};
lf.backstore.MemoryTable.prototype.getSync = function(ids) {
  if (0 == ids.length) {
    return lf.structs.map.values(this.data_);
  }
  var results = [];
  ids.forEach(function(id) {
    var row = this.data_.get(id) || null;
    goog.isNull(row) || results.push(row);
  }, this);
  return results;
};
lf.backstore.MemoryTable.prototype.getData = function() {
  return this.data_;
};
lf.backstore.MemoryTable.prototype.get = function(ids) {
  return goog.Promise.resolve(this.getSync(ids));
};
lf.backstore.MemoryTable.prototype.putSync = function(rows) {
  rows.forEach(function(row) {
    this.data_.set(row.id(), row);
  }, this);
};
lf.backstore.MemoryTable.prototype.put = function(rows) {
  this.putSync(rows);
  return goog.Promise.resolve();
};
lf.backstore.MemoryTable.prototype.removeSync = function(ids) {
  0 == ids.length || ids.length == this.data_.size ? this.data_.clear() : ids.forEach(function(id) {
    this.data_.delete(id);
  }, this);
};
lf.backstore.MemoryTable.prototype.remove = function(ids) {
  this.removeSync(ids);
  return goog.Promise.resolve();
};
lf.backstore.MemoryTable.prototype.getMaxRowId = function() {
  return 0 == this.data_.size ? 0 : lf.structs.map.keys(this.data_).reduce(function(prev, cur) {
    return prev > cur ? prev : cur;
  }, 0);
};
lf.backstore.Firebase = function(schema, fb) {
  this.schema_ = schema;
  this.app_ = fb;
  this.removedRows_ = lf.structs.map.create();
  this.revision_ = -1;
  this.tables_ = lf.structs.map.create();
  this.tableIds_ = lf.structs.map.create();
  this.changeHandler_ = null;
};
lf.backstore.Firebase.prototype.getRevision = function() {
  return this.revision_;
};
lf.backstore.Firebase.prototype.setRevision = function(revision) {
  this.revision_ = revision;
};
lf.backstore.Firebase.prototype.init = function(opt_onUpgrade) {
  this.db_ = this.app_.child(this.schema_.name());
  var getValue = lf.backstore.FirebaseRawBackStore.getValue, onUpgrade = opt_onUpgrade || function() {
    return goog.Promise.resolve();
  };
  return getValue(this.db_, "@db/version").then(function(version) {
    return goog.isNull(version) ? lf.backstore.FirebaseRawBackStore.setValue(this.db_, this.createNewDb_(), !0).then(function() {
      var rawDb = new lf.backstore.FirebaseRawBackStore(0, this.db_);
      return onUpgrade(rawDb);
    }.bind(this)) : version == this.schema_.version() ? getValue(this.db_, "@rev/R").then(function(revision) {
      this.revision_ = revision;
      return getValue(this.db_, "@table");
    }.bind(this)).then(function(tableIdMap) {
      for (var t in tableIdMap) {
        this.tableIds_.set(t, tableIdMap[t]);
      }
      var promises = this.schema_.tables().map(function(table) {
        return this.reloadTable(table.getName());
      }, this);
      return goog.Promise.all(promises);
    }.bind(this)).then(function() {
      this.initRowId_();
      this.listen_();
      return goog.Promise.resolve();
    }.bind(this)) : this.onUpgrade_(version, onUpgrade).then(function() {
      return this.init();
    }.bind(this));
  }.bind(this));
};
lf.backstore.Firebase.prototype.onUpgrade_ = function(oldVersion, onUpgrade) {
  var rawDb = new lf.backstore.FirebaseRawBackStore(oldVersion, this.db_);
  return rawDb.init(this.schema_).then(function() {
    return this.updateIndexTables_();
  }.bind(this)).then(function() {
    return onUpgrade(rawDb);
  }).then(function() {
    var ref = this.db_.child("@db");
    return lf.backstore.FirebaseRawBackStore.setValue(ref, {version:this.schema_.version()}, !0);
  }.bind(this));
};
lf.backstore.Firebase.prototype.updateIndexTables_ = function() {
  return goog.Promise.resolve();
};
lf.backstore.Firebase.prototype.listen_ = function() {
  this.db_.off();
  this.db_.on("child_removed", this.onRemoved_.bind(this));
  this.change_ && (this.change_.off(), this.removedRows_.clear());
  this.change_ = this.db_.orderByChild("R").startAt(this.revision_ + 1);
  this.change_.on("value", this.onChange_.bind(this));
};
lf.backstore.Firebase.prototype.initRowId_ = function() {
  var maxRowId = lf.structs.map.values(this.tables_).map(function(table) {
    return table.getMaxRowId();
  }).reduce(function(maxSoFar, cur) {
    return maxSoFar > cur ? maxSoFar : cur;
  }, 0);
  lf.Row.setNextId(maxRowId + 1);
};
lf.backstore.Firebase.prototype.onRemoved_ = function(snapshot) {
  var row = snapshot.val(), set = this.removedRows_.get(row.T) || null;
  goog.isNull(set) && (set = lf.structs.set.create(), this.removedRows_.set(row.T, set));
  set.add(parseInt(snapshot.key(), 10));
};
lf.backstore.Firebase.prototype.onChange_ = function(snapshot) {
  var rev = snapshot.child("@rev/R").val();
  if (goog.isDefAndNotNull(rev) && rev != this.revision_) {
    this.revision_ = rev;
    var diffs = this.generateDiff_(snapshot);
    diffs.forEach(function(diff) {
      var table = this.tables_.get(diff.getName()), toRemove = lf.structs.map.keys(diff.getDeleted());
      0 < toRemove.length && table.removeSync(toRemove);
      var rows = lf.structs.map.values(diff.getAdded());
      diff.getModified().forEach(function(rowPair) {
        rows.push(rowPair[1]);
      });
      table.putSync(rows);
    }, this);
    0 < diffs.length && this.notify(diffs);
    this.listen_();
  }
};
lf.backstore.Firebase.prototype.generateDiff_ = function(snapshot) {
  var removedIds = lf.structs.set.create(), diffs = lf.structs.map.create();
  this.tableIds_.forEach(function(tid, tableName) {
    var table = this.tables_.get(tableName), diff = new lf.cache.TableDiff(tableName);
    if (this.removedRows_.has(tid)) {
      var rowIds = lf.structs.set.values(this.removedRows_.get(tid));
      rowIds.forEach(function(rowId) {
        removedIds.add(rowId);
      });
      table.getSync(rowIds).forEach(function(row) {
        diff.delete(row);
      });
    }
    diffs.set(tid, diff);
  }.bind(this));
  snapshot.forEach(function(child) {
    if ("@rev" != child.key()) {
      var rowId = parseInt(child.key(), 10);
      if (!removedIds.has(rowId)) {
        var row = child.val(), diff = diffs.get(row.T), table = this.tables_.get(diff.getName());
        table.getData().has(rowId) ? diff.modify([table.getSync([rowId])[0], new lf.Row(rowId, row.P)]) : diff.add(new lf.Row(rowId, row.P));
      }
    }
  }.bind(this));
  return lf.structs.map.values(diffs).filter(function(diff) {
    return !diff.isEmpty();
  });
};
lf.backstore.Firebase.prototype.reloadTable = function(tableName) {
  var resolver = goog.Promise.withResolver(), tid = this.getTableId(tableName);
  this.db_.orderByChild("T").equalTo(tid).once("value", function(snapshot) {
    var memTable = new lf.backstore.MemoryTable, rows = [];
    snapshot.forEach(function(rowSnapshot) {
      rows.push(new lf.Row(parseInt(rowSnapshot.key(), 10), rowSnapshot.val().P));
    });
    memTable.putSync(rows);
    this.tables_.set(tableName, memTable);
    resolver.resolve();
  }.bind(this));
  return resolver.promise;
};
lf.backstore.Firebase.prototype.getTableId = function(name) {
  return this.tableIds_.get(name);
};
lf.backstore.Firebase.prototype.createNewDb_ = function() {
  var val = {};
  val["@db"] = {version:this.schema_.version()};
  val["@rev"] = {R:1};
  this.revision_ = 1;
  val["@table"] = {};
  this.schema_.tables().forEach(function(table, index) {
    var tableName = table.getName();
    val["@table"][tableName] = index;
    this.tables_.set(tableName, new lf.backstore.MemoryTable);
    this.tableIds_.set(tableName, index);
  }, this);
  return val;
};
lf.backstore.Firebase.prototype.createTx = function(type, journal) {
  return new lf.backstore.FirebaseTx(this, type, journal);
};
lf.backstore.Firebase.prototype.getTableInternal = function(tableName) {
  var table = this.tables_.get(tableName) || null;
  if (!goog.isNull(table)) {
    return table;
  }
  throw new lf.Exception(101, tableName);
};
lf.backstore.Firebase.prototype.getRef = function() {
  return this.db_;
};
lf.backstore.Firebase.prototype.close = function() {
};
lf.backstore.Firebase.prototype.subscribe = function(handler) {
  this.changeHandler_ = handler;
};
lf.backstore.Firebase.prototype.notify = function(changes) {
  goog.isDefAndNotNull(this.changeHandler_) && this.changeHandler_(changes);
};
lf.backstore.IndexedDBRawBackStore = function(version, db, tx, bundledMode) {
  this.db_ = db;
  this.tx_ = tx;
  this.version_ = version;
  this.bundleMode_ = bundledMode;
};
goog.exportSymbol("lf.backstore.IndexedDBRawBackStore", lf.backstore.IndexedDBRawBackStore);
lf.backstore.IndexedDBRawBackStore.prototype.getRawDBInstance = function() {
  return this.db_;
};
goog.exportProperty(lf.backstore.IndexedDBRawBackStore.prototype, "getRawDBInstance", lf.backstore.IndexedDBRawBackStore.prototype.getRawDBInstance);
lf.backstore.IndexedDBRawBackStore.prototype.getRawTransaction = function() {
  return this.tx_;
};
goog.exportProperty(lf.backstore.IndexedDBRawBackStore.prototype, "getRawTransaction", lf.backstore.IndexedDBRawBackStore.prototype.getRawTransaction);
lf.backstore.IndexedDBRawBackStore.prototype.dropTable = function(tableName) {
  return new goog.Promise(function(resolve, reject) {
    try {
      this.db_.deleteObjectStore(tableName);
    } catch (e) {
      reject(e);
      return;
    }
    resolve();
  }, this);
};
goog.exportProperty(lf.backstore.IndexedDBRawBackStore.prototype, "dropTable", lf.backstore.IndexedDBRawBackStore.prototype.dropTable);
lf.backstore.IndexedDBRawBackStore.prototype.openCursorForWrite_ = function(tableName, loopFunc, endFunc) {
  return new goog.Promise(function(resolve, reject) {
    var req;
    try {
      var store = this.tx_.objectStore(tableName);
      req = store.openCursor();
    } catch (e) {
      reject(e);
      return;
    }
    req.onsuccess = function() {
      var cursor = req.result;
      cursor ? (loopFunc(cursor), cursor.continue()) : (endFunc(store), resolve());
    };
    req.onerror = reject;
  }, this);
};
lf.backstore.IndexedDBRawBackStore.convert = function(value) {
  var ret = null;
  return ret = value instanceof ArrayBuffer ? lf.Row.binToHex(value) : value instanceof Date ? value.getTime() : value;
};
lf.backstore.IndexedDBRawBackStore.prototype.transformRows_ = function(tableName, rowFn) {
  var loopFunc = function(cursor) {
    var row = lf.Row.deserialize(cursor.value);
    rowFn(row);
    cursor.update(row.serialize());
  }, loopFuncBundle = function(cursor) {
    var page = lf.backstore.Page.deserialize(cursor.value), data = page.getPayload(), rowId;
    for (rowId in data) {
      var row = lf.Row.deserialize(data[rowId]);
      rowFn(row);
      data[rowId] = row.serialize();
    }
    cursor.update(page.serialize());
  }, endFunc = function() {
  };
  return this.openCursorForWrite_(tableName, this.bundleMode_ ? loopFuncBundle : loopFunc, endFunc);
};
lf.backstore.IndexedDBRawBackStore.prototype.addTableColumn = function(tableName, columnName, defaultValue) {
  var value = lf.backstore.IndexedDBRawBackStore.convert(defaultValue);
  return this.transformRows_(tableName, function(row) {
    row.payload()[columnName] = value;
  });
};
goog.exportProperty(lf.backstore.IndexedDBRawBackStore.prototype, "addTableColumn", lf.backstore.IndexedDBRawBackStore.prototype.addTableColumn);
lf.backstore.IndexedDBRawBackStore.prototype.dropTableColumn = function(tableName, columnName) {
  return this.transformRows_(tableName, function(row) {
    delete row.payload()[columnName];
  });
};
goog.exportProperty(lf.backstore.IndexedDBRawBackStore.prototype, "dropTableColumn", lf.backstore.IndexedDBRawBackStore.prototype.dropTableColumn);
lf.backstore.IndexedDBRawBackStore.prototype.renameTableColumn = function(tableName, oldColumnName, newColumnName) {
  return this.transformRows_(tableName, function(row) {
    row.payload()[newColumnName] = row.payload()[oldColumnName];
    delete row.payload()[oldColumnName];
  });
};
goog.exportProperty(lf.backstore.IndexedDBRawBackStore.prototype, "renameTableColumn", lf.backstore.IndexedDBRawBackStore.prototype.renameTableColumn);
lf.backstore.IndexedDBRawBackStore.prototype.getTableRows_ = function(tableName) {
  var results = [];
  return new goog.Promise(function(resolve, reject) {
    var req;
    try {
      req = this.tx_.objectStore(tableName).openCursor();
    } catch (e) {
      reject(e);
      return;
    }
    req.onsuccess = goog.bind(function() {
      var cursor = req.result;
      if (cursor) {
        if (this.bundleMode_) {
          var page = lf.backstore.Page.deserialize(cursor.value), data = page.getPayload(), rowId;
          for (rowId in data) {
            results.push(data[rowId]);
          }
        } else {
          results.push(cursor.value);
        }
        cursor.continue();
      } else {
        resolve(results);
      }
    }, this);
    req.onerror = reject;
  }, this);
};
lf.backstore.IndexedDBRawBackStore.prototype.createRow = function(payload) {
  var data = {};
  goog.object.forEach(payload, goog.bind(function(value, key) {
    data[key] = lf.backstore.IndexedDBRawBackStore.convert(value);
  }, this));
  return lf.Row.create(data);
};
goog.exportProperty(lf.backstore.IndexedDBRawBackStore.prototype, "createRow", lf.backstore.IndexedDBRawBackStore.prototype.createRow);
lf.backstore.IndexedDBRawBackStore.prototype.getVersion = function() {
  return this.version_;
};
goog.exportProperty(lf.backstore.IndexedDBRawBackStore.prototype, "getVersion", lf.backstore.IndexedDBRawBackStore.prototype.getVersion);
lf.backstore.IndexedDBRawBackStore.prototype.dump = function() {
  for (var tables = this.db_.objectStoreNames, promises = [], i = 0;i < tables.length;++i) {
    var tableName = tables.item(i);
    promises.push(this.dumpTable_(tableName));
  }
  return goog.Promise.all(promises).then(function(tableDumps) {
    var results = {};
    tableDumps.forEach(function(tableDump, index) {
      results[tables.item(index)] = tableDump;
    });
    return results;
  });
};
goog.exportProperty(lf.backstore.IndexedDBRawBackStore.prototype, "dump", lf.backstore.IndexedDBRawBackStore.prototype.dump);
lf.backstore.IndexedDBRawBackStore.prototype.dumpTable_ = function(tableName) {
  return this.getTableRows_(tableName).then(function(rawRows) {
    return rawRows.map(function(rawRow) {
      return rawRow.value;
    });
  });
};
lf.backstore.ObjectStore = function(store, deserializeFn) {
  this.store_ = store;
  this.deserializeFn_ = deserializeFn;
};
lf.backstore.ObjectStore.prototype.get = function(ids) {
  if (0 == ids.length) {
    return this.getAll_();
  }
  var promises = ids.map(function(id) {
    return new goog.Promise(function(resolve, reject) {
      var request;
      try {
        request = this.store_.get(id);
      } catch (e) {
        reject(e);
        return;
      }
      request.onerror = reject;
      request.onsuccess = goog.bind(function(ev) {
        resolve(this.deserializeFn_(ev.target.result));
      }, this);
    }, this);
  }, this);
  return goog.Promise.all(promises);
};
lf.backstore.ObjectStore.prototype.getAll_ = function() {
  return new goog.Promise(function(resolve, reject) {
    var rows = [], request;
    try {
      request = this.store_.openCursor();
    } catch (e) {
      reject(e);
      return;
    }
    request.onerror = reject;
    request.onsuccess = goog.bind(function() {
      var cursor = request.result;
      cursor ? (rows.push(this.deserializeFn_(cursor.value)), cursor.continue()) : resolve(rows);
    }, this);
  }, this);
};
lf.backstore.ObjectStore.prototype.performWriteOp_ = function(reqFactory) {
  return new goog.Promise(function(resolve, reject) {
    var request;
    try {
      request = reqFactory();
    } catch (e) {
      reject(e);
      return;
    }
    request.onsuccess = resolve;
    request.onerror = reject;
  }, this);
};
lf.backstore.ObjectStore.prototype.put = function(rows) {
  if (0 == rows.length) {
    return goog.Promise.resolve();
  }
  var promises = rows.map(function(row) {
    return this.performWriteOp_(goog.bind(function() {
      return this.store_.put(row.serialize());
    }, this));
  }, this);
  return goog.Promise.all(promises);
};
lf.backstore.ObjectStore.prototype.remove = function(ids) {
  return new goog.Promise(function(resolve, reject) {
    var request = this.store_.count();
    request.onsuccess = goog.bind(function(ev) {
      if (0 == ids.length || ev.target.result == ids.length) {
        return this.performWriteOp_(goog.bind(function() {
          return this.store_.clear();
        }, this)).then(resolve, reject);
      }
      var promises = ids.map(function(id) {
        return this.performWriteOp_(goog.bind(function() {
          return this.store_.delete(id);
        }, this));
      }, this);
      goog.Promise.all(promises).then(resolve, reject);
    }, this);
    request.onerror = reject;
  }, this);
};
lf.backstore.IndexedDBTx = function(global, transaction, journal, txType, bundleMode) {
  lf.backstore.BaseTx.call(this, journal, txType);
  this.global_ = global;
  this.tx_ = transaction;
  this.bundleMode_ = bundleMode;
  this.tx_.oncomplete = goog.bind(this.resolver.resolve, this.resolver);
  this.tx_.onabort = goog.bind(this.resolver.reject, this.resolver);
};
goog.inherits(lf.backstore.IndexedDBTx, lf.backstore.BaseTx);
lf.backstore.IndexedDBTx.prototype.getTable = function(tableName, deserializeFn, opt_tableType) {
  if (this.bundleMode_) {
    var tableType = goog.isDefAndNotNull(opt_tableType) ? opt_tableType : lf.backstore.TableType.DATA;
    return lf.backstore.BundledObjectStore.forTableType(this.global_, this.tx_.objectStore(tableName), deserializeFn, tableType);
  }
  return new lf.backstore.ObjectStore(this.tx_.objectStore(tableName), deserializeFn);
};
lf.backstore.IndexedDBTx.prototype.commitInternal = function() {
  return this.resolver.promise;
};
lf.backstore.IndexedDB = function(global, schema) {
  this.global_ = global;
  this.schema_ = schema;
  this.bundledMode_ = schema.pragma().enableBundledMode || !1;
};
lf.backstore.IndexedDB.prototype.init = function(opt_onUpgrade) {
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  if (!goog.isDefAndNotNull(indexedDB)) {
    throw new lf.Exception(352);
  }
  var onUpgrade = opt_onUpgrade || function() {
    return goog.Promise.resolve();
  };
  return new goog.Promise(function(resolve, reject) {
    var request;
    try {
      request = indexedDB.open(this.schema_.name(), this.schema_.version());
    } catch (e) {
      reject(e);
      return;
    }
    request.onerror = reject;
    request.onupgradeneeded = goog.bind(function(ev) {
      this.onUpgradeNeeded_(onUpgrade, ev).then(function() {
      }, reject);
    }, this);
    request.onsuccess = goog.bind(function(ev) {
      this.db_ = ev.target.result;
      this.scanRowId_().then(goog.bind(function(rowId) {
        lf.Row.setNextId(rowId + 1);
        resolve(this.db_);
      }, this));
    }, this);
  }, this);
};
lf.backstore.IndexedDB.prototype.onUpgradeNeeded_ = function(onUpgrade, ev) {
  var db = ev.target.result, tx = ev.target.transaction, rawDb = new lf.backstore.IndexedDBRawBackStore(ev.oldVersion, db, tx, this.bundledMode_);
  this.removeIndexTables_(db, tx);
  this.createTables_(db, tx);
  return onUpgrade(rawDb);
};
lf.backstore.IndexedDB.prototype.removeIndexTables_ = function(db) {
  for (var storeNames = [], i = 0;i < db.objectStoreNames.length;++i) {
    var name = db.objectStoreNames.item(i);
    -1 != name.indexOf(".") && storeNames.push(name);
  }
  storeNames.forEach(function(store) {
    try {
      db.deleteObjectStore(store);
    } catch (e) {
    }
  });
};
lf.backstore.IndexedDB.prototype.createTables_ = function(db, tx) {
  this.schema_.tables().forEach(goog.partial(this.createObjectStoresForTable_, db, tx), this);
};
lf.backstore.IndexedDB.prototype.createObjectStoresForTable_ = function(db, tx, tableSchema) {
  db.objectStoreNames.contains(tableSchema.getName()) || db.createObjectStore(tableSchema.getName(), {keyPath:"id"});
  if (tableSchema.persistentIndex()) {
    var tableIndices = tableSchema.getIndices();
    tableIndices.forEach(function(indexSchema) {
      this.createIndexTable_(db, tx, indexSchema.getNormalizedName(), lf.index.IndexMetadata.Type.BTREE);
    }, this);
    this.createIndexTable_(db, tx, tableSchema.getRowIdIndexName(), lf.index.IndexMetadata.Type.ROW_ID);
  }
};
lf.backstore.IndexedDB.prototype.createIndexTable_ = function(db, tx, indexName, indexType) {
  if (!db.objectStoreNames.contains(indexName)) {
    db.createObjectStore(indexName, {keyPath:"id"});
    var store = tx.objectStore(indexName), objectStore = this.bundledMode_ ? lf.backstore.BundledObjectStore.forTableType(this.global_, store, lf.Row.deserialize, lf.backstore.TableType.INDEX) : new lf.backstore.ObjectStore(store, lf.Row.deserialize);
    objectStore.put([lf.index.IndexMetadataRow.forType(indexType)]);
  }
};
lf.backstore.IndexedDB.prototype.createTx = function(type, journal) {
  var scope = lf.structs.map.keys(journal.getScope());
  journal.getIndexScope().forEach(function(indexTableName) {
    scope.push(indexTableName);
  });
  var nativeTx = this.db_.transaction(scope, type == lf.TransactionType.READ_ONLY ? "readonly" : "readwrite");
  return new lf.backstore.IndexedDBTx(this.global_, nativeTx, journal, type, this.bundledMode_);
};
lf.backstore.IndexedDB.prototype.scanRowId_ = function(opt_tx) {
  var tableNames = this.schema_.tables().map(function(table) {
    return table.getName();
  }), db = this.db_, maxRowId = 0, extractRowId = goog.bind(function(cursor) {
    if (this.bundledMode_) {
      var page = lf.backstore.Page.deserialize(cursor.value);
      return goog.object.getKeys(page.getPayload()).reduce(function(prev, cur) {
        return Math.max(prev, cur);
      }, 0);
    }
    return cursor.key;
  }, this), scanTableRowId = goog.bind(function(tableName) {
    return new goog.Promise(function(resolve, reject) {
      var req;
      try {
        var tx = opt_tx || db.transaction([tableName]);
        req = tx.objectStore(tableName).openCursor(null, "prev");
      } catch (e) {
        reject(e);
        return;
      }
      req.onsuccess = function(ev) {
        var cursor = ev.target.result;
        cursor && (maxRowId = Math.max(maxRowId, extractRowId(cursor)));
        resolve(maxRowId);
      };
      req.onerror = function() {
        resolve(maxRowId);
      };
    }, this);
  }, this), execSequentially = function() {
    if (0 == tableNames.length) {
      return goog.Promise.resolve();
    }
    var tableName = tableNames.shift();
    return scanTableRowId(tableName).then(execSequentially);
  };
  return new goog.Promise(function(resolve) {
    execSequentially().then(function() {
      resolve(maxRowId);
    });
  });
};
lf.backstore.IndexedDB.prototype.close = function() {
  this.db_.close();
};
lf.backstore.IndexedDB.prototype.getTableInternal = function() {
  throw new lf.Exception(511);
};
lf.backstore.IndexedDB.prototype.subscribe = function() {
};
lf.backstore.IndexedDB.prototype.notify = function() {
};
lf.backstore.LocalStorageTable = function(tableKey) {
  this.key_ = tableKey;
  this.data_ = {};
  var rawData = window.localStorage.getItem(tableKey);
  goog.isDefAndNotNull(rawData) && (this.data_ = JSON.parse(rawData));
};
lf.backstore.LocalStorageTable.prototype.get = function(ids) {
  var results;
  0 == ids.length ? results = Object.keys(this.data_).map(function(key) {
    var id = parseInt(key, 10);
    return new lf.Row(id, this.data_[key]);
  }, this) : (results = [], ids.forEach(function(id) {
    goog.object.containsKey(this.data_, id.toString()) && results.push(new lf.Row(id, this.data_[id.toString()]));
  }, this));
  return goog.Promise.resolve(results);
};
lf.backstore.LocalStorageTable.prototype.put = function(rows) {
  rows.forEach(function(row) {
    this.data_[row.id().toString()] = row.payload();
  }, this);
  return goog.Promise.resolve();
};
lf.backstore.LocalStorageTable.prototype.remove = function(ids) {
  0 == ids.length || ids.length == goog.object.getCount(this.data_) ? goog.object.clear(this.data_) : ids.forEach(function(id) {
    goog.object.remove(this.data_, id);
  }, this);
  return goog.Promise.resolve();
};
lf.backstore.LocalStorageTable.prototype.commit = function() {
  window.localStorage.setItem(this.key_, JSON.stringify(this.data_));
};
lf.backstore.LocalStorageTable.prototype.diff = function(newData) {
  var oldIds = Object.keys(this.data_), newIds = Object.keys(newData), diff = new lf.cache.TableDiff(this.key_);
  newIds.forEach(function(id) {
    var rowId = parseInt(id, 10);
    goog.object.containsKey(this.data_, id) ? JSON.stringify(this.data_[id]) != JSON.stringify(newData[id]) && diff.modify([new lf.Row(rowId, this.data_[id]), new lf.Row(rowId, newData[id])]) : diff.add(new lf.Row(rowId, newData[id]));
  }, this);
  oldIds.filter(function(id) {
    return !goog.object.containsKey(newData, id);
  }, this).forEach(function(id) {
    diff.delete(new lf.Row(parseInt(id, 10), this.data_[id]));
  }, this);
  return diff;
};
lf.backstore.LocalStorageTx = function(store, type, journal) {
  lf.backstore.BaseTx.call(this, journal, type);
  this.store_ = store;
  type == lf.TransactionType.READ_ONLY && this.resolver.resolve();
};
goog.inherits(lf.backstore.LocalStorageTx, lf.backstore.BaseTx);
lf.backstore.LocalStorageTx.prototype.getTable = function(tableName) {
  return this.store_.getTableInternal(tableName);
};
lf.backstore.LocalStorageTx.prototype.commitInternal = function() {
  this.store_.commit();
  this.resolver.resolve();
  return this.resolver.promise;
};
lf.backstore.LocalStorage = function(schema) {
  this.schema_ = schema;
  this.tables_ = lf.structs.map.create();
  this.listener_ = this.changeHandler_ = null;
};
lf.backstore.LocalStorage.prototype.initSync = function() {
  if (!window.localStorage) {
    throw new lf.Exception(359);
  }
  var versionKey = this.schema_.name() + ".version#", version = window.localStorage.getItem(versionKey);
  if (goog.isDefAndNotNull(version)) {
    if (version != this.schema_.version().toString()) {
      throw new lf.Exception(360);
    }
    this.loadTables_();
  } else {
    this.loadTables_(), window.localStorage.setItem(versionKey, this.schema_.version().toString()), this.commit();
  }
};
lf.backstore.LocalStorage.prototype.init = function() {
  return new goog.Promise(goog.bind(function(resolve) {
    this.initSync();
    resolve();
  }, this));
};
lf.backstore.LocalStorage.prototype.loadTables_ = function() {
  var prefix = this.schema_.name() + ".";
  this.schema_.tables().forEach(function(table) {
    var tableName = table.getName();
    this.tables_.set(tableName, new lf.backstore.LocalStorageTable(prefix + tableName));
    if (table.persistentIndex()) {
      var indices = table.getIndices();
      indices.forEach(function(index) {
        var indexName = index.getNormalizedName();
        this.tables_.set(indexName, new lf.backstore.LocalStorageTable(prefix + indexName));
      }, this);
    }
  }, this);
};
lf.backstore.LocalStorage.prototype.getTableInternal = function(tableName) {
  if (!this.tables_.has(tableName)) {
    throw new lf.Exception(101, tableName);
  }
  return this.tables_.get(tableName);
};
lf.backstore.LocalStorage.prototype.createTx = function(mode, journal) {
  return new lf.backstore.LocalStorageTx(this, mode, journal);
};
lf.backstore.LocalStorage.prototype.close = function() {
};
lf.backstore.LocalStorage.prototype.subscribe = function(handler) {
  this.changeHandler_ = handler;
  goog.isDefAndNotNull(this.listener_) || (this.listener_ = this.onStorageEvent_.bind(this), window.addEventListener("storage", this.listener_, !1));
};
lf.backstore.LocalStorage.prototype.commit = function() {
  this.tables_.forEach(function(table) {
    table.commit();
  });
};
lf.backstore.LocalStorage.prototype.notify = function(changes) {
  goog.isDefAndNotNull(this.changeHandler_) && this.changeHandler_(changes);
};
lf.backstore.LocalStorage.prototype.onStorageEvent_ = function(raw) {
  var ev = raw;
  if (ev.storageArea == window.localStorage && 0 == ev.key.indexOf(this.schema_.name() + ".")) {
    var newValue = window.localStorage.getItem(ev.key), newData = {};
    if (!goog.isNull(newValue)) {
      try {
        newData = JSON.parse(newValue);
      } catch (e) {
        return;
      }
    }
    var tableName = ev.key.slice(this.schema_.name().length + 1), table = this.tables_.get(tableName);
    table && this.changeHandler_([table.diff(newData)]);
  }
};
lf.backstore.MemoryTx = function(store, type, journal) {
  lf.backstore.BaseTx.call(this, journal, type);
  this.store_ = store;
  type == lf.TransactionType.READ_ONLY && this.resolver.resolve();
};
goog.inherits(lf.backstore.MemoryTx, lf.backstore.BaseTx);
lf.backstore.MemoryTx.prototype.getTable = function(tableName) {
  return this.store_.getTableInternal(tableName);
};
lf.backstore.MemoryTx.prototype.commitInternal = function() {
  this.resolver.resolve();
  return this.resolver.promise;
};
lf.backstore.Memory = function(schema) {
  this.schema_ = schema;
  this.tables_ = lf.structs.map.create();
};
lf.backstore.Memory.prototype.init = function() {
  this.schema_.tables().forEach(this.initTable_, this);
  return goog.Promise.resolve();
};
lf.backstore.Memory.prototype.getTableInternal = function(tableName) {
  var table = this.tables_.get(tableName) || null;
  if (goog.isNull(table)) {
    throw new lf.Exception(101, tableName);
  }
  return table;
};
lf.backstore.Memory.prototype.createTx = function(mode, journal) {
  return new lf.backstore.MemoryTx(this, mode, journal);
};
lf.backstore.Memory.prototype.createTable_ = function(tableName) {
  if (!this.tables_.has(tableName)) {
    var backstoreTable = new lf.backstore.MemoryTable;
    this.tables_.set(tableName, backstoreTable);
    return backstoreTable;
  }
  return null;
};
lf.backstore.Memory.prototype.initTable_ = function(tableSchema) {
  this.createTable_(tableSchema.getName());
  if (tableSchema.persistentIndex()) {
    var tableIndices = tableSchema.getIndices();
    tableIndices.forEach(function(indexSchema) {
      this.createIndexTable_(indexSchema.getNormalizedName(), lf.index.IndexMetadata.Type.BTREE);
    }, this);
    this.createIndexTable_(tableSchema.getRowIdIndexName(), lf.index.IndexMetadata.Type.ROW_ID);
  }
};
lf.backstore.Memory.prototype.createIndexTable_ = function(indexName, indexType) {
  var backstoreTable = this.createTable_(indexName);
  goog.isNull(backstoreTable) || backstoreTable.put([lf.index.IndexMetadataRow.forType(indexType)]);
};
lf.backstore.Memory.prototype.close = function() {
};
lf.backstore.Memory.prototype.subscribe = function() {
};
lf.backstore.Memory.prototype.notify = function() {
};
lf.backstore.ObservableStore = function(schema) {
  lf.backstore.Memory.call(this, schema);
  this.observer_ = null;
};
goog.inherits(lf.backstore.ObservableStore, lf.backstore.Memory);
lf.backstore.ObservableStore.prototype.subscribe = function(observer) {
  goog.isNull(this.observer_) && (this.observer_ = observer);
};
lf.backstore.ObservableStore.prototype.notify = function(changes) {
  goog.isNull(this.observer_) || this.observer_(changes);
};
lf.backstore.WebSqlTable = function(tx, name, deserializeFn) {
  this.tx_ = tx;
  this.name_ = name;
  this.deserializeFn_ = deserializeFn;
};
lf.backstore.WebSqlTable.prototype.get = function(ids) {
  var where = 0 == ids.length ? "" : "WHERE id IN (" + ids.join(",") + ")", sql = "SELECT id, value FROM " + this.name_ + " " + where, deserializeFn = this.deserializeFn_, transformer = function(results) {
    for (var length = results.rows.length, rows = Array(length), i = 0;i < length;++i) {
      rows[i] = deserializeFn({id:results.rows.item(i).id, value:JSON.parse(results.rows.item(i).value)});
    }
    return rows;
  };
  this.tx_.queue(sql, [], transformer);
  return this.tx_.commit();
};
lf.backstore.WebSqlTable.prototype.put = function(rows) {
  if (0 == rows.length) {
    return goog.Promise.resolve();
  }
  var sql = "INSERT OR REPLACE INTO " + this.name_ + "(id, value) VALUES (?, ?)";
  rows.forEach(function(row) {
    this.tx_.queue(sql, [row.id(), JSON.stringify(row.payload())]);
  }, this);
  return goog.Promise.resolve();
};
lf.backstore.WebSqlTable.prototype.remove = function(ids) {
  var where = 0 == ids.length ? "" : "WHERE id IN (" + ids.join(",") + ")", sql = "DELETE FROM " + this.name_ + " " + where;
  this.tx_.queue(sql, []);
  return goog.Promise.resolve();
};
lf.backstore.WebSqlTx = function(db, journal, txType) {
  lf.backstore.BaseTx.call(this, journal, txType);
  this.db_ = db;
  this.tables_ = lf.structs.map.create();
  this.commands_ = [];
};
goog.inherits(lf.backstore.WebSqlTx, lf.backstore.BaseTx);
lf.backstore.WebSqlTx.prototype.getTable = function(tableName, deserializeFn) {
  var table = this.tables_.get(tableName) || null;
  goog.isNull(table) && (table = new lf.backstore.WebSqlTable(this, tableName, deserializeFn), this.tables_.set(tableName, table));
  return table;
};
lf.backstore.WebSqlTx.prototype.queue = function(statement, params, opt_transform) {
  this.commands_.push({statement:statement, params:params, transform:opt_transform});
};
lf.backstore.WebSqlTx.prototype.commitInternal = function() {
  var lastResults, transformer, onTxError = this.resolver.reject.bind(this.resolver), onExecError = function(tx, e) {
    this.resolver.reject(e);
  }.bind(this), callback = goog.bind(function(tx, results) {
    lastResults = results;
    if (this.commands_.length) {
      var command = this.commands_.shift();
      transformer = command.transform;
      tx.executeSql(command.statement, command.params, callback, onExecError);
    } else {
      var ret = lastResults;
      goog.isDefAndNotNull(transformer) && goog.isDefAndNotNull(lastResults) && (ret = transformer(lastResults));
      this.resolver.resolve(ret);
    }
  }, this);
  this.txType == lf.TransactionType.READ_ONLY ? this.db_.readTransaction(callback, onTxError) : this.db_.transaction(callback, onTxError);
  return this.resolver.promise;
};
lf.backstore.WebSqlRawBackStore = function(global, oldVersion, db) {
  this.db_ = db;
  this.global_ = global;
  this.version_ = oldVersion;
};
goog.exportSymbol("lf.backstore.WebSqlRawBackStore", lf.backstore.WebSqlRawBackStore);
lf.backstore.WebSqlRawBackStore.prototype.getRawDBInstance = function() {
  return this.db_;
};
goog.exportProperty(lf.backstore.WebSqlRawBackStore.prototype, "getRawDBInstance", lf.backstore.WebSqlRawBackStore.prototype.getRawDBInstance);
lf.backstore.WebSqlRawBackStore.prototype.getRawTransaction = function() {
  throw new lf.Exception(356);
};
goog.exportProperty(lf.backstore.WebSqlRawBackStore.prototype, "getRawTransaction", lf.backstore.WebSqlRawBackStore.prototype.getRawTransaction);
lf.backstore.WebSqlRawBackStore.prototype.createTx_ = function() {
  return new lf.backstore.WebSqlTx(this.db_, new lf.cache.Journal(this.global_, lf.structs.set.create()), lf.TransactionType.READ_WRITE);
};
lf.backstore.WebSqlRawBackStore.prototype.dropTable = function(tableName) {
  var tx = this.createTx_();
  tx.queue("DROP TABLE " + tableName, []);
  return tx.commit();
};
goog.exportProperty(lf.backstore.WebSqlRawBackStore.prototype, "dropTable", lf.backstore.WebSqlRawBackStore.prototype.dropTable);
lf.backstore.WebSqlRawBackStore.prototype.dumpTable_ = function(tableName) {
  var tx = this.createTx_();
  tx.queue("SELECT id, value FROM " + tableName, []);
  return tx.commit().then(function(results) {
    for (var length = results.rows.length, rows = Array(length), i = 0;i < length;++i) {
      rows[i] = {id:results.rows.item(i).id, value:JSON.parse(results.rows.item(i).value)};
    }
    return goog.Promise.resolve(rows);
  });
};
lf.backstore.WebSqlRawBackStore.prototype.transformColumn_ = function(tableName, transformer) {
  var tx = this.createTx_(), sql = "UPDATE " + tableName + " SET value=? WHERE id=?";
  return this.dumpTable_(tableName).then(function(rows) {
    rows.forEach(function(row) {
      var newRow = transformer(row);
      tx.queue(sql, [JSON.stringify(newRow.value), newRow.id]);
    });
    return tx.commit();
  });
};
lf.backstore.WebSqlRawBackStore.prototype.addTableColumn = function(tableName, columnName, defaultValue) {
  var value = lf.backstore.IndexedDBRawBackStore.convert(defaultValue);
  return this.transformColumn_(tableName, function(row) {
    row.value[columnName] = value;
    return row;
  });
};
goog.exportProperty(lf.backstore.WebSqlRawBackStore.prototype, "addTableColumn", lf.backstore.WebSqlRawBackStore.prototype.addTableColumn);
lf.backstore.WebSqlRawBackStore.prototype.dropTableColumn = function(tableName, columnName) {
  return this.transformColumn_(tableName, function(row) {
    delete row.value[columnName];
    return row;
  });
};
goog.exportProperty(lf.backstore.WebSqlRawBackStore.prototype, "dropTableColumn", lf.backstore.WebSqlRawBackStore.prototype.dropTableColumn);
lf.backstore.WebSqlRawBackStore.prototype.renameTableColumn = function(tableName, oldColumnName, newColumnName) {
  return this.transformColumn_(tableName, function(row) {
    row.value[newColumnName] = row.value[oldColumnName];
    delete row.value[oldColumnName];
    return row;
  });
};
goog.exportProperty(lf.backstore.WebSqlRawBackStore.prototype, "renameTableColumn", lf.backstore.WebSqlRawBackStore.prototype.renameTableColumn);
lf.backstore.WebSqlRawBackStore.prototype.createRow = function(payload) {
  var data = {}, key;
  for (key in payload) {
    data[key] = lf.backstore.IndexedDBRawBackStore.convert(payload[key]);
  }
  return lf.Row.create(data);
};
goog.exportProperty(lf.backstore.WebSqlRawBackStore.prototype, "createRow", lf.backstore.WebSqlRawBackStore.prototype.createRow);
lf.backstore.WebSqlRawBackStore.prototype.getVersion = function() {
  return this.version_;
};
goog.exportProperty(lf.backstore.WebSqlRawBackStore.prototype, "getVersion", lf.backstore.WebSqlRawBackStore.prototype.getVersion);
lf.backstore.WebSqlRawBackStore.queueListTables = function(tx) {
  tx.queue('SELECT tbl_name FROM sqlite_master WHERE type="table"', [], function(results) {
    for (var tableNames = Array(results.rows.length), i = 0;i < tableNames.length;++i) {
      tableNames[i] = results.rows.item(i).tbl_name;
    }
    return tableNames;
  });
};
lf.backstore.WebSqlRawBackStore.prototype.dump = function() {
  var resolver = goog.Promise.withResolver(), tx = this.createTx_();
  lf.backstore.WebSqlRawBackStore.queueListTables(tx);
  var ret = {};
  tx.commit().then(goog.bind(function(results) {
    var tables = results.filter(function(name) {
      return "__lf_ver" != name && "__WebKitDatabaseInfoTable__" != name;
    }), promises = tables.map(function(tableName) {
      return this.dumpTable_(tableName).then(function(rows) {
        ret[tableName] = rows;
      });
    }, this);
    goog.Promise.all(promises).then(function() {
      resolver.resolve(ret);
    });
  }, this));
  return resolver.promise;
};
goog.exportProperty(lf.backstore.WebSqlRawBackStore.prototype, "dump", lf.backstore.WebSqlRawBackStore.prototype.dump);

lf.backstore.WebSql = function(global, schema, opt_size) {
  this.global_ = global;
  this.schema_ = schema;
  this.size_ = opt_size || 4194304;
};
lf.backstore.WebSql.prototype.getEmptyJournal_ = function() {
  return new lf.cache.Journal(this.global_, lf.structs.set.create());
};
lf.backstore.WebSql.prototype.init = function(opt_onUpgrade) {
  if (!goog.isDefAndNotNull(window.openDatabase)) {
    throw new lf.Exception(353);
  }
  var onUpgrade = opt_onUpgrade || function() {
    return goog.Promise.resolve();
  };
  return new goog.Promise(goog.bind(function(resolve, reject) {
    try {
      var db = window.openDatabase(this.schema_.name(), "", this.schema_.name(), this.size_);
      if (goog.isDefAndNotNull(db)) {
        this.db_ = db, this.checkVersion_(onUpgrade).then(resolve, reject);
      } else {
        throw new lf.Exception(354);
      }
    } catch (e) {
      reject(e);
    }
  }, this));
};
lf.backstore.WebSql.prototype.checkVersion_ = function(onUpgrade) {
  var resolver = goog.Promise.withResolver(), tx = new lf.backstore.WebSqlTx(this.db_, this.getEmptyJournal_(), lf.TransactionType.READ_WRITE);
  tx.queue("CREATE TABLE IF NOT EXISTS __lf_ver(id INTEGER PRIMARY KEY, v INTEGER)", []);
  tx.queue("SELECT v FROM __lf_ver WHERE id = 0", []);
  tx.commit().then(goog.bind(function(results) {
    var version = 0;
    results.rows.length && (version = results.rows.item(0).v);
    version < this.schema_.version() ? this.onUpgrade_(onUpgrade, version).then(resolver.resolve.bind(resolver)) : version > this.schema_.version() ? resolver.reject(new lf.Exception(108)) : resolver.resolve();
  }, this));
  return resolver.promise;
};
lf.backstore.WebSql.prototype.createTx = function(type, journal) {
  if (goog.isDefAndNotNull(this.db_)) {
    return new lf.backstore.WebSqlTx(this.db_, journal, type);
  }
  throw new lf.Exception(2);
};
lf.backstore.WebSql.prototype.close = function() {
};
lf.backstore.WebSql.prototype.getTableInternal = function() {
  throw new lf.Exception(512);
};
lf.backstore.WebSql.prototype.notSupported_ = function() {
  throw new lf.Exception(355);
};
lf.backstore.WebSql.prototype.subscribe = function() {
  this.notSupported_();
};
lf.backstore.WebSql.prototype.notify = function() {
  this.notSupported_();
};
lf.backstore.WebSql.prototype.onUpgrade_ = function(onUpgrade, oldVersion) {
  var resolver = goog.Promise.withResolver();
  this.preUpgrade_().then(goog.bind(function() {
    var rawDb = new lf.backstore.WebSqlRawBackStore(this.global_, oldVersion, this.db_);
    onUpgrade(rawDb).then(goog.bind(function() {
      return this.scanRowId_();
    }, this)).then(resolver.resolve.bind(resolver));
  }, this), resolver.reject.bind(resolver));
  return resolver.promise;
};
lf.backstore.WebSql.prototype.preUpgrade_ = function() {
  var tables = this.schema_.tables(), tx = new lf.backstore.WebSqlTx(this.db_, this.getEmptyJournal_(), lf.TransactionType.READ_WRITE), tx2 = new lf.backstore.WebSqlTx(this.db_, this.getEmptyJournal_(), lf.TransactionType.READ_WRITE);
  tx.queue("INSERT OR REPLACE INTO __lf_ver VALUES (0, ?)", [this.schema_.version()]);
  lf.backstore.WebSqlRawBackStore.queueListTables(tx);
  return tx.commit().then(function(results) {
    results.filter(function(name) {
      return -1 != name.indexOf(".");
    }).forEach(function(name) {
      tx2.queue("DROP TABLE " + name, []);
    });
    var existingTables = results.filter(function(name) {
      return -1 == name.indexOf(".");
    }), newTables = tables.map(function(table) {
      return table.getName();
    }).filter(function(name) {
      return -1 == existingTables.indexOf(name);
    });
    newTables.forEach(function(name) {
      tx2.queue("CREATE TABLE " + name + "(id INTEGER PRIMARY KEY, value TEXT)", []);
    });
    return tx2.commit();
  });
};
lf.backstore.WebSql.prototype.scanRowId_ = function() {
  var maxRowId = 0, resolver = goog.Promise.withResolver(), selectIdFromTable = goog.bind(function(tableName) {
    var tx = new lf.backstore.WebSqlTx(this.db_, this.getEmptyJournal_(), lf.TransactionType.READ_ONLY);
    tx.queue("SELECT MAX(id) FROM " + tableName, []);
    return tx.commit().then(function(results) {
      var id = results.rows.item(0)[0];
      maxRowId = Math.max(id, maxRowId);
    });
  }, this), promises = this.schema_.tables().map(function(table) {
    return selectIdFromTable(table.getName());
  });
  goog.Promise.all(promises).then(function() {
    resolver.resolve(maxRowId);
  }, function(e) {
    resolver.reject(e);
  });
  return resolver.promise;
};
lf.cache.Cache = function() {
};
lf.cache.DefaultCache = function() {
  this.map_ = lf.structs.map.create();
  this.tableRows_ = lf.structs.map.create();
};
lf.cache.DefaultCache.prototype.getTableSet_ = function(tableName) {
  var set = this.tableRows_.get(tableName);
  goog.isDef(set) || (set = lf.structs.set.create(), this.tableRows_.set(tableName, set));
  return set;
};
lf.cache.DefaultCache.prototype.set = function(tableName, rows) {
  var tableSet = this.getTableSet_(tableName);
  rows.forEach(goog.bind(function(row) {
    this.map_.set(row.id(), row);
    tableSet.add(row.id());
  }, this));
};
lf.cache.DefaultCache.prototype.get = function(ids) {
  return ids.map(goog.bind(function(id) {
    return this.map_.get(id) || null;
  }, this));
};
lf.cache.DefaultCache.prototype.getRange = function(tableName, fromId, toId) {
  var data = [], min = Math.min(fromId, toId), max = Math.max(fromId, toId), tableSet = this.getTableSet_(tableName);
  if (tableSet.size < max - min) {
    tableSet.forEach(function(key) {
      if (key >= min && key <= max) {
        var value = this.map_.get(key);
        goog.asserts.assert(goog.isDefAndNotNull(value), "Inconsistent cache");
        data.push(value);
      }
    }, this);
  } else {
    for (var i = min;i <= max;++i) {
      if (tableSet.has(i)) {
        var value$$0 = this.map_.get(i);
        goog.asserts.assert(goog.isDefAndNotNull(value$$0), "Inconsistent cache");
        data.push(value$$0);
      }
    }
  }
  return data;
};
lf.cache.DefaultCache.prototype.remove = function(tableName, ids) {
  var tableSet = this.getTableSet_(tableName);
  ids.forEach(function(id) {
    this.map_.delete(id);
    tableSet.delete(id);
  }, this);
};
lf.cache.DefaultCache.prototype.getCount = function(opt_tableName) {
  return goog.isDefAndNotNull(opt_tableName) ? this.getTableSet_(opt_tableName).size : this.map_.size;
};

lf.structs.array = {};
lf.structs.array.binarySearch_ = function(arr, value) {
  for (var left = 0, right = arr.length;left < right;) {
    var middle = left + right >> 1;
    arr[middle] < value ? left = middle + 1 : right = middle;
  }
  return left == right && arr[left] == value ? left : ~left;
};
lf.structs.array.binaryInsert = function(arr, value) {
  var index = lf.structs.array.binarySearch_(arr, value);
  return 0 > index ? (arr.splice(-(index + 1), 0, value), !0) : !1;
};
lf.structs.array.binaryRemove = function(arr, value) {
  var index = lf.structs.array.binarySearch_(arr, value);
  if (0 > index) {
    return !1;
  }
  arr.splice(index, 1);
  return !0;
};
lf.index.hashCode = function(value) {
  for (var hash = 0, i = 0;i < value.length;++i) {
    hash = (hash << 5) - hash + value.charCodeAt(i), hash &= hash;
  }
  return hash;
};
lf.index.hashArray = function(values) {
  var keys = values.map(function(value) {
    return goog.isDefAndNotNull(value) ? lf.index.hashCode(value.toString()).toString(32) : "";
  });
  return keys.join("_");
};
lf.index.slice = function(rawArray, opt_reverseOrder, opt_limit, opt_skip) {
  var array = opt_reverseOrder ? rawArray.reverse() : rawArray;
  if (!goog.isDefAndNotNull(opt_limit) && !goog.isDefAndNotNull(opt_skip)) {
    return array;
  }
  var limit = Math.min(goog.isDef(opt_limit) ? opt_limit : array.length, array.length);
  if (0 == limit) {
    return [];
  }
  var skip = Math.min(opt_skip || 0, array.length);
  return array.slice(skip, skip + limit);
};
lf.index.Stats = function() {
  this.totalRows = 0;
};
lf.index.Stats.prototype.add = function(key, rowCount) {
  this.totalRows += rowCount;
};
lf.index.Stats.prototype.remove = function(key, removedCount) {
  this.totalRows -= removedCount;
};
lf.index.Stats.prototype.clear = function() {
  this.totalRows = 0;
};
lf.index.Stats.prototype.updateFromList = function(statsList) {
  this.clear();
  statsList.forEach(function(stats) {
    this.totalRows += stats.totalRows;
  }, this);
};
lf.index.BTree = function(name, comparator, uniqueKeyOnly, opt_data) {
  this.name_ = name;
  this.comparator_ = comparator;
  this.uniqueKeyOnly_ = uniqueKeyOnly;
  this.stats_ = new lf.index.Stats;
  opt_data ? this.root_ = lf.index.BTreeNode_.fromData(this, opt_data) : this.clear();
};
lf.index.BTree.EMPTY = [];
lf.index.BTree.prototype.getName = function() {
  return this.name_;
};
lf.index.BTree.prototype.toString = function() {
  return this.root_.toString();
};
lf.index.BTree.prototype.add = function(key, value) {
  this.root_ = this.root_.insert(key, value);
};
lf.index.BTree.prototype.set = function(key, value) {
  this.root_ = this.root_.insert(key, value, !0);
};
lf.index.BTree.prototype.remove = function(key, opt_rowId) {
  this.root_ = this.root_.remove(key, opt_rowId);
};
lf.index.BTree.prototype.get = function(key) {
  return this.root_.get(key);
};
lf.index.BTree.prototype.cost = function(opt_keyRange) {
  if (!goog.isDefAndNotNull(opt_keyRange)) {
    return this.stats().totalRows;
  }
  if (opt_keyRange instanceof lf.index.SingleKeyRange) {
    if (opt_keyRange.isAll()) {
      return this.stats().totalRows;
    }
    if (opt_keyRange.isOnly()) {
      return this.get(opt_keyRange.from).length;
    }
  }
  return this.getRange([opt_keyRange]).length;
};
lf.index.BTree.prototype.stats = function() {
  return this.stats_;
};
lf.index.BTree.prototype.getAll_ = function(maxCount, reverse, limit, skip) {
  var offset = reverse ? this.stats_.totalRows - maxCount - skip : skip, results = Array(maxCount), params = {offset:offset, count:maxCount, startIndex:0};
  this.root_.fill(params, results);
  return reverse ? results.reverse() : results;
};
lf.index.BTree.prototype.getRange = function(opt_keyRanges, opt_reverseOrder, opt_limit, opt_skip) {
  var leftMostKey = this.root_.getLeftMostNode().keys_[0];
  if (!goog.isDef(leftMostKey) || 0 == opt_limit) {
    return lf.index.BTree.EMPTY;
  }
  var reverse = opt_reverseOrder || !1, limit = goog.isDefAndNotNull(opt_limit) ? Math.min(opt_limit, this.stats_.totalRows) : this.stats_.totalRows, skip = opt_skip || 0, maxCount = Math.min(Math.max(this.stats_.totalRows - skip, 0), limit);
  if (0 == maxCount) {
    return lf.index.BTree.EMPTY;
  }
  if (!goog.isDef(opt_keyRanges) || 1 == opt_keyRanges.length && opt_keyRanges[0] instanceof lf.index.SingleKeyRange && opt_keyRanges[0].isAll()) {
    return this.getAll_(maxCount, reverse, limit, skip);
  }
  var sortedKeyRanges = this.comparator_.sortKeyRanges(opt_keyRanges), results = Array(reverse ? this.stats_.totalRows : maxCount), params = {count:0, limit:results.length, reverse:reverse, skip:skip};
  sortedKeyRanges.forEach(function(range) {
    for (var keys = this.comparator_.rangeToKeys(range), key = this.comparator_.isLeftOpen(range) ? leftMostKey : keys[0], start = this.root_.getContainingLeaf(key), oldCount = params.count, strikeCount = 0;goog.isDefAndNotNull(start) && params.count < params.limit;) {
      start.getRange(range, params, results), params.count != oldCount ? (strikeCount = 0, oldCount = params.count) : strikeCount++, start = 2 == strikeCount ? null : start.next();
    }
  }, this);
  results.splice(params.count, maxCount - params.count);
  return reverse ? lf.index.slice(results, reverse, limit, skip) : results;
};
lf.index.BTree.prototype.clear = function() {
  this.root_ = lf.index.BTreeNode_.create(this);
  this.stats_.clear();
};
lf.index.BTree.prototype.containsKey = function(key) {
  return this.root_.containsKey(key);
};
lf.index.BTree.prototype.min = function() {
  return this.minMax_(goog.bind(this.comparator_.min, this.comparator_));
};
lf.index.BTree.prototype.max = function() {
  return this.minMax_(goog.bind(this.comparator_.max, this.comparator_));
};
lf.index.BTree.prototype.minMax_ = function(compareFn) {
  var leftMostNode = this.root_.getLeftMostNode(), rightMostNode = this.root_.getRightMostNode();
  if (0 == leftMostNode.keys_.length && 0 == rightMostNode.keys_.length) {
    return null;
  }
  var leftMostKey = leftMostNode.keys_[0], leftMostValues = leftMostNode.values_[0], rightMostKey = rightMostNode.keys_[rightMostNode.keys_.length - 1], rightMostValues = rightMostNode.values_[rightMostNode.keys_.length - 1];
  return compareFn(leftMostKey, rightMostKey) == lf.index.Favor.LHS ? [leftMostKey, this.uniqueKeyOnly_ ? [leftMostValues] : leftMostValues] : [rightMostKey, this.uniqueKeyOnly_ ? [rightMostValues] : rightMostValues];
};
lf.index.BTree.prototype.isUniqueKey = function() {
  return this.uniqueKeyOnly_;
};
lf.index.BTree.prototype.comparator = function() {
  return this.comparator_;
};
lf.index.BTree.prototype.lt = function(lhs, rhs) {
  return goog.isDefAndNotNull(lhs) ? this.comparator_.compare(lhs, rhs) == lf.index.Favor.RHS : !1;
};
lf.index.BTree.prototype.eq = function(lhs, rhs) {
  return goog.isDefAndNotNull(lhs) ? this.comparator_.compare(lhs, rhs) == lf.index.Favor.TIE : !1;
};
lf.index.BTree.prototype.serialize = function() {
  var start = this.root_.getLeftMostNode();
  return lf.index.BTreeNode_.serialize(start);
};
lf.index.BTree.deserialize = function(comparator, name, uniqueKeyOnly, rows) {
  var tree = new lf.index.BTree(name, comparator, uniqueKeyOnly), newRoot = lf.index.BTreeNode_.deserialize(rows, tree);
  tree.root_ = newRoot;
  return tree;
};
lf.index.BTreeNode_ = function(id, tree) {
  this.id_ = id;
  this.tree_ = tree;
  this.height_ = 0;
  this.next_ = this.prev_ = this.parent_ = null;
  this.keys_ = [];
  this.values_ = [];
  this.children_ = [];
};
lf.index.BTreeNode_.MAX_COUNT_ = 512;
lf.index.BTreeNode_.MAX_KEY_LEN_ = lf.index.BTreeNode_.MAX_COUNT_ - 1;
lf.index.BTreeNode_.MIN_KEY_LEN_ = lf.index.BTreeNode_.MAX_COUNT_ >> 1;
lf.index.BTreeNode_.create = function(tree) {
  var node = new lf.index.BTreeNode_(lf.Row.getNextId(), tree);
  return node;
};
lf.index.BTreeNode_.prototype.isLeaf_ = function() {
  return 0 == this.height_;
};
lf.index.BTreeNode_.prototype.isRoot_ = function() {
  return null == this.parent_;
};
lf.index.BTreeNode_.prototype.next = function() {
  return this.next_;
};
lf.index.BTreeNode_.dumpLevel_ = function(node$$0) {
  var key = node$$0.id_ + "[" + node$$0.keys_.join("|") + "]", childrenIds = node$$0.children_.map(function(n) {
    return n.id_;
  }), children = childrenIds.join("|"), values = node$$0.values_.join("/"), getNodeId = function(node) {
    return goog.isDefAndNotNull(node) ? node.id_.toString() : "_";
  }, contents = getNodeId(node$$0.prev_) + "{", contents = node$$0.isLeaf_() ? contents + values : contents + children, contents = contents + "}" + getNodeId(node$$0.parent_);
  if (node$$0.next_) {
    var next = lf.index.BTreeNode_.dumpLevel_(node$$0.next_), key = key + "  " + next[0], contents = contents + "  " + next[1]
  }
  return [key, contents];
};
lf.index.BTreeNode_.prototype.toString = function() {
  var result = "", level = lf.index.BTreeNode_.dumpLevel_(this), result = result + (level[0] + "\n" + level[1] + "\n");
  this.children_.length && (result += this.children_[0].toString());
  return result;
};
lf.index.BTreeNode_.prototype.getLeftMostNode = function() {
  return this.isLeaf_() ? this : this.children_[0].getLeftMostNode();
};
lf.index.BTreeNode_.prototype.getRightMostNode = function() {
  return this.isLeaf_() ? this : this.children_[this.children_.length - 1].getRightMostNode();
};
lf.index.BTreeNode_.associate_ = function(left, right) {
  right && (right.prev_ = left);
  left && (left.next_ = right);
};
lf.index.BTreeNode_.calcNodeLen_ = function(remaining) {
  var maxLen = lf.index.BTreeNode_.MAX_KEY_LEN_, minLen = lf.index.BTreeNode_.MIN_KEY_LEN_ + 1;
  return remaining >= maxLen + minLen ? maxLen : remaining >= minLen && remaining <= maxLen ? remaining : minLen;
};
lf.index.BTreeNode_.createLeaves_ = function(tree, data) {
  for (var remaining = data.length, dataIndex = 0, curNode = lf.index.BTreeNode_.create(tree), node = curNode;0 < remaining;) {
    var nodeLen = lf.index.BTreeNode_.calcNodeLen_(remaining), target = data.slice(dataIndex, dataIndex + nodeLen);
    curNode.keys_ = target.map(function(e) {
      return e.key;
    });
    curNode.values_ = target.map(function(e) {
      return e.value;
    });
    dataIndex += nodeLen;
    remaining -= nodeLen;
    if (0 < remaining) {
      var newNode = lf.index.BTreeNode_.create(curNode.tree_);
      lf.index.BTreeNode_.associate_(curNode, newNode);
      curNode = newNode;
    }
  }
  return node;
};
lf.index.BTreeNode_.createParent_ = function(nodes) {
  var node = nodes[0], root = lf.index.BTreeNode_.create(node.tree_);
  root.height_ = node.height_ + 1;
  root.children_ = nodes;
  for (var i = 0;i < nodes.length;++i) {
    nodes[i].parent_ = root, 0 < i && root.keys_.push(nodes[i].keys_[0]);
  }
  return root;
};
lf.index.BTreeNode_.createInternals_ = function(node) {
  var curNode = node, data = [];
  do {
    data.push(curNode), curNode = curNode.next_;
  } while (curNode);
  var root;
  if (data.length <= lf.index.BTreeNode_.MAX_KEY_LEN_ + 1) {
    root = lf.index.BTreeNode_.createParent_(data);
  } else {
    var remaining = data.length, dataIndex = 0;
    root = lf.index.BTreeNode_.create(node.tree_);
    for (root.height_ = node.height_ + 2;0 < remaining;) {
      var nodeLen = lf.index.BTreeNode_.calcNodeLen_(remaining), target = data.slice(dataIndex, dataIndex + nodeLen), newNode = lf.index.BTreeNode_.createParent_(target);
      newNode.parent_ = root;
      root.children_.length && (root.keys_.push(target[0].keys_[0]), lf.index.BTreeNode_.associate_(root.children_[root.children_.length - 1], newNode));
      root.children_.push(newNode);
      dataIndex += nodeLen;
      remaining -= nodeLen;
    }
  }
  return root;
};
lf.index.BTreeNode_.fromData = function(tree, data) {
  var max = lf.index.BTreeNode_.MAX_KEY_LEN_, max = max * max * max;
  if (data.length >= max) {
    throw new lf.Exception(6, max);
  }
  var node = lf.index.BTreeNode_.createLeaves_(tree, data);
  return node = lf.index.BTreeNode_.createInternals_(node);
};
lf.index.BTreeNode_.prototype.get = function(key) {
  var pos = this.searchKey_(key);
  if (this.isLeaf_()) {
    var results = lf.index.BTree.EMPTY;
    this.tree_.eq(this.keys_[pos], key) && (results = results.concat(this.values_[pos]));
    return results;
  }
  pos = this.tree_.eq(this.keys_[pos], key) ? pos + 1 : pos;
  return this.children_[pos].get(key);
};
lf.index.BTreeNode_.prototype.containsKey = function(key) {
  var pos = this.searchKey_(key);
  return this.tree_.eq(this.keys_[pos], key) ? !0 : this.isLeaf_() ? !1 : this.children_[pos].containsKey(key);
};
lf.index.BTreeNode_.prototype.remove = function(key, opt_value) {
  this.delete_(key, -1, opt_value);
  if (this.isRoot_()) {
    var root = this;
    1 == this.children_.length && (root = this.children_[0], root.parent_ = null);
    return root;
  }
  return this;
};
lf.index.BTreeNode_.leftMostKey_ = function(node) {
  return node.isLeaf_() ? node.keys_[0] : lf.index.BTreeNode_.leftMostKey_(node.children_[0]);
};
lf.index.BTreeNode_.prototype.fix_ = function() {
  this.keys_ = [];
  for (var i = 1;i < this.children_.length;++i) {
    this.keys_.push(lf.index.BTreeNode_.leftMostKey_(this.children_[i]));
  }
};
lf.index.BTreeNode_.prototype.delete_ = function(key, parentPos, opt_value) {
  var pos = this.searchKey_(key), isLeaf = this.isLeaf_();
  if (!isLeaf) {
    var index = this.tree_.eq(this.keys_[pos], key) ? pos + 1 : pos;
    if (this.children_[index].delete_(key, index, opt_value)) {
      this.fix_();
    } else {
      return !1;
    }
  } else {
    if (!this.tree_.eq(this.keys_[pos], key)) {
      return !1;
    }
  }
  if (this.keys_.length > pos && this.tree_.eq(this.keys_[pos], key)) {
    if (goog.isDef(opt_value) && !this.tree_.isUniqueKey() && isLeaf && (lf.structs.array.binaryRemove(this.values_[pos], opt_value) && this.tree_.stats().remove(key, 1), this.values_[pos].length)) {
      return !1;
    }
    this.keys_.splice(pos, 1);
    if (isLeaf) {
      var removedLength = this.tree_.isUniqueKey() ? 1 : this.values_[pos].length;
      this.values_.splice(pos, 1);
      this.tree_.stats().remove(key, removedLength);
    }
  }
  this.keys_.length < lf.index.BTreeNode_.MIN_KEY_LEN_ && !this.isRoot_() && (this.steal_() || this.merge_(parentPos));
  return !0;
};
lf.index.BTreeNode_.prototype.steal_ = function() {
  var from = null, fromIndex, fromChildIndex, toIndex;
  if (this.next_ && this.next_.keys_.length > lf.index.BTreeNode_.MIN_KEY_LEN_) {
    from = this.next_, fromChildIndex = fromIndex = 0, toIndex = this.keys_.length + 1;
  } else {
    if (this.prev_ && this.prev_.keys_.length > lf.index.BTreeNode_.MIN_KEY_LEN_) {
      from = this.prev_, fromIndex = this.prev_.keys_.length - 1, fromChildIndex = this.isLeaf_() ? fromIndex : fromIndex + 1, toIndex = 0;
    } else {
      return !1;
    }
  }
  this.keys_.splice(toIndex, 0, from.keys_[fromIndex]);
  from.keys_.splice(fromIndex, 1);
  var child = this.isLeaf_() ? this.values_ : this.children_, fromChild = null;
  this.isLeaf_() ? fromChild = from.values_ : (fromChild = from.children_, fromChild[fromChildIndex].parent_ = this);
  child.splice(toIndex, 0, fromChild[fromChildIndex]);
  fromChild.splice(fromChildIndex, 1);
  from.isLeaf_() || (from.fix_(), this.fix_());
  return !0;
};
lf.index.BTreeNode_.prototype.merge_ = function(parentPos) {
  var mergeTo, keyOffset, childOffset;
  this.next_ && this.next_.keys_.length < lf.index.BTreeNode_.MAX_KEY_LEN_ ? (mergeTo = this.next_, childOffset = keyOffset = 0) : this.prev_ && (mergeTo = this.prev_, keyOffset = mergeTo.keys_.length, childOffset = mergeTo.isLeaf_() ? mergeTo.values_.length : mergeTo.children_.length);
  var args = [keyOffset, 0].concat(this.keys_);
  Array.prototype.splice.apply(mergeTo.keys_, args);
  var myChildren = null;
  this.isLeaf_() ? myChildren = this.values_ : (myChildren = this.children_, myChildren.forEach(function(node) {
    node.parent_ = mergeTo;
  }));
  args = [childOffset, 0].concat(myChildren);
  Array.prototype.splice.apply(mergeTo.isLeaf_() ? mergeTo.values_ : mergeTo.children_, args);
  lf.index.BTreeNode_.associate_(this.prev_, this.next_);
  mergeTo.isLeaf_() || mergeTo.fix_();
  -1 != parentPos && (this.parent_.keys_.splice(parentPos, 1), this.parent_.children_.splice(parentPos, 1));
};
lf.index.BTreeNode_.prototype.insert = function(key, value, opt_replace) {
  var pos = this.searchKey_(key);
  if (this.isLeaf_()) {
    if (this.tree_.eq(this.keys_[pos], key)) {
      if (opt_replace) {
        this.tree_.stats().remove(key, this.tree_.isUniqueKey() ? 1 : this.values_[pos].length), this.values_[pos] = this.tree_.isUniqueKey() ? value : [value];
      } else {
        if (this.tree_.isUniqueKey()) {
          throw new lf.Exception(201);
        }
        if (!lf.structs.array.binaryInsert(this.values_[pos], value)) {
          throw new lf.Exception(109);
        }
      }
      this.tree_.stats().add(key, 1);
      return this;
    }
    this.keys_.splice(pos, 0, key);
    this.values_.splice(pos, 0, this.tree_.isUniqueKey() ? value : [value]);
    this.tree_.stats().add(key, 1);
    return this.keys_.length == lf.index.BTreeNode_.MAX_COUNT_ ? this.splitLeaf_() : this;
  }
  var pos = this.tree_.eq(this.keys_[pos], key) ? pos + 1 : pos, node = this.children_[pos].insert(key, value, opt_replace);
  node.isLeaf_() || 1 != node.keys_.length || (this.keys_.splice(pos, 0, node.keys_[0]), node.children_[1].parent_ = this, node.children_[0].parent_ = this, this.children_.splice(pos, 1, node.children_[1]), this.children_.splice(pos, 0, node.children_[0]));
  return this.keys_.length == lf.index.BTreeNode_.MAX_COUNT_ ? this.splitInternal_() : this;
};
lf.index.BTreeNode_.prototype.splitLeaf_ = function() {
  var half = lf.index.BTreeNode_.MIN_KEY_LEN_, right = lf.index.BTreeNode_.create(this.tree_), root = lf.index.BTreeNode_.create(this.tree_);
  root.height_ = 1;
  root.keys_ = [this.keys_[half]];
  root.children_ = [this, right];
  root.parent_ = this.parent_;
  this.parent_ = root;
  right.keys_ = this.keys_.splice(half);
  right.values_ = this.values_.splice(half);
  right.parent_ = root;
  lf.index.BTreeNode_.associate_(right, this.next_);
  lf.index.BTreeNode_.associate_(this, right);
  return root;
};
lf.index.BTreeNode_.prototype.splitInternal_ = function() {
  var half = lf.index.BTreeNode_.MIN_KEY_LEN_, root = lf.index.BTreeNode_.create(this.tree_), right = lf.index.BTreeNode_.create(this.tree_);
  root.parent_ = this.parent_;
  root.height_ = this.height_ + 1;
  root.keys_ = [this.keys_[half]];
  root.children_ = [this, right];
  this.keys_.splice(half, 1);
  right.parent_ = root;
  right.height_ = this.height_;
  right.keys_ = this.keys_.splice(half);
  right.children_ = this.children_.splice(half + 1);
  right.children_.forEach(function(node) {
    node.parent_ = right;
  });
  this.parent_ = root;
  lf.index.BTreeNode_.associate_(right, this.next_);
  lf.index.BTreeNode_.associate_(this, right);
  return root;
};
lf.index.BTreeNode_.prototype.searchKey_ = function(key) {
  for (var left = 0, right = this.keys_.length;left < right;) {
    var middle = left + right >> 1;
    this.tree_.lt(this.keys_[middle], key) ? left = middle + 1 : right = middle;
  }
  return left;
};
lf.index.BTreeNode_.prototype.getContainingLeaf = function(key) {
  if (!this.isLeaf_()) {
    var pos = this.searchKey_(key);
    this.tree_.eq(this.keys_[pos], key) && pos++;
    return this.children_[pos].getContainingLeaf(key);
  }
  return this;
};
lf.index.BTreeNode_.prototype.getRange = function(keyRange, params, results) {
  var c = this.tree_.comparator(), left = 0, right = this.keys_.length - 1, compare = function(coverage) {
    return coverage[0] ? coverage[1] ? lf.index.Favor.TIE : lf.index.Favor.LHS : lf.index.Favor.RHS;
  }, keys = this.keys_, favorLeft = compare(c.compareRange(keys[left], keyRange)), favorRight = compare(c.compareRange(keys[right], keyRange));
  if (favorLeft != lf.index.Favor.LHS && (favorLeft != lf.index.Favor.RHS || favorRight != lf.index.Favor.RHS)) {
    var getMidPoint = function(l, r) {
      var mid = l + r >> 1;
      return mid == l ? mid + 1 : mid;
    }, findFirstKey = function(l, r, favorR) {
      if (l >= r) {
        return favorR == lf.index.Favor.TIE ? r : -1;
      }
      var favorL = compare(c.compareRange(keys[l], keyRange));
      if (favorL == lf.index.Favor.TIE) {
        return l;
      }
      if (favorL == lf.index.Favor.LHS) {
        return -1;
      }
      var mid = getMidPoint(l, r);
      if (mid == r) {
        return favorR == lf.index.Favor.TIE ? r : -1;
      }
      var favorM = compare(c.compareRange(keys[mid], keyRange));
      return favorM == lf.index.Favor.TIE ? findFirstKey(l, mid, favorM) : favorM == lf.index.Favor.RHS ? findFirstKey(mid + 1, r, favorR) : findFirstKey(l + 1, mid, favorM);
    }, findLastKey = function(l, r) {
      if (l >= r) {
        return l;
      }
      var favorR = compare(c.compareRange(keys[r], keyRange));
      if (favorR == lf.index.Favor.TIE) {
        return r;
      }
      if (favorR == lf.index.Favor.RHS) {
        return l;
      }
      var mid = getMidPoint(l, r);
      if (mid == r) {
        return l;
      }
      var favorM = compare(c.compareRange(keys[mid], keyRange));
      return favorM == lf.index.Favor.TIE ? findLastKey(mid, r) : favorM == lf.index.Favor.LHS ? findLastKey(l, mid - 1) : -1;
    };
    favorLeft != lf.index.Favor.TIE && (left = findFirstKey(left + 1, right, favorRight));
    -1 != left && (right = findLastKey(left, right), -1 != right && right >= left && this.appendResults_(params, results, left, right + 1));
  }
};
lf.index.BTreeNode_.prototype.appendResults_ = function(params, results, from, to) {
  for (var i = from;i < to && (params.reverse || !(params.count >= params.limit));++i) {
    if (this.tree_.isUniqueKey()) {
      !params.reverse && params.skip ? params.skip-- : results[params.count++] = this.values_[i];
    } else {
      for (var j = 0;j < this.values_[i].length && params.count < results.length;++j) {
        !params.reverse && params.skip ? params.skip-- : results[params.count++] = this.values_[i][j];
      }
    }
  }
};
lf.index.BTreeNode_.prototype.fill = function(params, results) {
  if (this.isLeaf_()) {
    for (var i = 0;i < this.values_.length && 0 < params.count;++i) {
      if (0 < params.offset) {
        if (params.offset -= this.tree_.isUniqueKey() ? 1 : this.values_[i].length, 0 > params.offset) {
          for (var j = this.values_[i].length + params.offset;j < this.values_[i].length && 0 < params.count;++j) {
            results[params.startIndex++] = this.values_[i][j], params.count--;
          }
        }
      } else {
        if (this.tree_.isUniqueKey()) {
          results[params.startIndex++] = this.values_[i], params.count--;
        } else {
          for (j = 0;j < this.values_[i].length && 0 < params.count;++j) {
            results[params.startIndex++] = this.values_[i][j], params.count--;
          }
        }
      }
    }
  } else {
    for (i = 0;i < this.children_.length && 0 < params.count;++i) {
      this.children_[i].fill(params, results);
    }
  }
};
lf.index.BTreeNode_.serialize = function(start) {
  for (var rows = [], node = start;node;) {
    var payload = [node.keys_, node.values_];
    rows.push(new lf.Row(node.id_, payload));
    node = node.next_;
  }
  return rows;
};
lf.index.BTreeNode_.deserialize = function(rows, tree) {
  for (var stats = tree.stats(), leaves = rows.map(function(row) {
    var node = new lf.index.BTreeNode_(row.id(), tree);
    node.keys_ = row.payload()[0];
    node.values_ = row.payload()[1];
    node.keys_.forEach(function(key, index) {
      stats.add(key, tree.isUniqueKey() ? 1 : node.values_[index].length);
    });
    return node;
  }), i = 0;i < leaves.length - 1;++i) {
    lf.index.BTreeNode_.associate_(leaves[i], leaves[i + 1]);
  }
  return 1 < leaves.length ? lf.index.BTreeNode_.createInternals_(leaves[0]) : leaves[0];
};

lf.index.ComparatorFactory = {};
lf.index.ComparatorFactory.create = function(indexSchema) {
  if (1 == indexSchema.columns.length) {
    return new lf.index.SimpleComparator(indexSchema.columns[0].order);
  }
  var orders = indexSchema.columns.map(function(col) {
    return col.order;
  });
  return new lf.index.MultiKeyComparator(orders);
};
lf.index.SimpleComparator = function(order) {
  this.compare_ = order == lf.Order.DESC ? lf.index.SimpleComparator.compareDescending : lf.index.SimpleComparator.compareAscending;
  this.normalizeKeyRange_ = order == lf.Order.DESC ? function(opt_keyRange) {
    return goog.isDefAndNotNull(opt_keyRange) ? opt_keyRange.reverse() : null;
  } : function(opt_keyRange) {
    return opt_keyRange || null;
  };
  this.orderRange_ = order == lf.Order.DESC ? lf.index.SimpleComparator.orderRangeDescending : lf.index.SimpleComparator.orderRangeAscending;
};
goog.inherits(lf.index.SimpleComparator, lf.index.Comparator);
lf.index.SimpleComparator.compareAscending = function(lhs, rhs) {
  return lhs > rhs ? lf.index.Favor.LHS : lhs < rhs ? lf.index.Favor.RHS : lf.index.Favor.TIE;
};
lf.index.SimpleComparator.compareDescending = function(lhs, rhs) {
  return lf.index.SimpleComparator.compareAscending(rhs, lhs);
};
lf.index.SimpleComparator.orderRangeAscending = function(lhs, rhs) {
  return lf.index.SingleKeyRange.compare(lhs, rhs);
};
lf.index.SimpleComparator.orderRangeDescending = function(lhs, rhs) {
  return lf.index.SingleKeyRange.compare(rhs, lhs);
};
lf.index.SimpleComparator.prototype.compareRange = function(key, naturalRange) {
  var range = this.normalizeKeyRange_(naturalRange), results = [goog.isNull(range.from), goog.isNull(range.to)];
  if (!results[0]) {
    var favor = this.compare_(key, range.from);
    results[0] = range.excludeLower ? favor == lf.index.Favor.LHS : favor != lf.index.Favor.RHS;
  }
  results[1] || (favor = this.compare_(key, range.to), results[1] = range.excludeUpper ? favor == lf.index.Favor.RHS : favor != lf.index.Favor.LHS);
  return results;
};
lf.index.SimpleComparator.prototype.compare = function(lhs, rhs) {
  return this.compare_(lhs, rhs);
};
lf.index.SimpleComparator.prototype.min = function(lhs, rhs) {
  return lhs < rhs ? lf.index.Favor.LHS : lhs == rhs ? lf.index.Favor.TIE : lf.index.Favor.RHS;
};
lf.index.SimpleComparator.prototype.max = function(lhs, rhs) {
  return lhs > rhs ? lf.index.Favor.LHS : lhs == rhs ? lf.index.Favor.TIE : lf.index.Favor.RHS;
};
lf.index.SimpleComparator.prototype.isInRange = function(key, range) {
  var results = this.compareRange(key, range);
  return results[0] && results[1];
};
lf.index.SimpleComparator.prototype.orderKeyRange = function(lhs, rhs) {
  return this.orderRange_(lhs, rhs);
};
lf.index.SimpleComparator.prototype.sortKeyRanges = function(keyRanges) {
  return keyRanges.filter(function(range) {
    return !goog.isNull(range);
  }).sort(goog.bind(function(lhs, rhs) {
    return this.orderRange_(lhs, rhs);
  }, this));
};
lf.index.SimpleComparator.prototype.isLeftOpen = function(range) {
  return goog.isNull(this.normalizeKeyRange_(range).from);
};
lf.index.SimpleComparator.prototype.rangeToKeys = function(naturalRange) {
  var range = this.normalizeKeyRange_(naturalRange);
  return [range.from, range.to];
};
lf.index.SimpleComparator.prototype.toString = function() {
  return this.compare_ == lf.index.SimpleComparator.compareDescending ? "SimpleComparator_DESC" : "SimpleComparator_ASC";
};
lf.index.MultiKeyComparator = function(orders) {
  this.comparators_ = orders.map(function(order) {
    return new lf.index.SimpleComparator(order);
  });
};
goog.inherits(lf.index.MultiKeyComparator, lf.index.Comparator);
lf.index.MultiKeyComparator.createOrders = function(numKeys, order) {
  for (var orders = Array(numKeys), i = 0;i < numKeys;++i) {
    orders[i] = order;
  }
  return orders;
};
lf.index.MultiKeyComparator.prototype.forEach_ = function(lhs, rhs, fn) {
  for (var favor = lf.index.Favor.TIE, i = 0;i < this.comparators_.length && favor == lf.index.Favor.TIE;++i) {
    favor = fn(this.comparators_[i], lhs[i], rhs[i]);
  }
  return favor;
};
lf.index.MultiKeyComparator.prototype.compare = function(lhs, rhs) {
  return this.forEach_(lhs, rhs, function(c, l, r) {
    return c.compare(l, r);
  });
};
lf.index.MultiKeyComparator.prototype.min = function(lhs, rhs) {
  return this.forEach_(lhs, rhs, function(c, l, r) {
    return c.min(l, r);
  });
};
lf.index.MultiKeyComparator.prototype.max = function(lhs, rhs) {
  return this.forEach_(lhs, rhs, function(c, l, r) {
    return c.max(l, r);
  });
};
lf.index.MultiKeyComparator.prototype.compareRange = function(key, range) {
  for (var results = [!0, !0], i = 0;i < this.comparators_.length && (results[0] || results[1]);++i) {
    var dimensionResults = this.comparators_[i].compareRange(key[i], range[i]);
    results[0] = results[0] && dimensionResults[0];
    results[1] = results[1] && dimensionResults[1];
  }
  return results;
};
lf.index.MultiKeyComparator.prototype.isInRange = function(key, range) {
  for (var isInRange = !0, i = 0;i < this.comparators_.length && isInRange;++i) {
    isInRange = this.comparators_[i].isInRange(key[i], range[i]);
  }
  return isInRange;
};
lf.index.MultiKeyComparator.prototype.sortKeyRanges = function(keyRanges) {
  for (var outputKeyRanges = keyRanges.filter(function(range) {
    return range.every(goog.isDefAndNotNull);
  }), keysPerDimensions = Array(this.comparators_.length), i$$0 = 0;i$$0 < keysPerDimensions.length;i$$0++) {
    keysPerDimensions[i$$0] = outputKeyRanges.map(function(range) {
      return range[i$$0];
    });
  }
  keysPerDimensions.forEach(function(keys, i) {
    keys.sort(goog.bind(function(lhs, rhs) {
      return this.comparators_[i].orderKeyRange(lhs, rhs);
    }, this));
  }, this);
  for (var finalKeyRanges = Array(outputKeyRanges.length), i$$0 = 0;i$$0 < finalKeyRanges.length;i$$0++) {
    finalKeyRanges[i$$0] = keysPerDimensions.map(function(keys) {
      return keys[i$$0];
    });
  }
  return finalKeyRanges.sort(goog.bind(function(lhs, rhs) {
    for (var favor = lf.index.Favor.TIE, i = 0;i < this.comparators_.length && favor == lf.index.Favor.TIE;++i) {
      favor = this.comparators_[i].orderKeyRange(lhs[i], rhs[i]);
    }
    return favor;
  }, this));
};
lf.index.MultiKeyComparator.prototype.isLeftOpen = function(range) {
  return this.comparators_[0].isLeftOpen(range[0]);
};
lf.index.MultiKeyComparator.prototype.rangeToKeys = function(keyRange) {
  var startKey = keyRange.map(function(range, i) {
    return this.comparators_[i].rangeToKeys(range)[0];
  }, this), endKey = keyRange.map(function(range, i) {
    return this.comparators_[i].rangeToKeys(range)[1];
  }, this);
  return [startKey, endKey];
};
lf.index.NullableIndex = function(index) {
  this.index_ = index;
  this.nulls_ = lf.structs.set.create();
  this.statsNull_ = new lf.index.Stats;
  this.stats_ = new lf.index.Stats;
};
lf.index.NullableIndex.prototype.getName = function() {
  return this.index_.getName();
};
lf.index.NullableIndex.prototype.add = function(key, value) {
  goog.isNull(key) ? (this.nulls_.add(value), this.statsNull_.add(key, 1)) : this.index_.add(key, value);
};
lf.index.NullableIndex.prototype.set = function(key, value) {
  goog.isNull(key) ? (this.nulls_.clear(), this.statsNull_.clear(), this.add(key, value)) : this.index_.set(key, value);
};
lf.index.NullableIndex.prototype.remove = function(key, opt_rowId) {
  goog.isNull(key) ? opt_rowId ? (this.nulls_.delete(opt_rowId), this.statsNull_.remove(key, 1)) : (this.nulls_.clear(), this.statsNull_.clear()) : this.index_.remove(key, opt_rowId);
};
lf.index.NullableIndex.prototype.get = function(key) {
  return goog.isNull(key) ? lf.structs.set.values(this.nulls_) : this.index_.get(key);
};
lf.index.NullableIndex.prototype.cost = function(opt_keyRange) {
  return this.index_.cost(opt_keyRange);
};
lf.index.NullableIndex.prototype.stats = function() {
  this.stats_.updateFromList([this.index_.stats(), this.statsNull_]);
  return this.stats_;
};
lf.index.NullableIndex.prototype.getRange = function(opt_keyRanges, opt_reverseOrder, opt_limit, opt_skip) {
  var results = this.index_.getRange(opt_keyRanges, opt_reverseOrder, opt_limit, opt_skip);
  return goog.isDefAndNotNull(opt_keyRanges) ? results : results.concat(lf.structs.set.values(this.nulls_));
};
lf.index.NullableIndex.prototype.clear = function() {
  this.nulls_.clear();
  this.index_.clear();
};
lf.index.NullableIndex.prototype.containsKey = function(key) {
  return goog.isNull(key) ? 0 != this.nulls_.size : this.index_.containsKey(key);
};
lf.index.NullableIndex.prototype.min = function() {
  return this.index_.min();
};
lf.index.NullableIndex.prototype.max = function() {
  return this.index_.max();
};
lf.index.NullableIndex.NULL_ROW_ID_ = -2;
lf.index.NullableIndex.prototype.serialize = function() {
  var rows = [new lf.Row(lf.index.NullableIndex.NULL_ROW_ID_, lf.structs.set.values(this.nulls_))];
  return rows.concat(this.index_.serialize());
};
lf.index.NullableIndex.prototype.comparator = function() {
  return this.index_.comparator();
};
lf.index.NullableIndex.deserialize = function(deserializeFn, rows) {
  for (var index = -1, i = 0;i < rows.length;++i) {
    if (rows[i].id() == lf.index.NullableIndex.NULL_ROW_ID_) {
      index = i;
      break;
    }
  }
  if (-1 == index) {
    throw new lf.Exception(102);
  }
  var nulls = rows[index].payload(), newRows = rows.slice(0);
  newRows.splice(index, 1);
  var tree = deserializeFn(newRows), nullableIndex = new lf.index.NullableIndex(tree);
  nulls.forEach(function(rowId) {
    nullableIndex.nulls_.add(rowId);
  });
  return nullableIndex;
};
lf.index.NullableIndex.prototype.isUniqueKey = function() {
  return this.index_.isUniqueKey();
};
lf.index.RowId = function(name) {
  this.name_ = name;
  this.rows_ = lf.structs.set.create();
  this.comparator_ = new lf.index.SimpleComparator(lf.Order.ASC);
};
lf.index.RowId.ROW_ID = 0;
lf.index.RowId.prototype.getName = function() {
  return this.name_;
};
lf.index.RowId.prototype.add = function(key) {
  if ("number" != typeof key) {
    throw new lf.Exception(103);
  }
  this.rows_.add(key);
};
lf.index.RowId.prototype.set = function(key, value) {
  this.add(key, value);
};
lf.index.RowId.prototype.remove = function(key) {
  this.rows_.delete(key);
};
lf.index.RowId.prototype.get = function(key) {
  return this.containsKey(key) ? [key] : [];
};
lf.index.RowId.prototype.min = function() {
  return this.minMax_(goog.bind(this.comparator_.min, this.comparator_));
};
lf.index.RowId.prototype.max = function() {
  return this.minMax_(goog.bind(this.comparator_.max, this.comparator_));
};
lf.index.RowId.prototype.minMax_ = function(compareFn) {
  if (0 == this.rows_.size) {
    return null;
  }
  var key$$0 = lf.structs.set.values(this.rows_).reduce(goog.bind(function(keySoFar, key) {
    return goog.isNull(keySoFar) || compareFn(key, keySoFar) == lf.index.Favor.LHS ? key : keySoFar;
  }, this), null);
  return [key$$0, [key$$0]];
};
lf.index.RowId.prototype.cost = function() {
  return this.rows_.size;
};
lf.index.RowId.prototype.getRange = function(opt_keyRanges, opt_reverseOrder, opt_limit, opt_skip) {
  var keyRanges = opt_keyRanges || [lf.index.SingleKeyRange.all()], values = lf.structs.set.values(this.rows_).filter(function(value) {
    return keyRanges.some(function(range) {
      return this.comparator_.isInRange(value, range);
    }, this);
  }, this);
  return lf.index.slice(values, opt_reverseOrder, opt_limit, opt_skip);
};
lf.index.RowId.prototype.clear = function() {
  this.rows_.clear();
};
lf.index.RowId.prototype.containsKey = function(key) {
  return this.rows_.has(key);
};
lf.index.RowId.prototype.serialize = function() {
  return [new lf.Row(lf.index.RowId.ROW_ID, lf.structs.set.values(this.rows_))];
};
lf.index.RowId.prototype.comparator = function() {
  return this.comparator_;
};
lf.index.RowId.deserialize = function(name, rows) {
  var index = new lf.index.RowId(name), rowIds = rows[0].payload();
  rowIds.forEach(function(rowId) {
    index.add(rowId, rowId);
  });
  return index;
};
lf.index.RowId.prototype.isUniqueKey = function() {
  return !0;
};
lf.index.RowId.prototype.stats = function() {
  var stats = new lf.index.Stats;
  stats.totalRows = this.rows_.size;
  return stats;
};
lf.cache.Prefetcher = function(global) {
  this.global_ = global;
  this.backStore_ = global.getService(lf.service.BACK_STORE);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.cache_ = global.getService(lf.service.CACHE);
};
lf.cache.Prefetcher.prototype.init = function(schema) {
  var tables = schema.tables(), execSequentially = goog.bind(function() {
    if (0 == tables.length) {
      return goog.Promise.resolve();
    }
    var table = tables.shift(), whenTableFetched = table.persistentIndex() ? this.fetchTableWithPersistentIndices_(table) : this.fetchTable_(table);
    return whenTableFetched.then(execSequentially);
  }, this);
  return execSequentially();
};
lf.cache.Prefetcher.prototype.fetchTable_ = function(table) {
  var journal = new lf.cache.Journal(this.global_, lf.structs.set.create([table])), tx = this.backStore_.createTx(lf.TransactionType.READ_ONLY, journal), store = tx.getTable(table.getName(), goog.bind(table.deserializeRow, table));
  return store.get([]).then(goog.bind(function(results) {
    this.cache_.set(table.getName(), results);
    this.reconstructNonPersistentIndices_(table, results);
  }, this));
};
lf.cache.Prefetcher.prototype.reconstructNonPersistentIndices_ = function(tableSchema, tableRows) {
  var indices = this.indexStore_.getTableIndices(tableSchema.getName());
  tableRows.forEach(function(row) {
    indices.forEach(function(index) {
      var key = row.keyOfIndex(index.getName());
      index.add(key, row.id());
    });
  });
};
lf.cache.Prefetcher.prototype.fetchTableWithPersistentIndices_ = function(tableSchema) {
  var journal = new lf.cache.Journal(this.global_, lf.structs.set.create([tableSchema])), tx = this.backStore_.createTx(lf.TransactionType.READ_ONLY, journal), store = tx.getTable(tableSchema.getName(), tableSchema.deserializeRow), whenTableContentsFetched = store.get([]).then(goog.bind(function(results) {
    this.cache_.set(tableSchema.getName(), results);
  }, this)), whenIndicesReconstructed = tableSchema.getIndices().map(function(indexSchema) {
    return this.reconstructPersistentIndex_(indexSchema, tx);
  }, this).concat(this.reconstructPersistentRowIdIndex_(tableSchema, tx));
  return goog.Promise.all(whenIndicesReconstructed.concat(whenTableContentsFetched));
};
lf.cache.Prefetcher.prototype.reconstructPersistentIndex_ = function(indexSchema, tx) {
  var indexTable = tx.getTable(indexSchema.getNormalizedName(), lf.Row.deserialize, lf.backstore.TableType.INDEX), comparator = lf.index.ComparatorFactory.create(indexSchema);
  return indexTable.get([]).then(goog.bind(function(serializedRows) {
    goog.asserts.assert(serializedRows[0].payload().type == lf.index.IndexMetadata.Type.BTREE);
    if (1 < serializedRows.length) {
      if (indexSchema.hasNullableColumn()) {
        var deserializeFn = lf.index.BTree.deserialize.bind(void 0, comparator, indexSchema.getNormalizedName(), indexSchema.isUnique), nullableIndex = lf.index.NullableIndex.deserialize(deserializeFn, serializedRows.slice(1));
        this.indexStore_.set(indexSchema.tableName, nullableIndex);
      } else {
        var btreeIndex = lf.index.BTree.deserialize(comparator, indexSchema.getNormalizedName(), indexSchema.isUnique, serializedRows.slice(1));
        this.indexStore_.set(indexSchema.tableName, btreeIndex);
      }
    }
  }, this));
};
lf.cache.Prefetcher.prototype.reconstructPersistentRowIdIndex_ = function(tableSchema, tx) {
  var indexTable = tx.getTable(tableSchema.getRowIdIndexName(), lf.Row.deserialize, lf.backstore.TableType.INDEX);
  return indexTable.get([]).then(goog.bind(function(serializedRows) {
    goog.asserts.assert(serializedRows[0].payload().type == lf.index.IndexMetadata.Type.ROW_ID);
    if (1 < serializedRows.length) {
      var rowIdIndex = lf.index.RowId.deserialize(tableSchema.getRowIdIndexName(), serializedRows.slice(1));
      this.indexStore_.set(tableSchema.getName(), rowIdIndex);
    }
  }, this));
};
lf.index.IndexStore = function() {
};
lf.index.MemoryIndexStore = function() {
  this.store_ = lf.structs.map.create();
  this.tableIndices_ = lf.structs.map.create();
};
lf.index.MemoryIndexStore.prototype.init = function(schema) {
  var tables = schema.tables();
  tables.forEach(function(table) {
    var tableIndices = [];
    this.tableIndices_.set(table.getName(), tableIndices);
    var rowIdIndexName = table.getRowIdIndexName(), rowIdIndex = this.get(rowIdIndexName);
    if (goog.isNull(rowIdIndex)) {
      var index$$0 = new lf.index.RowId(rowIdIndexName);
      tableIndices.push(index$$0);
      this.store_.set(rowIdIndexName, index$$0);
    }
    table.getIndices().forEach(function(indexSchema) {
      var index = lf.index.MemoryIndexStore.createIndex_(indexSchema);
      tableIndices.push(index);
      this.store_.set(indexSchema.getNormalizedName(), index);
    }, this);
  }, this);
  return goog.Promise.resolve();
};
lf.index.MemoryIndexStore.createIndex_ = function(indexSchema) {
  var comparator = lf.index.ComparatorFactory.create(indexSchema), index = new lf.index.BTree(indexSchema.getNormalizedName(), comparator, indexSchema.isUnique);
  return indexSchema.hasNullableColumn() ? new lf.index.NullableIndex(index) : index;
};
lf.index.MemoryIndexStore.prototype.get = function(name) {
  return this.store_.get(name) || null;
};
lf.index.MemoryIndexStore.prototype.set = function(tableName, index) {
  var tableIndices = this.tableIndices_.get(tableName) || null;
  goog.isNull(tableIndices) && (tableIndices = [], this.tableIndices_.set(tableName, tableIndices));
  for (var existsAt = null, i = 0;i < tableIndices.length;i++) {
    if (tableIndices[i].getName() == index.getName()) {
      existsAt = i;
      break;
    }
  }
  !goog.isNull(existsAt) && 0 < tableIndices.length ? tableIndices.splice(existsAt, 1, index) : tableIndices.push(index);
  this.store_.set(index.getName(), index);
};
lf.index.MemoryIndexStore.prototype.getTableIndices = function(tableName) {
  return this.tableIndices_.get(tableName) || [];
};
lf.index.SingleKeyRangeSet = function(opt_ranges) {
  this.ranges_ = [];
  goog.isDef(opt_ranges) && this.add(opt_ranges);
};
lf.index.SingleKeyRangeSet.prototype.toString = function() {
  return this.ranges_.map(function(r) {
    return r.toString();
  }).join(",");
};
lf.index.SingleKeyRangeSet.prototype.containsKey = function(key) {
  return this.ranges_.some(function(r) {
    return r.contains(key);
  });
};
lf.index.SingleKeyRangeSet.prototype.getValues = function() {
  return this.ranges_;
};
lf.index.SingleKeyRangeSet.prototype.add = function(keyRanges) {
  if (0 != keyRanges.length) {
    var ranges = this.ranges_.concat(keyRanges);
    if (1 == ranges.length) {
      this.ranges_ = ranges;
    } else {
      ranges.sort(lf.index.SingleKeyRange.compare);
      for (var results = [], start = ranges[0], i = 1;i < ranges.length;++i) {
        start.overlaps(ranges[i]) ? start = lf.index.SingleKeyRange.getBoundingRange(start, ranges[i]) : (results.push(start), start = ranges[i]);
      }
      results.push(start);
      this.ranges_ = results;
    }
  }
};
lf.index.SingleKeyRangeSet.prototype.equals = function(set) {
  return this.ranges_.length == set.ranges_.length ? 0 == this.ranges_.length || this.ranges_.every(function(r, index) {
    return r.equals(set.ranges_[index]);
  }) : !1;
};
lf.index.SingleKeyRangeSet.prototype.getBoundingRange = function() {
  if (1 >= this.ranges_.length) {
    return 0 == this.ranges_.length ? null : this.ranges_[0];
  }
  var last = this.ranges_.length - 1;
  return lf.index.SingleKeyRange.getBoundingRange(this.ranges_[0], this.ranges_[last]);
};
lf.index.SingleKeyRangeSet.intersect = function(s0, s1) {
  var ranges = s0.getValues().map(function(r0) {
    return s1.getValues().map(function(r1) {
      return lf.index.SingleKeyRange.and(r0, r1);
    });
  }), results = [];
  ranges.forEach(function(dimension) {
    results = results.concat(dimension);
  });
  return new lf.index.SingleKeyRangeSet(results.filter(function(r) {
    return !goog.isNull(r);
  }));
};
lf.tree = {};
lf.tree.map = function(original, mapFn) {
  var copyParentStack = [], nextParent = null, copyRoot = null;
  original.traverse(function(node) {
    var newNode = mapFn(node);
    null == node.getParent() ? copyRoot = newNode : nextParent.addChild(newNode);
    var original = node.getParent(), clone = nextParent;
    if (!goog.isNull(original)) {
      var cloneFull = original.getChildCount() == clone.getChildCount();
      if (cloneFull) {
        var cloneIndex = copyParentStack.indexOf(clone);
        -1 != cloneIndex && copyParentStack.splice(cloneIndex, 1);
      }
    }
    1 < node.getChildCount() && copyParentStack.push(newNode);
    nextParent = node.isLeaf() ? copyParentStack[copyParentStack.length - 1] : newNode;
  });
  return copyRoot;
};
lf.tree.getLeafNodes = function(node$$0) {
  return lf.tree.find(node$$0, function(node) {
    return node.isLeaf();
  });
};
lf.tree.removeNode = function(node) {
  var parentNode = node.getParent(), originalIndex = 0;
  goog.isNull(parentNode) || (originalIndex = parentNode.getChildren().indexOf(node), parentNode.removeChild(node));
  var children = node.getChildren().slice();
  children.forEach(function(child, index) {
    node.removeChild(child);
    goog.isNull(parentNode) || parentNode.addChildAt(child, originalIndex + index);
  });
  return {parent:parentNode, children:children};
};
lf.tree.insertNodeAt = function(existingNode, newNode) {
  var children = existingNode.getChildren().slice();
  children.forEach(function(child) {
    existingNode.removeChild(child);
    newNode.addChild(child);
  });
  existingNode.addChild(newNode);
};
lf.tree.swapNodeWithChild = function(node) {
  goog.asserts.assert(1 == node.getChildCount());
  var child = node.getChildAt(0);
  goog.asserts.assert(1 == child.getChildCount());
  lf.tree.removeNode(node);
  lf.tree.insertNodeAt(child, node);
  return child;
};
lf.tree.pushNodeBelowChild = function(node, shouldPushDownFn, cloneFn) {
  goog.asserts.assert(1 == node.getChildCount());
  var child = node.getChildAt(0);
  goog.asserts.assert(1 < child.getChildCount());
  var grandChildren = child.getChildren().slice(), canPushDown = grandChildren.some(function(grandChild) {
    return shouldPushDownFn(grandChild);
  });
  if (!canPushDown) {
    return node;
  }
  lf.tree.removeNode(node);
  grandChildren.forEach(function(grandChild, index) {
    if (shouldPushDownFn(grandChild)) {
      var newNode = cloneFn(node);
      child.removeChildAt(index);
      newNode.addChild(grandChild);
      child.addChildAt(newNode, index);
    }
  });
  return child;
};
lf.tree.replaceChainWithChain = function(oldHead, oldTail, newHead, newTail) {
  var parentNode = oldHead.getParent();
  if (!goog.isNull(parentNode)) {
    var oldHeadIndex = parentNode.getChildren().indexOf(oldHead);
    parentNode.removeChildAt(oldHeadIndex);
    parentNode.addChildAt(newHead, oldHeadIndex);
  }
  oldTail.getChildren().slice().forEach(function(child) {
    oldTail.removeChild(child);
    newTail.addChild(child);
  });
  return newHead;
};
lf.tree.replaceNodeWithChain = function(node, head, tail) {
  return lf.tree.replaceChainWithChain(node, node, head, tail);
};
lf.tree.replaceChainWithNode = function(head, tail, node) {
  return lf.tree.replaceChainWithChain(head, tail, node, node);
};
lf.tree.find = function(root, filterFn, opt_stopFn) {
  var results = [], filterRec = function(node) {
    filterFn(node) && results.push(node);
    goog.isDefAndNotNull(opt_stopFn) && opt_stopFn(node) || node.getChildren().forEach(filterRec);
  };
  filterRec(root);
  return results;
};
lf.tree.toString = function(rootNode, opt_stringFn) {
  var stringFn = opt_stringFn || function(node) {
    return node.toString() + "\n";
  }, out = "";
  rootNode.traverse(function(node) {
    for (var i = 0;i < node.getDepth();i++) {
      out += "-";
    }
    out += stringFn(node);
  });
  return out;
};
lf.pred.Operator = {AND:"and", OR:"or"};
lf.pred.CombinedPredicate = function(operator) {
  lf.pred.PredicateNode.call(this);
  this.operator = operator;
  this.isComplement_ = !1;
};
goog.inherits(lf.pred.CombinedPredicate, lf.pred.PredicateNode);
lf.pred.CombinedPredicate.prototype.copy = function() {
  var copy = lf.tree.map(this, function(node) {
    if (node instanceof lf.pred.CombinedPredicate) {
      var tempCopy = new lf.pred.CombinedPredicate(node.operator);
      tempCopy.isComplement_ = node.isComplement_;
      tempCopy.setId(node.getId());
      return tempCopy;
    }
    return node.copy();
  }.bind(this));
  return copy;
};
lf.pred.CombinedPredicate.prototype.getColumns = function(opt_results) {
  var columns = opt_results || [];
  this.traverse(function(child) {
    child != this && child.getColumns(columns);
  }.bind(this));
  var columnSet = lf.structs.set.create(columns);
  return lf.structs.set.values(columnSet);
};
lf.pred.CombinedPredicate.prototype.setComplement = function(isComplement) {
  this.isComplement_ != isComplement && (this.isComplement_ = isComplement, this.operator = this.operator == lf.pred.Operator.AND ? lf.pred.Operator.OR : lf.pred.Operator.AND, this.getChildren().forEach(function(condition) {
    return condition.setComplement(isComplement);
  }));
};
lf.pred.CombinedPredicate.prototype.eval = function(relation) {
  var results = this.getChildren().map(function(condition) {
    return condition.eval(relation);
  });
  return this.combineResults_(results);
};
lf.pred.CombinedPredicate.prototype.combineResults_ = function(results) {
  return this.operator == lf.pred.Operator.AND ? lf.proc.Relation.intersect(results) : lf.proc.Relation.union(results);
};
lf.pred.CombinedPredicate.prototype.toString = function() {
  return "combined_pred_" + this.operator.toString();
};
goog.labs.object = {};
goog.labs.object.is = function(v, v2) {
  return v === v2 ? 0 !== v || 1 / v === 1 / v2 : v !== v && v2 !== v2;
};
goog.labs.structs = {};
goog.labs.structs.Map = function() {
  this.clear();
};
goog.labs.structs.Map.objectPropertyIsEnumerable_ = Object.prototype.propertyIsEnumerable;
goog.labs.structs.Map.objectHasOwnProperty_ = Object.prototype.hasOwnProperty;
goog.labs.structs.Map.prototype.set = function(key, value) {
  this.assertKeyIsString_(key);
  var newKey = !this.hasKeyInPrimaryStore_(key);
  this.map_[key] = value;
  if ("__proto__" == key || !goog.labs.structs.Map.BrowserFeature.OBJECT_CREATE_SUPPORTED && !goog.labs.structs.Map.objectPropertyIsEnumerable_.call(this.map_, key)) {
    delete this.map_[key];
    var index = goog.array.indexOf(this.secondaryStoreKeys_, key);
    if (newKey = 0 > index) {
      index = this.secondaryStoreKeys_.length;
    }
    this.secondaryStoreKeys_[index] = key;
    this.secondaryStoreValues_[index] = value;
  }
  newKey && this.count_++;
};
goog.labs.structs.Map.prototype.get = function(key, opt_default) {
  this.assertKeyIsString_(key);
  if (this.hasKeyInPrimaryStore_(key)) {
    return this.map_[key];
  }
  var index = goog.array.indexOf(this.secondaryStoreKeys_, key);
  return 0 <= index ? this.secondaryStoreValues_[index] : opt_default;
};
goog.labs.structs.Map.prototype.remove = function(key) {
  this.assertKeyIsString_(key);
  if (this.hasKeyInPrimaryStore_(key)) {
    return this.count_--, delete this.map_[key], !0;
  }
  var index = goog.array.indexOf(this.secondaryStoreKeys_, key);
  return 0 <= index ? (this.count_--, goog.array.removeAt(this.secondaryStoreKeys_, index), goog.array.removeAt(this.secondaryStoreValues_, index), !0) : !1;
};
goog.labs.structs.Map.prototype.addAll = function(map) {
  goog.array.forEach(map.getKeys(), function(key) {
    this.set(key, map.get(key));
  }, this);
};
goog.labs.structs.Map.prototype.isEmpty = function() {
  return !this.count_;
};
goog.labs.structs.Map.prototype.getCount = function() {
  return this.count_;
};
goog.labs.structs.Map.prototype.containsKey = function(key) {
  this.assertKeyIsString_(key);
  return this.hasKeyInPrimaryStore_(key) || goog.array.contains(this.secondaryStoreKeys_, key);
};
goog.labs.structs.Map.prototype.containsValue = function(value) {
  var found = goog.object.some(this.map_, function(v, k) {
    return this.hasKeyInPrimaryStore_(k) && goog.labs.object.is(v, value);
  }, this);
  return found || goog.array.contains(this.secondaryStoreValues_, value);
};
goog.labs.structs.Map.prototype.getKeys = function() {
  var keys;
  if (goog.labs.structs.Map.BrowserFeature.OBJECT_KEYS_SUPPORTED) {
    keys = goog.array.clone(Object.keys(this.map_));
  } else {
    keys = [];
    for (var key in this.map_) {
      goog.labs.structs.Map.objectHasOwnProperty_.call(this.map_, key) && keys.push(key);
    }
  }
  goog.array.extend(keys, this.secondaryStoreKeys_);
  return keys;
};
goog.labs.structs.Map.prototype.getValues = function() {
  for (var values = [], keys = this.getKeys(), i = 0;i < keys.length;i++) {
    values.push(this.get(keys[i]));
  }
  return values;
};
goog.labs.structs.Map.prototype.getEntries = function() {
  for (var entries = [], keys = this.getKeys(), i = 0;i < keys.length;i++) {
    var key = keys[i];
    entries.push([key, this.get(key)]);
  }
  return entries;
};
goog.labs.structs.Map.prototype.clear = function() {
  this.map_ = goog.labs.structs.Map.BrowserFeature.OBJECT_CREATE_SUPPORTED ? Object.create(null) : {};
  this.secondaryStoreKeys_ = [];
  this.secondaryStoreValues_ = [];
  this.count_ = 0;
};
goog.labs.structs.Map.prototype.clone = function() {
  var map = new goog.labs.structs.Map;
  map.addAll(this);
  return map;
};
goog.labs.structs.Map.prototype.hasKeyInPrimaryStore_ = function(key) {
  return "__proto__" == key ? !1 : goog.labs.structs.Map.BrowserFeature.OBJECT_CREATE_SUPPORTED ? key in this.map_ : goog.labs.structs.Map.objectHasOwnProperty_.call(this.map_, key);
};
goog.labs.structs.Map.prototype.assertKeyIsString_ = function(key) {
  goog.asserts.assert(goog.isString(key), "key must be a string.");
};
goog.labs.structs.Map.BrowserFeature = {OBJECT_CREATE_SUPPORTED:!!Object.create, OBJECT_KEYS_SUPPORTED:!!Object.keys};
goog.labs.structs.Multimap = function() {
  this.clear();
};
goog.labs.structs.Multimap.prototype.count_ = 0;
goog.labs.structs.Multimap.prototype.clear = function() {
  this.count_ = 0;
  this.map_ = new goog.labs.structs.Map;
};
goog.labs.structs.Multimap.prototype.clone = function() {
  var map = new goog.labs.structs.Multimap;
  map.addAllFromMultimap(this);
  return map;
};
goog.labs.structs.Multimap.prototype.add = function(key, value) {
  var values = this.map_.get(key);
  values || this.map_.set(key, values = []);
  values.push(value);
  this.count_++;
};
goog.labs.structs.Multimap.prototype.addAllFromMultimap = function(map) {
  goog.array.forEach(map.getEntries(), function(entry) {
    this.add(entry[0], entry[1]);
  }, this);
};
goog.labs.structs.Multimap.prototype.get = function(key) {
  var values = this.map_.get(key);
  return values ? goog.array.clone(values) : [];
};
goog.labs.structs.Multimap.prototype.remove = function(key, value) {
  var values = this.map_.get(key);
  if (!values) {
    return !1;
  }
  var removed = goog.array.removeIf(values, function(v) {
    return goog.labs.object.is(value, v);
  });
  removed && (this.count_--, 0 == values.length && this.map_.remove(key));
  return removed;
};
goog.labs.structs.Multimap.prototype.removeAll = function(key) {
  var values = this.map_.get(key);
  return this.map_.remove(key) ? (this.count_ -= values.length, !0) : !1;
};
goog.labs.structs.Multimap.prototype.isEmpty = function() {
  return !this.count_;
};
goog.labs.structs.Multimap.prototype.getCount = function() {
  return this.count_;
};
goog.labs.structs.Multimap.prototype.containsKey = function(key) {
  return this.map_.containsKey(key);
};
goog.labs.structs.Multimap.prototype.containsValue = function(value) {
  return goog.array.some(this.map_.getValues(), function(values) {
    return goog.array.some(values, function(v) {
      return goog.labs.object.is(v, value);
    });
  });
};
goog.labs.structs.Multimap.prototype.getKeys = function() {
  return this.map_.getKeys();
};
goog.labs.structs.Multimap.prototype.getValues = function() {
  return goog.array.flatten(this.map_.getValues());
};
goog.labs.structs.Multimap.prototype.getEntries = function() {
  for (var keys = this.getKeys(), entries = [], i = 0;i < keys.length;i++) {
    for (var key = keys[i], values = this.get(key), j = 0;j < values.length;j++) {
      entries.push([key, values[j]]);
    }
  }
  return entries;
};
lf.pred.JoinPredicate = function(leftColumn, rightColumn, evaluatorType) {
  lf.pred.PredicateNode.call(this);
  this.leftColumn = leftColumn;
  this.rightColumn = rightColumn;
  this.evaluatorType = evaluatorType;
  this.nullPayload_ = null;
  var registry = lf.eval.Registry.getInstance();
  this.evaluatorFn_ = registry.getEvaluator(this.leftColumn.getType(), this.evaluatorType);
};
goog.inherits(lf.pred.JoinPredicate, lf.pred.PredicateNode);
lf.pred.JoinPredicate.prototype.copy = function() {
  var clone = new lf.pred.JoinPredicate(this.leftColumn, this.rightColumn, this.evaluatorType);
  clone.setId(this.getId());
  return clone;
};
lf.pred.JoinPredicate.prototype.getColumns = function(opt_results) {
  return goog.isDefAndNotNull(opt_results) ? (opt_results.push(this.leftColumn), opt_results.push(this.rightColumn), opt_results) : [this.leftColumn, this.rightColumn];
};
lf.pred.JoinPredicate.prototype.reverse = function() {
  var evaluatorType = this.evaluatorType;
  switch(this.evaluatorType) {
    case lf.eval.Type.GT:
      evaluatorType = lf.eval.Type.LT;
      break;
    case lf.eval.Type.LT:
      evaluatorType = lf.eval.Type.GT;
      break;
    case lf.eval.Type.GTE:
      evaluatorType = lf.eval.Type.LTE;
      break;
    case lf.eval.Type.LTE:
      evaluatorType = lf.eval.Type.GTE;
  }
  var newPredicate = new lf.pred.JoinPredicate(this.rightColumn, this.leftColumn, evaluatorType);
  return newPredicate;
};
lf.pred.JoinPredicate.prototype.eval = function(relation) {
  var entries = relation.entries.filter(function(entry) {
    var leftValue = entry.getField(this.leftColumn), rightValue = entry.getField(this.rightColumn);
    return this.evaluatorFn_(leftValue, rightValue);
  }, this);
  return new lf.proc.Relation(entries, relation.getTables());
};
lf.pred.JoinPredicate.prototype.toString = function() {
  return "join_pred(" + this.leftColumn.getNormalizedName() + ", " + this.rightColumn.getNormalizedName() + ")";
};
lf.pred.JoinPredicate.prototype.appliesToLeft_ = function(relation) {
  return -1 != relation.getTables().indexOf(this.leftColumn.getTable().getEffectiveName());
};
lf.pred.JoinPredicate.prototype.appliesToRight_ = function(relation) {
  return -1 != relation.getTables().indexOf(this.rightColumn.getTable().getEffectiveName());
};
lf.pred.JoinPredicate.prototype.detectLeftRight_ = function(relation1, relation2) {
  var left = null, right = null;
  this.appliesToLeft_(relation1) ? (this.assertRelationsApply_(relation1, relation2), left = relation1, right = relation2) : (this.assertRelationsApply_(relation2, relation1), left = relation2, right = relation1);
  return [left, right];
};
lf.pred.JoinPredicate.prototype.assertRelationsApply_ = function(leftRelation, rightRelation) {
  goog.asserts.assert(this.appliesToLeft_(leftRelation), "Mismatch between join predicate left operand and right relation.");
  goog.asserts.assert(this.appliesToRight_(rightRelation), "Mismatch between join predicate right operand and right relation.");
};
lf.pred.JoinPredicate.prototype.evalRelations = function(relation1, relation2, isOuterJoin) {
  var leftRightRelations = [relation1, relation2];
  isOuterJoin || (leftRightRelations = this.detectLeftRight_(relation1, relation2));
  var leftRelation = leftRightRelations[0], rightRelation = leftRightRelations[1];
  return this.evaluatorType == lf.eval.Type.EQ ? this.evalRelationsHashJoin_(leftRelation, rightRelation, isOuterJoin) : this.evalRelationsNestedLoopJoin_(leftRelation, rightRelation, isOuterJoin);
};
lf.pred.JoinPredicate.prototype.createNullPayload_ = function(table) {
  var payload = {};
  table.getColumns().forEach(function(column) {
    payload[column.getName()] = null;
  });
  return payload;
};
lf.pred.JoinPredicate.prototype.createCombinedEntryForUnmatched_ = function(entry, leftRelationTables) {
  goog.isNull(this.nullPayload_) && (this.nullPayload_ = this.createNullPayload_(this.rightColumn.getTable()));
  var nullEntry = new lf.proc.RelationEntry(new lf.Row(lf.Row.DUMMY_ID, this.nullPayload_), !1), combinedEntry = lf.proc.RelationEntry.combineEntries(entry, leftRelationTables, nullEntry, [this.rightColumn.getTable().getEffectiveName()]);
  return combinedEntry;
};
lf.pred.JoinPredicate.prototype.evalRelationsNestedLoopJoin_ = function(leftRelation, rightRelation, isOuterJoin) {
  for (var combinedEntries = [], leftRelationTables = leftRelation.getTables(), rightRelationTables = rightRelation.getTables(), i = 0;i < leftRelation.entries.length;i++) {
    var matchFound = !1, leftValue = leftRelation.entries[i].getField(this.leftColumn);
    if (!goog.isNull(leftValue)) {
      for (var j = 0;j < rightRelation.entries.length;j++) {
        var predicateResult = this.evaluatorFn_(leftValue, rightRelation.entries[j].getField(this.rightColumn));
        if (predicateResult) {
          var matchFound = !0, combinedEntry = lf.proc.RelationEntry.combineEntries(leftRelation.entries[i], leftRelationTables, rightRelation.entries[j], rightRelationTables);
          combinedEntries.push(combinedEntry);
        }
      }
    }
    isOuterJoin && !matchFound && combinedEntries.push(this.createCombinedEntryForUnmatched_(leftRelation.entries[i], leftRelationTables));
  }
  var srcTables = leftRelation.getTables().concat(rightRelation.getTables());
  return new lf.proc.Relation(combinedEntries, srcTables);
};
lf.pred.JoinPredicate.prototype.evalRelationsHashJoin_ = function(leftRelation, rightRelation, isOuterJoin) {
  var minRelation = leftRelation, maxRelation = rightRelation, minColumn = this.leftColumn, maxColumn = this.rightColumn;
  if (isOuterJoin || leftRelation.entries.length > rightRelation.entries.length) {
    minRelation = rightRelation, maxRelation = leftRelation, minColumn = this.rightColumn, maxColumn = this.leftColumn;
  }
  var map = new goog.labs.structs.Multimap, combinedEntries = [];
  minRelation.entries.forEach(function(entry) {
    var key = String(entry.getField(minColumn));
    map.add(key, entry);
  });
  var minRelationTableNames = minRelation.getTables(), maxRelationTableNames = maxRelation.getTables();
  maxRelation.entries.forEach(function(entry) {
    var value = entry.getField(maxColumn), key = String(value);
    if (!goog.isNull(value) && map.containsKey(key)) {
      var entries = map.get(key);
      entries.forEach(function(innerEntry) {
        var combinedEntry = lf.proc.RelationEntry.combineEntries(entry, maxRelationTableNames, innerEntry, minRelationTableNames);
        combinedEntries.push(combinedEntry);
      });
    } else {
      isOuterJoin && combinedEntries.push(this.createCombinedEntryForUnmatched_(entry, maxRelationTableNames));
    }
  }.bind(this));
  var srcTables = leftRelation.getTables().concat(rightRelation.getTables());
  return new lf.proc.Relation(combinedEntries, srcTables);
};
lf.pred.createPredicate = function(leftOperand, rightOperand, evaluatorType) {
  return goog.isNull(rightOperand) ? new lf.pred.ValuePredicate(leftOperand, rightOperand, evaluatorType) : goog.isDef(rightOperand.getNormalizedName) ? new lf.pred.JoinPredicate(leftOperand, rightOperand, evaluatorType) : new lf.pred.ValuePredicate(leftOperand, rightOperand, evaluatorType);
};
lf.schema = {};
lf.schema.Column = function() {
};
lf.schema.Database = function() {
};
lf.schema.DataStoreType = {};
goog.exportSymbol("lf.schema.DataStoreType", lf.schema.DataStoreType);
lf.schema.DataStoreType.INDEXED_DB = 0;
goog.exportProperty(lf.schema.DataStoreType, "INDEXED_DB", lf.schema.DataStoreType.INDEXED_DB);
lf.schema.DataStoreType.MEMORY = 1;
goog.exportProperty(lf.schema.DataStoreType, "MEMORY", lf.schema.DataStoreType.MEMORY);
lf.schema.DataStoreType.LOCAL_STORAGE = 2;
goog.exportProperty(lf.schema.DataStoreType, "LOCAL_STORAGE", lf.schema.DataStoreType.LOCAL_STORAGE);
lf.schema.DataStoreType.FIREBASE = 3;
goog.exportProperty(lf.schema.DataStoreType, "FIREBASE", lf.schema.DataStoreType.FIREBASE);
lf.schema.DataStoreType.WEB_SQL = 4;
goog.exportProperty(lf.schema.DataStoreType, "WEB_SQL", lf.schema.DataStoreType.WEB_SQL);
lf.schema.DataStoreType.OBSERVABLE_STORE = 5;
goog.exportProperty(lf.schema.DataStoreType, "OBSERVABLE_STORE", lf.schema.DataStoreType.OBSERVABLE_STORE);
lf.schema.Index = function(tableName, name, isUnique, columns) {
  this.tableName = tableName;
  this.name = name;
  this.isUnique = isUnique;
  this.columns = columns;
};
lf.schema.Index.prototype.getNormalizedName = function() {
  return this.tableName + "." + this.name;
};
lf.schema.Index.prototype.hasNullableColumn = function() {
  return this.columns.some(function(column) {
    return column.schema.isNullable();
  });
};
lf.schema.Table = function(name, cols, indices, persistentIndex) {
  this.name_ = name;
  this.indices_ = indices;
  this.columns_ = cols;
  this.persistentIndex_ = persistentIndex;
  this.alias_ = null;
};
goog.exportSymbol("lf.schema.Table", lf.schema.Table);
lf.schema.Table.prototype.getName = function() {
  return this.name_;
};
goog.exportProperty(lf.schema.Table.prototype, "getName", lf.schema.Table.prototype.getName);
lf.schema.Table.prototype.getAlias = function() {
  return this.alias_;
};
lf.schema.Table.prototype.getEffectiveName = function() {
  return this.alias_ || this.name_;
};
lf.schema.Table.prototype.as = function(name) {
  var clone = new this.constructor(this.name_);
  clone.alias_ = name;
  clone.referencingForeignKeys_ = this.referencingForeignKeys_;
  return clone;
};
goog.exportProperty(lf.schema.Table.prototype, "as", lf.schema.Table.prototype.as);
goog.exportProperty(lf.schema.Table.prototype, "createRow", lf.schema.Table.prototype.createRow);
goog.exportProperty(lf.schema.Table.prototype, "deserializeRow", lf.schema.Table.prototype.deserializeRow);
lf.schema.Table.prototype.getIndices = function() {
  return this.indices_;
};
goog.exportProperty(lf.schema.Table.prototype, "getIndices", lf.schema.Table.prototype.getIndices);
lf.schema.Table.prototype.getColumns = function() {
  return this.columns_;
};
goog.exportProperty(lf.schema.Table.prototype, "getColumns", lf.schema.Table.prototype.getColumns);
goog.exportProperty(lf.schema.Table.prototype, "getConstraint", lf.schema.Table.prototype.getConstraint);
lf.schema.Table.prototype.persistentIndex = function() {
  return this.persistentIndex_;
};
goog.exportProperty(lf.schema.Table.prototype, "persistentIndex", lf.schema.Table.prototype.persistentIndex);
lf.schema.Table.ROW_ID_INDEX_PATTERN = "#";
lf.schema.Table.prototype.getRowIdIndexName = function() {
  return this.name_ + "." + lf.schema.Table.ROW_ID_INDEX_PATTERN;
};
lf.fn = {};
lf.fn.AggregatedColumn = function(col, aggregatorType) {
  this.child = col;
  this.aggregatorType = aggregatorType;
  this.alias_ = null;
};
lf.fn.AggregatedColumn.prototype.getName = function() {
  return this.aggregatorType + "(" + this.child.getName() + ")";
};
lf.fn.AggregatedColumn.prototype.getNormalizedName = function() {
  return this.aggregatorType + "(" + this.child.getNormalizedName() + ")";
};
lf.fn.AggregatedColumn.prototype.getTable = function() {
  return this.child.getTable();
};
lf.fn.AggregatedColumn.prototype.toString = function() {
  return this.getNormalizedName();
};
lf.fn.AggregatedColumn.prototype.getType = function() {
  return this.child.getType();
};
lf.fn.AggregatedColumn.prototype.getAlias = function() {
  return this.alias_;
};
lf.fn.AggregatedColumn.prototype.getIndices = function() {
  return [];
};
lf.fn.AggregatedColumn.prototype.isNullable = function() {
  return !1;
};
lf.fn.AggregatedColumn.prototype.as = function(name) {
  this.alias_ = name;
  return this;
};
goog.exportProperty(lf.fn.AggregatedColumn.prototype, "as", lf.fn.AggregatedColumn.prototype.as);
lf.fn.AggregatedColumn.prototype.getColumnChain = function() {
  for (var columnChain = [this], currentColumn = this;currentColumn instanceof lf.fn.AggregatedColumn;) {
    columnChain.push(currentColumn.child), currentColumn = currentColumn.child;
  }
  return columnChain;
};
lf.fn.StarColumn = function(opt_alias) {
  this.alias_ = opt_alias || null;
  this.table_ = new lf.schema.Table("#UnknownTable", [], [], !1);
};
lf.fn.StarColumn.prototype.getName = function() {
  return "*";
};
lf.fn.StarColumn.prototype.getNormalizedName = function() {
  return this.getName();
};
lf.fn.StarColumn.prototype.toString = function() {
  return this.getNormalizedName();
};
lf.fn.StarColumn.prototype.getTable = function() {
  return this.table_;
};
lf.fn.StarColumn.prototype.getType = function() {
  return lf.Type.NUMBER;
};
lf.fn.StarColumn.prototype.getAlias = function() {
  return this.alias_;
};
lf.fn.StarColumn.prototype.getIndices = function() {
  return [];
};
lf.fn.StarColumn.prototype.isNullable = function() {
  return !1;
};
lf.fn.Type = {AVG:"AVG", COUNT:"COUNT", DISTINCT:"DISTINCT", GEOMEAN:"GEOMEAN", MAX:"MAX", MIN:"MIN", STDDEV:"STDDEV", SUM:"SUM"};
lf.fn.avg = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.AVG);
};
goog.exportSymbol("lf.fn.avg", lf.fn.avg);
lf.fn.count = function(opt_col) {
  var col = opt_col || new lf.fn.StarColumn;
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.COUNT);
};
goog.exportSymbol("lf.fn.count", lf.fn.count);
lf.fn.distinct = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.DISTINCT);
};
goog.exportSymbol("lf.fn.distinct", lf.fn.distinct);
lf.fn.max = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.MAX);
};
goog.exportSymbol("lf.fn.max", lf.fn.max);
lf.fn.min = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.MIN);
};
goog.exportSymbol("lf.fn.min", lf.fn.min);
lf.fn.stddev = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.STDDEV);
};
goog.exportSymbol("lf.fn.stddev", lf.fn.stddev);
lf.fn.sum = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.SUM);
};
goog.exportSymbol("lf.fn.sum", lf.fn.sum);
lf.fn.geomean = function(col) {
  return new lf.fn.AggregatedColumn(col, lf.fn.Type.GEOMEAN);
};
goog.exportSymbol("lf.fn.geomean", lf.fn.geomean);
lf.proc.PhysicalQueryPlanNode = function(numRelations, type) {
  goog.structs.TreeNode.call(this, "", "");
  this.execType_ = type;
  this.numRelations_ = numRelations;
};
goog.inherits(lf.proc.PhysicalQueryPlanNode, goog.structs.TreeNode);
lf.proc.PhysicalQueryPlanNode.ExecType = {NO_CHILD:-1, ALL:0, FIRST_CHILD:1};
lf.proc.PhysicalQueryPlanNode.ANY = -1;
lf.proc.PhysicalQueryPlanNode.prototype.exec = function(journal, opt_context) {
  switch(this.execType_) {
    case lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD:
      return this.execFirstChild_(journal, opt_context);
    case lf.proc.PhysicalQueryPlanNode.ExecType.ALL:
      return this.execAllChildren_(journal, opt_context);
    default:
      return this.execNoChild_(journal, opt_context);
  }
};
lf.proc.PhysicalQueryPlanNode.prototype.toString = function() {
  return "dummy_node";
};
lf.proc.PhysicalQueryPlanNode.prototype.toContextString = function() {
  return this.toString();
};
lf.proc.PhysicalQueryPlanNode.prototype.assertInput_ = function(relations) {
  goog.asserts.assert(this.numRelations_ == lf.proc.PhysicalQueryPlanNode.ANY || relations.length == this.numRelations_);
};
lf.proc.PhysicalQueryPlanNode.prototype.execNoChild_ = function(journal, opt_context) {
  return new goog.Promise(goog.bind(function(resolve) {
    resolve(this.execInternal(journal, [], opt_context));
  }, this));
};
lf.proc.PhysicalQueryPlanNode.prototype.execFirstChild_ = function(journal, opt_context) {
  return this.getChildAt(0).exec(journal, opt_context).then(goog.bind(function(results) {
    this.assertInput_(results);
    return this.execInternal(journal, results, opt_context);
  }, this));
};
lf.proc.PhysicalQueryPlanNode.prototype.execAllChildren_ = function(journal, opt_context) {
  var promises = this.getChildren().map(function(child) {
    return child.exec(journal, opt_context);
  });
  return goog.Promise.all(promises).then(goog.bind(function(results) {
    var relations = [];
    results.forEach(function(result) {
      for (var i = 0;i < result.length;++i) {
        relations.push(result[i]);
      }
    });
    this.assertInput_(relations);
    return this.execInternal(journal, relations, opt_context);
  }, this));
};
lf.proc.AggregationStep = function(aggregatedColumns) {
  lf.proc.PhysicalQueryPlanNode.call(this, lf.proc.PhysicalQueryPlanNode.ANY, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.aggregatedColumns = aggregatedColumns;
};
goog.inherits(lf.proc.AggregationStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.AggregationStep.prototype.toString = function() {
  var columnNames = this.aggregatedColumns.map(function(column) {
    return column.getNormalizedName();
  });
  return "aggregation(" + columnNames.toString() + ")";
};
lf.proc.AggregationStep.prototype.execInternal = function(journal, relations) {
  relations.forEach(function(relation) {
    var calculator = new lf.proc.AggregationStep.Calculator_(relation, this.aggregatedColumns);
    calculator.calculate();
  }, this);
  return relations;
};
lf.proc.AggregationStep.Calculator_ = function(relation, columns) {
  this.relation_ = relation;
  this.columns_ = columns;
};
lf.proc.AggregationStep.Calculator_.prototype.calculate = function() {
  this.columns_.forEach(function(column) {
    for (var reverseColumnChain = column.getColumnChain().reverse(), i = 1;i < reverseColumnChain.length;i++) {
      var currentColumn = reverseColumnChain[i], leafColumn = currentColumn.getColumnChain().slice(-1)[0], inputRelation = this.getInputRelationFor_(currentColumn);
      if (inputRelation.hasAggregationResult(currentColumn)) {
        break;
      }
      var result = lf.proc.AggregationStep.Calculator_.evalAggregation_(currentColumn.aggregatorType, inputRelation, leafColumn);
      this.relation_.setAggregationResult(currentColumn, result);
    }
  }, this);
};
lf.proc.AggregationStep.Calculator_.prototype.getInputRelationFor_ = function(column) {
  return column.child instanceof lf.fn.AggregatedColumn ? this.relation_.getAggregationResult(column.child) : this.relation_;
};
lf.proc.AggregationStep.Calculator_.evalAggregation_ = function(aggregatorType, relation, column) {
  var result = null, Calculator = lf.proc.AggregationStep.Calculator_;
  switch(aggregatorType) {
    case lf.fn.Type.MIN:
      result = Calculator.reduce_(relation, column, function(soFar, value) {
        return value < soFar ? value : soFar;
      });
      break;
    case lf.fn.Type.MAX:
      result = Calculator.reduce_(relation, column, function(soFar, value) {
        return value > soFar ? value : soFar;
      });
      break;
    case lf.fn.Type.DISTINCT:
      result = Calculator.distinct_(relation, column);
      break;
    case lf.fn.Type.COUNT:
      result = Calculator.count_(relation, column);
      break;
    case lf.fn.Type.SUM:
      result = Calculator.sum_(relation, column);
      break;
    case lf.fn.Type.AVG:
      var count = Calculator.count_(relation, column);
      0 < count && (result = Calculator.sum_(relation, column) / count);
      break;
    case lf.fn.Type.GEOMEAN:
      result = Calculator.geomean_(relation, column);
      break;
    default:
      result = Calculator.stddev_(relation, column);
  }
  return result;
};
lf.proc.AggregationStep.Calculator_.reduce_ = function(relation, column, reduceFn) {
  return relation.entries.reduce(function(soFar, entry) {
    var value = entry.getField(column);
    return goog.isNull(value) ? soFar : goog.isNull(soFar) ? value : reduceFn(soFar, value);
  }, null);
};
lf.proc.AggregationStep.Calculator_.count_ = function(relation, column) {
  return column instanceof lf.fn.StarColumn ? relation.entries.length : relation.entries.reduce(function(soFar, entry) {
    return soFar + (goog.isNull(entry.getField(column)) ? 0 : 1);
  }, 0);
};
lf.proc.AggregationStep.Calculator_.sum_ = function(relation, column) {
  return lf.proc.AggregationStep.Calculator_.reduce_(relation, column, function(soFar, value) {
    return value + soFar;
  });
};
lf.proc.AggregationStep.Calculator_.stddev_ = function(relation, column) {
  var values = [];
  relation.entries.forEach(function(entry) {
    var value = entry.getField(column);
    goog.isNull(value) || values.push(value);
  });
  return 0 == values.length ? null : goog.math.standardDeviation.apply(null, values);
};
lf.proc.AggregationStep.Calculator_.geomean_ = function(relation, column) {
  var nonZeroEntriesCount = 0, reduced = relation.entries.reduce(function(soFar, entry) {
    var value = entry.getField(column);
    if (0 == value || goog.isNull(value)) {
      return soFar;
    }
    nonZeroEntriesCount++;
    return soFar + Math.log(value);
  }, 0);
  return 0 == nonZeroEntriesCount ? null : Math.pow(Math.E, reduced / nonZeroEntriesCount);
};
lf.proc.AggregationStep.Calculator_.distinct_ = function(relation, column) {
  var distinctMap = lf.structs.map.create();
  relation.entries.forEach(function(entry) {
    var value = entry.getField(column);
    distinctMap.set(value, entry);
  });
  return new lf.proc.Relation(lf.structs.map.values(distinctMap), relation.getTables());
};
lf.proc.LogicalQueryPlan = function(rootNode, scope) {
  this.rootNode_ = rootNode;
  this.scope_ = scope;
};
lf.proc.LogicalQueryPlan.prototype.getRoot = function() {
  return this.rootNode_;
};
lf.proc.LogicalQueryPlan.prototype.getScope = function() {
  return this.scope_;
};
lf.proc.LogicalQueryPlanNode = function() {
  goog.structs.TreeNode.call(this, "", "");
};
goog.inherits(lf.proc.LogicalQueryPlanNode, goog.structs.TreeNode);
lf.proc.InsertNode = function(table, values) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.table = table;
  this.values = values;
};
goog.inherits(lf.proc.InsertNode, lf.proc.LogicalQueryPlanNode);
lf.proc.InsertOrReplaceNode = function(table, values) {
  lf.proc.InsertNode.call(this, table, values);
};
goog.inherits(lf.proc.InsertOrReplaceNode, lf.proc.InsertNode);
lf.proc.DeleteNode = function(table) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.table = table;
};
goog.inherits(lf.proc.DeleteNode, lf.proc.LogicalQueryPlanNode);
lf.proc.DeleteNode.prototype.toString = function() {
  return "delete(" + this.table.getName() + ")";
};
lf.proc.UpdateNode = function(table, updates) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.table = table;
  this.updates = updates;
};
goog.inherits(lf.proc.UpdateNode, lf.proc.LogicalQueryPlanNode);
lf.proc.UpdateNode.prototype.toString = function() {
  var columns = [];
  this.updates && (columns = this.updates.map(function(update) {
    return update.column.getName();
  }, this));
  return "update(" + this.table.getName() + ", [" + columns.join(",") + "])";
};
lf.proc.SelectNode = function(predicate) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.predicate = predicate;
};
goog.inherits(lf.proc.SelectNode, lf.proc.LogicalQueryPlanNode);
lf.proc.SelectNode.prototype.toString = function() {
  return "select(" + this.predicate.toString() + ")";
};
lf.proc.TableAccessNode = function(table) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.table = table;
};
goog.inherits(lf.proc.TableAccessNode, lf.proc.LogicalQueryPlanNode);
lf.proc.TableAccessNode.prototype.toString = function() {
  var out = "table_access(" + this.table.getName();
  goog.isNull(this.table.getAlias()) || (out += " as " + this.table.getAlias());
  return out += ")";
};
lf.proc.CrossProductNode = function() {
  lf.proc.LogicalQueryPlanNode.call(this);
};
goog.inherits(lf.proc.CrossProductNode, lf.proc.LogicalQueryPlanNode);
lf.proc.CrossProductNode.prototype.toString = function() {
  return "cross_product";
};
lf.proc.ProjectNode = function(columns, groupByColumns) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.columns = columns;
  this.groupByColumns = groupByColumns;
};
goog.inherits(lf.proc.ProjectNode, lf.proc.LogicalQueryPlanNode);
lf.proc.ProjectNode.prototype.toString = function() {
  var string = "project(" + this.columns.toString();
  if (!goog.isNull(this.groupByColumns)) {
    var groupBy = this.groupByColumns.map(function(col) {
      return col.getNormalizedName();
    }).join(", "), string = string + (", groupBy(" + groupBy + ")")
  }
  return string += ")";
};
lf.proc.OrderByNode = function(orderBy) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.orderBy = orderBy;
};
goog.inherits(lf.proc.OrderByNode, lf.proc.LogicalQueryPlanNode);
lf.proc.OrderByNode.prototype.toString = function() {
  return "order_by(" + lf.query.SelectContext.orderByToString(this.orderBy) + ")";
};
lf.proc.AggregationNode = function(columns) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.columns = columns;
};
goog.inherits(lf.proc.AggregationNode, lf.proc.LogicalQueryPlanNode);
lf.proc.AggregationNode.prototype.toString = function() {
  return "aggregation(" + this.columns.toString() + ")";
};
lf.proc.GroupByNode = function(columns) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.columns = columns;
};
goog.inherits(lf.proc.GroupByNode, lf.proc.LogicalQueryPlanNode);
lf.proc.GroupByNode.prototype.toString = function() {
  return "group_by(" + this.columns.toString() + ")";
};
lf.proc.LimitNode = function(limit) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.limit = limit;
};
goog.inherits(lf.proc.LimitNode, lf.proc.LogicalQueryPlanNode);
lf.proc.LimitNode.prototype.toString = function() {
  return "limit(" + this.limit + ")";
};
lf.proc.SkipNode = function(skip) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.skip = skip;
};
goog.inherits(lf.proc.SkipNode, lf.proc.LogicalQueryPlanNode);
lf.proc.SkipNode.prototype.toString = function() {
  return "skip(" + this.skip + ")";
};
lf.proc.JoinNode = function(predicate, isOuterJoin) {
  lf.proc.LogicalQueryPlanNode.call(this);
  this.predicate = predicate;
  this.isOuterJoin = isOuterJoin;
};
goog.inherits(lf.proc.JoinNode, lf.proc.LogicalQueryPlanNode);
lf.proc.JoinNode.prototype.toString = function() {
  return "join(type: " + (this.isOuterJoin ? "outer" : "inner") + ", " + this.predicate.toString() + ")";
};
lf.proc.RewritePass = function() {
};
lf.proc.AndPredicatePass = function() {
};
goog.inherits(lf.proc.AndPredicatePass, lf.proc.RewritePass);
lf.proc.AndPredicatePass.prototype.rewrite = function(rootNode) {
  this.rootNode = rootNode;
  this.traverse_(this.rootNode);
  return this.rootNode;
};
lf.proc.AndPredicatePass.prototype.traverse_ = function(rootNode) {
  if (rootNode instanceof lf.proc.SelectNode) {
    goog.asserts.assert(1 == rootNode.getChildCount(), "SelectNode must have exactly one child.");
    var predicates = this.breakAndPredicate_(rootNode.predicate), newNodes = this.createSelectNodeChain_(predicates);
    lf.tree.replaceNodeWithChain(rootNode, newNodes[0], newNodes[1]);
    rootNode == this.rootNode && (this.rootNode = newNodes[0]);
    rootNode = newNodes[0];
  }
  rootNode.getChildren().forEach(function(child) {
    this.traverse_(child);
  }, this);
};
lf.proc.AndPredicatePass.prototype.breakAndPredicate_ = function(predicate) {
  if (0 == predicate.getChildCount()) {
    return [predicate];
  }
  var combinedPredicate = predicate;
  if (combinedPredicate.operator != lf.pred.Operator.AND) {
    return [predicate];
  }
  var predicates = combinedPredicate.getChildren().slice().map(function(childPredicate) {
    combinedPredicate.removeChild(childPredicate);
    return this.breakAndPredicate_(childPredicate);
  }, this);
  return goog.array.flatten(predicates);
};
lf.proc.AndPredicatePass.prototype.createSelectNodeChain_ = function(predicates) {
  var parentNode = null, lastNode = null;
  predicates.map(function(predicate, index) {
    var node = new lf.proc.SelectNode(predicate);
    0 == index ? parentNode = node : lastNode.addChild(node);
    lastNode = node;
  }, this);
  return [parentNode, lastNode];
};
lf.proc.CrossProductPass = function() {
};
goog.inherits(lf.proc.CrossProductPass, lf.proc.RewritePass);
lf.proc.CrossProductPass.prototype.rewrite = function(rootNode) {
  this.rootNode = rootNode;
  this.traverse_(this.rootNode);
  return this.rootNode;
};
lf.proc.CrossProductPass.prototype.traverse_ = function(rootNode) {
  if (rootNode instanceof lf.proc.CrossProductNode) {
    for (;2 < rootNode.getChildCount();) {
      for (var crossProduct = new lf.proc.CrossProductNode, i = 0;2 > i;i++) {
        var child$$0 = rootNode.removeChildAt(0);
        crossProduct.addChild(child$$0);
      }
      rootNode.addChildAt(crossProduct, 0);
    }
  }
  rootNode.getChildren().forEach(function(child) {
    this.traverse_(child);
  }, this);
};
lf.proc.CrossProductStep = function() {
  lf.proc.PhysicalQueryPlanNode.call(this, 2, lf.proc.PhysicalQueryPlanNode.ExecType.ALL);
};
goog.inherits(lf.proc.CrossProductStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.CrossProductStep.prototype.toString = function() {
  return "cross_product";
};
lf.proc.CrossProductStep.prototype.execInternal = function(journal, relations) {
  return lf.proc.CrossProductStep.crossProduct_(relations[0], relations[1]);
};
lf.proc.CrossProductStep.crossProduct_ = function(leftRelation, rightRelation) {
  for (var combinedEntries = [], leftRelationTableNames = leftRelation.getTables(), rightRelationTableNames = rightRelation.getTables(), i = 0;i < leftRelation.entries.length;i++) {
    for (var j = 0;j < rightRelation.entries.length;j++) {
      var combinedEntry = lf.proc.RelationEntry.combineEntries(leftRelation.entries[i], leftRelationTableNames, rightRelation.entries[j], rightRelationTableNames);
      combinedEntries.push(combinedEntry);
    }
  }
  var srcTables = leftRelation.getTables().concat(rightRelation.getTables());
  return [new lf.proc.Relation(combinedEntries, srcTables)];
};
lf.query.Builder = function() {
};
lf.query.Select = function() {
};
lf.query.Insert = function() {
};
lf.query.Update = function() {
};
lf.query.Delete = function() {
};
lf.proc.UserQueryTask = function(global, items) {
  lf.proc.QueryTask.call(this, global, items);
  this.runner_ = global.getService(lf.service.RUNNER);
  this.observerRegistry_ = global.getService(lf.service.OBSERVER_REGISTRY);
};
goog.inherits(lf.proc.UserQueryTask, lf.proc.QueryTask);
lf.proc.UserQueryTask.prototype.getPriority = function() {
  return lf.proc.TaskPriority.USER_QUERY_TASK;
};
lf.proc.UserQueryTask.prototype.onSuccess = function(results) {
  this.getType() == lf.TransactionType.READ_ONLY ? this.notifyObserversDirectly_(results) : this.scheduleObserverTask_();
};
lf.proc.UserQueryTask.prototype.notifyObserversDirectly_ = function(results) {
  this.queries.forEach(function(query, index) {
    query instanceof lf.query.SelectContext && this.observerRegistry_.updateResultsForQuery(query, results[index]);
  }, this);
};
lf.proc.UserQueryTask.prototype.scheduleObserverTask_ = function() {
  var items = this.observerRegistry_.getTaskItemsForTables(this.getScope());
  if (0 != items.length) {
    var observerTask = new lf.proc.ObserverQueryTask(this.global, items);
    this.runner_.scheduleTask(observerTask);
  }
};
lf.query.DeleteContext = function(schema) {
  lf.query.Context.call(this, schema);
};
goog.inherits(lf.query.DeleteContext, lf.query.Context);
lf.query.DeleteContext.prototype.getScope = function() {
  var scope = lf.structs.set.create();
  scope.add(this.from);
  this.schema.info().getChildTables(this.from.getName()).forEach(scope.add.bind(scope));
  return scope;
};
lf.query.DeleteContext.prototype.clone = function() {
  var context = new lf.query.DeleteContext(this.schema);
  context.cloneBase(this);
  context.from = this.from;
  return context;
};
lf.query.DeleteContext.prototype.bind = function(values) {
  lf.query.DeleteContext.superClass_.bind.call(this, values);
  this.bindValuesInSearchCondition(values);
  return this;
};
lf.query.InsertContext = function(schema) {
  lf.query.Context.call(this, schema);
};
goog.inherits(lf.query.InsertContext, lf.query.Context);
lf.query.InsertContext.prototype.getScope = function() {
  var scope = lf.structs.set.create();
  scope.add(this.into);
  var info = this.schema.info();
  info.getParentTables(this.into.getName()).forEach(scope.add.bind(scope));
  this.allowReplace && info.getChildTables(this.into.getName()).forEach(scope.add.bind(scope));
  return scope;
};
lf.query.InsertContext.prototype.clone = function() {
  var context = new lf.query.InsertContext(this.schema);
  context.cloneBase(this);
  context.into = this.into;
  this.values && (context.values = this.values instanceof lf.Binder ? this.values : this.values.slice());
  context.allowReplace = this.allowReplace;
  context.binder = this.binder;
  return context;
};
lf.query.InsertContext.prototype.bind = function(values) {
  lf.query.InsertContext.superClass_.bind.call(this, values);
  this.binder && (this.values = this.binder instanceof lf.Binder ? values[this.binder.getIndex()] : this.binder.map(function(val) {
    return val instanceof lf.Binder ? values[val.getIndex()] : val;
  }));
  return this;
};
lf.query.UpdateContext = function(schema) {
  lf.query.Context.call(this, schema);
};
goog.inherits(lf.query.UpdateContext, lf.query.Context);
lf.query.UpdateContext.prototype.getScope = function() {
  var scope = lf.structs.set.create();
  scope.add(this.table);
  var columns = this.set.map(function(col) {
    return col.column.getNormalizedName();
  }), info = this.schema.info();
  info.getParentTablesByColumns(columns).forEach(scope.add.bind(scope));
  info.getChildTablesByColumns(columns).forEach(scope.add.bind(scope));
  return scope;
};
lf.query.UpdateContext.prototype.clone = function() {
  var context = new lf.query.UpdateContext(this.schema);
  context.cloneBase(this);
  context.table = this.table;
  context.set = this.set ? this.set.slice() : this.set;
  return context;
};
lf.query.UpdateContext.prototype.bind = function(values) {
  lf.query.UpdateContext.superClass_.bind.call(this, values);
  this.set.forEach(function(set) {
    -1 != set.binding && (set.value = values[set.binding]);
  });
  this.bindValuesInSearchCondition(values);
  return this;
};
lf.query.escapeSqlValue_ = function(type, value) {
  if (!goog.isDefAndNotNull(value)) {
    return "NULL";
  }
  switch(type) {
    case lf.Type.BOOLEAN:
      return value ? 1 : 0;
    case lf.Type.INTEGER:
    ;
    case lf.Type.NUMBER:
      return value;
    case lf.Type.ARRAY_BUFFER:
      return "'" + lf.Row.binToHex(value) + "'";
    default:
      return "'" + value.toString() + "'";
  }
};
lf.query.insertToSql_ = function(query, stripValueInfo) {
  var prefix = query.allowReplace ? "INSERT OR REPLACE" : "INSERT", columns = query.into.getColumns(), prefix = prefix + (" INTO " + query.into.getName() + "("), prefix = prefix + columns.map(function(col) {
    return col.getName();
  }).join(", "), prefix = prefix + ") VALUES (", sqls = query.values.map(function(row) {
    var values = columns.map(function(col) {
      var rawVal = row.payload()[col.getName()];
      return stripValueInfo ? goog.isDefAndNotNull(rawVal) ? "#" : "NULL" : lf.query.escapeSqlValue_(col.getType(), rawVal);
    });
    return prefix + values.join(", ") + ");";
  });
  return sqls.join("\n");
};
lf.query.evaluatorToSql_ = function(op) {
  switch(op) {
    case lf.eval.Type.BETWEEN:
      return "BETWEEN";
    case lf.eval.Type.EQ:
      return "=";
    case lf.eval.Type.GTE:
      return ">=";
    case lf.eval.Type.GT:
      return ">";
    case lf.eval.Type.IN:
      return "IN";
    case lf.eval.Type.LTE:
      return "<=";
    case lf.eval.Type.LT:
      return "<";
    case lf.eval.Type.MATCH:
      return "LIKE";
    case lf.eval.Type.NEQ:
      return "<>";
    default:
      return "UNKNOWN";
  }
};
lf.query.valueToSql_ = function(value, op, type, stripValueInfo) {
  if (value instanceof lf.Binder) {
    return "?" + value.getIndex().toString();
  }
  if (stripValueInfo) {
    return goog.isDefAndNotNull(value) ? "#" : "NULL";
  }
  if (op == lf.eval.Type.MATCH) {
    return "'" + value.toString() + "'";
  }
  if (op == lf.eval.Type.IN) {
    var array = value, vals = array.map(function(e) {
      return lf.query.escapeSqlValue_(type, e);
    });
    return "(" + vals.join(", ") + ")";
  }
  return op == lf.eval.Type.BETWEEN ? lf.query.escapeSqlValue_(type, value[0]) + " AND " + lf.query.escapeSqlValue_(type, value[1]) : lf.query.escapeSqlValue_(type, value).toString();
};
lf.query.valuePredicateToSql_ = function(pred, stripValueInfo) {
  var column = pred.column.getNormalizedName(), op = lf.query.evaluatorToSql_(pred.evaluatorType), value = lf.query.valueToSql_(pred.value, pred.evaluatorType, pred.column.getType(), stripValueInfo);
  return "=" == op && "NULL" == value ? [column, "IS NULL"].join(" ") : "<>" == op && "NULL" == value ? [column, "IS NOT NULL"].join(" ") : [column, op, value].join(" ");
};
lf.query.combinedPredicateToSql_ = function(pred, stripValueInfo) {
  var children = pred.getChildren().map(function(childNode) {
    return "(" + lf.query.parseSearchCondition_(childNode, stripValueInfo) + ")";
  }), joinToken = pred.operator == lf.pred.Operator.AND ? " AND " : " OR ";
  return children.join(joinToken);
};
lf.query.joinPredicateToSql_ = function(pred) {
  return [pred.leftColumn.getNormalizedName(), lf.query.evaluatorToSql_(pred.evaluatorType), pred.rightColumn.getNormalizedName()].join(" ");
};
lf.query.parseSearchCondition_ = function(pred, stripValueInfo) {
  if (pred instanceof lf.pred.ValuePredicate) {
    return lf.query.valuePredicateToSql_(pred, stripValueInfo);
  }
  if (pred instanceof lf.pred.CombinedPredicate) {
    return lf.query.combinedPredicateToSql_(pred, stripValueInfo);
  }
  if (pred instanceof lf.pred.JoinPredicate) {
    return lf.query.joinPredicateToSql_(pred);
  }
  throw new lf.Exception(357, typeof pred);
};
lf.query.predicateToSql_ = function(pred, stripValueInfo) {
  var whereClause = lf.query.parseSearchCondition_(pred, stripValueInfo);
  return whereClause ? " WHERE " + whereClause : "";
};
lf.query.deleteToSql_ = function(query, stripValueInfo) {
  var sql = "DELETE FROM " + query.from.getName();
  query.where && (sql += lf.query.predicateToSql_(query.where, stripValueInfo));
  return sql += ";";
};
lf.query.updateToSql_ = function(query, stripValueInfo) {
  var sql = "UPDATE " + query.table.getName() + " SET ", sql = sql + query.set.map(function(set) {
    var setter = set.column.getNormalizedName() + " = ";
    return -1 != set.binding ? setter + "?" + set.binding.toString() : setter + lf.query.escapeSqlValue_(set.column.getType(), set.value).toString();
  }).join(", ");
  query.where && (sql += lf.query.predicateToSql_(query.where, stripValueInfo));
  return sql += ";";
};
lf.query.selectToSql_ = function(query, stripValueInfo) {
  var colList = "*";
  query.columns.length && (colList = query.columns.map(function(col) {
    return col.getAlias() ? col.getNormalizedName() + " AS " + col.getAlias() : col.getNormalizedName();
  }).join(", "));
  var sql = "SELECT " + colList + " FROM ";
  goog.isDefAndNotNull(query.outerJoinPredicates) && 0 != query.outerJoinPredicates.size ? sql += lf.query.getFromListForOuterJoin_(query, stripValueInfo) : (sql += lf.query.getFromListForInnerJoin_(query, stripValueInfo), query.where && (sql += lf.query.predicateToSql_(query.where, stripValueInfo)));
  if (query.orderBy) {
    var orderBy = query.orderBy.map(function(order) {
      return order.column.getNormalizedName() + (order.order == lf.Order.DESC ? " DESC" : " ASC");
    }).join(", "), sql = sql + (" ORDER BY " + orderBy)
  }
  if (query.groupBy) {
    var groupBy = query.groupBy.map(function(col) {
      return col.getNormalizedName();
    }).join(", "), sql = sql + (" GROUP BY " + groupBy)
  }
  query.limit && (sql += " LIMIT " + query.limit.toString());
  query.skip && (sql += " SKIP " + query.skip.toString());
  return sql += ";";
};
lf.query.getTableNameToSql_ = function(table) {
  return table.getEffectiveName() != table.getName() ? table.getName() + " AS " + table.getEffectiveName() : table.getName();
};
lf.query.getFromListForOuterJoin_ = function(query, stripValueInfo) {
  for (var retrievedNodes = lf.tree.find(query.where, function(node) {
    return node instanceof lf.pred.JoinPredicate;
  }), predicateString = retrievedNodes.map(lf.query.joinPredicateToSql_), fromList = lf.query.getTableNameToSql_(query.from[0]), i = 1;i < query.from.length;i++) {
    var fromName = lf.query.getTableNameToSql_(query.from[i]), fromList = query.outerJoinPredicates.has(retrievedNodes[predicateString.length - i].getId()) ? fromList + (" LEFT OUTER JOIN " + fromName) : fromList + (" INNER JOIN " + fromName), fromList = fromList + (" ON (" + predicateString[predicateString.length - i] + ")")
  }
  var leftChild = query.where.getChildAt(0);
  leftChild instanceof lf.pred.JoinPredicate || (fromList += " WHERE " + lf.query.parseSearchCondition_(leftChild, stripValueInfo));
  return fromList;
};
lf.query.getFromListForInnerJoin_ = function(query) {
  return query.from.map(lf.query.getTableNameToSql_).join(", ");
};
lf.query.toSql = function(builder, opt_stripValueInfo) {
  var stripValueInfo = opt_stripValueInfo || !1, query = builder.getQuery();
  if (query instanceof lf.query.InsertContext) {
    return lf.query.insertToSql_(query, stripValueInfo);
  }
  if (query instanceof lf.query.DeleteContext) {
    return lf.query.deleteToSql_(query, stripValueInfo);
  }
  if (query instanceof lf.query.UpdateContext) {
    return lf.query.updateToSql_(query, stripValueInfo);
  }
  if (query instanceof lf.query.SelectContext) {
    return lf.query.selectToSql_(query, stripValueInfo);
  }
  throw new lf.Exception(358, typeof query);
};
lf.query.BaseBuilder = function(global, context) {
  this.global = global;
  this.queryEngine_ = global.getService(lf.service.QUERY_ENGINE);
  this.runner_ = global.getService(lf.service.RUNNER);
  this.query = context;
};
goog.exportSymbol("lf.query.BaseBuilder", lf.query.BaseBuilder);
lf.query.BaseBuilder.prototype.exec = function() {
  try {
    this.assertExecPreconditions();
  } catch (e) {
    return goog.Promise.reject(e);
  }
  return new goog.Promise(function(resolve, reject) {
    var queryTask = new lf.proc.UserQueryTask(this.global, [this.getTaskItem()]);
    this.runner_.scheduleTask(queryTask).then(function(results) {
      resolve(results[0].getPayloads());
    }, reject);
  }, this);
};
goog.exportProperty(lf.query.BaseBuilder.prototype, "exec", lf.query.BaseBuilder.prototype.exec);
lf.query.BaseBuilder.prototype.explain = function() {
  var stringFn = goog.bind(function(node) {
    return node.toContextString(this.query) + "\n";
  }, this);
  return lf.tree.toString(this.getPlan_().getRoot(), stringFn);
};
goog.exportProperty(lf.query.BaseBuilder.prototype, "explain", lf.query.BaseBuilder.prototype.explain);
lf.query.BaseBuilder.prototype.bind = function(values) {
  this.query.bind(values);
  return this;
};
goog.exportProperty(lf.query.BaseBuilder.prototype, "bind", lf.query.BaseBuilder.prototype.bind);
lf.query.BaseBuilder.prototype.toSql = function(opt_stripValueInfo) {
  return lf.query.toSql(this, opt_stripValueInfo);
};
goog.exportProperty(lf.query.BaseBuilder.prototype, "toSql", lf.query.BaseBuilder.prototype.toSql);
lf.query.BaseBuilder.prototype.assertExecPreconditions = function() {
};
lf.query.BaseBuilder.prototype.getQuery = function() {
  return this.query.clone();
};
lf.query.BaseBuilder.prototype.getObservableQuery = function() {
  return this.query;
};
lf.query.BaseBuilder.prototype.getPlan_ = function() {
  goog.isDefAndNotNull(this.plan_) || (this.plan_ = this.queryEngine_.getPlan(this.query));
  return this.plan_;
};
lf.query.BaseBuilder.prototype.getTaskItem = function() {
  return {context:this.getQuery(), plan:this.getPlan_()};
};
lf.query.BaseBuilder.prototype.getObservableTaskItem = function() {
  return {context:this.getObservableQuery(), plan:this.getPlan_()};
};
lf.query.DeleteBuilder = function(global) {
  lf.query.BaseBuilder.call(this, global, new lf.query.DeleteContext(global.getService(lf.service.SCHEMA)));
};
goog.inherits(lf.query.DeleteBuilder, lf.query.BaseBuilder);
goog.exportSymbol("lf.query.DeleteBuilder", lf.query.DeleteBuilder);
lf.query.DeleteBuilder.prototype.from = function(table) {
  this.assertFromPreconditions_();
  this.query.from = table;
  return this;
};
goog.exportProperty(lf.query.DeleteBuilder.prototype, "from", lf.query.DeleteBuilder.prototype.from);
lf.query.DeleteBuilder.prototype.where = function(predicate) {
  this.assertWherePreconditions_();
  this.query.where = predicate;
  return this;
};
goog.exportProperty(lf.query.DeleteBuilder.prototype, "where", lf.query.DeleteBuilder.prototype.where);
lf.query.DeleteBuilder.prototype.assertFromPreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.from)) {
    throw new lf.Exception(515);
  }
};
lf.query.DeleteBuilder.prototype.assertWherePreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.where)) {
    throw new lf.Exception(516);
  }
};
lf.query.DeleteBuilder.prototype.assertExecPreconditions = function() {
  lf.query.DeleteBuilder.superClass_.assertExecPreconditions.call(this);
  if (!goog.isDefAndNotNull(this.query.from)) {
    throw new lf.Exception(517);
  }
};
lf.query.InsertBuilder = function(global, opt_allowReplace) {
  lf.query.BaseBuilder.call(this, global, new lf.query.InsertContext(global.getService(lf.service.SCHEMA)));
  this.query.allowReplace = opt_allowReplace || !1;
};
goog.inherits(lf.query.InsertBuilder, lf.query.BaseBuilder);
goog.exportSymbol("lf.query.InsertBuilder", lf.query.InsertBuilder);
lf.query.InsertBuilder.prototype.assertExecPreconditions = function() {
  lf.query.InsertBuilder.superClass_.assertExecPreconditions.call(this);
  var context = this.query;
  if (!goog.isDefAndNotNull(context.into) || !goog.isDefAndNotNull(context.values)) {
    throw new lf.Exception(518);
  }
  if (context.allowReplace && goog.isNull(context.into.getConstraint().getPrimaryKey())) {
    throw new lf.Exception(519);
  }
};
lf.query.InsertBuilder.prototype.into = function(table) {
  this.assertIntoPreconditions_();
  this.query.into = table;
  return this;
};
goog.exportProperty(lf.query.InsertBuilder.prototype, "into", lf.query.InsertBuilder.prototype.into);
lf.query.InsertBuilder.prototype.values = function(rows) {
  this.assertValuesPreconditions_();
  rows instanceof lf.Binder || rows.some(function(r) {
    return r instanceof lf.Binder;
  }) ? this.query.binder = rows : this.query.values = rows;
  return this;
};
goog.exportProperty(lf.query.InsertBuilder.prototype, "values", lf.query.InsertBuilder.prototype.values);
lf.query.InsertBuilder.prototype.assertIntoPreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.into)) {
    throw new lf.Exception(520);
  }
};
lf.query.InsertBuilder.prototype.assertValuesPreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.values)) {
    throw new lf.Exception(521);
  }
};
lf.op = {};
lf.op.and = function(var_args) {
  var args = Array.prototype.slice.call(arguments);
  return lf.op.createPredicate_(lf.pred.Operator.AND, args);
};
goog.exportSymbol("lf.op.and", lf.op.and);
lf.op.or = function(var_args) {
  var args = Array.prototype.slice.call(arguments);
  return lf.op.createPredicate_(lf.pred.Operator.OR, args);
};
goog.exportSymbol("lf.op.or", lf.op.or);
lf.op.createPredicate_ = function(operator, predicates) {
  var condition = new lf.pred.CombinedPredicate(operator);
  predicates.forEach(function(predicate) {
    condition.addChild(predicate);
  });
  return condition;
};
lf.op.not = function(operand) {
  operand.setComplement(!0);
  return operand;
};
goog.exportSymbol("lf.op.not", lf.op.not);
lf.query.SelectBuilder = function(global, columns) {
  lf.query.BaseBuilder.call(this, global, new lf.query.SelectContext(global.getService(lf.service.SCHEMA)));
  this.fromAlreadyCalled_ = this.whereAlreadyCalled_ = !1;
  this.query.columns = columns;
  this.checkDistinctColumn_();
  this.checkAggregations_();
};
goog.inherits(lf.query.SelectBuilder, lf.query.BaseBuilder);
goog.exportSymbol("lf.query.SelectBuilder", lf.query.SelectBuilder);
lf.query.SelectBuilder.prototype.assertExecPreconditions = function() {
  lf.query.SelectBuilder.superClass_.assertExecPreconditions.call(this);
  var context = this.query;
  if (!goog.isDefAndNotNull(context.from)) {
    throw new lf.Exception(522);
  }
  if (goog.isDef(context.limitBinder) && !goog.isDef(context.limit) || goog.isDef(context.skipBinder) && !goog.isDef(context.skip)) {
    throw new lf.Exception(523);
  }
  this.checkProjectionList_();
};
lf.query.SelectBuilder.prototype.checkDistinctColumn_ = function() {
  var distinctColumns = this.query.columns.filter(function(column) {
    return column instanceof lf.fn.AggregatedColumn && column.aggregatorType == lf.fn.Type.DISTINCT;
  }, this), isValidCombination = 0 == distinctColumns.length || 1 == distinctColumns.length && 1 == this.query.columns.length;
  if (!isValidCombination) {
    throw new lf.Exception(524);
  }
};
lf.query.SelectBuilder.prototype.checkProjectionList_ = function() {
  goog.isDefAndNotNull(this.query.groupBy) ? this.checkGroupByColumns_() : this.checkProjectionListNotMixed_();
};
lf.query.SelectBuilder.prototype.checkGroupByColumns_ = function() {
  var nonAggregatedColumns = this.query.columns.filter(function(column) {
    return !(column instanceof lf.fn.AggregatedColumn);
  }).map(function(column) {
    return column.getNormalizedName();
  }), isInvalid = !1;
  if (0 == this.query.groupBy.length || 0 == this.query.columns.length) {
    isInvalid = !0;
  } else {
    var groupByColumns = this.query.groupBy.map(function(column) {
      return column.getNormalizedName();
    });
    (isInvalid = nonAggregatedColumns.some(function(column) {
      return -1 == groupByColumns.indexOf(column);
    })) || (isInvalid = this.query.groupBy.some(function(column) {
      var type = column.getType();
      return type == lf.Type.OBJECT || type == lf.Type.ARRAY_BUFFER;
    }));
  }
  if (isInvalid) {
    throw new lf.Exception(525);
  }
};
lf.query.SelectBuilder.prototype.checkProjectionListNotMixed_ = function() {
  var aggregatedColumnsExist = this.query.columns.some(function(column) {
    return column instanceof lf.fn.AggregatedColumn;
  }, this), nonAggregatedColumnsExist = this.query.columns.some(function(column) {
    return !(column instanceof lf.fn.AggregatedColumn);
  }, this) || 0 == this.query.columns.length;
  if (aggregatedColumnsExist && nonAggregatedColumnsExist) {
    throw new lf.Exception(526);
  }
};
lf.query.SelectBuilder.prototype.checkAggregations_ = function() {
  this.query.columns.forEach(function(column) {
    var isValidAggregation = !(column instanceof lf.fn.AggregatedColumn) || lf.query.SelectBuilder.isAggregationValid_(column.aggregatorType, column.getType());
    if (!isValidAggregation) {
      throw new lf.Exception(527, column.getNormalizedName());
    }
  }, this);
};
lf.query.SelectBuilder.prototype.from = function(var_args) {
  if (this.fromAlreadyCalled_) {
    throw new lf.Exception(515);
  }
  this.fromAlreadyCalled_ = !0;
  goog.isDefAndNotNull(this.query.from) || (this.query.from = []);
  this.query.from.push.apply(this.query.from, Array.prototype.slice.call(arguments));
  return this;
};
goog.exportProperty(lf.query.SelectBuilder.prototype, "from", lf.query.SelectBuilder.prototype.from);
lf.query.SelectBuilder.prototype.where = function(predicate) {
  if (this.whereAlreadyCalled_) {
    throw new lf.Exception(516);
  }
  this.whereAlreadyCalled_ = !0;
  this.augmentWhereClause_(predicate);
  return this;
};
goog.exportProperty(lf.query.SelectBuilder.prototype, "where", lf.query.SelectBuilder.prototype.where);
lf.query.SelectBuilder.prototype.augmentWhereClause_ = function(predicate) {
  if (goog.isDefAndNotNull(this.query.where)) {
    var newPredicate = lf.op.and(predicate, this.query.where);
    this.query.where = newPredicate;
  } else {
    this.query.where = predicate;
  }
};
lf.query.SelectBuilder.prototype.innerJoin = function(table, predicate) {
  if (!goog.isDefAndNotNull(this.query.from)) {
    throw new lf.Exception(542);
  }
  this.query.from.push(table);
  this.augmentWhereClause_(predicate);
  return this;
};
goog.exportProperty(lf.query.SelectBuilder.prototype, "innerJoin", lf.query.SelectBuilder.prototype.innerJoin);
lf.query.SelectBuilder.prototype.leftOuterJoin = function(table, predicate) {
  if (!(predicate instanceof lf.pred.JoinPredicate)) {
    throw new lf.Exception(541);
  }
  if (!goog.isDefAndNotNull(this.query.from)) {
    throw new lf.Exception(542);
  }
  this.query.from.push(table);
  goog.isDefAndNotNull(this.query.outerJoinPredicates) || (this.query.outerJoinPredicates = lf.structs.set.create());
  var normalizedPredicate = predicate;
  table.getEffectiveName() != predicate.rightColumn.getTable().getEffectiveName() && (normalizedPredicate = predicate.reverse());
  this.query.outerJoinPredicates.add(normalizedPredicate.getId());
  this.augmentWhereClause_(normalizedPredicate);
  return this;
};
goog.exportProperty(lf.query.SelectBuilder.prototype, "leftOuterJoin", lf.query.SelectBuilder.prototype.leftOuterJoin);
lf.query.SelectBuilder.prototype.limit = function(numberOfRows) {
  if (goog.isDefAndNotNull(this.query.limit || this.query.limitBinder)) {
    throw new lf.Exception(528);
  }
  if (numberOfRows instanceof lf.Binder) {
    this.query.limitBinder = numberOfRows;
  } else {
    if (0 > numberOfRows) {
      throw new lf.Exception(531);
    }
    this.query.limit = numberOfRows;
  }
  return this;
};
goog.exportProperty(lf.query.SelectBuilder.prototype, "limit", lf.query.SelectBuilder.prototype.limit);
lf.query.SelectBuilder.prototype.skip = function(numberOfRows) {
  if (goog.isDefAndNotNull(this.query.skip || this.query.skipBinder)) {
    throw new lf.Exception(529);
  }
  if (numberOfRows instanceof lf.Binder) {
    this.query.skipBinder = numberOfRows;
  } else {
    if (0 > numberOfRows) {
      throw new lf.Exception(531);
    }
    this.query.skip = numberOfRows;
  }
  return this;
};
goog.exportProperty(lf.query.SelectBuilder.prototype, "skip", lf.query.SelectBuilder.prototype.skip);
lf.query.SelectBuilder.prototype.orderBy = function(column, opt_order) {
  goog.isDefAndNotNull(this.query.orderBy) || (this.query.orderBy = []);
  this.query.orderBy.push({column:column, order:goog.isDefAndNotNull(opt_order) ? opt_order : lf.Order.ASC});
  return this;
};
goog.exportProperty(lf.query.SelectBuilder.prototype, "orderBy", lf.query.SelectBuilder.prototype.orderBy);
lf.query.SelectBuilder.prototype.groupBy = function(var_args) {
  if (goog.isDefAndNotNull(this.query.groupBy)) {
    throw new lf.Exception(530);
  }
  goog.isDefAndNotNull(this.query.groupBy) || (this.query.groupBy = []);
  this.query.groupBy.push.apply(this.query.groupBy, Array.prototype.slice.call(arguments));
  return this;
};
goog.exportProperty(lf.query.SelectBuilder.prototype, "groupBy", lf.query.SelectBuilder.prototype.groupBy);
lf.query.SelectBuilder.isAggregationValid_ = function(aggregatorType, columnType) {
  switch(aggregatorType) {
    case lf.fn.Type.COUNT:
    ;
    case lf.fn.Type.DISTINCT:
      return !0;
    case lf.fn.Type.AVG:
    ;
    case lf.fn.Type.GEOMEAN:
    ;
    case lf.fn.Type.STDDEV:
    ;
    case lf.fn.Type.SUM:
      return columnType == lf.Type.NUMBER || columnType == lf.Type.INTEGER;
    case lf.fn.Type.MAX:
    ;
    case lf.fn.Type.MIN:
      return columnType == lf.Type.NUMBER || columnType == lf.Type.INTEGER || columnType == lf.Type.STRING || columnType == lf.Type.DATE_TIME;
  }
  return !1;
};
lf.query.SelectBuilder.prototype.clone = function() {
  var builder = new lf.query.SelectBuilder(this.global, this.query.columns);
  builder.query = this.query.clone();
  builder.query.clonedFrom = null;
  return builder;
};
goog.exportProperty(lf.query.SelectBuilder.prototype, "clone", lf.query.SelectBuilder.prototype.clone);
lf.query.UpdateBuilder = function(global, table) {
  lf.query.BaseBuilder.call(this, global, new lf.query.UpdateContext(global.getService(lf.service.SCHEMA)));
  this.query.table = table;
};
goog.inherits(lf.query.UpdateBuilder, lf.query.BaseBuilder);
goog.exportSymbol("lf.query.UpdateBuilder", lf.query.UpdateBuilder);
lf.query.UpdateBuilder.prototype.set = function(column, value) {
  var set = {binding:value instanceof lf.Binder ? value.getIndex() : -1, column:column, value:value};
  goog.isDefAndNotNull(this.query.set) ? this.query.set.push(set) : this.query.set = [set];
  return this;
};
goog.exportProperty(lf.query.UpdateBuilder.prototype, "set", lf.query.UpdateBuilder.prototype.set);
lf.query.UpdateBuilder.prototype.where = function(predicate) {
  this.assertWherePreconditions_();
  this.query.where = predicate;
  return this;
};
goog.exportProperty(lf.query.UpdateBuilder.prototype, "where", lf.query.UpdateBuilder.prototype.where);
lf.query.UpdateBuilder.prototype.assertWherePreconditions_ = function() {
  if (goog.isDefAndNotNull(this.query.where)) {
    throw new lf.Exception(516);
  }
};
lf.query.UpdateBuilder.prototype.assertExecPreconditions = function() {
  lf.query.UpdateBuilder.superClass_.assertExecPreconditions.call(this);
  if (!goog.isDefAndNotNull(this.query.set)) {
    throw new lf.Exception(532);
  }
  var notBound = this.query.set.some(function(set) {
    return set.value instanceof lf.Binder;
  });
  if (notBound) {
    throw new lf.Exception(501);
  }
};
lf.proc.LogicalPlanGenerator = function() {
};
lf.proc.LogicalPlanGenerator.prototype.generate = function() {
};
lf.proc.BaseLogicalPlanGenerator = function(query) {
  this.query = query;
  this.rootNode_ = null;
};
lf.proc.BaseLogicalPlanGenerator.prototype.generate = function() {
  goog.isNull(this.rootNode_) && (this.rootNode_ = this.generateInternal());
  return this.rootNode_;
};
lf.proc.InsertLogicalPlanGenerator = function(query) {
  lf.proc.BaseLogicalPlanGenerator.call(this, query);
};
goog.inherits(lf.proc.InsertLogicalPlanGenerator, lf.proc.BaseLogicalPlanGenerator);
lf.proc.InsertLogicalPlanGenerator.prototype.generateInternal = function() {
  return this.query.allowReplace ? new lf.proc.InsertOrReplaceNode(this.query.into, this.query.values) : new lf.proc.InsertNode(this.query.into, this.query.values);
};
lf.proc.UpdateLogicalPlanGenerator = function(query) {
  lf.proc.BaseLogicalPlanGenerator.call(this, query);
};
goog.inherits(lf.proc.UpdateLogicalPlanGenerator, lf.proc.BaseLogicalPlanGenerator);
lf.proc.UpdateLogicalPlanGenerator.prototype.generateInternal = function() {
  var updateNode = new lf.proc.UpdateNode(this.query.table, this.query.set), selectNode = goog.isDefAndNotNull(this.query.where) ? new lf.proc.SelectNode(this.query.where.copy()) : null, tableAccessNode = new lf.proc.TableAccessNode(this.query.table);
  goog.isNull(selectNode) ? updateNode.addChild(tableAccessNode) : (selectNode.addChild(tableAccessNode), updateNode.addChild(selectNode));
  return updateNode;
};
lf.proc.LogicalPlanRewriter = function(rootNode, queryContext, rewritePasses) {
  this.rootNode_ = rootNode;
  this.queryContext_ = queryContext;
  this.rewritePasses_ = rewritePasses;
};
lf.proc.LogicalPlanRewriter.prototype.generate = function() {
  this.rewritePasses_.forEach(function(rewritePass) {
    this.rootNode_ = rewritePass.rewrite(this.rootNode_, this.queryContext_);
  }, this);
  return this.rootNode_;
};
lf.proc.DeleteLogicalPlanGenerator = function(query, rewritePasses) {
  lf.proc.BaseLogicalPlanGenerator.call(this, query);
  this.rewritePasses_ = rewritePasses;
};
goog.inherits(lf.proc.DeleteLogicalPlanGenerator, lf.proc.BaseLogicalPlanGenerator);
lf.proc.DeleteLogicalPlanGenerator.prototype.generateInternal = function() {
  var deleteNode = new lf.proc.DeleteNode(this.query.from), selectNode = goog.isDefAndNotNull(this.query.where) ? new lf.proc.SelectNode(this.query.where.copy()) : null, tableAccessNode = new lf.proc.TableAccessNode(this.query.from);
  goog.isNull(selectNode) ? deleteNode.addChild(tableAccessNode) : (selectNode.addChild(tableAccessNode), deleteNode.addChild(selectNode));
  var planRewriter = new lf.proc.LogicalPlanRewriter(deleteNode, this.query, this.rewritePasses_);
  return planRewriter.generate();
};
lf.proc.ImplicitJoinsPass = function() {
};
goog.inherits(lf.proc.ImplicitJoinsPass, lf.proc.RewritePass);
lf.proc.ImplicitJoinsPass.prototype.rewrite = function(rootNode, query) {
  this.rootNode = rootNode;
  this.traverse_(this.rootNode, query);
  return this.rootNode;
};
lf.proc.ImplicitJoinsPass.prototype.traverse_ = function(rootNode, opt_query) {
  if (rootNode instanceof lf.proc.SelectNode && rootNode.predicate instanceof lf.pred.JoinPredicate) {
    goog.asserts.assert(1 == rootNode.getChildCount(), "SelectNode must have exactly one child.");
    var predicateId = rootNode.predicate.getId(), child$$0 = rootNode.getChildAt(0);
    if (child$$0 instanceof lf.proc.CrossProductNode) {
      var isOuterJoin = goog.isDef(opt_query) && goog.isDefAndNotNull(opt_query.outerJoinPredicates) && opt_query.outerJoinPredicates.has(predicateId), joinNode = new lf.proc.JoinNode(rootNode.predicate, isOuterJoin);
      lf.tree.replaceChainWithNode(rootNode, child$$0, joinNode);
      rootNode == this.rootNode && (this.rootNode = joinNode);
      rootNode = joinNode;
    }
  }
  rootNode.getChildren().forEach(function(child) {
    this.traverse_(child, opt_query);
  }, this);
};
lf.proc.PushDownSelectionsPass = function() {
  this.alreadyPushedDown_ = lf.structs.set.create();
};
goog.inherits(lf.proc.PushDownSelectionsPass, lf.proc.RewritePass);
lf.proc.PushDownSelectionsPass.prototype.clear_ = function() {
  this.alreadyPushedDown_.clear();
};
lf.proc.PushDownSelectionsPass.prototype.rewrite = function(rootNode) {
  this.clear_();
  this.rootNode = rootNode;
  this.traverse_(this.rootNode);
  this.clear_();
  return this.rootNode;
};
lf.proc.PushDownSelectionsPass.prototype.traverse_ = function(node) {
  if (this.isCandidateNode_(node)) {
    var selectNode = node, newRoot = selectNode.predicate instanceof lf.pred.ValuePredicate ? this.pushDownValuePredNodeRec_(selectNode) : this.pushDownJoinPredNodeRec_(selectNode);
    this.alreadyPushedDown_.add(selectNode);
    newRoot == selectNode && (newRoot = selectNode.getChildAt(0));
    goog.isNull(newRoot) || (goog.isNull(newRoot.getParent()) && (this.rootNode = newRoot), this.isCandidateNode_(newRoot) && !this.alreadyPushedDown_.has(newRoot) && this.traverse_(newRoot));
  } else {
    node.getChildren().forEach(function(child) {
      this.traverse_(child);
    }, this);
  }
};
lf.proc.PushDownSelectionsPass.prototype.pushDownNodeRec_ = function(node$$0, shouldPushDownFn) {
  var newRoot = node$$0;
  if (this.shouldSwapWithChild_(node$$0)) {
    newRoot = lf.tree.swapNodeWithChild(node$$0), this.pushDownNodeRec_(node$$0, shouldPushDownFn);
  } else {
    if (this.shouldPushBelowChild_(node$$0)) {
      var newNodes = [], cloneFn = function(node) {
        var newNode = new lf.proc.SelectNode(node.predicate);
        newNodes.push(newNode);
        return newNode;
      }, newRoot = lf.tree.pushNodeBelowChild(node$$0, shouldPushDownFn, cloneFn);
      newNodes.forEach(function(newNode) {
        this.pushDownNodeRec_(newNode, shouldPushDownFn);
      }, this);
    }
  }
  return newRoot;
};
lf.proc.PushDownSelectionsPass.prototype.pushDownValuePredNodeRec_ = function(node) {
  var selectNodeTables = lf.structs.set.create([node.predicate.column.getTable().getEffectiveName()]), shouldPushDownFn = function(child) {
    return this.doesReferToTables_(child, selectNodeTables);
  }.bind(this);
  return this.pushDownNodeRec_(node, shouldPushDownFn);
};
lf.proc.PushDownSelectionsPass.prototype.pushDownJoinPredNodeRec_ = function(node) {
  var selectNodeTables = lf.structs.set.create([node.predicate.leftColumn.getTable().getEffectiveName(), node.predicate.rightColumn.getTable().getEffectiveName()]), shouldPushDownFn = function(child) {
    return this.doesReferToTables_(child, selectNodeTables);
  }.bind(this);
  return this.pushDownNodeRec_(node, shouldPushDownFn);
};
lf.proc.PushDownSelectionsPass.prototype.doesReferToTables_ = function(root, tables) {
  var referredTables = lf.structs.set.create();
  lf.tree.getLeafNodes(root).forEach(function(tableAccessNode) {
    referredTables.add(tableAccessNode.table.getEffectiveName());
  }, this);
  root instanceof lf.proc.TableAccessNode && referredTables.add(root.table.getEffectiveName());
  return lf.structs.set.isSubset(referredTables, tables);
};
lf.proc.PushDownSelectionsPass.prototype.isCandidateNode_ = function(node) {
  return node instanceof lf.proc.SelectNode && !(node.predicate instanceof lf.pred.CombinedPredicate);
};
lf.proc.PushDownSelectionsPass.prototype.shouldPushBelowChild_ = function(node) {
  var child = node.getChildAt(0);
  return child instanceof lf.proc.CrossProductNode || child instanceof lf.proc.JoinNode;
};
lf.proc.PushDownSelectionsPass.prototype.shouldSwapWithChild_ = function(node) {
  return node.getChildAt(0) instanceof lf.proc.SelectNode;
};
lf.proc.SelectLogicalPlanGenerator = function(query, rewritePasses) {
  lf.proc.BaseLogicalPlanGenerator.call(this, query);
  this.rewritePasses_ = rewritePasses;
  this.projectNode_ = this.limitNode_ = this.skipNode_ = this.orderByNode_ = this.aggregationNode_ = this.groupByNode_ = this.selectNode_ = this.crossProductNode_ = this.tableAccessNodes_ = null;
};
goog.inherits(lf.proc.SelectLogicalPlanGenerator, lf.proc.BaseLogicalPlanGenerator);
lf.proc.SelectLogicalPlanGenerator.prototype.generateInternal = function() {
  this.generateNodes_();
  var rootNode = this.connectNodes_(), planRewriter = new lf.proc.LogicalPlanRewriter(rootNode, this.query, this.rewritePasses_);
  return planRewriter.generate();
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateNodes_ = function() {
  this.generateTableAccessNodes_();
  this.generateCrossProductNode_();
  this.generateSelectNode_();
  this.generateOrderByNode_();
  this.generateSkipNode_();
  this.generateLimitNode_();
  this.generateGroupByNode_();
  this.generateAggregationNode_();
  this.generateProjectNode_();
};
lf.proc.SelectLogicalPlanGenerator.prototype.connectNodes_ = function() {
  for (var parentOrder = [this.limitNode_, this.skipNode_, this.projectNode_, this.orderByNode_, this.aggregationNode_, this.groupByNode_, this.selectNode_, this.crossProductNode_], lastExistingParentIndex = null, rootNode = null, i = 0;i < parentOrder.length;i++) {
    var node = parentOrder[i];
    goog.isNull(node) || (goog.isNull(rootNode) ? rootNode = node : parentOrder[lastExistingParentIndex].addChild(node), lastExistingParentIndex = i);
  }
  this.tableAccessNodes_.forEach(function(tableAccessNode) {
    parentOrder[lastExistingParentIndex].addChild(tableAccessNode);
  });
  return rootNode;
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateTableAccessNodes_ = function() {
  this.tableAccessNodes_ = this.query.from.map(function(table) {
    return new lf.proc.TableAccessNode(table);
  }, this);
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateCrossProductNode_ = function() {
  2 <= this.query.from.length && (this.crossProductNode_ = new lf.proc.CrossProductNode);
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateSelectNode_ = function() {
  this.selectNode_ = goog.isDefAndNotNull(this.query.where) ? new lf.proc.SelectNode(this.query.where.copy()) : null;
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateOrderByNode_ = function() {
  this.query.orderBy && (this.orderByNode_ = new lf.proc.OrderByNode(this.query.orderBy));
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateLimitNode_ = function() {
  goog.isDefAndNotNull(this.query.limit) && (this.limitNode_ = new lf.proc.LimitNode(this.query.limit));
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateSkipNode_ = function() {
  goog.isDefAndNotNull(this.query.skip) && 0 < this.query.skip && (this.skipNode_ = new lf.proc.SkipNode(this.query.skip));
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateGroupByNode_ = function() {
  goog.isDefAndNotNull(this.query.groupBy) && (this.groupByNode_ = new lf.proc.GroupByNode(this.query.groupBy));
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateAggregationNode_ = function() {
  var aggregatedColumns = this.query.columns.filter(function(column) {
    return column instanceof lf.fn.AggregatedColumn;
  });
  goog.isDefAndNotNull(this.query.orderBy) && this.query.orderBy.forEach(function(orderBy) {
    orderBy.column instanceof lf.fn.AggregatedColumn && aggregatedColumns.push(orderBy.column);
  });
  0 < aggregatedColumns.length && (this.aggregationNode_ = new lf.proc.AggregationNode(aggregatedColumns));
};
lf.proc.SelectLogicalPlanGenerator.prototype.generateProjectNode_ = function() {
  this.projectNode_ = new lf.proc.ProjectNode(this.query.columns || [], this.query.groupBy || null);
};
lf.proc.LogicalPlanFactory = function() {
  this.selectOptimizationPasses_ = [new lf.proc.AndPredicatePass, new lf.proc.CrossProductPass, new lf.proc.PushDownSelectionsPass, new lf.proc.ImplicitJoinsPass];
  this.deleteOptimizationPasses_ = [new lf.proc.AndPredicatePass];
};
lf.proc.LogicalPlanFactory.prototype.create = function(query) {
  var generator = null;
  if (query instanceof lf.query.InsertContext) {
    generator = new lf.proc.InsertLogicalPlanGenerator(query);
  } else {
    if (query instanceof lf.query.DeleteContext) {
      generator = new lf.proc.DeleteLogicalPlanGenerator(query, this.deleteOptimizationPasses_);
    } else {
      if (query instanceof lf.query.SelectContext) {
        generator = new lf.proc.SelectLogicalPlanGenerator(query, this.selectOptimizationPasses_);
      } else {
        if (query instanceof lf.query.UpdateContext) {
          generator = new lf.proc.UpdateLogicalPlanGenerator(query);
        } else {
          throw new lf.Exception(513);
        }
      }
    }
  }
  var rootNode = generator.generate();
  return new lf.proc.LogicalQueryPlan(rootNode, query.getScope());
};
lf.proc.DeleteStep = function(table) {
  lf.proc.PhysicalQueryPlanNode.call(this, 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.table_ = table;
};
goog.inherits(lf.proc.DeleteStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.DeleteStep.prototype.toString = function() {
  return "delete(" + this.table_.getName() + ")";
};
lf.proc.DeleteStep.prototype.execInternal = function(journal, relations) {
  var rows = relations[0].entries.map(function(entry) {
    return entry.row;
  });
  journal.remove(this.table_, rows);
  return [lf.proc.Relation.createEmpty()];
};
lf.proc.GetRowCountStep = function(global, table) {
  lf.proc.PhysicalQueryPlanNode.call(this, 0, lf.proc.PhysicalQueryPlanNode.ExecType.NO_CHILD);
  this.table = table;
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
};
goog.inherits(lf.proc.GetRowCountStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.GetRowCountStep.prototype.toString = function() {
  return "get_row_count(" + this.table.getName() + ")";
};
lf.proc.GetRowCountStep.prototype.execInternal = function() {
  var rowIdIndex = this.indexStore_.get(this.table.getRowIdIndexName()), relation = new lf.proc.Relation([], [this.table.getName()]);
  relation.setAggregationResult(lf.fn.count(), rowIdIndex.stats().totalRows);
  return [relation];
};
lf.proc.TableAccessFullStep = function(global, table) {
  lf.proc.PhysicalQueryPlanNode.call(this, 0, lf.proc.PhysicalQueryPlanNode.ExecType.NO_CHILD);
  this.cache_ = global.getService(lf.service.CACHE);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.table = table;
};
goog.inherits(lf.proc.TableAccessFullStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.TableAccessFullStep.prototype.toString = function() {
  var out = "table_access(" + this.table.getName();
  goog.isNull(this.table.getAlias()) || (out += " as " + this.table.getAlias());
  return out += ")";
};
lf.proc.TableAccessFullStep.prototype.execInternal = function() {
  var rowIds = this.indexStore_.get(this.table.getRowIdIndexName()).getRange();
  return [lf.proc.Relation.fromRows(this.cache_.get(rowIds), [this.table.getEffectiveName()])];
};
lf.proc.GetRowCountPass = function(global) {
  this.global_ = global;
};
goog.inherits(lf.proc.GetRowCountPass, lf.proc.RewritePass);
lf.proc.GetRowCountPass.prototype.rewrite = function(rootNode, queryContext) {
  this.rootNode = rootNode;
  if (!this.canOptimize_(queryContext)) {
    return rootNode;
  }
  var tableAccessFullStep = lf.tree.find(rootNode, function(node) {
    return node instanceof lf.proc.TableAccessFullStep;
  })[0], getRowCountStep = new lf.proc.GetRowCountStep(this.global_, tableAccessFullStep.table);
  lf.tree.replaceNodeWithChain(tableAccessFullStep, getRowCountStep, getRowCountStep);
  return this.rootNode;
};
lf.proc.GetRowCountPass.prototype.canOptimize_ = function(queryContext) {
  var isCandidate = 1 == queryContext.columns.length && 1 == queryContext.from.length && !goog.isDefAndNotNull(queryContext.where) && !goog.isDefAndNotNull(queryContext.limit) && !goog.isDefAndNotNull(queryContext.skip) && !goog.isDefAndNotNull(queryContext.groupBy);
  if (isCandidate) {
    var column = queryContext.columns[0];
    return column instanceof lf.fn.AggregatedColumn && column.aggregatorType == lf.fn.Type.COUNT && column.child instanceof lf.fn.StarColumn;
  }
  return !1;
};
lf.proc.GroupByStep = function(groupByColumns) {
  lf.proc.PhysicalQueryPlanNode.call(this, 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.groupByColumns_ = groupByColumns;
};
goog.inherits(lf.proc.GroupByStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.GroupByStep.prototype.toString = function() {
  var columnNames = this.groupByColumns_.map(function(column) {
    return column.getNormalizedName();
  });
  return "groupBy(" + columnNames.toString() + ")";
};
lf.proc.GroupByStep.prototype.execInternal = function(journal, relations) {
  return this.calculateGroupedRelations_(relations[0]);
};
lf.proc.GroupByStep.prototype.calculateGroupedRelations_ = function(relation) {
  var groupMap = new goog.labs.structs.Multimap, getKey = function(entry) {
    var keys = this.groupByColumns_.map(function(column) {
      return entry.getField(column);
    }, this);
    return keys.join(",");
  }.bind(this);
  relation.entries.forEach(function(entry) {
    groupMap.add(getKey(entry), entry);
  }, this);
  return groupMap.getKeys().map(function(key) {
    return new lf.proc.Relation(groupMap.get(key), relation.getTables());
  }, this);
};
$jscomp.scope.calculateCartesianProduct = function(keyRangeSets) {
  goog.asserts.assert(1 < keyRangeSets.length, "Should only be called for cross-column indices.");
  var keyRangeSetsAsArrays = keyRangeSets.map(function(keyRangeSet) {
    return keyRangeSet.getValues();
  }), it = goog.iter.product.apply(null, keyRangeSetsAsArrays), combinations = [];
  goog.iter.forEach(it, function(value) {
    combinations.push(value);
  });
  return combinations;
};
lf.proc.IndexKeyRangeCalculator = function() {
};
lf.proc.NotBoundKeyRangeCalculator = function(indexSchema) {
  this.indexSchema_ = indexSchema;
};
lf.proc.NotBoundKeyRangeCalculator.prototype.getKeyRangeCombinations = function() {
  return 1 == this.indexSchema_.columns.length ? [lf.index.SingleKeyRange.all()] : [this.indexSchema_.columns.map(function() {
    return lf.index.SingleKeyRange.all();
  })];
};
lf.proc.BoundKeyRangeCalculator = function(indexSchema, predicateMap) {
  this.indexSchema_ = indexSchema;
  this.predicateMap_ = predicateMap;
  this.combinations_ = this.lastQueryContext_ = null;
};
lf.proc.BoundKeyRangeCalculator.prototype.calculateKeyRangeMap_ = function(queryContext) {
  var keyRangeMap = lf.structs.map.create();
  this.predicateMap_.getKeys().forEach(function(columnName) {
    var predicateIds = this.predicateMap_.get(columnName), predicates = predicateIds.map(function(predicateId) {
      return queryContext.getPredicate(predicateId);
    }, this), keyRangeSetSoFar = new lf.index.SingleKeyRangeSet([lf.index.SingleKeyRange.all()]);
    predicates.forEach(function(predicate) {
      var predicateKeyRangeSet = new lf.index.SingleKeyRangeSet(predicate.toKeyRange());
      keyRangeSetSoFar = lf.index.SingleKeyRangeSet.intersect(keyRangeSetSoFar, predicateKeyRangeSet);
    });
    keyRangeMap.set(columnName, keyRangeSetSoFar);
  }, this);
  return keyRangeMap;
};
lf.proc.BoundKeyRangeCalculator.prototype.fillMissingKeyRanges_ = function(keyRangeMap) {
  for (var i = this.indexSchema_.columns.length - 1;0 <= i;i--) {
    var column = this.indexSchema_.columns[i], keyRangeSet = keyRangeMap.get(column.schema.getName()) || null;
    if (!goog.isNull(keyRangeSet)) {
      break;
    }
    keyRangeMap.set(column.schema.getName(), new lf.index.SingleKeyRangeSet([lf.index.SingleKeyRange.all()]));
  }
};
lf.proc.BoundKeyRangeCalculator.prototype.getKeyRangeCombinations = function(queryContext) {
  if (this.lastQueryContext_ == queryContext) {
    return this.combinations_;
  }
  var keyRangeMap = this.calculateKeyRangeMap_(queryContext);
  this.fillMissingKeyRanges_(keyRangeMap);
  this.combinations_ = 1 == this.indexSchema_.columns.length ? lf.structs.map.values(keyRangeMap)[0].getValues() : (0,$jscomp.scope.calculateCartesianProduct)(this.getSortedKeyRangeSets_(keyRangeMap));
  this.lastQueryContext_ = queryContext;
  return this.combinations_;
};
lf.proc.BoundKeyRangeCalculator.prototype.getSortedKeyRangeSets_ = function(keyRangeMap) {
  var sortHelper = lf.structs.map.create(), priority = 0;
  this.indexSchema_.columns.forEach(function(column) {
    sortHelper.set(column.schema.getName(), priority);
    priority++;
  });
  var sortedColumnNames = lf.structs.map.keys(keyRangeMap).sort(function(a, b) {
    return sortHelper.get(a) - sortHelper.get(b);
  });
  return sortedColumnNames.map(function(columnName) {
    return keyRangeMap.get(columnName);
  });
};
lf.proc.IndexCostEstimator = function(global, tableSchema) {
  this.tableSchema_ = tableSchema;
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
};
lf.proc.IndexCostEstimator.prototype.chooseIndexFor = function(queryContext, predicates) {
  var candidatePredicates = predicates.filter(this.isCandidate_, this);
  if (0 == candidatePredicates.length) {
    return null;
  }
  var indexRangeCandidates = this.generateIndexRangeCandidates_(candidatePredicates);
  if (0 == indexRangeCandidates.length) {
    return null;
  }
  if (1 == indexRangeCandidates.length) {
    return indexRangeCandidates[0];
  }
  var minCost = Number.MAX_VALUE;
  return indexRangeCandidates.reduce(function(prev, curr) {
    var cost = curr.calculateCost(queryContext);
    return cost < minCost ? (minCost = cost, curr) : prev;
  }, null);
};
lf.proc.IndexCostEstimator.prototype.generateIndexRangeCandidates_ = function(predicates) {
  var indexSchemas = this.tableSchema_.getIndices();
  return indexSchemas.map(function(indexSchema) {
    var indexRangeCandidate = new lf.proc.IndexRangeCandidate(this.indexStore_, indexSchema);
    indexRangeCandidate.consumePredicates_(predicates);
    return indexRangeCandidate;
  }, this).filter(function(indexRangeCandidate) {
    return indexRangeCandidate.isUsable();
  });
};
lf.proc.IndexCostEstimator.prototype.isCandidate_ = function(predicate) {
  return predicate instanceof lf.pred.ValuePredicate && predicate.isKeyRangeCompatible() ? predicate.column.getTable() == this.tableSchema_ : !1;
};
lf.proc.IndexRangeCandidate = function(indexStore, indexSchema) {
  this.indexStore_ = indexStore;
  this.indexSchema = indexSchema;
  this.indexedColumnNames_ = lf.structs.set.create(this.indexSchema.columns.map(function(col) {
    return col.schema.getName();
  }));
  this.keyRangeCalculator_ = this.predicateMap_ = null;
};
lf.proc.IndexRangeCandidate.prototype.getPredicateIds = function() {
  return goog.isNull(this.predicateMap_) ? [] : this.predicateMap_.getValues();
};
lf.proc.IndexRangeCandidate.prototype.getKeyRangeCalculator = function() {
  goog.asserts.assert(this.predicateMap_);
  goog.isNull(this.keyRangeCalculator_) && (this.keyRangeCalculator_ = new lf.proc.BoundKeyRangeCalculator(this.indexSchema, this.predicateMap_));
  return this.keyRangeCalculator_;
};
lf.proc.IndexRangeCandidate.prototype.consumePredicates_ = function(predicates) {
  predicates.forEach(function(predicate) {
    var columnName = predicate.getColumns()[0].getName();
    this.indexedColumnNames_.has(columnName) && (goog.isNull(this.predicateMap_) && (this.predicateMap_ = new goog.labs.structs.Multimap), this.predicateMap_.add(columnName, predicate.getId()));
  }, this);
};
lf.proc.IndexRangeCandidate.prototype.isUsable = function() {
  if (goog.isNull(this.predicateMap_)) {
    return !1;
  }
  for (var unboundColumnFound = !1, isUsable = !0, i = 0;i < this.indexSchema.columns.length;i++) {
    var column = this.indexSchema.columns[i], isBound = this.predicateMap_.containsKey(column.schema.getName());
    if (unboundColumnFound && isBound) {
      isUsable = !1;
      break;
    }
    isBound || (unboundColumnFound = !0);
  }
  return isUsable;
};
lf.proc.IndexRangeCandidate.prototype.calculateCost = function(queryContext) {
  var combinations = this.getKeyRangeCalculator().getKeyRangeCombinations(queryContext), indexData = this.indexStore_.get(this.indexSchema.getNormalizedName());
  return combinations.reduce(function(costSoFar, combination) {
    return costSoFar + indexData.cost(combination);
  }, 0);
};
lf.proc.IndexRangeScanStep = function(global, index, keyRangeCalculator, reverseOrder) {
  lf.proc.PhysicalQueryPlanNode.call(this, 0, lf.proc.PhysicalQueryPlanNode.ExecType.NO_CHILD);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.index = index;
  this.keyRangeCalculator = keyRangeCalculator;
  this.reverseOrder = reverseOrder;
  this.useSkip = this.useLimit = !1;
};
goog.inherits(lf.proc.IndexRangeScanStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.IndexRangeScanStep.prototype.toString = function() {
  return "index_range_scan(" + this.index.getNormalizedName() + ", ?, " + (this.reverseOrder ? "reverse" : "natural") + (this.useLimit ? ", limit:?" : "") + (this.useSkip ? ", skip:?" : "") + ")";
};
lf.proc.IndexRangeScanStep.prototype.toContextString = function(context) {
  var string = this.toString(), keyRanges = this.keyRangeCalculator.getKeyRangeCombinations(context), string = string.replace("?", keyRanges.toString());
  this.useLimit && (string = string.replace("?", context.limit.toString()));
  this.useSkip && (string = string.replace("?", context.skip.toString()));
  return string;
};
lf.proc.IndexRangeScanStep.prototype.execInternal = function(journal, relations, context) {
  var keyRanges = this.keyRangeCalculator.getKeyRangeCombinations(context), index = this.indexStore_.get(this.index.getNormalizedName()), rowIds;
  rowIds = 1 == keyRanges.length && keyRanges[0] instanceof lf.index.SingleKeyRange && keyRanges[0].isOnly() ? lf.index.slice(index.get(keyRanges[0].from), !1, this.useLimit ? context.limit : void 0, this.useSkip ? context.skip : void 0) : index.getRange(keyRanges, this.reverseOrder, this.useLimit ? context.limit : void 0, this.useSkip ? context.skip : void 0);
  var rows = rowIds.map(function(rowId) {
    return new lf.Row(rowId, {});
  }, this);
  return [lf.proc.Relation.fromRows(rows, [this.index.tableName])];
};
lf.proc.SelectStep = function(predicateId) {
  lf.proc.PhysicalQueryPlanNode.call(this, 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.predicateId = predicateId;
};
goog.inherits(lf.proc.SelectStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.SelectStep.prototype.toString = function() {
  return "select(?)";
};
lf.proc.SelectStep.prototype.toContextString = function(context) {
  var predicate = context.getPredicate(this.predicateId);
  return this.toString().replace("?", predicate.toString());
};
lf.proc.SelectStep.prototype.execInternal = function(journal, relations, context) {
  var predicate = context.getPredicate(this.predicateId);
  return [predicate.eval(relations[0])];
};
lf.proc.TableAccessByRowIdStep = function(global, table) {
  lf.proc.PhysicalQueryPlanNode.call(this, 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.cache_ = global.getService(lf.service.CACHE);
  this.table_ = table;
};
goog.inherits(lf.proc.TableAccessByRowIdStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.TableAccessByRowIdStep.prototype.toString = function() {
  return "table_access_by_row_id(" + this.table_.getName() + ")";
};
lf.proc.TableAccessByRowIdStep.prototype.execInternal = function(journal, relations) {
  return [lf.proc.Relation.fromRows(this.cache_.get(relations[0].getRowIds()), [this.table_.getEffectiveName()])];
};
lf.proc.IndexRangeScanPass = function(global) {
  this.global_ = global;
};
goog.inherits(lf.proc.IndexRangeScanPass, lf.proc.RewritePass);
lf.proc.IndexRangeScanPass.prototype.rewrite = function(rootNode, queryContext) {
  this.rootNode = rootNode;
  var tableAccessFullSteps = lf.tree.find(rootNode, function(node) {
    return node instanceof lf.proc.TableAccessFullStep;
  });
  tableAccessFullSteps.forEach(function(tableAccessFullStep) {
    var selectStepsCandidates = this.findSelectSteps_(tableAccessFullStep);
    if (0 != selectStepsCandidates.length) {
      var costEstimator = new lf.proc.IndexCostEstimator(this.global_, tableAccessFullStep.table), indexRangeCandidate = costEstimator.chooseIndexFor(queryContext, selectStepsCandidates.map(function(c) {
        return queryContext.getPredicate(c.predicateId);
      }));
      if (!goog.isNull(indexRangeCandidate)) {
        var predicateToSelectStepMap = lf.structs.map.create();
        selectStepsCandidates.forEach(function(selectStep) {
          predicateToSelectStepMap.set(selectStep.predicateId, selectStep);
        }, this);
        this.rootNode = this.replaceWithIndexRangeScanStep_(indexRangeCandidate, predicateToSelectStepMap, tableAccessFullStep, queryContext);
      }
    }
  }, this);
  return this.rootNode;
};
lf.proc.IndexRangeScanPass.prototype.findSelectSteps_ = function(startNode) {
  for (var selectSteps = [], node = startNode.getParent();node;) {
    node instanceof lf.proc.SelectStep && selectSteps.push(node), node = node.getParent();
  }
  return selectSteps;
};
lf.proc.IndexRangeScanPass.prototype.replaceWithIndexRangeScanStep_ = function(indexRangeCandidate, predicateToSelectStepMap, tableAccessFullStep) {
  var predicateIds = indexRangeCandidate.getPredicateIds(), selectSteps = predicateIds.map(function(predicateId) {
    return predicateToSelectStepMap.get(predicateId);
  });
  selectSteps.forEach(lf.tree.removeNode);
  var indexRangeScanStep = new lf.proc.IndexRangeScanStep(this.global_, indexRangeCandidate.indexSchema, indexRangeCandidate.getKeyRangeCalculator(), !1), tableAccessByRowIdStep = new lf.proc.TableAccessByRowIdStep(this.global_, tableAccessFullStep.table);
  tableAccessByRowIdStep.addChild(indexRangeScanStep);
  lf.tree.replaceNodeWithChain(tableAccessFullStep, tableAccessByRowIdStep, indexRangeScanStep);
  return indexRangeScanStep.getRoot();
};
lf.proc.InsertStep = function(global, table) {
  lf.proc.PhysicalQueryPlanNode.call(this, 0, lf.proc.PhysicalQueryPlanNode.ExecType.NO_CHILD);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.table_ = table;
};
goog.inherits(lf.proc.InsertStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.InsertStep.prototype.toString = function() {
  return "insert(" + this.table_.getName() + ")";
};
lf.proc.InsertStep.prototype.execInternal = function(journal, relations, context) {
  var queryContext = context;
  lf.proc.InsertStep.assignAutoIncrementPks_(this.table_, queryContext.values, this.indexStore_);
  journal.insert(this.table_, queryContext.values);
  return [lf.proc.Relation.fromRows(queryContext.values, [this.table_.getName()])];
};
lf.proc.InsertStep.assignAutoIncrementPks_ = function(table, values, indexStore) {
  var pkIndexSchema = table.getConstraint().getPrimaryKey(), autoIncrement = goog.isNull(pkIndexSchema) ? !1 : pkIndexSchema.columns[0].autoIncrement;
  if (autoIncrement) {
    var pkColumnName = pkIndexSchema.columns[0].schema.getName(), index = indexStore.get(pkIndexSchema.getNormalizedName()), max = index.max(), maxKey = goog.isNull(max) ? 0 : max[0];
    values.forEach(function(row) {
      0 != row.payload()[pkColumnName] && goog.isDefAndNotNull(row.payload()[pkColumnName]) || (maxKey++, row.payload()[pkColumnName] = maxKey);
    });
  }
};
lf.proc.InsertOrReplaceStep = function(global, table) {
  lf.proc.PhysicalQueryPlanNode.call(this, 0, lf.proc.PhysicalQueryPlanNode.ExecType.NO_CHILD);
  this.indexStore_ = global.getService(lf.service.INDEX_STORE);
  this.table_ = table;
};
goog.inherits(lf.proc.InsertOrReplaceStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.InsertOrReplaceStep.prototype.toString = function() {
  return "insert_replace(" + this.table_.getName() + ")";
};
lf.proc.InsertOrReplaceStep.prototype.execInternal = function(journal, relations, context) {
  var queryContext = context;
  lf.proc.InsertStep.assignAutoIncrementPks_(this.table_, queryContext.values, this.indexStore_);
  journal.insertOrReplace(this.table_, queryContext.values);
  return [lf.proc.Relation.fromRows(queryContext.values, [this.table_.getName()])];
};
lf.proc.JoinStep = function(predicate, isOuterJoin) {
  lf.proc.PhysicalQueryPlanNode.call(this, 2, lf.proc.PhysicalQueryPlanNode.ExecType.ALL);
  this.predicate_ = predicate;
  this.isOuterJoin_ = isOuterJoin;
  this.algorithm_ = this.predicate_.evaluatorType == lf.eval.Type.EQ ? lf.proc.JoinStep.Algorithm_.HASH : lf.proc.JoinStep.Algorithm_.NESTED_LOOP;
};
goog.inherits(lf.proc.JoinStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.JoinStep.Algorithm_ = {HASH:0, INDEX_NESTED_LOOP:1, NESTED_LOOP:2};
lf.proc.JoinStep.AlgorithmToString_ = ["hash", "index_nested_loop", "nested_loop"];
lf.proc.JoinStep.prototype.toString = function() {
  return "join(type: " + (this.isOuterJoin_ ? "outer" : "inner") + ", impl: " + lf.proc.JoinStep.AlgorithmToString_[this.algorithm_] + ", " + this.predicate_.toString() + ")";
};
lf.proc.JoinStep.prototype.execInternal = function(journal, relations) {
  return [this.predicate_.evalRelations(relations[0], relations[1], this.isOuterJoin_)];
};
lf.proc.LimitStep = function() {
  lf.proc.PhysicalQueryPlanNode.call(this, 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
};
goog.inherits(lf.proc.LimitStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.LimitStep.prototype.toString = function() {
  return "limit(?)";
};
lf.proc.LimitStep.prototype.toContextString = function(context) {
  return this.toString().replace("?", context.limit.toString());
};
lf.proc.LimitStep.prototype.execInternal = function(journal, relations, context) {
  relations[0].entries.splice(context.limit);
  return relations;
};
lf.proc.OrderByStep = function(orderBy) {
  lf.proc.PhysicalQueryPlanNode.call(this, lf.proc.PhysicalQueryPlanNode.ANY, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.orderBy = orderBy;
};
goog.inherits(lf.proc.OrderByStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.OrderByStep.prototype.toString = function() {
  return "order_by(" + lf.query.SelectContext.orderByToString(this.orderBy) + ")";
};
lf.proc.OrderByStep.prototype.execInternal = function(journal, relations) {
  if (1 == relations.length) {
    var distinctColumn = this.findDistinctColumn_(relations[0]), relationToSort = goog.isNull(distinctColumn) ? relations[0] : relations[0].getAggregationResult(distinctColumn);
    relationToSort.entries.sort(this.entryComparatorFn_.bind(this));
  } else {
    relations.sort(this.relationComparatorFn_.bind(this));
  }
  return relations;
};
lf.proc.OrderByStep.prototype.findDistinctColumn_ = function(relation) {
  for (var distinctColumn = null, i = 0;i < this.orderBy.length;i++) {
    var tempDistinctColumn = lf.fn.distinct(this.orderBy[i].column);
    if (relation.hasAggregationResult(tempDistinctColumn)) {
      distinctColumn = tempDistinctColumn;
      break;
    }
  }
  return distinctColumn;
};
lf.proc.OrderByStep.prototype.comparator_ = function(getLeftPayload, getRightPayload) {
  var order = null, leftPayload = null, rightPayload = null, comparisonIndex = -1;
  do {
    comparisonIndex++;
    var column = this.orderBy[comparisonIndex].column, order = this.orderBy[comparisonIndex].order, leftPayload = getLeftPayload(column), rightPayload = getRightPayload(column);
  } while (leftPayload == rightPayload && comparisonIndex + 1 < this.orderBy.length);
  var result = leftPayload < rightPayload ? -1 : leftPayload > rightPayload ? 1 : 0;
  return result = order == lf.Order.ASC ? result : -result;
};
lf.proc.OrderByStep.prototype.relationComparatorFn_ = function(lhs, rhs) {
  return this.comparator_(function(column) {
    return column instanceof lf.fn.AggregatedColumn ? lhs.getAggregationResult(column) : lhs.entries[lhs.entries.length - 1].getField(column);
  }, function(column) {
    return column instanceof lf.fn.AggregatedColumn ? rhs.getAggregationResult(column) : rhs.entries[rhs.entries.length - 1].getField(column);
  });
};
lf.proc.OrderByStep.prototype.entryComparatorFn_ = function(lhs, rhs) {
  return this.comparator_(function(column) {
    return lhs.getField(column);
  }, function(column) {
    return rhs.getField(column);
  });
};
lf.proc.RelationTransformer = function(relation, columns) {
  this.relation_ = relation;
  this.columns_ = columns;
};
lf.proc.RelationTransformer.prototype.getTransformed = function() {
  var aggregatedColumnsExist = this.columns_.some(function(column) {
    return column instanceof lf.fn.AggregatedColumn;
  }, this);
  return aggregatedColumnsExist ? this.handleAggregatedColumns_() : this.handleNonAggregatedColumns_();
};
lf.proc.RelationTransformer.prototype.handleAggregatedColumns_ = function() {
  if (1 == this.columns_.length && this.columns_[0].aggregatorType == lf.fn.Type.DISTINCT) {
    var distinctRelation = this.relation_.getAggregationResult(this.columns_[0]), newEntries = distinctRelation.entries.map(function(entry) {
      var newEntry = new lf.proc.RelationEntry(new lf.Row(lf.Row.DUMMY_ID, {}), this.relation_.isPrefixApplied());
      newEntry.setField(this.columns_[0], entry.getField(this.columns_[0].child));
      return newEntry;
    }, this);
    return new lf.proc.Relation(newEntries, []);
  }
  var entry$$0 = new lf.proc.RelationEntry(new lf.Row(lf.Row.DUMMY_ID, {}), this.relation_.isPrefixApplied());
  this.columns_.forEach(function(column) {
    var value = column instanceof lf.fn.AggregatedColumn ? this.relation_.getAggregationResult(column) : this.relation_.entries[0].getField(column);
    entry$$0.setField(column, value);
  }, this);
  return new lf.proc.Relation([entry$$0], this.relation_.getTables());
};
lf.proc.RelationTransformer.prototype.handleNonAggregatedColumns_ = function() {
  var transformedEntries = Array(this.relation_.entries.length), isPrefixApplied = this.relation_.isPrefixApplied();
  this.relation_.entries.forEach(function(entry, index) {
    transformedEntries[index] = new lf.proc.RelationEntry(new lf.Row(entry.row.id(), {}), isPrefixApplied);
    this.columns_.forEach(function(column) {
      transformedEntries[index].setField(column, entry.getField(column));
    }, this);
  }, this);
  return new lf.proc.Relation(transformedEntries, this.relation_.getTables());
};
lf.proc.RelationTransformer.transformMany = function(relations, columns) {
  var entries = relations.map(function(relation) {
    var relationTransformer = new lf.proc.RelationTransformer(relation, columns), singleEntryRelation = relationTransformer.getTransformed();
    return singleEntryRelation.entries[0];
  });
  return new lf.proc.Relation(entries, relations[0].getTables());
};
lf.proc.ProjectStep = function(columns, groupByColumns) {
  lf.proc.PhysicalQueryPlanNode.call(this, lf.proc.PhysicalQueryPlanNode.ANY, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.columns = columns;
  this.groupByColumns = groupByColumns;
};
goog.inherits(lf.proc.ProjectStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.ProjectStep.prototype.toString = function() {
  var string = "project(" + this.columns.toString();
  if (!goog.isNull(this.groupByColumns)) {
    var groupBy = this.groupByColumns.map(function(col) {
      return col.getNormalizedName();
    }).join(", "), string = string + (", groupBy(" + groupBy + ")")
  }
  return string += ")";
};
lf.proc.ProjectStep.prototype.execInternal = function(journal, relations) {
  return 0 == relations.length ? [lf.proc.Relation.createEmpty()] : 1 == relations.length ? [this.execNonGroupByProjection_(relations[0])] : [this.execGroupByProjection_(relations)];
};
lf.proc.ProjectStep.prototype.hasAggregators = function() {
  var hasAggregators = this.columns.some(function(column) {
    return column instanceof lf.fn.AggregatedColumn;
  });
  return hasAggregators || !goog.isNull(this.groupByColumns);
};
lf.proc.ProjectStep.prototype.execGroupByProjection_ = function(relations) {
  return lf.proc.RelationTransformer.transformMany(relations, this.columns);
};
lf.proc.ProjectStep.prototype.execNonGroupByProjection_ = function(relation) {
  if (0 == this.columns.length) {
    return relation;
  }
  var relationTransformer = new lf.proc.RelationTransformer(relation, this.columns);
  return relationTransformer.getTransformed();
};
lf.proc.SkipStep = function() {
  lf.proc.PhysicalQueryPlanNode.call(this, 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
};
goog.inherits(lf.proc.SkipStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.SkipStep.prototype.toString = function() {
  return "skip(?)";
};
lf.proc.SkipStep.prototype.toContextString = function(context) {
  return this.toString().replace("?", context.skip.toString());
};
lf.proc.SkipStep.prototype.execInternal = function(journal, relations, context) {
  return [new lf.proc.Relation(relations[0].entries.slice(context.skip), relations[0].getTables())];
};
lf.proc.LimitSkipByIndexPass = function() {
};
goog.inherits(lf.proc.LimitSkipByIndexPass, lf.proc.RewritePass);
lf.proc.LimitSkipByIndexPass.prototype.rewrite = function(rootNode) {
  var nodes = lf.tree.find(rootNode, function(node) {
    return node instanceof lf.proc.LimitStep || node instanceof lf.proc.SkipStep;
  });
  if (0 == nodes.length) {
    return rootNode;
  }
  var indexRangeScanStep = this.findIndexRangeScanStep_(rootNode);
  if (goog.isNull(indexRangeScanStep)) {
    return rootNode;
  }
  nodes.forEach(function(node) {
    this.mergeToIndexRangeScanStep_(node, indexRangeScanStep);
  }, this);
  return indexRangeScanStep.getRoot();
};
lf.proc.LimitSkipByIndexPass.prototype.mergeToIndexRangeScanStep_ = function(node, indexRangeScanStep) {
  node instanceof lf.proc.LimitStep ? indexRangeScanStep.useLimit = !0 : indexRangeScanStep.useSkip = !0;
  return lf.tree.removeNode(node).parent;
};
lf.proc.LimitSkipByIndexPass.prototype.findIndexRangeScanStep_ = function(rootNode) {
  var filterFn = function(node) {
    return node instanceof lf.proc.IndexRangeScanStep;
  }, stopFn = function(node) {
    var hasAggregators = node instanceof lf.proc.ProjectStep && node.hasAggregators();
    return hasAggregators || node instanceof lf.proc.OrderByStep || 1 != node.getChildCount() || node instanceof lf.proc.SelectStep;
  }, indexRangeScanSteps = lf.tree.find(rootNode, filterFn, stopFn);
  return 0 < indexRangeScanSteps.length ? indexRangeScanSteps[0] : null;
};
lf.proc.OrderByIndexPass = function(global) {
  this.global_ = global;
};
goog.inherits(lf.proc.OrderByIndexPass, lf.proc.RewritePass);
lf.proc.OrderByIndexPass.prototype.rewrite = function(rootNode) {
  var orderByStep = lf.proc.OrderByIndexPass.findOrderByStep_(rootNode);
  if (goog.isNull(orderByStep)) {
    return rootNode;
  }
  var newSubtreeRoot = this.applyTableAccessFullOptimization_(orderByStep);
  newSubtreeRoot == orderByStep && (newSubtreeRoot = this.applyIndexRangeScanStepOptimization_(orderByStep));
  return newSubtreeRoot.getRoot();
};
lf.proc.OrderByIndexPass.prototype.applyTableAccessFullOptimization_ = function(orderByStep) {
  var rootNode = orderByStep, tableAccessFullStep = lf.proc.OrderByIndexPass.findTableAccessFullStep_(orderByStep.getChildAt(0));
  if (!goog.isNull(tableAccessFullStep)) {
    var indexRangeCandidate = lf.proc.OrderByIndexPass.findIndexCandidateForOrderBy_(tableAccessFullStep.table, orderByStep.orderBy);
    if (goog.isNull(indexRangeCandidate)) {
      return rootNode;
    }
    var indexRangeScanStep = new lf.proc.IndexRangeScanStep(this.global_, indexRangeCandidate.indexSchema, new lf.proc.NotBoundKeyRangeCalculator(indexRangeCandidate.indexSchema), indexRangeCandidate.isReverse), tableAccessByRowIdStep = new lf.proc.TableAccessByRowIdStep(this.global_, tableAccessFullStep.table);
    tableAccessByRowIdStep.addChild(indexRangeScanStep);
    lf.tree.removeNode(orderByStep);
    rootNode = lf.tree.replaceNodeWithChain(tableAccessFullStep, tableAccessByRowIdStep, indexRangeScanStep);
  }
  return rootNode;
};
lf.proc.OrderByIndexPass.prototype.applyIndexRangeScanStepOptimization_ = function(orderByStep) {
  var rootNode = orderByStep, indexRangeScanStep = lf.proc.OrderByIndexPass.findIndexRangeScanStep_(orderByStep.getChildAt(0));
  if (!goog.isNull(indexRangeScanStep)) {
    var indexRangeCandidate = lf.proc.OrderByIndexPass.getIndexCandidateForIndexSchema_(indexRangeScanStep.index, orderByStep.orderBy);
    if (goog.isNull(indexRangeCandidate)) {
      return rootNode;
    }
    indexRangeScanStep.reverseOrder = indexRangeCandidate.isReverse;
    rootNode = lf.tree.removeNode(orderByStep).parent;
  }
  return rootNode;
};
lf.proc.OrderByIndexPass.findIndexRangeScanStep_ = function(rootNode) {
  var filterFn = function(node) {
    return node instanceof lf.proc.IndexRangeScanStep;
  }, stopFn = function(node) {
    return 1 != node.getChildCount();
  }, indexRangeScanSteps = lf.tree.find(rootNode, filterFn, stopFn);
  return 0 < indexRangeScanSteps.length ? indexRangeScanSteps[0] : null;
};
lf.proc.OrderByIndexPass.findTableAccessFullStep_ = function(rootNode) {
  var filterFn = function(node) {
    return node instanceof lf.proc.TableAccessFullStep;
  }, stopFn = function(node) {
    return 1 != node.getChildCount();
  }, tableAccessFullSteps = lf.tree.find(rootNode, filterFn, stopFn);
  return 0 < tableAccessFullSteps.length ? tableAccessFullSteps[0] : null;
};
lf.proc.OrderByIndexPass.findOrderByStep_ = function(rootNode) {
  var filterFn = function(node) {
    return node instanceof lf.proc.OrderByStep;
  }, orderBySteps = lf.tree.find(rootNode, filterFn);
  return 0 < orderBySteps.length ? orderBySteps[0] : null;
};
lf.proc.OrderByIndexPass.findIndexCandidateForOrderBy_ = function(tableSchema, orderBy) {
  for (var indexCandidate = null, indexSchemas = tableSchema.getIndices(), i = 0;i < indexSchemas.length && goog.isNull(indexCandidate);i++) {
    indexCandidate = lf.proc.OrderByIndexPass.getIndexCandidateForIndexSchema_(indexSchemas[i], orderBy);
  }
  return indexCandidate;
};
lf.proc.OrderByIndexPass.getIndexCandidateForIndexSchema_ = function(indexSchema, orderBy) {
  var columnsMatch = indexSchema.columns.length == orderBy.length && orderBy.every(function(singleOrderBy, j) {
    var indexedColumn = indexSchema.columns[j];
    return singleOrderBy.column.getName() == indexedColumn.schema.getName();
  });
  if (!columnsMatch) {
    return null;
  }
  var isNaturalOrReverse = lf.proc.OrderByIndexPass.checkOrder_(orderBy, indexSchema);
  return isNaturalOrReverse[0] || isNaturalOrReverse[1] ? {indexSchema:indexSchema, isReverse:isNaturalOrReverse[1]} : null;
};
lf.proc.OrderByIndexPass.checkOrder_ = function(orderBy, indexSchema) {
  var ordersLeftBitmask = orderBy.reduce(function(soFar, columnOrderBy) {
    return soFar << 1 | (columnOrderBy.order == lf.Order.DESC ? 0 : 1);
  }, 0), ordersRightBitmask = indexSchema.columns.reduce(function(soFar, indexedColumn) {
    return soFar << 1 | (indexedColumn.order == lf.Order.DESC ? 0 : 1);
  }, 0), xorBitmask = ordersLeftBitmask ^ ordersRightBitmask, isNatural = 0 == xorBitmask, isReverse = xorBitmask == Math.pow(2, Math.max(orderBy.length, indexSchema.columns.length)) - 1;
  return [isNatural, isReverse];
};
lf.proc.PhysicalPlanRewriter = function(rootNode, queryContext, rewritePasses) {
  this.rootNode_ = rootNode;
  this.queryContext_ = queryContext;
  this.rewritePasses_ = rewritePasses;
};
lf.proc.PhysicalPlanRewriter.prototype.generate = function() {
  this.rewritePasses_.forEach(function(rewritePass) {
    this.rootNode_ = rewritePass.rewrite(this.rootNode_, this.queryContext_);
  }, this);
  return this.rootNode_;
};
lf.proc.UpdateStep = function(table, updates) {
  lf.proc.PhysicalQueryPlanNode.call(this, 1, lf.proc.PhysicalQueryPlanNode.ExecType.FIRST_CHILD);
  this.table_ = table;
  this.updates_ = updates;
};
goog.inherits(lf.proc.UpdateStep, lf.proc.PhysicalQueryPlanNode);
lf.proc.UpdateStep.prototype.toString = function() {
  return "update(" + this.table_.getName() + ")";
};
lf.proc.UpdateStep.prototype.execInternal = function(journal, relations) {
  var rows = relations[0].entries.map(function(entry) {
    var clone = this.table_.deserializeRow(entry.row.serialize());
    this.updates_.forEach(function(update) {
      clone.payload()[update.column.getName()] = update.value;
    }, this);
    return clone;
  }, this);
  journal.update(this.table_, rows);
  return [lf.proc.Relation.createEmpty()];
};
lf.proc.PhysicalPlanFactory = function(global) {
  this.global_ = global;
  this.selectOptimizationPasses_ = [new lf.proc.IndexRangeScanPass(this.global_), new lf.proc.OrderByIndexPass(this.global_), new lf.proc.LimitSkipByIndexPass, new lf.proc.GetRowCountPass(this.global_)];
  this.deleteOptimizationPasses_ = [new lf.proc.IndexRangeScanPass(this.global_)];
};
lf.proc.PhysicalPlanFactory.prototype.create = function(logicalQueryPlan, queryContext) {
  var logicalQueryPlanRoot = logicalQueryPlan.getRoot();
  if (logicalQueryPlanRoot instanceof lf.proc.InsertOrReplaceNode || logicalQueryPlanRoot instanceof lf.proc.InsertNode) {
    return this.createPlan_(logicalQueryPlan, queryContext);
  }
  if (logicalQueryPlanRoot instanceof lf.proc.ProjectNode || logicalQueryPlanRoot instanceof lf.proc.LimitNode || logicalQueryPlanRoot instanceof lf.proc.SkipNode) {
    return this.createPlan_(logicalQueryPlan, queryContext, this.selectOptimizationPasses_);
  }
  if (logicalQueryPlanRoot instanceof lf.proc.DeleteNode || logicalQueryPlanRoot instanceof lf.proc.UpdateNode) {
    return this.createPlan_(logicalQueryPlan, queryContext, this.deleteOptimizationPasses_);
  }
  throw new lf.Exception(8);
};
lf.proc.PhysicalPlanFactory.prototype.createPlan_ = function(logicalPlan, queryContext, opt_rewritePasses) {
  var rootStep = lf.tree.map(logicalPlan.getRoot(), goog.bind(this.mapFn_, this));
  if (goog.isDefAndNotNull(opt_rewritePasses)) {
    var planRewriter = new lf.proc.PhysicalPlanRewriter(rootStep, queryContext, opt_rewritePasses), rootStep = planRewriter.generate()
  }
  return new lf.proc.PhysicalQueryPlan(rootStep, logicalPlan.getScope());
};
lf.proc.PhysicalPlanFactory.prototype.mapFn_ = function(node) {
  if (node instanceof lf.proc.ProjectNode) {
    return new lf.proc.ProjectStep(node.columns, node.groupByColumns);
  }
  if (node instanceof lf.proc.GroupByNode) {
    return new lf.proc.GroupByStep(node.columns);
  }
  if (node instanceof lf.proc.AggregationNode) {
    return new lf.proc.AggregationStep(node.columns);
  }
  if (node instanceof lf.proc.OrderByNode) {
    return new lf.proc.OrderByStep(node.orderBy);
  }
  if (node instanceof lf.proc.SkipNode) {
    return new lf.proc.SkipStep;
  }
  if (node instanceof lf.proc.LimitNode) {
    return new lf.proc.LimitStep;
  }
  if (node instanceof lf.proc.SelectNode) {
    return new lf.proc.SelectStep(node.predicate.getId());
  }
  if (node instanceof lf.proc.CrossProductNode) {
    return new lf.proc.CrossProductStep;
  }
  if (node instanceof lf.proc.JoinNode) {
    return new lf.proc.JoinStep(node.predicate, node.isOuterJoin);
  }
  if (node instanceof lf.proc.TableAccessNode) {
    return new lf.proc.TableAccessFullStep(this.global_, node.table);
  }
  if (node instanceof lf.proc.DeleteNode) {
    return new lf.proc.DeleteStep(node.table);
  }
  if (node instanceof lf.proc.UpdateNode) {
    return new lf.proc.UpdateStep(node.table, node.updates);
  }
  if (node instanceof lf.proc.InsertOrReplaceNode) {
    return new lf.proc.InsertOrReplaceStep(this.global_, node.table);
  }
  if (node instanceof lf.proc.InsertNode) {
    return new lf.proc.InsertStep(this.global_, node.table);
  }
  throw new lf.Exception(514);
};
lf.proc.QueryEngine = function() {
};
lf.proc.DefaultQueryEngine = function(global) {
  this.logicalPlanFactory_ = new lf.proc.LogicalPlanFactory;
  this.physicalPlanFactory_ = new lf.proc.PhysicalPlanFactory(global);
};
lf.proc.DefaultQueryEngine.prototype.getPlan = function(query) {
  var logicalQueryPlan = this.logicalPlanFactory_.create(query);
  return this.physicalPlanFactory_.create(logicalQueryPlan, query);
};
lf.proc.LockManager = function() {
  this.lockTable_ = lf.structs.map.create();
};
lf.proc.LockType = {EXCLUSIVE:0, RESERVED_READ_ONLY:1, RESERVED_READ_WRITE:2, SHARED:3};
lf.proc.LockManager.prototype.getEntry_ = function(dataItem) {
  var lockTableEntry = this.lockTable_.get(dataItem.getName()) || null;
  goog.isNull(lockTableEntry) && (lockTableEntry = new lf.proc.LockTableEntry_, this.lockTable_.set(dataItem.getName(), lockTableEntry));
  return lockTableEntry;
};
lf.proc.LockManager.prototype.grantLock_ = function(taskId, dataItems, lockType) {
  dataItems.forEach(function(dataItem) {
    var lockTableEntry = this.getEntry_(dataItem);
    lockTableEntry.grantLock(taskId, lockType);
  }, this);
};
lf.proc.LockManager.prototype.canAcquireLock_ = function(taskId, dataItems, lockType) {
  var canAcquireLock = !0;
  dataItems.forEach(function(dataItem) {
    if (canAcquireLock) {
      var lockTableEntry = this.getEntry_(dataItem);
      canAcquireLock = lockTableEntry.canAcquireLock(taskId, lockType);
    }
  }, this);
  return canAcquireLock;
};
lf.proc.LockManager.prototype.requestLock = function(taskId, dataItems, lockType) {
  var canAcquireLock = this.canAcquireLock_(taskId, dataItems, lockType);
  canAcquireLock && this.grantLock_(taskId, dataItems, lockType);
  return canAcquireLock;
};
lf.proc.LockManager.prototype.releaseLock = function(taskId, dataItems) {
  dataItems.forEach(function(dataItem) {
    var lockTableEntry = this.getEntry_(dataItem);
    lockTableEntry.releaseLock(taskId);
  }, this);
};
lf.proc.LockManager.prototype.clearReservedLocks = function(dataItems) {
  dataItems.forEach(function(dataItem) {
    var lockTableEntry = this.getEntry_(dataItem);
    lockTableEntry.reservedReadWriteLock = null;
  }, this);
};
lf.proc.LockTableEntry_ = function() {
  this.sharedLocks = this.reservedReadOnlyLocks = this.reservedReadWriteLock = this.exclusiveLock = null;
};
lf.proc.LockTableEntry_.prototype.releaseLock = function(taskId) {
  this.exclusiveLock == taskId && (this.exclusiveLock = null);
  this.reservedReadWriteLock == taskId && (this.reservedReadWriteLock = null);
  goog.isNull(this.reservedReadOnlyLocks) || this.reservedReadOnlyLocks.delete(taskId);
  goog.isNull(this.sharedLocks) || this.sharedLocks.delete(taskId);
};
lf.proc.LockTableEntry_.prototype.canAcquireLock = function(taskId, lockType) {
  var noReservedReadOnlyLocksExist = goog.isNull(this.reservedReadOnlyLocks) || 0 == this.reservedReadOnlyLocks.size;
  if (lockType == lf.proc.LockType.EXCLUSIVE) {
    var noSharedLocksExist = goog.isNull(this.sharedLocks) || 0 == this.sharedLocks.size;
    return noSharedLocksExist && noReservedReadOnlyLocksExist && goog.isNull(this.exclusiveLock) && !goog.isNull(this.reservedReadWriteLock) && this.reservedReadWriteLock == taskId;
  }
  return lockType == lf.proc.LockType.SHARED ? goog.isNull(this.exclusiveLock) && goog.isNull(this.reservedReadWriteLock) && !goog.isNull(this.reservedReadOnlyLocks) && this.reservedReadOnlyLocks.has(taskId) : lockType == lf.proc.LockType.RESERVED_READ_ONLY ? goog.isNull(this.reservedReadWriteLock) : noReservedReadOnlyLocksExist && (goog.isNull(this.reservedReadWriteLock) || this.reservedReadWriteLock == taskId);
};
lf.proc.LockTableEntry_.prototype.grantLock = function(taskId, lockType) {
  lockType == lf.proc.LockType.EXCLUSIVE ? (this.reservedReadWriteLock = null, this.exclusiveLock = taskId) : lockType == lf.proc.LockType.SHARED ? (goog.isNull(this.sharedLocks) && (this.sharedLocks = lf.structs.set.create()), this.sharedLocks.add(taskId), goog.isNull(this.reservedReadOnlyLocks) && (this.reservedReadOnlyLocks = lf.structs.set.create()), this.reservedReadOnlyLocks.delete(taskId)) : lockType == lf.proc.LockType.RESERVED_READ_ONLY ? (goog.isNull(this.reservedReadOnlyLocks) && (this.reservedReadOnlyLocks = 
  lf.structs.set.create()), this.reservedReadOnlyLocks.add(taskId)) : lockType == lf.proc.LockType.RESERVED_READ_WRITE && (this.reservedReadWriteLock = taskId);
};
lf.proc.Runner = function() {
  this.queue_ = new lf.proc.Runner.TaskQueue_;
  this.lockManager_ = new lf.proc.LockManager;
};
lf.proc.Runner.prototype.scheduleTask = function(task) {
  (task.getPriority() < lf.proc.TaskPriority.USER_QUERY_TASK || task.getPriority() < lf.proc.TaskPriority.TRANSACTION_TASK) && this.lockManager_.clearReservedLocks(task.getScope());
  this.queue_.insert(task);
  this.consumePending_();
  return task.getResolver().promise;
};
lf.proc.Runner.prototype.consumePending_ = function() {
  for (var queue = this.queue_.getValues(), i = 0;i < queue.length;i++) {
    var task = queue[i], acquiredLock = !1;
    if (acquiredLock = task.getType() == lf.TransactionType.READ_ONLY ? this.requestTwoPhaseLock_(task, lf.proc.LockType.RESERVED_READ_ONLY, lf.proc.LockType.SHARED) : this.requestTwoPhaseLock_(task, lf.proc.LockType.RESERVED_READ_WRITE, lf.proc.LockType.EXCLUSIVE)) {
      this.queue_.remove(task), this.execTask_(task);
    }
  }
};
lf.proc.Runner.prototype.requestTwoPhaseLock_ = function(task, lockType1, lockType2) {
  var acquiredLock = !1, acquiredFirstLock = this.lockManager_.requestLock(task.getId(), task.getScope(), lockType1);
  acquiredFirstLock && (acquiredLock = this.lockManager_.requestLock(task.getId(), task.getScope(), lockType2));
  return acquiredLock;
};
lf.proc.Runner.prototype.execTask_ = function(task) {
  task.exec().then(goog.bind(this.onTaskSuccess_, this, task), goog.bind(this.onTaskError_, this, task));
};
lf.proc.Runner.prototype.onTaskSuccess_ = function(task, results) {
  this.lockManager_.releaseLock(task.getId(), task.getScope());
  task.getResolver().resolve(results);
  this.consumePending_();
};
lf.proc.Runner.prototype.onTaskError_ = function(task, error) {
  this.lockManager_.releaseLock(task.getId(), task.getScope());
  task.getResolver().reject(error);
  this.consumePending_();
};
lf.proc.Runner.TaskQueue_ = function() {
  this.queue_ = [];
};
lf.proc.Runner.TaskQueue_.prototype.insert = function(task) {
  goog.array.binaryInsert(this.queue_, task, function(t1, t2) {
    var priorityDiff = t1.getPriority() - t2.getPriority();
    return 0 == priorityDiff ? t1.getId() - t2.getId() : priorityDiff;
  });
};
lf.proc.Runner.TaskQueue_.prototype.getValues = function() {
  return this.queue_.slice();
};
lf.proc.Runner.TaskQueue_.prototype.remove = function(task) {
  return goog.array.remove(this.queue_, task);
};
lf.Flags = {};
lf.Flags.MEMORY_ONLY = !1;
lf.DiffCalculator = function(query, observableResults) {
  this.evalRegistry_ = lf.eval.Registry.getInstance();
  this.query_ = query;
  this.observableResults_ = observableResults;
  this.columns_ = this.detectColumns_();
};
lf.DiffCalculator.prototype.detectColumns_ = function() {
  if (0 < this.query_.columns.length) {
    return this.query_.columns;
  }
  var columns = [];
  this.query_.from.forEach(function(table) {
    table.getColumns().forEach(function(column) {
      columns.push(column);
    });
  });
  return columns;
};
lf.DiffCalculator.prototype.comparator_ = function(left, right) {
  return this.columns_.every(function(column) {
    var evalFn = this.evalRegistry_.getEvaluator(column.getType(), lf.eval.Type.EQ);
    return evalFn(left.getField(column), right.getField(column));
  }, this);
};
lf.DiffCalculator.prototype.applyDiff = function(oldResults, newResults) {
  for (var oldEntries = goog.isNull(oldResults) ? [] : oldResults.entries, longestCommonSubsequenceLeft = goog.math.longestCommonSubsequence(oldEntries, newResults.entries, goog.bind(this.comparator_, this), function(indexLeft) {
    return oldEntries[indexLeft];
  }), changeRecords = [], commonIndex = 0, i = 0;i < oldEntries.length;i++) {
    var entry = oldEntries[i];
    if (longestCommonSubsequenceLeft[commonIndex] == entry) {
      commonIndex++;
    } else {
      var removed = this.observableResults_.splice(commonIndex, 1), changeRecord = lf.DiffCalculator.createChangeRecord_(i, removed, 0, this.observableResults_);
      changeRecords.push(changeRecord);
    }
  }
  for (var longestCommonSubsequenceRight = goog.math.longestCommonSubsequence(oldEntries, newResults.entries, goog.bind(this.comparator_, this), function(indexLeft, indexRight) {
    return newResults.entries[indexRight];
  }), i = commonIndex = 0;i < newResults.entries.length;i++) {
    entry = newResults.entries[i], longestCommonSubsequenceRight[commonIndex] == entry ? commonIndex++ : (this.observableResults_.splice(i, 0, entry.row.payload()), changeRecord = lf.DiffCalculator.createChangeRecord_(i, [], 1, this.observableResults_), changeRecords.push(changeRecord));
  }
  return changeRecords;
};
lf.DiffCalculator.createChangeRecord_ = function(index, removed, addedCount, object) {
  return {addedCount:addedCount, index:index, object:object, removed:removed, type:"splice"};
};
lf.ObserverRegistry = function() {
  this.entries_ = lf.structs.map.create();
};
lf.ObserverRegistry.prototype.getQueryId_ = function(query) {
  return goog.getUid(query).toString();
};
lf.ObserverRegistry.prototype.addObserver = function(rawBuilder, callback) {
  var builder = rawBuilder, queryId = this.getQueryId_(builder.getObservableQuery()), entry = this.entries_.get(queryId) || null;
  goog.isNull(entry) && (entry = new lf.ObserverRegistry.Entry_(builder), this.entries_.set(queryId, entry));
  entry.addObserver(callback);
};
lf.ObserverRegistry.prototype.removeObserver = function(builder, callback) {
  var query = builder.getObservableQuery(), queryId = this.getQueryId_(query), entry = this.entries_.get(queryId) || null;
  goog.asserts.assert(goog.isDefAndNotNull(entry), "Attempted to unobserve a query that was not observed.");
  var didRemove = entry.removeObserver(callback);
  goog.asserts.assert(didRemove, "removeObserver: Inconsistent state detected.");
  entry.hasObservers() || this.entries_.delete(queryId);
};
lf.ObserverRegistry.prototype.getTaskItemsForTables = function(tables) {
  var tableSet = lf.structs.set.create();
  tables.forEach(function(table) {
    tableSet.add(table.getName());
  });
  var items = [];
  this.entries_.forEach(function(entry) {
    var item = entry.getTaskItem(), refersToTables = item.context.from.some(function(table) {
      return tableSet.has(table.getName());
    });
    refersToTables && items.push(item);
  });
  return items;
};
lf.ObserverRegistry.prototype.updateResultsForQuery = function(query, results) {
  var queryId = this.getQueryId_(goog.isDefAndNotNull(query.clonedFrom) ? query.clonedFrom : query), entry = this.entries_.get(queryId) || null;
  return goog.isNull(entry) ? !1 : (entry.updateResults(results), !0);
};
lf.ObserverRegistry.Entry_ = function(builder) {
  this.builder_ = builder;
  this.observers_ = lf.structs.set.create();
  this.observable_ = [];
  this.lastResults_ = null;
  this.diffCalculator_ = new lf.DiffCalculator(builder.getObservableQuery(), this.observable_);
};
lf.ObserverRegistry.Entry_.prototype.addObserver = function(callback) {
  this.observers_.has(callback) ? goog.asserts.fail("Attempted to register observer twice.") : this.observers_.add(callback);
};
lf.ObserverRegistry.Entry_.prototype.removeObserver = function(callback) {
  return this.observers_.delete(callback);
};
lf.ObserverRegistry.Entry_.prototype.getTaskItem = function() {
  return this.builder_.getObservableTaskItem();
};
lf.ObserverRegistry.Entry_.prototype.hasObservers = function() {
  return 0 < this.observers_.size;
};
lf.ObserverRegistry.Entry_.prototype.updateResults = function(newResults) {
  var changeRecords = this.diffCalculator_.applyDiff(this.lastResults_, newResults);
  this.lastResults_ = newResults;
  0 < changeRecords.length && this.observers_.forEach(function(observerFn) {
    observerFn(changeRecords);
  });
};
lf.base = {};
lf.base.init = function(global, opt_options) {
  var schema = global.getService(lf.service.SCHEMA), options = opt_options || {}, cache = new lf.cache.DefaultCache;
  global.registerService(lf.service.CACHE, cache);
  var backStore = null, observeExternalChanges = !1;
  if (lf.Flags.MEMORY_ONLY) {
    backStore = new lf.backstore.Memory(schema);
  } else {
    var dataStoreType = options.storeType || lf.schema.DataStoreType.INDEXED_DB;
    switch(dataStoreType) {
      case lf.schema.DataStoreType.MEMORY:
        backStore = new lf.backstore.Memory(schema);
        break;
      case lf.schema.DataStoreType.OBSERVABLE_STORE:
        backStore = new lf.backstore.ObservableStore(schema);
        break;
      case lf.schema.DataStoreType.WEB_SQL:
        backStore = new lf.backstore.WebSql(global, schema, options.webSqlDbSize);
        break;
      case lf.schema.DataStoreType.FIREBASE:
        backStore = new lf.backstore.Firebase(schema, options.firebase);
        observeExternalChanges = !0;
        break;
      default:
        backStore = new lf.backstore.IndexedDB(global, schema);
    }
  }
  global.registerService(lf.service.BACK_STORE, backStore);
  var indexStore = new lf.index.MemoryIndexStore;
  global.registerService(lf.service.INDEX_STORE, indexStore);
  return backStore.init(options.onUpgrade).then(function() {
    var queryEngine = new lf.proc.DefaultQueryEngine(global);
    global.registerService(lf.service.QUERY_ENGINE, queryEngine);
    var runner = new lf.proc.Runner;
    global.registerService(lf.service.RUNNER, runner);
    var observerRegistry = new lf.ObserverRegistry;
    global.registerService(lf.service.OBSERVER_REGISTRY, observerRegistry);
    return indexStore.init(schema);
  }).then(function() {
    if (observeExternalChanges) {
      var externalChangeObserver = new lf.backstore.ExternalChangeObserver(global);
      externalChangeObserver.startObserving();
    }
    var prefetcher = new lf.cache.Prefetcher(global);
    return prefetcher.init(schema);
  });
};
lf.base.closeDatabase = function(global) {
  try {
    var backstore = global.getService(lf.service.BACK_STORE);
    backstore.close();
  } catch (e) {
  }
};
lf.Database = function() {
};
lf.proc.TransactionTask = function(global, scope) {
  this.global_ = global;
  this.backStore_ = global.getService(lf.service.BACK_STORE);
  this.runner_ = global.getService(lf.service.RUNNER);
  this.observerRegistry_ = global.getService(lf.service.OBSERVER_REGISTRY);
  this.scope_ = lf.structs.set.create(scope);
  this.journal_ = new lf.cache.Journal(this.global_, this.scope_);
  this.resolver_ = goog.Promise.withResolver();
  this.execResolver_ = goog.Promise.withResolver();
  this.acquireScopeResolver_ = goog.Promise.withResolver();
};
lf.proc.TransactionTask.prototype.exec = function() {
  this.acquireScopeResolver_.resolve();
  return this.execResolver_.promise;
};
lf.proc.TransactionTask.prototype.getType = function() {
  return lf.TransactionType.READ_WRITE;
};
lf.proc.TransactionTask.prototype.getScope = function() {
  return this.scope_;
};
lf.proc.TransactionTask.prototype.getResolver = function() {
  return this.resolver_;
};
lf.proc.TransactionTask.prototype.getId = function() {
  return goog.getUid(this);
};
lf.proc.TransactionTask.prototype.getPriority = function() {
  return lf.proc.TaskPriority.TRANSACTION_TASK;
};
lf.proc.TransactionTask.prototype.acquireScope = function() {
  this.runner_.scheduleTask(this);
  return this.acquireScopeResolver_.promise;
};
lf.proc.TransactionTask.prototype.attachQuery = function(queryBuilder) {
  var taskItem = queryBuilder.getTaskItem();
  return taskItem.plan.getRoot().exec(this.journal_, taskItem.context).then(function(relations) {
    return relations[0].getPayloads();
  }, goog.bind(function(e) {
    this.journal_.rollback();
    var error = new goog.Promise.CancellationError(e.name);
    this.execResolver_.reject(error);
    throw e;
  }, this));
};
lf.proc.TransactionTask.prototype.commit = function() {
  var tx = this.backStore_.createTx(this.getType(), this.journal_);
  tx.commit().then(goog.bind(function() {
    this.scheduleObserverTask_();
    this.execResolver_.resolve();
  }, this), goog.bind(function(e) {
    this.journal_.rollback();
    this.execResolver_.reject(e);
  }, this));
  return this.resolver_.promise;
};
lf.proc.TransactionTask.prototype.rollback = function() {
  this.journal_.rollback();
  this.execResolver_.resolve();
  return this.resolver_.promise;
};
lf.proc.TransactionTask.prototype.scheduleObserverTask_ = function() {
  var items = this.observerRegistry_.getTaskItemsForTables(this.scope_);
  if (0 != items.length) {
    var observerTask = new lf.proc.ObserverQueryTask(this.global_, items);
    this.runner_.scheduleTask(observerTask);
  }
};
lf.proc.Transaction = function(global) {
  this.global_ = global;
  this.runner_ = global.getService(lf.service.RUNNER);
  this.transactionTask_ = null;
  this.state_ = lf.proc.TransactionState_.CREATED;
  0 == lf.proc.StateTransitions_.size && this.initStateTransitions_();
};
goog.exportSymbol("lf.proc.Transaction", lf.proc.Transaction);
lf.proc.TransactionState_ = {CREATED:0, ACQUIRING_SCOPE:1, ACQUIRED_SCOPE:2, EXECUTING_QUERY:3, EXECUTING_AND_COMMITTING:4, COMMITTING:5, ROLLING_BACK:6, FINALIZED:7};
lf.proc.StateTransitions_ = lf.structs.map.create();
lf.proc.Transaction.prototype.initStateTransitions_ = function() {
  lf.proc.StateTransitions_.set(lf.proc.TransactionState_.CREATED, lf.structs.set.create([lf.proc.TransactionState_.ACQUIRING_SCOPE, lf.proc.TransactionState_.EXECUTING_AND_COMMITTING]));
  lf.proc.StateTransitions_.set(lf.proc.TransactionState_.ACQUIRING_SCOPE, lf.structs.set.create([lf.proc.TransactionState_.ACQUIRED_SCOPE]));
  lf.proc.StateTransitions_.set(lf.proc.TransactionState_.ACQUIRED_SCOPE, lf.structs.set.create([lf.proc.TransactionState_.EXECUTING_QUERY, lf.proc.TransactionState_.COMMITTING, lf.proc.TransactionState_.ROLLING_BACK]));
  lf.proc.StateTransitions_.set(lf.proc.TransactionState_.EXECUTING_QUERY, lf.structs.set.create([lf.proc.TransactionState_.ACQUIRED_SCOPE, lf.proc.TransactionState_.FINALIZED]));
  lf.proc.StateTransitions_.set(lf.proc.TransactionState_.EXECUTING_AND_COMMITTING, lf.structs.set.create([lf.proc.TransactionState_.FINALIZED]));
  lf.proc.StateTransitions_.set(lf.proc.TransactionState_.COMMITTING, lf.structs.set.create([lf.proc.TransactionState_.FINALIZED]));
  lf.proc.StateTransitions_.set(lf.proc.TransactionState_.ROLLING_BACK, lf.structs.set.create([lf.proc.TransactionState_.FINALIZED]));
};
lf.proc.Transaction.prototype.stateTransition_ = function(newState) {
  var nextStates = lf.proc.StateTransitions_.get(this.state_) || null;
  if (goog.isNull(nextStates) || !nextStates.has(newState)) {
    throw new lf.Exception(107, this.state_, newState);
  }
  this.state_ = newState;
};
lf.proc.Transaction.prototype.exec = function(queryBuilders) {
  this.stateTransition_(lf.proc.TransactionState_.EXECUTING_AND_COMMITTING);
  var taskItems = [];
  try {
    queryBuilders.forEach(function(queryBuilder) {
      queryBuilder.assertExecPreconditions();
      taskItems.push(queryBuilder.getTaskItem());
    }, this);
  } catch (e$$0) {
    return this.stateTransition_(lf.proc.TransactionState_.FINALIZED), goog.Promise.reject(e$$0);
  }
  var queryTask = new lf.proc.UserQueryTask(this.global_, taskItems);
  return this.runner_.scheduleTask(queryTask).then(goog.bind(function(results) {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
    return results.map(function(relation) {
      return relation.getPayloads();
    });
  }, this), goog.bind(function(e) {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
    throw e;
  }, this));
};
goog.exportProperty(lf.proc.Transaction.prototype, "exec", lf.proc.Transaction.prototype.exec);
lf.proc.Transaction.prototype.begin = function(scope) {
  this.stateTransition_(lf.proc.TransactionState_.ACQUIRING_SCOPE);
  this.transactionTask_ = new lf.proc.TransactionTask(this.global_, scope);
  return this.transactionTask_.acquireScope().then(goog.bind(function() {
    this.stateTransition_(lf.proc.TransactionState_.ACQUIRED_SCOPE);
  }, this));
};
goog.exportProperty(lf.proc.Transaction.prototype, "begin", lf.proc.Transaction.prototype.begin);
lf.proc.Transaction.prototype.attach = function(query) {
  this.stateTransition_(lf.proc.TransactionState_.EXECUTING_QUERY);
  return this.transactionTask_.attachQuery(query).then(goog.bind(function(result) {
    this.stateTransition_(lf.proc.TransactionState_.ACQUIRED_SCOPE);
    return result;
  }, this), goog.bind(function(e) {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
    throw e;
  }, this));
};
goog.exportProperty(lf.proc.Transaction.prototype, "attach", lf.proc.Transaction.prototype.attach);
lf.proc.Transaction.prototype.commit = function() {
  this.stateTransition_(lf.proc.TransactionState_.COMMITTING);
  return this.transactionTask_.commit().then(goog.bind(function() {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
  }, this));
};
goog.exportProperty(lf.proc.Transaction.prototype, "commit", lf.proc.Transaction.prototype.commit);
lf.proc.Transaction.prototype.rollback = function() {
  this.stateTransition_(lf.proc.TransactionState_.ROLLING_BACK);
  return this.transactionTask_.rollback().then(goog.bind(function() {
    this.stateTransition_(lf.proc.TransactionState_.FINALIZED);
  }, this));
};
goog.exportProperty(lf.proc.Transaction.prototype, "rollback", lf.proc.Transaction.prototype.rollback);
lf.proc.Database = function(global) {
  this.global_ = global;
  this.schema_ = global.getService(lf.service.SCHEMA);
  this.initialized_ = !1;
};
goog.exportSymbol("lf.proc.Database", lf.proc.Database);
lf.proc.Database.prototype.init = function(opt_options) {
  this.global_.registerService(lf.service.SCHEMA, this.schema_);
  return lf.base.init(this.global_, opt_options).then(goog.bind(function() {
    this.initialized_ = !0;
    return this;
  }, this));
};
goog.exportProperty(lf.proc.Database.prototype, "init", lf.proc.Database.prototype.init);
lf.proc.Database.prototype.getSchema = function() {
  return this.schema_;
};
goog.exportProperty(lf.proc.Database.prototype, "getSchema", lf.proc.Database.prototype.getSchema);
lf.proc.Database.prototype.checkInit_ = function() {
  if (!this.initialized_) {
    throw new lf.Exception(2);
  }
};
lf.proc.Database.prototype.select = function(var_args) {
  this.checkInit_();
  var columns = 1 != arguments.length || goog.isDefAndNotNull(arguments[0]) ? Array.prototype.slice.call(arguments) : [];
  return new lf.query.SelectBuilder(this.global_, columns);
};
goog.exportProperty(lf.proc.Database.prototype, "select", lf.proc.Database.prototype.select);
lf.proc.Database.prototype.insert = function() {
  this.checkInit_();
  return new lf.query.InsertBuilder(this.global_);
};
goog.exportProperty(lf.proc.Database.prototype, "insert", lf.proc.Database.prototype.insert);
lf.proc.Database.prototype.insertOrReplace = function() {
  this.checkInit_();
  return new lf.query.InsertBuilder(this.global_, !0);
};
goog.exportProperty(lf.proc.Database.prototype, "insertOrReplace", lf.proc.Database.prototype.insertOrReplace);
lf.proc.Database.prototype.update = function(table) {
  this.checkInit_();
  return new lf.query.UpdateBuilder(this.global_, table);
};
goog.exportProperty(lf.proc.Database.prototype, "update", lf.proc.Database.prototype.update);
lf.proc.Database.prototype.delete = function() {
  this.checkInit_();
  return new lf.query.DeleteBuilder(this.global_);
};
goog.exportProperty(lf.proc.Database.prototype, "delete", lf.proc.Database.prototype.delete);
lf.proc.Database.prototype.observe = function(query, callback) {
  var observerRegistry = this.global_.getService(lf.service.OBSERVER_REGISTRY);
  observerRegistry.addObserver(query, callback);
};
goog.exportProperty(lf.proc.Database.prototype, "observe", lf.proc.Database.prototype.observe);
lf.proc.Database.prototype.unobserve = function(query, callback) {
  var observerRegistry = this.global_.getService(lf.service.OBSERVER_REGISTRY);
  observerRegistry.removeObserver(query, callback);
};
goog.exportProperty(lf.proc.Database.prototype, "unobserve", lf.proc.Database.prototype.unobserve);
lf.proc.Database.prototype.createTransaction = function() {
  this.checkInit_();
  return new lf.proc.Transaction(this.global_);
};
goog.exportProperty(lf.proc.Database.prototype, "createTransaction", lf.proc.Database.prototype.createTransaction);
lf.proc.Database.prototype.close = function() {
  lf.base.closeDatabase(this.global_);
  this.global_.clear();
  this.initialized_ = !1;
};
goog.exportProperty(lf.proc.Database.prototype, "close", lf.proc.Database.prototype.close);
lf.schema.BaseColumn = function(table, name, isUnique, isNullable, type, opt_alias) {
  this.table_ = table;
  this.name_ = name;
  this.isUnique_ = isUnique;
  this.isNullable_ = isNullable;
  this.type_ = type;
  this.alias_ = opt_alias || null;
};
goog.exportSymbol("lf.schema.BaseColumn", lf.schema.BaseColumn);
lf.schema.BaseColumn.prototype.getName = function() {
  return this.name_;
};
lf.schema.BaseColumn.prototype.getNormalizedName = function() {
  return this.table_.getEffectiveName() + "." + this.name_;
};
lf.schema.BaseColumn.prototype.toString = function() {
  return this.getNormalizedName();
};
lf.schema.BaseColumn.prototype.getTable = function() {
  return this.table_;
};
lf.schema.BaseColumn.prototype.getType = function() {
  return this.type_;
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "getType", lf.schema.BaseColumn.prototype.getType);
lf.schema.BaseColumn.prototype.getAlias = function() {
  return this.alias_;
};
lf.schema.BaseColumn.prototype.getIndices = function() {
  goog.isDefAndNotNull(this.indices_) || (this.indices_ = [], this.getTable().getIndices().forEach(function(index) {
    var colNames = index.columns.map(function(col) {
      return col.schema.getName();
    });
    -1 != colNames.indexOf(this.name_) && this.indices_.push(index);
  }, this));
  return this.indices_;
};
lf.schema.BaseColumn.prototype.isNullable = function() {
  return this.isNullable_;
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "isNullable", lf.schema.BaseColumn.prototype.isNullable);
lf.schema.BaseColumn.prototype.isUnique = function() {
  return this.isUnique_;
};
lf.schema.BaseColumn.prototype.eq = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.EQ);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "eq", lf.schema.BaseColumn.prototype.eq);
lf.schema.BaseColumn.prototype.neq = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.NEQ);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "neq", lf.schema.BaseColumn.prototype.neq);
lf.schema.BaseColumn.prototype.lt = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.LT);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "lt", lf.schema.BaseColumn.prototype.lt);
lf.schema.BaseColumn.prototype.lte = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.LTE);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "lte", lf.schema.BaseColumn.prototype.lte);
lf.schema.BaseColumn.prototype.gt = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.GT);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "gt", lf.schema.BaseColumn.prototype.gt);
lf.schema.BaseColumn.prototype.gte = function(operand) {
  return lf.pred.createPredicate(this, operand, lf.eval.Type.GTE);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "gte", lf.schema.BaseColumn.prototype.gte);
lf.schema.BaseColumn.prototype.match = function(regex) {
  return lf.pred.createPredicate(this, regex, lf.eval.Type.MATCH);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "match", lf.schema.BaseColumn.prototype.match);
lf.schema.BaseColumn.prototype.between = function(from, to) {
  return lf.pred.createPredicate(this, [from, to], lf.eval.Type.BETWEEN);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "between", lf.schema.BaseColumn.prototype.between);
lf.schema.BaseColumn.prototype.in = function(values) {
  return lf.pred.createPredicate(this, values, lf.eval.Type.IN);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "in", lf.schema.BaseColumn.prototype.in);
lf.schema.BaseColumn.prototype.isNull = function() {
  return this.eq(null);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "isNull", lf.schema.BaseColumn.prototype.isNull);
lf.schema.BaseColumn.prototype.isNotNull = function() {
  return this.neq(null);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "isNotNull", lf.schema.BaseColumn.prototype.isNotNull);
lf.schema.BaseColumn.prototype.as = function(name) {
  return new lf.schema.BaseColumn(this.table_, this.name_, this.isUnique_, this.isNullable_, this.type_, name);
};
goog.exportProperty(lf.schema.BaseColumn.prototype, "as", lf.schema.BaseColumn.prototype.as);
lf.Global = function() {
  this.services_ = lf.structs.map.create();
};
lf.Global.get = function() {
  lf.Global.instance_ || (lf.Global.instance_ = new lf.Global);
  return lf.Global.instance_;
};
lf.Global.prototype.clear = function() {
  this.services_.clear();
};
goog.exportProperty(lf.Global.prototype, "clear", lf.Global.prototype.clear);
lf.Global.prototype.registerService = function(serviceId, service) {
  this.services_.set(serviceId.toString(), service);
  return service;
};
goog.exportProperty(lf.Global.prototype, "registerService", lf.Global.prototype.registerService);
lf.Global.prototype.getService = function(serviceId) {
  var service = this.services_.get(serviceId.toString()) || null;
  if (goog.isNull(service)) {
    throw new lf.Exception(7, serviceId.toString());
  }
  return service;
};
goog.exportProperty(lf.Global.prototype, "getService", lf.Global.prototype.getService);
lf.Global.prototype.isRegistered = function(serviceId) {
  return this.services_.has(serviceId.toString());
};
goog.exportProperty(lf.Global.prototype, "isRegistered", lf.Global.prototype.isRegistered);
lf.schema.Info = function(dbSchema) {
  this.schema_ = dbSchema;
  this.referringFk_ = lf.structs.map.create();
  this.parents_ = lf.structs.map.create();
  this.colParent_ = lf.structs.map.create();
  this.children_ = lf.structs.map.create();
  this.colChild_ = lf.structs.map.create();
  this.init_();
};
lf.schema.Info.prototype.init_ = function() {
  this.schema_.tables().forEach(function(table) {
    var parents = lf.structs.set.create();
    table.getConstraint().getForeignKeys().forEach(function(fkSpec) {
      var parentRefs = this.referringFk_.get(fkSpec.parentTable) || [];
      parentRefs.push(fkSpec);
      this.referringFk_.set(fkSpec.parentTable, parentRefs);
      parents.add(this.schema_.table(fkSpec.parentTable));
      var childOfParent = this.children_.get(fkSpec.parentTable);
      childOfParent || (childOfParent = lf.structs.set.create());
      childOfParent.add(table);
      this.children_.set(fkSpec.parentTable, childOfParent);
      this.colParent_.set(table.getName() + "." + fkSpec.childColumn, fkSpec.parentTable);
      var ref = fkSpec.parentTable + "." + fkSpec.parentColumn, referred = this.colChild_.get(ref) || [];
      referred.push(table.getName());
      this.colChild_.set(ref, referred);
    }, this);
    0 != parents.size && this.parents_.set(table.getName(), parents);
  }, this);
};
lf.schema.Info.prototype.getReferencingForeignKeys = function(tableName) {
  return this.referringFk_.get(tableName) || null;
};
lf.schema.Info.prototype.expandScope_ = function(tableName, map) {
  var set = map.get(tableName);
  return set ? lf.structs.set.values(set) : [];
};
lf.schema.Info.prototype.getParentTables = function(tableName) {
  return this.expandScope_(tableName, this.parents_);
};
lf.schema.Info.prototype.getParentTablesByColumns = function(colNames) {
  var tableNames = lf.structs.set.create();
  colNames.forEach(function(col) {
    var table = this.colParent_.get(col);
    table && tableNames.add(table);
  }, this);
  var tables = lf.structs.set.values(tableNames);
  return tables.map(function(tableName) {
    return this.schema_.table(tableName);
  }, this);
};
lf.schema.Info.prototype.getChildTables = function(tableName) {
  return this.expandScope_(tableName, this.children_);
};
lf.schema.Info.prototype.getChildTablesByColumns = function(colNames) {
  var tableNames = lf.structs.set.create();
  colNames.forEach(function(col) {
    var children = this.colChild_.get(col);
    children && children.forEach(function(child) {
      tableNames.add(child);
    });
  }, this);
  var tables = lf.structs.set.values(tableNames);
  return tables.map(function(tableName) {
    return this.schema_.table(tableName);
  }, this);
};
lf.schema.Constraint = function(primaryKey, notNullable, foreignKeys) {
  this.primaryKey_ = primaryKey;
  this.notNullable_ = notNullable;
  this.foreignKeys_ = foreignKeys;
};
goog.exportSymbol("lf.schema.Constraint", lf.schema.Constraint);
lf.schema.Constraint.prototype.getPrimaryKey = function() {
  return this.primaryKey_;
};
goog.exportProperty(lf.schema.Constraint.prototype, "getPrimaryKey", lf.schema.Constraint.prototype.getPrimaryKey);
lf.schema.Constraint.prototype.getNotNullable = function() {
  return this.notNullable_;
};
lf.schema.Constraint.prototype.getForeignKeys = function() {
  return this.foreignKeys_;
};
goog.exportProperty(lf.schema.Constraint.prototype, "getForeignKeys", lf.schema.Constraint.prototype.getForeignKeys);
lf.schema.ForeignKeySpec = function(rawSpec, name) {
  var array = rawSpec.ref.split(".");
  if (2 != array.length) {
    throw new lf.Exception(540, name);
  }
  this.childColumn = rawSpec.local;
  this.parentTable = array[0];
  this.parentColumn = array[1];
  this.name = name;
  this.action = rawSpec.action;
  this.timing = rawSpec.timing;
};
lf.schema.TableBuilder = function(tableName) {
  this.checkNamingRules_(tableName);
  this.name_ = tableName;
  this.columns_ = lf.structs.map.create();
  this.uniqueColumns_ = lf.structs.set.create();
  this.uniqueIndices_ = lf.structs.set.create();
  this.nullable_ = lf.structs.set.create();
  this.pkName_ = null;
  this.indices_ = lf.structs.map.create();
  this.persistentIndex_ = !1;
  this.fkSpecs_ = [];
};
goog.exportSymbol("lf.schema.TableBuilder", lf.schema.TableBuilder);
lf.schema.TableBuilder.IndexedColumn_ = function(raw) {
  this.name = raw.name;
  this.order = raw.order;
  this.autoIncrement = raw.autoIncrement;
};
lf.schema.TableBuilder.NULLABLE_TYPES_BY_DEFAULT = lf.structs.set.create([lf.Type.ARRAY_BUFFER, lf.Type.OBJECT]);
lf.schema.TableBuilder.toPascal_ = function(name) {
  return name[0].toUpperCase() + name.substring(1);
};
lf.schema.TableBuilder.prototype.checkNamingRules_ = function(name) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
    throw new lf.Exception(502, name);
  }
};
lf.schema.TableBuilder.prototype.checkNameConflicts_ = function(name) {
  if (name == this.name_) {
    throw new lf.Exception(546, name);
  }
  if (this.columns_.has(name) || this.indices_.has(name) || this.uniqueIndices_.has(name)) {
    throw new lf.Exception(503, this.name_ + "." + name);
  }
};
lf.schema.TableBuilder.prototype.checkPrimaryKey_ = function(columns) {
  var hasAutoIncrement = !1;
  columns.forEach(function(column) {
    var columnType = this.columns_.get(column.name);
    hasAutoIncrement = hasAutoIncrement || column.autoIncrement;
    if (column.autoIncrement && columnType != lf.Type.INTEGER) {
      throw new lf.Exception(504);
    }
  }, this);
  if (hasAutoIncrement && 1 < columns.length) {
    throw new lf.Exception(505);
  }
};
lf.schema.TableBuilder.prototype.checkPrimaryKeyNotForeignKey_ = function() {
  if (!goog.isNull(this.pkName_)) {
    var pkColumns = this.indices_.get(this.pkName_).map(function(indexedColumn) {
      return indexedColumn.name;
    }), fkSpecIndex = 0, conflict = this.fkSpecs_.some(function(fkSpec, i) {
      fkSpecIndex = i;
      return -1 != pkColumns.indexOf(fkSpec.childColumn);
    }, this);
    if (conflict) {
      throw new lf.Exception(543, this.fkSpecs_[fkSpecIndex].name);
    }
  }
};
lf.schema.TableBuilder.prototype.checkPrimaryKeyDuplicateIndex_ = function() {
  if (!goog.isNull(this.pkName_)) {
    var extractName = function(indexedColumn) {
      return indexedColumn.name;
    }, pkColumnsJson = JSON.stringify(this.indices_.get(this.pkName_).map(extractName));
    this.indices_.forEach(function(indexedColumns, indexName) {
      if (indexName != this.pkName_) {
        var indexedColumnNames = indexedColumns.map(extractName);
        if (JSON.stringify(indexedColumnNames) == pkColumnsJson) {
          throw new lf.Exception(544, this.name_ + "." + indexName);
        }
      }
    }, this);
  }
};
lf.schema.TableBuilder.prototype.checkPrimaryKeyNotNullable_ = function() {
  goog.isNull(this.pkName_) || this.indices_.get(this.pkName_).forEach(function(indexedColumn) {
    if (this.nullable_.has(indexedColumn.name)) {
      throw new lf.Exception(545, this.name_ + "." + indexedColumn.name);
    }
  }, this);
};
lf.schema.TableBuilder.prototype.addColumn = function(name, type) {
  this.checkNamingRules_(name);
  this.checkNameConflicts_(name);
  this.columns_.set(name, type);
  lf.schema.TableBuilder.NULLABLE_TYPES_BY_DEFAULT.has(type) && this.addNullable([name]);
  return this;
};
goog.exportProperty(lf.schema.TableBuilder.prototype, "addColumn", lf.schema.TableBuilder.prototype.addColumn);
lf.schema.TableBuilder.prototype.addPrimaryKey = function(columns, opt_autoInc) {
  this.pkName_ = "pk" + lf.schema.TableBuilder.toPascal_(this.name_);
  this.checkNamingRules_(this.pkName_);
  this.checkNameConflicts_(this.pkName_);
  var cols = this.normalizeColumns_(columns, !0, void 0, opt_autoInc);
  this.checkPrimaryKey_(cols);
  1 == cols.length && this.uniqueColumns_.add(cols[0].name);
  this.uniqueIndices_.add(this.pkName_);
  this.indices_.set(this.pkName_, cols);
  return this;
};
goog.exportProperty(lf.schema.TableBuilder.prototype, "addPrimaryKey", lf.schema.TableBuilder.prototype.addPrimaryKey);
lf.schema.TableBuilder.prototype.addForeignKey = function(name, rawSpec) {
  this.checkNamingRules_(name);
  this.checkNameConflicts_(name);
  var spec = new lf.schema.ForeignKeySpec(rawSpec, this.name_ + "." + name);
  goog.isDef(spec.action) || (spec.action = lf.ConstraintAction.RESTRICT);
  goog.isDef(spec.timing) || (spec.timing = lf.ConstraintTiming.IMMEDIATE);
  if (spec.action == lf.ConstraintAction.CASCADE && spec.timing == lf.ConstraintTiming.DEFERRABLE) {
    throw new lf.Exception(506);
  }
  if (!this.columns_.has(spec.childColumn)) {
    throw new lf.Exception(540, name);
  }
  this.fkSpecs_.push(spec);
  this.addIndex(name, [spec.childColumn], !1);
  return this;
};
goog.exportProperty(lf.schema.TableBuilder.prototype, "addForeignKey", lf.schema.TableBuilder.prototype.addForeignKey);
lf.schema.TableBuilder.prototype.addUnique = function(name, columns) {
  this.checkNamingRules_(name);
  this.checkNameConflicts_(name);
  var cols = this.normalizeColumns_(columns, !0);
  this.checkIndexedColumns_(name, cols);
  1 == cols.length && this.uniqueColumns_.add(cols[0].name);
  this.indices_.set(name, cols);
  this.uniqueIndices_.add(name);
  return this;
};
goog.exportProperty(lf.schema.TableBuilder.prototype, "addUnique", lf.schema.TableBuilder.prototype.addUnique);
lf.schema.TableBuilder.prototype.addNullable = function(columns) {
  var cols = this.normalizeColumns_(columns, !1);
  this.checkNullableColumns_(cols);
  cols.forEach(function(col) {
    this.nullable_.add(col.name);
  }, this);
  return this;
};
goog.exportProperty(lf.schema.TableBuilder.prototype, "addNullable", lf.schema.TableBuilder.prototype.addNullable);
lf.schema.TableBuilder.prototype.checkNullableColumns_ = function(columns) {
  lf.structs.map.keys(this.indices_).forEach(function(indexName) {
    var indexedColumnNames = lf.structs.set.create();
    this.indices_.get(indexName).forEach(function(indexedColumn) {
      indexedColumnNames.add(indexedColumn.name);
    });
    var nullableColumns = columns.filter(function(nullableColumn) {
      return indexedColumnNames.has(nullableColumn.name);
    });
    if (1 < indexedColumnNames.size && 0 < nullableColumns.length) {
      throw new lf.Exception(507, indexName, nullableColumns.join(","));
    }
  }, this);
};
lf.schema.TableBuilder.prototype.addIndex = function(name, columns, opt_unique, opt_order) {
  this.checkNamingRules_(name);
  this.checkNameConflicts_(name);
  var cols = this.normalizeColumns_(columns, !0, opt_order);
  this.checkIndexedColumns_(name, cols);
  opt_unique && this.uniqueIndices_.add(name);
  this.indices_.set(name, cols);
  return this;
};
goog.exportProperty(lf.schema.TableBuilder.prototype, "addIndex", lf.schema.TableBuilder.prototype.addIndex);
lf.schema.TableBuilder.prototype.checkIndexedColumns_ = function(indexName, columns) {
  if (1 < columns.length) {
    var nullableColumns = columns.filter(function(column) {
      return this.nullable_.has(column.name);
    }, this);
    if (0 < nullableColumns.length) {
      throw new lf.Exception(507, indexName, nullableColumns.join(","));
    }
  }
};
lf.schema.TableBuilder.prototype.persistentIndex = function(value) {
  this.persistentIndex_ = value;
};
goog.exportProperty(lf.schema.TableBuilder.prototype, "persistentIndex", lf.schema.TableBuilder.prototype.persistentIndex);
lf.schema.TableBuilder.prototype.getSchema = function() {
  this.checkPrimaryKeyNotForeignKey_();
  this.checkPrimaryKeyDuplicateIndex_();
  this.checkPrimaryKeyNotNullable_();
  var tableClass = this.generateTableClass_();
  return new tableClass;
};
goog.exportProperty(lf.schema.TableBuilder.prototype, "getSchema", lf.schema.TableBuilder.prototype.getSchema);
lf.schema.TableBuilder.prototype.getFkSpecs = function() {
  return this.fkSpecs_;
};
lf.schema.TableBuilder.prototype.normalizeColumns_ = function(columns, checkIndexable, opt_order, opt_autoInc) {
  var normalized = columns, normalized = "string" == typeof columns[0] ? columns.map(function(col) {
    return new lf.schema.TableBuilder.IndexedColumn_({name:col, order:goog.isDefAndNotNull(opt_order) ? opt_order : lf.Order.ASC, autoIncrement:opt_autoInc || !1});
  }) : columns.map(function(col) {
    return new lf.schema.TableBuilder.IndexedColumn_(col);
  });
  normalized.forEach(function(col) {
    if (!this.columns_.has(col.name)) {
      throw new lf.Exception(508, this.name_, col.name);
    }
    if (checkIndexable) {
      var type = this.columns_.get(col.name);
      if (type == lf.Type.ARRAY_BUFFER || type == lf.Type.OBJECT) {
        throw new lf.Exception(509, this.name_, col.name);
      }
    }
  }, this);
  return normalized;
};
lf.schema.TableBuilder.prototype.generateTableClass_ = function() {
  var that = this, tableClass = function() {
    var columns = lf.structs.map.keys(that.columns_).map(function(colName) {
      this[colName] = new lf.schema.BaseColumn(this, colName, that.uniqueColumns_.has(colName), that.nullable_.has(colName), that.columns_.get(colName));
      return this[colName];
    }, this), generateIndexedColumns = function(indexName) {
      return that.indices_.get(indexName).map(function(indexedColumn) {
        return {schema:this[indexedColumn.name], order:indexedColumn.order, autoIncrement:indexedColumn.autoIncrement};
      }, this);
    }, indices = lf.structs.map.keys(that.indices_).map(function(indexName) {
      return new lf.schema.Index(that.name_, indexName, that.uniqueIndices_.has(indexName), generateIndexedColumns.call(this, indexName));
    }, this);
    lf.schema.Table.call(this, that.name_, columns, indices, that.persistentIndex_);
    var pk = goog.isNull(that.pkName_) ? null : new lf.schema.Index(that.name_, that.pkName_, !0, generateIndexedColumns.call(this, that.pkName_)), notNullable = columns.filter(function(col) {
      return !that.nullable_.has(col.getName());
    });
    this.constraint_ = new lf.schema.Constraint(pk, notNullable, that.getFkSpecs());
    this.rowClass_ = that.generateRowClass_(columns, indices);
  };
  goog.inherits(tableClass, lf.schema.Table);
  tableClass.prototype.createRow = function(opt_value) {
    return new this.rowClass_(lf.Row.getNextId(), opt_value);
  };
  goog.exportProperty(tableClass.prototype, "createRow", tableClass.prototype.createRow);
  tableClass.prototype.deserializeRow = function(dbRecord) {
    var obj = {};
    this.getColumns().forEach(function(col) {
      var key = col.getName(), type = col.getType(), value = dbRecord.value[key];
      obj[key] = type == lf.Type.ARRAY_BUFFER ? lf.Row.hexToBin(value) : type == lf.Type.DATE_TIME ? goog.isDefAndNotNull(value) ? new Date(value) : null : value;
    }, this);
    return new this.rowClass_(dbRecord.id, obj);
  };
  goog.exportProperty(tableClass.prototype, "deserializeRow", tableClass.prototype.deserializeRow);
  tableClass.prototype.getConstraint = function() {
    return this.constraint_;
  };
  goog.exportProperty(tableClass.prototype, "getConstraint", tableClass.prototype.getConstraint);
  return tableClass;
};
lf.schema.TableBuilder.prototype.generateRowClass_ = function(columns$$0, indices) {
  var rowClass = function(rowId, opt_payload) {
    this.columns_ = columns$$0;
    this.indices_ = indices;
    lf.Row.call(this, rowId, opt_payload);
  };
  goog.inherits(rowClass, lf.Row);
  rowClass.prototype.defaultPayload = function() {
    var obj = {};
    this.columns_.forEach(function(col) {
      obj[col.getName()] = col.isNullable() ? null : lf.type.DEFAULT_VALUES[col.getType()];
    });
    return obj;
  };
  rowClass.prototype.toDbPayload = function() {
    var obj = {};
    this.columns_.forEach(function(col) {
      var key = col.getName(), type = col.getType(), value = this.payload()[key];
      obj[key] = type == lf.Type.ARRAY_BUFFER ? goog.isDefAndNotNull(value) ? lf.Row.binToHex(value) : null : type == lf.Type.DATE_TIME ? goog.isDefAndNotNull(value) ? value.getTime() : null : type == lf.Type.OBJECT ? goog.isDefAndNotNull(value) ? value : null : value;
    }, this);
    return obj;
  };
  var getSingleKeyFn = goog.bind(function(column) {
    var colType = this.columns_.get(column.getName());
    return colType == lf.Type.DATE_TIME ? function(payload) {
      var value = payload[column.getName()];
      return column.isNullable() && goog.isNull(value) ? null : value.getTime();
    } : colType == lf.Type.BOOLEAN ? function(payload) {
      if (column.isNullable()) {
        var value = payload[column.getName()];
        return goog.isNull(value) ? null : value ? 1 : 0;
      }
      return payload[column.getName()] ? 1 : 0;
    } : function(payload) {
      return payload[column.getName()];
    };
  }, this), getMultiKeyFn = goog.bind(function(columns) {
    var getSingleKeyFunctions = columns.map(function(indexedColumn) {
      return getSingleKeyFn(indexedColumn.schema);
    });
    return function(payload) {
      return getSingleKeyFunctions.map(function(fn) {
        return fn(payload);
      });
    };
  }, this), functionMap = {};
  indices.forEach(function(index) {
    var key = index.getNormalizedName(), JSCompiler_inline_result, index$$0 = index;
    JSCompiler_inline_result = 1 == index$$0.columns.length ? getSingleKeyFn(index$$0.columns[0].schema) : getMultiKeyFn(index$$0.columns);
    functionMap[key] = JSCompiler_inline_result;
  });
  rowClass.prototype.keyOfIndex = function(indexName) {
    return -1 != indexName.indexOf("#") ? this.id() : functionMap.hasOwnProperty(indexName) ? functionMap[indexName](this.payload()) : null;
  };
  return rowClass;
};
lf.schema.Builder = function(dbName, dbVersion) {
  this.schema_ = new lf.schema.DatabaseSchema(dbName, dbVersion);
  this.tableBuilders_ = lf.structs.map.create();
  this.finalized_ = !1;
};
goog.exportSymbol("lf.schema.Builder", lf.schema.Builder);
lf.schema.Builder.prototype.checkForeignKeyValidity_ = function(builder) {
  var fkSpecArray = builder.getFkSpecs();
  fkSpecArray.forEach(function(specs) {
    var parentTableName = specs.parentTable;
    if (!this.tableBuilders_.has(parentTableName)) {
      throw new lf.Exception(536, specs.name);
    }
    var table = this.tableBuilders_.get(parentTableName), parentSchema = table.getSchema(), parentColName = specs.parentColumn;
    if (!parentSchema.hasOwnProperty(parentColName)) {
      throw new lf.Exception(537, specs.name);
    }
    var localSchema = builder.getSchema(), localColName = specs.childColumn;
    if (localSchema[localColName].getType() != parentSchema[parentColName].getType()) {
      throw new lf.Exception(538, specs.name);
    }
    if (!parentSchema[parentColName].isUnique()) {
      throw new lf.Exception(539, specs.name);
    }
  }, this);
};
lf.schema.Builder.prototype.checkForeignKeyChain_ = function(builder) {
  var fkSpecArray = builder.getFkSpecs();
  fkSpecArray.forEach(function(specs) {
    var parentBuilder = this.tableBuilders_.get(specs.parentTable);
    parentBuilder.getFkSpecs().forEach(function(parentSpecs) {
      if (parentSpecs.childColumn == specs.parentColumn) {
        throw new lf.Exception(534, specs.name);
      }
    }, this);
  }, this);
};
lf.schema.Builder.prototype.finalize_ = function() {
  this.finalized_ || (this.tableBuilders_.forEach(function(builder) {
    this.checkForeignKeyValidity_(builder);
    this.schema_.setTable(builder.getSchema());
  }, this), lf.structs.map.values(this.tableBuilders_).forEach(this.checkForeignKeyChain_, this), this.checkFkCycle_(), this.tableBuilders_.clear(), this.finalized_ = !0);
};
lf.schema.Builder.prototype.checkCycleUtil_ = function(graphNode, nodeMap) {
  graphNode.visited || (graphNode.visited = !0, graphNode.onStack = !0, graphNode.edges.forEach(function(edge) {
    var childNode = nodeMap.get(edge);
    if (!childNode.visited) {
      this.checkCycleUtil_(childNode, nodeMap);
    } else {
      if (childNode.onStack && graphNode != childNode) {
        throw new lf.Exception(533);
      }
    }
  }, this));
  graphNode.onStack = !1;
};
lf.schema.Builder.prototype.checkFkCycle_ = function() {
  var nodeMap = lf.structs.map.create();
  this.schema_.tables_.forEach(function(table, tableName) {
    nodeMap.set(tableName, new lf.schema.GraphNode_(tableName));
  }, this);
  this.tableBuilders_.forEach(function(builder, tableName) {
    builder.getFkSpecs().forEach(function(spec) {
      var parentNode = nodeMap.get(spec.parentTable);
      parentNode.edges.add(tableName);
    });
  });
  lf.structs.map.values(nodeMap).forEach(function(graphNode) {
    this.checkCycleUtil_(graphNode, nodeMap);
  }, this);
};
lf.schema.GraphNode_ = function(tableName) {
  this.onStack = this.visited = !1;
  this.edges = lf.structs.set.create();
  this.tableName = tableName;
};
lf.schema.Builder.prototype.getSchema = function() {
  this.finalized_ || this.finalize_();
  return this.schema_;
};
goog.exportProperty(lf.schema.Builder.prototype, "getSchema", lf.schema.Builder.prototype.getSchema);
lf.schema.Builder.prototype.getGlobal = function() {
  var namespacedGlobalId = new lf.service.ServiceId("ns_" + this.schema_.name()), global = lf.Global.get(), namespacedGlobal = null;
  global.isRegistered(namespacedGlobalId) ? namespacedGlobal = global.getService(namespacedGlobalId) : (namespacedGlobal = new lf.Global, global.registerService(namespacedGlobalId, namespacedGlobal));
  return namespacedGlobal;
};
goog.exportProperty(lf.schema.Builder.prototype, "getGlobal", lf.schema.Builder.prototype.getGlobal);
lf.schema.Builder.prototype.connect = function(opt_options) {
  var global = this.getGlobal();
  global.isRegistered(lf.service.SCHEMA) || global.registerService(lf.service.SCHEMA, this.getSchema());
  var db = new lf.proc.Database(global);
  return db.init(opt_options);
};
goog.exportProperty(lf.schema.Builder.prototype, "connect", lf.schema.Builder.prototype.connect);
lf.schema.Builder.prototype.createTable = function(tableName) {
  if (this.tableBuilders_.has(tableName)) {
    throw new lf.Exception(503, tableName);
  }
  if (this.finalized_) {
    throw new lf.Exception(535);
  }
  this.tableBuilders_.set(tableName, new lf.schema.TableBuilder(tableName));
  return this.tableBuilders_.get(tableName);
};
goog.exportProperty(lf.schema.Builder.prototype, "createTable", lf.schema.Builder.prototype.createTable);
lf.schema.Builder.prototype.setPragma = function(pragma) {
  if (this.finalized_) {
    throw new lf.Exception(535);
  }
  this.schema_.setPragma(pragma);
  return this;
};
goog.exportProperty(lf.schema.Builder.prototype, "setPragma", lf.schema.Builder.prototype.setPragma);
lf.schema.DatabaseSchema = function(name, version) {
  this.name_ = name;
  this.version_ = version;
  this.tables_ = lf.structs.map.create();
  this.pragma_ = {enableBundledMode:!1};
};
goog.exportSymbol("lf.schema.DatabaseSchema", lf.schema.DatabaseSchema);
lf.schema.DatabaseSchema.prototype.name = function() {
  return this.name_;
};
goog.exportProperty(lf.schema.DatabaseSchema.prototype, "name", lf.schema.DatabaseSchema.prototype.name);
lf.schema.DatabaseSchema.prototype.version = function() {
  return this.version_;
};
goog.exportProperty(lf.schema.DatabaseSchema.prototype, "version", lf.schema.DatabaseSchema.prototype.version);
lf.schema.DatabaseSchema.prototype.tables = function() {
  return lf.structs.map.values(this.tables_);
};
goog.exportProperty(lf.schema.DatabaseSchema.prototype, "tables", lf.schema.DatabaseSchema.prototype.tables);
lf.schema.DatabaseSchema.prototype.table = function(tableName) {
  if (!this.tables_.has(tableName)) {
    throw new lf.Exception(101, tableName);
  }
  return this.tables_.get(tableName);
};
goog.exportProperty(lf.schema.DatabaseSchema.prototype, "table", lf.schema.DatabaseSchema.prototype.table);
lf.schema.DatabaseSchema.prototype.info = function() {
  this.info_ || (this.info_ = new lf.schema.Info(this));
  return this.info_;
};
lf.schema.DatabaseSchema.prototype.setTable = function(table) {
  this.tables_.set(table.getName(), table);
};
lf.schema.DatabaseSchema.prototype.pragma = function() {
  return this.pragma_;
};
goog.exportProperty(lf.schema.DatabaseSchema.prototype, "pragma", lf.schema.DatabaseSchema.prototype.pragma);
lf.schema.DatabaseSchema.prototype.setPragma = function(pragma) {
  this.pragma_ = pragma;
};
lf.schema.create = function(dbName, dbVersion) {
  return new lf.schema.Builder(dbName, dbVersion);
};
goog.exportSymbol("lf.schema.create", lf.schema.create);
}.bind(window))()
