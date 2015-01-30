#pragma strict



var degreesPerSecond : float = 5; 

function Update()
{
   transform.localRotation = Quaternion.AngleAxis( degreesPerSecond * Time.time, Vector3.forward );

}