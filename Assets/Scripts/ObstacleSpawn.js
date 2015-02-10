#pragma strict



//    0.01.00c this is the syntax for the spawner script. 
//	  minute.second.milli-secondCharacter of object
//    where c = clam, l = lava, g = gas, s = spaceship  
//	  and C = clam2, L = lava2, G = gas2, S = spaceship2

@SerializeField
private var spawnStrings:String[];

@SerializeField
private var spawnPositions:Vector3[];

@SerializeField
private var clam:GameObject;

@SerializeField
private var gas:GameObject;

@SerializeField
private var lava:GameObject;

@SerializeField
private var spaceship:GameObject;

@SerializeField
private var clam2:GameObject;

@SerializeField
private var gas2:GameObject;

@SerializeField
private var lava2:GameObject;

@SerializeField
private var spaceship2:GameObject;

@SerializeField
private var objectX:GameObject;

private var spawnTimes:int[];
private var spawnOrder:int[];
private var obstacles:GameObject[];
private var iterator:int;
private var index:int;

//spawn offsets for all songs BUT indian land
private var clamOffset:int;
private var lavaOffset:int;
private var spaceShipOffset:int;
private var gasOffset:int;

function Start ()
{
	//Set the offsets based on song.
	//print ("The current level loaded is " + Application.loadedLevelName );
	if ( Application.loadedLevelName == "Sandbox" || Application.loadedLevelName == "indianLand" )
	{
		clamOffset = 0;
		gasOffset = 0;
		lavaOffset = 0;
		spaceShipOffset = 0;
	} 
	else 
	{
		clamOffset = 3175;
		gasOffset = 3000;		
		lavaOffset = 3260;
		spaceShipOffset = 1000;
	}

	//Initialize spawn times and order.
	var tempSize:int = spawnStrings.length;
	spawnTimes = new int[spawnStrings.Length];
	spawnOrder = new int[spawnStrings.Length];
	for ( var i:int = 0; i < tempSize; i++ )
	{
		setOrderedSpawnTimes( spawnTimes, spawnOrder, spawnStrings[i], i );
		//print ( "At " + spawnTimes[i] + " ms, spawn go at index " + spawnOrder[i] );
	}
	
	//Initialize gameObject array to instantiate from.
	obstacles = new GameObject[9];
	obstacles[0] = clam;
	obstacles[1] = gas;
	obstacles[2] = lava;
	obstacles[3] = spaceship;
	obstacles[4] = clam2;
	obstacles[5] = gas2;
	obstacles[6] = lava2;
	obstacles[7] = spaceship2;
	obstacles[8] = objectX;
	//print( obstacles.Length );
	
	//Set the iterator.
	iterator = 0;
	
}




function Update ()
{
	//If the time elapsed exceeds the number at spawnTime[iterator]
	if ( iterator < spawnStrings.length )
	{
		if ( Time.timeSinceLevelLoad * 1000 > spawnTimes[iterator] )
		{
			//print( Time.time * 1000 + " > " + spawnTimes[iterator] );
			index = spawnOrder[iterator];
			//print( "Instantiating " + obstacles[index] );
			iterator++;
			Instantiate ( obstacles[index], spawnPositions[index], Quaternion.identity );
		}
	}
	
		//Instantiate obstacle obstacles[spawnOrder[iterator]] at targetPosition[spawnOrder[iterator]]
		
		//Obstacles should have their own movement scripts and destroy scripts.
}




//Converts user String time inputs to milliseconds inputs.
function setOrderedSpawnTimes( tTimes:int[], tOrder:int[], tString:String, tIndex:int )
{
	var tempInt:int = 0;
	var tempSize:int = tString.Length;
	
	for ( var i:int = 0; i < tempSize; i++ )
	{
		switch ( i )
		{
			case 0:
				tempInt += ( parseInt( tString[i] ) - 48) * 60000;
				break;
			case 1:
				break;
			case 2:
				tempInt += ( parseInt( tString[i] ) - 48) * 10000;
				break;
			case 3:
				tempInt += ( parseInt( tString[i] ) - 48) * 1000;
				break;
			case 4:
				break;
			case 5:
				tempInt += ( parseInt( tString[i] ) - 48) * 100;
				break;
			case 6:
				tempInt += ( parseInt( tString[i] ) - 48) * 10;
				break;
			case 7:
				switch ( tString[i] )
				{
					case 'c':
						tOrder[tIndex] = 0;
						//clam hit time offset
						tempInt -= clamOffset;
						//print ( "clam offset is " + clamOffset );
						break;
					case 'g':
						tOrder[tIndex] = 1;
						//gas hit time offset
						tempInt -= gasOffset;
						break;
					case 'l':
						tOrder[tIndex] = 2;
						//lava hit time offset
						tempInt -= lavaOffset;
						break;
					case 's':
						tOrder[tIndex] = 3;
						//spaceship hit time offset
						tempInt -= spaceShipOffset;
						break;
					case 'C':
						tOrder[tIndex] = 4;
						break;
					case 'G':
						tOrder[tIndex] = 5;
						break;
					case 'L':
						tOrder[tIndex] = 6;
						break;
					case 'S':
						tOrder[tIndex] = 7;
						break;
					case 'X':
						tOrder[tIndex] = 8;
						break;
				}
				break;
		}
		tTimes[tIndex] = tempInt;
		//print( "Temp Int = " + tempInt );
	}
}