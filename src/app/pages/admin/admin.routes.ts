import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { EstadisticasComponent } from "./estadisticas/estadisticas.component";
import { UserControlComponent } from "./user-control/user-control.component";
import { TicketControlComponent } from "./ticket-control/ticket-control.component";
import { hasRole } from "../../core/guards/is-logged-in.guard";
import { TicketControlDetailComponent } from "./ticket-control-detail/ticket-control-detail.component";

export const ADMIN_ROUTES: Routes = [
    { path: '',component: AdminLayoutComponent,children : [
        { path: '', canActivate: [hasRole(['ADMIN_ROLE'])] ,component: EstadisticasComponent },
        { path: 'users', canActivate: [hasRole(['ADMIN_ROLE', "TECNIC_ROLE"])], component: UserControlComponent },
        { path: 'tickets', canActivate: [hasRole(['ADMIN_ROLE', "TECNIC_ROLE"])], component: TicketControlComponent },
        { path: 'ticket/:id', canActivate: [hasRole(['ADMIN_ROLE', "TECNIC_ROLE"])], component: TicketControlDetailComponent },
    ] }
]