import fetcher from './fetcher';

export function uploadMedia(followerId, resonatorId, file, mediaKind = 'image') {
    let formData = new FormData();
    formData.append('follower_id', followerId);
    formData.append('reminder_id', resonatorId);
    formData.append('media_kind', mediaKind);
    formData.append('media_title', file.name);
    formData.append('media_data', file);
    return fetcher.upload(`/leader_followers/${followerId}/reminders/${resonatorId}/items`, formData);
}

export function update(followerId, resonator) {
    return fetcher.put(`/leader_followers/${followerId}/reminders/${resonator.id}.json`, resonator);
}

export function create(followerId, resonator) {
    return fetcher.post(`/leader_followers/${followerId}/reminders.json`, resonator);
}

export function addCriterion(resonatorId, criterionId) {
    return fetcher.post(`/reminders/${resonatorId}/criteria`, {
        question_id: criterionId,
        reminder_id: resonatorId
    }, true);
}

export function removeCriterion(resonatorId, reminderCriterionId) {
    return fetcher.delete(`/reminders/${resonatorId}/criteria/${reminderCriterionId}`);
}