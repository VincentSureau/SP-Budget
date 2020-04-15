(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sw"],{

/***/ "./assets/js/sw.js":
/*!*************************!*\
  !*** ./assets/js/sw.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/assets/sw.js', {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvc3cuanMiXSwibmFtZXMiOlsibmF2aWdhdG9yIiwic2VydmljZVdvcmtlciIsInJlZ2lzdGVyIiwic2NvcGUiLCJ0aGVuIiwicmVnIiwiY29uc29sZSIsImxvZyIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLG1CQUFtQkEsU0FBdkIsRUFBa0M7QUFDOUJBLFdBQVMsQ0FBQ0MsYUFBVixDQUF3QkMsUUFBeEIsQ0FBaUMsZUFBakMsRUFBa0Q7QUFBRUMsU0FBSyxFQUFFO0FBQVQsR0FBbEQsRUFBa0VDLElBQWxFLENBQXVFLFVBQVVDLEdBQVYsRUFBZTtBQUNsRjtBQUNBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWSxzQ0FBc0NGLEdBQUcsQ0FBQ0YsS0FBdEQ7QUFDSCxHQUhELFdBR1MsVUFBVUssS0FBVixFQUFpQjtBQUN0QjtBQUNBRixXQUFPLENBQUNDLEdBQVIsQ0FBWSw4QkFBOEJDLEtBQTFDO0FBQ0gsR0FORDtBQU9IOztBQUFBLEMiLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvYXNzZXRzL3N3LmpzJywgeyBzY29wZTogJy8nIH0pLnRoZW4oZnVuY3Rpb24gKHJlZykge1xuICAgICAgICAvLyByZWdpc3RyYXRpb24gd29ya2VkXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWdpc3RyYXRpb24gc3VjY2VlZGVkLiBTY29wZSBpcyAnICsgcmVnLnNjb3BlKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgLy8gcmVnaXN0cmF0aW9uIGZhaWxlZFxuICAgICAgICBjb25zb2xlLmxvZygnUmVnaXN0cmF0aW9uIGZhaWxlZCB3aXRoICcgKyBlcnJvcik7XG4gICAgfSk7XG59OyJdLCJzb3VyY2VSb290IjoiIn0=