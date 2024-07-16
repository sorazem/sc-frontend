import axios from 'axios';
import authHeader from './auth-header';

class TalkService{
    getTalk(talkId){
        return axios
        .get(process.env.VUE_APP_API_URL + '/talks/' + talkId, {})
        .then(response => response.data);
    }

    sendRating(score, talk_id){
        return axios
        .post(process.env.VUE_APP_API_URL + '/talks/' + talk_id + '/rate', {score}, { headers: authHeader() })
    }

    checkUserVacancy(talk_id){
        return axios
        .get(process.env.VUE_APP_API_URL + '/talks/' + talk_id + '/status', { headers: authHeader() })
    }

    getAttendeeList(talk_id){
        return axios
        .get(process.env.VUE_APP_API_URL + '/talks/' + talk_id + '/staff', { headers: authHeader() })
        .then(response => response.data);
    }

    validatePresence(params){
        return axios
        .post(process.env.VUE_APP_API_URL + '/validate', {}, { headers: authHeader(), params})
        .then(response => response.data)
    }
}

export default new TalkService();
