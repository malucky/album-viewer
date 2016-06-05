# Album Viewer

## Description

Using Flickr's api, fetch a list of recent photos and display them as a photo album grid.
When a photo is clicked, a lightbox is displayed on top of an overlay displaying the original-size photo.
When a lightbox is displayed, the user can navigate to the previous or next photo, or dismiss the lightbox.
The selected photo is deep-linked using the photo id as the fragment url.
This means refreshing the page will bring up the same photo in lightbox (this implementation only supports 100 most recent photos, so this only currently works when refreshing within a short time frame).
The interactions are keyboard accessible.

## Decisions

I chose not to use any css preprocessors for simplicity's sake.
I still try to follow the guidelines and conventions from BEM, OOCSS, and ITCSS despite not having a preprocessor.

## Folder Structure

/javascript
  /utils
    http.js -- simple abstraction for http request (based on mdn)
  main.js   -- main js file bootstrapping the application
  LightboxService.js -- lightbox service
  Photo.js -- photo object
  PhotoService.js -- photo service that contains photo-related functions
/styles
  main.js
  reset.css -- copied from meyerweb
/fonts
  ion icon font (used for icons)
index.html

## Other Consideration

Since the requirements state technologies can be used if there is support for latest browsers, I opted to use flexbox and native promise.
Promise implementation in browsers isn't well supported at this time, and I would use a library implementation in production.

For production, I would like to add the following:

- remove flickr public api key from hard-coded source code
- minify the assets
- concatenate the assets (at least until http2 is well adopted)
- sanitization of response from flickr
- add loading overlay when asset or ajax request is in progress
