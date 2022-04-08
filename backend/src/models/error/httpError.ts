export class HttpError {

  public status: number
  public message: string
  public exception: any

  constructor(status: number, message: string, exception: any) {
    this.status = status
    this.message = message
    this.exception = exception
  }

}
