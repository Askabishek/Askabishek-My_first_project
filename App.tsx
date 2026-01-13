import React, { useState, useMemo } from 'react';
import { useTaskPersistence } from './services/storageService';
import { Task, FilterType, TaskFormData } from './types';
import { TaskCard } from './components/TaskCard';
import { FilterChips } from './components/FilterChips';
import { TaskDialog } from './components/TaskDialog';
import { Intro } from './components/Intro';
import { Logo } from './components/Logo';

const App: React.FC = () => {
  const { tasks, saveTasks } = useTaskPersistence();
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  // Derived State
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FilterType.PENDING:
        return tasks.filter((t) => !t.isCompleted);
      case FilterType.COMPLETED:
        return tasks.filter((t) => t.isCompleted);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const counts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter(t => !t.isCompleted).length,
    completed: tasks.filter(t => t.isCompleted).length
  }), [tasks]);

  // Handlers
  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      isCompleted: false,
      createdAt: Date.now(),
    };
    saveTasks([newTask, ...tasks]);
  };

  const handleEditTask = (data: TaskFormData) => {
    if (!editingTask) return;
    const updatedTasks = tasks.map((t) => 
      t.id === editingTask.id 
        ? { ...t, title: data.title, description: data.description, dueDate: data.dueDate } 
        : t
    );
    saveTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleToggleTask = (id: string) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      saveTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const openNewTaskDialog = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const openEditTaskDialog = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  return (
    <>
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      
      <div className="min-h-screen pb-20 sm:pb-8">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-outline/10 transition-all">
          <div className="max-w-3xl mx-auto px-4 py-4">
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                 <Logo size="md" />
                 <h1 className="text-2xl font-bold text-onPrimaryContainer">TaskFlow</h1>
               </div>
             </div>
             
             <FilterChips 
               currentFilter={filter} 
               setFilter={setFilter} 
               counts={counts}
             />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 py-6">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
              <div className="bg-surfaceContainerHigh p-6 rounded-full mb-4">
                <span className="material-symbols-outlined text-[48px] text-secondary">inbox</span>
              </div>
              <h3 className="text-lg font-medium text-secondary">No tasks found</h3>
              <p className="text-sm text-outline mt-1">
                {filter === FilterType.ALL 
                  ? "Tap the + button to create a new task" 
                  : `No ${filter.toLowerCase()} tasks available`}
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={openEditTaskDialog}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </main>

        {/* Floating Action Button (FAB) */}
        <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-20">
          <button
            onClick={openNewTaskDialog}
            className="group flex items-center justify-center w-14 h-14 bg-primaryContainer text-onPrimaryContainer rounded-[16px] shadow-lg hover:shadow-xl hover:bg-[#D0BCFF] transition-all duration-300 active:scale-95"
            aria-label="Add Task"
          >
            <span className="material-symbols-outlined text-[24px] group-hover:rotate-90 transition-transform duration-300">add</span>
          </button>
        </div>

        {/* Dialog */}
        <TaskDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={editingTask ? handleEditTask : handleAddTask}
          editingTask={editingTask}
        />
      </div>
    </>
  );
};

export default App;