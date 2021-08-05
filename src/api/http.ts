import { Request } from '../plugins/request';
import { LoginParams } from './index'

export class Http {

    private static request: Request = new Request();

    public static getCode(): Promise<any> {
        return this.request.get('/getcode')
    }

    public static login(parmas: LoginParams): Promise<any> {
        return this.request.post('/login', parmas)
    }

    public static getUserlist(): Promise<any> {
        return this.request.get('/userlist')
    }
}
