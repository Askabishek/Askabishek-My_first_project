import React from 'react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const isOverdue = !task.isCompleted && new Date(task.dueDate) < new Date() && new Date(task.dueDate).toDateString() !== new Date().toDateString();

  return (
    <div className={`group relative flex flex-col gap-2 p-4 mb-3 rounded-[16px] transition-all duration-300 border border-transparent hover:border-outline/20 hover:shadow-md ${task.isCompleted ? 'bg-surfaceContainer opacity-70' : 'bg-surfaceContainerHigh'}`}>
      <div className="flex items-start gap-4">
        {/* Checkbox (Custom MD3 Style) */}
        <div className="pt-1">
          <button
            onClick={() => onToggle(task.id)}
            className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${
              task.isCompleted
                ? 'bg-primary border-primary text-onPrimary'
                : 'border-outline hover:bg-primary/10'
            }`}
          >
            {task.isCompleted && <span className="material-symbols-outlined text-sm font-bold">check</span>}
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-medium truncate ${task.isCompleted ? 'line-through text-outline' : 'text-onPrimaryContainer'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 line-clamp-2 ${task.isCompleted ? 'text-outline/60' : 'text-secondary'}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-3 text-xs font-medium">
             {task.dueDate && (
               <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-surface text-secondary'}`}>
                 <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                 <span>{new Date(task.dueDate).toLocaleDateString()}</span>
               </div>
             )}
          </div>
        </div>

        {/* Actions Menu (Visible on hover or consistent access) */}
        <div className="flex flex-col gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
           <button 
             onClick={() => onEdit(task)}
             className="p-2 rounded-full hover:bg-surface text-secondary hover:text-primary transition-colors"
             title="Edit"
           >
             <span className="material-symbols-outlined text-[20px]">edit</span>
           </button>
           <button 
             onClick={() => onDelete(task.id)}
             className="p-2 rounded-full hover:bg-red-50 text-secondary hover:text-red-600 transition-colors"
             title="Delete"
           >
             <span className="material-symbols-outlined text-[20px]">delete</span>
           </button>
        </div>
      </div>
    </div>
  );
};