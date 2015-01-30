#pragma strict
var debugActivated = false;
var source:AudioSource;
var isInputReceived:boolean = false;
var gameData:GameData;

function Update ()
{
	if ( Input.touchCount == 1 && !isInputReceived )
	{
		isInputReceived = true;		
		var cursorRay:Ray = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );
        var hit:RaycastHit;
		var touchTrigger:boolean = false;
		
		if( Physics.Raycast( cursorRay, hit, 1000.0f ) ) 
		{
			print( hit.collider.gameObject.transform.tag );
			
			if ( hit.collider.gameObject.transform.tag == "ResetPrefs" && !debugActivated )
            {
            	debugActivated = true;
				source.PlayOneShot( source.clip );
            	gameData.initializePrefs();
            } else if ( hit.collider.gameObject.transform.tag == "ResetPrefs" && debugActivated )
            {
				source.PlayOneShot( source.clip );
            	PlayerPrefs.SetInt( "debugMode", 1 );
            }
		}
	}
	
	if ( Input.touchCount == 0 )
	{
		isInputReceived = false;
	}
}