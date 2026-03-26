"use client";
import { useState, useMemo, useEffect } from "react";
import Whatsapp from "../component/Whatsapp";
import { matchesList, tabledata } from "../component/matchesData";

const roleColors = {
  Batsman: "bg-blue-100 text-blue-700",
  Bowler: "bg-red-100 text-red-700",
  "All-rounder": "bg-green-100 text-green-700",
  "WK-Batsman": "bg-yellow-100 text-yellow-700",
};

export default function CricketMatch() {
  const [selectedDate, setSelectedDate] = useState(""); // Calendar date state
  const [playerSearch, setPlayerSearch] = useState("");

  // 🟢 1. Auto-select Today's Date on Load 🟢
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setSelectedDate(today);
  }, []);

  // 🟢 2. Select Match based on Calendar Date 🟢
  const currentMatchInfo = useMemo(() => {
    return matchesList.find(m => m.isoDate === selectedDate);
  }, [selectedDate]);

  const getProcessedData = (teamType) => {
    if (!currentMatchInfo) return [];
    const matchData = tabledata[currentMatchInfo.id] || { team1: [], team2: [] };
    const players = teamType === "t1" ? matchData.team1 : matchData.team2;
    return players.filter(p => p.name.toLowerCase().includes(playerSearch.toLowerCase()));
  };

  const PlayerTable = ({ title, data, borderColor }) => (
    <div className="flex flex-col">
      <div className={`mb-3 flex justify-between items-end border-b-2 ${borderColor} pb-2`}>
        <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">{title}</h2>
        <span className="text-[10px] text-green-400 font-bold bg-green-900/30 px-2 py-1 rounded">{data.length} Players</span>
      </div>
      <div className="rounded-xl overflow-hidden border border-green-800/30 bg-green-950/20 backdrop-blur-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-green-900/50 text-green-200 uppercase text-[10px] font-bold">
            <tr>
              <th className="px-4 py-4">Player</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4 text-center">Runs</th>
              <th className="px-4 py-4 text-center">Wkt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-800/20">
            {data.map((p) => (
              <tr key={p.id} className="hover:bg-green-800/10 text-white transition-colors">
                <td className="px-4 py-4 font-bold">{p.name}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${roleColors[p.role]}`}>
                    {p.role}
                  </span>
                </td>
                <td className="px-4 py-4 text-center text-yellow-400 font-bold">{p.runs}</td>
                <td className="px-4 py-4 text-center text-red-400 font-bold">{p.wickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#051109] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-3 rounded-xl shadow-lg shadow-green-900/40">🏏</div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase italic">Match Squads
                </h1>
              <p className="text-green-600 text-[10px] font-bold tracking-widest uppercase">IPL  2026</p>
            </div>
          </div>
          <Whatsapp />
        </div>







        {/* Banner */}
        <div className="my-8">
          <img src="/img/criket.jpg" alt="Banner" className="w-full h-auto object-cover rounded-3xl border border-green-800/20 shadow-2xl" />
        </div>

        {/* Calendar Picker */}
        <div>
          <label className="text-green-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">📅 Pick Match Date</label>
          <input
            type="date"
            className="w-full bg-green-900/20 border border-green-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition-all [color-scheme:dark]"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        {/* Match Title Display */}
        {currentMatchInfo ? (
          <div className="mb-10 text-center">

          </div>
        ) : (
          <div className="text-center py-20 bg-green-950/20 rounded-3xl border border-dashed border-green-800/50">
            <span className="text-5xl mb-4 block">🏟️</span>
            <p className="text-green-700 font-bold uppercase tracking-widest">Is date ko koi match scheduled nahi hai.</p>
            <button onClick={() => setSelectedDate("2024-03-24")} className="mt-4 text-green-500 text-sm underline">Back to First Match</button>
          </div>
        )}


        {/* 🟢 DYNAMIC TABLES 🟢 */}
        {currentMatchInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <PlayerTable
              title={currentMatchInfo.team1}
              data={getProcessedData("t1")}
              borderColor={currentMatchInfo.t1Color}
            />
            <PlayerTable
              title={currentMatchInfo.team2}
              data={getProcessedData("t2")}
              borderColor={currentMatchInfo.t2Color}
            />
          </div>
        )}

      </div>
    </div>
  );
}