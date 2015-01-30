#pragma strict


function Start ()
{
	resetPlayerPrefs();
}

function resetPlayerPrefs()
{
	if ( !PlayerPrefs.HasKey( "Initialized" ) )
	{
		PlayerPrefs.DeleteAll();
		PlayerPrefs.SetInt( "Initialized", 1 );
		
		PlayerPrefs.SetInt( "HighScore1", 0 );
		PlayerPrefs.SetInt( "HighScore2", 0 );
		PlayerPrefs.SetInt( "HighScore3", 0 );
		PlayerPrefs.SetInt( "CoinBank", 0 );
		
		PlayerPrefs.SetInt( "Song1Unlocked", 1 );
		PlayerPrefs.SetInt( "Song2Unlocked", 0 );
		PlayerPrefs.SetInt( "Song3Unlocked", 0 );
		PlayerPrefs.SetInt( "Song4Unlocked", 0 );
		PlayerPrefs.SetInt( "Song5Unlocked", 0 );
	}
}