"use strict";
function byId(e){return document.getElementById(e);}

window.addEventListener('load', onDocLoaded, false);

var wavesurfer;
var wavesurfer1;

function onDocLoaded()
{
    byId('mFileInput1').addEventListener('change', onChosenFileChange, false);
	byId('mFileInput2').addEventListener('change', onChosenFileChange2, false);
}


function isPlaying(audelem) { return !audelem.paused; }

function onChosenFileChange(evt)
{
    var fileType = this.files[0].type;
	
	wavesurfer.loadBlob(this.files[0]);

//   if (fileType.indexOf('audio') != -1){
//       loadFileObject(this.files[0], onSoundLoaded);
//		console.log(this.files[0]);
//	}

		
		
}



function onChosenFileChange2(evt)
{
    var fileType = this.files[0].type;
	
	wavesurfer1.loadBlob(this.files[0]);

//   if (fileType.indexOf('audio') != -1){
//     loadFileObject(this.files[0], onSoundLoaded2);
//		console.log(this.files[0]);
//	}
 
		
		
}

function loadFileObject(fileObj, loadedCallback)
{
    var reader = new FileReader();
    reader.onload = loadedCallback;
    reader.readAsDataURL( fileObj );
}
/*
function onSoundLoaded(evt)
{
    byId('sound1').src = evt.target.result;
}

function playSong1() { 
    byId('sound1').play(); 
} 
function pauseSong1() { 
    byId('sound1').pause(); 
} 

function onSoundLoaded2(evt)
{
    byId('sound2').src = evt.target.result;
}
function playSong2() { 
    byId('sound2').play(); 
} 

function pauseSong2() { 
    byId('sound2').pause(); 
} 
*/

