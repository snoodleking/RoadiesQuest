#pragma strict
var coinBank:int;
var textMesh:tk2dTextMesh;

function Start ()
{
	coinBank = PlayerPrefs.GetInt( "coinBank" );
	textMesh.text = "" + coinBank + "";
	textMesh.Commit();
}

function Update () {

}