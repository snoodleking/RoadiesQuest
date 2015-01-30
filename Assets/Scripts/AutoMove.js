#pragma strict

//Object references.
var autoMoveSpeed:float = -4;
private var moveDirection:Vector3;

/*
if the end level stuff doesnt slow down right its because 
the start() stuff should be in the update function
i moved it out of there because thats a stupid place
for it to be and daniel put it there and the only reason
 i could see that he put it there is for the slow() function in the end level script
*/

function Start () 
{
	moveDirection = new Vector3( autoMoveSpeed, 0, 0 );
}

function Update()
{
	transform.Translate( moveDirection * Time.deltaTime );
}