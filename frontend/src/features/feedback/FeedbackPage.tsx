/**
 * Feedback Page - Submit and analyze feedback
 */

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoints';
import { Loading } from '@/components/Loading';
import type { ApiResponse, Feedback, CreateFeedbackResponse } from '@/api/types';

export const FeedbackPage: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [result, setResult] = useState<{ sentiment: string; score: number } | null>(null);

  const { data: feedbacks, isLoading } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<Feedback[]>>(API_ENDPOINTS.FEEDBACK);
      return response.data.data;
    },
  });

  const analyzeMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await axiosClient.post<ApiResponse<CreateFeedbackResponse>>(
        API_ENDPOINTS.ANALYZE_SENTIMENT,
        { text }
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      setResult({ sentiment: data.sentiment, score: data.sentiment_score });
    },
  });

  const handleAnalyze = () => {
    if (feedbackText.trim()) {
      analyzeMutation.mutate(feedbackText);
    }
  };

  if (isLoading) return <Loading message="Loading feedback..." />;

  const sentimentCounts = {
    positive: feedbacks?.filter((f) => f.sentiment === 'positive').length || 0,
    neutral: feedbacks?.filter((f) => f.sentiment === 'neutral').length || 0,
    negative: feedbacks?.filter((f) => f.sentiment === 'negative').length || 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Feedback Analyzer</h1>
        <p className="mt-1 text-sm text-gray-600">Submit and analyze student feedback sentiment</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Analyze New Feedback</h2>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter feedback text to analyze sentiment..."
          className="input min-h-[120px]"
        />
        <button onClick={handleAnalyze} disabled={analyzeMutation.isPending} className="btn-primary mt-4">
          {analyzeMutation.isPending ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>

        {result && (
          <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm font-medium">Result:</p>
            <p className="text-lg">
              Sentiment: <strong className="capitalize">{result.sentiment}</strong> (Score: {result.score.toFixed(2)})
            </p>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Sentiment Distribution</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-success-50 rounded text-center">
            <p className="text-sm text-gray-600">Positive</p>
            <p className="text-3xl font-bold text-success-700">{sentimentCounts.positive}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded text-center">
            <p className="text-sm text-gray-600">Neutral</p>
            <p className="text-3xl font-bold text-gray-700">{sentimentCounts.neutral}</p>
          </div>
          <div className="p-4 bg-danger-50 rounded text-center">
            <p className="text-sm text-gray-600">Negative</p>
            <p className="text-3xl font-bold text-danger-700">{sentimentCounts.negative}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Feedback ({feedbacks?.length || 0})</h2>
        <div className="space-y-3">
          {feedbacks?.slice(0, 10).map((feedback) => (
            <div key={feedback.feedback_id} className="p-3 bg-gray-50 rounded border">
              <p className="text-sm text-gray-800">{feedback.feedback_text}</p>
              {feedback.sentiment && (
                <span className={`mt-2 inline-block px-2 py-1 text-xs rounded ${
                  feedback.sentiment === 'positive' ? 'bg-success-100 text-success-800' :
                  feedback.sentiment === 'negative' ? 'bg-danger-100 text-danger-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {feedback.sentiment}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
