#pragma strict

var isOneShot:boolean;
var dialogueTriggerName:String;
var dialogueTriggerValue:int;
var isInputReceived:boolean = false;
var dialogue:String[];
var iterator:int = 0;
var textMesh:tk2dTextMesh;
var speed:float;
var isDialogueComplete:boolean = true;


function Start()
{
	if ( !( PlayerPrefs.GetInt( dialogueTriggerName ) == dialogueTriggerValue ) )
	{
		Destroy( this.gameObject );
	}
	showDialogue( dialogue[iterator] );
}

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
			
			if ( hit.collider.gameObject.transform.tag == "continueDialogue" )
            {
            	if ( iterator == dialogue.Length - 1 && isDialogueComplete )
            	{
            		if ( isOneShot )
            		{
            			PlayerPrefs.SetInt( dialogueTriggerName, (dialogueTriggerValue == 1 ? 0:1 ) );
            		}
            		Destroy( this.gameObject );
            	} else if ( !isDialogueComplete )
            	{
            		textMesh.text = dialogue[iterator];
            		isDialogueComplete = true;
            		textMesh.Commit();
            	} else
            	{
            		print( "hello?" );
            		showDialogue( dialogue[++iterator] );
            	}
            }
		}
	}
	
	if ( Input.touchCount == 0 )
	{
		isInputReceived = false;
	}
}

function showDialogue( tDialogue:String )
{
	isDialogueComplete = false;
	var tempChars:char[];
	var tempString:String = "";
	textMesh.text = tempString;
	textMesh.Commit();
	
	tempChars = tDialogue.ToCharArray();
	
	for ( var tempChar:char in tempChars )
	{
		if ( isDialogueComplete )
		{
			return;
		}
		tempString += tempChar;
		textMesh.text = tempString;
		textMesh.Commit();
		yield WaitForSeconds( speed );
	}
	
	isDialogueComplete = true;
}