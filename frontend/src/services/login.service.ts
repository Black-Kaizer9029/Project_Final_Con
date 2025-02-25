import { LOGIN } from "@/apis/endpoint.api";
import mainApi from "@/apis/main.api";
import { PayloadLogin } from "@/types/requests/request.login";
import { LoginResponse } from "@/types/response/response.login";

export const loginUser = async (data: PayloadLogin): Promise<LoginResponse> => {
    const { data: response } = await mainApi.post<LoginResponse>(LOGIN, data, {
        withCredentials: true, // เพื่อให้สามารถใช้ Cookie ได้
    });
    return response;
};
