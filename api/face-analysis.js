{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 async function startCamera() \{\
    const video = document.getElementById('video');\
    const stream = await navigator.mediaDevices.getUserMedia(\{ video: true \});\
    video.srcObject = stream;\
\}\
\
async function loadModels() \{\
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');\
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');\
\}\
\
async function analyzeSkin() \{\
    const video = document.getElementById('video');\
    const canvas = document.getElementById('canvas');\
    const context = canvas.getContext('2d');\
\
    // Draw the video frame onto the canvas\
    canvas.width = video.videoWidth;\
    canvas.height = video.videoHeight;\
    context.drawImage(video, 0, 0, canvas.width, canvas.height);\
\
    // Detect the face\
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())\
        .withFaceLandmarks();\
\
    if (!detections.length) \{\
        document.getElementById('result').textContent = "No face detected!";\
        return;\
    \}\
\
    const faceBox = detections[0].detection.box;\
    context.strokeStyle = "red";\
    context.lineWidth = 2;\
    context.strokeRect(faceBox.x, faceBox.y, faceBox.width, faceBox.height);\
\
    // Simulated skin analysis\
    let skinType = "Normal";\
    let recommendation = "A Hydrating Facial might be ideal for you.";\
\
    const randomFactor = Math.random();\
    if (randomFactor < 0.3) \{\
        skinType = "Oily";\
        recommendation = "Consider a deep cleansing treatment.";\
    \} else if (randomFactor < 0.6) \{\
        skinType = "Dry";\
        recommendation = "Try our Moisturizing Facial.";\
    \}\
\
    document.getElementById('result').textContent = `Skin Type: $\{skinType\}. Recommendation: $\{recommendation\}`;\
\}\
\
// Start everything\
loadModels().then(startCamera);}