(function iife() {
  'use strict';

  var lightboxService = new window.LightboxService(),
      photosService = new window.PhotosService(lightboxService),
      photosServiceContainer = document.getElementById('photoList');

  window.addEventListener('hashchange', photosService.displayPhotoByHash.bind(photosService));

  return photosService.getRecentPhotos()
    .then(getRecentPhotosHandler);

  function getRecentPhotosHandler(photos) {
    photosService.displayPhotos(photos);
    photosService.displayPhotoByHash();
  }
}());
