#pragma strict
@SerializeField
private var camera:Camera;
@SerializeField
private var startButton:GameObject;

private var hit:RaycastHit;
private var ray:Ray;

function Update ()
{
	for ( var touch:Touch in Input.touches )
	{
		ray = Camera.main.ScreenPointToRay( touch.position );
		
		Debug.DrawRay (ray.origin, ray.direction * 500, Color.yellow);
		
		
		if ( Physics.Raycast( ray, hit) && hit.transform.name == startButton.name )
		{
			print( "touching the gas" );
		}
	}
}

/*var hit : RaycastHit;

var object : GameObject;

var buttonEmitter : ParticleEmitter;

 

function Update () {

    

    // Use Raycast to pick objects that have mesh colliders attached.

    var ray = Camera.main.ScreenPointToRay (Input.mousePosition);

    

    //if the user touches the button

    if (Input.GetMouseButtonUp (0))  //Returns true during the frame the user deselects the object

    {

        if (Physics.Raycast (ray, hit, 100) && hit.transform.name == object.name) 

        {

            ButtonTouchUp(object);

        }

    }

 

}*/