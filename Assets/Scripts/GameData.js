#pragma strict

var deletePlayerPrefs:boolean = false;
var fadeCurtain:tk2dSprite;
var fadeCurtainAlpha:int;
var isGameLoaded:boolean = false;
var loadNewLevel:boolean  =false;
var levelNumber:int;

function Awake()
{
	PlayerPrefs.DeleteKey( "debugMode" );
	fadeCurtainAlpha = 100;
	GameObject.DontDestroyOnLoad( this );
	
	if ( deletePlayerPrefs )
	{
		PlayerPrefs.DeleteAll();
	}
	
	if ( !PlayerPrefs.HasKey( "Initialized" ) )
	{
		PlayerPrefs.SetInt( "tutorialMode", 1 );
	
		PlayerPrefs.SetInt( "highScore1", 0 );
		PlayerPrefs.SetInt( "highScore2", 0 );
		PlayerPrefs.SetInt( "highScore3", 0 );
		
		PlayerPrefs.SetInt( "coinBank", 100 );
		PlayerPrefs.SetInt( "isIndianLandUnlocked", 0 );
		PlayerPrefs.SetInt( "indianNotesUnlocked", 0 );
		PlayerPrefs.SetInt( "isHamOnRyeUnlocked", 0 );
		PlayerPrefs.SetInt( "hamNotesUnlocked", 0 );
		PlayerPrefs.SetInt( "isWhiteLightUnlocked", 0 );
		PlayerPrefs.SetInt( "whiteNotesUnlocked", 0 );
		
		PlayerPrefs.SetInt( "Initialized", 1 );
	}
	
	print( PlayerPrefs.GetInt( "Initialized" ) );
	Application.DontDestroyOnLoad( this.gameObject );
	Application.DontDestroyOnLoad( fadeCurtain );
}

function Start()
{
	yield WaitForSeconds( 1 );
	fadeCurtain.color = new Color ( 1, 1, 1, fadeCurtainAlpha / 100f );
	while ( fadeCurtainAlpha > 0 )
	{
		fadeCurtainAlpha -= 2;
		fadeCurtain.color = new Color ( 1, 1, 1, fadeCurtainAlpha/100f );
		yield WaitForSeconds( .02 );
	}
	yield WaitForSeconds( 3 );
	
	if ( !PlayerPrefs.HasKey( "debugMode" ) )
	{
		LoadLevel( "mainMenu" );
	} else
	{
		LoadLevel( "debugScene" );
	}
}

function LoadLevel( levelName:String )
{
	print( "does this override?" );
	fadeCurtainAlpha = 0;
	fadeCurtain.color = new Color ( 1, 1, 1, fadeCurtainAlpha / 100f );
	
	while ( fadeCurtainAlpha < 100 )
	{
		fadeCurtainAlpha += 2;
		fadeCurtain.color = new Color ( 1, 1, 1, fadeCurtainAlpha/100f );
		yield WaitForSeconds( .02 );
	}
	
	Application.LoadLevel( levelName );
}

function OnLevelWasLoaded( level:int )
{
	fadeCurtainAlpha = 100;
	fadeCurtain.color = new Color ( 1, 1, 1, fadeCurtainAlpha / 100f );
	
	while ( fadeCurtainAlpha > 0 )
	{
		fadeCurtainAlpha -= 2;
		fadeCurtain.color = new Color ( 1, 1, 1, fadeCurtainAlpha/100f );
		yield WaitForSeconds( .02 );
	}
}

function initializePrefs()
{
	fadeCurtainAlpha = 100;
	GameObject.DontDestroyOnLoad( this );
	PlayerPrefs.DeleteAll();
	
	PlayerPrefs.SetInt( "tutorialMode", 1 );
	
	PlayerPrefs.SetInt( "highScore1", 0 );
	PlayerPrefs.SetInt( "highScore2", 0 );
	PlayerPrefs.SetInt( "highScore3", 0 );
		
	PlayerPrefs.SetInt( "coinBank", 100 );
	PlayerPrefs.SetInt( "isIndianLandUnlocked", 0 );
	PlayerPrefs.SetInt( "indianNotesUnlocked", 0 );
	PlayerPrefs.SetInt( "isHamOnRyeUnlocked", 0 );
	PlayerPrefs.SetInt( "hamNotesUnlocked", 0 );
	PlayerPrefs.SetInt( "isWhiteLightUnlocked", 0 );
	PlayerPrefs.SetInt( "whiteNotesUnlocked", 0 );
		
	PlayerPrefs.SetInt( "Initialized", 1 );
	
	print( PlayerPrefs.GetInt( "Initialized" ) );
	Application.DontDestroyOnLoad( this.gameObject );
	Application.DontDestroyOnLoad( fadeCurtain );
}