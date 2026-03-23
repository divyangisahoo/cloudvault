import { useState, useEffect, useRef } from "react";
import { Upload, RefreshCw } from "lucide-react";
import API from "@/services/api";
import FileCard from "@/components/FileCard";

const Dashboard = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/files");
      setFiles(data);
    } catch {
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await API.post("/upload", formData);
      fetchFiles();
    } catch {}
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

  const handleFavorite = async (id: number) => {
    try { await API.post(`/favorite/${id}`); fetchFiles(); } catch {}
  };

  const handleDelete = async (id: number) => {
    try { await API.delete(`/delete/${id}`); fetchFiles(); } catch {}
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Files</h1>
        <div className="flex gap-2">
          <button onClick={fetchFiles} className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Refresh">
            <RefreshCw className="h-5 w-5 text-muted-foreground" />
          </button>
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity">
            <Upload className="h-4 w-4" />
            Upload
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : files.length === 0 ? (
        <p className="text-muted-foreground text-sm">No files yet. Upload one to get started.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onDownload={handleDownload}
              onFavorite={handleFavorite}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
