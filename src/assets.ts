/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AssetType, defineAssets } from '@iwsdk/core';
import {
  temporarySphere,
  xrSupportFloor,
} from './scene-assets/starter-primitives.scene-asset.js';

const publicAssetUrl = (filePath: string): string =>
  `${import.meta.env.BASE_URL}${filePath.replace(/^\/+/u, '')}`;
const DEFAULT_STOCK_ASSET_BASE =
  'https://cdn.jsdelivr.net/npm/@iwsdk/example-assets@0.4.2/assets';
const configuredStockAssetBase =
  import.meta.env.VITE_IWSDK_EXAMPLE_ASSET_BASE_URL?.trim();
const stockAssetBase = (
  configuredStockAssetBase || DEFAULT_STOCK_ASSET_BASE
).replace(/\/+$/u, '');

function stockAssetUrl(assetId: string, fileName: string): string {
  return `${stockAssetBase}/${assetId}/${fileName}`;
}

export default defineAssets({
  'temporary-sphere': temporarySphere,
  'xr-support-floor': xrSupportFloor,
  'welcome-panel': {
    url: publicAssetUrl('ui/welcome.uikitml'),
    type: AssetType.UIKitML,
    name: 'Welcome panel',
  },
  // Register assets here, e.g.:
  //
  // 'my-model': {
  //   url: publicAssetUrl('gltf/my-model/model.gltf'),
  //   type: AssetType.GLTF,
  //   name: 'My Model',
  //   priority: 'lazy',
  // },
  //
  // 'stock-model': {
  //   url: stockAssetUrl('robot', 'robot.gltf'),
  //   type: AssetType.GLTF,
  //   name: 'Stock Model',
  // },
});

// Keep the URL helpers reachable while the manifest is empty.
void publicAssetUrl;
void stockAssetUrl;
