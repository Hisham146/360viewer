
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const ZoomIn = new GestureDescription('ZoomIn'); 

// Thumb 
ZoomIn.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)
//ZoomIn.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);
ZoomIn.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1);
//ZoomIn.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

// Index
ZoomIn.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
ZoomIn.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1);

// Pinky
ZoomIn.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
ZoomIn.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.9);
ZoomIn.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.2);

//Ring
ZoomIn.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)
ZoomIn.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.9);
ZoomIn.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.9);

ZoomIn.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0)
ZoomIn.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.5);
ZoomIn.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.9);
