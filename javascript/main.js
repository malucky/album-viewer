(function iife() {
  'use strict';

  var lightboxService = new window.LightboxService(),
      photosService = new window.PhotosService(lightboxService);

  window.addEventListener('hashchange', photosService.displayPhotoByHash.bind(photosService));

  return photosService.getRecentPhotos()
    .then(getRecentPhotosHandler)
    .catch(handlerPhotosError);


  function getRecentPhotosHandler(photos) {
    photosService.displayPhotos(photos);
    photosService.displayPhotoByHash();
  }

  function handlerPhotosError(err) {
    console.error('something went wrong', err);
  }

}());
