(function iife() {
  'use strict';

  var apiKey = '5deb529bcf17795c4bdb76f62785a11f',
      $http = window.$http,
      makeUrl = window.makeUrl,
      recentUri = 'https://api.flickr.com/services/rest/',
      queryParams = {
        'method': 'flickr.photos.getRecent',
        'format': 'json',
        'nojsoncallback': '1',
        'api_key': apiKey,
        'extras': 'url_q,url_o'
      },
      photosContainer = document.getElementById('photoList'),
      photoTemplate = document.querySelector('#photoItemTemplate').text;

  window.PhotosService = PhotosService;

  function PhotosService(lightboxService) {
    this._photos = [];
    this._lightboxService = lightboxService;
  }

  PhotosService.prototype.displayPhotoByHash = function() {
    var photoId = window.location.hash.slice(1),
        photo,
        previousPhoto,
        nextPhoto;

    if (photoId.length === 0) {
      return this._lightboxService.hidePhoto();
    }

    photo = this.getPhotoById(photoId);

    if (!photo) {
      window.location.hash = '';
      return;
    }

    previousPhoto = this.getPreviousPhoto(photo);
    nextPhoto = this.getNextPhoto(photo);

    this._lightboxService.displayPhoto(photo, previousPhoto, nextPhoto);
  };

  PhotosService.prototype.displayPhotos = function(photos) {
    var photoElements = photos.map(makePhotoElement);

    photosContainer.innerHTML = '';
    photoElements.forEach(function(photoElement) {
      photosContainer.appendChild(photoElement);
    });
  };

  PhotosService.prototype.getNextPhoto = function(photo) {
    var i = this._photos.indexOf(photo);

    return this._photos[i + 1];
  };

  PhotosService.prototype.getPhotoById = function(photoId) {
    return this._photos.find(function (photo) {
      return photo.id === photoId;
    });
  };

  PhotosService.prototype.getPreviousPhoto = function(photo) {
    var i = this._photos.indexOf(photo);

    return this._photos[i - 1];
  };

  PhotosService.prototype.getRecentPhotos = function() {
    var url = makeUrl(recentUri, queryParams);

    return $http(url)
      .get()
      .then(parsePhotosResponse)
      .then(this.setPhotos.bind(this))
      .catch(handlerPhotosError);
  };

  PhotosService.prototype.setPhotos = function(photos) {
    this._photos = photos;

    return photos;
  };

  function handlerPhotosError(err) {
    console.error('something went wrong', err);

    return;
  }

  function parsePhotosResponse(photosResponse) {
    var jsonResponse = JSON.parse(photosResponse),
        photos = jsonResponse.photos.photo;

    return photos.map(function(photo) {
        return {
          id: photo.id,
          thumbnailUrl: photo.url_q,
          originalUrl: photo.url_o,
          owner: photo.owner,
          title: photo.title
        };
      })
      .filter(filterForRequiredFields);
  }

  function filterForRequiredFields(photo) {
    return photo.thumbnailUrl &&
      photo.originalUrl &&
      photo.title;
  }

  function makePhotoElement(photo) {
    var listItem = document.createElement('li'),
        anchor,
        image;

    listItem.innerHTML = photoTemplate;
    image = listItem.querySelector('img');
    anchor = listItem.querySelector('a');

    listItem.classList.add('photoItem');
    anchor.href = '#' + photo.id;
    image.src = photo.thumbnailUrl;
    image.alt = photo.title;
    image.dataset.photoId = photo.id;

    return listItem;
  }
}());
