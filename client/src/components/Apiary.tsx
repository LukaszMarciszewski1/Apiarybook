import React from 'react'
import { 
  useGetAllApiariesQuery,
  useGetApiaryQuery,
  useCreateApiaryMutation,
  useUpdateApiaryMutation,
  useDeleteApiaryMutation,
 } from "../store/api/apiaries";

const Apiary = () => {
  const {data, error, isLoading} = useGetAllApiariesQuery()
  if(data){
    console.log(data[0].createdAt)
  }
  return (
    <div>
       
    </div>
  )
}

export default Apiary