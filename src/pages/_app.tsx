/*
 * @Author:
 * @Date: 2022-10-12 19:08:34
 * @LastEditors:
 * @LastEditTime: 2024-01-08 11:17:14
 * @FilePath: /wallet-base-website/src/pages/_app.tsx
 */
import 'styles/style.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import 'i18n'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
