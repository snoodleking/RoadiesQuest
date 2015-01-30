using UnityEngine;
using System.Collections;


/*
this is the automove script developed by Duncan because C# is better than js.
It's for moving objects. Whichever way you want.
*/

public class AutoScroll : MonoBehaviour {

	#region Variables
	//gives a list of variable chocies for the Vertical movement of the object
	public enum VerticalDirection 
	{
		None, Up, Down
	}

	//gives a list of variable choices for the Horizontal movement of the object
	public enum HorizontalDirection
	{
		None, Left, Right
	}

	//variables for the object
	public HorizontalDirection horizontalMove;
	public VerticalDirection verticalMove;

	//should the object destroy itself after it reaches a given position?
	public bool destroySelf;
	public float destroyPos = -5.5f;

	public float moveSpeed;

	//modifier that actually sets the direction
	private int xMove;
	private int yMove;

	//vector that tells the end result of which way the object will scroll
	private Vector3 moveDirection;
	#endregion

	void Start () 
	{

		#region Direction Settings
		//evaluates the value for moving right, left, or none and sets the variable accordingly
		switch ( horizontalMove )
		{
			case HorizontalDirection.Left:
				xMove = -1;
				break;

			case HorizontalDirection.Right:
				xMove = 1;
				break;

			case HorizontalDirection.None:
				xMove = 0;
				break;

			default:
				break;
		}


		//evaluates the value for moving up, down, or none and sets the variable accordingly
		switch ( verticalMove )
		{
			case VerticalDirection.Down:
				yMove = -1;
				break;

			case VerticalDirection.Up:
				yMove = 1;
				break;

			case VerticalDirection.None:
				yMove = 0;
				break;

			default:
				break;
		}


		#endregion

		moveDirection = new Vector3 ( ( xMove * moveSpeed ), ( yMove * moveSpeed ), 0 );
		//Debug.Log ( "move direction = " + moveDirection );
		//Debug.Log( "the horizontal setting = " + xMove );
	}

	void Update () 
	{
		transform.Translate( moveDirection * Time.deltaTime );

		if ( destroySelf )
		{
			if ( ( transform.position.y < destroyPos ) ) { Destroy( this ); }
		}
	}
}
