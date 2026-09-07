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
