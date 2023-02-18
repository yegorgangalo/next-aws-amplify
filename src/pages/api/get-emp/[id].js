import { fetcher, sendResponse } from '../common'

const { BASE_SHOP_URL } = process.env

export const fetchEmployerDataHandler = (req, res) => {
  const empId = req.query.id
  const url = `${BASE_SHOP_URL}drGetEmployer/?emp_id=${empId}`
  console.log('fetchEmployerDataHandler', { BASE_SHOP_URL, url })// cloudwatch

  return fetcher(url)
    .then((apiDate) => {
      console.log('fetcher result:', apiDate);
      if (apiDate.errno) {
        throw Error(apiDate.message || 'Server error')
      }
      return sendResponse({ data: { apiDate }, res })
    })
    .catch((err) => {
      console.log('fetcher catch err:', err);
      return sendResponse({ data: { err: err.message }, status: 500, res })
    })
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
