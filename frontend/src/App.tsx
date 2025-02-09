import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  useEffect(() => {
    (async () => {
      // Your asynchronous code here
      try {
        const result = await fetch("/api/expenses/total-spent");
        const data: { total: number } = await result.json();
        setTotalSpent(data.total);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);

  const [totalSpent, setTotalSpent] = useState(0);

  return (
    <Card className="m-auto w-[350px]">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{totalSpent}</p>
      </CardContent>
    </Card>
  );
}

export default App;
