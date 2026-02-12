import { useEffect, useState, useMemo } from 'react';
// import { motion } from 'framer-motion'; // Unused
import { BadgeCheck, ArrowRight, Zap } from 'lucide-react';
// ... (rest of imports)

interface LeetCodeData {
    solvedProblem: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acceptanceRate?: number;
    recentSubmissions?: Array<{
        title: string;
        titleSlug: string;
        timestamp: string;
        statusDisplay: string;
        lang: string;
    }>;
    submissionCalendar?: string; // JSON string "epoch": count
}

export default function LeetCodeStats() {
    const [stats, setStats] = useState<LeetCodeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // 1. Fetch Solved Stats
                const solvedRes = await fetch('https://alfa-leetcode-api.onrender.com/Himanshu_Alien/solved');
                const solvedData = await solvedRes.json();

                // 2. Fetch Recent Submissions
                const subRes = await fetch('https://alfa-leetcode-api.onrender.com/Himanshu_Alien/submission?limit=3');
                const subData = await subRes.json();

                // 3. Fetch Calendar for Heatmap
                const calRes = await fetch('https://alfa-leetcode-api.onrender.com/Himanshu_Alien/calendar');
                const calData = await calRes.json();

                if (solvedData.solvedProblem !== undefined) {
                    setStats({
                        solvedProblem: solvedData.solvedProblem,
                        easySolved: solvedData.easySolved,
                        mediumSolved: solvedData.mediumSolved,
                        hardSolved: solvedData.hardSolved,
                        recentSubmissions: subData.submission,
                        submissionCalendar: calData.submissionCalendar
                    });
                } else {
                    setError(true);
                }
            } catch (e) {
                console.error("LeetCode fetch error:", e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Generate Heatmap Data (Last ~4 months)
    const heatmapData = useMemo(() => {
        if (!stats?.submissionCalendar) return [];

        let calendar: Record<string, number> = {};
        try {
            calendar = JSON.parse(stats.submissionCalendar);
        } catch (e) {
            console.error("Failed to parse submissionCalendar", e);
            return [];
        }

        const today = new Date();
        const days = [];
        // ~4 months = ~120 days. Let's do 17 weeks * 7 = 119 days for a full grid
        const totalDays = 119;

        for (let i = totalDays; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            days.push({
                date: date,
                count: 0
            });
        }

        // Fill counts
        const countMap = new Map<string, number>();
        Object.entries(calendar).forEach(([epoch, count]) => {
            const date = new Date(parseInt(epoch) * 1000);
            const key = date.toISOString().split('T')[0];
            countMap.set(key, (count as number));
        });

        return days.map(d => {
            const key = d.date.toISOString().split('T')[0];
            return {
                ...d,
                count: countMap.get(key) || 0
            };
        });

    }, [stats?.submissionCalendar]);


    if (error) {
        return (
            <div className="p-6 border border-white/10 bg-white/5 rounded-xl text-center h-full flex flex-col justify-center items-center">
                <p className="text-white/50">Unable to load LeetCode stats.</p>
                <a href="https://leetcode.com/u/Himanshu_Alien/" target="_blank" className="text-orange-400 mt-2 inline-block">View Profile</a>
            </div>
        )
    }

    if (loading) {
        return <div className="animate-pulse h-full min-h-[300px] bg-white/5 rounded-xl"></div>;
    }

    return (
        <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden group h-full flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h4 className="text-2xl font-bold text-white font-display mb-1">LeetCode</h4>
                    <p className="text-orange-400 text-xs font-mono uppercase tracking-widest">Problem Solving</p>
                </div>
                <div className="text-right">
                    <span className="text-4xl font-bold text-white block">{stats?.solvedProblem}</span>
                    <span className="text-white/40 text-xs uppercase tracking-widest">Solved</span>
                </div>
            </div>

            {/* Solved Grid */}
            <div className="grid grid-cols-3 gap-4 relative z-10 mb-8">
                <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-white/5 backdrop-blur-sm">
                    <span className="text-emerald-400 font-bold text-xl">{stats?.easySolved}</span>
                    <span className="text-white/30 text-xs uppercase mt-1">Easy</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-white/5 backdrop-blur-sm">
                    <span className="text-yellow-400 font-bold text-xl">{stats?.mediumSolved}</span>
                    <span className="text-white/30 text-xs uppercase mt-1">Med</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-white/5 backdrop-blur-sm">
                    <span className="text-red-400 font-bold text-xl">{stats?.hardSolved}</span>
                    <span className="text-white/30 text-xs uppercase mt-1">Hard</span>
                </div>
            </div>

            {/* Heatmap (Last ~4 Months) */}
            <div className="relative z-10 mb-4">
                <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 flex justify-between items-center">
                    <span>Activity</span>
                    <span className="text-white/20">Last 4 Months</span>
                </h5>

                {stats?.submissionCalendar ? (
                    <div className="flex gap-1 overflow-x-hidden pb-1">
                        <div className="grid grid-rows-7 grid-flow-col gap-1 w-full relative">
                            {heatmapData.map((day, i) => {
                                let colorClass = 'bg-white/5';
                                if (day.count > 0) colorClass = 'bg-green-900/40';
                                if (day.count >= 1) colorClass = 'bg-emerald-900';
                                if (day.count >= 3) colorClass = 'bg-emerald-600';
                                if (day.count >= 5) colorClass = 'bg-emerald-400';

                                return (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-sm ${colorClass}`}
                                        title={`${day.date.toDateString()}: ${day.count} submissions`}
                                    />
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-[10px] text-white/30 italic">No heatmap data.</div>
                )}
            </div>

            {/* Latest Solved (Single Detailed Item) */}
            <div className="relative z-10 flex-1 border-t border-white/5 pt-3">
                <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                    Latest Solved <Zap className="w-3 h-3 text-yellow-500" />
                </h5>
                {stats?.recentSubmissions && stats.recentSubmissions.length > 0 ? (
                    <div className="flex items-center justify-between group/item p-2 bg-white/5 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-1.5 bg-emerald-500/10 rounded-md shrink-0">
                                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="text-xs font-medium text-white/90 truncate">
                                    {stats.recentSubmissions[0].title}
                                </span>
                                <span className="text-[10px] text-white/40 font-mono">
                                    {stats.recentSubmissions[0].timestamp ? new Date(parseInt(stats.recentSubmissions[0].timestamp) * 1000).toLocaleDateString() : 'Just now'}
                                </span>
                            </div>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-white/50 bg-white/5 px-2 py-1 rounded">
                            {stats.recentSubmissions[0].lang}
                        </span>
                    </div>
                ) : (
                    <div className="text-[10px] text-white/30 italic">No recent activity.</div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center relative z-10 pt-4 border-t border-white/10">
                <a href="https://leetcode.com/u/Himanshu_Alien/" target="_blank" className="text-xs text-orange-400 hover:text-orange-300 uppercase tracking-widest transition-colors flex items-center gap-1 group/link">
                    View Profile <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    );
}
