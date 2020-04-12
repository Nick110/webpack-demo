/** @format */

import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {request} from '@/utils/fetch';
import {searchAction} from '@/store/actions/home';

function* search(action) {
    const {keywords, type = 1, offset = 0, limit = 30} = action.payload;
    console.log(keywords);
    const url = `/search?keywords=${keywords}&type=${type}&offset=${offset}&limit=${limit}`;
    const res = yield request(url, {});
    if (res.code === 200) {
        yield put(searchAction(res.result.songs));
    }
}

export default function* searchSaga() {
    yield takeLatest('SEARCH', search);
}
