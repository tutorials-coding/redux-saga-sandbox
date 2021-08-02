import { take, put, fork, call, cancel } from 'redux-saga/effects'
import { channel } from 'redux-saga'
import { uploadFile } from '../api/mock-file-uploader'
import { FILES_UPLOADING_PROGRESS, FILES_UPLOADING_START } from './actions'

const handleProgress = (fileUploadingChannel, progressValue) => {
  fileUploadingChannel.put({
    value: progressValue,
  })
}

function* handleFileUploadingChannelEvents(fileUploadingChannel) {
  while (true) {
    const payload = yield take(fileUploadingChannel)
    yield put({
      type: FILES_UPLOADING_PROGRESS,
      payload: {
        value: payload.value,
      },
    })
  }
}

export function* handleFilesUploading() {
  const fileUploadingChannel = yield call(channel)

  yield fork(handleFileUploadingChannelEvents, fileUploadingChannel)

  while (true) {
    yield take(FILES_UPLOADING_START)

    yield fork(uploadFile, {
      url: 'https://server',
      files: ['file1', 'file2'],
      onProgress: (progressValue) =>
        handleProgress(fileUploadingChannel, progressValue),
    })
  }
}
