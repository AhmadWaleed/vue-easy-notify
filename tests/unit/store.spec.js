import store from '../../src/plugin/store'

describe('Test Notifications Store', () => {

  afterEach(() => {
    store.resetOptions();
    store.removeAllNotifications();
  });

  it('add message to store', () => {

    store.addNotification('test message.')

    expect(store.state.length).toEqual(1)
    expect(store.state[0].message).toEqual('test message.')
  });

  it('add message as object to store', () => {

    store.addNotification({ message: 'test message.' })

    expect(store.state.length).toEqual(1)
    expect(store.state[0].message).toEqual('test message.')
  });

  it('add mulltipe message to store at once', () => {

    store.notify(['message 1', 'message 2'])

    expect(store.state.length).toEqual(2)
    expect(store.state[0].message).toEqual('message 1')
    expect(store.state[1].message).toEqual('message 2')
  });

  it('add default options to message', () => {
    store.addNotification('message with default options.');


    expect(store.state[0].timeout).toEqual(5000)
    expect(store.state[0].timestamp).toBeTruthy()
    expect(store.state[0].showClose).toEqual(true)
    expect(store.state[0].message).toEqual('message with default options.')
  })

  it('remove notification from store', () => {
    store.addNotification('test message.')

    expect(store.state.length).toEqual(1)

    store.removeNotification(store.state[0].timestamp)

    expect(store.state.length).toEqual(0)
  })

  it('removes all notification from store', () => {
    store.addNotification('test message 1.')
    store.addNotification('test message 2.')

    expect(store.state.length).toEqual(2)

    store.removeAllNotifications()

    expect(store.state.length).toEqual(0)
  })

  it('add options to store', () => {
    store.setOptions({ position: 'top' })

    expect(store.settings).toEqual({
      type: 'info',
      timeout: 5000,
      showClose: true,
      position: 'top'
    })
  })

  it('update existing store options', () => {
    store.setOptions({ type: 'success' })

    expect(store.settings).toEqual({
      type: 'success',
      timeout: 5000,
      showClose: true,
    })
  })

})
