(function iife() {
  'use strict';

  var Photo = window.Photo,
      $http = window.$http,
      apiKey = '5deb529bcf17795c4bdb76f62785a11f',
      makeUrl = window.makeUrl,
      photosListElement = document.getElementById('photoList'),
      photoTemplate = document.querySelector('#photoItemTemplate').text,
      queryParams = {
        'method': 'flickr.photos.getRecent',
        'format': 'json',
        'nojsoncallback': '1',
        'api_key': apiKey,
        'extras': 'url_q,url_o'
      },
      recentUri = 'https://api.flickr.com/services/rest/';

  window.PhotosService = PhotosService;

  /**
   * Service for photos-related functionalities
   * @param lightboxService {LightboxService}
   */
  function PhotosService(lightboxService) {
    this._photos = [];
    this._lightboxService = lightboxService;
  }

  /**
   * Using the url fragment to grab the photo id and using the lightboxService to display the photo.
   * If the photo is not found or the url is missing, use the lightboxService to hide the lightbox instead.
   * @return {void}
   */
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

  /**
   * Display the list of photos on the page
   * @param photos {Photo[]}
   * @return {void}
   */
  PhotosService.prototype.displayPhotos = function(photos) {
    var photoElements = photos.map(makePhotoElement);

    photosListElement.innerHTML = '';
    photoElements.forEach(function(photoElement) {
      photosListElement.appendChild(photoElement);
    });
  };

  /**
   * Find the next photo based on the passed in photo.
   * @param photo {Photo}
   * @return {Photo | Undefined}
   */
  PhotosService.prototype.getNextPhoto = function(photo) {
    var i = this._photos.indexOf(photo);

    return this._photos[i + 1];
  };

  /**
   * Get the photo based on the photoId.
   * @param photoId {String}
   * @return {Photo | Undefined}
   */
  PhotosService.prototype.getPhotoById = function(photoId) {
    return this._photos.find(function (photo) {
      return photo.id === photoId;
    });
  };

  /**
   * Find the previous photo based on the passed in photo.
   * @param photo {Photo}
   * @return {Photo | Undefined}
   */
  PhotosService.prototype.getPreviousPhoto = function(photo) {
    var i = this._photos.indexOf(photo);

    return this._photos[i - 1];
  };

  /**
   * Using the $http utility to make the ajax call to get the recent photos from flickr.
   * Then parse the response and set and resolve with the photos.
   * Error handling is managed by the caller.
   * @return {Promise} Promise resolving with Photos[]
   */
  PhotosService.prototype.getRecentPhotos = function() {
    var url = makeUrl(recentUri, queryParams);

    return $http(url).get()
      .then(parsePhotosResponse)
      .then(this.setPhotos.bind(this));
  };

  /**
   * Set and return the Photos passed in.
   * @param photos {Photo[]}
   * @return {Photo[]}
   */
  PhotosService.prototype.setPhotos = function(photos) {
    this._photos = photos;

    return photos;
  };

  /* --- private functions --- */

  /**
   * Parse photosResponse from flickr api call and filter out ones with missing fields
   * @private
   * @param photosResponse {Object}
   * @return {Photo[]}
   */
  function parsePhotosResponse(photosResponse) {
    var jsonResponse = JSON.parse(photosResponse),
        photos = jsonResponse.photos.photo;

    return photos.map(function(photo) {
        return new Photo(
          photo.id,
          photo.url_q,
          photo.url_o,
          photo.owner,
          photo.title
        );
      })
      .filter(filterForRequiredFields);
  }

  /**
   * Filter function checking for required fields on Photo
   * @private
   * @param photo {Photo}
   * @return {Boolean}
   */
  function filterForRequiredFields(photo) {
    return photo.thumbnailUrl &&
      photo.originalUrl &&
      photo.title;
  }

  /**
   * Make the photo list item element using the passed in photo
   * @private
   * @param photo {Photo}
   * @return {Element}
   */
  function makePhotoElement(photo) {
    var listItemElement = document.createElement('li'),
        anchor,
        image;

    listItemElement.innerHTML = photoTemplate;
    image = listItemElement.querySelector('img');
    anchor = listItemElement.querySelector('a');

    listItemElement.classList.add('photoItem');
    anchor.href = '#' + photo.id;
    image.src = photo.thumbnailUrl;
    image.alt = photo.title;
    image.dataset.photoId = photo.id;

    return listItemElement;
  }

}());
