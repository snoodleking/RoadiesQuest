#pragma strict
var controller:ControlsV2;

function Awake()
{
	controller = GameObject.FindGameObjectWithTag( "Roadie" ).GetComponent( ControlsV2 );
}

function OnTriggerEnter( other:Collider )
{
	if ( other.gameObject.tag == "Roadie" )
	{
		if ( controller.isShielding && controller.controller.isGrounded )
		{
			print( "hey look you're touching lava" );
			controller.isShielding = false;
			controller.sound.stopShieldTone();
		}
	}
}