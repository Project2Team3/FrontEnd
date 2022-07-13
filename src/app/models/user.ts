export class User {
  private _id: number;
  private _username: string;
  private _password: string;
  private _country: string;
  private _points: number;
  private _email: string;

  constructor(
    id: number,
    username: string,
    password: string,
    country: string,
    points: number,
    email: string
  ) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._country = country;
    this._points = points;
    this._email = email;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
