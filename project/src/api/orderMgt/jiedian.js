import {post} from '../../utils/request.js'

export const getJieDianData = info =>{
  const data = {
    Request: {
      BusiCode: 'DCInfo_Search',
      BusiParams: [{
        province:info.province,
        city:info.city,
        district:info.district,
        dc_address:info.dc_address
      },
      {
        pageSize: info.pageSize == "" ? "" : info.pageSize,
        pageNum: info.pageNum == "" ? "" : info.pageNum,
      }]
    }
  }
  return post('/sdc/address_info',data);
}

export const addJieDianData = info =>{
  const data = {
      Request: {
        BusiCode: "DCInfo_Add",
        BusiParams: [{
          PROVINCE:info.PROVINCE,
          CITY:info.CITY,
          DISTRICT:info.DISTRICT,
          DC_NAME:info.DC_NAME,
          DC_ADDRESS:info.DC_ADDRESS,
          ADDR_ID_YLW:info.ADDR_ID_YLW
        }]
      }
    }
  return post('/sdc/DCInfo/Add',data)
}

export const modifyJieDianData = info =>{
  const data = {
    Request: {
      BusiCode: "DCInfo_Update",
      BusiParams: [{
        DC_ADDR_ID:info.DC_ADDR_ID,
        PROVINCE:info.PROVINCE,
        CITY:info.CITY,
        DISTRICT:info.DISTRICT,
        DC_NAME:info.DC_NAME,
        DC_ADDRESS:info.DC_ADDRESS,
        ADDR_ID_YLW:info.ADDR_ID_YLW,
        state:info.state
      }]
    }
  }
  return post('/sdc/DCInfo/Update',data)
}

export const deleteJieDianData = info =>{
  const data = {
    Request: {
      BusiCode: "DCInfo_Delete",
      BusiParams: info
      // [
      //   {DC_ADDR_ID:info[0].DC_ADDR_ID}
      // ]
    }
  }
  return post('/sdc/DCInfo/Delete',data)
}

export const downloadTemplate = ()=>{
  // const data = '?moduleName=Address'
  // return get('/sdc/ excel/download',data);
  // return get('/sdc/ excel/download?moduleName=Address');
}
