export class WebResponse<T> {
  meta: Meta;
  data?: T;
  errors?: string;
}

class Meta {
  code: number;
  message: string;
  status: string;
}
