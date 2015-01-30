#pragma strict
var score:ScoreScript;
var controller:CharacterController;

function Awake()
{
	controller = GameObject.FindGameObjectWithTag( "Roadie" ).GetComponent( CharacterController );
	score = GameObject.FindGameObjectWithTag("Roadie").GetComponent(ScoreScript);
}

function OnTriggerEnter ( other:Collider )
{
	print( "Triggered." );
	
	if ( other.transform.tag == "Gas" )
	{
		score.increase();
		Destroy( other.gameObject );
	}
	
	if ( other.transform.tag == "Lava" && controller.isGrounded )
	{
		print( "Shield touched LAVA OMGAOMGSDG" );
		Destroy( this.gameObject );
	}
}