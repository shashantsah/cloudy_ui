
// import { useQuery } from "@tanstack/react-query";
// import { useWorkspaceStore } from "@/stores/workspace";

// export const useCustomerStatus = () => {
// 	const { workspace } = useWorkspaceStore();

// 	return useQuery({
// 		queryKey: paymentsQueryKeys.customerStatus(workspace?.slug),
// 		queryFn: () => {
// 			return apiClient
// 				.get<PaymentsCustomersStatusGetResponse>("/api/payments/customers/status", {
// 					params: { wsSlug: workspace!.slug },
// 				})
// 				.then(res => {
// 					return res.data;
// 				});
// 		},
// 		enabled: Boolean(workspace),
// 		retry: 3,
// 		refetchInterval: 1000 * 60,
// 	});
// };



// src/utils/useCustomerStatus.ts

export const useCustomerStatus = () => {
	return {
		data: {
			customerStatus: {
				isTrialing: true,
				remainingDaysInTrial: 7,
			},
		},
		isLoading: false,
		error: null,
	};
};
