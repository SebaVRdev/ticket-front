import { Routes } from "@angular/router";
import { CreateTicketComponent } from "./create-ticket/create-ticket.component";
import { ClientLayoutComponent } from "./client-layout/client-layout.component";
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";
import { MyTicketsComponent } from "./my-tickets/my-tickets.component";
import { hasRole } from "../../core/guards/is-logged-in.guard";

export const TICKET_ROUTES: Routes = [
    { path: '', canActivate: [hasRole(['CLIENT_ROLE'])], component: ClientLayoutComponent, children: [
        { path: '', component: CreateTicketComponent },
        { path: 'myTickets', component: MyTicketsComponent},
        { path: 'ticket/:id', component: TicketDetailComponent },
    ] },
]