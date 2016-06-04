(function iife() {
  'use strict';

  var lightboxElement = document.getElementById('lightbox'),
      lightboxTitleElement = document.getElementById('lightbox-title'),
      lightboxImageElement = document.getElementById('lightbox-image'),
      lightboxPreviousElement = document.getElementById('lightbox-previous'),
      lightboxNextElement = document.getElementById('lightbox-next');;

  window.LightboxService = LightboxService;

  function LightboxService() {
    this.photo = null;
    this.previousPhoto = null;
    this.nextPhoto = null;
    this.isOpen = false;
    this.keyboardHandler = null;
  }

  LightboxService.prototype.displayPhoto = function(photo, previousPhoto, nextPhoto) {
    if (!this.isOpen) {
      lightboxElement.classList.add('lightbox--active');
      this.isOpen = true;
    }

    this.photo = photo;
    this.previousPhoto = previousPhoto;
    this.nextPhoto = nextPhoto;

    this.setAnchor(previousPhoto, lightboxPreviousElement);
    this.setAnchor(nextPhoto, lightboxNextElement);
    this.registerKeyboardHandler();

    lightboxTitleElement.textContent = photo.title;
    lightboxImageElement.src = photo.originalUrl;
    lightboxImageElement.alt = photo.title;

    return photo;
  };

  LightboxService.prototype.hidePhoto = function() {
    this.isOpen = false;
    lightboxElement.classList.remove('lightbox--active');
  };

  LightboxService.prototype.setAnchor = function(photo, element) {
    if (photo) {
      element.classList.remove('hidden');
      element.href = '#' +photo.id;

      return true;
    } else {
      element.classList.add('hidden');

      return false;
    }
  };

  LightboxService.prototype.registerKeyboardHandler = function() {
    this.keyboardHandler = keyboardHandler.bind(this);

    document.addEventListener('keydown', this.keyboardHandler);
  };

  LightboxService.prototype.removeKeyboardHandler = function() {
    document.removeEventListener('keydown', this.keyboardHandler);
  };

  function keyboardHandler(e) {
    var LEFT_KEY = 37,
        RIGHT_KEY = 39,
        ESCAPE_KEY = 27;

    if (e.keyCode === LEFT_KEY && this.previousPhoto) {
      window.location.hash = '#' + this.previousPhoto.id;
    } else if (e.keyCode === RIGHT_KEY && this.nextPhoto) {
      window.location.hash = '#' + this.nextPhoto.id;
    } else if (e.keyCode === ESCAPE_KEY) {
      window.location.hash = '';
    }
  }

}());
