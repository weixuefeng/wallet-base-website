import { ConnectorNotFoundError } from '../errors'
import { BtcConnectorName, Network } from '../types'
import { AccountsChangedHandler, Connector, ConnectorOptions, DisconnectHandler, NetworkChangedHandler } from './types'

export class OkxConnector implements Connector {
  name: BtcConnectorName
  onAccountsChanged?: AccountsChangedHandler
  onNetworkChanged?: NetworkChangedHandler
  onDisconnect?: DisconnectHandler

  constructor(options?: ConnectorOptions) {
    this.name = 'OKX'
    this.onAccountsChanged = options?.onAccountsChanged
    this.onNetworkChanged = options?.onNetworkChanged
    this.onDisconnect = options?.onDisconnect
  }

  getProvider() {
    if (typeof window === 'undefined') return
    if (typeof (window as any).okxwallet.bitcoin === 'undefined') {
      throw new ConnectorNotFoundError()
    }
    return (window as any).okxwallet.bitcoin
  }

  async connect() {
    try {
      const provider = this.getProvider()
      if (provider.on) {
        provider.on(
          'connect',
          async ({ address, compressedPublicKey }: { address: string; compressedPublicKey: string }) => {
            if (address && compressedPublicKey) {
              this.onAccountsChanged?.(address, compressedPublicKey)
            }
          }
        )
        provider.on('disconnect', async () => {
          provider.removeAllListeners()
          this.onDisconnect?.()
        })
      }

      const { address, compressedPublicKey }: { address: string; compressedPublicKey: string } =
        await provider.connect()

      return { address, publicKey: compressedPublicKey, network: 'livenet' as Network }
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

  sendBitcoin: (toa: string, amount: number) => Promise<string> = (address: string, amount: number) => {
    const provider = this.getProvider()
    return provider.sendBitcoin(address, amount) as Promise<string>
  }

  send: (from: string, to: string, value: number) => Promise<string> = async (
    from: string,
    to: string,
    value: number
  ) => {
    const provider = this.getProvider()
    var res = (await provider.send({
      from: from,
      to: to,
      value: value / 100000000,
    })) as Promise<object>
    return res['txhash']
  }
}
export {}
