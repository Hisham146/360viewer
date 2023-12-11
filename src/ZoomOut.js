
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const ZoomOut = new GestureDescription('ZoomOut'); 

// Thumb 
ZoomOut.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
ZoomOut.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
ZoomOut.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.5);
ZoomOut.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

// Index
ZoomOut.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
ZoomOut.addDirection(Finger.Index, FingerDirection.VerticleUp, 0.9);


for(let finger of [Finger.Middle, Finger.Ring, Finger.pinky]){
    ZoomOut.addCurl(finger, FingerCurl.FullCurl, 1); 
   // ZoomOut.addCurl(finger, FingerCurl.HalfCurl, 0.75); 
}


