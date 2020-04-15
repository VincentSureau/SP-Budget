(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sw"],{

/***/ "./assets/js/sw.js":
/*!*************************!*\
  !*** ./assets/js/sw.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  }).then(function (reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  })["catch"](function (error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

;

/***/ })

},[["./assets/js/sw.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc3cuanMiXSwibmFtZXMiOlsibmF2aWdhdG9yIiwic2VydmljZVdvcmtlciIsInJlZ2lzdGVyIiwic2NvcGUiLCJ0aGVuIiwicmVnIiwiY29uc29sZSIsImxvZyIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLG1CQUFtQkEsU0FBdkIsRUFBa0M7QUFDOUJBLFdBQVMsQ0FBQ0MsYUFBVixDQUF3QkMsUUFBeEIsQ0FBaUMsUUFBakMsRUFBMkM7QUFBRUMsU0FBSyxFQUFFO0FBQVQsR0FBM0MsRUFBMkRDLElBQTNELENBQWdFLFVBQVVDLEdBQVYsRUFBZTtBQUMzRTtBQUNBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxzQ0FBc0NGLEdBQUcsQ0FBQ0YsS0FBdEQ7QUFDSCxHQUhELFdBR1MsVUFBVUssS0FBVixFQUFpQjtBQUN0QjtBQUNBRixXQUFPLENBQUNDLEdBQVIsQ0FBWSw4QkFBOEJDLEtBQTFDO0FBQ0gsR0FORDtBQU9IOztBQUFBLEMiLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc3cuanMnLCB7IHNjb3BlOiAnLycgfSkudGhlbihmdW5jdGlvbiAocmVnKSB7XG4gICAgICAgIC8vIHJlZ2lzdHJhdGlvbiB3b3JrZWRcbiAgICAgICAgY29uc29sZS5sb2coJ1JlZ2lzdHJhdGlvbiBzdWNjZWVkZWQuIFNjb3BlIGlzICcgKyByZWcuc2NvcGUpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAvLyByZWdpc3RyYXRpb24gZmFpbGVkXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWdpc3RyYXRpb24gZmFpbGVkIHdpdGggJyArIGVycm9yKTtcbiAgICB9KTtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==