# Setup Instructions

This document provides detailed setup instructions for the Student Result Visualization Dashboard project.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js** (version 16.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** (usually comes with Node.js) or **yarn**
  - Verify npm: `npm --version`
  - Or install yarn: `npm install -g yarn`
- **Git** (for version control)
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### Optional but Recommended
- **VS Code** or your preferred code editor
- **GitHub Desktop** (for easier Git management)
- **Chrome/Firefox DevTools** (for debugging)

## 🚀 Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/student-result-visualization.git

# Navigate to the project directory
cd student-result-visualization
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all the required packages:
- React 18
- Recharts (for charts)
- Lucide React (for icons)
- React Scripts (for development server)

### Step 3: Start the Development Server

```bash
# Using npm
npm start

# OR using yarn
yarn start
```

The application will automatically open in your browser at `http://localhost:3000`

## 🔧 Development Workflow

### File Structure
```
src/
├── StudentDashboard.jsx    # Main dashboard component
├── data/
│   └── studentData.js      # Sample data
├── utils/
│   └── gradeCalculator.js  # Helper functions
└── index.js               # Entry point
```

### Making Changes
1. Edit files in the `src/` directory
2. Save your changes
3. The browser will automatically refresh (Hot Reload)
4. Check the console for any errors

### Adding New Features
1. Create new components in `src/components/`
2. Import and use them in `StudentDashboard.jsx`
3. Add any utility functions to `src/utils/`
4. Update sample data in `src/data/studentData.js` if needed

## 📊 Data Management

### Sample Data Format
The dashboard uses the following data structure:

```javascript
const studentData = [
  {
    id: 1,
    name: "Student Name",
    class: "10A",
    term: "Term 1",
    math: 92,
    science: 88,
    english: 85,
    history: 79,
    geography: 83
  }
  // ... more students
];
```

### Customizing Data
1. Edit `src/data/studentData.js`
2. Add more students, subjects, or terms
3. The dashboard will automatically adapt to your data

### Adding New Subjects
1. Add the subject to your data objects
2. Update the subjects array in `StudentDashboard.jsx`:
   ```javascript
   const subjects = ['math', 'science', 'english', 'history', 'geography', 'newSubject'];
   ```

## 🎨 Customization

### Changing Colors
Edit the color arrays in `StudentDashboard.jsx`:
```javascript
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];
```

### Modifying Grade Scale
Update the `getGrade` function:
```javascript
const getGrade = (marks) => {
  if (marks >= 90) return 'A+';
  if (marks >= 85) return 'A';
  // ... customize as needed
};
```

### Adding New Chart Types
1. Import new chart components from Recharts
2. Add them to your dashboard layout
3. Create data formatting functions as needed

## 🏗️ Building for Production

### Build the Project
```bash
# Create production build
npm run build

# OR using yarn
yarn build
```

This creates a `build/` folder with optimized files for deployment.

### Deploy to GitHub Pages
```bash
# Deploy to GitHub Pages
npm run deploy

# OR using yarn
yarn deploy
```

## 🧪 Testing

### Run Tests
```bash
# Run test suite
npm test

# OR using yarn
yarn test
```

### Manual Testing Checklist
- [ ] Dashboard loads without errors
- [ ] All charts render correctly
- [ ] Filters work properly
- [ ] Data updates when filters change
- [ ] Responsive design works on mobile
- [ ] All interactive elements function

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process using port 3000
npx kill-port 3000

# Or start on different port
PORT=3001 npm start
```

#### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Charts Not Rendering
- Check that Recharts is properly installed
- Verify data format matches expected structure
- Check browser console for errors

#### Styling Issues
- Ensure Tailwind CSS classes are being applied
- Check for conflicting CSS styles
- Verify responsive breakpoints

### Getting Help
1. Check the browser console for error messages
2. Review the GitHub Issues page
3. Ensure all dependencies are properly installed
4. Verify Node.js and npm versions meet requirements

## 📝 Additional Notes

### Performance Considerations
- The dashboard is optimized for datasets up to 1000 students
- For larger datasets, consider implementing pagination
- Use React.memo() for performance optimization if needed

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer not supported
- Mobile browsers fully supported

### Security Considerations
- No sensitive data should be committed to the repository
- Use environment variables for any API keys
- Sanitize any user input if adding input forms

## 🤝 Contributing to the Project

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use consistent indentation (2 spaces)
- Follow React best practices
- Add comments for complex logic
- Use meaningful variable names

---

**Need help?** Open an issue on GitHub or contact the project maintainer.