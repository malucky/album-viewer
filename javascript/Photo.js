(function iife() {
  'use strict';

  window.Photo = Photo;

  /**
   * @param photoId {String}
   * @param thumbnailUrl {String}
   * @param originalUrl {String}
   * @param owner {String}
   * @param title {String}
   */
  function Photo(photoId, thumbnailUrl, originalUrl, owner, title) {
    this.id = photoId;
    this.thumbnailUrl = thumbnailUrl;
    this.originalUrl = originalUrl;
    this.owner = owner;
    this.title = title;
  }

}());
