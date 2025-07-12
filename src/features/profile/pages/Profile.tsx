import Box from '@/shared/ui/Box'
import Title from '@/shared/ui/Title'
import React from 'react'
import { useProfile } from '../service/useProfile'

const Profile = () => {
  const {getBuy} = useProfile()
  getBuy({})
  return (
    <Box>
        <Title>Profile</Title>
    </Box>
  )
}

export default React.memo(Profile)