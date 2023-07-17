import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: 'pos',
        loadChildren: () => import('../../site/site.module').then(m => m.SiteModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('../../admin/admin.module').then(m => m.AdminModule)
    }
];