#pragma strict

var debugUIs:GameObject[];
var selectSongScreen:GameObject;
var startSongScreen:GameObject;
var playingSongScreen:GameObject;
var resultsScreen:GameObject;

var audioSource:AudioSource;
var audioClips:AudioClip[];

var songPositionMesh:tk2dTextMesh;
var songTitleMesh:tk2dTextMesh;
var logTimeMesh:tk2dTextMesh;

private var isInputReceived:boolean;
private var tapTimes:String = "Text%20goes%20here!";
private var songStartTime:float;
private var songTime:float;
private var logTimes:float[];
private var logTimesDisplayString:String = "";
private var songStartPosition:float;
private var songStartPositionString:String;
private var songTitleString;

function Start ()
{
	audioSource.clip = audioClips[0];
	print ( "entering debug mode..." );
	//Application.OpenURL("mailto:DannyOnKeys@gmail.com?subject=hi!&body=Text%20goes%20here!");
	//mail.sendMessage( "Holy crap I'm sending this e-mail from unity! ELKAJELKJ" );
	
}

//Returns a button's tag name.
function getTouchButtonTag( tTouchPosition:Vector3 )
{
		var tempTag:String;
		var tempRay:Ray = Camera.main.ScreenPointToRay( tTouchPosition );
		var tempHit:RaycastHit;
		
		if ( Physics.Raycast( tempRay, tempHit, 1000.0f ) )
		{
			return tempHit.collider.gameObject.transform.tag;
		} else
		{
			return "-No Tag Found-";
		}
}

function activateOneItemInGroup( tActiveObject:GameObject, tActiveObjectGroup:GameObject[] )
{
	for ( var tempObject in tActiveObjectGroup  )
	{
		if ( tempObject == tActiveObject )
		{
			tempObject.SetActive( true );
		} else
		{
			tempObject.SetActive( false );
		}
	}
}

function setActiveClip( taSource:AudioSource, taClip:AudioClip, tSongTitle:String, tSongTitleMesh:tk2dTextMesh )
{
	taSource.clip = taClip;
	tSongTitleMesh.text = tSongTitle;
	tSongTitleMesh.Commit();
}

function logTime( tLogTimes:float[], tSongStartTime:float, tCurrentTime:float, tLogTimesDisplayString:String, tLogTimeMesh:tk2dTextMesh )
{
	var tempLength:int = tLogTimes.Length + 1;
	var tempLogTimes:float[];
	var tempLogTimesForDisplay:float[];
	tempLogTimesForDisplay = new float[3];
	var tempIndex:int = 0;
	
	tempLogTimes = new float[ tempLength ];
	
	for ( var i:int = 0; i < tempLength; i++ )
	{
		if ( i < tLogTimes.Length )
		{
			tempLogTimes[i] = tLogTimes[i];
		} else
		{
			tempLogTimes[i] = tCurrentTime - tSongStartTime;
		}
		
		if ( i >= tempLogTimes.Length - 3 )
		{
			tempLogTimesForDisplay[tempIndex++] = tempLogTimes[i];
		}
	}
	
	logTimes = tempLogTimes;
	
	updateLogTimeDisplay( tempLogTimesForDisplay, tLogTimesDisplayString, tLogTimeMesh );
}

function formatText( tTimes:float[] )
{
	var tempString:String = "";
	var tempLength:int = tTimes.Length;
	
	tempString = songStartPositionString + songTitleString;
	print( tempString );
	
	for ( var i:int = 0; i < tempLength; i++ )
	{
		tempString += i + "%5D%20" + formatTime( tTimes[i] );
		
		if ( i != tempLength - 1 )
		{
			tempString += "%0A";
		}
	}
	
	print( tempString );
	
	return tempString;
}

function formatTime( tTime:float )
{
	var tempString:String = "";
	var tempInt:int;
	var tempInt2:int;
	
	tempInt = tTime;
	tempInt2 = tTime;
	
	//float is TOTAL SECONDS.MILIS
	//MINUTES : SECONDS : MILIS
	tempString += "" + ( tempInt / 60 ) + "%3A";
	tempInt = ( tempInt % 60 );
	tempString += ( ( tempInt < 10 ) ? "0":"" ) + tempInt + ".";
	
	tTime -= tempInt2;
	tempInt = ( tTime * 1000 );
	tempString += "" + tempInt;
	return tempString;
}

