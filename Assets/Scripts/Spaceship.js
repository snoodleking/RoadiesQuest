#pragma strict
var box:BoxCollider;
var startTime:float;
var flag:float;


function Awake()
{
	startTime = Time.time;
	box.enabled = false;
}

function Update ()
{
	if ( box.enabled )
		Destroy ( this );
		
	if ( Time.time - startTime >= flag )
	{
		box.enabled = true;
	}
}