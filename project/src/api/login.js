import {post} from '../utils/request.js'
import md5 from 'js-md5';

export const loginByUsername = info=>{
  const data={
    Request: {
      BusiCode: 'login',
      BusiParams: [{
        login_name: info.user,
        //js-md5的作用是加密（密码）
        login_pwd: md5(info.password)
      }]
    }
  }
  return post('/sdc/cust',data)
}
