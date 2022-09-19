import ExpensesOutput from "../components/Output/ExpensesOutput";
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpenses() {
   const [isFetching, setIsFetching] = useState(true);
   const [error, setError] = useState();
   const expensesCtx = useContext(ExpensesContext);

   useEffect(() => {
      async function getExpenses() {
        setIsFetching(true);
        try {
            const expenses = await fetchExpenses();
            expensesCtx.setExpenses(expenses);

        } catch (error) {
            setError('Could not fetch expenses!');
        }
        setIsFetching(false);
      }

      getExpenses();
   }, []);


   if (error && !isFetching) {
      return <ErrorOverlay message={error} />;
   }
   if (isFetching) {
      return <LoadingOverlay />;
   }

   const recentExpenses = expensesCtx.expenses.filter((expense) => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);

      return (expense.date >= date7DaysAgo) && (expense.date <= today);
   });

   return (
   <ExpensesOutput expenses={recentExpenses} expensesPeriod='last 7 days' fallbackText='No expenses registered' />);
}

export default RecentExpenses;