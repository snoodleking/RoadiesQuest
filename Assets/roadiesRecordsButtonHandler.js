#pragma strict

var audioSource:AudioSource;
var activeClip:AudioClip;
var audioClips:AudioClip[];
var songColorBGs:tk2dSprite[];
var spriteTags:String[];
var recordPlayerUI:GameObject;
var indianNotes:String[];
var hamNotes:String[];
var whiteNotes:String[];
var noteStrings:String[];
var noteDisplay:tk2dTextMesh;

var isInputReceived:boolean = false;

function Awake()
{
	spriteTags = new String[3];
	spriteTags[0] = "rd_UI";
	spriteTags[1] = "blue_lt_UI";
	spriteTags[2] = "blue_UI";
	activeClip = audioClips[0];
	setNotes( indianNotes, PlayerPrefs.GetInt( "indianNotesUnlocked" ) );
	noteDisplay.text = noteStrings[0];
	noteDisplay.Commit();
}

function Update ()
{

	if ( Input.touchCount == 1 && !isInputReceived )
	{
		isInputReceived = true;		
		var cursorRay:Ray = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );
        var hit:RaycastHit;
		var touchTrigger:boolean = false;
		
		if( Physics.Raycast( cursorRay, hit, 1000.0f ) && recordPlayerUI.active ) 
		{
			print( hit.collider.gameObject.transform.tag );
			
			if ( hit.collider.gameObject.transform.tag == "Previous" )
            {
            	previousSong();
            } else if ( hit.collider.gameObject.transform.tag == "Next" )
            {
            	nextSong();
            } else if ( hit.collider.gameObject.transform.tag == "Play" )
            {
            	if ( ( activeClip.name == "03 Indian Land" && PlayerPrefs.GetInt( "isIndianLandUnlocked" ) )
            		|| ( activeClip.name == "02 Ham On Rye" && PlayerPrefs.GetInt( "isHamOnRyeUnlocked" ) )
            		|| ( activeClip.name == "04 White Light" && PlayerPrefs.GetInt( "isWhiteLightUnlocked" ) ) )
            		{
            			audioSource.clip = activeClip;
            			audioSource.pitch = 1;
            			audioSource.Play();
            		}
            } else if ( hit.collider.gameObject.transform.tag == "Stop" )
            {
            	audioSource.Stop();
            }
            else if ( hit.collider.gameObject.transform.tag == "note1" )
            {
            	noteDisplay.text = noteStrings[0];
            	noteDisplay.Commit();
            }else if ( hit.collider.gameObject.transform.tag == "note2" )
            {
            	noteDisplay.text = noteStrings[1];
            	noteDisplay.Commit();
            }else if ( hit.collider.gameObject.transform.tag == "note3" )
            {
            	noteDisplay.text = noteStrings[2];
            	noteDisplay.Commit();
            }else if ( hit.collider.gameObject.transform.tag == "note4" )
            {
            	noteDisplay.text = noteStrings[3];
            	noteDisplay.Commit();
            }else if ( hit.collider.gameObject.transform.tag == "note5" )
            {
            	noteDisplay.text = noteStrings[4];
            	noteDisplay.Commit();
            }
		}
	}
	
	if ( Input.touchCount == 0 )
	{
		isInputReceived = false;
	}
}

function previousSong()
{
	var tempString:String = spriteTags[0];
	spriteTags[0] = spriteTags[1];
	spriteTags[1] = spriteTags[2];
	spriteTags[2] = tempString;
	applySprites();
}

function nextSong()
{
	var tempString:String = spriteTags[2];
	spriteTags[2] = spriteTags[1];
	spriteTags[1] = spriteTags[0];
	spriteTags[0] = tempString;
	applySprites();
}

function applySprites()
{
	for ( var i:int = 0; i < 3; i++ )
	{
		print ( i + spriteTags[i] );
		songColorBGs[i].SetSprite( spriteTags[i] );
		if ( spriteTags[i] == "rd_UI" )
		{
			activeClip = audioClips[i];
		}
	}
	
	switch ( activeClip.name )
	{
		case "03 Indian Land":
			setNotes( indianNotes, PlayerPrefs.GetInt( "indianNotesUnlocked" ) );
			break;
		case "02 Ham On Rye":
			setNotes( hamNotes, PlayerPrefs.GetInt( "hamNotesUnlocked" ) );
			break;
		case "04 White Light":
			setNotes( whiteNotes, PlayerPrefs.GetInt( "whiteNotesUnlocked" ) );
			break;
		default:
			print ( "activeClip.name switch failed" );
			break;
	}
	
	noteDisplay.text = noteStrings[0];
	noteDisplay.Commit();
}

function setNotes( tNotes:String[], tNumber:int )
{
	for ( var i:int = 0; i < 5; i++ )
	{
		if ( i < tNumber )
		{
			noteStrings[i] = tNotes[i];
		} else
		{
			noteStrings[i] = randomText() + i;
		}
	}
}

function randomText()
{
	var tempString:String = "#83k4n4k3\nKrNBIA#*5j\nKN#~)@";
	return tempString;
}