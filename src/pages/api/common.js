export const fetcher = (...args) => {
  return fetch(...args).then((res) => {
    if (!res.ok) {
        console.log('Response is not ok: ', {
          request_args: JSON.parse(JSON.stringify(args)),
          response: JSON.parse(JSON.stringify(res)),
        })
      return Promise.reject({
        status: res.status,
        message: `Response is not ok. ${res.statusText}`,
      })
    }
    return res.json()
  })
}

//------------send response handler-------------
export const sendResponse = ({ data, status = 200, res }) => {
  if (!res) {
    return data
  }
  res.status(status).json(data)
}

const commonService = {
  fetcher,
  sendResponse,
}

export default commonService
