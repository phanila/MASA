import { ApiMethod } from '@/api'

export abstract class Route {
  type: ApiMethod;
  url: string;
  data: never;
  response: never;
  isProtected: boolean;
}
