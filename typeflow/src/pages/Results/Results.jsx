import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts';
import { resetSession } from '../../store/session/sessionSlice';
import { calculatePerKeyAccuracy, formatTime } from '../../utils/metrics';
import './Results.css';

const KEY_COLORS = {
  a: '#ff6b9d', s: '#c77dff', d: '#5b8dee', f: '#00d4ff',
  j: '#00f5a0', k: '#ffd60a', l: '#ff9500', ';': '#ff4757',
};

export default function Results() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((s) => s.session);
  const history = useSelector((s) => s.history.sessions);

  const { stats, keystrokes, status } = session;

  // Per-key accuracy breakdown
  const perKeyData = calculatePerKeyAccuracy(keystrokes);

  // Session history chart data (last 10)
  const historyData = history.slice(-10).map((s, i) => ({
    session: `#${i + 1}`,
    accuracy: s.stats.accuracy,
    wpm: s.stats.wpm,
    keystrokes: s.stats.total,
  }));

  const hasData = stats.total > 0;

  const handlePlayAgain = () => {
    dispatch(resetSession());
    navigate('/practice');
  };

  const accuracyGrade =
    stats.accuracy >= 95 ? { label: 'Excellent', color: '#00f5a0' } :
    stats.accuracy >= 85 ? { label: 'Good', color: '#00d4ff' } :
    stats.accuracy >= 70 ? { label: 'Fair', color: '#ffd60a' } :
    { label: 'Keep Practicing', color: '#ff4757' };

  return (
    <div className="results">
      <div className="results-content">
        <div className="results-header">
          <h1 className="results-title">Session Results</h1>
          <div className="results-actions">
            <button id="btn-play-again" className="ctrl-btn ctrl-primary" onClick={handlePlayAgain}>
              ▶ Practice Again
            </button>
            <button id="btn-go-home" className="ctrl-btn ctrl-secondary" onClick={() => navigate('/')}>
              🏠 Home
            </button>
          </div>
        </div>

        {!hasData ? (
          <div className="no-data">
            <div className="no-data-icon">📭</div>
            <h2>No session data yet</h2>
            <p>Complete a practice session to see your results here.</p>
            <button className="ctrl-btn ctrl-primary" onClick={() => navigate('/practice')}>
              Start Practicing
            </button>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="summary-grid">
              <div className="summary-card summary-main">
                <span className="summary-label">Accuracy</span>
                <span className="summary-value" style={{ color: accuracyGrade.color }}>
                  {stats.accuracy}%
                </span>
                <span className="summary-grade" style={{ color: accuracyGrade.color }}>
                  {accuracyGrade.label}
                </span>
              </div>
              <div className="summary-card">
                <span className="summary-label">Total Keystrokes</span>
                <span className="summary-value summary-cyan">{stats.total}</span>
                <span className="summary-sub">{stats.correct} correct · {stats.total - stats.correct} errors</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">WPM</span>
                <span className="summary-value summary-purple">{stats.wpm}</span>
                <span className="summary-sub">words per minute</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">Time Practiced</span>
                <span className="summary-value summary-mono">
                  {formatTime(stats.elapsedSeconds || 300)}
                </span>
                <span className="summary-sub">of 5:00 session</span>
              </div>
            </div>

            {/* Per-key accuracy chart */}
            {perKeyData.length > 0 && (
              <div className="chart-section">
                <h2 className="chart-title">Per-Key Accuracy</h2>
                <p className="chart-desc">See which keys need more practice</p>
                <div className="chart-wrap">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={perKeyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <XAxis
                        dataKey="key"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 14, fontFamily: 'JetBrains Mono', fontWeight: 700 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0].payload;
                          return (
                            <div className="custom-tooltip">
                              <div className="tt-key">{d.key.toUpperCase()}</div>
                              <div className="tt-row">Accuracy: <strong>{d.accuracy}%</strong></div>
                              <div className="tt-row">Correct: <strong>{d.correct}/{d.total}</strong></div>
                            </div>
                          );
                        }}
                      />
                      <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                        {perKeyData.map((entry) => (
                          <Cell
                            key={entry.key}
                            fill={KEY_COLORS[entry.key] || '#00d4ff'}
                            fillOpacity={0.85}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Key accuracy table */}
                <div className="key-table">
                  {perKeyData.map((d) => (
                    <div key={d.key} className="key-table-row">
                      <span
                        className="key-table-char"
                        style={{ color: KEY_COLORS[d.key] || '#fff' }}
                      >
                        {d.key.toUpperCase()}
                      </span>
                      <div className="key-table-bar-wrap">
                        <div
                          className="key-table-bar"
                          style={{
                            width: `${d.accuracy}%`,
                            background: KEY_COLORS[d.key] || '#00d4ff',
                          }}
                        />
                      </div>
                      <span className="key-table-pct">{d.accuracy}%</span>
                      <span className="key-table-count">{d.correct}/{d.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History chart */}
            {historyData.length > 1 && (
              <div className="chart-section">
                <h2 className="chart-title">Progress Over Sessions</h2>
                <p className="chart-desc">Last {historyData.length} sessions</p>
                <div className="chart-wrap">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={historyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                      <XAxis
                        dataKey="session"
                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#131927',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                        labelStyle={{ color: '#fff' }}
                        itemStyle={{ color: 'rgba(255,255,255,0.7)' }}
                      />
                      <Legend wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }} />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#00d4ff"
                        strokeWidth={2}
                        dot={{ fill: '#00d4ff', r: 4 }}
                        name="Accuracy %"
                      />
                      <Line
                        type="monotone"
                        dataKey="wpm"
                        stroke="#c77dff"
                        strokeWidth={2}
                        dot={{ fill: '#c77dff', r: 4 }}
                        name="WPM"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
