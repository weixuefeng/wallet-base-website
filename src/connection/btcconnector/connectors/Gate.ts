import { ConnectorNotFoundError } from '../errors'
import { BtcConnectorName, Network } from '../types'
import { AccountsChangedHandler, Connector, ConnectorOptions, DisconnectHandler, NetworkChangedHandler } from './types'

export class GateConnector implements Connector {
  name: BtcConnectorName
  onAccountsChanged?: AccountsChangedHandler
  onNetworkChanged?: NetworkChangedHandler
  onDisconnect?: DisconnectHandler

  constructor(options?: ConnectorOptions) {
    this.name = 'Gate'
    this.onAccountsChanged = options?.onAccountsChanged
    this.onNetworkChanged = options?.onNetworkChanged
    this.onDisconnect = options?.onDisconnect
  }

  getProvider() {
    if (typeof window === 'undefined') return
    if (typeof (window as any).gatewallet.bitcoin === 'undefined') {
      throw new ConnectorNotFoundError()
    }
    return (window as any).gatewallet.bitcoin
  }

  async connect() {
    try {
      const provider = this.getProvider()

      if (provider.on) {
        provider.on('accountsChanged', async (accounts: string[]) => {
          if (!!accounts && accounts.length > 0) {
            this.onAccountsChanged?.(accounts[0], 'publicKey')
          } else {
            provider.removeAllListeners()
            this.onDisconnect?.()
          }
        })
        provider.on('networkChanged', (network: Network) => {
          this.onNetworkChanged?.(network)
        })
      }

      const accounts: string[] = await provider.requestAccounts()
      const network: Network = await provider.getNetwork()

      return { address: accounts[0], publicKey: '', network }
    } catch (error) {
      console.log('connnector error: ', error)
      throw error
    }
  }

  disconnect(): void {
    const provider = this.getProvider()
    provider.disconnect()
  }

  signMessage: (message?: string) => Promise<string> = message => {
    const provider = this.getProvider()
    const { address } = provider.selectedAccount
    return provider.signMessage(message, { from: address }) as Promise<string>
  }

  sendBitcoin: (address: string, amount: number) => Promise<string> = (address: string, amount: number) => {
    const provider = this.getProvider()
    return provider.sendBitcoin(address, amount) as Promise<string>
  }

  send: (from: string, to: string, value: number) => Promise<string> = (from: string, to: string, value: number) => {
    const provider = this.getProvider()
    return provider.sendBitcoin(to, value) as Promise<string>
  }
}
export {}
