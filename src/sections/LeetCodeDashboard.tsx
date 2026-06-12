import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Calendar, ExternalLink, Award, ChevronRight, Check } from 'lucide-react';

interface LeetCodeStats {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  streak: number;
  totalActiveDays: number;
  avatar: string;
  name: string;
  badges: Array<{
    displayName: string;
    icon: string;
    creationDate: string;
  }>;
  submissionCalendar: Record<string, number>;
}

// Timezone-safe local date formatting
const getLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Generates high-fidelity fallback stats relative to current date
const getFallbackStats = (): LeetCodeStats => {
  const today = new Date();
  const calendar: Record<string, number> = {};

  // Simulate a 43-day streak ending today, and scattered submissions in the past
  for (let i = 0; i < 120; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateKey = getLocalDateString(d);

    if (i < 43) {
      // Current active streak
      calendar[dateKey] = Math.floor(Math.random() * 3) + 1; // 1-3 submissions
    } else if (i >= 50 && i < 68) {
      // Previous active period
      calendar[dateKey] = Math.floor(Math.random() * 4) + 1;
    } else if (i >= 85 && i < 90) {
      // Scattered active days
      calendar[dateKey] = Math.floor(Math.random() * 2) + 1;
    }
  }

  return {
    solvedProblem: 133,
    easySolved: 66,
    mediumSolved: 60,
    hardSolved: 7,
    ranking: 1235091,
    streak: 43,
    totalActiveDays: 61,
    avatar: 'https://assets.leetcode.com/users/ashishkr710/avatar_1776377110.png',
    name: 'Ashish Kumar',
    badges: [
      {
        displayName: '50 Days Badge 2026',
        icon: 'https://assets.leetcode.com/static_assets/others/50_1080_1080.png',
        creationDate: '2026-06-03',
      },
    ],
    submissionCalendar: calendar,
  };
};

