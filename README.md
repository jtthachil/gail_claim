# Claim Quiz App

A React-based quiz application to help users assess whether they may have a psychological injury claim.

## Features

- **6 targeted questions** about workplace psychological injury indicators
- **Scoring system**: Yes (2 points), Unsure (1 point), No (0 points)
- **Three result categories**:
  - Score ≥6: "You may have a claim"
  - Score 3-5: "You might have a claim, talk to us"
  - Score ≤2: "A claim may not be viable"
- **Progress tracking** with visual progress bar
- **Mobile responsive** design
- **Call-to-action** for booking intake calls
- **Professional UI** with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Quiz Logic

The quiz uses the following scoring system:
- **Yes**: 2 points
- **Unsure**: 1 point  
- **No**: 0 points

**Results interpretation:**
- **6+ points**: Strong indicators for a potential claim
- **3-5 points**: Some indicators present, consultation recommended
- **0-2 points**: Limited indicators, but consultation still available

## Questions Included

1. Do you feel emotionally drained or mentally exhausted after work?
2. Have you raised issues at work and felt ignored or dismissed?
3. Has your work environment negatively affected your sleep or mental wellbeing?
4. Do you feel unsupported or confused about your role expectations?
5. Are you seeing a doctor or psychologist for work-related stress?
6. Did your employer fail to act when you first raised concerns?

## Customization

To modify questions, edit the `questions` array in `src/components/ClaimQuiz.js`.

To adjust scoring thresholds, modify the logic in the `getResultMessage()` function.

## Technologies Used

- React 18
- CSS3 with modern features
- Responsive design
- Smooth animations and transitions 