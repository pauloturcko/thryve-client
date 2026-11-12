import { http } from "@/http/http";

type UploadProfilePictureResponse = {
  profilePicture: string;
};

export const profilePictureService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await http.post<UploadProfilePictureResponse>(
      "/profile-picture/upload",
      formData
    );
    return response.data;
  },
  remove: () => http.delete("/profile-picture/delete"),
};
