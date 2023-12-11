import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const TurnDownward = new GestureDescription('TurnDownward'); 

// Thumb 
TurnDownward.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
TurnDownward.addDirection(Finger.Thumb, FingerDirection.Downward, 0.8);
TurnDownward.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.5);
//TurnDownward.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

// Index
TurnDownward.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
TurnDownward.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.9);
TurnDownward.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9);

// Pinky
TurnDownward.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
TurnDownward.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.9);
TurnDownward.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.9);

for(let finger of [Finger.Middle, Finger.Ring]){
    TurnDownward.addCurl(finger, FingerCurl.FullCurl, 0.75); 
    TurnDownward.addCurl(finger, FingerCurl.HalfCurl, 0.75); 
   // TurnDownward.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}



