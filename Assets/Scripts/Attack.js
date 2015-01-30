#pragma strict
var scoreScript:ScoreScript;

function Start ()
{
	scoreScript = GameObject.FindWithTag("Roadie").GetComponent(ScoreScript);
}

function Update () {

}

function OnTriggerEnter ( other:Collider )
{
	//print( "Triggered." );
	
	if ( other.transform.tag == "Clam" )
	{
		other.gameObject.GetComponent ( BoxCollider ).enabled = false;
		this.gameObject.GetComponent ( BoxCollider ).enabled = false;
		this.gameObject.GetComponent ( MeshRenderer ).enabled = false;
		other.gameObject.GetComponent(AutoMove).autoMoveSpeed = 3;
		var tempAnim:tk2dAnimatedSprite = other.gameObject.GetComponent(tk2dAnimatedSprite);
		tempAnim.Play( "clamDeath" );
		scoreScript.increase();
		//print( "Double triggered!" );
		yield WaitForSeconds(0.4);
		Destroy( other.gameObject );
		//Destroy( this.gameObject );
	}
}