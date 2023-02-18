import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'
import { fetcher } from '../pages/api/common'


export const useFetchEmp = (prop = {}) => {
  const { isStopFetch, empId } = prop
  const { query } = useRouter()
  const id = Object.hasOwn(prop, 'empId') ? empId : query.id

  return useSWRImmutable(!isStopFetch && id ? ['/api/get-employer', id] : null, (url) => fetcher(`${url}/${id}`))
}
