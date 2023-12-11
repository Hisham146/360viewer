
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const TurnUpward = new GestureDescription('TurnUpward'); 

// Thumb 
TurnUpward.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
TurnUpward.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.8);
TurnUpward.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.5);

// Index
TurnUpward.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
TurnUpward.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.9);
TurnUpward.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9);

// Pinky
TurnUpward.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
TurnUpward.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.9);
TurnUpward.addDirection(Finger.Pinky, FingerDirection.DiagonaldownRight, 0.9);

for(let finger of [Finger.Middle, Finger.Ring]){
    TurnUpward.addCurl(finger, FingerCurl.FullCurl, 0.75); 
    TurnUpward.addCurl(finger, FingerCurl.HalfCurl, 0.75); 
}



