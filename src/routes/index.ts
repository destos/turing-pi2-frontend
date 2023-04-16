import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Nodes]: {
    component: asyncComponentLoader(() => import('@/pages/Nodes')),
    path: '/',
    title: 'Nodes',
    icon: DensitySmallIcon,
  },
  [Pages.Update]: {
    component: asyncComponentLoader(() => import('@/pages/Update')),
    path: '/update',
    title: 'Update',
    icon: BrowserUpdatedIcon,
  },
  // [Pages.Page2]: {
  //   component: asyncComponentLoader(() => import('@/pages/Page2')),
  //   path: '/page-2',
  //   title: 'Page 2',
  //   icon: AddTaskIcon,
  // },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
