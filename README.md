Example Three.Js Website
---------------------------------------------------------

Model Littlest Tokyo by Glenn Fox

Reference: https://threejs.org/examples/#webgl_animation_keyframes

This is a example website loading 3D model using Three.Js in Frontend and Node.js in Backend

INSTALLATION
------------

1. Prerequisites

	Install Node.js (Link: https://nodejs.org/en)

	Visual Studio Code (Link: https://code.visualstudio.com/)

2. Project Setup

	*Running Server

		Open terminal and run 2 commands:

			- npm install express
			- node server.js
		
		Now server is running at http://localhost:3000

		You can check API http://localhost:3000/api/models to see data

	*Running Front End

		1. Install three.js: npm install --save three

		2. Install Vite: npm install --save-dev vite

		3. Run Vite command: npx vite

	Now you will see FrontEnd is running at http://localhost:5173/ and is showing the model

***Note: The example is still missing some requirements in sector 3D Model Utility Features and I am working on
 it to ensure that the project meets all expectations moving forward
