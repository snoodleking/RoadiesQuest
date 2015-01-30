using UnityEngine;
using System.Collections;

public class NightFallController : MonoBehaviour {

	public bool fadeSky= true;
	public float skyOpacity = 0.2f;
	public float terrainOpacity = 0.4f;
	public float fadeSpeed = 0.01f;

	public tk2dSprite[] bgSprites;
	public tk2dSprite sky;

	private int bgLength;
	private float tAlphaSky = 1;
	private float tAlphaTerrain = 1;

	//these are checks that are flipped by the end of each cycle (sky or terrain)
	private bool skyEnd = false;
	private bool terrainEnd = false;

	void Start ()
	{
		//sets bgLength to equal the total number of sprites in the bgSprites array
		bgLength =  ( bgSprites.Length );
	}
	
	void Update () 
	{
		//checks if the user has enabled sky fading and executes function if so
		if ( fadeSky )
		{
			skyFade();
		}

		//fades the enviroment and checks if the script has ended and can be destroyed
		enviroFade();
		endScript();
	}

//==================================================//
//													//
//==================================================//

	//fades out the sprite loaded in the sky variable
	void skyFade () 
	{
		if ( tAlphaSky >= skyOpacity )
		{
			tAlphaSky -= Time.deltaTime * fadeSpeed;
		}
		else
		{
			skyEnd = true;
		}
		
		sky.color = new Color ( 1, 1, 1, tAlphaSky );
		//Debug.Log ( tAlpha );	
	}

	//fades out the bg/fg sprites that are loaded in the bgSprites array
	void enviroFade ()
	{
		if ( tAlphaTerrain >= terrainOpacity )
		{
			tAlphaTerrain -= Time.deltaTime * fadeSpeed;

			for ( int i = 0; i < bgLength; ++i )
			{
				bgSprites[ i ].color = new Color ( tAlphaTerrain, tAlphaTerrain, tAlphaTerrain, 1 );
			}
		}
		else 
		{
			terrainEnd = true;
		}
	}

	//checks if BOTH the sky and the terrain have faded out and kills the script
	//if sky is not set to fade, then it just terminates at the terrain fade end
	void endScript () 
	{
		if ( terrainEnd && skyEnd || !fadeSky && terrainEnd )
		{
			Destroy( this );
		}
	}
}
