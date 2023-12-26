import apiService from '../ApiInstance/apiService';


class Apis{
    async Authentication(url,credentials) {
        const apiResponse = await apiService.post(url+'/Authentication',credentials);
        return apiResponse.data;
      }
      
    async IntAuthentication(url,credentials) {
        const apiResponse = await apiService.post(url+'/IntAuthentication',credentials);
        return apiResponse.data;
      }

  async getMessageDetails(url,id) {
    const apiResponse = await apiService.MessageDetails(url+'/GetMessageDetails/' + id,id);
    console.log("apiResponseapiResponse", apiResponse)
    return apiResponse.data;
  }

  async GetMessageList(url) {
    const apiResponse = await apiService.MessageList(url+'/IntMessageManager/GetMessageList');
    return apiResponse;
  }

  async UpdateMessage(url) {
    const apiResponse = await apiService.post(url+'/UpdateMessage');
    return apiResponse.data.data;
  }

  async ProcessMessage(url,id) {
    const apiResponse = await apiService.processMessage(url+'/ProcessMessage/'+id);
    return apiResponse.data;
  }

  async IntMessageManager(url,data) {
    const apiResponse = await apiService.post(url+'/IntMessageManager',data) 
    return apiResponse.data;
  }

  async Manifest(url,data) {
    const apiResponse = await apiService.post(url+'/Manifest',data);
    return apiResponse.data;
  }

};

export default new Apis;
