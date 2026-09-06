/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  BoxGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
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
