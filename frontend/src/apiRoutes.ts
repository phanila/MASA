import { ApiMethod } from '@/api'

export abstract class Route {
  type: ApiMethod;
  url: string;
  data: never;
  response: never;
  isProtected: boolean;
}

export class GetMeetingsRoute extends Route{
  data: never;
  response: {
    meetings: {
      id: number;
      title: string;
      description: string;
      date: string;
      time: string;
    }[]
  }
  constructor() {
    super()
    this.type = ApiMethod.GET;
    this.url = '/meetings';
    this.isProtected = true;
  }
}
