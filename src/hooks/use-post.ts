import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Data {
	userId: number
	id: number
	title: string
	body: string
}

export const useGetPost = (postId: number = 1) => {
	return useQuery({
		queryKey: ['post', { postId }],
		queryFn: async () => {
			console.log('Start Fetching data with id', postId)
			const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
			return data as Data
		},
	})
}
