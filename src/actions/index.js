import actions from '../common/actiontype';
import * as paths from '../common/path';

export default {
    getPageData: (url) => ({
        [actions.CALL_API] : {
            types: [
                actions.DATALOAD_REQUEST,
                actions.DATALOAD_SUCCESS,
                actions.DATALOAD_FAILURE,
            ],
            promise: client => client.get(url),
        },
    }),
};
