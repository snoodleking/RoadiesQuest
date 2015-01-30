#pragma strict
var isInputReceived:boolean = false;
var gameData:GameData;
var controls:tutorialControls;
var tutorialDialogue:dialogueScript;
var tutorialContinue:BoxCollider;
var sequence:int = 0; // huge part here

function Start ()
{
	gameData = GameObject.FindGameObjectWithTag( "GameData" ).GetComponent( GameData );
	PlayerPrefs.SetInt( "tutorialMode", 0 );
}

function Update ()
{

	switch( sequence )
	{
		case 0:
			if ( tutorialDialogue.iterator == 0 && tutorialDialogue.isDialogueComplete )
			{
				tutorialContinue.enabled = false;
				sequence++;
			}
			break;
		case 1:
			if ( controls.isJumpPerformed )
			{
				tutorialContinue.enabled = true;
				sequence++;
			}
			break;
		case 2:
			if ( tutorialDialogue.iterator == 2 && tutorialDialogue.isDialogueComplete )
			{
				controls.isHoverLockedTutorial = false;
				tutorialContinue.enabled = false;
				sequence++;
			}
			break;
		case 3:
			if ( controls.isHoverPerformed )
			{
				tutorialContinue.enabled = true;
				sequence++;
			}
			break;
		case 4:
			if ( tutorialDialogue.iterator == 3 && tutorialDialogue.isDialogueComplete )
			{
				controls.isShieldLocked = false;
				controls.isJumpLocked = true;
				controls.isHoverLockedTutorial = true;
				tutorialContinue.enabled = false;
				sequence++;
			}
			break;
		case 5:
			if ( controls.isShieldPerformed )
			{
				tutorialContinue.enabled = true;
				sequence++;
			}
			break;
		case 6:
			if ( tutorialDialogue.iterator == 5 && tutorialDialogue.isDialogueComplete )
			{
				controls.isShieldLocked = true;
				controls.isSlideLocked = false;
				tutorialContinue.enabled = false;
				sequence++;
			}
			break;
		case 7:
			if ( controls.isSlidePerformed )
			{
				tutorialContinue.enabled = true;
				sequence++;
			}
			break;
		case 8:
			if ( tutorialDialogue.iterator == 7 && tutorialDialogue.isDialogueComplete )
			{
				controls.isSlideLocked = true;
				controls.isAttackLocked = false;
				tutorialContinue.enabled = false;
				sequence++;
			}
			break;
		case 9:
			if ( controls.isAttackPerformed )
			{
				tutorialContinue.enabled = true;
				sequence++;
			}
			break;
		case 10:
			if ( tutorialDialogue == null )
			{	
				sequence++;
				gameData.LoadLevel( "Sandbox" );
			}
			break;
		}
	


	if ( Input.touchCount == 1 && !isInputReceived )
	{
		isInputReceived = true;		
		var cursorRay:Ray = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );
        var hit:RaycastHit;
		var touchTrigger:boolean = false;
		
		if( Physics.Raycast( cursorRay, hit, 1000.0f ) ) 
		{
			print( hit.collider.gameObject.transform.tag );
			
			if ( hit.collider.gameObject.transform.tag == "tutSkip" )
            {
            	gameData.LoadLevel( "Sandbox" );
            }
		}
	}
	
	if ( Input.touchCount == 0 )
	{
		isInputReceived = false;
	}
}