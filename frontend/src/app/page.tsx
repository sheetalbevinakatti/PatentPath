"use client";

import { useState } from "react";

interface Invention {
  Invention_ID: number;
  Title: string;
  Description: string;
  Creation_Date: string;
  Status: string;
  Technology_ID: number;
}

interface PriorArtResult {
  id: string;
  document: string;
  distance: number;
  metadata: {
    title: string;
    type: string;
    source: string;
  };
}

export default function Home() {
  const [inventions, setInventions] = useState<Invention[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PriorArtResult[]>([]);
  const [loadingInventions, setLoadingInventions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8000";

  async function loadInventions() {
    try {
      setLoadingInventions(true);
      setError("");

      const response = await fetch(`${API_URL}/inventions`);

      if (!response.ok) {
        throw new Error("Failed to fetch inventions");
      }

      const data = await response.json();
      setInventions(data.inventions);
    } catch (err) {
      setError("Could not connect to the PatentPath backend.");
    } finally {
      setLoadingInventions(false);
    }
  }

  async function searchPriorArt() {
    if (!query.trim()) {
      setError("Please enter an invention description.");
      return;
    }

    try {
      setSearching(true);
      setError("");
      setResults([]);

      const response = await fetch(`${API_URL}/prior-art/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          n_results: 3,
        }),
      });

      if (!response.ok) {
        throw new Error("Prior-art search failed");
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError("Could not perform prior-art search.");
    } finally {
      setSearching(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              PatentPath
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Invention-to-Patent Traceability & Prior-Art Analysis
            </p>
          </div>

          <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Patent Analysis System
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-4xl font-bold">
            Invention & Prior-Art Dashboard
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            Manage invention records and perform semantic prior-art analysis
            using the PatentPath database and vector search system.
          </p>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            {error}
          </div>
        )}

        {/* Invention section */}
        <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold">
                Invention Records
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Data retrieved from the PatentPath MySQL database.
              </p>
            </div>

            <button
              onClick={loadInventions}
              disabled={loadingInventions}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingInventions ? "Loading..." : "Load Inventions"}
            </button>
          </div>

          {inventions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-slate-500">
              Click "Load Inventions" to retrieve invention records.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {inventions.map((invention) => (
                <div
                  key={invention.Invention_ID}
                  className="rounded-xl border border-slate-700 bg-slate-950 p-5"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h4 className="text-xl font-semibold text-blue-300">
                      {invention.Title}
                    </h4>

                    <span className="whitespace-nowrap rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                      {invention.Status}
                    </span>
                  </div>

                  <p className="mb-4 text-sm leading-6 text-slate-400">
                    {invention.Description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500">Invention ID</p>
                      <p className="font-medium">
                        {invention.Invention_ID}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">Technology ID</p>
                      <p className="font-medium">
                        {invention.Technology_ID}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">Creation Date</p>
                      <p className="font-medium">
                        {invention.Creation_Date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Prior-art search */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">
              Prior-Art Analysis
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Enter an invention description to find semantically similar
              prior-art documents.
            </p>
          </div>

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Example: A deep learning system that analyzes medical images and predicts diseases automatically."
            className="min-h-32 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={searchPriorArt}
              disabled={searching}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {searching ? "Analyzing..." : "Analyze Prior Art"}
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-8">
              <h4 className="mb-4 text-xl font-semibold">
                Similar Prior-Art Documents
              </h4>

              <div className="space-y-4">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className="rounded-xl border border-slate-700 bg-slate-950 p-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-3">
                          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                            Result {index + 1}
                          </span>

                          <span className="text-xs text-slate-500">
                            {result.id}
                          </span>
                        </div>

                        <h5 className="text-lg font-semibold text-blue-300">
                          {result.metadata.title}
                        </h5>
                      </div>

                      <div className="rounded-lg bg-slate-900 px-4 py-2 text-sm">
                        <span className="text-slate-500">
                          Distance:{" "}
                        </span>
                        <span className="font-semibold text-white">
                          {result.distance.toFixed(4)}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 leading-7 text-slate-400">
                      {result.document}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        Type: {result.metadata.type}
                      </span>

                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        Source: {result.metadata.source}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-slate-600">
          PatentPath — Invention-to-Patent Traceability and Prior-Art
          Analysis System
        </footer>
      </div>
    </main>
  );
}