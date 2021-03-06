import {ActionCreatorHelper} from 'saga-reducer-factory';

const actionsList = [
    'UPDATE',
    'CREATE',
    'DELETE',
    'FREEZE',
    'UNFREEZE',
    'TOGGLE_DISPLAY_FROZEN',
    'EDIT',
    'FILTER_BY_CLINIC_ID',
    'FETCH_FOLLOWER_RESONATORS'
];

export const types = ActionCreatorHelper.createTypes(actionsList, 'FOLLOWERS_');
export const actions = ActionCreatorHelper.createActions(actionsList, 'FOLLOWERS_');
