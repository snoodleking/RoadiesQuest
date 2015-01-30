#pragma strict

function Start ()
{
	if ( PlayerPrefs.GetInt( "isIndianLandUnlocked" ) )
	{
		Destroy( this.gameObject );
	}
}

function Update () {

}