export interface Workout {
  id: string;
  type: string;
  duration: number; // in minutes
  distance?: number; // in km/mi
  calories?: number;
  date: string; // ISO date string
  notes?: string;
  userId?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'running' | 'cycling' | 'swimming' | 'rowing' | 'hiit' | 'other';
  description: string;
  caloriesPerMinute: number;
  equipmentNeeded?: string[];
}

export interface Food {
  id: string;
  name: string;
  category: 'protein' | 'carbs' | 'fats' | 'vegetables' | 'fruits' | 'other';
  caloriesPerServing: number;
  servingSize: string;
  protein?: number;
  carbs?: number;
  fats?: number;
  description: string;
}

export interface DietPlan {
  id: string;
  name: string;
  dailyCalories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: Food[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  workouts: Workout[];
  preferences: {
    unitSystem: 'metric' | 'imperial';
    favoriteExercises: string[];
  };
}

export interface AnalyticsData {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  weeklyTrend: Array<{ date: string; value: number }>;
  exerciseBreakdown: Array<{ name: string; count: number }>;
}