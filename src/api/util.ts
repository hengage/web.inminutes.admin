import https from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useMediaUploadMutation = () => {
  const result = useMutation<string, Error, FormData>({
    mutationFn: async (data) => {
      const response = await https.post("/media/upload?tags=vendor", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
  return result;
};
