import { api } from '../api.js'

export const categoryService = {
    listar: () => api.getCategories(),
}