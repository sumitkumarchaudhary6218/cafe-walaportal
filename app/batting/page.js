"use client";
import { useState } from "react";
import Whatsapp from "../component/Whatsapp";
const allPlayers = [
  // RCB (Team A)
  { id: 1, team: "A", name: "Virat Kohli", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Batsman", points: "78A@" },
  { id: 2, team: "A", name: "Faf du Plessis", country: "🇿🇦 South Africa", runs: 0, wickets: 0, role: "Batsman", points: "65#B" },
  { id: 3, team: "A", name: "Glenn Maxwell", country: "🇦🇺 Australia", runs: 0, wickets: 0, role: "All-rounder", points: "82X!" },
  { id: 4, team: "A", name: "Rajat Patidar", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Batsman", points: "54Z$" },
  { id: 5, team: "A", name: "Dinesh Karthik", country: "🇮🇳 India", runs: 0, wickets: 0, role: "WK-Batsman", points: "60K%" },
  { id: 6, team: "A", name: "Mahipal Lomror", country: "🇮🇳 India", runs: 0, wickets: 0, role: "All-rounder", points: "48L@" },
  { id: 7, team: "A", name: "Shahbaz Ahmed", country: "🇮🇳 India", runs: 0, wickets: 0, role: "All-rounder", points: "50M#" },
  { id: 8, team: "A", name: "Wanindu Hasaranga", country: "🇱🇰 Sri Lanka", runs: 0, wickets: 0, role: "All-rounder", points: "75H!" },
  { id: 9, team: "A", name: "Harshal Patel", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Bowler", points: "69P$" },
  { id: 10, team: "A", name: "Mohammed Siraj", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Bowler", points: "72S%" },
  { id: 11, team: "A", name: "Reece Topley", country: "🏴 England", runs: 0, wickets: 0, role: "Bowler", points: "55T@" },
  { id: 12, team: "A", name: "Josh Hazlewood", country: "🇦🇺 Australia", runs: 0, wickets: 0, role: "Bowler", points: "77H#" },
  { id: 13, team: "A", name: "Anuj Rawat", country: "🇮🇳 India", runs: 0, wickets: 0, role: "WK-Batsman", points: "46R!" },
  { id: 14, team: "A", name: "Karn Sharma", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Bowler", points: "52K$" },
  { id: 15, team: "A", name: "Suyash Prabhudessai", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Batsman", points: "49S%" },

  // SRH (Team B)
  { id: 16, team: "B", name: "Aiden Markram", country: "🇿🇦 South Africa", runs: 0, wickets: 0, role: "All-rounder", points: "80A@" },
  { id: 17, team: "B", name: "Abhishek Sharma", country: "🇮🇳 India", runs: 0, wickets: 0, role: "All-rounder", points: "67B#" },
  { id: 18, team: "B", name: "Rahul Tripathi", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Batsman", points: "62C!" },
  { id: 19, team: "B", name: "Mayank Agarwal", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Batsman", points: "58D$" },
  { id: 20, team: "B", name: "Heinrich Klaasen", country: "🇿🇦 South Africa", runs: 0, wickets: 0, role: "WK-Batsman", points: "85E%" },
  { id: 21, team: "B", name: "Glenn Phillips", country: "🇳🇿 New Zealand", runs: 0, wickets: 0, role: "All-rounder", points: "74F@" },
  { id: 22, team: "B", name: "Washington Sundar", country: "🇮🇳 India", runs: 0, wickets: 0, role: "All-rounder", points: "66G#" },
  { id: 23, team: "B", name: "Marco Jansen", country: "🇿🇦 South Africa", runs: 0, wickets: 0, role: "All-rounder", points: "71H!" },
  { id: 24, team: "B", name: "Bhuvneshwar Kumar", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Bowler", points: "73I$" },
  { id: 25, team: "B", name: "T Natarajan", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Bowler", points: "68J%" },
  { id: 26, team: "B", name: "Umran Malik", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Bowler", points: "64K@" },
  { id: 27, team: "B", name: "Fazalhaq Farooqi", country: "🇦🇫 Afghanistan", runs: 0, wickets: 0, role: "Bowler", points: "57L#" },
  { id: 28, team: "B", name: "Mayank Markande", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Bowler", points: "59M!" },
  { id: 29, team: "B", name: "Anmolpreet Singh", country: "🇮🇳 India", runs: 0, wickets: 0, role: "Batsman", points: "53N$" },
  { id: 30, team: "B", name: "Upendra Yadav", country: "🇮🇳 India", runs: 0, wickets: 0, role: "WK-Batsman", points: "47O%" },
];


const roleColors = {
  Batsman: "bg-blue-100 text-blue-700",
  Bowler: "bg-red-100 text-red-700",
  "All-rounder": "bg-green-100 text-green-700",
  "WK-Batsman": "bg-yellow-100 text-yellow-700",
};

export default function CricketMatch() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Logic to filter and sort data
  const processData = (teamName) => {
    return allPlayers
      .filter((p) => p.team === teamName)
      .filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.role.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();
        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  };

  const teamA = processData("A");
  const teamB = processData("B");

  const SortIcon = ({ col }) => (
    <span className="ml-1 text-[10px] opacity-50">
      {sortKey === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  // Reusable Table UI Component
  const PlayerTable = ({ title, data, borderColor }) => (
    <div className="flex flex-col">
      <div className={`mb-3 flex justify-between items-end border-b-2 ${borderColor} pb-2`}>
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        <span className="text-xs text-green-400 font-mono">{data.length} Players</span>
      </div>
      <div className="rounded-xl overflow-hidden shadow-2xl border border-green-800/50 bg-green-950/20">
        <table className="w-full text-xs md:text-sm text-left">
          <thead className="bg-green-900/80 text-green-200 uppercase text-[10px] tracking-widest">
            <tr>
              <th className="px-3 py-3 font-medium">#</th>
              <th className="px-3 py-3 cursor-pointer hover:bg-green-800 transition" onClick={() => handleSort("name")}>
                Player <SortIcon col="name" />
              </th>
              <th className="px-3 py-3">Role</th>
              <th className="px-3 py-3 text-center cursor-pointer hover:bg-green-800" onClick={() => handleSort("runs")}>
                Runs <SortIcon col="runs" />
              </th>
              <th className="px-3 py-3 text-center cursor-pointer hover:bg-green-800" onClick={() => handleSort("wickets")}>
                Wkt <SortIcon col="wickets" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-800/30">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-green-600">No players found</td>
              </tr>
            ) : (
              data.map((player, idx) => (
                <tr key={player.id} className="hover:bg-green-800/20 transition-colors">
                  <td className="px-3 py-3 text-green-600 font-mono">{idx + 1}</td>
                  <td className="px-3 py-3 text-white font-medium">{player.name}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${roleColors[player.role]}`}>
                      {player.role.split('-')[0]}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-yellow-400 font-bold">{player.runs}</td>
                  <td className="px-3 py-3 text-center text-red-400 font-bold">{player.wickets}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#051109] bg-gradient-to-b from-[#0a1f11] to-[#051109] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-600 p-3 rounded-2xl shadow-lg shadow-green-900/40">
              <span className="text-3xl">🏏</span>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Match Squads</h1>
              <p className="text-green-500 text-xs font-medium tracking-widest uppercase">T20 Championship 2024</p>
            </div>
          </div>

         <Whatsapp/>
         
        </div>

         <div className="my-5">
            <img
              src="/img/criket.jpg"   // 👈 yahan apna banner path daalo
              alt="PAN Update Banner"
              className="w-full h-auto rounded-md shadow-md border"
            />
          </div>

        {/* Tables Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <PlayerTable title="RCB (Royal Challengers Bangalore)" data={teamA} borderColor="border-blue-500" />
          <PlayerTable title="SRH (Sunrisers Hyderabad)" data={teamB} borderColor="border-orange-500" />
        </div>

        {/* Status Footer */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-[10px] text-green-700 font-bold uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div> Live Match Data</div>
          <span>•</span>
          <div>Updated 2 mins ago</div>
          <span>•</span>
          <div>Venue: Wankhede Stadium</div>
        </div>

      </div>
    </div>
  );
}