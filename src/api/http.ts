import { Request } from '../utils/request';
import { LoginParams, UserlistParams } from './index'
export class Http {

    private static request: Request = new Request();

    public static getCode(): Promise<any> {
        return this.request.get('/getcode')
    }

    public static login(params: LoginParams): Promise<any> {
        return this.request.post('/login', params)
    }

    public static getUserlist(params: UserlistParams): Promise<any> {
        return this.request.post('/userlist', params)
    }

}
