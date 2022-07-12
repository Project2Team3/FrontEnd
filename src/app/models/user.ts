export class User {
  id:number;
  username:string;
  password:string;
  country:string;
  points:number;
  email:string;

  constructor(id: number, username: string, password: string, country: string, points: number, email: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.country = country;
    this.points = points;
    this.email = email;
  }
}
