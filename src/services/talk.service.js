import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class TalkService{
    getTalk(talkId){
        return axios
        .get(API_URL + 'talks/' + talkId, {})
        .then(response => response.data);
    }

    sendRating(score, talk_id){
        return axios
        .post(API_URL + 'talks/' + talk_id + '/rate', {score}, { headers: authHeader() })
    }

    checkUserVacancy(talk_id){
        return axios
        .get(API_URL + 'talks/' + talk_id + '/status', { headers: authHeader() })
    }
}

export default new TalkService();