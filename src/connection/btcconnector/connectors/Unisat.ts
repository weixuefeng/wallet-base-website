import { ConnectorNotFoundError } from '../errors'
import { BtcConnectorName, Network } from '../types'
import { AccountsChangedHandler, Connector, ConnectorOptions, DisconnectHandler, NetworkChangedHandler } from './types'

export class UnisatConnector implements Connector {
  name: BtcConnectorName
  onAccountsChanged?: AccountsChangedHandler
  onNetworkChanged?: NetworkChangedHandler
  onDisconnect?: DisconnectHandler

  constructor(options?: ConnectorOptions) {
    this.name = 'Unisat'
    this.onAccountsChanged = options?.onAccountsChanged
    this.onNetworkChanged = options?.onNetworkChanged
    this.onDisconnect = options?.onDisconnect
  }

  getProvider() {
    if (typeof window === 'undefined') return
    if (typeof (window as any).unisat === 'undefined') {
      throw new ConnectorNotFoundError()
    }

    return (window as any).unisat
  }

  async connect() {
    try {
      const provider = this.getProvider()

      if (provider.on) {
        provider.on('accountsChanged', async (accounts: string[]) => {
          if (!!accounts && accounts.length > 0) {
            const publicKey: string = await provider.getPublicKey()
            this.onAccountsChanged?.(accounts[0], publicKey)
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
      const publicKey: string = await provider.getPublicKey()
      const network: Network = await provider.getNetwork()

      return { address: accounts[0], publicKey, network }
    } catch (error) {
      console.log('connnector error: ', error)
      throw error
    }
  }

  // Unisat does not provide a disconnect method at this time
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect(): void {}

  signMessage: (message?: string) => Promise<string> = message => {
    const provider = this.getProvider()
    return provider.signMessage(message) as Promise<string>
  }

  sendBitcoin: (address: string, amount: number) => Promise<string> = (address: string, amount: number) => {
    const provider = this.getProvider()
    return provider.sendBitcoin(address, amount) as Promise<string>
  }

  send: (from: string, to: string, value: number) => Promise<string> = (from: string, to: string, amount: number) => {
    const provider = this.getProvider()
    return provider.sendBitcoin(to, amount) as Promise<string>
  }
}

export {}
