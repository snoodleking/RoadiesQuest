#pragma strict

var ignoreDamage:boolean = false;
var controls:tutorialControls;
var missed:boolean = false;
var isHurting:boolean = false;

function OnTriggerStay( other:Collider )
{
	
	if ( other.gameObject.GetComponent( "DamageOnContact" ) && !isHurting )
	{
		print( "Entering the gas" );
		print( "ignoreDamage? " + ignoreDamage );
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
		}
	}
	
	ignoreDamage = false;
	missed = false;
}