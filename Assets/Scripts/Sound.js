#pragma strict

var clipVolume:float;

@SerializeField
var clipSource:AudioSource;

@SerializeField
private var songSource:AudioSource;

@SerializeField
private var song:AudioClip;

@SerializeField
var notes:AudioClip[];

private var songStartTime:float;

@SerializeField
private var chordTimes:float[];
@SerializeField
private var chords:String[];

private var chordIndex:int = 0;
private var numChords:int;

function Awake()
{
	print( "sound script initialized" );
	numChords = chordTimes.Length;
}

function startSong()
{
	print( "The song should start to play." );
	songStartTime = Time.time;
	songSource.PlayOneShot( song );
	print( "The time is " + songStartTime );
}

function playSound()
{
	if ( clipSource.isPlaying )
		clipSource.Stop();
	clipSource.PlayOneShot( selectClip(), clipVolume );
}

function selectClip()
{
	var goodNotes:AudioClip[];
	goodNotes = whatNotes();
	return goodNotes[ Random.Range( 0, goodNotes.Length ) ];
}

function getChord()
{
	var currentTime:float = Time.time - songStartTime;
	while ( chordIndex < chords.Length - 1 && currentTime > chordTimes[chordIndex + 1] )
	{
		//print( currentTime + " < " + chordTimes[chordIndex + 1] );
		//print ( "Incrementing chord thing." );
		chordIndex++;
	}
	
	print ( "Chord index at: " + chordIndex + " at " + currentTime );
	return chords[chordIndex];
}

function whatNotes()
{
	var chord:String = getChord();
	var tempNotes:AudioClip[];
	
	switch( chord )
	{
		case "E":
			tempNotes = new AudioClip[5];
			tempNotes[0] = notes[2];
			tempNotes[1] = notes[4];
			tempNotes[2] = notes[6];
			tempNotes[3] = notes[8];
			tempNotes[4] = notes[11];
			
			//print( "it's an E!" );
			return tempNotes;
		case "G":
			tempNotes = new AudioClip[6];
			tempNotes[0] = notes[2];
			tempNotes[1] = notes[4];
			tempNotes[2] = notes[7];
			tempNotes[3] = notes[9];
			tempNotes[4] = notes[11];
			tempNotes[5] = notes[6];
			//print( "it's a G!" );
			return tempNotes;
		case "D":
			tempNotes = new AudioClip[5];
			tempNotes[0] = notes[2];
			//print( "it's a D!" );
			return tempNotes;
	}
}