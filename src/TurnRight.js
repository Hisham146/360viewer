
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const TurnRight = new GestureDescription('TurnRight'); 

// Thumb 
TurnRight.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
//TurnRight.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
TurnRight.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);
TurnRight.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);

// Index
TurnRight.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
TurnRight.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);
TurnRight.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1);

// Pinky
TurnRight.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
TurnRight.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25);
TurnRight.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.9);

for(let finger of [Finger.Middle, Finger.Ring]){
    TurnRight.addCurl(finger, FingerCurl.FullCurl, 0.75); 
    TurnRight.addCurl(finger, FingerCurl.HalfCurl, 0.75); 
}



