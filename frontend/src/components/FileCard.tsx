import { Download, Star, Trash2, RotateCcw, FileText } from "lucide-react";

interface FileCardProps {
  file: { id: number; filename: string };
  onDownload?: (id: number) => void;
  onFavorite?: (id: number) => void;
  onDelete?: (id: number) => void;
  onRestore?: (id: number) => void;
}

const FileCard = ({ file, onDownload, onFavorite, onDelete, onRestore }: FileCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
          <FileText className="h-5 w-5 text-accent-foreground" />
        </div>
        <span className="text-sm font-medium text-card-foreground truncate flex-1">
          {file.filename}
        </span>
      </div>

      <div className="flex items-center gap-1 pt-1 border-t border-border">
        {onDownload && (
          <button
            onClick={() => onDownload(file.id)}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>
        )}
        {onFavorite && (
          <button
            onClick={() => onFavorite(file.id)}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
            title="Favorite"
          >
            <Star className="h-4 w-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(file.id)}
            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors ml-auto"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
        {onRestore && (
          <button
            onClick={() => onRestore(file.id)}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
            title="Restore"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FileCard;
