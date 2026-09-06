/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  CircleGeometry,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
} from '@iwsdk/core';

export const temporarySphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshStandardMaterial({ color: '#f2f2f2', roughness: 0.7 }),
);
temporarySphere.name = 'Temporary sphere';

export const xrSupportFloor = new Mesh(
  new CircleGeometry(7, 48),
  new MeshStandardMaterial({ color: '#1f2426', roughness: 0.95 }),
);
xrSupportFloor.name = 'XR support floor';
xrSupportFloor.rotation.x = -Math.PI * 0.5;
