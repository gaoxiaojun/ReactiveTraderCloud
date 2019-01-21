import React from 'react'
import { Trade } from 'rt-types'

import { ThemeName, ThemeStorage } from 'rt-theme'
import TradeNotification from '../shell/notification/TradeNotification'

declare const window: any

interface Message {
  tradeNotification: Trade
}

interface State {
  message: Message | null
}

export class NotificationRoute extends React.Component<{}, State> {
  state: State = {
    message: null,
  }

  componentDidMount = () => {
    window.onNotificationMessage = (message: Message) => {
      this.setState({ message }, () =>
        // send a message back to the main application - required to restore the main application window if it's minimised
        fin.desktop.Notification.getCurrent().sendMessageToApplication('ack'),
      )
    }
  }

  onDismissNotification = () => fin.desktop.Notification.getCurrent().close()

  highlightTrade = () => {
    window.FSBL.Clients.RouterClient.publish('test-topic', { test: 'test' })
    console.log('clicked')
  }

  render() {
    const { message } = this.state
    return message == null ? null : (
      <ThemeStorage.Provider default={ThemeName.Dark}>
        <TradeNotification
          message={message.tradeNotification}
          dismissNotification={this.onDismissNotification}
          highlight={this.highlightTrade}
        />
      </ThemeStorage.Provider>
    )
  }
}

export default NotificationRoute
