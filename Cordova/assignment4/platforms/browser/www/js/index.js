//===============================================
// Example 14.1
// JavaScript source: index.js
//===============================================

//Create the media object that will be the focus of our efforts
//in this application
var theMedia;
//The application sets up a timer so the screen can be regularly
//updated during playback
var theTimer;
// var firstRun;

//Some constants that define the media file we'll be working with

// set default fileName
var assetsLocation = "assets/";
var fileName = assetsLocation + "Alma Mater Piano.mp3";

//Some text strings used by the app
var alertTitle = "Media";
var alertBtn = "Continue";
var secondsStr = ' seconds';
var unknownStr = "-";

var currentLyric;
var lyrics = [
  { time: 0, lyric: "[Introduction]"},
  { time: 8, lyric: "We have gained wisdom and honor" },
  { time: 12, lyric: "From our home of green and gray" },
  { time: 17, lyric: "We will go forth and remember" },
  { time: 21, lyric: "All we've learned along the way" },
  { time: 25, lyric: "And with knowledge and compassion" },
  { time: 29, lyric: "We will build communities" },
  { time: 35, lyric: "Leading by example" },
  { time: 38, lyric: "And with dignity" },
  { time: 42, lyric: "Georgia Gwinnett, we'll never forget" },
  { time: 51, lyric: "How we have grown, and those that we've met" },
  { time: 59, lyric: "Georgia Gwinnett, with love and respect" },
  { time: 67, lyric: "Our alma mater, Georgia Gwinnett" },
  { time: 75, lyric: "Out alma mater, Georgia Gwinnett" },
]

function onBodyLoad() {
  //Set the Cordova deviceready event listener, so we'll know
  //when Cordova is ready
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  // console.log("Entering onDeviceReady");

  //Build the local file path the application will use to access the
  if (device.platform == "Android") {
    //media file. First get the current page path
    var thePath = window.location.pathname;
    //whack off the index.html at the end
    thePath = thePath.substr(thePath, thePath.length - 10);
    //Build a file path using what you have so far
    localFile = 'file://' + thePath + fileName;

    console.log("Local file: " + localFile);

  } else {
    //iOS will search for files, so we can just pass in
    //a file name and it will look in the apps fol
    localFile = fileName;
  }
  // console.log("Local file: " + localFile);

  //Initialize the media object with information about the local file
  //The user can switch this to the remote file using the radio buttons
  //on the page
  initMediaObject();

  // console.log("Leaving onDeviceReady");
}



function initMediaObject() {
  var theFile = localFile;
  // console.log("Entering initMediaObject");

  //If we have a timer active, then we're playing something,
  //better kill it before we do anything else
  if (theTimer) {
    // console.log("Something's already playing");
    //Kill the current play
    doStop();
  }

  //Do we have an existing media object?
  if (theMedia) {
    // console.log("Removing existing media object");
    //then release the OS resources being used by it
    theMedia.release();
    //Then kill it
    theMedia = null;
  
    theFile = localFile;
  }
  // console.log('Using: ' + theFile);

  //Create the media object we need to do everything we need here
  // console.log("Creating media object");

  theMedia = new Media(theFile, mediaSuccess, mediaError, mediaStatus);
  // console.log("Media: " + JSON.stringify(theMedia));

  //Write the file name to the page
  $('#fileName').html(theFile);
  //Won't be able to determine anything else until the file
  //starts playing

  // set to default values initially
  $('#fileLen').html(unknownStr);
  $('#filePos').html(unknownStr);
  $("#topLyric").html(unknownStr);
  $("#middleLyric").html(unknownStr);
  $("#bottomLyric").html(unknownStr);
  $("#statRes").html(unknownStr);

  //Boolean variable that is used to control initial setup
  //of the page after play begins
  firstRun = true;

  // console.log("Leaving initMediaObject");
}

