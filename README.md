

<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://www.ladybug.tools/spider-rad-viewer/#README.md "View file as a web page." ) </span>

<div><input type=button class = 'btn btn-secondary btn-sm' onclick=window.location.href='https://github.com/ladybug-tools/spider-rad-viewer' value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [Ladybug Tools / Spider RAD Viewer Read Me]( #README.md )


<iframe src=https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-viewer-iframe-carousel/r1/rad-viewer-iframe-carousel.html width=100% height=520px >Iframes are not viewable in GitHub source code view</iframe>
_<small>RAD Viewer Iframe Carousel: still at an early stage of development</small>_

Welcome visitors from the [17th International Radiance Workshop]( http://climate-based-daylighting.com/doku.php?id=radiance2018:programme#workshop_programme )

***

### Full Screen: [Spider RAD Viewer]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/ ) &mdash; [Read Me]( https://www.ladybug.tools/spider-rad-viewer/index.html#rad-viewer/README.md ) &mdash; [Download scripts]( https://github.com/ladybug-tools/spider-rad-viewer/releases )

* A [Radiance]( https://www.radiance-online.org/ ) RAD file viewer with a limited feature set
	* Open files via an API, a file dialog box, via drag and drop or from a selection of sample files
	* View selected individual surface data in a pop-up
	* Adjust a variety of display settings
* Open, display and manipulate RAD files in real-time 3D in your browser
* Built with plain-vanilla JavaScript using the [Three.js]( https://threejs.org ) library
* All free and open source softare hosted on [GitHub]( https://github.com ) with an MIT license

### Read Me: [Spider RAD Viewer Cookbook]( https://www.ladybug.tools/spider-rad-viewer/#cookbook/README.md )

The Spider RAD Viewer is designed to be a tool that you can edit and update according to your needs. In order to help you, the cookbook Spider RAD Cookbook supplies a number of simple code samples. The cookbook is a collection of scripts that:
* Enhance the basic file RAD file viewer to carry out specific tasks.
* Isolate features in the main viewer so you can see how the work in a more simple way
* Add special features not in the main viewer
* Experiment with new ideas

Scripts of interest include:
* Point cursor at a surface and view its geometry and materials in a pop-up: [Spider Rad Viewer with Pop-Up Info]( https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-viewer-pop-up-info )
* Display a slide-show carousel of RAD files: [RAD Viewer Iframe Carousel]( https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-viewer-iframe-carousel/ )
* View all the RAD files in a GitHub repository: [RAD Sample File Gallery]( https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-sample-file-gallery/ )
* A very basic script with a minimal feature set: [RAD Viewer Basic]( https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-viewer-basic/ )
	* Use this script to start building your own modules
* An excremental script for loading mult-megabyte files: [RAD Viewer Triangles Only]( https://www.ladybug.tools/spider-rad-viewer/cookbook/rad-viewer-triangles-only/ )
* More scripts are available in the Cookbook

### Forum / https://discourse.ladybug.tools/c/spider

* General discussion on Spider projects
* Updates on latest features added
* Obtain help and support

<br>

### Issues / GitHub issues: [Spider RAD Viewer Issues]( https://github.com/ladybug-tools/spider-rad-viewer/issues )

* Report bugs
* Discuss wish list items

<br>

### To do / wish list / GitHub Project: [Spider RAD Viewer Projects]( https://github.com/ladybug-tools/spider-rad-viewer/projects )

* What's in the pipeline


***

## Concept / Issues to be addressed

Radiance Software may be used to produce stunning images with engaging effects. Interestingly the [The RADIANCE 5.1 Synthetic Imaging System.pdf]( http://radsite.lbl.gov/radiance/refer/refman.pdf ) contains a single diagram and no images in its twenty pages. The [Radiance ManPages.pdf]( https://www.radiance-online.org/learning/documentation/manual-pages/pdfs/manpages.pdf ) contains zero images within its **227** pages.

What can we do can to help illustrate the beauties of Radiance software?

Here is a small start: Scripts to view RAD files produced by Radiance scripts in interactive 3D in your browser

And provide new-user support for [Radiance Online]( https://www.radiance-online.org/ )

***

### Mission

Translate Radiance RAD file types into Three.js views - all building on [Mostapha's efforts]( https://github.com/mostaphaRoudsari/radJSON)

* Select and display RAD files very quickly
* Access RAD files from anywhere: computer/tablet/phone
* Reduce labor needs and increase engineering insights
* Easy code you learn from and can easily adapt to your specific needs

### Vision

* Help make it faster, easier, simpler to do cataloguing and file management on large numbers of Radiance RAD files


## Features

One liner
* Select, open, view and manipulate [Radiance]( https://www.radiance-online.org/ ) RAD Files with interactive 3D on any device

Selecting files
* Open file or files locally or remotely via
	* Operating system dialog box - single or multiple files
	* URL - remote or local - supplied by a [location.hash]( https://developer.mozilla.org/en-US/docs/Web/API/Window/location ) update - single files only for now
	* Drag and drop (work-in progress)
* Select files from lists of links to available online [sample RAD files](
file:///D:/Dropbox/Public/git-repos/spider/index.html#radiance-sample-files/README.md )

Viewing files as models
* Display RAD files in interactive 3D with rotate, zoom and pan
* Update scene settings: rotation, wireframe mode, edges visibility, surfaces opacity
* UX intended to work on computer, tablet or mobile device (work-in-progress)

Viewing files as data
* View RAD file data in the menu
	* Native text format
	* Translated to JSON
* Highlight individual elements visually and view their numeric parameters in a pop-up
	* Shows use of Three.js Raycaster and Object3D.traverse


Parsing file data
* Uses converter from [github.com/mostaphaRoudsari/radJSON]( https://github.com/mostaphaRoudsari/radJSON )
	* Outlines a possible JSON schema
* Basic look-up table supplies a basic polygon color palette if no material specified
* Handles openings in surfaces moderately well
* Files under a megabyte in size handled in a speedy fashion / Larger files are a work-in-progress


Written in plan-vanilla JavaScript
* All free and open source on [GitHub]( https://github.com ) with an MIT license
* [Plain-vanilla JavaScript]( http://vanilla-js.com/ ) with [Three.js]( https://threejs.org ) as the only dependency
* Written in a very beginner-friendly style
* Run offline and locally / No server or localhost required
* Follows the code style guidelines of the [Three.js Examples]( https://threejs.org/examples/ )


Cookbook sample files add scripts with these extra features
* Select files to view from lists of links to available online sample RAD files
* Mouseover a surface to display details of its geometry and material in a pop-up
* View RAD files in an iframe embedded in an HTML file or a Markdown file
* View RAD files in a slide-show carousel


Use cases
* View large numbers of RAD files quickly and easily on any device
* Locate  for individual geometry elements visually and identify numeric parameters instantly

Possible future uses

* Part of a system for extracting data and creating RAD files from other file types such as: gbXML, IDF, OSM and glTF
* Display large numbers of RAD files selected at user run-time in a single 3D space
	* To enable speedy visual compare and contrast
* Speed up some 'housekeeping' operations for numbers of RAD files by enabling GPU access with lower skill-level requirements






## Links of Interest

Spider

* [Spider RAD Resources Read Me]( http://www.ladybug.tools/spider/#radiance-sample-files/README.md )
	* As and when we start receiving more sample files these folders wil be forked into their own repository


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

