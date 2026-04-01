import { BodyStatus } from "../../store/useAppStore";

export interface WeeklyInsight {
  type: 'improvement' | 'consistency' | 'warning';
  title: string;
  description: string;
  impact: number; // percentage
}

export const generateWeeklyReport = (history: any[]) => {
  if (history.length < 2) return [];

  const insights: WeeklyInsight[] = [];
  const latest = history[history.length - 1];
  const previous = history[history.length - 2];

  // 1. Overall Completion Insight
  const completionDiff = latest.completion - previous.completion;
  if (completionDiff > 0) {
    insights.push({
      type: 'improvement',
      title: 'Momentum Gained',
      description: `Your daily adherence improved by ${Math.round(completionDiff)}% compared to yesterday.`,
      impact: completionDiff
    });
  }

  // 2. Body healing insights
  const parts = ['head', 'neck', 'back', 'gut', 'legs'];
  const statusWeight = { 'bad': 0, 'moderate': 50, 'good': 100 };

  parts.forEach(part => {
    const lStatus = latest.bodyState[part] as BodyStatus;
    const pStatus = previous.bodyState[part] as BodyStatus;

    if (statusWeight[lStatus] > statusWeight[pStatus]) {
      insights.push({
        type: 'improvement',
        title: `${part.charAt(0).toUpperCase() + part.slice(1)} Healing`,
        description: `Visual improvement detected in your ${part} region. The system is responding well to your protocol.`,
        impact: 20
      });
    }
  });

  // 3. Consistency check
  const last7Days = history.slice(-7);
  const avgCompletion = last7Days.reduce((acc, h) => acc + h.completion, 0) / last7Days.length;

  if (avgCompletion >= 80) {
    insights.push({
      type: 'consistency',
      title: 'Elite Consistency',
      description: 'You are operating at an elite level. Your physiological baseline is shifting upwards.',
      impact: avgCompletion
    });
  }

  return insights;
};
