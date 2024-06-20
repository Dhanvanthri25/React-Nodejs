import axios from 'axios';

class AxiosService {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_END_POINT
    });

    // Set up request interceptor to include authorization header
    this.instance.interceptors.request.use(config => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });
  }


  

  async Login(email, password) {
    try {
      const response = await this.instance.post('user/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async Register(formData) {
    try {
      const response = await this.instance.post('user/register', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getallUsers() {
    try {
      const response = await this.instance.get('user/get_all_users');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const response = await this.instance.get(`user/getbyid/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(userId, updatedUserData) {
    try {
      const response = await this.instance.put(`user/updatebyid/${userId}`, updatedUserData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(userId) {
    try {
      const response = await this.instance.delete(`user/deletebyid/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addRole(roleData) {
    try {
      const response = await this.instance.post('role/addrole', roleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getRoles() {
    try {
      const response = await this.instance.get('role/get_all_roles');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getRolebyid(userId) {
    try {
      const response = await this.instance.get(`role/get_role_byId/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateRoleById(userId, updatedUserData) {
    try {
      const response = await this.instance.put(`role/UpdateById/${userId}`, updatedUserData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteRoleById(userId) {
    try {
      const response = await this.instance.delete(`role/DeletebyId/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addPermitType(permitData) {
    try {
      const response = await this.instance.post('permit/addpermittype', permitData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getallPermittype() {
    try {
      const response = await this.instance.get('/permit/getallpermittype');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPermitbyId(userId) {
    try {
      const response = await this.instance.get(`/permit/get_permitby_Id/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updatepermit(userId, updpermitData) {
    try {
      const response = await this.instance.put(`/permit/update_permitby_Id/${userId}`, updpermitData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deletepermit(userId) {
    try {
      const response = await this.instance.delete(`/permit/delete_permitby_Id/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addDescription(descriptionData){
    try{
      const response = await this.instance.post('Description/addDescription' ,descriptionData );
      return response.data;
    }catch(error){
      throw error;
    }   
  }

  async getalldescriptions(){
    try{
      const response = await this.instance.get('Description/getallDescription' );
      return response.data;
    }catch(error){
      throw error;
    }
  }

  async getDesbyId(UserId)  {
    try{
      const response = await this.instance.get(`Description/getbyId/${UserId}`);
      return response.data;
    }catch(error){
      throw error;
    }
  }

  async updateDescription(UserId, Updatedata){
    try{
      const response = await this.instance.put(`Description/updateDes/${UserId}` ,Updatedata );
      return response.data;
    }catch(error){
      throw error;
    }
  }

  async DeleteDescription(UserId){
    try{
      const response = await this.instance.delete(`Description/deleteDes/${UserId}`);
      return response.data;
    }catch(error){
      throw error;
    }
  }

  async AddQuestions(formdata){
    try{
      const response = await this.instance.post('Question/add_question' , formdata);
      return response.data;
    }catch(error){
      throw error;
    }
  }


  async getQuestions(permitCode) {
    try {
      const response = await this.instance.get('Question/get_questions', { params: { permitCode } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getQuesbyId(UserId)  {
    try{
      const response = await this.instance.get(`Question/getbyId/${UserId}`);
      return response.data;
    }catch(error){
      throw error;
    }
  }

  async updateQuestion(UserId, Updatedata){
    try{
      const response = await this.instance.put(`Question/updateQuestionsby_Id/${UserId}` ,Updatedata );
      return response.data;
    }catch(error){
      throw error;
    }
  }

  async DeleteQuestion(UserId){
    try{
      const response = await this.instance.delete(`Question/deleteQuestion/${UserId}`);
      return response.data;
    }catch(error){
      throw error;
    }
  }

}

const axiosService = new AxiosService();
export default axiosService;
