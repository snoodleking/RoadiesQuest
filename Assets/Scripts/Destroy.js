#pragma strict
@SerializeField
private var killer:String;
private var anim:Animation;

function OnTriggerEnter( other:Collider )
{
	print( "collision..." );
	print( other.transform.tag );
	if ( other.transform.tag == killer )
	{
		print( "KILL ME" );
		Destroy( this.gameObject );
	}
}