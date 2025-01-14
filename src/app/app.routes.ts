import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { InventarioComponent } from './Pages/admin/inventario/inventario.component';
import { LibroComponent } from './Pages/libro/libro.component';
import { LoginComponent } from './Pages/login/login.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { ObrasComponent } from './Pages/obras/obras.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { UsersComponent } from './Pages/admin/users/users.component';
import { authGuard } from './guards/auth.guard';
import { ObrasCrearComponent } from './Pages/obras-crear/obras-crear.component';


export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Inicio'},
    {path: 'about', component: AboutUsComponent, title: 'About Us'},

    {path: 'admin', component: AdminComponent, title: 'admin', canActivate:[authGuard],
        canActivateChild:[authGuard],
        
        children: [
        {path: '', component: InventarioComponent, title: 'Inventario'},
        {path: 'users', component: UsersComponent, title: 'Users'}
    ]},
    {path: 'libro', component: LibroComponent, title:'sobre el libro'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'obras', component:ObrasComponent, title: 'obras'},

            {path:'crear', component: ObrasCrearComponent, title:'crear'},
    {path: 'registro', component: RegistroComponent, title: 'registro'},
    {path: '**', component: NotFoundComponent, title: 'not found'}

];
