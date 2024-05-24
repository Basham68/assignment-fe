import { authAxios } from "./axios";

class AuthService {
  login = (email: string, password: string) =>
    authAxios.post("auth/login", { email, password });
  signup = (email: string, password: string, name: string) =>
    authAxios.post("users/register", { email, password, name });
}

export default new AuthService();
