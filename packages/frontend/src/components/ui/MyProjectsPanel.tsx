import { useEffect, useState } from 'react';
import { useUiStore } from '../../store/uiStore';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useEditorStore, DEFAULT_CODE } from '../../store/editorStore';
import { 
  X, 
  Plus, 
  Cpu, 
  Trash2, 
  Globe, 
  Lock, 
  Edit2, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { 
  loadProjectsForCurrentUser, 
  deleteProject, 
  toggleProjectVisibility, 
  renameProject, 
  loadProjectById,
  ProjectSummary
} from '../../services/projectService';
import { formatDistanceToNow } from 'date-fns';

import toast from 'react-hot-toast';
import { clsx } from 'clsx';

export function MyProjectsPanel() {
  const { isMyProjectsOpen, setMyProjectsOpen } = useUiStore();
  const resetWorkspace = useWorkspaceStore(state => state.resetWorkspace);
  const setCode = useEditorStore(state => state.setCode);
  
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loadProjectsForCurrentUser();
      setProjects(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (isMyProjectsOpen) {
      fetchProjects();
    }
  }, [isMyProjectsOpen]);

  if (!isMyProjectsOpen) return null;

  const handleNewProject = () => {
    setShowConfirmModal(true);
  };

  const executeNewProject = () => {
    resetWorkspace();
    setCode(DEFAULT_CODE);
    setShowConfirmModal(false);
    setMyProjectsOpen(false);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={() => setMyProjectsOpen(false)}
      />
      <div className="fixed top-[80px] bottom-4 right-4 w-[450px] bg-white border border-[#E5EBE8] rounded-2xl z-50 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in zoom-in-95 slide-in-from-right-4 duration-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#E5EBE8] bg-white">
          <h2 className="text-lg font-bold text-[#2C5E4A]">My Projects</h2>
          <button 
            onClick={() => setMyProjectsOpen(false)}
            className="text-[#6A7B76] hover:text-[#2C5E4A] transition-colors p-1 rounded-md hover:bg-[#F3F4F3]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-[#E5EBE8] bg-white flex-shrink-0">
          <button 
            className="w-full flex items-center justify-center gap-2 h-10 px-4 text-sm font-bold bg-[#2C5E4A] hover:bg-[#1E4334] text-white rounded-lg transition-colors shadow-sm"
            onClick={handleNewProject}
          >
            <Plus size={16} />
            New Project
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-[#F3F4F3] rounded-lg animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              <AlertCircle size={32} className="text-red-500" />
              <p className="text-[#6A7B76] text-sm">{error}</p>
              <button className="px-4 py-2 text-sm font-bold bg-[#F3F4F3] hover:bg-[#E5EBE8] text-[#2C5E4A] rounded-md transition-colors" onClick={fetchProjects}>Try Again</button>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-70">
              <div className="w-16 h-16 rounded-full bg-[#F3F4F3] flex items-center justify-center text-[#6A7B76]">
                <Cpu size={24} />
              </div>
              <p className="text-[#6A7B76] font-medium">No projects yet</p>
              <button className="px-4 py-2 text-sm font-bold bg-[#F3F4F3] hover:bg-[#E5EBE8] text-[#2C5E4A] rounded-md transition-colors" onClick={handleNewProject}>Start Building</button>
            </div>
          ) : (
            projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onDelete={() => setProjects(prev => prev.filter(p => p.id !== project.id))}
                onUpdate={(updated) => setProjects(prev => prev.map(p => p.id === updated.id ? updated : p))}
              />
            ))
          )}
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-200 pointer-events-auto">
          <div className="bg-white border border-[#E5EBE8] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-full max-w-sm p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-[#2C5E4A]">Create New Project</h2>
            <p className="text-sm text-[#6A7B76] font-medium leading-relaxed">
              Are you sure you want to start a new project? Any unsaved changes will be lost.
            </p>
            <div className="flex justify-end gap-3 mt-2">
              <button 
                className="px-5 py-2 rounded-full text-sm font-bold bg-black/5 hover:bg-black/10 text-[#2C5E4A] transition-colors"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-5 py-2 rounded-full text-sm font-bold bg-[#2C5E4A] hover:bg-[#1E4334] text-white shadow-sm transition-colors"
                onClick={executeNewProject}
              >
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProjectCard({ 
  project, 
  onDelete, 
  onUpdate 
}: { 
  project: ProjectSummary, 
  onDelete: () => void,
  onUpdate: (p: ProjectSummary) => void
}) {
  const { setMyProjectsOpen } = useUiStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);

  // Handle Double-click delete
  useEffect(() => {
    if (deleteConfirm) {
      const timer = setTimeout(() => setDeleteConfirm(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteConfirm]);

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    
    setIsDeleting(true);
    try {
      await deleteProject(project.id);
      onDelete();
      toast.success('Project deleted');
    } catch (e: any) {
      toast.error('Failed to delete project');
      setIsDeleting(false);
      setDeleteConfirm(false);
    }
  };

  const handleToggleVisibility = async () => {
    try {
      await toggleProjectVisibility(project.id, !project.is_public);
      onUpdate({ ...project, is_public: !project.is_public });
      toast.success(project.is_public ? 'Project made private' : 'Project made public');
    } catch (e: any) {
      toast.error('Failed to update visibility');
    }
  };

  const handleRename = async () => {
    if (!editName.trim() || editName === project.name) {
      setIsEditing(false);
      setEditName(project.name);
      return;
    }

    try {
      await renameProject(project.id, editName);
      onUpdate({ ...project, name: editName });
      setIsEditing(false);
    } catch (e: any) {
      toast.error('Failed to rename project');
    }
  };

  const handleOpen = async () => {
    const toastId = toast.loading('Loading project...');
    try {
      await loadProjectById(project.id);
      toast.dismiss(toastId);
      setMyProjectsOpen(false);
    } catch (e: any) {
      toast.error('Failed to load project', { id: toastId });
    }
  };

  return (
    <div className="group flex flex-col bg-white hover:bg-[#F8FAFC] border border-[#E5EBE8] hover:border-[#82b49b] rounded-xl transition-all overflow-hidden shadow-sm relative">
      <div className="h-32 bg-[#F3F4F3] relative border-b border-[#E5EBE8] cursor-pointer" onClick={handleOpen}>
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#B5C2BF]">
            <Cpu size={48} />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md rounded px-2 py-0.5 flex items-center gap-1 border border-[#E5EBE8] shadow-sm">
          {project.is_public ? <Globe size={12} className="text-[#2C5E4A]" /> : <Lock size={12} className="text-[#6A7B76]" />}
          <span className="text-[10px] font-bold text-[#2C5E4A]">{project.is_public ? 'Public' : 'Private'}</span>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex items-center justify-between gap-2 mb-1">
          {isEditing ? (
            <div className="flex items-center gap-1 flex-1">
              <input 
                autoFocus
                value={editName}
                onChange={e => setEditName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRename()}
                onBlur={handleRename}
                className="flex-1 bg-white border border-[#82b49b] rounded px-2 py-0.5 text-sm font-bold text-[#2C5E4A] focus:outline-none focus:ring-1 focus:ring-[#82b49b]"
              />
              <button onClick={handleRename} className="p-1 text-[#2C5E4A] hover:bg-[#F3F4F3] rounded">
                <Check size={14} />
              </button>
            </div>
          ) : (
            <h3 
              className="text-sm font-bold text-[#2C5E4A] truncate flex-1 cursor-pointer hover:text-[#3C6A56] transition-colors"
              onClick={handleOpen}
            >
              {project.name}
            </h3>
          )}
        </div>
        
        {project.description && (
          <p className="text-xs text-[#6A7B76] line-clamp-2 mb-2 leading-relaxed">
            {project.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-[#6A7B76] font-medium">
            {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
          </span>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-[#6A7B76] hover:text-[#2C5E4A] hover:bg-[#F3F4F3] rounded transition-colors"
              title="Rename"
            >
              <Edit2 size={14} />
            </button>
            <button 
              onClick={handleToggleVisibility}
              className="p-1.5 text-[#6A7B76] hover:text-[#2C5E4A] hover:bg-[#F3F4F3] rounded transition-colors"
              title={project.is_public ? "Make Private" : "Make Public"}
            >
              {project.is_public ? <Lock size={14} /> : <Globe size={14} />}
            </button>
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className={clsx(
                "p-1.5 rounded transition-colors",
                deleteConfirm 
                  ? "bg-[#FF8A8A]/20 text-red-600 hover:bg-[#FF8A8A]/30" 
                  : "text-[#6A7B76] hover:text-red-500 hover:bg-red-50"
              )}
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
