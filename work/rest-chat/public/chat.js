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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/chat.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chat.js":
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var appState = {
  pollId: null,
  isLoggedIn: false,
  error: ''
};
var loginDom = document.querySelector('#login-page');
var chatDom = document.querySelector('#chat-app');
var newMsg = document.querySelector('.message');
var sendButton = document.querySelector('.btn-msg');

function renderLogin(show) {
  if (show) {
    chatDom.remove();
    document.body.append(loginDom);
    loginDom.style.visibility = "visible";
  } else {
    loginDom.remove();
  }
}

function renderChat(show) {
  if (show) {
    loginDom.remove();
    document.body.append(chatDom);
    chatDom.style.visibility = "visible";
  } else {
    chatDom.style.visibility = "hidden";
  }
}

function renderErrors(text) {
  document.querySelector('.Status').innerHTML = text;
}

function poll(shouldPoll) {
  if (shouldPoll && !appState.pollId) {
    appState.pollId = setInterval(function () {
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchGetChats"])()["catch"](function (err) {
        poll(false);
        appState.error = err.error;
        renderPage();
      }).then(function (chatMessages) {
        appState.error = '';
        renderMsg(chatMessages);
      });
      Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchUserList"])()["catch"](function (err) {
        poll(false);
        appState.error = err.error;
        renderPage();
      }).then(function (usersList) {
        appState.error = '';
        renderActiveUsers(usersList);
      });
    }, 3000);
  }

  if (!shouldPoll && appState.pollId) {
    clearTimeout(appState.pollId);
    appState.pollId = null;
  }
}

;

function renderMsg(chatMessages) {
  if (chatMessages) {
    var msgDom = document.querySelector('.message-list');
    msgDom.innerHTML = chatMessages.chats.map(function (message) {
      return "<ul>[".concat(message.timestamp, "] ").concat(message.username, ": ").concat(message.message, "</ul>");
    }).join('');
  }
}

function renderActiveUsers(users) {
  if (users) {
    var userDom = document.querySelector('.user-list');
    userDom.innerHTML = users.map(function (user) {
      return "<p>".concat(user, "</p>");
    }).join('');
  }
}

function renderPage() {
  if (!appState.isLoggedIn) {
    renderLogin(true);
    renderChat(false);
  } else {
    renderLogin(false);
    renderChat(true);
  }

  renderErrors(appState.error);
}

var login = document.querySelector('.login-panel');
login.addEventListener('click', function (e) {
  if (!e.target.classList.contains('create')) {
    return;
  }

  var username = login.querySelector('.username').value.toUpperCase();
  login.querySelector('.username').value = '';
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogIn"])(username).then(function () {
    appState.isLoggedIn = true;
    appState.error = '';
    poll(true);
    renderPage();
  })["catch"](function (err) {
    poll(false);
    appState.error = err.error;
    renderPage();
  });
});
var logout = document.querySelector('.logout');
logout.addEventListener('click', function (e) {
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLogOut"])().then(function () {
    appState.isLoggedIn = false;
    appState.error = '';
    poll(false);
    renderPage();
  })["catch"](function (err) {
    poll(false);
    appState.error = err.error;
    renderPage();
  });
});
sendButton.addEventListener('click', function (e) {
  var msg = newMsg.value;
  newMsg.value = '';
  Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchSendMessage"])(msg).then(function () {
    appState.error = '';
    appState.isLoggedIn = true;
    poll(true);
    renderPage();
  })["catch"](function (err) {
    poll(false);
    appState.error = err.error;
    renderPage();
  });
}); // Initial load

Object(_services__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function () {
  appState.isLoggedIn = true;
  poll(true);
  renderPage();
})["catch"](function () {
  poll(false);
  appState.isLoggedIn = false;
  renderPage();
});

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogIn, fetchLoginStatus, fetchUserList, fetchLogOut, fetchGetChats, fetchSendMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogIn", function() { return fetchLogIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLoginStatus", function() { return fetchLoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUserList", function() { return fetchUserList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogOut", function() { return fetchLogOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchGetChats", function() { return fetchGetChats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSendMessage", function() { return fetchSendMessage; });
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
var fetchUserList = function fetchUserList() {
  return fetch('/users', {
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
var fetchGetChats = function fetchGetChats() {
  return fetch('/message', {
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
var fetchSendMessage = function fetchSendMessage(msg) {
  return fetch("/message", {
    method: 'POST',
    body: JSON.stringify({
      'message': msg
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

/***/ })

/******/ });
//# sourceMappingURL=chat.js.map