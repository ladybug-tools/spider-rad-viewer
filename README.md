

<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://www.ladybug.tools/spider-rad-viewer/#README.md "View file as a web page." ) </span>

<div><input type=button class = 'btn btn-secondary btn-sm' onclick=window.location.href='https://github.com/ladybug-tools/spider-rad-viewer' value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [Ladybug Tools / Spider RAD Viewer Read Me]( #README.md )


<iframe src=https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-viewer-iframe-carousel/r1/rad-viewer-iframe-carousel.html width=100% height=520px >Iframes are not viewable in GitHub source code view</iframe>
_<small>RAD Viewer Iframe Carousel: still at an early stage of development</small>_

Welcome visitors from the [17th International Radiance Workshop]( http://climate-based-daylighting.com/doku.php?id=radiance2018:programme#workshop_programme )

***

### Full Screen: [Spider RAD Viewer]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/ )

* A basic [Radiance]( https://www.radiance-online.org/ ) RAD file viewer
* Open, display and manipulate RAD files in real-time 3D in your browser
* Built with plain-vanilla JavaScript using the [Three.js]( https://threejs.org ) library
* All free and open source on [GitHub]( https://github.com ) with an MIT license

### Read Me: [Spider RAD Viewer Cookbook]( https://www.ladybug.tools/spider-rad-viewer/#cookbook/README.md )

* A collection of scripts that enhance the basic file viewer to carry out specific tasks
	* Point cursor at a surface and view its geometry and materials in a pop-up: [Spider Rad Viewer with Pop-Up Info]( https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-viewer-pop-up-info )
	* Display a slide-show carousel of RAD files: [RAD Viewer Iframe Carousel]( https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-viewer-iframe-carousel/ )
	* View all the RAD files in a GitHub repository: [RAD Sample File Gallery]( https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-sample-file-gallery/ )
	* More scripts are available in the Cookbook

***

## Concept / Issues to be addressed

Radiance Software may be used to produce stunning images with engaging effects. Interestingly the [The RADIANCE 5.1 Synthetic Imaging System.pdf]( http://radsite.lbl.gov/radiance/refer/refman.pdf ) contains a single diagram and no images in its twenty pages. The [Radiance ManPages.pdf]( https://www.radiance-online.org/learning/documentation/manual-pages/pdfs/manpages.pdf ) contains zero images within its **227** pages.

What can we do can to help illustrate the beauties of Radiance software?

Here is a small start: Scripts to view RAD files produced by Radiance scripts in interactive 3D in your browser

And provide new-user support for [Radiance Online]( https://www.radiance-online.org/ )

***

### Mission

Translate Radiance RAD file types into Three.js views - all building on [Mostapha's efforts]( https://github.com/mostaphaRoudsari/radJSON)

* Select and display files very quickly
* Access anywhere: computer/tablet/phone
* Reduce labor needs and increase engineering insights
* Easy code you learn from and can easily adapt to your specific needs

### Vision

* Help make it faster, easier, simpler to do cataloguing and file management on large numbers of Radiance RAD files


## Features

* Select, open, view and manipulate [Radiance]( https://www.radiance-online.org/ ) RAD Files
* Open file or files via
	* Operating system dialog box - single or multiple files
	* URL - remote or local - supplied by a [location.hash]( https://developer.mozilla.org/en-US/docs/Web/API/Window/location ) update - single files only for now
* Select files from lists of links to available online [sample RAD files]( file:///D:/Dropbox/Public/git-repos/spider/index.html#radiance-sample-files/README.md )
* Display RAD files in interactive 3D with rotate, zoom and pan
* View RAD file data
	* Native text format
	* Translated to JSON
* Basic look-up table supplies a basic polygon color palette if no material specified
* Handles openings in surfaces moderately well
* Update scene settings: rotation, wireframe mode, edges visibility, surfaces opacity
* Written in plan-vanilla JavaScript
	* Single dependency: Three.js
	* No need for a server: run locally or offline

Cookbook sample files add scripts with these extra features
* Select files to view from lists of links to available online sample RAD files
* Mouseover a surface to display details of its geometry and material in a pop-up
* View RAD files in an iframe embedded in an HTML file or a Markdown file
* View RAD files in a slide-show carousel

All scripts are:
* All free and open source on [GitHub]( https://github.com ) with an MIT license
* [Plain-vanilla JavaScript]( http://vanilla-js.com/ ) with [Three.js]( https://threejs.org ) as the only dependency
* Written in a very beginner-friendly style
*  Run offline and locally / No server or localhost required


## To do / wish list

See this GitHub Project: [Spider RAD Viewer Dev]( https://github.com/ladybug-tools/spider-rad-viewer/projects/1 )


## Issues

See GitHub issues: [Spider RAD Viewer Issues]( https://github.com/ladybug-tools/spider-rad-viewer/issues )


## Links of Interest

Spider

* [Radiance Sample Data Files]( http://www.ladybug.tools/spider/#radiance-sample-files/README.md )
	* As and when we start receiving more sample files these folders wil be forked into theor own repository


Radiance

* [17th International Radiance Workshop]( http://climate-based-daylighting.com/doku.php?id=radiance2018:programme#workshop_programme )
* [The RADIANCE 5.1 Synthetic Imaging System.pdf]( http://radsite.lbl.gov/radiance/refer/refman.pdf )
* [Radiance ManPages.pdf]( https://www.radiance-online.org/learning/documentation/manual-pages/pdfs/manpages.pdf )


## Notes

This repo replaces and deprecates the following scripts
* [RAD to JSON]( https://www.ladybug.tools/spider/#cookbook/rad-to-json/README.md )
* [Radiance RAD to Three.js]( https://rawgit.com/ladybug-tools/spider/master/#cookbook/rad-to-threejs/README.md )
* [radJSON Fork]( https://rawgit.com/ladybug-tools/spider/master/#cookbook/rad-json-fork/README.md )
* [Rad Viewer]( https://www.ladybug.tools/spider/#rad-viewer/README.md )


Try to follow Mostapha's suggestions

1. Keep the code clean.
2. Test the code.
3. Learn from the code and hack it for other uses.
4. And finally use the repository as a dependency. Especially when it comes to JavaScript we can use GitHub submodules functionality between the repositories.


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>

