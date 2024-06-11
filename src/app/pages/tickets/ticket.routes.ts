import { Routes } from "@angular/router";
import { CreateTicketComponent } from "./create-ticket/create-ticket.component";
import { ClientLayoutComponent } from "./client-layout/client-layout.component";
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";

export const TICKET_ROUTES: Routes = [
    { path: '', component: ClientLayoutComponent, children: [
        { path: '', component: CreateTicketComponent },
        { path: 'ticket/:id', component: TicketDetailComponent },
    ] },
]