#pragma strict

var delay:float = 1; // seconds until score starts counting down
var delayMark:float;
var isActive:boolean = false;
var scoreScript:ScoreScript;
var scoreMark:int;
var gameScore:tk2dTextMesh;
var topScore1:tk2dTextMesh;
var topScore2:tk2dTextMesh;
var topScore3:tk2dTextMesh;
var topScores:tk2dTextMesh[];
var coinBank:tk2dTextMesh;

function activateScoreUI()
{
	topScores = new tk2dTextMesh[3];
	topScores[0] = topScore1;
	topScores[1] = topScore2;
	topScores[2] = topScore3;
	
	
	isActive = true;
	delayMark = Time.time;
	scoreMark = scoreScript.score;
	gameScore.text = "" + scoreMark + "";
	gameScore.Commit();
	
	for ( var tempScore:tk2dTextMesh in topScores )
	{
		if ( tempScore.text == "" )
		{
			tempScore.text = "0";
			tempScore.Commit();
		}
	}
}

function Update ()
{
	if ( isActive )
	{
		dumpScores();
	}
}

function dumpScores()
{
	yield WaitForSeconds( delay );
	
	var tempExchangeRate = 0;
	for ( var tempI = scoreMark; tempI > 0; tempI-- )
	{
		gameScore.text = tempI + "";
		gameScore.Commit();
		
		if ( tempExchangeRate == 1000000 )
		{
			var tempInt:int;
			tempInt = int.Parse( coinBank.text );
			tempInt++;
			coinBank.text = tempInt + "";
			coinBank.Commit();
		}
	}
	
}