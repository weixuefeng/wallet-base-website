import { BtcConnectorName, Network } from '../types'

export type AccountsChangedHandler = (address: string, publicKey: string) => void
export type NetworkChangedHandler = (network: Network) => void
export type DisconnectHandler = () => void

export interface ConnectorOptions {
  onAccountsChanged?: AccountsChangedHandler
  onNetworkChanged?: NetworkChangedHandler
  onDisconnect?: DisconnectHandler
}

export interface Connection {
  address: string
  publicKey: string
  network: Network
}

export interface Connector {
  name: BtcConnectorName
  getProvider(): unknown
  connect(options?: ConnectorOptions): Promise<Connection>
  disconnect(): void
  signMessage: (message?: string) => Promise<string>
  sendBitcoin: (address: string, amount: number) => Promise<string>
  send: (from: string, to: string, value: number) => Promise<string>
}

export {}
