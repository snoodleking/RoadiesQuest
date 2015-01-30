#pragma strict

var ignoreDamage:boolean = false;
var controls:ControlsV2;
var scoreScript:ScoreScript;
var missed:boolean = false;
var isHurting:boolean = false;
var bounceNotesCollected:int = 0;

function OnTriggerStay( other:Collider )
{
	if ( other.gameObject.transform.tag == "bounceNote" )
	{
		Destroy( other.gameObject );
		bounceNotesCollected++;
		print( bounceNotesCollected );
	}
	
	if ( other.gameObject.GetComponent( "DamageOnContact" ) && !isHurting )
	{
	//	print( "Entering the gas" );
	//	print( "ignoreDamage? " + ignoreDamage );
		if ( other.gameObject.tag == "Spaceship" )
		{
			if( controls.isSliding )
			{
				//print( "uhhh" );
				ignoreDamage = true;
			}
		}
		
		if ( other.gameObject.tag == "Lava" )
		{
			if ( !controls.controller.isGrounded )
			{
				ignoreDamage = true;
			}
		}
		
		if ( !ignoreDamage && !isHurting )
		{
			missed = true;
			controls.hurt();
			isHurting = true;
			scoreScript.reset();
		}
	}
}

function OnTriggerExit( other:Collider )
{
	if ( !missed )
	{
		if ( other.gameObject.tag == "Spaceship" || other.gameObject.tag == "Lava" )
		{
			print( "sorlCleared: score increase" );
			scoreScript.increase();
		}
	}
	
	ignoreDamage = false;
	missed = false;
}