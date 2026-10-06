import React from 'react';

export default function ScoreCard({ score, bestScore }) {
    return (
        <div className="score-board">
            <div>
                <span>Score</span>
                <strong>{score}</strong>
            </div>
            <div>
                <span>Best Score</span>
                <strong>{bestScore}</strong>
            </div>
        </div>
    );
}