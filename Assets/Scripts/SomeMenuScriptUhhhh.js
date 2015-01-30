#pragma strict

@SerializeField
private var mainMenuBG:Texture;
@SerializeField
private var startButton:Texture;
@SerializeField
private var startButtonX:int;
@SerializeField
private var startButtonY:int;

private var startButtonWidth:int;
private var startButtonHeight:int;

var obj:GameObject;

function Awake()
{

	startButtonWidth = startButton.width;
	startButtonHeight = startButton.height;
	
//  experimenting with button size: 
//  but the padding is the real problem


//	startButtonWidth = 106	;
//	startButtonHeight = 75	;
	
	obj = new GameObject("TitleBG");
	obj.AddComponent( "GUITexture" );
	obj.transform.localScale = Vector3.zero;
	obj.guiTexture.pixelInset = new Rect( 0, 0, 440, 290 );
	obj.guiTexture.texture = mainMenuBG;
}

function OnGUI()
{
	
	//GUI.DrawTexture( Rect( 0, 0, Screen.width, Screen.height ), mainMenuBG );
	
	if ( GUI.Button( Rect( startButtonX, startButtonY, startButtonWidth, startButtonHeight ), startButton ) )
		print( "StartButton Clicked!" );
}

