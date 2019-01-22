<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://www.ladybug.tools/spider-rad-viewer/#rad-viewer/README.md "View file as a web page." ) </span>
<div><input type=button class="btn btn-secondary btn-sm" onclick=window.location.href="https://github.com/ladybug-tools/spider-rad-viewer/tree/master/rad-viewer"
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

<br>

# [Spider RAD Viewer Read Me]( #rad-viewer/README.md )

## Concept

* A basic [Radiance]( https://www.radiance-online.org/ ) RAD file viewer
* Open, display and manipulate RAD files in real-time 3D in your browser
* Built with plain-vanilla JavaScript using the [Three.js]( https://threejs.org ) library
* All free and open source on GitHub with an MIT license
* See also the scripts in the cookbook for features such as menus of sample files and pop-up surface materials info

The following sections - newest on top - are a show and tell of the changes

***

<iframe src=https://www.ladybug.tools/spider-rad-viewer/rad-viewer/index.html  width=100% height=500px >Iframes are not viewable in GitHub source code view<</iframe>


## Dev version: [Spider RAD Viewer R8]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/r8/ )

### 2019-01-20 ~ Theo

* Update folder names
* Update MNU text and vars


### 2019-01-20 ~ Theo
* UI based on TooToo
* First commit

## 2018-09-18/2018-10-06 ~ Stable version: [Spider RAD Viewer R7]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/r7/rad-viewer.html )

* Uses BufferGeometry which makes drawing things much faster ( and the code more complicated )
* Handles polygons with ten or more vertices fairly well
* Should work on tablets and mobile devices - menu can be hidden
* Additions to cookbook include camera view parameters and visible frustum, section cutting, standard style sheet and improved large file support
* Many small fixes


## 2018-09-11 ~ [Spider RAD Viewer R6]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/r6/rad-viewer.html )

* Handles multiple drag and drop files
* Handles URLs that contain links to multiple files

### 2018-09-13 ~ R6.1

* Handles non-inclusion of a data log div
* Handles non-inclusion of a settings div
* Rotation moved from thr-threejs.js to thru-threejs-utilities.js

### 2018-09-17 ~ R6.2

thru-three-utilities.js
* Add 'Toggle surface normals' button and code
* Add 'Toggle axes' button and code


Coming next: opening RAD files that contain links to other files

***

## 2018-09-05 ~ [Spider RAD Viewer R5]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/r5/rad-viewer.html )

This release is based on a change of direction. The previous releases are based on the premise of creating the minimum viewer to open and display a single RAD file. All extra features are made available via cookbook sample files.

The problem with this setup is that it makes testing more complicated. For example there is no easy way to check the pop-up display against a large number of sample files.

The current release combines the minimum viewer with the pop-up display and one of the sample file menus.

Other enhancements include:

* The 'File open' panel nows accepts drag and drop URLs ( but not files yet )
* 'thr-threejs.js' has had the utilities it includes split out into 'thru-threejs-utilities.js'
	* The single function in 'set-settings.js' was also added and the script file discarded
	* Part of a process to standardize code across a number of Spider scripts

***

## 2018-09-05 ~ [Spider RAD Viewer R4]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/r4/rad-viewer.html )

[download source code]( https://github.com/ladybug-tools/spider-rad-viewer/releases/tag/v4.0 )

* File Open HTML pulled into JavaScript file / greater abstraction
* New JavaScript /ib file: set-settings.js pulls in all html from parent file / greater abstraction
* Tweaking UI a bit so more file data is visible on load.


***

## 2018-09-01 ~ [Spider RAD Viewer R3]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/r3/rad-viewer.html )

<!--
<iframe src=https://www.ladybug.tools/spider-rad-viewer/rad-viewer/r3/rad-viewer.html  width=100% height=500px >Iframes are not viewable in GitHub source code view<</iframe>
-->

[download source code]( https://github.com/ladybug-tools/spider-rad-viewer/releases/tag/v3.2
 )

* Better file opening
* More name-spacing
* For details see https://github.com/ladybug-tools/spider-rad-viewer/projects/1



***

## 2018-08-28/29 ~ [Spider RAD Viewer R1.1]( https://www.ladybug.tools/spider-rad-viewer/rad-viewer/r1-1/rad-viewer.html )

<!--
<iframe src=https://www.ladybug.tools/spider-rad-viewer/rad-viewer/index.html width=100% height=500px >Iframes are not viewable in GitHub source code view<</iframe>
-->

* First commit
* Builds on files from Spider and now forked in [archive]( file:///D:/Dropbox/Public/git-repos/spider-rad-viewer/index.html#archive/rad-to-threejs/README.md )
* Simplified version / removes samples menu items

### 2018-08-29 ~ R1.1
* Add the fix from RAD Viewer R13 for Michal's models
* Add separate 'lib' folder in root folder

***

## Links of Interest

* For further information see: [Ladybug Tools / Spider RAD Viewer Read Me]( https://www.ladybug.tools/spider-rad-viewer/ )
* For support, bugs and wish list issues see: [Spider RAD Viewer GitHub Issues]( https://github.com/ladybug-tools/spider-rad-viewer/issues )
* For project development details see: [Spider RAD Viewer GitHub Projects]( https://github.com/ladybug-tools/spider-rad-viewer/projects/1 )




***


# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x1f578; </a></center>