function mediaSuccess() {
  //Executed when the media file is finished playing
  // console.log("Entering mediaSuccess");
  //Kill the timer we were using to update the page
  killTimer();
  //Write the current position to the page
  $('#filePos').html('-');
  updateUI();
  //Clear out the progress bar
  // $('#progress-bar').val(0);
  // $('#progress-bar').slider('refresh');
  // console.log("Leaving mediaSuccess");
}

function mediaError(errObj) {
  console.error("Entering mediaError");
  console.error(JSON.stringify(errObj));
  //Kill the timer we were using to update the page
  killTimer();
  //Let the user know what happened
  var errStr;
  //Had to add this because some of the error conditions I encountered
  //did not provide an message value
  if (errObj.message.length > 0) {
    errStr = errObj.message + " (Code: " + errObj.code + ")";
  } else {
    errStr = "Error code: " + errObj.code + " (No error message provided by the Media API)";
  }
  console.error(errStr);
  navigator.notification.alert(errStr, null, "Media Error", alertBtn);
  console.error("Leaving mediaError");
}

function mediaStatus(statusCode) {
  // console.log("Entering mediaStatus");
  var theStatus;
  switch (statusCode) {
    case Media.MEDIA_NONE:
      theStatus = "None";
      break;
    case Media.MEDIA_STARTING:
      theStatus = "-";
      break;
    case Media.MEDIA_RUNNING:
      theStatus = "Running";
      break;
    case Media.MEDIA_PAUSED:
      theStatus = "Paused";
      break;
    case Media.MEDIA_STOPPED:
      theStatus = "-";
      break;
    default:
      theStatus = "-";
  }
  // console.log("Status: " + statusCode + " " + theStatus);
   $('#statRes').html(theStatus);
  // console.log("Leaving mediaStatus");
}

function doPlay() {
  // console.log("Entering doPlay");
  if (!theTimer) {
    //Start the media file playing

    theMedia.play();
    //fire off a timer to update the UI every second as it plays
    theTimer = setInterval(updateUI, 1000);
  } else {
    // console.log("Already playing");
    navigator.notification.alert("Media file already playing", null, alertTitle, alertBtn);
  }
  // console.log("Leaving doPlay");
}

function doPause() {
  // console.log("Entering doPause");
  if (theTimer) {
    //Kill the timer we were using to update the page
    killTimer();
    //Pause media play
    theMedia.pause();
    //Write the current position to the page
    // $('#filePos').html('Paused');
  } else {
    // console.log("nothing playing");
    navigator.notification.alert("No media file playing", null, alertTitle, alertBtn);
  }
  // console.log("Leaving doPause");
}

function doStop() {
  // console.log("Entering doStop");
  if (theTimer) {
    //Kill the timer we have running
    killTimer();
    //Then stop playing the audio clip
    theMedia.stop();
    //Write the current position to the page
    $('#filePos').html('-');
  } else {
    // console.log("Media object is null");
    navigator.notification.alert("Can't stop, no media file playing", null, alertTitle, alertBtn);
  }

  resetLyrics();

  // console.log("Leaving doStop");
}

function doSeek() {
  // console.log("Entering doSeek");
  //We're getting seconds from the form, need to multiply by
  //1000 to convert to the milliseconds that seekTo requires
  var seekVal = $('#seekInp').val() * 1000;
  // console.log("Seeking to " + seekVal + secondsStr);
  //Seek to that position
  theMedia.seekTo(seekVal);
  // console.log("Leaving doSeek");
}

function setMuteStatus(muteStatus) {
  if (muteStatus) {
    theMedia.setVolume('0.0');
  } else {
    theMedia.setVolume('1.0');
  }
}

function killTimer() {
  // console.log("Entering killTimer");
  if (theTimer) {
    //Kill the timer that was being used to update the page
    window.clearInterval(theTimer);
    //Set the timer to null, so we can check its status later
    theTimer = null;
  } else {
    console.error('Nothing to do, no timer active');
  }
  // console.log("Leaving killTimer");
}

