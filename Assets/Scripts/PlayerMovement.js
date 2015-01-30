#pragma strict

	//Components.
		@SerializeField
		private var character		: CharacterController;
		
		@SerializeField
		private var jumpHeight		: float;
		
		@SerializeField
		private var hoverTime		: float;
		
		@SerializeField
		private var gravity			: float;
		
		private var moveDirection	: Vector3;
		private var isJumping		: boolean = false;
		private var hoverSwitchOn	: boolean = false;
		private var isHovering		: boolean = false;
		private var hoverStartTime	: float;
		
	//Touch controls.
		private var gotSwipeUp		: boolean = false;
		private var touchDown		: boolean = false;
	
	//touchMovement(touch, xAxis, direction, magnitude) will return a boolean.
	function touchMovement(touch:Touch, xAxis:boolean, direction:int, magnitude:int)
	{
	//Say you want to detect a swift swipe right.
	//The "touch" field receives the touch you are evaluating.
	//The "xAxis" field receives a boolean: in this case, true. (Detecting a swipe UP or DOWN would correspond to the FALSE value.)
	//The "direction" field receieves an int: in this case, 1. (Ideally 1 or -1 to indicate a forward or backward evaluation on the selected axis.)
	//The "magnitude" field receives an int: in this case, 10000. (The higher it is, the quicker the swipe has to be.)
	//The function returns true if the conditions have been met.

	//Check to see if the touch has been moved.
		if(touch.phase == TouchPhase.Moved)
		{
			//Assign axis1 and axis2 using the xAxis boolean. axis1 will be our focus axis.
			var axis1:float = xAxis ? touch.deltaPosition.x : touch.deltaPosition.y;
			var axis2:float = xAxis ? touch.deltaPosition.y : touch.deltaPosition.x;		
			//Check to see if the axis has moved in the desired direction...
			if( (direction < 0 && axis1 < 0) || (direction > 0 && axis1 > 0) ){
				//Check to see if it was emphasized more than the other axis.
				if( Mathf.Abs(axis1) > Mathf.Abs(axis2) && touch.deltaPosition.sqrMagnitude > magnitude ){
					return true;
				}
			}
		}
		return false;
	}


	function Awake()
	{
	//Check to make sure character is set.
		if ( !character )
			print( "No character attached to AutoMoveScript." );	
		else
			moveDirection = new Vector3( 0, -1, 0 );
	}


	function FixedUpdate()
	{

	//Apply gravity...
		if ( !character.isGrounded )
		{
			if ( !isHovering )
				moveDirection.y -= gravity * Time.deltaTime;
		}
		else
		{
			if ( hoverSwitchOn )
				hoverSwitchOn = false;
			if ( !isJumping )
				moveDirection.y = -1;
		}
	}

	function Update()
	{
	//Touch inputs.
		if ( Input.touchCount == 1 && !touchDown )
		{
			for ( var touch:Touch in Input.touches )
			{
				if ( touchMovement( touch, false, 1, 10 ) )
				{	
					print( "Baby you touch me up." );
					gotSwipeUp = true;
					touchDown = true;
				}
			}
		}
		
		if ( Input.touchCount == 0 && touchDown )
			touchDown = false;
	
	//Jump: pressing jump while grounded initilizes jumping.
		if ( ( Input.GetButtonDown( "Jump" ) || gotSwipeUp ) && character.isGrounded )
		{
			gotSwipeUp = false;
			isJumping = true;
			moveDirection.y = jumpHeight;
		}
	
	//Hover: pressing jump while mid-air activates hovering.
		if ( ( Input.GetButtonDown( "Jump" ) || gotSwipeUp ) && !character.isGrounded && !hoverSwitchOn )
		{
			gotSwipeUp = false;
			hoverSwitchOn = true;
			isHovering = true;
			hoverStartTime = Time.time;
			moveDirection.y = 0;
		}
	
		if ( isHovering )
		{
			if ( Input.GetButtonUp( "Jump" ) || ( Time.time - hoverStartTime) >= hoverTime || ( !touchDown && !Input.GetButton( "Jump" ) ) )
				isHovering = false;
		}
	
	//Apply movement.
		character.Move( moveDirection * Time.deltaTime );
	}