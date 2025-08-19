// 2025.08.19 - Axios 인스턴스를 생성
import axios from "axios";

export const BaseUrl = axios.create({
  baseURL: 'http://localhost:3000',
})