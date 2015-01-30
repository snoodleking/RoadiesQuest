#pragma strict

//TODO: Create "If you touch this object" function. if ( youTouch( "TheTeleporter" ) ) { do this }.

//Use touchTags for touchableTriggers

var tutorialYes:GameObject;
var tutorialNo:GameObject;
var isHandlingInput:boolean = false;
var touch:Touch;
var touchPosition:Vector3;
var targetX:float;
var weLikeToMoveItMoveIt:boolean;
var moveDirection:Vector3;
var speed:int;
var screenIsShifted:boolean = false;

var toggle: boolean = true;

function Awake()
{
	moveDirection.x *= speed;
}

function Update () 
{
	//After ( if means "after" ) the screen has shifted, after you touch the teleporter, the level starts.
		
	
	//Also, you can touch the other thing to open the music player.

	//if ( Input.anyKeyDown )
	//{
	//	print( "any key down" );
	//	print( "Hi!" );
	//	weLikeToMoveItMoveIt = true;
		
	//	if ( screenIsShifted )
	//	{
			//Application.LoadLevel( "Sandbox" );
	//	}
	//}

	//Log initial position of touch
	if ( Input.touchCount == 1 && !isHandlingInput )
	{
		print( "hello?" );
		touch = Input.GetTouch(0);
		touchPosition = touch.position;
		isHandlingInput = true;
		
		var cursorRay:Ray = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );
        var hit:RaycastHit;
		var touchTrigger:boolean = false;
		
		if ( screenIsShifted )
		{
			if( Physics.Raycast( cursorRay, hit, 1000.0f ) ) 
            {
            	print( hit.collider.gameObject.transform.tag );
            	if ( hit.collider.gameObject.transform.tag == "Teleporter" )
            	{
					touchTrigger = true;
            	} else if ( hit.collider.gameObject.transform.tag == "tutorialYes" )
            	{
            		PlayerPrefs.SetInt( "tutorialMode", 0 );
            		Application.LoadLevel( "tutorialScene" );
            	} else if ( hit.collider.gameObject.transform.tag == "tutorialNo" )
            	{
					PlayerPrefs.SetInt( "tutorialMode", 0 );
            		Application.LoadLevel( "Sandbox" );
            	}
            }
		
			if ( touchTrigger )
			{
				touchTrigger = false;
				if ( PlayerPrefs.GetInt( "tutorialMode" ) == 1 )
				{
					tutorialRequest();
				} else
				{
            		PlayerPrefs.SetInt( "tutorialMode", 0 );
					Application.LoadLevel( "Sandbox" );
				}
			}
		}
		
			cursorRay = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );

            if( !screenIsShifted ) 
            {
            	print( "uhhh" );
				weLikeToMoveItMoveIt = true;
				this.gameObject.renderer.enabled = false;

            }
	}
	
	print( "yes, I'm here" );
	if ( Input.touchCount == 0 && isHandlingInput )
	{
		print( "are you listening?" );
		isHandlingInput = false;
	}
	
	if ( weLikeToMoveItMoveIt )
	{
		if ( Camera.mainCamera.transform.position.x < targetX )
		{
			Camera.mainCamera.transform.Translate( moveDirection * Time.deltaTime );
		} else
		{
			weLikeToMoveItMoveIt = false;
			screenIsShifted = true;
		}
	}
}

function tutorialRequest()
{
	tutorialYes.SetActive( true );
	tutorialNo.SetActive( true );
}