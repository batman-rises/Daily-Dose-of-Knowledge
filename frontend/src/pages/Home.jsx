import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../api.js";

const Home = () => {
  const [quote, setquote] = useState(null);
  const [fact, setfact] = useState(null);
  const [joke, setjoke] = useState(null);
  const [word, setword] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchAll = async () => {
    setloading(true);
    try {
      const [q, f, j, w] = await Promise.all([
        api.getQuote(),
        api.getFact(),
        api.getJoke(),
        api.getWord(),
      ]);

      // ✅ unwrap .data since backend response has { type, data }
      setquote(q.data);
      setfact(f.data);
      setjoke(j.data);
      setword(w.data);
    } catch (err) {
      console.error("Failed to fetch some items", err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const save = async (kind, payload) => {
    try {
      const body = {
        kind,
        text: payload.text || payload.setup || payload.word,
        author: payload.author || null,
        meta: payload,
      };
      await api.saveFavorite(body);
      alert("Saved to favorites");
    } catch (error) {
      console.log(error);
      alert("Failed to Save");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daily Dose of Knowledge</h1>
        <div>
          <button onClick={fetchAll} className="px-4 py-2 border rounded mr-2">
            Refresh
          </button>
        </div>
      </div>
      {loading && <div className="mb-4 text-gray-600">Loading...</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card
          title="Quote"
          onSave={() => save("quote", quote)}
          footer={quote?.author}
        >
          <div className="italic">{quote?.text || "_"}</div>
        </Card>
        <Card title="Fact" onSave={() => save("fact", fact)}>
          <div>{fact?.text || "—"}</div>
        </Card>
        <Card title="Joke" onSave={() => save("joke", joke)}>
          <div>
            <div>{joke?.setup}</div>
            <div className="mt-2 font-semibold">{joke?.punchline}</div>
          </div>
        </Card>
        <Card
          title="Word of the Day"
          onSave={() => save("word", word)}
          footer={word?.example}
        >
          <div>
            <div className="font-semibold text-lg">{word?.word}</div>
            <div className="mt-1">{word?.definition}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
