import {post} from '../../utils/request.js'

export const getDaiShiGong = () =>{
  const data = {
    Request: {
      BusiCode: "assignmentStatistics",
      BusiParams:[{
      }]
    }
  }
  return post('/sdc/ assignmentStatistics',data)
}

export const DaiSHenHe = ()=>{
  const data={
    Request:{
      BusiCode:"custCountNeedCheck",
      BusiParams:[{
      }]
    }
  }
  return post('/sdc/custCount',data)
}


export const YuQi = ()=>{
  const data={
    Request:{
      BusiCode:"custCountNeedCheck",
      BusiParams:[{
      }]
    }
  }
  return post('/sdc/operation_index',data)
}
