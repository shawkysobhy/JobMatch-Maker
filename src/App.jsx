import Header from './components/Header';
import JobList from './components/JobList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export default function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Header />
			<JobList />
			{/* <Footer/> */}
		</QueryClientProvider>
	);
}
