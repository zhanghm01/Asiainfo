import {post} from '../../utils/request.js'

export const getOrderData = info => {
  const data = {
    Request: {
      BusiCode: 'userOrderSearch',
      BusiParams: [{
        order_id: info.order_id,
        order_source:info.order_source,
        order_status:info.order_status,
        cust_name:info.cust_name,
        order_time_start:info.formItem.rangeDateVal[0],
        order_time_end:info.formItem.rangeDateVal[1]
      },
      {
        pageSize: info.pageSize == 0 ? 3 : info.pageSize,
        pageNum: info.pageNum == 0 ? 1 : info.pageNum,
      }]
    }
  }
  return post('/sdc/sdcOrder/search',data)
}

