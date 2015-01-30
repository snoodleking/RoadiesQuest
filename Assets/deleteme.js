#pragma strict

var mySwitch:boolean = false;


function Update ()
{
	while ( !mySwitch )
	{
		mySwitch = true;
		checkForPauses();
	}
}

function checkForPauses()
{
	var gameObjects:GameObject[];
	gameObjects = GameObject.FindGameObjectsWithTag( "Pause" );
	
	for ( var i:int = 0; i < gameObjects.Length; i++ )
	{
		print( "Pause tag found on: " + gameObjects[i].transform.name );
	}
}