/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  SphereGeometry,
} from '@iwsdk/core';

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
