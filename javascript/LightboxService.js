(function iife() {
  'use strict';

  var lightboxElement = document.getElementById('lightbox'),
    lightboxTitleElement = document.getElementById('lightbox-title'),
    lightboxImageElement = document.getElementById('lightbox-image'),
    lightboxPreviousElement = document.getElementById('lightbox-previous'),
    lightboxNextElement = document.getElementById('lightbox-next');;

  window.LightboxService = LightboxService;

  /**
   * Service for lightbox-related functionalities
   */
  function LightboxService() {
    this.photo = null;
    this.previousPhoto = null;
    this.nextPhoto = null;
    this.isOpen = false;
    this.keyboardHandler = null;
  }

  /**
   * Display the lightbox with the selected photo and register keyboard listener
   * @param photo {Photo}
   * @param previousPhoto {Photo}
   * @param nextPhoto {Photo}
   * @return {Photo}
   */
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

  /**
   * Hide the lightbox
   * @return {void}
   */
  LightboxService.prototype.hidePhoto = function() {
    this.isOpen = false;
    this.removeKeyboardHandler();

    lightboxElement.classList.remove('lightbox--active');
  };

  /**
   * Set the anchor element with attributes based on previous and next photo
   * @param photo {Photo}
   * @param element {Element} anchor element
   * return {Boolean}
   */
  LightboxService.prototype.setAnchor = function(photo, element) {
    if (photo) {
      element.classList.remove('hidden');
      element.href = '#' + photo.id;

      return true;
    } else {
      element.classList.add('hidden');

      return false;
    }
  };

  /**
   * Register the keyboard handler
   * @return {void}
   */
  LightboxService.prototype.registerKeyboardHandler = function() {
    this.keyboardHandler = keyboardHandler.bind(this);

    document.addEventListener('keydown', this.keyboardHandler);
  };

  /**
   * Remove the keyboard handler
   * @return {void}
   */
  LightboxService.prototype.removeKeyboardHandler = function() {
    document.removeEventListener('keydown', this.keyboardHandler);
  };

  /* --- private functions --- */

  /**
   * The keyboard event handler for closing lightbox and navigating to previous and next photo
   * @param e {Event}
   * @return {void}
   */
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
