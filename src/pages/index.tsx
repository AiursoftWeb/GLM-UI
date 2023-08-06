import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

async function httpPost(theUrl: string | URL, keyWord: string) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", theUrl, false); // false for synchronous request
  xmlHttp.send(JSON.stringify({ prompt: keyWord }));
  return xmlHttp.response;
}
const dataInit = async (key: string) => {
  const data = await httpPost('https://glm.aiursoft.cn', key)
  return JSON.parse(data)
}

export default function Home() {
  const [ans, setAns] = useState<string>('测试')
  const [search, setSearch] = useState<string>('')
  useEffect(() => {
  }, [])
  return (
    <main
      className={`min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>GLM-UI</h1>
      <div className='flex'>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={async () => {
          const tmp = await dataInit(search)
          setAns(tmp?.response)
        }}>search</button>
      </div>
      <h1>{ans}</h1>
    </main>
  )
}
