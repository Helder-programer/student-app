export class Student {
    public id: number;
    public name: string;
    public bothDate: string;
    public status: string;
    public email: string;

    constructor(id: number, name: string, bothDate: string, email: string, status: string) {
        this.id = id;
        this.name = name;
        this.bothDate = bothDate;
        this.email = email;
        this.status = status;
    }
    
}