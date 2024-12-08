import type { ApiMethod } from '@/api.ts'


export abstract class Route {
  type: ApiMethod;
  url: string;
  data: never;
  response: never;
  isProtected: boolean;

  constructor(type: ApiMethod, url: string, isProtected: boolean) {
    this.type = type;
    this.url = url;
    this.isProtected = isProtected;
  }
}

export type User = {
  id: number;
  email: string;
  password: string;
  token: string | null;
  equipment: Equipment[]
}

export type Meeting = {
  id: number;
  place: Place;
  name: string;
  description: string;
  interestedCount: number;
  equipment: Equipment[];
  ratingOfWeather: number;
  date: string;
}

export type Place = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  rating: number;
}

export type Equipment = {
  id: number;
  name: string;
  user: User
}

export type Weather = {
  clouds: number;
  visibility: number;
  humidity: number;
  moon: number;
  planet: string[];
  magnitude: number;
  sunrise: string;
  sunset: string;
}

export class GetMeetingsRoute extends Route {
  data: never;
  response: {
    meetings: Meeting[]
  }
  constructor() {
    super(ApiMethod.GET, '/meetings', true);
    this.response = {meetings: []}
  }
}

export class AddPlaceRoute extends Route {
  data: {
    place: Place
  }
  response: never;
  constructor() {
    super(ApiMethod.POST, '/place-create', true);
  }
}

export class AddMeetingRoute extends Route {
  data: {
    meeting: Meeting
  }
  response: never;
  constructor() {
    super(ApiMethod.POST, '/meetings/add', true);
  }
}

export class GetEquipment extends Route {
  data: never;
  response: {
    equipment: Equipment[]
  }
  constructor() {
    super(ApiMethod.GET, '/equipment', true);
  }
}

export class LoginRoute extends Route{
  data: {
    username: string;
    password: string;
  }
  response: {
    token: string;
  }
  constructor() {
    super()
    this.type = ApiMethod.POST;
    this.url = '/login';
    this.isProtected = false;
  }
}

export class RegisterRoute extends Route{
  data: {
    username: string;
    password: string;
  }
  response: {
    token: string;
  }
  constructor() {
    super();
    this.type = ApiMethod.POST;
    this.url = '/register';
    this.isProtected = false;
  }
}

export class AddEquipmentRoute extends Route{
  data: {
    name: string;
  }
  response: {
    token: string;
  }
  constructor() {
    super();
    this.type = ApiMethod.POST;
    this.url = '/user/equipment/add';
    this.isProtected = false;
  }
}
