"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Mock data
const mockWorkspace = { slug: "mock-workspace" };
const mockProject = { slug: "mock-project" };

interface CreateDocumentPayload {
  collectionId?: string;
}

interface Document {
  id: string;
  collectionId?: string;
  ts: Date;
}

// Simulate API behavior with delay
const simulateDocumentCreation = async ({ collectionId }: CreateDocumentPayload): Promise<Document> => {
  await new Promise((res) => setTimeout(res, 600)); // simulate network delay

  return {
    id: `doc-${Math.floor(Math.random() * 100000)}`,
    collectionId,
    ts: new Date(),
  };
};

const makeDocUrl = ({
  workspaceSlug,
  projectSlug,
  docId,
}: {
  workspaceSlug: string;
  projectSlug?: string;
  docId: string;
}) => `/workspaces/${workspaceSlug}${projectSlug ? `/projects/${projectSlug}` : ""}/docs/${docId}`;

export const useCreateDocument = () => {
  const router = useRouter(); // ✅ correct naming

  return useMutation<Document, Error, CreateDocumentPayload>({
    mutationFn: simulateDocumentCreation,

    onError: (err) => {
      console.error("Mock doc creation failed:", err);
      toast.error("Mock: Failed to create document");
    },

    onSuccess: (newDocument) => {
      const url = makeDocUrl({
        workspaceSlug: mockWorkspace.slug,
        projectSlug: mockProject.slug,
        docId: newDocument.id,
      });

      router.push(url); // ✅ use `push` instead of `navigate`
    },
  });
};
