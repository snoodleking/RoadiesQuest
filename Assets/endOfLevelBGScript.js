#pragma strict

var roadieObject:GameObject;
var roadieIdleObject:GameObject;
var rescued:GameObject;
var isRescuedSpawned:boolean = false;
var movingBGScripts:MovingBG[];
var speeds:float[];
var stopTime:float;
var startPositionX:float;
var targetPositionX:float;
var roadieAnim:AnimAccessor;

function Start ()
{
	speeds = new float[ movingBGScripts.Length ];
	
	for ( var i:int = 0; i < movingBGScripts.Length; i++ )
	{
		speeds[i] = movingBGScripts[i].speed;
	}
}

function Slow()
{
	var deltaX:float = startPositionX - targetPositionX;
	var currentDeltaX:float = ( rescued.transform.position.x - targetPositionX ) + 1;
	
	var modifier:float = currentDeltaX / deltaX;
	
	for ( var i:int = 0; i < speeds.Length; i++ )
	{
		movingBGScripts[i].speed = speeds[i] * modifier;
	}
	
	
}

function Stop()
{
	for ( var i:int = 0; i < speeds.Length; i++ )
	{
		movingBGScripts[i].speed = 0;
	}
	roadieIdleObject.transform.position = roadieObject.transform.position;
	roadieAnim.stopAnim();
	roadieObject.SetActive( false );
	roadieIdleObject.SetActive( true );
}

function Update ()
{
	if ( Time.timeSinceLevelLoad > stopTime && !isRescuedSpawned )
	//if we pass the designated point in time
	{
		spawnRescued();
	}
	
	if ( isRescuedSpawned )
	{
		Slow();
	}
	
	if ( rescued.transform.position.x <= targetPositionX )
	{
		Stop();
	}
	
	
		//spawn rescuedguy and parent it to a fg object.
		//slow the moving bgs to a halt when rescuedguy hits target position
			//then stop roadie's animation
			//and destroy this script
}

function spawnRescued()
{
	print( "is this stuff happening all the time?" );
	var lastBG:GameObject;
	
	lastBG = movingBGScripts[1].getLastActiveBG();
	rescued.transform.parent = lastBG.transform;
	rescued.transform.position.y = 0;
	rescued.transform.position.x = rescued.transform.parent.transform.position.x;
	startPositionX = rescued.transform.position.x;
	
	isRescuedSpawned = true;
}