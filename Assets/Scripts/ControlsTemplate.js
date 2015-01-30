#pragma strict
private var sound:Sound;
private var isSongStarted:boolean = false;

@SerializeField
private var controller:CharacterController;

@SerializeField
private var defaultAtkTimer:float;

@SerializeField
private var shield:GameObject;

@SerializeField
private var shieldPosition:Vector3;
private var shieldUp:GameObject;

@SerializeField
private var soundWave:GameObject;
@SerializeField
private var soundWavePosition:Vector3;
private var soundWaveUp:GameObject;

private var gotShield:boolean = false;
private var gotSlide:boolean = false;
private var gotAttack:boolean = false;
private var touchDown:boolean = false;
private var touchMoved:boolean = false;
private var touchTime:float;
private var isActed:boolean = false;

private var isShielding:boolean = false;
private var isAttacking:boolean = false;
private var isSliding:boolean = false;

function Awake()
{
	print( "controls script initialized" );
	sound = Camera.main.GetComponent( Sound );
}

function Update ()
{
	if ( Input.GetMouseButtonDown(0) )
	{
		sound.playSound();
	}

	if ( !isSongStarted )
	{
		print( "Starting song." );
		sound.startSong();
		isSongStarted = true;
	}
	
	//Get user input. (Restricted to one touch.)
	if ( Input.touchCount == 1 && !touchDown && !isActed )
	{
		touchTime = Time.time;
		print( "Accessing touch method" );
		for ( var touch:Touch in Input.touches )
		{
			//Detect touch.
			touchDown = true;
		
			//Detect movement.
			if ( touch.phase == TouchPhase.Moved && !isActed )
			{
				print( "moved" );
				touchMoved = true;
				
				//Detect back-swipe, activate shield.
				if ( touchMovement( touch, true, -1, 10 ) && !isActed  )
				{
					shieldAction();
				}
				
				//Detect down-swipe, activate slide.
				if ( touchMovement( touch, false, -1, 10 ) && !isActed )
				{
					slideAction();
				}
				
				isActed = true;
			}
		}
	}
	
	if ( Time.time - touchTime > defaultAtkTimer && !isActed && touchDown )
	{
		attackAction();
		isActed = true;
	}
	
	//Detect tap.
	if ( Input.touchCount == 0 )
	{
		if ( isShielding )
		{
			Destroy( shieldUp );
		}
		isShielding = false;
	
		if ( touchDown && !touchMoved && !isActed )
			attackAction();
		
		touchMoved = false;
		touchDown = false;
		isActed = false;
	}
}

function shieldAction()
{
	print( "Shield Action" );
	shieldUp = Instantiate( shield, shieldPosition, Quaternion.identity );
	isShielding = true;
}

function attackAction()
{
	sound.playSound();
	print( "Attack Action" );
	soundWaveUp = Instantiate( soundWave, soundWavePosition, Quaternion.identity );
	Destroy( soundWaveUp, 0.667 );
}

function slideAction()
{
	print( "Slide Action" );
}

function touchMovement(touch:Touch, xAxis:boolean, direction:int, magnitude:int)
{
/*
This function detects movement in a desired direction and returns a boolean.
Say you want to detect a swift swipe right.
The "touch" field receives the touch you are evaluating.
The "xAxis" field receives a boolean: in this case, true.
	(Detecting a swipe UP or DOWN would correspond to the FALSE value.)
The "direction" field receieves an int: in this case, 1.
	(Ideally 1 or -1 to indicate a forward or backward evaluation on the selected axis.)
The "magnitude" field receives an int: in this case, 10000.
	(The higher it is, the quicker the swipe has to be.)
The function returns true if the conditions have been met.
*/
	if(touch.phase == TouchPhase.Moved)
	{
		//Assign axis1 and axis2 using the xAxis boolean. axis1 will be our focus axis.
		var axis1:float = xAxis ? touch.deltaPosition.x : touch.deltaPosition.y;
		var axis2:float = xAxis ? touch.deltaPosition.y : touch.deltaPosition.x;		
		
		//Check to see if the axis has moved in the desired direction...
		if( (direction < 0 && axis1 < 0) || (direction > 0 && axis1 > 0) ){
			//Check to see if it was emphasized more than the other axis.
			if( Mathf.Abs(axis1) > Mathf.Abs(axis2) && touch.deltaPosition.sqrMagnitude > magnitude )
				return true;
		}
	}
	return false;
}
