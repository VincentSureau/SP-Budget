(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../scss/app.scss */ "./assets/scss/app.scss");

__webpack_require__(/*! ./chart-pie */ "./assets/js/chart-pie.js");

__webpack_require__(/*! ./registerSW */ "./assets/js/registerSW.js");

__webpack_require__(/*! ./operations */ "./assets/js/operations.js");

console.log('run with webpack encore'); // init materialize js components

M.AutoInit();

/***/ }),

/***/ "./assets/js/chart-pie.js":
/*!********************************!*\
  !*** ./assets/js/chart-pie.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Chart = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js"); // Set new default font family and font color to mimic Bootstrap's default styling

Chart.defaults.global.defaultFontColor = '#858796'; // Pie Chart Example

var ctx = document.getElementById("myPieChart");

if (ctx) {
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        hoverBorderColor: "rgba(234, 236, 244, 1)"
      }]
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: true,
        caretPadding: 10
      },
      legend: {
        display: true
      },
      cutoutPercentage: 70
    }
  });
}

/***/ }),

/***/ "./assets/js/operations.js":
/*!*********************************!*\
  !*** ./assets/js/operations.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");

/**
 * Send notification to the user system
 * 
 * @param string title | title of the notification
 * @param string content | content of the notification
 */
function sendNotification(title, content) {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      var options = {
        body: content
      };
      reg.showNotification(title, options);
    });
  }
}
/**
 * store offline operation in the local storage
 * 
 * @param object data 
 */


function storeOperation(data) {
  // retrive previous operation in local storage
  var storedOperations = JSON.parse(localStorage.getItem("operations")); // if no operation, initialize an empty array

  if (!storedOperations) {
    storedOperations = [];
  } // add the operation data in the array


  storedOperations.push(data); // store operations in local storage

  localStorage.setItem("operations", JSON.stringify(storedOperations));
}

function handleOperationForm() {
  $operationForm = $("#operationForm"); // handle dynamic category list depending of operation type

  if ($operationForm) {
    var $inputsCategory = $('input[name="operation_type"]');
    $inputsCategory.change(function (event) {
      var optionValues = event.target.value == "expense" ? categoriesExpense : categoriesIncome;
      var $selectCategory = $('select[name="category"]');
      $selectCategory.html('<option value="" disabled="" selected="">Choisir une catégorie</option>');
      optionValues.map(function (optionValue) {
        $selectCategory.append("<option value=".concat(optionValue.id, ">").concat(optionValue.name, "</option>"));
      });
      var instance = M.FormSelect.getInstance($selectCategory);
      instance.destroy();
      M.FormSelect.init($selectCategory);
    }); // handle prevent from submitting form if offline

    $operationForm.submit(function (event) {
      if (navigator.onLine !== true) {
        event.preventDefault();
        console.log("offline"); // get the data from the form

        var data = {
          amount: $('#amount').val(),
          date: $('#date').val(),
          category: $('#category').val(),
          categoryName: $('#category :selected').text(),
          paymentMethod: $('#paymentMethod').val(),
          comment: $('#comment').val()
        }; // store operation in local storage

        storeOperation(data); // send notification to notice the user

        sendNotification("Votre opération a bien été prise en compte", "Elle sera enregistrée lorsque votre connexion internet sera de nouveau active");
      }
    });
  }
}
/**
 * Handle submitting of the operation when user online
 */


function sendAsyncOperations() {
  if (navigator.onLine == true) {
    // retrieve operations from the local storage
    var storedOperations = JSON.parse(localStorage.getItem("operations"));

    if (storedOperations) {
      storedOperations.map(function (operation) {
        // send operation data with ajax
        $.ajax({
          url: 'https://vincentsureau.alwaysdata.net/add-operation-ajax',
          method: 'POST',
          dataType: 'json',
          data: operation
        }) // if ok, notice the ucer
        .done(function (data) {
          sendNotification("Opération enregistrée", "L'op\xE9ration ".concat(operation.categoryName, ": ").concat(operation.amount, "\u20AC a \xE9t\xE9 enregistr\xE9e"));
        }) // if ajax fail, notice the user
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
          sendNotification("Erreur", "L'op\xE9ration ".concat(operation.categoryName, ": ").concat(operation.amount, "\u20AC n'a pas pu \xEAtre enregistr\xE9e"));
        });
      }); // empty the local storage

      localStorage.removeItem("operations");
    }
  }
}

