import Redis from 'ioredis'
import { fetcher, sendResponse } from '../common'

const { BASE_SHOP_URL } = process.env

export const fetchEmployerDataHandler = async (req, res) => {
  try {
    const empId = req.query.id
    const url = `${BASE_SHOP_URL}drGetEmployer/?emp_id=${empId}`

    const redis = new Redis({
      port: 6379,
      host: "127.0.0.1",
    })

    const cache = await redis.get(url)
    console.log('REDIS cache=', { url, cache })//cloudwatch
    if (cache) {
      console.log('load from cache', cache);
      return sendResponse({ data: { apiDate: JSON.parse(cache), isCache: true }, res })
    }

    const apiDate = await fetcher(url)
    console.log('fetcher result:', apiDate);
    if (apiDate.errno) {
      throw Error(apiDate.message || 'Server error')
    }
    redis.set(url, JSON.stringify(apiDate))
    return sendResponse({ data: { apiDate }, res })
  } catch (error) {
    console.log('fetcher catch err:', error);
    return sendResponse({ data: { error: error.message }, status: 500, res })
  }
}

export default function employerController(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      fetchEmployerDataHandler(req, res)
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
