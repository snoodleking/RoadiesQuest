#pragma strict

var scoreboard:GameObject;
var gameData:GameData;
var isInputReceived:boolean = false;
var saveCoins:boolean = false;
var levelScore:ScoreScript;
var scoreui:ScoreUI_v2;

function Start()
{
	gameData = GameObject.FindGameObjectWithTag( "GameData" ).GetComponent( GameData );
}

function Update ()
{
	if ( Input.touchCount == 1 && !isInputReceived )
	{
		isInputReceived = true;		
		var cursorRay:Ray = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );
        var hit:RaycastHit;
		var touchTrigger:boolean = false;
		
		if( Physics.Raycast( cursorRay, hit, 1000.0f ) ) 
		{
			print( hit.collider.gameObject.transform.tag );
			
			if ( hit.collider.gameObject.transform.tag == "MainMenu" )
            {
            	gameData.LoadLevel( "roadiesRoom" );
            	unpause();
            } else if ( hit.collider.gameObject.transform.tag == "Retry" )
            {
            	if ( PlayerPrefs.GetString( "activeLevel" ) == "indian" )
            	{
            		gameData.LoadLevel( "Sandbox" );
            	} else if ( PlayerPrefs.GetString( "activeLevel" ) == "ham" )
            	{
            		gameData.LoadLevel( "hamOfRye" );
            	} else if ( PlayerPrefs.GetString( "activeLevel" ) == "white" )
            	{
            		gameData.LoadLevel( "whiteLight" );
            	}
            	unpause();
            } else if ( hit.collider.gameObject.transform.tag == "mil" )
            {
            	levelScore.score += 1000000;
            	levelScore.displayScore();
            } else if ( hit.collider.gameObject.transform.tag == "endLevel" )
            {
            	scoreboard.SetActive( true );
            	scoreui.showScoreScreen();
            }
		}
	}
	
	if ( Input.touchCount == 0 )
	{
		isInputReceived = false;
	}
}

function unpause()
{
	Time.timeScale = 1;
}