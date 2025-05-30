import { FilePlusIcon } from "lucide-react";

import { Button } from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";

// import { useCreateDocument } from "../documentDetail/editor/hooks";

export const NewNote = ({ collectionId }: { collectionId?: string }) => {
	// const createDocumentMutation = useCreateDocument();

	return (
		<Button
			variant="outline"
			className="w-full justify-start"
			// onClick={() => createDocumentMutation.mutate({ collectionId })}
			>
				{false ? (
			// {createDocumentMutation.isPending ? (
				<LoadingSpinner size="xs" variant="background" />
			) : (
				<>
					<FilePlusIcon className="size-4" />
					<span>Blank doc{collectionId ? ` in collection` : ""}</span>
				</>
			)}
		</Button>
	);
};
