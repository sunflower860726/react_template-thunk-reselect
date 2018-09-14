import { createSelector } from 'reselect';

const getSubmitState = state => state.bitCoinData.isPageDataLoaded;
const getPageData = state => state.bitCoinData.pageData;

export default createSelector([
    getSubmitState,
    getPageData,
], (isPageDataLoaded, pageData) => ({
    isPageDataLoaded,
    pageData,
}));