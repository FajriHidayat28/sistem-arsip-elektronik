"use client";
import { getLetters } from "@/utils/custom-swr";
import DataLists from "../ui/datatable";
import CardMonitoring from "../ui/monitoring-card";
import { useSession } from "next-auth/react";
import Scripts from "@/utils/scripts";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  const { formatBytes } = Scripts();
  const { letters, lettersSize } = getLetters();
  // Pisahkan surat masuk & surat keluar berdasarkan filetype
  const suratMasukCount = letters?.filter((item) => item.filetype === "LETTERIN").length || 0;
  const suratKeluarCount = letters?.filter((item) => item.filetype !== "LETTERIN").length || 0;


  const { toastAlert } = Scripts();
  const [isLoading, setIsLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [userid] = useState(session?.user?.userid);
  const [name, setName] = useState("");
  const [filenumber, setFileNumber] = useState("");
  const [filename, setFilename] = useState("");
  const [fileDate, setFileDate] = useState(new Date().toISOString().split("T")[0]);
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState("");

  const formattedLetters =
    letters?.map((item) => ({
      ...item,
      filesizeFormatted: formatBytes(item.filesize),
    })) || [];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleInputFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userid", userid);
    formData.append("name", name);
    formData.append("filenumber", filenumber);
    formData.append("filename", filename);
    formData.append("filedate", fileDate);
    formData.append("file", file);
    formData.append("filetype", fileType);

    setIsLoading(true);
    if (name === "" || fileType === "") {
      toastAlert("error", "Formulir Error!", "Masih ada formulir yang kosong!", 5000);
      setIsLoading(false);
    } else if (file === null) {
      toastAlert("error", "File Error!", "Berkas masih kosong!", 3000);
      setIsLoading(false);
    } else {
      await axios
        .post("/api/files/post/store-file", formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            toastAlert("success", res.data.title, res.data.message, 3000);
            setName("");
            setFileNumber("");
            setFilename("");
            setFileDate(new Date().toISOString().split("T")[0]);
            setFile("");
            setFileType("");
            setIsLoading(false);
          } else {
            toastAlert("error", res.data.title, res.data.message, 3000);
            setIsLoading(false);
          }
          console.log(res.data);
        });
    }
  };
  
  return (
    <>
       
        <div>
          <div className="flex flex-col md:flex-row gap-3">
            <CardMonitoring title={"Jumlah Berkas"} className="border-blue-500 basis-1/2" masuk={suratMasukCount} keluar={suratKeluarCount} footer={"Jumlah berkas terupload : " + letters?.length}/>
            <CardMonitoring title={"Total Ukuran Berkas"} className="border-indigo-500 basis-1/2" content={formatBytes(lettersSize)} footer={"Total ukuran berkas terupload : " + formatBytes(lettersSize)} />
          </div>

          <div className="card mt-3">
            <div className="flex gap-5">
              <div>
                <i className="Surat Masuk"></i> Surat Masuk
              </div>
              <div>
                <i className="fa-regular fa-circle-up text-red-500"></i> Surat Keluar
              </div>
            </div>
            <DataLists
              tableName="Data Berkas"
              subHeaderMemo={true}
              data={formattedLetters}
              filterFields={["filenumber", "sendername", "sendingdate", "filename", "filesizeFormatted"]}
              tableOptions={{
                rows: 10,
              }}
              columns={[
                { field: "filenumber", header: "Nomor Surat" },
                { field: "sendername", header: "Nama Pengirim" },
                { field: "sendingdate", header: "Tanggal Masuk / Keluar" },
                { field: "filename", header: "Perihal" },
                { field: "filesizeFormatted", header: "Ukuran Berkas" },
                {
                  field: "filetype",
                  header: "Tipe",
                  body: (rowData) => <>{rowData.filetype === "LETTERIN" ? <i className="fa-regular fa-circle-down text-green-500"></i> : <i className="fa-regular fa-circle-up text-red-500"></i>}</>,
                },
                {
                  field: "actions",
                  header: "Aksi",
                  body: (rowData) => (
                    <div className="flex gap-3">
                      <a href={"/files/" + rowData.file} target="_blank" className={"p-2 bg-blue-500 rounded-lg text-white text-sm"}>
                        Lihat
                      </a>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      
    </>
  );
}
