#pragma strict

//Inspector variables
var isScoreScreenActivated:boolean = false;
var songIsOver:boolean = false;
var levelButtons:GameObject;
var isStartSong:boolean = false;
var scoreUI:ScoreUI_v2;
var levelScore:GameObject;
var scoreScreen:GameObject;
var songTime:float;
var isPaused:boolean = false;
var buttonHandler:levelButtonHandler;


@SerializeField
				private var clipVolume	: float;
@SerializeField
				private var clipSource	: AudioSource;
@SerializeField
				var songSource	: AudioSource;
@SerializeField
				private var shieldSource1	: AudioSource;
@SerializeField
				private var shieldSource2	: AudioSource;
@SerializeField
				private var song		: AudioClip;

@SerializeField
				private var attackNotes	: AudioClip[];
@SerializeField
				private var jumpNotes	: AudioClip[];
@SerializeField
				private var hoverNotes	: AudioClip[];
@SerializeField
				private var shieldNotes	: AudioClip[];
@SerializeField
				private var slideNotes	: AudioClip[];

@SerializeField
				private var chordTimes	: float[];
@SerializeField
				private var chords		: String[];
				
//Variables
private var	chordIndex		: int = 0;
private var numChords		: int;
private var songStartTime	: float;
private var E				: int[];
private var G				: int[];
private var D				: int[];
private var g				: int[];
private var b				: int[];
private var DM7				: int[];
private var A				: int[];
private var fs				: int[];
private var Eshield			: int[];
private var Gshield			: int[];
private var Dshield			: int[];
private var gshield			: int[];
private var bshield			: int[];
private var DM7shield		: int[];
private var Ashield			: int[];
private var fsshield		: int[];

function Awake()
{
	songSource.clip = song;
}

function fillChords()
{
	var i:int;
	var temp:int[];

	temp = new int[1];
	
	temp[0] = 8;
	Eshield = temp;
	temp[0] = 3;
	Gshield = temp;
	temp[0] = 4;
	Dshield = temp;
	temp[0] = 5;
	gshield = temp;
	temp[0] = 6;
	bshield = temp;
	temp[0] = 7;
	DM7shield = temp;
	temp[0] = 8;
	Ashield = temp;
	temp[0] = 9;
	fsshield = temp;
	
	//Populate chord arrays.
	temp = new int[1];
	temp[0] = 8;
	/*temp = new int[20];
	for ( i = 0; i < 20; i++ )
	{
		if ( i < 5 )
			temp[i] = 2;	
		else if ( i < 10 )
			temp[i] = 11;	
		else if ( i < 13 )
			temp[i] = 5;	
		else if ( i < 14 )
			temp[i] = 0;	
		else if ( i < 18 )
			temp[i] = 8;	
		else if ( i < 19 )
			temp[i] = 1;	
		else if ( i < 20 )
			temp[i] = 3;
		else
			temp[i] = 7;
	} */
	E = temp;
	 
	temp = new int[20];
	for ( i = 0; i < 20; i++ )
	{
		if ( i < 5 )
			temp[i] = 4;	
		else if ( i < 10 )
			temp[i] = 12;	
		else if ( i < 11 )
			temp[i] = 0;	
		else if ( i < 13 )
			temp[i] = 8;	
		else if ( i < 15 )
			temp[i] = 1;	
		else if ( i < 17 )
			temp[i] = 10;	
		else if ( i < 18 )
			temp[i] = 2;	
		else if ( i < 19 )
			temp[i] = 11;
		else if ( i < 20 )
			temp[i] = 6;
		else
			temp[i] = 3;
	}
	G = temp;
	 
	temp = new int[18];
	for ( i = 0; i < 18; i++ )
	{
		if ( i < 5 )
			temp[i] = 4;	
		else if ( i < 10 )
			temp[i] = 12;	
		else if ( i < 13 )
			temp[i] = 7;	
		else if ( i < 15 )
			temp[i] = 1;	
		else if ( i < 17 )
			temp[i] = 10;
		else
			temp[i] = 6;
	}
	g = temp;
	 
	temp = new int[19];
	for ( i = 0; i < 19; i++ )
	{
		if ( i < 5 )
			temp[i] = 0;	
		else if ( i < 10 )
			temp[i] = 8;	
		else if ( i < 12 )
			temp[i] = 1;	
		else if ( i < 13 )
			temp[i] = 10;	
		else if ( i < 17 )
			temp[i] = 3;	
		else if ( i < 18 )
			temp[i] = 6;
		else
			temp[i] = 2;
	}
	b = temp;
	 
	temp = new int[19];
	for ( i = 0; i < 19 ; i++ )
	{
		if ( i < 5 )
			temp[i] = 1;	
		else if ( i < 10 )
			temp[i] = 10;	
		else if ( i < 12 )
			temp[i] = 3;	
		else if ( i < 16 )
			temp[i] = 6;
		else
			temp[i] = 9;
	}
	DM7 = temp;
	 
	temp = new int[20];
	for ( i = 0; i < 20; i++ )
	{
		if ( i < 7 )
			temp[i] = 6;	
		else if ( i < 11 )
			temp[i] = 4;	
		else if ( i < 14 )
			temp[i] = 2;	
		else if ( i < 17 )
			temp[i] = 11;	
		else if ( i < 18 )
			temp[i] = 4;	
		else if ( i < 19 )
			temp[i] = 12;
		else
			temp[i] = 3;
	}
	A = temp;
	 
	temp = new int[17];
	for ( i = 0; i < 17; i++ )
	{
		if ( i < 6 )
			temp[i] = 3;	
		else if ( i < 10 )
			temp[i] = 6;	
		else if ( i < 15 )
			temp[i] = 9;	
		else if ( i < 16 )
			temp[i] = 2;
		else
			temp[i] = 11;
	}
	fs = temp;
	
	temp = new int[5];
	for ( i = 0; i <5; i++ )
	{
		temp[i] = 5;
	}
	D = temp;
}

