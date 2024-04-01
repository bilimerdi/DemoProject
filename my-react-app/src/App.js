import "./App.css";
import { useState } from "react";
import axios from "axios";
import { CompactTable } from "@table-library/react-table-library/compact";

function App() {
  const [TC, setTC] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [illness, setIllness] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const theme = {
    table: {
      fontFamily: "Arial, sans-serif",
      fontSize: "16px",
      color: "#333",
      headerColor: "#000",
      borderColor: "#ccc",
    },
  };

  const nodes = [
    {
      id: 0,
      name: "Deniz Mat",
      version: "1.16.24",
      oncelik: "Düşük",
      describe: "Buton renginin değiştirilmesi",
      gereksinim: "Windows 10",
      boyut: "50 Kb",
      time: "1 dk",
    },
  ];

  const data = { nodes };

  const COLUMNS = [
    { label: "Geliştirici", renderCell: (item) => item.name },
    { label: "Versiyon", renderCell: (item) => item.version },
    { label: "Öncelik", renderCell: (item) => item.oncelik },
    { label: "Açıklama", renderCell: (item) => item.describe },
    { label: "Gereksinimler", renderCell: (item) => item.gereksinim },
    { label: "Boyut", renderCell: (item) => item.boyut },
    { label: "Yüklenecek zaman", renderCell: (item) => item.time },
  ];

  const createUser = async () => {
    try {
      await axios.post("http://localhost:3001/signup", {
        TC,
        name,
        surname,
        doctorName,
        illness,
      });
      alert("Hasta başarıyla kaydedildi.");
    } catch (error) {
      alert("Hasta kaydedilirken bir hata oluştu.");
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3001/delete/${TC}`);
      alert("Hasta başarıyla silindi.");
    } catch (error) {
      alert("Hasta silinirken bir hata oluştu.");
      console.error(error);
    }
  };

  const findUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/find/${name}/${surname}`
      );
      console.log(response.data);
    } catch (error) {
      alert("Hasta bulunurken bir hata oluştu.");
      console.error(error);
    }
  };

  const findAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/findAll");
      console.log(response.data);
    } catch (error) {
      alert("Hastalar listelenirken bir hata oluştu.");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Demo uygulama</p>
        {/* <div className="information">
          <input
            placeholder="TC"
            value={TC}
            onChange={(e) => setTC(e.target.value)}
          ></input>
          <input
            placeholder="Adınız"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            placeholder="Soyadınız"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          ></input>
          <input
            placeholder="Hastalığınız"
            value={illness}
            onChange={(e) => setIllness(e.target.value)}
          ></input>
          <input
            placeholder="Doktor"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          ></input>
          <div className="button">
            <button onClick={createUser}>Hastayı Kaydet</button>
            <button onClick={findUser}>Hastayı Görüntüle</button>
            <button onClick={findAllUsers}>Tüm Hastaları Görüntüle</button>
            <button onClick={deleteUser}>Hastayı Sil</button>
          </div>
        </div> */}
        <div>
          <CompactTable
            columns={COLUMNS}
            data={data}
            theme={theme}
          ></CompactTable>
        </div>
      </header>
    </div>
  );
}

export default App;
