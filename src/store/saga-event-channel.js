import { eventChannel, END } from 'redux-saga'
import { call, take } from 'redux-saga/effects'
import { createEventProvider } from '../api/event-provider'

const createEventProviderChannel = (eventProvider) => {
  return eventChannel((emit) => {
    const valueHandler = (event) => {
      if (event.payload > 3) {
        emit(END)
        return
      }
      emit(event.payload)
    }

    eventProvider.subscribe('value', valueHandler)

    return () => {
      eventProvider.unsubscribe('value', valueHandler)
      console.log('unsubscribed')
    }
  })
}

export function* eventChannelSaga() {
  const eventProvider = yield call(createEventProvider)
  const eventProviderChannel = yield call(
    createEventProviderChannel,
    eventProvider
  )

  try {
    while (true) {
      const payload = yield take(eventProviderChannel)
      console.log('payload from event channel', payload)
    }
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('event channel terminated')
  }
}
