#pragma strict

var isHandlingInput:boolean = false;
var touchPosition:Vector3;
var touch:Touch;
var jukebox:GameObject;

function Start ()
{

}

function Update ()
{

	//Log initial position of touch.
	if ( Input.touchCount == 1 && !isHandlingInput )
	{
		touch = Input.GetTouch(0);
		touchPosition = touch.position;
		isHandlingInput = true;
		
			var cursorRay:Ray = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );
            var hit:RaycastHit;

            if( Physics.Raycast( cursorRay, hit, 1000.0f ) ) 
            {
            	if ( hit.collider.gameObject.transform.tag == "Jukebox" )
            	{
            		jukebox.SetActive( true );
            	}
          	}
          	
			if( Physics.Raycast( cursorRay, hit, 1000.0f ) ) 
            {
            	if ( hit.collider.gameObject.transform.tag == "Jukebox_close" )
            	{
            		jukebox.SetActive( false );
            	}
          	}
	}
	
	

	
	if ( Input.touchCount == 0 && isHandlingInput )
	{
		isHandlingInput = false;
	}

}


//If theUser.touches( theJukebox )
		// Display theJukebox.

