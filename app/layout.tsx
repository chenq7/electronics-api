import '../styles/globals.css'

export const metadata = {
  title: 'Electronics Parts API',
  description: 'Simple client to parse data for electronics parts',
}


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <body>
        <div className='header-div'>
          <a href='/'>Home</a>
          <a href='/arrow'>Arrow data</a>
          <a href='/tti'>TTI data</a>
        </div>
        <h1>Electronic Parts API</h1>
        {children}
      </body>
    </html>
  )
}
