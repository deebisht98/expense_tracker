import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'

async function fetchExpensesTotal() {
  const result = await api.expenses['total-spent'].$get()
  if (!result.ok) {
    throw new Error('Server error')
  }
  const data = await result.json()
  return data
}

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, error, isPending } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: fetchExpensesTotal,
  })

  if (error) {
    return <p>An error occurred: {error.message}</p>
  }

  return (
    <Card className="m-auto w-[350px]">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{isPending ? '...' : data.total}</p>
      </CardContent>
    </Card>
  )
}
