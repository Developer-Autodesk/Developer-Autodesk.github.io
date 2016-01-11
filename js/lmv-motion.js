function initialize() {
  var options = {
	  'document' : './assets/translated-models/v8/0/1/Design.svf',
	  'env':'Local'
	  };

  var viewerElement = document.getElementById('viewerElem');
  viewerElem = new Autodesk.Viewing.Viewer3D(viewerElement, {});

  Autodesk.Viewing.Initializer(options,function() {
	viewerElem.initialize();
	viewerElem.load(options.document);
  });
}

var explodeScale = 0;
var startExplosion = null;
var explosionReq;
var isExploding = false;
var outwardExplosion = true;

var startRotation = null;
var rotationReq;
var isRotating = false;

/**
 * toggle explosion motion
 * @param  boolean cancelMotion - true if cancel motion is requested
 */
function toggleExplosion(cancelMotion) {
  if (cancelMotion || isExploding) {
	cancelAnimationFrame(explosionReq);
	isExploding = false;
	if (cancelMotion) {
	  explodeScale = 0;
	  viewerElem.explode(explodeScale);
	}
  } else {
	explodeMotion();
	isExploding = true;
  }
}

/**
 * Recursive function for calling requestAnimationFrame for explode motion
 */
function explodeMotion(timestamp) {
  if (!startExplosion) {
	startExplosion = timestamp;
  }
  var progress = timestamp - startExplosion;
  startExplosion = timestamp;
  var explodeStep = 0.0002 * (progress || 0);

  // explode outward and inward
  if (outwardExplosion) {
	explodeScale += explodeStep;
  } else {
	explodeScale -= explodeStep;
  }
  if (explodeScale > 1) {
	outwardExplosion = false;
	explodeScale = 1; // this solves when user go to another browser tab
  } else if (explodeScale < 0) {
	outwardExplosion = true;
	explodeScale = 0; // this solves when user go to another browser tab
  }
  viewerElem.explode(explodeScale);
  explosionReq = window.requestAnimationFrame(explodeMotion);
}

/**
 * Toggle the rotation movement
 * @param  boolean cancelMotion true if motion is to be cancelled
 */
function toggleRotation(cancelMotion) {
  if (cancelMotion || isRotating) {
	cancelAnimationFrame(rotationReq);
	isRotating = false;
  } else {
	rotateMotion();
	isRotating = true;
  }
}

/**
 * recursive function for rotation motion each time page refreshes
 */
function rotateMotion(timestamp) {
  if (!startRotation) {
	startRotation = timestamp;
  }
  var progress = timestamp - startRotation;
  startRotation = timestamp;
  var rotateStep = 0.0005 * (progress || 0);

  // get the up axis
  var worldUp = viewerElem.navigation.getWorldUpVector();

  // get the current position
  var pos = viewerElem.navigation.getPosition();

  // copy that position
  var position = new THREE.Vector3(pos.x, pos.y, pos.z);

  // set the rotate axis
  var rAxis = new THREE.Vector3(worldUp.x, worldUp.y, worldUp.z);
  var matrix = new THREE.Matrix4().makeRotationAxis(rAxis, rotateStep);

  //apply the new position
  position.applyMatrix4(matrix);
  viewerElem.navigation.setPosition(position);

  rotationReq = window.requestAnimationFrame(rotateMotion);
}

function stopMotion() {
  toggleExplosion(true);
  toggleRotation(true);
}
