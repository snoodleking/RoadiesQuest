using UnityEngine;
using System.Collections;

public class AnimAccessor : MonoBehaviour {
	public tk2dAnimatedSprite[] anim;
	public tk2dAnimatedSprite damage;
	
	public void stopAnim()
	{
		for ( int i = 0; i < anim.Length; i++ )
		{
			anim[i].Stop();
		}
	}
	
	public void playSlide()
	{
		for ( int i = 0; i < anim.Length; i++ )
		{
			anim[i].Play( "slide" );
		}
	}
	
	public void playRun()
	{
		for ( int i = 0; i < anim.Length; i++ )
		{
			anim[i].Play( "run" );
		}
		
		if ( damage.IsPlaying( "damage_indicator" ) )
		{
			damage.StopAndResetFrame();
		}
	}
	
	public void playHurt()
	{
		for ( int i = 0; i < anim.Length; i++ )
		{
			anim[i].Play( "hurt" );
		}
		damage.Play();
	}
}