$(document).ready(function () {
  handleOperationForm();
  sendAsyncOperations();
});

/***/ }),

/***/ "./assets/js/registerSW.js":
/*!*********************************!*\
  !*** ./assets/js/registerSW.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// install service worker
if ('serviceWorker' in navigator) {
  // ask permission to send notification to the navigator
  Notification.requestPermission(function (permission) {
    if (!('permission' in Notification)) {
      Notification.permission = permission;
    }

    return permission;
  }).then(function () {
    // register service worker
    navigator.serviceWorker.register('sw.js').then(function (swReg) {
      console.log('Service Worker is registered', swReg);
    })["catch"](function (err) {
      console.error('Service Worker Error', err);
    });
  });
} else {
  console.warn('serviceworker not supported by navigator');
}

/***/ }),

/***/ "./assets/scss/app.scss":
/*!******************************!*\
  !*** ./assets/scss/app.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ })

},[["./assets/js/app.js","runtime","vendors~app"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jaGFydC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL29wZXJhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3JlZ2lzdGVyU1cuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3Njc3MvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyBeXFwuXFwvLiokIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjb25zb2xlIiwibG9nIiwiTSIsIkF1dG9Jbml0IiwiQ2hhcnQiLCJkZWZhdWx0cyIsImdsb2JhbCIsImRlZmF1bHRGb250Q29sb3IiLCJjdHgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibXlQaWVDaGFydCIsInR5cGUiLCJkYXRhIiwibGFiZWxzIiwiZGF0YXNldHMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb2xvcnMiLCJob3ZlckJvcmRlckNvbG9yIiwib3B0aW9ucyIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJ0b29sdGlwcyIsImJvZHlGb250Q29sb3IiLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwieFBhZGRpbmciLCJ5UGFkZGluZyIsImRpc3BsYXlDb2xvcnMiLCJjYXJldFBhZGRpbmciLCJsZWdlbmQiLCJkaXNwbGF5IiwiY3V0b3V0UGVyY2VudGFnZSIsInNlbmROb3RpZmljYXRpb24iLCJ0aXRsZSIsImNvbnRlbnQiLCJOb3RpZmljYXRpb24iLCJwZXJtaXNzaW9uIiwibmF2aWdhdG9yIiwic2VydmljZVdvcmtlciIsImdldFJlZ2lzdHJhdGlvbiIsInRoZW4iLCJyZWciLCJib2R5Iiwic2hvd05vdGlmaWNhdGlvbiIsInN0b3JlT3BlcmF0aW9uIiwic3RvcmVkT3BlcmF0aW9ucyIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImhhbmRsZU9wZXJhdGlvbkZvcm0iLCIkb3BlcmF0aW9uRm9ybSIsIiQiLCIkaW5wdXRzQ2F0ZWdvcnkiLCJjaGFuZ2UiLCJldmVudCIsIm9wdGlvblZhbHVlcyIsInRhcmdldCIsInZhbHVlIiwiY2F0ZWdvcmllc0V4cGVuc2UiLCJjYXRlZ29yaWVzSW5jb21lIiwiJHNlbGVjdENhdGVnb3J5IiwiaHRtbCIsIm1hcCIsIm9wdGlvblZhbHVlIiwiYXBwZW5kIiwiaWQiLCJuYW1lIiwiaW5zdGFuY2UiLCJGb3JtU2VsZWN0IiwiZ2V0SW5zdGFuY2UiLCJkZXN0cm95IiwiaW5pdCIsInN1Ym1pdCIsIm9uTGluZSIsInByZXZlbnREZWZhdWx0IiwiYW1vdW50IiwidmFsIiwiZGF0ZSIsImNhdGVnb3J5IiwiY2F0ZWdvcnlOYW1lIiwidGV4dCIsInBheW1lbnRNZXRob2QiLCJjb21tZW50Iiwic2VuZEFzeW5jT3BlcmF0aW9ucyIsIm9wZXJhdGlvbiIsImFqYXgiLCJ1cmwiLCJtZXRob2QiLCJkYXRhVHlwZSIsImRvbmUiLCJmYWlsIiwianFYSFIiLCJ0ZXh0U3RhdHVzIiwiZXJyb3JUaHJvd24iLCJyZW1vdmVJdGVtIiwicmVhZHkiLCJyZXF1ZXN0UGVybWlzc2lvbiIsInJlZ2lzdGVyIiwic3dSZWciLCJlcnIiLCJlcnJvciIsIndhcm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBQSxtQkFBTyxDQUFDLGdEQUFELENBQVA7O0FBQ0FBLG1CQUFPLENBQUMsNkNBQUQsQ0FBUDs7QUFDQUEsbUJBQU8sQ0FBQywrQ0FBRCxDQUFQOztBQUNBQSxtQkFBTyxDQUFDLCtDQUFELENBQVA7O0FBRUFDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHlCQUFaLEUsQ0FFQTs7QUFDQUMsQ0FBQyxDQUFDQyxRQUFGLEc7Ozs7Ozs7Ozs7O0FDUkFDLEtBQUssR0FBR0wsbUJBQU8sQ0FBQyx1REFBRCxDQUFmLEMsQ0FFQTs7QUFDQUssS0FBSyxDQUFDQyxRQUFOLENBQWVDLE1BQWYs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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zY3NzL2FwcC5zY3NzJyk7XG5yZXF1aXJlKCcuL2NoYXJ0LXBpZScpO1xucmVxdWlyZSgnLi9yZWdpc3RlclNXJyk7XG5yZXF1aXJlKCcuL29wZXJhdGlvbnMnKTtcblxuY29uc29sZS5sb2coJ3J1biB3aXRoIHdlYnBhY2sgZW5jb3JlJyk7XG5cbi8vIGluaXQgbWF0ZXJpYWxpemUganMgY29tcG9uZW50c1xuTS5BdXRvSW5pdCgpOyIsIkNoYXJ0ID0gcmVxdWlyZSgnY2hhcnQuanMnKTtcblxuLy8gU2V0IG5ldyBkZWZhdWx0IGZvbnQgZmFtaWx5IGFuZCBmb250IGNvbG9yIHRvIG1pbWljIEJvb3RzdHJhcCdzIGRlZmF1bHQgc3R5bGluZ1xuQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmRlZmF1bHRGb250Q29sb3IgPSAnIzg1ODc5Nic7XG5cbi8vIFBpZSBDaGFydCBFeGFtcGxlXG52YXIgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVBpZUNoYXJ0XCIpO1xuaWYoY3R4KSB7XG4gICAgdmFyIG15UGllQ2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG4gICAgICAgIHR5cGU6ICdkb3VnaG51dCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGxhYmVsczogbGFiZWxzLFxuICAgICAgICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycyxcbiAgICAgICAgICAgICAgICBob3ZlckJvcmRlckNvbG9yOiBcInJnYmEoMjM0LCAyMzYsIDI0NCwgMSlcIixcbiAgICAgICAgICAgIH1dLFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYigyNTUsMjU1LDI1NSlcIixcbiAgICAgICAgICAgICAgICBib2R5Rm9udENvbG9yOiBcIiM4NTg3OTZcIixcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyNkZGRmZWInLFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgICAgICAgIHhQYWRkaW5nOiAxNSxcbiAgICAgICAgICAgICAgICB5UGFkZGluZzogMTUsXG4gICAgICAgICAgICAgICAgZGlzcGxheUNvbG9yczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYXJldFBhZGRpbmc6IDEwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXRvdXRQZXJjZW50YWdlOiA3MCxcbiAgICAgICAgfSxcbiAgICB9KTtcbn0iLCIvKipcbiAqIFNlbmQgbm90aWZpY2F0aW9uIHRvIHRoZSB1c2VyIHN5c3RlbVxuICogXG4gKiBAcGFyYW0gc3RyaW5nIHRpdGxlIHwgdGl0bGUgb2YgdGhlIG5vdGlmaWNhdGlvblxuICogQHBhcmFtIHN0cmluZyBjb250ZW50IHwgY29udGVudCBvZiB0aGUgbm90aWZpY2F0aW9uXG4gKi9cbmZ1bmN0aW9uIHNlbmROb3RpZmljYXRpb24odGl0bGUsIGNvbnRlbnQpIHtcbiAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT0gJ2dyYW50ZWQnKSB7XG4gICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmdldFJlZ2lzdHJhdGlvbigpLnRoZW4ocmVnID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgYm9keTogY29udGVudCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWcuc2hvd05vdGlmaWNhdGlvbih0aXRsZSwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBzdG9yZSBvZmZsaW5lIG9wZXJhdGlvbiBpbiB0aGUgbG9jYWwgc3RvcmFnZVxuICogXG4gKiBAcGFyYW0gb2JqZWN0IGRhdGEgXG4gKi9cbmZ1bmN0aW9uIHN0b3JlT3BlcmF0aW9uKGRhdGEpIHtcbiAgICAvLyByZXRyaXZlIHByZXZpb3VzIG9wZXJhdGlvbiBpbiBsb2NhbCBzdG9yYWdlXG4gICAgdmFyIHN0b3JlZE9wZXJhdGlvbnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwib3BlcmF0aW9uc1wiKSk7XG5cbiAgICAvLyBpZiBubyBvcGVyYXRpb24sIGluaXRpYWxpemUgYW4gZW1wdHkgYXJyYXlcbiAgICBpZiAoIXN0b3JlZE9wZXJhdGlvbnMpIHtcbiAgICAgICAgc3RvcmVkT3BlcmF0aW9ucyA9IFtdO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGUgb3BlcmF0aW9uIGRhdGEgaW4gdGhlIGFycmF5XG4gICAgc3RvcmVkT3BlcmF0aW9ucy5wdXNoKGRhdGEpO1xuXG4gICAgLy8gc3RvcmUgb3BlcmF0aW9ucyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJvcGVyYXRpb25zXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JlZE9wZXJhdGlvbnMpKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlT3BlcmF0aW9uRm9ybSgpIHtcbiAgICAkb3BlcmF0aW9uRm9ybSA9ICQoXCIjb3BlcmF0aW9uRm9ybVwiKTtcblxuICAgIC8vIGhhbmRsZSBkeW5hbWljIGNhdGVnb3J5IGxpc3QgZGVwZW5kaW5nIG9mIG9wZXJhdGlvbiB0eXBlXG4gICAgaWYgKCRvcGVyYXRpb25Gb3JtKSB7XG4gICAgICAgIGNvbnN0ICRpbnB1dHNDYXRlZ29yeSA9ICQoJ2lucHV0W25hbWU9XCJvcGVyYXRpb25fdHlwZVwiXScpO1xuICAgICAgICAkaW5wdXRzQ2F0ZWdvcnkuY2hhbmdlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvblZhbHVlcyA9IGV2ZW50LnRhcmdldC52YWx1ZSA9PSBcImV4cGVuc2VcIiA/IGNhdGVnb3JpZXNFeHBlbnNlIDogY2F0ZWdvcmllc0luY29tZTtcbiAgICAgICAgICAgIHZhciAkc2VsZWN0Q2F0ZWdvcnkgPSAkKCdzZWxlY3RbbmFtZT1cImNhdGVnb3J5XCJdJyk7XG4gICAgICAgICAgICAkc2VsZWN0Q2F0ZWdvcnkuaHRtbCgnPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkPVwiXCIgc2VsZWN0ZWQ9XCJcIj5DaG9pc2lyIHVuZSBjYXTDqWdvcmllPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICBvcHRpb25WYWx1ZXMubWFwKG9wdGlvblZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAkc2VsZWN0Q2F0ZWdvcnkuYXBwZW5kKGA8b3B0aW9uIHZhbHVlPSR7b3B0aW9uVmFsdWUuaWR9PiR7b3B0aW9uVmFsdWUubmFtZX08L29wdGlvbj5gKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IE0uRm9ybVNlbGVjdC5nZXRJbnN0YW5jZSgkc2VsZWN0Q2F0ZWdvcnkpO1xuICAgICAgICAgICAgaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICAgICAgTS5Gb3JtU2VsZWN0LmluaXQoJHNlbGVjdENhdGVnb3J5KTtcbiAgICAgICAgfSlcblxuXG4gICAgICAgIC8vIGhhbmRsZSBwcmV2ZW50IGZyb20gc3VibWl0dGluZyBmb3JtIGlmIG9mZmxpbmVcbiAgICAgICAgJG9wZXJhdGlvbkZvcm0uc3VibWl0KGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci5vbkxpbmUgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2ZmbGluZVwiKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgZGF0YSBmcm9tIHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDogJCgnI2Ftb3VudCcpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgICBkYXRlOiAkKCcjZGF0ZScpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJCgnI2NhdGVnb3J5JykudmFsKCksXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogJCgnI2NhdGVnb3J5IDpzZWxlY3RlZCcpLnRleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgcGF5bWVudE1ldGhvZDogJCgnI3BheW1lbnRNZXRob2QnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudDogJCgnI2NvbW1lbnQnKS52YWwoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHN0b3JlIG9wZXJhdGlvbiBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgc3RvcmVPcGVyYXRpb24oZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZW5kIG5vdGlmaWNhdGlvbiB0byBub3RpY2UgdGhlIHVzZXJcbiAgICAgICAgICAgICAgICBzZW5kTm90aWZpY2F0aW9uKFwiVm90cmUgb3DDqXJhdGlvbiBhIGJpZW4gw6l0w6kgcHJpc2UgZW4gY29tcHRlXCIsIFwiRWxsZSBzZXJhIGVucmVnaXN0csOpZSBsb3JzcXVlIHZvdHJlIGNvbm5leGlvbiBpbnRlcm5ldCBzZXJhIGRlIG5vdXZlYXUgYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuLyoqXG4gKiBIYW5kbGUgc3VibWl0dGluZyBvZiB0aGUgb3BlcmF0aW9uIHdoZW4gdXNlciBvbmxpbmVcbiAqL1xuZnVuY3Rpb24gc2VuZEFzeW5jT3BlcmF0aW9ucygpIHtcbiAgICBpZiAobmF2aWdhdG9yLm9uTGluZSA9PSB0cnVlKSB7XG4gICAgICAgIC8vIHJldHJpZXZlIG9wZXJhdGlvbnMgZnJvbSB0aGUgbG9jYWwgc3RvcmFnZVxuICAgICAgICB2YXIgc3RvcmVkT3BlcmF0aW9ucyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJvcGVyYXRpb25zXCIpKTtcblxuICAgICAgICBpZihzdG9yZWRPcGVyYXRpb25zKSB7XG4gICAgICAgICAgICBzdG9yZWRPcGVyYXRpb25zLm1hcChvcGVyYXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIC8vIHNlbmQgb3BlcmF0aW9uIGRhdGEgd2l0aCBhamF4XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly92aW5jZW50c3VyZWF1LmFsd2F5c2RhdGEubmV0L2FkZC1vcGVyYXRpb24tYWpheCcsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBvcGVyYXRpb24sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBpZiBvaywgbm90aWNlIHRoZSB1Y2VyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VuZE5vdGlmaWNhdGlvbihcIk9ww6lyYXRpb24gZW5yZWdpc3Ryw6llXCIsIGBMJ29ww6lyYXRpb24gJHtvcGVyYXRpb24uY2F0ZWdvcnlOYW1lfTogJHtvcGVyYXRpb24uYW1vdW50feKCrCBhIMOpdMOpIGVucmVnaXN0csOpZWApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBpZiBhamF4IGZhaWwsIG5vdGljZSB0aGUgdXNlclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bil7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bik7XG4gICAgICAgICAgICAgICAgICAgIHNlbmROb3RpZmljYXRpb24oXCJFcnJldXJcIiwgYEwnb3DDqXJhdGlvbiAke29wZXJhdGlvbi5jYXRlZ29yeU5hbWV9OiAke29wZXJhdGlvbi5hbW91bnR94oKsIG4nYSBwYXMgcHUgw6p0cmUgZW5yZWdpc3Ryw6llYClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gZW1wdHkgdGhlIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwib3BlcmF0aW9uc1wiKVxuICAgICAgICB9XG4gICAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgaGFuZGxlT3BlcmF0aW9uRm9ybSgpO1xuICAgIHNlbmRBc3luY09wZXJhdGlvbnMoKTtcbn0pOyIsIi8vIGluc3RhbGwgc2VydmljZSB3b3JrZXJcbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gICAgLy8gYXNrIHBlcm1pc3Npb24gdG8gc2VuZCBub3RpZmljYXRpb24gdG8gdGhlIG5hdmlnYXRvclxuICAgIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihwZXJtaXNzaW9uID0+IHtcbiAgICAgICAgaWYgKCEoJ3Blcm1pc3Npb24nIGluIE5vdGlmaWNhdGlvbikpIHtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uID0gcGVybWlzc2lvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGVybWlzc2lvbjtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gcmVnaXN0ZXIgc2VydmljZSB3b3JrZXJcbiAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJ3N3LmpzJylcbiAgICAgICAgICAgIC50aGVuKHN3UmVnID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2VydmljZSBXb3JrZXIgaXMgcmVnaXN0ZXJlZCcsIHN3UmVnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTZXJ2aWNlIFdvcmtlciBFcnJvcicsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbn0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKCdzZXJ2aWNld29ya2VyIG5vdCBzdXBwb3J0ZWQgYnkgbmF2aWdhdG9yJyk7XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1TR1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tU0cuanNcIixcblx0XCIuL2VuLVNHLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1TRy5qc1wiLFxuXHRcIi4vZW4tYXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1hdS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1nYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWdiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4taWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWlsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4taWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1uelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VuLW56LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXMtZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy1kby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLXVzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMtdXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2V0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2V1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZmFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9mYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZmkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9mb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9mci1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9meS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2dhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nYS5qc1wiLFxuXHRcIi4vZ2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dhLmpzXCIsXG5cdFwiLi9nZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2xcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dvbS1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ29tLWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9ndVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2d1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vaGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaGkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2hyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9odS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h5LWFtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaHktYW0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9pZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2l0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vaXQtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LWNoLmpzXCIsXG5cdFwiLi9pdC1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQtY2guanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rdS5qc1wiLFxuXHRcIi4va3UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t1LmpzXCIsXG5cdFwiLi9reVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3kuanNcIixcblx0XCIuL2t5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4vbGJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xiLmpzXCIsXG5cdFwiLi9sYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHQuanNcIixcblx0XCIuL2x0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x2LmpzXCIsXG5cdFwiLi9sdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL21lXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9taVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWkuanNcIixcblx0XCIuL21pLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21rLmpzXCIsXG5cdFwiLi9tay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbW4uanNcIixcblx0XCIuL21uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21yLmpzXCIsXG5cdFwiLi9tci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21zXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXMtbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLW15LmpzXCIsXG5cdFwiLi9tcy1teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL210LmpzXCIsXG5cdFwiLi9tdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL215XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbXkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9uYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmIuanNcIixcblx0XCIuL25iLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25lLmpzXCIsXG5cdFwiLi9uZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbmwtYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLWJlLmpzXCIsXG5cdFwiLi9ubC1iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25uLmpzXCIsXG5cdFwiLi9ubi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL3BhLWluXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGEtaW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGwuanNcIixcblx0XCIuL3BsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcHRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9wdC1iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQtYnIuanNcIixcblx0XCIuL3B0LWJyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9yb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcm8uanNcIixcblx0XCIuL3JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcnVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3J1LmpzXCIsXG5cdFwiLi9ydS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3NkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2UuanNcIixcblx0XCIuL3NlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NpLmpzXCIsXG5cdFwiLi9zaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2wuanNcIixcblx0XCIuL3NsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc3FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NxLmpzXCIsXG5cdFwiLi9zcS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3ItY3lybFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3ItY3lybC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3MuanNcIixcblx0XCIuL3NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdy5qc1wiLFxuXHRcIi4vc3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi90YVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGEuanNcIixcblx0XCIuL3RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90ZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RnLmpzXCIsXG5cdFwiLi90Zy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90bC1waFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGwtcGguanNcIixcblx0XCIuL3RsLXBoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGxoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RsaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90clwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3RyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHpsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90em1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdHptLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS1sYXRuLmpzXCIsXG5cdFwiLi90em0tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi91Zy1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWctY24uanNcIixcblx0XCIuL3VnLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VrLmpzXCIsXG5cdFwiLi91ay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91elwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXouanNcIixcblx0XCIuL3V6LWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi92aS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3gtcHNldWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS94LXBzZXVkby5qc1wiLFxuXHRcIi4veC1wc2V1ZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi95b1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveW8uanNcIixcblx0XCIuL3lvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4vemgtY25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1jbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWhrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1oay5qc1wiLFxuXHRcIi4vemgtaGsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC10d1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtdHcuanNcIixcblx0XCIuL3poLXR3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==