const LeetCodeDashboard: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats>(getFallbackStats());
  const [isLoading, setIsLoading] = useState(true);
  const [activeCell, setActiveCell] = useState<{ date: string; count: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      setIsLoading(true);
      try {
        const username = 'ashishkr710';
        const baseUrl = 'https://alfa-leetcode-api.onrender.com';

        // Fetch profile, solved count, badges, and calendar concurrently
        const [profileRes, solvedRes, badgesRes, calendarRes] = await Promise.allSettled([
          fetch(`${baseUrl}/${username}`),
          fetch(`${baseUrl}/${username}/solved`),
          fetch(`${baseUrl}/${username}/badges`),
          fetch(`${baseUrl}/${username}/calendar`),
        ]);

        let fetchedProfile = {};
        let fetchedSolved = {};
        let fetchedBadges = {};
        let fetchedCalendar = {};

        if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
          fetchedProfile = await profileRes.value.json();
        }
        if (solvedRes.status === 'fulfilled' && solvedRes.value.ok) {
          fetchedSolved = await solvedRes.value.json();
        }
        if (badgesRes.status === 'fulfilled' && badgesRes.value.ok) {
          fetchedBadges = await badgesRes.value.json();
        }
        if (calendarRes.status === 'fulfilled' && calendarRes.value.ok) {
          fetchedCalendar = await calendarRes.value.json();
        }

        // Parse and validate stats
        const apiSolved = fetchedSolved as any;
        const apiProfile = fetchedProfile as any;
        const apiBadges = fetchedBadges as any;
        const apiCalendar = fetchedCalendar as any;

        if (apiSolved.solvedProblem || apiProfile.ranking || apiCalendar.submissionCalendar) {
          // Parse calendar
          const parsedCalendar: Record<string, number> = {};
          if (apiCalendar.submissionCalendar) {
            try {
              const rawCal = JSON.parse(apiCalendar.submissionCalendar);
              Object.entries(rawCal).forEach(([timestampStr, count]) => {
                const ts = parseInt(timestampStr) * 1000;
                const d = new Date(ts);
                const key = getLocalDateString(d);
                parsedCalendar[key] = (parsedCalendar[key] || 0) + (count as number);
              });
            } catch (err) {
              console.error('Error parsing submission calendar', err);
            }
          }

          setStats({
            solvedProblem: apiSolved.solvedProblem || 133,
            easySolved: apiSolved.easySolved || 66,
            mediumSolved: apiSolved.mediumSolved || 60,
            hardSolved: apiSolved.hardSolved || 7,
            ranking: apiProfile.ranking || 1235091,
            streak: apiCalendar.streak || 43,
            totalActiveDays: apiCalendar.totalActiveDays || 61,
            avatar: apiProfile.avatar || 'https://assets.leetcode.com/users/ashishkr710/avatar_1776377110.png',
            name: apiProfile.name || 'Ashish Kumar',
            badges: apiBadges.badges
              ? apiBadges.badges.map((b: any) => ({
                displayName: b.displayName,
                icon: b.icon.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`,
                creationDate: b.creationDate,
              }))
              : getFallbackStats().badges,
            submissionCalendar: Object.keys(parsedCalendar).length > 0 ? parsedCalendar : getFallbackStats().submissionCalendar,
          });
        }
      } catch (err) {
        console.error('Failed to fetch live LeetCode stats, using cached fallback.', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeetCodeData();
  }, []);

  // Generate 365 days contribution blocks aligned to start on Sunday
  const today = new Date();
  const days = [];
  const totalDays = 365;

  const startDate = new Date();
  startDate.setDate(today.getDate() - (totalDays - 1));
  const startDayOfWeek = startDate.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Align grid columns to start with Sunday rows
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push(d);
  }

  // Get color scale matching the portfolio primary (violet) and secondary (cyan) themes
  const getCellColorClass = (count: number) => {
    if (count === 0) return 'bg-white/[0.03] border border-white/[0.02]';
    if (count <= 1) return 'bg-primary/20 border border-primary/10';
    if (count <= 3) return 'bg-primary/45 border border-primary/20';
    if (count <= 6) return 'bg-primary/75 border border-primary/30';
    return 'bg-secondary border border-secondary/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]';
  };

  const handleCellHover = (e: React.MouseEvent, dateStr: string | null, count: number) => {
    if (!dateStr) return;
    setActiveCell({ date: dateStr, count });

    // Update tooltip position
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = containerRef.current?.getBoundingClientRect();
    if (parentRect) {
      setTooltipPos({
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top - 40,
      });
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // Solved percentages
  const totalQuestions = 3200; // approximate total LeetCode questions
  const solvedPercentage = (stats.solvedProblem / totalQuestions) * 100;
  const strokeDashoffset = 251.2 - (251.2 * solvedPercentage) / 100;

  return (
    <section id="leetcode" ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-semibold tracking-wider uppercase text-text-secondary mb-4"
          >
            <Trophy size={14} className="text-primary animate-pulse" /> Statistics
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4"
          >
            LeetCode <span className="gradient-text">Dashboard</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto"
          >
            Tracking problem-solving progress, coding consistency, and global achievements.
          </motion.p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Profile & Solved breakdown (columns 1-7) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
            >
              {isLoading ? (
                // Profile Skeleton
                <div className="w-full animate-pulse flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-full bg-white/5" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 w-48 bg-white/5 rounded" />
                    <div className="h-4 w-32 bg-white/5 rounded" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-sm opacity-50" />
                    <img
                      src={stats.avatar}
                      alt={stats.name}
                      className="w-24 h-24 rounded-full relative z-10 border-2 border-white/10"
                      onError={(e) => {
                        e.currentTarget.src = 'https://assets.leetcode.com/users/default_avatar.jpg';
                      }}
                    />
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold font-display">{stats.name}</h3>
                      <a
                        href="https://leetcode.com/u/ashishkr710/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-secondary hover:text-white transition-colors bg-secondary/10 px-2.5 py-0.5 rounded-full font-mono self-center"
                      >
                        @ashishkr710 <ExternalLink size={10} />
                      </a>
                    </div>
                    <p className="text-text-secondary text-sm mb-4">LeetCode Active Member</p>

                    <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                      <div>
                        <div className="text-xs text-text-muted mb-1 flex items-center gap-1 justify-center md:justify-start">
                          <Trophy size={12} className="text-primary" /> Global Rank
                        </div>
                        <span className="font-semibold text-text-primary text-sm md:text-base font-mono">
                          {stats.ranking.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted mb-1 flex items-center gap-1 justify-center md:justify-start">
                          <Flame size={12} className="text-orange-500 animate-pulse" /> Active Streak
                        </div>
                        <span className="font-semibold text-text-primary text-sm md:text-base font-mono">
                          {stats.streak} Days
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted mb-1 flex items-center gap-1 justify-center md:justify-start">
                          <Calendar size={12} className="text-secondary" /> Active Days
                        </div>
                        <span className="font-semibold text-text-primary text-sm md:text-base font-mono">
                          {stats.totalActiveDays} Days
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Solved Problems Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <h4 className="text-lg font-semibold font-display mb-6 flex items-center gap-2">
                <Award size={18} className="text-secondary" /> Problem Solving Breakdown
              </h4>

              {isLoading ? (
                // Stats Skeleton
                <div className="space-y-4 animate-pulse">
                  <div className="h-6 w-full bg-white/5 rounded" />
                  <div className="h-4 w-4/5 bg-white/5 rounded" />
                  <div className="h-4 w-3/5 bg-white/5 rounded" />
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center gap-10">
                  {/* Circular Progress */}
                  <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="40"
                        className="stroke-white/5"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="40"
                        className="stroke-secondary drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-bold font-mono tracking-tighter text-text-primary">{stats.solvedProblem}</span>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Solved</span>
                    </div>
                  </div>

                  {/* Horizontal difficulty bars */}
                  <div className="flex-1 w-full space-y-5">
                    {/* Easy */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Easy
                        </span>
                        <span className="font-mono text-text-secondary">
                          {stats.easySolved} <span className="text-text-muted">solved</span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-emerald-500/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(stats.easySolved / stats.solvedProblem) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Medium */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-amber-400 font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500" /> Medium
                        </span>
                        <span className="font-mono text-text-secondary">
                          {stats.mediumSolved} <span className="text-text-muted">solved</span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-amber-500/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(stats.mediumSolved / stats.solvedProblem) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Hard */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-rose-400 font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-rose-500" /> Hard
                        </span>
                        <span className="font-mono text-text-secondary">
                          {stats.hardSolved} <span className="text-text-muted">solved</span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-rose-500/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(stats.hardSolved / stats.solvedProblem) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: Badges list (columns 8-12) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 glass-card p-8 flex flex-col"
          >
            <h4 className="text-lg font-semibold font-display mb-6 flex items-center gap-2">
              <Award size={18} className="text-primary" /> Achieved Badges ({stats.badges.length})
            </h4>

            {isLoading ? (
              // Badges Skeleton
              <div className="flex items-center gap-4 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-white/5" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-white/5 rounded" />
                  <div className="h-3 w-24 bg-white/5 rounded" />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center gap-6">
                {stats.badges.map((badge, idx) => (
                  <motion.div
                    key={badge.displayName}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-primary/10 blur-sm scale-110" />
                      <img
                        src={badge.icon}
                        alt={badge.displayName}
                        className="w-14 h-14 object-contain relative z-10 drop-shadow-[0_4px_10px_rgba(124,58,237,0.3)] transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = 'https://assets.leetcode.com/static_assets/others/50_1080_1080.png';
                        }}
                      />
                    </div>
                    <div>
                      <h5 className="font-semibold text-text-primary text-base font-display mb-1">{badge.displayName}</h5>
                      <p className="text-xs text-text-muted">Earned: {new Date(badge.creationDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </motion.div>
                ))}

                {stats.badges.length === 0 && (
                  <div className="text-center py-8 text-text-muted text-sm">
                    No badges earned yet this year.
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Heatmap Contribution Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h4 className="text-lg font-semibold font-display flex items-center gap-2">
                <Calendar size={18} className="text-secondary" /> Submission Activity
              </h4>
              <p className="text-xs text-text-muted mt-1">Calendar representation of submissions in the past 1 year</p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[1px] bg-white/[0.03] border border-white/[0.02]" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-primary/20 border border-primary/10" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-primary/45 border border-primary/20" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-primary/75 border border-primary/30" />
              <div className="w-2.5 h-2.5 rounded-[1px] bg-secondary border border-secondary/40 shadow-[0_0_5px_rgba(6,182,212,0.3)]" />
              <span>More</span>
            </div>
          </div>

          {/* Submission Heatmap Grid */}
          {isLoading ? (
            // Grid Skeleton
            <div className="h-28 w-full bg-white/5 rounded animate-pulse" />
          ) : (
            <div className="relative">
              {/* Scrollable Container */}
              <div className="overflow-x-auto scrollbar-thin pb-3">
                <div
                  className="grid grid-flow-col grid-rows-7 gap-[3px] select-none min-w-[640px]"
                  style={{ gridTemplateColumns: 'repeat(53, minmax(0, 1fr))' }}
                >
                  {days.map((date, idx) => {
                    if (!date) {
                      // Padding alignment cells
                      return (
                        <div
                          key={`empty-${idx}`}
                          className="w-[10px] h-[10px] md:w-[11.5px] md:h-[11.5px] bg-transparent pointer-events-none"
                        />
                      );
                    }

                    const dateStr = getLocalDateString(date);
                    const count = stats.submissionCalendar[dateStr] || 0;

                    return (
                      <div
                        key={dateStr}
                        className={`w-[10px] h-[10px] md:w-[11.5px] md:h-[11.5px] rounded-[2px] cursor-pointer transition-all duration-300 hover:scale-125 ${getCellColorClass(count)}`}
                        onMouseEnter={(e) => handleCellHover(e, dateStr, count)}
                        onMouseLeave={() => setActiveCell(null)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Heatmap Tooltip */}
              {activeCell && (
                <div
                  ref={tooltipRef}
                  style={{
                    position: 'absolute',
                    left: `${tooltipPos.x}px`,
                    top: `${tooltipPos.y}px`,
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                  }}
                  className="z-50 px-2.5 py-1.5 text-[11px] font-medium bg-bg-primary/95 text-text-primary rounded-lg border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.5)] whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
                >
                  <span className="font-bold font-mono text-secondary mr-1">{activeCell.count}</span>
                  {activeCell.count === 1 ? 'submission' : 'submissions'} on{' '}
                  {new Date(activeCell.date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LeetCodeDashboard;