function updateLogTimeDisplay( tLogTimes:float[], tLogTimesDisplayString:String, tLogTimeMesh:tk2dTextMesh )
{
	tLogTimesDisplayString = "LOG TIMES\n====\n\n";
	var tempLength:int = tLogTimes.Length;
	
	for ( var i:int = 0; i < tempLength; i++ )
	{
		tLogTimesDisplayString += "" + tLogTimes[i];
		
		if ( i != tempLength - 1 )
		{
			tLogTimesDisplayString += "\n\n";
		}
	}
	
	tLogTimeMesh.text = tLogTimesDisplayString;
	tLogTimeMesh.Commit();
}

function playSong()
{
	songStartTime = Time.time;
	audioSource.time = songStartPosition;
	audioSource.Play();
	logTimes = new float[0];
	activateOneItemInGroup( playingSongScreen, debugUIs );
}

function Update()
{

		//If we touch a button
		if ( Input.touchCount == 1 && !isInputReceived )
		{
			var touch:Touch;
			touch = Input.GetTouch( 0 );
			isInputReceived = true;

			print( getTouchButtonTag( touch.position ) );			
			switch ( getTouchButtonTag( touch.position ) )
			{
				case "-No Tag Found-":
					print( "No tag found for button touch." );
					break;
					
				case "IndianLand":
					print( "Tag found: IndianLand" );
					songTitleString = "Indian%20Land%0A%0A";
					setActiveClip( audioSource, audioClips[0], "INDIAN LAND", songTitleMesh );
					break;
					
				case "HamOnRye":
					print( "Tag found: HamOnRye" );
					songTitleString = "Ham%20On%20Rye%0A%0A";
					setActiveClip( audioSource, audioClips[1], "HAM ON RYE", songTitleMesh );
					break;
					
				case "WhiteLight":
					print( "Tag found: WhiteLight" );
					songTitleString = "White%20Light%0A%0A";
					setActiveClip( audioSource, audioClips[2], "WHITE LIGHT", songTitleMesh );
					break;
				
				case "Confirm":
					print( "Activating: StartSongScreen" );
					activateOneItemInGroup( startSongScreen, debugUIs );
					break;
				
				case "Play":
					print( "Activating: PlayingSongScreen" );
					playSong();
					break;
				
				case "Stop":
					print( "Activating: ResultsScreen" );
					audioSource.Stop();
					activateOneItemInGroup( resultsScreen, debugUIs );
					break;
					
				case "Return":
					print( "Activating: SelectSongScreen" );
					activateOneItemInGroup( selectSongScreen, debugUIs );
					break;
					
				case "SendEmail":
					print( "this shoudl opent the thing to emial" );
					emailMessage( "dannyonkeys@gmail.com", formatText( logTimes ) );
					break;
				
				case "LogTime":
					logTime( logTimes, songStartTime, ( Time.time + songStartPosition ), logTimesDisplayString, logTimeMesh );
					break;
				
				case "Beginning":
					songStartPosition = 0;
					songPositionMesh.text = "BEGINNING";
					songStartPositionString = "From%20Beginning%20of%20";
					songPositionMesh.Commit();
					break;
				
				case "Quarter":
					songStartPosition = audioSource.clip.length / 4;
					songStartPositionString = "From%20Quarter%20of%20";
					songPositionMesh.text = "QUARTER";
					songPositionMesh.Commit();
					break;
				
				case "Middle":
					songStartPosition = audioSource.clip.length / 2;
					songStartPositionString = "From%20Middle%20of%20";
					songPositionMesh.text = "MIDDLE";
					songPositionMesh.Commit();
					break;
				
				case "ThreeQuarters":
					songStartPositionString = "From%20ThreeQuarters%20of%20";
					songStartPosition = audioSource.clip.length * 3 / 4;
					songPositionMesh.text = "THREE QUARTERS";
					songPositionMesh.Commit();
					break;
				
				default:
					print( "Error! Default case reached for a switch!" );
					break;
			}
		} else if ( isInputReceived && Input.touchCount == 0 )
		{		
			isInputReceived = false;
		}
}

function emailMessage( tAddress:String, tMessage:String )
{
	Application.OpenURL("mailto:" + tAddress + "?subject=hi!&body=" + tMessage );
	print( "emailmessage called" );
}




///////////////////////
//PSEUDO CODE BITCHES//
///////////////////////

			//...and it's from SONGSELECT
				//...update SONGDISPLAY
				//...set ACTIVECLIP to SELECTEDSONG.
			//...and it's the PLOTBUTTON
				//...take away the BUTTONS
				//...select STARTSONGAT
				//...start SELECTEDSONG
					//...accept and log times of TAPS since song played
					//...or delete them when an OOPS button is pressed
				//...stop SELECTEDSONG
					//...and display logs
					//...and offer to send an e-mail


