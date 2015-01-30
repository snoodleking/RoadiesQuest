#pragma strict

function Start ()
{
	if ( !PlayerPrefs.GetInt( "annaSaved" ) )
	{
		Destroy( this.gameObject );
	} else
	{
		if ( !PlayerPrefs.HasKey( "annaTalks" ) )
		{
			PlayerPrefs.SetInt( "annaTalks", 1 );
		}
	}
}