function updateUI() {
  //The timer has fired, so it's time to update the page
  // console.log("Entering updateUI");
  //Figure out where we are in the file, result will be available
  //in the callback function, that's where the page gets updated
  theMedia.getCurrentPosition(getPositionSuccess, mediaError);
  // console.log("Leaving updateUI");
}

function getPositionSuccess(filePos) {

  var thePos;

  // console.log("Entering getPositionSuccess");
  // console.log("Position: " + filePos);
  if (filePos > 0) {
    //figure out how long the file is
    var theDur = theMedia.getDuration();
    //Do we know the duration?
    if (theDur > 0) {

      //Round the length to the previous integer
      var theLen = Math.round(theDur);

      //If this is the first time we've updated the UI
  
        //No need to do this more than once
        //reset the firstRun value
        firstRun = false;
        //Write the file length to the page
        $('#fileLen').html(theLen + secondsStr);
        //Set the maximum value for the Seek input
        $("#spinInp").attr('max', theLen);
      

      //Write the current position to the page
      $('#filePos').html(Math.floor(filePos) + secondsStr);

      // update the lyrics display on screen, passing in the current position
      updateLyricsDisplay(parseInt(Math.floor(filePos) + secondsStr));

      //Just in case filePos ever goes beyond file length
      //It shouldn't, but who knows...
      if (theLen > filePos) {
        //Calculate the percentage we've completed
        thePos = Math.floor((filePos / theLen) * 100);
      } else {
        //All done, go to 100%
        thePos = 100;
      }
      //Update the progress bar
      // console.log('Position: ' + thePos + '%');
      $('#progress-bar').val(thePos);
    } else {
      //otherwise, we don't know how long the file is
      $('#fileLen').html('-');
    }
  } else {
    $('#filePos').html('-');
    $('#progress-bar').val(0);
  }
  $('#progress-bar').slider('refresh');
  // console.log("Leaving getPositionSuccess");
}

function resetLyrics() {
  $("#topLyric").html(unknownStr);
  $("#middleLyric").html(unknownStr);
  $("#bottomLyric").html(unknownStr);
  $("#filePos").html(unknownStr);
  $("#fileLen").html(unknownStr);
  $("#statRes").html(unknownStr);
}

function updateSoundtrackSelection(newSoundtrackFileName) {

  if (theTimer) {
    doStop();
  }  

  resetLyrics();

  fileName = assetsLocation + newSoundtrackFileName;

  //Build the local file path the application will use to access the
  if (device.platform == "Android") {
    //media file. First get the current page path
    var thePath = window.location.pathname;
    //whack off the index.html at the end
    thePath = thePath.substr(thePath, thePath.length - 10);
    //Build a file path using what you have so far
    localFile = 'file://' + thePath + fileName;

    // console.log("Local file: " + localFile);

  } else {
    //iOS will search for files, so we can just pass in
    //a file name and it will look in the apps fol
    localFile = fileName;
  }
  // console.log("Local file: " + localFile);

  //Initialize the media object with information about the local file
  //The user can switch this to the remote file using the radio buttons
  //on the page
  initMediaObject();

  // $("#test").html(newSoundtrackFileName);
}

function updateLyricsDisplay(currentSeconds) {
  for (var index = 0; index < lyrics.length; index++) {

    if (currentSeconds >= lyrics[index].time) {

      // update current lyric
      currentLyric = lyrics[index];

      // update middle lyric display on index.html
      $('#middleLyric').html(currentLyric.lyric);

      if (index + 1 < lyrics.length) {

        // set bottom lyric to the next lyric
        $("#bottomLyric").html(lyrics[index + 1].lyric);

        // set top lyric to the current lyric when applicable
        if (lyrics[index + 1].time <= currentSeconds) {
          $("#topLyric").html(currentLyric.lyric);
        }

      } else {
        
        // set bottom lyric to default when there's no next lyric
        $("#bottomLyric").html(unknownStr);

      }

      // console.log("middle lyric changed to " + lyrics[index].lyric + "!");
    }
  }
}
