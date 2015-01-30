#pragma strict
var lockedGeorgiaPostIt:GameObject;
var priceTagGeorgia:GameObject;
var unlockedGeorgiaPostIt:GameObject;
var unlockedGeorgia:GameObject;

var lockedTexasPostIt:GameObject;
var priceTagTexas:GameObject;
var unlockedTexasPostIt:GameObject;
var unlockedTexas:GameObject;


var lockedMoonPostIt:GameObject;
var priceTagMoon:GameObject;
var unlockedMoonPostIt:GameObject;
var coinBankText:tk2dTextMesh;
var songTitle:String;
var isBuying:boolean = false;
var confirmTextMesh1:tk2dTextMesh;
var confirmTextMesh2:tk2dTextMesh;
var levelConfirmUI:GameObject;
var isLevelSelected:boolean = false;
var levelSelectUI:GameObject;
var songPlayerUI:GameObject;
var isOpenUI:boolean = false;
var levelName:String;
var gameData:GameData;

function Awake()
{
	gameData = GameObject.FindGameObjectWithTag( "GameData" ).GetComponent(GameData);
	if ( PlayerPrefs.GetInt( "isIndianLandUnlocked" ) )
	{
		print( PlayerPrefs.GetInt( "isIndianLandUnlocked" ) );
		print( "unlcoking indianland" );
		unlockIndianLand();		
	}
	if ( PlayerPrefs.GetInt( "isHamOnRyeUnlocked" ) )
	{
		print( PlayerPrefs.GetInt( "isHamOnRyeUnlocked" ) );
		print( "unlcoking hamonrye" );
		unlockHamOnRye();
	}
	if ( PlayerPrefs.GetInt( "isWhiteLightUnlocked" ) )
	{
		print( PlayerPrefs.GetInt( "isWhiteLightUnlocked" ) );
		print( "unlcoking whitelight" );
		unlockWhiteLight();
	}
}

