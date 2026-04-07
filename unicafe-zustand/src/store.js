import { create } from 'zustand';

const useScoreStore = create(set => ({
    score: {
        good: 0,
        neutral: 0,
        bad: 0,
    },
    actions: {
        update: (type) => set(state => ({
            score: {
                ...state.score, 
                [type]: state.score[type] + 1
        }})),
    }
}));

export const useScore = () => useScoreStore(state => state.score);
export const useScoreActions = () => useScoreStore(state => state.actions);