import React, { useState, useEffect } from 'react';
import './App.css';
import Lottie from 'lottie-web'; // Import Lottie

// Import your Lottie JSON file
import lottieJson from '../src/assets/lottie.json.json';

function App() {
  const totalCircles = 48; // Total number of small circles
  const smallCircleRadius = 10; // Radius of each small circle
  const bigCircleRadius = 150; // Radius of the big circle

  // Create a state variable to track the Lottie animation instance
  const [lottieAnimation, setLottieAnimation] = useState(null);

  // Initialize the Lottie animation when the component mounts
  useEffect(() => {
    // Load the Lottie animation
    const lottieInstance = Lottie.loadAnimation({
      container: document.getElementById('lottie-container'), // Specify the HTML container element
      animationData: lottieJson, // Your Lottie animation data
      renderer: 'svg', // Use SVG renderer
      loop: true, // Set to true if you want the animation to loop
      autoplay: true, // Auto-play the animation
    });

    // Set the animation instance in state
    setLottieAnimation(lottieInstance);

    // Clean up the animation when the component unmounts
    return () => {
      lottieInstance.destroy();
    };
  }, []);

  // Calculate the positions of small circles around the Lottie animation
  const centerX = 200; // X-coordinate of the center
  const centerY = 200; // Y-coordinate of the center

  const initialSmallCircles = Array.from({ length: totalCircles }, (_, index) => {
    const angle = (2 * Math.PI * index) / totalCircles - Math.PI / 2;
    const radius = bigCircleRadius + 30; // Adjust the radius to position circles around the Lottie animation
    const cx = centerX + radius * Math.cos(angle);
    const cy = centerY + radius * Math.sin(angle);
    return { id: index + 1, cx, cy, radius: smallCircleRadius, angle };
  });

  return (
    <div>
      <svg width="400" height="400">
        {/* Render the Lottie animation at the center */}
        <div id="lottie-container"></div>

        {/* Render the small circles around the Lottie animation */}
        {initialSmallCircles.map((circle) => {
          return (
            <circle
              key={circle.id}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.radius}
              fill="blue"
              className="circle"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default App;
