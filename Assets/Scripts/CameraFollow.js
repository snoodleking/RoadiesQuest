#pragma strict
@SerializeField
private var guide			: Transform;
@SerializeField
private var smoothTime		: float;

private var current			: Vector3;
private var target			: Vector3;
private var velocity		: Vector3 			= Vector3.zero;

function LateUpdate()
{
	current = transform.position;
	target = transform.position;
	target.x = guide.position.x;
	transform.position = Vector3.SmoothDamp( current, target, velocity, smoothTime );
}