import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { EstadisticasComponent } from "./estadisticas/estadisticas.component";
import { UserControlComponent } from "./user-control/user-control.component";
import { TicketControlComponent } from "./ticket-control/ticket-control.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', component: AdminLayoutComponent, children : [
        { path: '', component: EstadisticasComponent },
        { path: 'users', component: UserControlComponent },
        { path: 'tickets', component: TicketControlComponent },
        { path: 'tickets/:id', component: EstadisticasComponent },
    ] }
]