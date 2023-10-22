import {useAppSelector} from './useAppSelector'
import {selectUser} from '@/store/auth/auth.selectors'

export const useUser = () =>  {
  const user = useAppSelector(selectUser)
  return user
}