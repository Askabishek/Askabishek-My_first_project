import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';

const STORAGE_KEY = 'taskflow_data_v1';

const DEFAULT_TASKS: Task[] = [
  {
    id: 'default-1',
    title: 'Welcome to TaskFlow 👋',
    description: 'Explore the features: filter by status, add new tasks, or edit existing ones.',
    dueDate: new Date().toISOString().split('T')[0],
    isCompleted: false,
    createdAt: Date.now(),
  },
  {
    id: 'default-2',
    title: 'Review Material Design 3',
    description: 'Ensure the UI components follow the latest accessibility and styling guidelines.',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    isCompleted: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'default-3',
    title: 'Setup Project Environment',
    description: 'Install Node.js, React, and Tailwind CSS dependencies.',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    isCompleted: true,
    createdAt: Date.now() - 7200000,
  }
];

export const useTaskPersistence = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // If nothing is in storage (first visit), return default tasks.
      // If storage is empty array (user deleted all), return empty array.
      return stored ? JSON.parse(stored) : DEFAULT_TASKS;
    } catch (error) {
      console.error("Failed to load tasks from local storage", error);
      return DEFAULT_TASKS;
    }
  });

  const saveTasks = useCallback((newTasks: Task[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error("Failed to save tasks to local storage", error);
    }
  }, []);

  // Sync state if localStorage changes elsewhere (optional robustness)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setTasks(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { tasks, saveTasks };
};