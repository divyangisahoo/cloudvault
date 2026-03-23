import { useState, useEffect } from "react";
import API from "@/services/api";
import FileCard from "@/components/FileCard";

const Favorites = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/favorites");
      setFiles(data);
    } catch {
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFavorites(); }, []);

  const handleDownload = async (id: number) => {
    try {
      const { data } = await API.get(`/download/${id}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = files.find(f => f.id === id)?.filename || "file";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {}
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Favorites</h1>
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : files.length === 0 ? (
        <p className="text-muted-foreground text-sm">No favorite files.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files.map((file) => (
            <FileCard key={file.id} file={file} onDownload={handleDownload} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
