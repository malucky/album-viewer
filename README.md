# Album Viewer

## Description

Using flickr's api, fetch a list of recent photos and display them as a photo album grid.

## Decisions

I chose not to use any css preprocessors. I still tried to follow the guidelines and conventions from BEM, OOCSS, and ITCSS even without a preprocessor.

## folder structure

/javascript
  /utils
    http.js -- simple abstraction for http request
  main.js   -- main js file bootstrapping the application
  photos.js -- photo service that contains photo-related functions
/styles
  main.js
index.html


## additional notes
- consider sanitization
