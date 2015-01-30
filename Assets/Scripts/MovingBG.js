#pragma strict

@SerializeField
var offset:float = 0;

@SerializeField
private var BGs:GameObject[];

@SerializeField
private var numActiveBGs:int;
private var activeBGs:GameObject[];

@SerializeField
private var isOrigin = true;

@SerializeField
private var startPosition:Vector3;
private var spawnPosition:Vector3;
      
@SerializeField
public var speed = 0.5;

private var width:float;
private var oldBG:GameObject;
private var newBG:GameObject;
private var direction:Vector3;


function getLastActiveBG()
{
	var tempIndex = 0;
	var tempLength = activeBGs.Length;
	
	for ( var i:int = 0; i < tempLength; i++ )
	{
		if ( activeBGs[i].transform.position.x > activeBGs[tempIndex].transform.position.x )
		{
			tempIndex = i;
		}
	}
	
	return activeBGs[tempIndex];
}

function Awake()
{
	//print( "Hello, I'm movingBGscript" );
	if ( isOrigin )
	{
		startPosition = Vector3.zero;
	}
	
	
	//Log width of BG object.
	width = BGs[0].renderer.bounds.max.x - BGs[0].renderer.bounds.min.x + offset;
	spawnPosition = startPosition;
	spawnPosition.x += width;
	
	//Instantiate first BG objects.
	activeBGs = new GameObject[numActiveBGs];
	for ( var i:int = 0; i < numActiveBGs; i++ )
	{
		spawnPosition = startPosition + new Vector3( width * i, 0, 0 );
		activeBGs[i] = ( Instantiate( getRandomBG(), spawnPosition, Quaternion.identity ) );
	}
	

}

function Update () 
{
	//Initialize direction vector.
	direction = new Vector3( -speed, 0, 0 ); 

	width = BGs[0].renderer.bounds.max.x - BGs[0].renderer.bounds.min.x;
	//Scroll BGs until the instantiated BG is in original's position.
	for ( var k:int = 0; k < numActiveBGs; k++ )
	{
		activeBGs[k].transform.Translate( direction * Time.deltaTime );
	}
	
	
	//When oldBG has scrolled its width...
	if ( activeBGs[0].renderer.bounds.min.x < startPosition.x - width )
	{
		//Remove old BG.
		Destroy( activeBGs[0] );
		for ( var j:int = 0; j < numActiveBGs - 1; j++ )
			activeBGs[j] = activeBGs[j+1];

		//Queue a second instantiated BG.
		spawnPosition = new Vector3( activeBGs[numActiveBGs - 2].renderer.bounds.min.x + width, startPosition.y, startPosition.z );
		activeBGs[numActiveBGs - 1] = Instantiate ( getRandomBG(), spawnPosition, Quaternion.identity );
	}
}

function getRandomBG()
{
	return BGs[Random.Range( 0, BGs.Length )];
}