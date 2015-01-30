#pragma strict

function OnTriggerEnter ( other:Collider )
{
	print( "Triggered." );
	
	if ( other.transform.tag == "Slide" )
	{
		print( "SLIDE tag detected." );
	}
}