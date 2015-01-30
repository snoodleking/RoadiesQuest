#pragma strict
var gameData:GameData;

function Start ()
{
	gameData = GameObject.FindGameObjectWithTag( "GameData" ).GetComponent( "GameData" );
}

function Update ()
{
	if ( Input.touchCount == 1 )
	{		
		var cursorRay:Ray = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );
        var hit:RaycastHit;
		var touchTrigger:boolean = false;
		
		if( Physics.Raycast( cursorRay, hit, 1000.0f ) ) 
		{
			print( hit.collider.gameObject.transform.tag );
			if ( hit.collider.gameObject.transform.tag == "StartButton" )
            {
            	gameData.LoadLevel( "roadiesRoom" );
            }
		}
	}
}