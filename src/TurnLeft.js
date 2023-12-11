
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const TurnLeft = new GestureDescription('TurnLeft'); 

// Thumb 
TurnLeft.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
TurnLeft.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);
TurnLeft.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.5);
//TurnLeft.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

// Index
TurnLeft.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
TurnLeft.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9);
TurnLeft.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9);

// Pinky
TurnLeft.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
TurnLeft.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.9);
TurnLeft.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.9);

for(let finger of [Finger.Middle, Finger.Ring]){
    TurnLeft.addCurl(finger, FingerCurl.FullCurl, 0.75); 
    TurnLeft.addCurl(finger, FingerCurl.HalfCurl, 0.75); 
   // TurnLeft.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}



