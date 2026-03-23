import { useState, useEffect } from "react";
import API from "@/services/api";
import FileCard from "@/components/FileCard";

const Trash = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/trash");
      setFiles(data);
    } catch {
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTrash(); }, []);

  const handleRestore = async (id: number) => {
    try { await API.post(`/restore/${id}`); fetchTrash(); } catch {}
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Trash</h1>
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : files.length === 0 ? (
        <p className="text-muted-foreground text-sm">Trash is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files.map((file) => (
            <FileCard key={file.id} file={file} onRestore={handleRestore} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;
