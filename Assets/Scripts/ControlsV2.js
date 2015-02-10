#pragma strict
var levelButtons:GameObject;
var reactions:RoadieReactions;
var isHoverLocked:boolean = false;
var pauseBG:GameObject;
var isHurt:boolean = false;
var songIsStarted:boolean = false;
var anim:AnimAccessor;
var hoverTimer:float;
var hoverStartTime:float;
var soundWaveOffset:Vector3;
var soundObject:GameObject;
var soundClone:GameObject;
var shieldObject:GameObject;
var shieldClone:GameObject;
var shieldPosition:Vector3;
var controller:CharacterController;
var touch:Touch;
var isAction:boolean = false;
var isShielding:boolean = false;
var isTap:boolean = true;
var touchPosition:Vector2;
var isHandlingInput:boolean = false;
var sensitivity:float;
var sound:SoundV2;
var moveDirection:Vector3;
var isHovering:boolean = false;
var jumpSpeed:float;
var gravity:float;
var isSliding:boolean = false;
var shieldTone:int = -1;
var shieldToneStartTime:float;
var pauseTouch:Touch;
var isPaused:boolean = false;
var mySwitch:boolean = false;
//unity 4.3.4f1


function Start ()
{
	sound = Camera.main.GetComponent( SoundV2 );
	moveDirection = Vector3.zero;
}

function Update ()
{
	if ( isShielding && Time.time - shieldToneStartTime >= 3.9 )
	{
		sound.playShieldTone( shieldTone );
		shieldToneStartTime = Time.time;
	}

	if ( !mySwitch )
	{
		//shield();
		mySwitch = true;
	}	

	if ( !songIsStarted && !Application.isLoadingLevel )
	{
		//print( "nononononono" );
		sound.startSong();
		songIsStarted = true;
	}

	//Log initial position of touch.
	if ( Input.touchCount == 1 && !isHandlingInput && !isAction )
	{
		//print( "This is to log the initial position of the touch. Should show up once per tap." );
		touch = Input.GetTouch(0);
		touchPosition = touch.position;
		isHandlingInput = true;
		
			var cursorRay:Ray = Camera.main.ScreenPointToRay( Input.GetTouch(0).position );
            var hit:RaycastHit;

            if( Physics.Raycast( cursorRay, hit, 1000.0f ) ) 
            {
            	//print( hit.collider.gameObject.transform.tag );
            	if ( hit.collider.gameObject.transform.tag == "Pause" )
            	{
            		if ( !isPaused )
            		{
            			levelButtons.SetActive( true );
            			Time.timeScale = 0;
            			isPaused = true;
            			sound.pauseSong();
            			pauseBG.renderer.enabled = true;
            		} else if ( isPaused )
            		{
            			pauseBG.renderer.enabled = false;
            			Time.timeScale = 1;
            			isAction = true;
            			isPaused = false;
            			sound.pauseSong();
						levelButtons.SetActive( false );
            		}
            	}
            }
	}
	
	
	//Handle touch input.
	if ( Input.touchCount == 1 && isHandlingInput && !isAction && !isPaused )
	{
		//print( "This is to log changes in the position of the touch. Should show up once a frame." );
		touch = Input.GetTouch(0);
		
		if ( touchPosition.x - touch.position.x > sensitivity && !isSliding )
		{
			//print( "should be shielding" );
			shield();
		} else if ( touchPosition.y - touch.position.y > sensitivity && controller.isGrounded && !isSliding )
		{
			slide();
		} else if ( touchPosition.y - touch.position.y < -sensitivity && !isSliding )
		{
			if ( !controller.isGrounded && !isHoverLocked )
			{
				hover();
			} else if ( controller.isGrounded )
			{
				jump();
			}
		}
	}
	
	if ( Input.touchCount == 0 && isHandlingInput )
	{
		//print( "Input is no longer being received. Resetting controller booleans." );
		if ( isTap && !isAction && !isSliding && !isPaused )
		{
			attack();
		}
		if ( shieldClone )
		{
			Destroy( shieldClone );
		}
		isTap = true;
		isHovering = false;
		isHandlingInput = false;
		isShielding = false;
		//print( "STOP DAT TONE" );
		sound.stopShieldTone();
		isAction = false;
	}
	
	if ( isHovering )
	{
		//print ( Time.time - hoverStartTime + " >? " + hoverTimer );
		if ( Time.time - hoverStartTime > hoverTimer )
			isHovering = false;
	}
	
	if ( controller.isGrounded && isHoverLocked )
	{
		isHoverLocked = false;
	}
	
	controller.Move( moveDirection * Time.deltaTime );
	if ( shieldClone )
	{
		if ( !controller.isGrounded )
		shieldClone.transform.Translate( moveDirection * Time.deltaTime );
	}
	if ( soundClone )
	{
		if ( !controller.isGrounded )
		soundClone.transform.Translate( moveDirection * Time.deltaTime );
	}
}

function FixedUpdate()
{
		if ( !controller.isGrounded )
		{
			if ( !isHovering )
				moveDirection.y -= gravity * Time.deltaTime;
			else
				moveDirection.y = 0;
		} else
		{
			if ( isHovering )
				isHovering = false;
				
			moveDirection.y = -1;
		}
}

function shield()
{
	//print( "shielding at " + Time.time );
	shieldTone = sound.getShieldTone();
	sound.playShieldTone( shieldTone );
	shieldToneStartTime = Time.time;
	//print( "This is a shield. Shows up only once.." );
	shieldClone = Instantiate( shieldObject, controller.transform.position + shieldPosition, Quaternion.identity );
	isAction = true;
	isShielding = true;
	isTap = false;
}

function slide()
{
	//print( "sliding at " + Time.time );
	sound.playSlideSound();
	//print( "This is a slide. Shows up only once." );
	isAction = true;
	isTap = false;
	anim.playSlide();
	isSliding = true;
	yield WaitForSeconds( 1 );
	anim.playRun();
	isSliding = false;
	gameObject.transform.tag = "Roadie";
}

function jump()
{
	//print ("jumping at " + Time.time );
	sound.playJumpSound();
	//print( "This is a jump. Shows up only once." );
	moveDirection.y = jumpSpeed;
	isAction = true;
	isTap = false;
}

function hover()
{
	sound.playHoverSound();
	//print( "This is a hover. Shows up only once." );
	isHoverLocked = true;
	hoverStartTime = Time.time;
	//print( Time.time );
	isHovering = true;
	isAction = true;
}

function attack()
{
	//print( "shooting at " + Time.time );
	//print( "uhm?" );
	sound.playAttackSound();
	//print( "This is an attack. Shows up only once." );
	soundClone = Instantiate( soundObject, controller.transform.position + soundWaveOffset, Quaternion.identity );
	Destroy( soundClone, 0.667 );
}

function hurt()
{
	//that print is important - it tells when roadie got hit.
	//print( "hurt time " + Time.time );
	if ( isHurt )
	{
		return;
	}
	
	if ( isShielding )
	{
		isShielding = false;
		Destroy( shieldClone );
		sound.stopShieldTone();
	}
	
	isHovering = false;
	anim.playHurt();
	isHurt = true;
	yield WaitForSeconds( 0.75 );
	//print( "Switching to run" );
	isHurt = false;
	reactions.isHurting = false;
	anim.playRun();
}