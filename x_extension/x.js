document.addEventListener('DOMContentLoaded', function() {
  var searchBtn = document.getElementById('search');
  var queryInput = document.getElementById('query');

  searchBtn.addEventListener('click', function() {
    queryIocInX();
  }, false);

  queryInput.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      queryIocInX();
    }
  }, false);

  function queryIocInX() {
    var query = queryInput.value;
    var preUrl = 'https://x.threatbook.cn/query/'
    var reqUrl = preUrl + query;

    window.open(reqUrl);
  }

}, false);