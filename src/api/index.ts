import axios, { AxiosResponse } from 'axios';
import { ITask } from '../interfaces';

const api = axios.create({
    baseURL: 'https://bakiury-django-api-379aee1d7086.herokuapp.com',
});

export const getTasksApi = async (): Promise<ITask[]> => {
    try {
        const response: AxiosResponse<ITask[]> = await api.get('/tasks');
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.toString() : String(error);
        throw new Error(errorMessage);
    }
};
export const getTaskApi = async (taskId: string): Promise<ITask> => {
    try {
        const response: AxiosResponse<ITask> = await api.get(`/tasks/${ taskId }`);
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.toString() : String(error);
        throw new Error(errorMessage);
    }
};
export const addTaskApi = async (title: string, description: string): Promise<ITask> => {
    try {
        const response: AxiosResponse<ITask> = await api.post('/tasks', { title, description });
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.toString() : String(error);
        throw new Error(errorMessage);
    }
};
export const editTaskApi = async (taskId: string, updatedTask: Partial<ITask>): Promise<ITask> => {
    try {
        const response: AxiosResponse<ITask> = await api.patch(`/tasks/${ taskId }`, updatedTask);
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.toString() : String(error);
        throw new Error(errorMessage);
    }
};
export const deleteTaskApi = async (taskId: string): Promise<ITask> => {
    try {
        const response: AxiosResponse<ITask> = await api.delete(`/tasks/${ taskId }`);
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.toString() : String(error);
        throw new Error(errorMessage);
    }
};

