import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class EventService{
    listEvents(){
        return axios
        .get(API_URL + 'events', {})
        .then(response => response.data
        );
    }

    getEventSchedule(eventSlug){
        return axios
        .get(API_URL + 'events/' + eventSlug)
        .then(response => response.data);
    }

    enroll(talk_ids, event_slug){
        return axios
        .post(API_URL + 'participate' , {talk_ids, event_slug}, { headers: authHeader() })
    }

    getUserAgenda(event_slug){
        return axios
        .get(API_URL + 'vacancies/me', { headers: authHeader(), params: {event_slug} })
        .then(response => response.data)
    }

    getEventMerchandise(event_slug){
        return axios
        .get(API_URL + 'events/' + event_slug + '/merches')
        .then(response => response.data)
    }

    deleteMerch(event_slug, merch_id) {
        return axios
        .delete(API_URL + 'events/' + event_slug + '/merches/' + merch_id, { headers: authHeader() })
        .then(response => response.data)
    }

    getEventNotices(event_slug){
        return axios
        .get(API_URL + 'events/' + event_slug + '/notifications', { headers: authHeader() })
        .then(response => response.data)
    }

    isEventStaff(event_slug){
        return axios
        .get(API_URL + 'events/' + event_slug + '/staff', { headers: authHeader() })
        .then(response => response.data)
    }

    emitEventCertifications(event_slug){
        return axios
        .post(API_URL + 'events/' + event_slug + '/certificates' , {}, { headers: authHeader() })
    }

    getEventTalks(event_slug){
        return axios
        .get(API_URL + 'events/' + event_slug + '/talks', { headers: authHeader() })
        .then(response => response.data)
    }

    getEventSpeakers(event_slug){
        return axios
        .get(API_URL + 'events/' + event_slug + '/speakers', { headers: authHeader() })
        .then(response => response.data)
    }

    deleteEventTalk(talk_id){
        return axios
        .delete(API_URL + 'talks/' + talk_id, { headers: authHeader() })
        .then(response => response.data)
    }

    deleteEventNotice(event_slug, notification_id) {
        return axios
        .delete(API_URL + 'events/' + event_slug + '/notifications/' + notification_id, { headers: authHeader() })
        .then((response) => response.data);
    }

    deleteEventSpeaker(speaker_id){
        return axios
        .delete(API_URL + 'speakers/' + speaker_id, { headers: authHeader() })
        .then(response => response.data)
    }

    getEventReservations(event_slug) {
        return axios
        .get(API_URL + 'events/' + event_slug + '/reservations', { headers: authHeader() })
        .then(response => response.data)
    }
}

export default new EventService();
