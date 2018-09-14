import actions from '../../common/actiontype';

const initialState = {
    isSubmitting: false,
    isPageDataLoaded: false,
    pageData: [],
};

const actionMap = {
    [actions.DATALOAD_REQUEST]: state => ({ ...state, isSubmitting: true, isPageDataLoaded: false }),
    [actions.DATALOAD_SUCCESS]: (state, { result }) => ({ ...state, isSubmitting: false, isPageDataLoaded: true, pageData: result.data }),
    [actions.DATALOAD_FAILURE]: state => ({ ...state, isSubmitting: false, isPageDataLoaded: false }),
};

export default (state = initialState, action) => {
    if (actionMap[action.type]) {
        return actionMap[action.type](state, action);
    }

    return state;
};
