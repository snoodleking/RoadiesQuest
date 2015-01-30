#pragma strict

var dialogueTriggerName:String;
var dialogueTriggerValue:int;

function Update()
{
	if ( PlayerPrefs.HasKey( dialogueTriggerName ) )
	{
		Destroy( this );
	}
	PlayerPrefs.SetInt( dialogueTriggerName, dialogueTriggerValue );
	Destroy( this );
}