function Start ()
{
	numChords = chords.Length;
	fillChords();
}

function startSong()
{
	//print( "startSong was called" );
	songStartTime = Time.time;
	songSource.Play();
	//print( songSource.clip.name );
	//print( songSource.isPlaying );
	//print( songSource.volume );
	isStartSong = true;
}

//Attack specific sound functions.
function playAttackSound()
{
	//print( "Playing an attack sound...." );
	playSound( attackNotes );
}
function playJumpSound()
{
	playSound( jumpNotes );
}
function playHoverSound()
{
	playSound( hoverNotes );
}
function playShieldSound()
{
	//i need to remember which sound
	playSound( shieldNotes );
}
function playSlideSound()
{
	playSound( slideNotes );
}

function playSound( notes:AudioClip[] )
{	
	if ( clipSource.isPlaying )
		clipSource.Stop();
		
	clipSource.PlayOneShot( notes[ selectClip() ], clipVolume );
}

function selectClip()
{
	var goodNotes:int[];
	goodNotes = whatNotes();
	return goodNotes[ Random.Range( 0, goodNotes.Length ) ];
}

function getChord()
{
	var currentTime:float = Time.time - songStartTime;
	
	while ( chordIndex < numChords - 1 && currentTime > chordTimes[chordIndex + 1] )
		chordIndex++;
	
	return chords[chordIndex];
}

function whatNotes()
{
	var chord:String = getChord();
	var tempNotes:int[];
	
	switch( chord )
	{
		case "E":
			return E;
		case "G":
			return G;
		case "g":
			return g;
		case "A":
			return A;
		case "DM7":
			return DM7;
		case "b":
			return b;
		case "fs":
			return fs;
		case "D":
			return D;
	}
}

function getShieldTone()
{
	return whatShieldNote();
}

function whatShieldNote()
{
	var chord:String = getChord();
	var tempNotes:int[];
	
	switch( chord )
	{
		case "E":
			return Eshield[ Random.Range( 0, Eshield.Length ) ];
		case "G":
			return Gshield[ Random.Range( 0, Gshield.Length ) ];
		case "g":
			return gshield[ Random.Range( 0, gshield.Length ) ];
		case "A":
			return Ashield[ Random.Range( 0, Ashield.Length ) ];
		case "DM7":
			return DM7shield[ Random.Range( 0, DM7shield.Length ) ];
		case "b":
			return bshield[ Random.Range( 0, bshield.Length ) ];
		case "fs":
			return fsshield[ Random.Range( 0, fsshield.Length ) ];
		case "D":
			return Dshield[ Random.Range( 0, Dshield.Length ) ];
	}
}

function playShieldTone( tIndex:int )
{
	if ( !shieldSource1.isPlaying )
	{
		shieldSource1.PlayOneShot( shieldNotes[tIndex] );
	} else
	{
		shieldSource2.PlayOneShot( shieldNotes[tIndex] );
	}
}

function stopShieldTone()
{
	shieldSource1.Stop();
	shieldSource2.Stop();
}

function pauseSong()
{
	if ( !isPaused )
	{
		print( songSource.time );
		songTime = songSource.time;
		print( songTime );
		songSource.Stop();
		isPaused = true;
	} else
	{
		//print( "PLAY Please" );
		songSource.time = songTime;
		songSource.Play();
		isPaused = false;
	}
}

//duncan commented this bit out so he can play the gamewithout seeing the score screen come up.
//it was a test to make sure that the screen was working.

function Update()
{
	
	if ( isStartSong && !songSource.isPlaying && !isPaused && !songIsOver )
	{
		songIsOver = true;
	} else if ( songIsOver && !songSource.isPlaying && !isScoreScreenActivated )
	{
			activateScoreScreen();
			isScoreScreenActivated = true;
	}
}

function activateScoreScreen()
{
	//buttonHandler.saveCoins = true;
	levelScore.SetActive( false );
	levelButtons.SetActive( true );
	scoreScreen.SetActive( true );
	scoreUI.showScoreScreen();
	isStartSong = false;
}
