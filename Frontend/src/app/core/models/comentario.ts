import { Time } from "@angular/common";
import { User } from "./user";

export interface Comentario {
    id: number,
    fechaComentario: Date,
    horaComentario: Time,
    temaComentario: string,
    comentario: string,
    usuario: User,
}
