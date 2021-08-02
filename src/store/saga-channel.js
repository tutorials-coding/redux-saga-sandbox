import { take, put, fork, delay, call } from 'redux-saga/effects'
import { channel } from 'redux-saga'
import { uploadFile } from '../api/mock-file-uploader'

function* handleChannelRequest(requestChannel) {
  while (true) {
    const payload = yield take(requestChannel)
    console.log('payload', payload)
    yield delay(2000)
  }
}

export function* channelSaga() {
  const requestChannel = yield call(channel)

  yield fork(handleChannelRequest, requestChannel)

  yield put(requestChannel, { payload: 'hello' })
  yield put(requestChannel, { payload: 'hello' })
  yield put(requestChannel, { payload: 'hello' })
  yield put(requestChannel, { payload: 'hello' })
}
