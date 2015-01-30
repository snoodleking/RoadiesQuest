#pragma strict

function Start ()
{
	if ( !PlayerPrefs.GetInt( "annaSaved" ) )
	{
		Destroy( this.gameObject );
	}
}