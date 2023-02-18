import { fetcher, sendResponse } from '../common'

const { BASE_SHOP_URL } = process.env

export const fetchEmployerDataHandler = (req, res) => {
  const empId = req.query.id
  return fetcher(`${BASE_SHOP_URL}drGetEmployer/?emp_id=${empId}`)
    .then((apiDate) => {
      if (apiDate.errno) {
        throw Error(apiDate.message || 'Server error')
      }
      return sendResponse({ data: { apiDate }, res })
    })
    .catch((err) => {
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
