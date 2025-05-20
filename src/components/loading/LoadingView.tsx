import LoadingSpinner from "@/components/LoadingSpinner";
import { SimpleLayout } from "@/components/SimpleLayout";

export const LoadingView = () => {
	return (
		<SimpleLayout>
			<div className="flex h-screen items-center justify-center">
				<LoadingSpinner />
			</div>
		</SimpleLayout>
	);
};
