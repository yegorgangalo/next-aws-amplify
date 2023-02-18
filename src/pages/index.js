import { useState, useEffect } from 'react'
import Head from 'next/head'
import { fetchEmployerDataHandler } from '../pages/api/get-emp/[id]'
import { useFetchEmp } from '@/hooks/useFetchEmp'
import JsonFormatter from 'react-json-formatter'

const jsonStyle = {
  propertyStyle: { color: 'red' },
  stringStyle: { color: 'green' },
  numberStyle: { color: 'darkorange' }
}

export default function Home(props) {
  const { serverEmployerData } = props

  console.log('serverEmployerData=', serverEmployerData);

  const [empData, setEmpData] = useState(serverEmployerData || null)
  const [empError, setEmpError] = useState(null)

  const { data, error, loading } = useFetchEmp({ serverData: serverEmployerData })

  useEffect(() => {
    if (data?.apiDate) {
      setEmpData(data)
    }
  }, [data])

  useEffect(() => {
    error && setEmpError(error)
  }, [error])

  return (
    <>
      <Head>
        <title>Next js Amplify test deploy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {loading && <div>...loading</div>}
        {empData && <JsonFormatter json={JSON.stringify(empData)} tabWith={4} jsonStyle={jsonStyle} /> }
        {empError && <p>empError: {empError}</p>}
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  // const { query } = context

  //----------------get employer data----------------------
  const serverEmployerData = await fetchEmployerDataHandler({ query: { id: 20023 } })
  console.log('Test getServerSideProps EmployerData=', serverEmployerData) //CloudWatch
  //-------------------------------------------------------

  return {
    props: {
      serverEmployerData,
    },
  }
}
