import { lazy } from 'react';

export const BrandPage = lazy(() => import('./brand').then(m => ({ default: m.BrandPage })));
export const BrandsPage = lazy(() => import('./brands-page').then(m => ({ default: m.BrandsPage })));