import * as THREE from "three";
//import { Group } from "../build/three.module";


function createBBHelper(bb, color, scene) {
  // Create a bounding box helper
  let helper = new THREE.Box3Helper(bb, color);
  scene.add(helper);
  return helper;
}

export function shoot (tank,speed,scene){
  const group = new THREE.Group();
  const projectileGeometry = new THREE.SphereGeometry(0.2, 8, 8);
  const projectileMaterial = new THREE.MeshPhongMaterial({ color: 0xff1493 });
  //const asset = new assetTiro()
  let projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);
  let bbSphere3 = new THREE.Box3().setFromObject(projectile);
  let bbHelper3 = createBBHelper(bbSphere3, "green", scene);
  const projectileDirection = getTankDirection(tank).normalize();
  //projectile.position.copy(tank.position);
  //posicionando projetil
  projectile.position.x = tank.position.x + projectileDirection.x * 1.7;
  projectile.position.y = tank.position.y + projectileDirection.y * 1.7;
  projectile.position.z = 1.1;
  console.log (bbSphere3)
  //adicionando projetil ao grupo e ao cenario
  bbHelper3.position.add(projectile.position);
  group.add(bbHelper3);
  group.add(projectile);
  //console.log(group)
  scene.add(group);
  return group
}

export function atirar(tank, speed, scene) {
  const projectileGeometry = new THREE.SphereGeometry(0.2, 8, 8);
  const projectileMaterial = new THREE.MeshPhongMaterial({ color: 0xff1493 });

  let projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);
  let bbSphere3 = new THREE.Box3().setFromObject(projectile);
  let bbHelper3 = createBBHelper(bbSphere3, "green", scene);

  const projectileDirection = getTankDirection(tank);
  projectile.position.copy(tank.position);
  projectile.position.x = projectile.position.x + projectileDirection.x * 1.7;
  projectile.position.y = projectile.position.y + projectileDirection.y * 1.7;
  projectile.position.z = 1.1;
  bbHelper3.position.copy(projectile.position);
  let bb = new THREE.Box3().setFromObject(projectile);
  projectile.add(bbHelper3);
  projectile.bb = bb;
  //console.log(projectile.bb);
  projectile.velocity = projectileDirection.multiplyScalar(speed);
  projectile.colisoes = 0;
  projectile.castShadow = true;
  let tiro = new assetTiro()
  assetTiro.object = projectile
  assetTiro.bb = projectile.bbHelper3
  console.log(tiro)
  scene.add(projectile);
  console.log(projectileDirection.normalize())
  return tiro;
}

function getTankDirection(tank) {
  const direction = tank.getWorldDirection(new THREE.Vector3());
  const xDirection = direction.x;
  const yDirection = direction.y;

  direction.set(xDirection, yDirection, 0);
  return direction;
}
