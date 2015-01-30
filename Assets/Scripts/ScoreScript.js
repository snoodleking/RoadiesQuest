#pragma strict
var tempMesh:tk2dTextMesh;
var digit:GameObject[];
var score:int = 0;
var multRank:int = 0;
var streak:int = 0;
var longestStreak = 0;
var growth:int = 1;
    
            
var base:int = 100;
var growthTrigger:int = 10;
var mults:int[];
var multIsMaxed:boolean = false;
var currentDigitX:float;


function increase()
{
	print("Score increasing...");
	streak++;
	score += base + growth++ * mults[ multRank ];
	
	if ( growthTrigger < growth && !multIsMaxed )
	{
		growth = 1;
		multRank++;
		
		if ( multRank == mults.Length- 1 )
		{
			multIsMaxed = true;
		}
	}
	
	print( "Calling displayScore()" );
	displayScore();
	print(score);
}

function reset()
{
	//print("Resetting streak and other stuff.");
	multRank = 0;
	growth = 1;
	multIsMaxed = false;
	longestStreak = ( streak > longestStreak ) ? streak:longestStreak;
	streak = 0;
}

function displayScore()
{
	//Get the score as a string.
	var tempScoreString:String = "" + score + "";
	tempMesh.text = tempScoreString; //spacedString; 
	tempMesh.Commit();	
	
}