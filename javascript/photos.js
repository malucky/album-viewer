(function iife() {
  'use strict';

  var apiKey = 'd332527aa9fd2b864ce83813c5ca32f1',
      $http = window.$http,
      makeUrl = window.makeUrl,
      recentUri = 'https://api.flickr.com/services/rest/',
      queryParams = {
        'method': 'flickr.photos.getRecent',
        'format': 'json',
        'nojsoncallback': '1',
        'api_key': apiKey,
        'extras': 'url_t,url_o'
      };

  window.photos = {
    getRecentPhotos: getRecentPhotos
  };

  function getRecentPhotos() {
    var url = makeUrl(recentUri, queryParams);

    return $http(url).get();
  }
}());