/*
function adjustVol(){
//while(isPlaying(byId('sound1'))){
	var volume = byId('volumeBoth').value /100;
	var volumeBefore = byId('volumeBoth').value;
	//byId('sound1').volume = byId('volumeBoth').value /100;
	
	if(volumeBefore > 49){
		byId('sound2').volume = 1.0;
		byId('sound1').volume = (100 - ((volumeBefore-50)*2)) /100;
	}
	else{
		byId('sound1').volume = 1.0;
		//byId('sound1').voume = (100 - (volumeBefore*2)) /100;
		//console.log((100 - (volumeBefore*2)) /100);
		byId('sound2').volume = ((volumeBefore*2)) /100;
		//console.log(byId('sound1').volume);
	}
}

function adjustVol1(){
		var volumeBefore = byId('volume1').value;
		byId('sound1').volume = volumeBefore /100;
}


function adjustVol2(){
		var volumeBefore = byId('volume2').value;
		byId('sound2').volume = volumeBefore /100;
}
*/
function selected(id){
	$('#songList>ul>p.highlight').removeClass('highlight');
	$(id).addClass('highlight');
}
$('document').ready(function(){


wavesurfer = Object.create(WaveSurfer);
wavesurfer1 = Object.create(WaveSurfer);
	
	
initSliders();
createWave();
createWave1();

var loopthis;
var id;

var sliderSlow1 =document.getElementById('slowSlider1');
var sliderSlow2 =document.getElementById('slowSlider2');

var list =  document.getElementById('list');

var buttonLeft = document.getElementById('leftAudio');
var buttonRight = document.getElementById('rightAudio');

var form1 = document.getElementById('fileForm1');
var fileSelect1 = document.getElementById('mFileInput1');


var form2 = document.getElementById('fileForm2');
var fileSelect2 = document.getElementById('mFileInput2');

var xhr = new XMLHttpRequest();
xhr.open('POST', 'saveFile.php', true);
xhr.onload = function () {
  if (xhr.status === 200) {
    // File(s) uploaded.
	 list.innerHTML = xhr.responseText;
  } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send();

sliderSlow1.addEventListener("mousemove", function() {
   	var rate = sliderSlow1.value;
	var audio = document.getElementById('sound1');
	audio.playbackRate = rate;
}, false);
sliderSlow2.addEventListener("mousemove", function() {
   	var rate = sliderSlow2.value;
	var audio = document.getElementById('sound2');
	audio.playbackRate = rate;
}, false);


list.addEventListener('click', function(e) {
id = e.target.id;
});
buttonLeft.addEventListener('click',function(e){
var audio = document.getElementById('sound1');
var path;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'getFile.php?q='+id, true);
xhr.onload = function () {
  if (xhr.status === 200) {
    // File(s) uploaded.
	  path = xhr.responseText;
	audio.src = path;
	 playSong1();
  } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send();
});
buttonRight.addEventListener('click',function(e){
var audio = document.getElementById('sound2');
var path;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'getFile.php?q='+id, true);
xhr.onload = function () {
  if (xhr.status === 200) {
    // File(s) uploaded.
	 path = xhr.responseText;
	 audio.src = path;
	 playSong2();
	 } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send();
});
form1.onsubmit = function(event) {
  event.preventDefault();
var files = fileSelect1.files;
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // Check the file type.

  // Add the file to the request.
  formData.append('fileToUpload', file, file.name);
  
}

var xhr = new XMLHttpRequest();
xhr.open('POST', 'saveFile.php', true);
xhr.onload = function () {
  if (xhr.status === 200) {
    // File(s) uploaded.
	 list.innerHTML = xhr.responseText;
  } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send(formData);
}
form2.onsubmit = function(event) {
	
  event.preventDefault();

  // Update button text.
  uploadButton2.innerHTML = 'Uploading...';

  // The rest of the code will go here...
var files = fileSelect2.files;
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // Check the file type.

  // Add the file to the request.
  formData.append('fileToUpload', file, file.name);
  
}

var xhr = new XMLHttpRequest();
xhr.open('POST', 'saveFile.php', true);
xhr.onload = function () {
  if (xhr.status === 200) {
    // File(s) uploaded.
    uploadButton2.innerHTML = 'Upload';
  } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send(formData);
}

});

function deleteThis(){
	
	alert("clicked delete");
	var listElement = $('ul#list p.highlight');
		console.log(listElement.text());
		var song = {
			songName: listElement.text(),
		};
		console.log("...deleting: "+ listElement.text() +"....");
		
		$.ajax({
			url: 'delete.php',
			type: 'POST',
			data: song,
			success: function(newSong){
				alert("success deleting" + listElement.text());
				listElement.remove();
			},
			error: function(){
				alert('music delete failed');
			}
		});
	
}


function createWave() {

	var loopthis;

	// Init & load audio file

    var options = {
        container     : document.querySelector('#wave'),
        waveColor     : '#545454',
        progressColor : '#FF6600',
        cursorColor   : '#FF6600'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    // Init
    wavesurfer.init(options);

    // Regions
    if (wavesurfer.enableDragSelection) {
        wavesurfer.enableDragSelection({
            color: 'rgba(0, 255, 0, 0.1)'
        });
    }

    $('#btn').click(function(){
		wavesurfer.playPause();
	});

	// Report errors
	wavesurfer.on('error', function (err) {
    	console.error(err);
	});

	// Do something when the clip is over
	wavesurfer.on('finish', function () {
	});

	/* Progress bar */

    var progressDiv = document.querySelector('#progress-bar');
    var progressBar = progressDiv.querySelector('.progress-bar');

    var showProgress = function (percent) {
        progressDiv.style.display = 'block';
        progressBar.style.width = percent + '%';
    };

    var hideProgress = function () {
        progressDiv.style.display = 'none';
    };

    wavesurfer.on('loading', showProgress);
    wavesurfer.on('ready', hideProgress);
    wavesurfer.on('destroy', hideProgress);
    wavesurfer.on('error', hideProgress);

}




function createWave1() {
	var loopthis;
	// Init & load audio file
    var options = {
        container     : document.querySelector('#wave1'),
		waveColor     : '#545454',
        progressColor : '#FF6600',
        cursorColor   : '#FF6600'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    // Init
    wavesurfer1.init(options);

    // Regions
    if (wavesurfer1.enableDragSelection) {
        wavesurfer1.enableDragSelection({
            color: 'rgba(0, 255, 0, 0.1)'
        });
    }

    $('#btn1').click(function(){
		wavesurfer1.playPause();
	});

	// Report errors
	wavesurfer1.on('error', function (err) {
    	console.error(err);
	});

	// Do something when the clip is over
	wavesurfer1.on('finish', function () {
    	console.log('Finished playing');
	});

	/* Progress bar */

    var progressDiv = document.querySelector('#progress-bar1');
    var progressBar = progressDiv.querySelector('.progress-bar1');

    var showProgress = function (percent) {
        progressDiv.style.display = 'block';
        progressBar.style.width = percent + '%';
    };

    var hideProgress = function () {
        progressDiv.style.display = 'none';
    };

    wavesurfer1.on('loading', showProgress);
    wavesurfer1.on('ready', hideProgress);
    wavesurfer1.on('destroy', hideProgress);
    wavesurfer1.on('error', hideProgress);
}


function initSliders() {
	$("#volume1").slider({
		orientation: "vertical",
      	range: "min",
      	min: 0,
      	max: 100,
      	value: 100,
      	slide: function( event, ui ) {
        	wavesurfer.setVolume( ui.value/100 );
      	}
	});

	$("#volume2").slider({
		orientation: "vertical",
      	range: "min",
      	min: 0,
      	max: 100,
      	value: 100,
      	slide: function( event, ui ) {
        	wavesurfer1.setVolume( ui.value/100 );
      	}
	});

	$("#volumeBoth").slider({
		orientation: "horizontal",
		range: "min",
		min: 0,
		max: 100,
		value: 50,
		slide: function( event, ui ) {
			var volumeBefore = ui.value;

			if(volumeBefore == 100) {
				wavesurfer1.play();
			}
			if(volumeBefore == 0) {
				wavesurfer.play();
			}

			if(volumeBefore > 49){
				wavesurfer1.setVolume(1.0);
				$("#volume2").slider("value", 100);

				wavesurfer.setVolume((100 - ((volumeBefore-50)*2)) /100);
				$("#volume1").slider("value", (100 - ((volumeBefore-50)*2)));
			}
			else{
				wavesurfer.setVolume(1.0);
				$("#volume1").slider("value", 100);

				wavesurfer1.setVolume(((volumeBefore*2)) /100);
				$("#volume2").slider('value', ((volumeBefore*2)));
			}
      	}
	});
}
