#pragma strict
var scoreKeeper:ScoreScript;
var highScore1:int;
var highScore2:int;
var highScore3:int;
var highScore1Text:tk2dTextMesh;
var highScore2Text:tk2dTextMesh;
var highScore3Text:tk2dTextMesh;
var coinAmountText:tk2dTextMesh;
var levelScoreText:tk2dTextMesh;
var notePrefString:String;
var notesFromLevel:int;
var totalNotes:int;
var rReactions:RoadieReactions;

function showScoreScreen ()
{
	notesFromLevel = rReactions.bounceNotesCollected;
	resetScores();
	
	/*
	log the end score for the level
	if it's higher than a high score, put it on the board
	dump 1 coin in the bank for every million points
	*/
	
	var endScore:int = scoreKeeper.score;
	yield WaitForSeconds( 1 );
	
	var coinsFromLevel:int;
	coinsFromLevel = endScore / 1000000;
	
	var totalCoins:int;
	totalCoins = coinsFromLevel + PlayerPrefs.GetInt( "coinBank" );
	notePrefString = PlayerPrefs.GetString( "activeLevel" ) + "NotesUnlocked";
	totalNotes = notesFromLevel + PlayerPrefs.GetInt( notePrefString );
	totalNotes = (totalNotes > 5) ? 5:totalNotes;
	PlayerPrefs.SetInt( notePrefString, totalNotes );
	PlayerPrefs.SetInt( "coinBank", totalCoins );
	
	if ( endScore > highScore1 )
	{
		PlayerPrefs.SetInt( "highScore3", PlayerPrefs.GetInt( "highScore2" ) );	
		PlayerPrefs.SetInt( "highScore2", PlayerPrefs.GetInt( "highScore1" ) );	
		PlayerPrefs.SetInt( "highScore1", endScore );
	} else if ( endScore > highScore2 )
	{
		PlayerPrefs.SetInt( "highScore3", PlayerPrefs.GetInt( "highScore2" ) );		
		PlayerPrefs.SetInt( "highScore2", endScore );
	} else if ( endScore > highScore3 )
	{
		PlayerPrefs.SetInt( "highScore3", endScore );
	}
	
	resetScores();
}

function resetScores()
{
	highScore1 = PlayerPrefs.GetInt( "highScore1" );
	highScore2 = PlayerPrefs.GetInt( "highScore2" );
	highScore3 = PlayerPrefs.GetInt( "highScore3" );

	levelScoreText.text = scoreKeeper.score + "";
	levelScoreText.Commit();

	coinAmountText.text = "" + PlayerPrefs.GetInt( "coinBank" );
	coinAmountText.Commit();

	highScore1Text.text = "" + PlayerPrefs.GetInt( "highScore1" );
	highScore1Text.Commit();
	
	highScore2Text.text = "" + PlayerPrefs.GetInt( "highScore2" );
	highScore2Text.Commit();
	
	highScore3Text.text = "" + PlayerPrefs.GetInt( "highScore3" );
	highScore3Text.Commit();
}