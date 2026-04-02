export interface NutritionEntry {
  nutrients: string[];
  foods: string[];
  action: string;
  label: string;
}

export const NUTRITION_MAP: Record<string, NutritionEntry> = {
  hair_fall: {
    label: 'Hair Fall',
    nutrients: ['Biotin', 'Zinc', 'Iron', 'Protein', 'Vitamin E'],
    foods: ['Eggs', 'Pumpkin seeds', 'Spinach', 'Almonds', 'Lentils'],
    action: 'Consume 1 protein-rich meal daily'
  },
  digestion: {
    label: 'Weak Digestion',
    nutrients: ['Probiotics', 'Fiber', 'Digestive Enzymes', 'Magnesium'],
    foods: ['Curd', 'Banana', 'Papaya', 'Ginger', 'Flaxseeds'],
    action: 'Eat probiotic food every morning on empty stomach'
  },
  constipation: {
    label: 'Constipation',
    nutrients: ['Fiber', 'Magnesium', 'Water', 'Prebiotics'],
    foods: ['Papaya', 'Figs', 'Prunes', 'Oats', 'Sweet potato'],
    action: 'Drink 500ml warm water immediately on waking'
  },
  low_energy: {
    label: 'Low Energy',
    nutrients: ['Iron', 'B12', 'Vitamin D', 'Magnesium', 'Complex Carbs'],
    foods: ['Dates', 'Bananas', 'Brown rice', 'Beetroot', 'Chickpeas'],
    action: 'Eat a complex carb breakfast within 1 hour of waking'
  },
  poor_sleep: {
    label: 'Poor Sleep',
    nutrients: ['Melatonin', 'Magnesium', 'Tryptophan', 'B6'],
    foods: ['Walnuts', 'Cherries', 'Warm milk', 'Banana', 'Pumpkin seeds'],
    action: 'Have a light magnesium-rich snack 1 hour before bed'
  },
  posture: {
    label: 'Bad Posture',
    nutrients: ['Calcium', 'Vitamin D', 'Magnesium', 'Collagen'],
    foods: ['Milk', 'Sesame seeds', 'Amla', 'Bone broth', 'Tofu'],
    action: 'Include one calcium-rich food in every meal'
  },
  eye_strain: {
    label: 'Eye Strain',
    nutrients: ['Vitamin A', 'Lutein', 'Zeaxanthin', 'Omega-3'],
    foods: ['Carrots', 'Leafy greens', 'Eggs', 'Blueberries', 'Fish'],
    action: 'Eat one orange/yellow vegetable daily'
  }
};

// Map user context problem strings to nutrition keys
export const PROBLEM_TO_NUTRITION_KEY: Record<string, string> = {
  'Hair fall': 'hair_fall',
  'Weak digestion': 'digestion',
  'Constipation': 'constipation',
  'Low energy': 'low_energy',
  'Poor sleep': 'poor_sleep',
  'Bad posture': 'posture',
  'Eye strain': 'eye_strain',
};
