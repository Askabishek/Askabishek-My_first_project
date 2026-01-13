import React, { useEffect, useState } from 'react';
import { Task, TaskFormData } from '../types';

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  editingTask?: Task | null;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ isOpen, onClose, onSave, editingTask }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isOpen) {
      if (editingTask) {
        setFormData({
          title: editingTask.title,
          description: editingTask.description || '',
          dueDate: editingTask.dueDate,
        });
      } else {
        // Reset for new task
        setFormData({
          title: '',
          description: '',
          dueDate: new Date().toISOString().split('T')[0],
        });
      }
    }
  }, [isOpen, editingTask]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-[#F7F2FA] w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Header */}
          <div className="px-6 py-6 pb-2">
            <h2 className="text-2xl text-onPrimaryContainer font-normal">
              {editingTask ? 'Edit task' : 'New task'}
            </h2>
          </div>

          {/* Body */}
          <div className="px-6 py-4 flex flex-col gap-4">
            {/* Title Input */}
            <div className="relative group">
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="peer w-full h-14 px-4 pt-4 pb-0 text-onPrimaryContainer bg-surfaceContainerHigh rounded-t-lg border-b border-outline/50 focus:border-primary focus:outline-none transition-colors placeholder-transparent"
                placeholder="Title"
                id="task-title"
              />
              <label 
                htmlFor="task-title"
                className="absolute left-4 top-4 text-outline text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary pointer-events-none"
              >
                Title
              </label>
            </div>

            {/* Description Input */}
            <div className="relative group">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="peer w-full h-24 px-4 pt-4 pb-2 text-onPrimaryContainer bg-surfaceContainerHigh rounded-t-lg border-b border-outline/50 focus:border-primary focus:outline-none transition-colors placeholder-transparent resize-none"
                placeholder="Description"
                id="task-desc"
              />
              <label 
                htmlFor="task-desc"
                className="absolute left-4 top-4 text-outline text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary pointer-events-none"
              >
                Description
              </label>
            </div>

            {/* Date Input */}
            <div className="relative group">
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="peer w-full h-14 px-4 pt-4 pb-0 text-onPrimaryContainer bg-surfaceContainerHigh rounded-t-lg border-b border-outline/50 focus:border-primary focus:outline-none transition-colors"
                id="task-date"
              />
              <label 
                htmlFor="task-date"
                className="absolute left-4 top-1 text-xs text-primary pointer-events-none"
              >
                Due Date
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 px-6 py-6 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-primary font-medium hover:bg-primary/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary text-onPrimary font-medium hover:bg-primary/90 transition-shadow shadow-sm hover:shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};