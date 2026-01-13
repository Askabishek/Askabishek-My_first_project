export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // ISO Date string
  isCompleted: boolean;
  createdAt: number;
}

export enum FilterType {
  ALL = 'ALL',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
}