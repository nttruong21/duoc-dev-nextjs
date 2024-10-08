import http from "@/lib/http";

const fileServices = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await http.post<{
      message: string;
      data: string;
    }>("/media/upload", {
      body: formData,
    });

    return res.data;
  },
};

export default fileServices;
