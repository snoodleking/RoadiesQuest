var scoreText:tk2dTextMesh;
var limit:int = 900000;
var temp:int;

function Update()
{
	temp = int.Parse( scoreText.text );
	print( temp );
	
	if ( temp != 0 )
	{
		temp--;
		scoreText.text = "" + temp + "";
		scoreText.Commit();
	}
}