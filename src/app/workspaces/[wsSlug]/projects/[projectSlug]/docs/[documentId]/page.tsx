// src/views/documents/MockDocumentDetailView.tsx
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";

import { MainLayout } from "@/components/MainLayout";
import { 
  mockDocument,
  mockLatestVersion,
  mockWorkspace,
  mockProject
} from "@/mockData";
import { makeProjectHomeUrl } from "@/utils/projects";
import { makeHeadTitle } from "@/utils/strings";
// import { ellipsizeText } from "@cloudy/utils/common";
import { DocumentLoadingPlaceholderWithPadding } from "@/components/DocumentLoadingPlaceholder";
// import { PublishedDocumentView } from "./PublishedDocumentView";
// import { EditorErrorBoundary } from "./editor/EditorErrorBoundary";
// import { EditorView } from "./editor/EditorView";
import { 
  MockDocumentContext,
  MockLatestDocumentVersionContext,
  MockThoughtContext
} from "@/mockHooks";
import Head from "next/head";

const MockDocumentDetailInner = ({ documentId }: { documentId: string }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReady, setIsReady] = useState(true);

  const headTitle = mockDocument.title 
    ? makeHeadTitle(ellipsizeText(mockDocument.title, 16)) 
    : makeHeadTitle("New Doc");

  // Simulate loading state if needed
  const isLoading = false;
  const isLatestDocumentVersionLoading = false;

  if (!isLoading && !mockDocument) {
    if (mockProject) {
      return <Navigate to={makeProjectHomeUrl(mockWorkspace.slug, mockProject.slug)} />;
    }
    return <Navigate to="/" />;
  }

  return (
    // <MockDocumentContext.Provider value={{ 
    //   documentId, 
    //   isEditMode, 
    //   setIsEditMode 
    // }}>
    //   <MockLatestDocumentVersionContext.Provider value={{ latestDocumentVersion: mockLatestVersion }}>
        {/* <EditorErrorBoundary> */}
          <MainLayout className="no-scrollbar relative flex h-full w-screen flex-col overflow-hidden px-0 md:w-full md:px-0 lg:px-0">
            <Head>
              <title>{headTitle}</title>
            </Head>
            {isLoading || isLatestDocumentVersionLoading || !isReady ? (
              <DocumentLoadingPlaceholderWithPadding />
            ) : isEditMode ? (
            //   <MockThoughtContext.Provider value={MockThoughtContext}>
                // <EditorView thought={mockDocument} />
              {/* </MockThoughtContext.Provider> */}
            ) : (
            //   <PublishedDocumentView />
            )}
          </MainLayout>
        {/* </EditorErrorBoundary> */}
      {/* </MockLatestDocumentVersionContext.Provider> */}
    {/* </MockDocumentContext.Provider> */}
  );
};

export const MockDocumentDetailView = () => {
  return <MockDocumentDetailInner documentId={mockDocument.id} />;
};