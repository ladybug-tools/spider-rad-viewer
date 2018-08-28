

<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://www.ladybug.tools/spider-rad-viewer/#README.md "View file as a web page." ) </span>

<div><input type=button class = 'btn btn-secondary btn-sm' onclick=window.location.href='https://github.com/ladybug-tools/spider-rad-viewer' value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [Ladybug Tools / Spider RAD Viewer Read Me]( #README.md )

<!--
<iframe src=https://www.ladybug.tools/spider-rad-viewer/rad-viewer/ width=100% height=500px >Iframes are not viewable in GitHub source code views</iframe>
_<small>Spider RAD Viewer current release</small>_
-->

<iframe src=https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-viewer-iframe-carousel/rad-viewer-iframe-carousel-r1.html width=100% height=500px >Iframes are not viewable in GitHub source code view</iframe>
_RAD Viewer Iframe Carousel: still at an early stage of development_

### Full Screen: [Spider RAD Viewer]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/ )



## Concept / Issues to be addressed

View RAD files produced by Radiance scripts in interactive 3D in your browser

And provide new-user support for [Radiance Online]( https://www.radiance-online.org/ )

Radiance Software may be used to produce stunning images with engaging effects. Interestingly the [The RADIANCE 5.1 Synthetic Imaging System.pdf]( http://radsite.lbl.gov/radiance/refer/refman.pdf ) contains a single diagram and no images in its twenty pages. The [Radiance ManPages.pdf]( https://www.radiance-online.org/learning/documentation/manual-pages/pdfs/manpages.pdf ) contains zero images within its **227** pages.

Let's see if we can help do something about helping illustrate the beauties of Radiance software

***

### Mission

Translate Radiance RAD file types into Three.js views - all building on [Mostapha's efforts]( https://github.com/mostaphaRoudsari/radJSON)

This repo replaces and deprecates the following scripts
* [RAD to JSON]( https://www.ladybug.tools/spider/#cookbook/rad-to-json/README.md )
* [Radiance RAD to Three.js]( https://rawgit.com/ladybug-tools/spider/master/#cookbook/rad-to-threejs/README.md )
* [radJSON Fork]( https://rawgit.com/ladybug-tools/spider/master/#cookbook/rad-json-fork/README.md )
* [Rad Viewer]( https://www.ladybug.tools/spider/#rad-viewer/README.md )

And we hope that it helps Mostapha here:

* [17th International Radiance Workshop]( http://climate-based-daylighting.com/doku.php?id=radiance2018:programme#workshop_programme )

### Vision

* Help make it faster, easier, simpler to do cataloguing and file management on large numbers of Radiance RAD files


## Features

* Select, load and display Radiance RAD Files
* Open file or files via
	* Operating system dialog box - single or multiple files
	* URL - remote or local - supplied by a [location.hash]( https://developer.mozilla.org/en-US/docs/Web/API/Window/location ) update - single files only for now
* Select files from lists of links to available online [sample RAD files]( file:///D:/Dropbox/Public/git-repos/spider/index.html#radiance-sample-files/README.md )
* Display RAD files in interactive 3D with rotate, zoom and pan
* View RAD file data
	* Native format
	* Translated to JSON
* Basic look-up table supplies a basic polygon color palette
* Handles openings in surfaces moderately well
* Update scene settings: rotation, wireframe mode, edges visibility, surfaces opacity



## To do / wish list

* 2018-08-28 ~ Theo ~ Add heads-up display for all surfaces
* 2018-08-19 ~ Theo ~ Load multiple files via location.hash
* 2018-08-12 ~ Theo ~ Add drag and drop multiple files
* 2018-08-11 ~ Theo ~ Handle larger files in a timely, non-crashing fashion


## Issues



## Links of Interest

Spider

* [Radiance Sample Data Files]( http://www.ladybug.tools/spider/#radiance-sample-files/README.md )

Radiance

* [The RADIANCE 5.1 Synthetic Imaging System.pdf]( http://radsite.lbl.gov/radiance/refer/refman.pdf )
* [Radiance ManPages.pdf]( https://www.radiance-online.org/learning/documentation/manual-pages/pdfs/manpages.pdf )

## Change Log

### 2018-08-28 ~ Theo

* First commit
* Add index.html/ read me / license
* Add RAD viewer folder with R1 / index / read me


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>

