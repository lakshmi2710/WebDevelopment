/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/recipe.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var appState = {
  isLoggedIn: false,
  error: ''
};
var homeDom = document.querySelector('#home-page');
var loginDom = document.querySelector('#login-page');
var newRecipeDom = document.querySelector('#new-recipe');
var recipeDescriptionDom = document.querySelector('#description-page');
var login = document.querySelector('.login');
var logout = document.querySelector('.logout');
var home = document.querySelector('.home');

function renderErrors(text) {
  document.querySelector('.status').innerHTML = text;
}

function renderAddRecipePage() {
  homeDom.remove();
  document.body.append(newRecipeDom);
  document.querySelector('.home').style.visibility = "visible";
  appState.error = '';
  renderErrors(appState.error);
}

logout.addEventListener('click', function (e) {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogOut"])().then(function () {
    appState.isLoggedIn = false;
    appState.error = '';
    renderHomePage();
  })["catch"](function (err) {
    appState.isLoggedIn = false;
    appState.error = err.error;
    renderHomePage();
  });
});

function renderLoginPage() {
  recipeDescriptionDom.remove();
  homeDom.remove();
  document.body.append(loginDom);
  document.querySelector('.home').style.visibility = "visible";
  appState.error = '';
  renderErrors(appState.error);
}

;

function renderHomePage() {
  recipeDescriptionDom.remove();
  newRecipeDom.remove();
  loginDom.remove();
  document.body.append(homeDom);
  getRecipe();
  document.querySelector('.home').style.visibility = "hidden";

  if (appState.isLoggedIn) {
    document.querySelector('.add-btn').style.visibility = "visible";
    document.querySelector('.logout').style.visibility = "visible";
    document.querySelector('.login').style.visibility = "hidden";
  } else {
    document.querySelector('.logout').style.visibility = "hidden";
    document.querySelector('.add-btn').style.visibility = "hidden";
    document.querySelector('.login').style.visibility = "visible";
  }
}

;

function renderRecipePage(title, author, ingredients, instruction) {
  homeDom.remove();
  newRecipeDom.remove();
  document.body.append(recipeDescriptionDom);
  document.querySelector('.home').style.visibility = "visible";
  var toAddRecipe = document.querySelector('.description');
  toAddRecipe.innerHTML = "Title: <span class='color-set'>".concat(title, "<br/></span>\n            Author: <span class='color-set'>").concat(author, "<br/></span>\n            Ingredients: <span class='color-set'>").concat(ingredients, "<br/></span>\n            Instruction: <span class='color-set'>").concat(instruction, "</span>");
}

;
login.addEventListener('click', function (e) {
  renderLoginPage();
});
home.addEventListener('click', function (e) {
  renderHomePage();
});
var userCreate = document.querySelector('.login-panel');
userCreate.addEventListener('click', function (e) {
  if (!e.target.classList.contains('create')) {
    return;
  }

  var username = userCreate.querySelector('.username').value.toUpperCase();
  userCreate.querySelector('.username').value = '';
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogIn"])(username).then(function () {
    appState.isLoggedIn = true;
    appState.error = '';
    renderHomePage();
  })["catch"](function (err) {
    appState.error = err.error;
    renderErrors(appState.error);
  });
});
var addRecipe = document.querySelector('.add-btn');
addRecipe.addEventListener('click', function (e) {
  renderAddRecipePage();
});
var sendNewRecipe = document.querySelector('.add-recipe-btn');
sendNewRecipe.addEventListener('click', function (e) {
  var title = document.querySelector('[name="Title"]').value;
  var ingredients = document.querySelector('[name="Ingredients"]').value;
  var instruction = document.querySelector('[name="Instructions"]').value;
  document.querySelector('[name="Title"]').value = '';
  document.querySelector('[name="Ingredients"]').value = '';
  document.querySelector('[name="Instructions"]').value = '';
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchAddRecipe"])(title, ingredients, instruction).then(function (res) {
    appState.error = '';
    getRecipeDesctiption(res.id);
  })["catch"](function (err) {
    appState.error = err.error;
    renderErrors(appState.error);
  });
});
var recipeLink = document.querySelector('.recipe-list');

function getRecipeDesctiption(id) {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchGetDescription"])(id)["catch"](function (err) {
    appState.error = err.error;
    renderHomePage();
  }).then(function (res) {
    appState.error = '';
    renderRecipePage(res.title, res.author, res.ingredients, res.instruction);
  });
}

recipeLink.addEventListener('click', function (e) {
  var id = e.target.dataset.id;
  getRecipeDesctiption(id);
});

function getRecipe() {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchGetRecipe"])()["catch"](function (err) {
    appState.error = err.error;
    renderHomePage();
  }).then(function (res) {
    appState.error = '';
    renderRecipeList(res);
  });
}

;
var list = document.querySelector('.recipe-list');

function renderRecipeList(RecipeList) {
  list.innerHTML = Object.keys(RecipeList).map(function (id) {
    var recipe = RecipeList[id];
    return "\n        <ul>\n            <button data-id=\"".concat(id, "\" class=\"recipe-button\" type=\"button\" name=\"recipe\">").concat(recipe.title, ": By ").concat(recipe.author, "</button>\n        </ul><br/>    \n    ");
  }).join('\n');
}

; // Initial load
// renderHomePage();

Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function () {
  appState.isLoggedIn = true;
  renderHomePage();
})["catch"](function () {
  appState.isLoggedIn = false;
  renderHomePage();
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogIn, fetchLoginStatus, fetchLogOut, fetchAddRecipe, fetchGetRecipe, fetchGetDescription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogIn", function() { return fetchLogIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLoginStatus", function() { return fetchLoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogOut", function() { return fetchLogOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAddRecipe", function() { return fetchAddRecipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchGetRecipe", function() { return fetchGetRecipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchGetDescription", function() { return fetchGetDescription; });
var fetchLogIn = function fetchLogIn(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchLoginStatus = function fetchLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject({
        code: 'login-invalid'
      });
    }

    return;
  });
};
var fetchLogOut = function fetchLogOut() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchAddRecipe = function fetchAddRecipe(title, ingredients, instruction) {
  return fetch("/recipe", {
    method: 'POST',
    body: JSON.stringify({
      'title': title,
      'ingredients': ingredients,
      'instruction': instruction
    }),
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchGetRecipe = function fetchGetRecipe() {
  return fetch('/recipe', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchGetDescription = function fetchGetDescription(id) {
  return fetch("/recipe/".concat(id), {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};

/***/ })

/******/ });
//# sourceMappingURL=recipe.js.map