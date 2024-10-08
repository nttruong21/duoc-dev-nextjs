import { isServerSide } from "@/lib/utils";

class ClientSession {
  private _token?: string;

  public get token(): typeof this._token {
    return this._token;
  }

  public set token(value: string | undefined) {
    if (isServerSide()) {
      throw new Error("Can not set token on server side");
    }
    this._token = value;
  }
}

const clientSession = new ClientSession();

export default clientSession;