function Update ()
{
	if ( Input.touchCount == 1 )
	{		
		var cursorRay:Ray = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );
        var hit:RaycastHit;
		var touchTrigger:boolean = false;
		
		if( Physics.Raycast( cursorRay, hit, 1000.0f ) ) 
		{
			print( hit.collider.gameObject.transform.tag );
			if ( hit.collider.gameObject.transform.tag == "Map" && !isOpenUI )
            {
				levelSelectUI.SetActive( true );
				isOpenUI = true;
            } else if ( hit.collider.gameObject.transform.tag == "RecordPlayer" && !isOpenUI )
            {
				songPlayerUI.SetActive( true );
				isOpenUI = true;
            } else if ( hit.collider.gameObject.transform.tag == "IndianLandSelect" && !isLevelSelected )
            {
            	PlayerPrefs.SetString( "activeLevel", "indian" );
            	levelConfirmUI.SetActive( true );
            	isLevelSelected = true;
            	levelName = "Sandbox";
            	
            	if ( !PlayerPrefs.GetInt( "isIndianLandUnlocked" ) )
            	{
            		songTitle = "IndianLand";
            		isBuying = true;
            		confirmTextMesh1.text = "CONFIRM TICKET PURCHASE";
            		confirmTextMesh1.Commit();
            		confirmTextMesh2.text = "the MOON";
            		confirmTextMesh2.Commit();
            	} else
            	{
            		isBuying = false;
            		confirmTextMesh1.text = "CONFIRM TRAVEL";
            		confirmTextMesh1.Commit();
            		confirmTextMesh2.text = "the MOON";
            		confirmTextMesh2.Commit();
            	}
            	
            } else if ( hit.collider.gameObject.transform.tag == "HamOnRyeSelect" && !isLevelSelected )
            {
            	PlayerPrefs.SetString( "activeLevel", "ham" );
            	levelConfirmUI.SetActive( true );
            	isLevelSelected = true;
            	levelName = "hamOfRye";
				songTitle = "HamOnRye";
            	
            	if ( !PlayerPrefs.GetInt( "isHamOnRyeUnlocked" ) )
            	{
            		isBuying = true;
            		confirmTextMesh1.text = "CONFIRM TICKET PURCHASE";
            		confirmTextMesh1.Commit();
            		confirmTextMesh2.text = "TEXAS";
            		confirmTextMesh2.Commit();
            	} else
            	{
            		isBuying = false;
            		confirmTextMesh1.text = "CONFIRM TRAVEL";
            		confirmTextMesh1.Commit();
            		confirmTextMesh2.text = "TEXAS";
            		confirmTextMesh2.Commit();
            	}	
            } else if ( hit.collider.gameObject.transform.tag == "WhiteLightSelect" && !isLevelSelected )
            {
            	PlayerPrefs.SetString( "activeLevel", "white" );
            	levelConfirmUI.SetActive( true );
            	isLevelSelected = true;
            	levelName = "whiteLight";
            	songTitle = "WhiteLight";
            	
            	if ( !PlayerPrefs.GetInt( "isWhiteLightUnlocked" ) )
            	{
            		isBuying = true;
            		confirmTextMesh1.text = "CONFIRM TICKET PURCHASE";
            		confirmTextMesh1.Commit();
            		confirmTextMesh2.text = "GEORGIA";
            		confirmTextMesh2.Commit();
            	} else
            	{
            		isBuying = false;
            		confirmTextMesh1.text = "CONFIRM TRAVEL";
            		confirmTextMesh1.Commit();
            		confirmTextMesh2.text = "GEORGIA";
            		confirmTextMesh2.Commit();
            	}	
            } else if ( hit.collider.gameObject.transform.tag == "Yes" && isLevelSelected )
            {
            	if ( isBuying )
            	{
            		switch ( songTitle )
            		{
            		case "IndianLand":
            			print( songTitle );
            			print( "...songtitle switch under indianland" );
            			if ( PlayerPrefs.GetInt( "coinBank" ) >= 1 )
            			{
            				print( "purchasing indianland" );
            				PlayerPrefs.SetInt( "coinBank", PlayerPrefs.GetInt( "coinBank" ) - 1 );
            				PlayerPrefs.SetInt( "isIndianLandUnlocked", 1 );
							unlockIndianLand();
            			}
            			break;
            		case "HamOnRye":
            			if ( PlayerPrefs.GetInt( "coinBank" ) >= 5 )
            			{
            			    print( "purchasing hamonrye" );
            				PlayerPrefs.SetInt( "coinBank", PlayerPrefs.GetInt( "coinBank" ) - 5 );
            				PlayerPrefs.SetInt( "isHamOnRyeUnlocked", 1 );
							unlockHamOnRye();
            			}
            			break;
            		case "WhiteLight":
						print( "purchasing whitelight" );
						if ( PlayerPrefs.GetInt( "coinBank" ) >= 50 )
            			{
            				PlayerPrefs.SetInt( "coinBank", PlayerPrefs.GetInt( "coinBank" ) - 50 );
            				PlayerPrefs.SetInt( "isWhiteLightUnlocked", 1 );
							unlockWhiteLight();
            			}
            			break;
            		default:
            			print( "songpurchase switch failed, could not buy-- " + songTitle );
            		}
            		
            		coinBankText.text = "" + PlayerPrefs.GetInt( "coinBank" );
            		coinBankText.Commit();
            		confirmTextMesh1.text = "PURCHASE COMPLETE";
            		confirmTextMesh1.Commit();
            		isLevelSelected = false;
            	} else
            	{
            		if ( PlayerPrefs.GetInt( "tutorialMode" ) )
            		{
            			print( "loading tutorial scene" );
            			gameData.LoadLevel( "tutorialScene" );
            		} else
            		{
	            		gameData.LoadLevel( levelName );
	            	}
	            }
            } else if ( hit.collider.gameObject.transform.tag == "No" && isLevelSelected )
            {
            	isLevelSelected = false;
            } else if ( hit.collider.gameObject.transform.tag == "Close" )
            {
            	if ( levelSelectUI.active )
            	{
            		levelSelectUI.SetActive( false );
            	} else if ( songPlayerUI.active )
            	{
            		songPlayerUI.SetActive( false );
            	}
            	
            	print( "isOpenUI being set to false" );
            	isOpenUI = false;
            }
		}
	}

	if ( levelConfirmUI && isLevelSelected )
	{
		print( levelConfirmUI.transform.position.x );
		if ( levelConfirmUI.transform.position.x <= 1.2 )
        {
			levelConfirmUI.transform.Translate( 10 * Time.deltaTime, 0, 0 );
        }
	}
	
	else if ( levelConfirmUI && !isLevelSelected )
	{
		if ( levelConfirmUI.transform.position.x >= -10 )
		{
			levelConfirmUI.transform.Translate( -10*Time.deltaTime, 0, 0 );
		} else
		{
			levelConfirmUI.SetActive( false );
		}
	}
}

function unlockIndianLand()
{
	lockedMoonPostIt.SetActive( false );
	priceTagMoon.SetActive( false );
	unlockedMoonPostIt.SetActive( true );
}

function unlockHamOnRye()
{
	lockedTexasPostIt.SetActive( false );
	priceTagTexas.SetActive( false );
	unlockedTexasPostIt.SetActive( true );
	unlockedTexas.SetActive( true );
}

function unlockWhiteLight()
{
	print( "function unlockwhitelight called" );
	lockedGeorgiaPostIt.SetActive( false );
	priceTagGeorgia.SetActive( false );
	unlockedGeorgiaPostIt.SetActive( true );
	unlockedGeorgia.SetActive( true );
}