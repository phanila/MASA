import { ApiMethod } from '@/api'

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

export type Meeting = {
  id: number;
  place: Place;
  name: string;
  description: string;
  interestedCount: number;
  equipment: string;
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

export class AddMeetingRoute extends Route {
  data: {
    meeting: Meeting
  }
  response: never;
  constructor() {
    super(ApiMethod.POST, '/meetings/add', true);
  }
}

