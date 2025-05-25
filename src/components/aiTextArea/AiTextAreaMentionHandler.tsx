import { forwardRef } from "react";

const MockFileSearch = ({ query, onSelect }) => (
  <div className="p-2">
    <div>Mock File Search for: {query}</div>
    <button onClick={() => onSelect({ path: "src/index.js", fileName: "index.js", fileUrl: "https://github.com/owner/repo1/blob/main/src/index.js" })}>
      Select index.js
    </button>
  </div>
);

export const AiTextAreaMentionHandler = forwardRef(({ query, command }, ref) => {
  return (
    <div className="rounded-md border border-gray-300 bg-white shadow-md border-2 border-red-200 p-2">
      <MockFileSearch
        query={query}
        onSelect={(file) => command({ id: file.path, label: file.fileName, url: file.fileUrl })}
      />
    </div>
  );
});