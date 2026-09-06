/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSystem, VisibilityState } from '@iwsdk/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class OrbitControlsSystem extends createSystem() {
  private controls?: OrbitControls;

  init() {
    // Only initialize in non-immersive mode (browser development)
    const currentState = this.visibilityState.peek();
    if (currentState === VisibilityState.NonImmersive) {
      this.setupControls();
    }

    // Listen for mode changes
    this.cleanupFuncs.push(
      this.visibilityState.subscribe((state) => {
        if (state === VisibilityState.NonImmersive && !this.controls) {
          this.setupControls();
        } else if (state !== VisibilityState.NonImmersive && this.controls) {
          this.controls.dispose();
          this.controls = undefined;
        }
      })
    );
  }

  private setupControls() {
    const canvas = this.world.renderer.domElement;
    this.controls = new OrbitControls(this.world.camera, canvas);
    this.controls.enableDamping = true;
  }

  update() {
    // Only update if controls exist and are active
    this.controls?.update();
  }
}
