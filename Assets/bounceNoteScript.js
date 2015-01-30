#pragma strict

//randomly generate two bouncenotes with random xspeeds throughout the course of the level.
var songs:AudioClip[];
var spawnPosition:Vector3;
var note1:GameObject;
var note2:GameObject;
var noteObject:GameObject;
var songLength:float;
var note1Spawned:boolean = false;
var note2Spawned:boolean = false;
var randomTime1:float;
var randomTime2:float;
var randomSpeed1:float;
var randomSpeed2:float;
var note2Destroyed:boolean = false;
var speedMin:float;
var speedMax:float;

function Awake ()
{
	switch ( PlayerPrefs.GetString( "activeLevel" ) )
	{
		case "indian":
			songLength = 300;
			break;
		case "ham":
			songLength = 320;
			break;
		case "white":
			songLength = 260;
			break;
		default:
			print( "Error! No blah blah on switch thing click on me you lazy fuck." );
			break;
	}
	
	randomTime1 = Random.Range( 10, songLength );
	randomTime2 = Random.Range( randomTime1, songLength );
	randomSpeed1 = Random.Range( speedMin, speedMax );
	randomSpeed2 = Random.Range( speedMin, speedMax );
}

function Update ()
{

	if ( Time.timeSinceLevelLoad > randomTime1 && !note1Spawned )
	{
		note1 = Instantiate ( noteObject, spawnPosition, Quaternion.identity );
		note1Spawned = true;
	}
	
	if ( Time.timeSinceLevelLoad > randomTime2 && !note2Spawned )
	{
		note2 = Instantiate ( noteObject, spawnPosition, Quaternion.identity );
		note2Spawned = true;
		Destroy( noteObject );
	}
	
	if ( note1 )
	{
		note1.transform.Translate( Time.deltaTime * -randomSpeed1, 0, 0 );
		if ( note1.transform.position.x < -10 )
		{
			Destroy( note1 );
		}
	}
	
	if ( note2 )
	{
		note2.transform.Translate( Time.deltaTime * -randomSpeed2, 0, 0 );
		if ( note2.transform.position.x < -10 )
		{
			Destroy( note2 );
		}
	}
}

function setRandoms()
{
	print ( songLength );
	randomTime1 = 5;
	randomTime2 = 10;
	randomSpeed1 = 4;
	randomSpeed2 = 8;
}