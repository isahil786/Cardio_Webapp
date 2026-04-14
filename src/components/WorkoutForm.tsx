import { useState } from 'react';
import type { Workout, Exercise } from '../types';

interface WorkoutFormProps {
  onAddWorkout: (workout: Workout) => void;
}

// Mock exercise data - in a real app this would come from an API
const mockExercises: Exercise[] = [
  { id: '1', name: 'Running', category: 'running', description: 'Outdoor or treadmill running', caloriesPerMinute: 10 },
  { id: '2', name: 'Cycling', category: 'cycling', description: 'Stationary or outdoor cycling', caloriesPerMinute: 8 },
  { id: '3', name: 'Swimming', category: 'swimming', description: 'Pool or open water swimming', caloriesPerMinute: 9 },
  { id: '4', name: 'Rowing', category: 'rowing', description: 'Machine rowing', caloriesPerMinute: 7 },
  { id: '5', name: 'HIIT', category: 'hiit', description: 'High-intensity interval training', caloriesPerMinute: 12 },
  { id: '6', name: 'Jump Rope', category: 'other', description: 'Jump rope workout', caloriesPerMinute: 11 },
];

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onAddWorkout }) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(mockExercises[0]);
  const [duration, setDuration] = useState<number>(30);
  const [distance, setDistance] = useState<number>(0);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');

  const calculateCalories = () => {
    if (!selectedExercise) return 0;
    return Math.round(selectedExercise.caloriesPerMinute * duration);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const workout: Workout = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedExercise?.name || '',
      duration,
      distance: distance || undefined,
      calories: calculateCalories(),
      date: `${date}T00:00:00Z`,
      notes: notes || undefined,
    };

    onAddWorkout(workout);

    // Reset form
    setDuration(30);
    setDistance(0);
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
  };

  return (
    <div className="workout-form">
      <h2>Log a New Workout</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label>Exercise Type</label>
            <select
              value={selectedExercise?.id || ''}
              onChange={(e) => setSelectedExercise(mockExercises.find(ex => ex.id === e.target.value) || null)}
              required
            >
              {mockExercises.map(ex => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Distance (optional)</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value) || 0)}
              placeholder="e.g., 5 for 5km"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="How did you feel? Any observations?"
          />
        </div>

        <div className="form-footer">
          <button type="submit" className="primary-btn">
            Log Workout
          </button>
          <p className="calories-estimate">
            Estimated calories: <strong>{calculateCalories()}</strong>
          </p>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;