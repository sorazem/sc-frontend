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
        .post(API_URL + 'certificates' , {}, { headers: authHeader(), params: { emit_from: "event", event_slug } })
    }

    emitUserEventCertifications(event_slug, user_id){
        return axios
        .post(API_URL + 'certificates' , {}, { headers: authHeader(), params: { emit_from: "user", event_slug, user_id } })
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

    getTypes(){
        return axios
        .get(API_URL + 'type', { headers: authHeader() })
        .then(response => response.data)
    }

    getCategories(){
        return axios
        .get(API_URL + 'category', { headers: authHeader() })
        .then(response => response.data)
    }

    getLocations(){
        return axios
        .get(API_URL + 'location', { headers: authHeader() })
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
        .delete(API_URL + 'speaker/' + speaker_id, { headers: authHeader() })
        .then(response => response.data)
    }

    getEventReservations(event_slug) {
        return axios
        .get(API_URL + 'events/' + event_slug + '/reservations', { headers: authHeader() })
        .then(response => response.data)
    }

    deliverReservation(event_slug, reservation_id) {
        return axios
        .put(API_URL + 'events/' + event_slug + '/reservations/' + reservation_id, { delivered: true }, { headers: authHeader() })
        .then(response => response.data)
    }

    createTalk(body){
        return axios
        .post(API_URL + 'talks', body, { headers: authHeader() })
        .then(response => response.data)
    }

    updateTalk(talk){
        return axios
        .put(API_URL + 'talks/' + talk.id, talk, { headers: authHeader() })
        .then(response => response.data)
    }

    createSpeaker(body){
        return axios
        .post(API_URL + 'speaker', body, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } })
        .then(response => response.data)
    }

    updateSpeaker(speaker){
        return axios
        .put(API_URL + 'speaker/' + speaker.id, speaker, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } })
        .then(response => response.data)
    }

    createMerch(event_slug, body) {
        return axios
        .post(API_URL + 'events/' + event_slug + '/merches', body, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } })
        .then((response) => response.data);
    }

    updateMerch(event_slug, merch) {
        return axios
        .put(API_URL + 'events/' + event_slug + '/merches/' + merch.id, merch, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } })
        .then((response) => response.data);
    }

    createNotice(event_slug, body) {
        return axios
        .post(API_URL + 'events/' + event_slug + '/notifications', body, { headers: authHeader() })
        .then((response) => response.data);
    }

    updateNotice(event_slug, notification) {
        return axios
        .put(API_URL + 'events/' + event_slug + '/notifications/' + notification.id, notification, { headers: authHeader() })
        .then((response) => response.data);
    }

    createCategory(body) {
        return axios
        .post(API_URL + 'categories', body, { headers: authHeader() })
        .then((response) => response.data);
    }

    updateCategory(category) {
        return axios
        .put(API_URL + 'categories/' + category.id, category, { headers: authHeader() })
        .then((response) => response.data);
    }

    getEventUsers(event_slug) {
        return axios
        .get(API_URL + 'events/' + event_slug + '/users', {headers: authHeader()})
        .then((response) => response.data);
    }
}

export default new EventService();
