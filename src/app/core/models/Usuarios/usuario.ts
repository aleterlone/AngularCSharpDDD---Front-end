import { Escolaridade } from "../Escolaridades/escolaridade";

export class Usuario {
    public id: number;
    public nome: string;
    public sobrenome: string;
    public email: string;
    public dataNascimento: Date;
    public escolaridade: Escolaridade;
}
