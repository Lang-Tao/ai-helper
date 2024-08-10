import axios from 'axios';

const API_URL = '/api/projects';

export function fetchProjectList() {
    return axios.get(`${API_URL}/list`);
}

export function fetchProjectDetails(projectId) {
    return axios.get(`${API_URL}/${projectId}`);
}

export function uploadProjectFile(projectId, fileData) {
    return axios.post(`${API_URL}/${projectId}/upload`, fileData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export function downloadProjectFile(projectId, fileId) {
    return axios.get(`${API_URL}/${projectId}/download/${fileId}`, {
        responseType: 'blob'
    });
}
