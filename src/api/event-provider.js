export const createEventProvider = () => {
  let value = 0

  const subscribers = {}

  const triggerEvent = (event, payload) =>
    (subscribers[event] || []).map((cb) => cb(payload))

  setInterval(() => {
    value += 1
    triggerEvent('value', { payload: value })
  }, 2000)

  return {
    subscribe: (event, handler) => {
      if (!subscribers[event]) {
        subscribers[event] = []
      }
      subscribers[event].push(handler)
    },
    unsubscribe: (event, handler) => {
      subscribers[event] = subscribers[event].filter((sub) => sub !== handler)
    },
  }
}
