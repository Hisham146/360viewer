
import React, { useRef, useState, useEffect} from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import {TurnRight} from "./TurnRight"; 
import {TurnLeft} from "./TurnLeft";
import { TurnUpward } from "./TurnUpward";
import { TurnDownward } from "./TurnDown";
import * as fp from "fingerpose";
import * as THREE from 'three';
import { ZoomIn } from "./ZoomIn"; 
import { ZoomOut } from "./ZoomOut";
import CameraControls from "camera-controls";
import ArrowUp from "./assets/topA.png";
import HandUp from "./assets/up.png";
import ArrowDown from "./assets/downa.png";
import HandDown from "./assets/down.png";
import ArrowRight from "./assets/righta.png";
import HandRight from "./assets/right.png";
import ArrowLeft from "./assets/lefta.png";
import HandLeft from "./assets/left.png";
import Scene1 from "./assets/Scene.jpg"

CameraControls.install({THREE:THREE});


function App() {
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const webcamRef = useRef(null);
  const finalGesture = useRef(null);
  const [directionDecision, setDirectionDecision] = useState(null);
  const horizontalMoveRef = useRef(0);
  const verticleMovRef = useRef(0);
  const zoomRef = useRef(0);
  const clockRef = useRef(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const selectedRef = useRef(null);
  const modelLoaded = useRef(null);

  const runHandpose = async () => {
    
    const net = await handpose.load();
   if(net !== null){
      modelLoaded.current = "HandPoseLoaded"
   }else{
    modelLoaded.current = "HandPoseNotLoaded"
   }
    console.log("Handpose model loaded.");
    setInterval(() => {
      detect(net);
    }, 80);
  };

  useEffect(() => {
      runHandpose(); // Call the function to load the model
  }, []);
  
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
       //if hand is detected 
       
      if (hand.length > 0 && hand[0].annotations && hand[0].annotations.indexFinger) {
        handDetectionResult(hand);

      } 
      else {
        finalGesture.current = null;
      }
    }
  };
  
  const handDetectionResult = async (hand) => {
    if (hand.length > 0) {
      const GE = new fp.GestureEstimator([
        TurnUpward,
        TurnRight,
        TurnLeft,
        TurnDownward,
        ZoomIn,
        ZoomOut
      ]);

      const gesture = GE.estimate(hand[0].landmarks, 4);

      if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
        let highestScore = 0;
        let highestScoreGestureName = '';
        gesture.gestures.forEach((recognizedGesture) => {
          const { name, score } = recognizedGesture;
      
          if (score > highestScore) {
            highestScore = score;
            highestScoreGestureName = name;
          }
        });

        PredictionConfirmation(highestScore, highestScoreGestureName);
      }

     
    }
  };


  let callCount = 0;
  let tempVariable = null;
  const PredictionConfirmation = (highestScore, highestScoreGestureName) => {
      
    if(highestScore > 6.1){
      callCount++;


       if(tempVariable === highestScoreGestureName){
        finalGesture.current = tempVariable;
       }

       if(callCount % 7 === 0) {
        tempVariable = highestScoreGestureName;
       }

       if (callCount === 7) {
        callCount = 0;
      }

    }
  };

  //\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\//\/\/\/\/\/

  useEffect(() => {
    const initThree = () => {
      const renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000000);
      const controls = new CameraControls(camera, renderer.domElement);
      controls.setPosition(camera.position.x + 0.1, camera.position.y , camera.position.z );
      document.getElementById('webglviewer').appendChild(renderer.domElement);

      rendererRef.current = renderer;
      sceneRef.current = scene;
      cameraRef.current = camera;
      controlsRef.current = controls;

      createMeshWithMaterial(Scene1);
      animate();
    };


    const clock = new THREE.Clock();
    clockRef.current = clock;
    const animate = () => {
      if (controlsRef.current) {
        requestAnimationFrame(animate);
          controlsRef.current.azimuthRotateSpeed = 0.1;
          controlsRef.current.polarRotateSpeed = 0.1;

          if(selectedRef.current === "Enable Gestures"){
            if(modelLoaded.current === "HandPoseLoaded")
            {
    
        if (finalGesture.current === "TurnRight") {
          horizontalMoveRef.current = horizontalMoveRef.current - 0.01;
            setDirectionDecision('TurnRight Detected');
            console.log('TurnRight Detected');
        } 
         else if (finalGesture.current === 'TurnLeft') {
          horizontalMoveRef.current =  horizontalMoveRef.current + 0.01;
          setDirectionDecision('TurnLeft Detected');
          console.log('TurnLeft Detected');
        } 
         else if (finalGesture.current === 'TurnUpward') {
          verticleMovRef.current = verticleMovRef.current + 0.01
          setDirectionDecision('TurnUpward Detected');
          console.log('TurnUpward Detected');
        } 
        else if (finalGesture.current === 'TurnDownward') {
         verticleMovRef.current = verticleMovRef.current - 0.01
          setDirectionDecision('TurnDownward Detected');
          console.log('TurnDownward Detected');
        } 

        else if (finalGesture.current === 'ZoomIn') {
          zoomRef.current = zoomRef.current + 0.0001
           setDirectionDecision('ZoomIn Detected');
           console.log('ZoomIn Detected');
         } 

         else if (finalGesture.current === 'ZoomOut') {
          zoomRef.current = zoomRef.current - 0.0001
           setDirectionDecision('ZoomOut Detected');
           console.log('ZoomOut Detected');
         } 
        else {
          setDirectionDecision("No valid Gesture Detected");
          console.log('No valid Gesture Detected');
        }

       
          const azimuthAngle = horizontalMoveRef.current;
          const polarAngle =  verticleMovRef.current;
          const zoomStep = zoomRef.current;
          controlsRef.current.minZoom = 0.8;
          controlsRef.current.maxZoom = 1.3
          
          controlsRef.current.zoom(zoomStep, false);
          controlsRef.current.rotateTo(azimuthAngle , polarAngle, true);
      }
      else{
        setDirectionDecision("HandPose Model is Loading..");
      }
    }
      
         controlsRef.current.update(clock.getDelta());
         
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    }
    };


    initThree();

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
      if (cameraRef.current) {
        cameraRef.current.dispose();
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  useEffect(()=>{
    controlsRef.current.update(clockRef.current.getDelta());
  },[selectedMode])

  const createMeshWithMaterial = (texturePath) => {
    const loader = new THREE.TextureLoader();

    loader.load(texturePath, function (texture) {
      if (meshRef.current) {
        sceneRef.current.remove(meshRef.current);
      }

      // Set texture filtering options
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });

      // Increase the resolution of the sphere geometry
      const geometry = new THREE.SphereGeometry(3.5, 94, 94);
      geometry.scale(-1, 1, 1);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(cameraRef.current.position);
      sceneRef.current.add(mesh);

      meshRef.current = mesh;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    });
  };



  function handleFileChange() {
    const fileInput = document.getElementById("select-file-input");
    const tempselectedFile = fileInput.files[0];
  
    if (tempselectedFile) {
      const img = new Image();
      img.src = URL.createObjectURL(tempselectedFile);
  
      img.onload = function () {
        const width = img.width;
        const height = img.height;
  
        // Adjust the threshold as needed for what you consider a panoramic image
        const panoramicThreshold = 1.73;
  

        if(width>height){
          if (width / height > panoramicThreshold) {
            createMeshWithMaterial(URL.createObjectURL(tempselectedFile));
          } else {
            console.log("Please choose a panaromic image");
            alert("Please choose a panoramic image.");
            fileInput.value = "";
          }
      }
      else {
        console.log("Please choose a panaromic image");
        alert("Please choose a panoramic image.");
        fileInput.value = "";
      }
    }
  }
}
  
 const GestureMode =()=> {
  if (selectedMode === 'Enable Gestures') {
    setSelectedMode('Disable Gestures');
    selectedRef.current = "Disable Gestures"
  } else {
    setSelectedMode('Enable Gestures');
    selectedRef.current = "Enable Gestures"
  }
 }

  return (
<>

<div style={{ position: 'absolute', top: 30, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
  <label className="Decesion" style={{ color: 'red', fontWeight: 'bold', fontSize:"1.2rem" }}>
    {directionDecision}
  </label>
</div>


{selectedMode === 'Enable Gestures' ? (
<div id="Guidlines gestures" className="Guidelines"

 style={{position:"absolute", marginTop:"8px", marginLeft:"8px" , opacity:"70%"}}>
   <div className="handup">
  <img src={HandUp} alt="handUp" width={35} height={35}/>
  <img src={ArrowUp} alt="handUp" width={29} height={29} style={{marginLeft:"10px"}}/>
  </div>

  <div className="handdown" style={{marginTop:"8px"}}>
  <img src={HandDown} alt="handUp" width={35} height={35}/>
  <img src={ArrowDown} alt="handUp" width={29} height={30} style={{marginLeft:"10px"}}/>
  </div>
       
  <div className="handleft" style={{marginTop:"8px"}}>
  <img src={HandLeft} alt="handUp" width={35} height={35}/>
  <img src={ArrowLeft} alt="handUp" width={29} height={30} style={{marginLeft:"10px"}}/>
  </div>

  <div className="handright" style={{marginTop:"8px"}}>
  <img src={HandRight} alt="handUp" width={35} height={35}/>
  <img src={ArrowRight} alt="handUp" width={29} height={30} style={{marginLeft:"10px"}}/>
  </div>
</div>
): null}

<div id="" style={{ position: 'absolute', right: 10, bottom: 10, padding: '20px', display: 'flex', flexDirection:"column" }}>

        <button id="select-file-button" className="waves-effect waves-light btn-small">
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            id="select-file-input"
            onChange={handleFileChange}
            style={{ color:"#9D00FF" }}
          />
        </button>
        <button id="GestureMode" className="waves-effect waves-light btn" onClick={GestureMode} 
        style={{position:"relative", marginTop:"4px", fontWeight:"bold",
        backgroundColor: selectedMode === 'Enable Gestures' ? 'red' : 'green', color: 'white'
        }}>
           { selectedMode === 'Enable Gestures' ? 'Disable Gestures' : 'Enable Gestures'}
        </button>
    </div>


     <Webcam
      ref={webcamRef}
      style={{
        position: "absolute",
        right:1,
        zIndex: 10, // Set a higher z-index than the webglviewer
        width: 160,
        height: 100,
        transform: "scaleX(-1)"
      }}
    />
   

    <div id="webglviewer" style={{ width: '100%', height:"100vh", marginTop:"-2.4%"}}/>
    </>
  );
}
export default App;
