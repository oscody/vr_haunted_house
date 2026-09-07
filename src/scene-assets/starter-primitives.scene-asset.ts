/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  BoxGeometry,
  ConeGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  SphereGeometry,
  TextureLoader,
} from '@iwsdk/core';

const publicAssetUrl = (filePath: string): string =>
  `${import.meta.env.BASE_URL}${filePath.replace(/^\/+/u, '')}`;

const textureLoader = new TextureLoader();

const wallColorTexture = textureLoader.load(
  publicAssetUrl('textures/castle_brick_broken_06_diff_1k.webp'),
);
const wallARMTexture = textureLoader.load(
  publicAssetUrl('textures/castle_brick_broken_06_arm_1k.webp'),
);
const wallNormalTexture = textureLoader.load(
  publicAssetUrl('textures/castle_brick_broken_06_nor_gl_1k.webp'),
);

wallColorTexture.colorSpace = SRGBColorSpace;

const roofColorTexture = textureLoader.load(
  publicAssetUrl('textures/roof_slates_02_diff_1k.webp'),
);
const roofARMTexture = textureLoader.load(
  publicAssetUrl('textures/roof_slates_02_arm_1k.webp'),
);
const roofNormalTexture = textureLoader.load(
  publicAssetUrl('textures/roof_slates_02_nor_gl_1k.webp'),
);

roofColorTexture.colorSpace = SRGBColorSpace;
roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = RepeatWrapping;
roofARMTexture.wrapS = RepeatWrapping;
roofNormalTexture.wrapS = RepeatWrapping;

const doorColorTexture = textureLoader.load(
  publicAssetUrl('textures/door_color.jpg'),
);
const doorAlphaTexture = textureLoader.load(
  publicAssetUrl('textures/door_alpha.jpg'),
);
const doorAmbientOcclusionTexture = textureLoader.load(
  publicAssetUrl('textures/door_ambientOcclusion.jpg'),
);
const doorHeightTexture = textureLoader.load(
  publicAssetUrl('textures/door_height.jpg'),
);
const doorNormalTexture = textureLoader.load(
  publicAssetUrl('textures/door_normal.jpg'),
);
const doorMetalnessTexture = textureLoader.load(
  publicAssetUrl('textures/door_metalness.jpg'),
);
const doorRoughnessTexture = textureLoader.load(
  publicAssetUrl('textures/door_roughness.jpg'),
);

doorColorTexture.colorSpace = SRGBColorSpace;

const bushColorTexture = textureLoader.load(
  publicAssetUrl('textures/leaves_forest_ground_diff_1k.webp'),
);
const bushARMTexture = textureLoader.load(
  publicAssetUrl('textures/leaves_forest_ground_arm_1k.webp'),
);
const bushNormalTexture = textureLoader.load(
  publicAssetUrl('textures/leaves_forest_ground_nor_gl_1k.webp'),
);

bushColorTexture.colorSpace = SRGBColorSpace;
bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);

bushColorTexture.wrapS = RepeatWrapping;
bushARMTexture.wrapS = RepeatWrapping;
bushNormalTexture.wrapS = RepeatWrapping;

const graveColorTexture = textureLoader.load(
  publicAssetUrl('textures/plastered_stone_wall_diff_1k.webp'),
);
const graveARMTexture = textureLoader.load(
  publicAssetUrl('textures/plastered_stone_wall_arm_1k.webp'),
);
const graveNormalTexture = textureLoader.load(
  publicAssetUrl('textures/plastered_stone_wall_nor_gl_1k.webp'),
);

graveColorTexture.colorSpace = SRGBColorSpace;
graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

export const temporarySphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshStandardMaterial({ color: '#f2f2f2', roughness: 0.7 }),
);
temporarySphere.name = 'Temporary sphere';

export const floor = new Mesh(
  new PlaneGeometry(20, 20),
  new MeshStandardMaterial(),
);
floor.name = 'Floor';
floor.rotation.x = -Math.PI * 0.5;

export const house = new Group();
house.name = 'House';

const walls = new Mesh(
  new BoxGeometry(4, 2.5, 4),
  new MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  }),
);
walls.name = 'Walls';
walls.position.y += 1.25;
house.add(walls);

const roof = new Mesh(
  new ConeGeometry(3.5, 1.5, 4),
  new MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  }),
);
roof.name = 'Roof';
roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

const door = new Mesh(
  new PlaneGeometry(2.2, 2.2, 100, 100),
  new MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  }),
);
door.name = 'Door';
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

const bushGeometry = new SphereGeometry(1, 16, 16);
const bushMaterial = new MeshStandardMaterial({
  color: '#ccffcc',
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});

const bush1 = new Mesh(bushGeometry, bushMaterial);
bush1.name = 'Bush 1';
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new Mesh(bushGeometry, bushMaterial);
bush2.name = 'Bush 2';
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new Mesh(bushGeometry, bushMaterial);
bush3.name = 'Bush 3';
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new Mesh(bushGeometry, bushMaterial);
bush4.name = 'Bush 4';
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

const graveGeometry = new BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new MeshStandardMaterial({
  map: graveColorTexture,
  normalMap: graveNormalTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
});

export const graves = new Group();
graves.name = 'Graves';

let graveSeed = 1337;
const graveRandom = (): number => {
  graveSeed = (graveSeed * 1664525 + 1013904223) >>> 0;
  return graveSeed / 0x100000000;
};

for (let i = 0; i < 30; i += 1) {
  const angle = graveRandom() * Math.PI * 2;
  const radius = 3 + graveRandom() * 4;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new Mesh(graveGeometry, graveMaterial);
  grave.name = `Grave ${i + 1}`;
  grave.position.x = x;
  grave.position.y = graveRandom() * 0.4;
  grave.position.z = z;
  grave.rotation.x = (graveRandom() - 0.5) * 0.4;
  grave.rotation.y = (graveRandom() - 0.5) * 0.4;
  grave.rotation.z = (graveRandom() - 0.5) * 0.4;

  graves.add(grave);
}
