import apiService from "../ApiInstance/apiService";

class Apis {
  async Authentication(url, credentials) {
    const apiResponse = await apiService.post(
      url + "/Authentication",
      credentials
    );
    return apiResponse.data;
  }

  async IntAuthentication(url, credentials) {
    const apiResponse = await apiService.post(
      url + "/IntAuthentication",
      credentials
    );
    return apiResponse.data;
  }

  async getMessageDetails(url, id) {
    const apiResponse = await apiService.MessageDetails(
      url + "/IntMessageManager/GetMessageDetails",
      id
    );
    return apiResponse;
  }

  async GetMessageList(url, start, end, status) {

    const apiResponse = await apiService.MessageList(
      url + "/IntMessageManager/GetMessageList",
      start,
      end,
      status
    );
    return apiResponse;
  }

  async UpdateBOLMessage(url,data) {
    const apiResponse = await apiService.post(url + "/IntMessageManager/UpdateBOLMessage",data);
    return apiResponse?.data;
  }


  async ProcessMessage(url, id, scode) {
    const apiResponse = await apiService.post(
      url + "/IntMessageManager/ProcessMessage",
      {
        messageId: id,
        nIDType: 1,
        nStatusCode: scode,
      }
    );
    return apiResponse?.data;
  }

}

export default new Apis();
