/**
 * QUIZ QUESTIONS FILE
 * ===================
 *
 * HOW TO ADD NEW QUESTIONS:
 * 1. Copy the template below
 * 2. Paste it at the end of the questions array (before the closing bracket)
 * 3. Fill in: category, question, options (4 choices), and correct answer index (0-3)
 *
 * TEMPLATE:
 * {
 *     category: "general",  // See CATEGORIES below
 *     question: "Your question here?",
 *     options: ["Option A", "Option B", "Option C", "Option D"],
 *     correct: 0  // 0=A, 1=B, 2=C, 3=D
 * },
 *
 * CATEGORIES:
 *   - "general"       : General Knowledge
 *   - "science"       : Science
 *   - "history"       : History
 *   - "geography"     : Geography
 *   - "entertainment" : Entertainment & Culture
 *   - "sports"        : Sports
 *   - "technology"    : Technology
 *   - "nature"        : Nature & Animals
 *
 * NOTE: The correct answer index starts at 0
 *       0 = First option, 1 = Second option, 2 = Third option, 3 = Fourth option
 */

const quizQuestions = [
    // ==================== GENERAL KNOWLEDGE ====================
    {
        category: "general",
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correct: 2
    },
    {
        category: "general",
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        category: "general",
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        category: "general",
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        category: "general",
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        category: "general",
        question: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        category: "general",
        question: "What is the currency of Japan?",
        options: ["Yuan", "Won", "Yen", "Ringgit"],
        correct: 2
    },

    // ==================== SCIENCE ====================
    {
        category: "science",
        question: "What is the hardest natural substance on Earth?",
        options: ["Platinum", "Diamond", "Titanium", "Quartz"],
        correct: 1
    },
    {
        category: "science",
        question: "How many bones are in the adult human body?",
        options: ["186", "206", "226", "256"],
        correct: 1
    },
    {
        category: "science",
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: 2
    },
    {
        category: "science",
        question: "What is the speed of light approximately?",
        options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
        correct: 0
    },
    {
        category: "science",
        question: "Which organ in the human body produces insulin?",
        options: ["Liver", "Kidney", "Pancreas", "Heart"],
        correct: 2
    },
    {
        category: "science",
        question: "What is the chemical formula for water?",
        options: ["CO2", "H2O", "NaCl", "O2"],
        correct: 1
    },
    {
        category: "science",
        question: "What planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        correct: 2
    },
    {
        category: "science",
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
        correct: 2
    },

    // ==================== HISTORY ====================
    {
        category: "history",
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
    },
    {
        category: "history",
        question: "Who was the first person to walk on the Moon?",
        options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"],
        correct: 1
    },
    {
        category: "history",
        question: "The Great Wall of China was primarily built to protect against invasions from which direction?",
        options: ["South", "East", "West", "North"],
        correct: 3
    },
    {
        category: "history",
        question: "Which ancient civilization built the pyramids of Giza?",
        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
        correct: 2
    },
    {
        category: "history",
        question: "In what year did the Titanic sink?",
        options: ["1910", "1911", "1912", "1913"],
        correct: 2
    },
    {
        category: "history",
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correct: 2
    },
    {
        category: "history",
        question: "The Renaissance period began in which country?",
        options: ["France", "England", "Spain", "Italy"],
        correct: 3
    },

    // ==================== GEOGRAPHY ====================
    {
        category: "geography",
        question: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correct: 1
    },
    {
        category: "geography",
        question: "Which country has the most natural lakes?",
        options: ["USA", "Russia", "Canada", "Brazil"],
        correct: 2
    },
    {
        category: "geography",
        question: "What is the smallest country in the world by area?",
        options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
        correct: 2
    },
    {
        category: "geography",
        question: "Mount Everest is located in which mountain range?",
        options: ["Alps", "Andes", "Rockies", "Himalayas"],
        correct: 3
    },
    {
        category: "geography",
        question: "Which continent is the Sahara Desert located on?",
        options: ["Asia", "Africa", "Australia", "South America"],
        correct: 1
    },
    {
        category: "geography",
        question: "What is the capital city of Canada?",
        options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
        correct: 3
    },
    {
        category: "geography",
        question: "Which country has the largest population?",
        options: ["USA", "India", "China", "Indonesia"],
        correct: 2
    },

    // ==================== ENTERTAINMENT & CULTURE ====================
    {
        category: "entertainment",
        question: "What is the name of the fictional country in 'Black Panther'?",
        options: ["Wakanda", "Zamunda", "Genovia", "Latveria"],
        correct: 0
    },
    {
        category: "entertainment",
        question: "Which band released the album 'Abbey Road'?",
        options: ["The Rolling Stones", "The Beatles", "Led Zeppelin", "Pink Floyd"],
        correct: 1
    },
    {
        category: "entertainment",
        question: "What is the highest-grossing film of all time (unadjusted for inflation)?",
        options: ["Titanic", "Avengers: Endgame", "Avatar", "Star Wars: The Force Awakens"],
        correct: 2
    },
    {
        category: "entertainment",
        question: "Who wrote the Harry Potter book series?",
        options: ["J.R.R. Tolkien", "J.K. Rowling", "Stephen King", "George R.R. Martin"],
        correct: 1
    },
    {
        category: "entertainment",
        question: "Which streaming service produces 'Stranger Things'?",
        options: ["Amazon Prime", "Hulu", "Netflix", "Disney+"],
        correct: 2
    },
    {
        category: "entertainment",
        question: "What instrument does a pianist play?",
        options: ["Violin", "Guitar", "Piano", "Drums"],
        correct: 2
    },
    {
        category: "entertainment",
        question: "In which city is the TV show 'Friends' set?",
        options: ["Los Angeles", "Chicago", "New York", "Boston"],
        correct: 2
    },

    // ==================== SPORTS ====================
    {
        category: "sports",
        question: "How many players are on a standard soccer team on the field?",
        options: ["9", "10", "11", "12"],
        correct: 2
    },
    {
        category: "sports",
        question: "In which sport would you perform a 'slam dunk'?",
        options: ["Volleyball", "Tennis", "Basketball", "Handball"],
        correct: 2
    },
    {
        category: "sports",
        question: "Which country has won the most FIFA World Cup titles?",
        options: ["Germany", "Argentina", "Italy", "Brazil"],
        correct: 3
    },
    {
        category: "sports",
        question: "How many rings are on the Olympic flag?",
        options: ["4", "5", "6", "7"],
        correct: 1
    },
    {
        category: "sports",
        question: "What is the maximum score in a single frame of bowling?",
        options: ["20", "25", "30", "35"],
        correct: 2
    },
    {
        category: "sports",
        question: "In tennis, what is a score of zero called?",
        options: ["Nil", "Zero", "Love", "Nothing"],
        correct: 2
    },
    {
        category: "sports",
        question: "How many holes are there in a standard round of golf?",
        options: ["9", "12", "18", "21"],
        correct: 2
    },

    // ==================== TECHNOLOGY ====================
    {
        category: "technology",
        question: "What does 'HTML' stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correct: 0
    },
    {
        category: "technology",
        question: "Who is the co-founder of Microsoft?",
        options: ["Steve Jobs", "Mark Zuckerberg", "Bill Gates", "Elon Musk"],
        correct: 2
    },
    {
        category: "technology",
        question: "What does 'CPU' stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
        correct: 0
    },
    {
        category: "technology",
        question: "Which company developed the Android operating system?",
        options: ["Apple", "Microsoft", "Google", "Samsung"],
        correct: 2
    },
    {
        category: "technology",
        question: "What year was YouTube founded?",
        options: ["2003", "2004", "2005", "2006"],
        correct: 2
    },
    {
        category: "technology",
        question: "In which year was the first iPhone released?",
        options: ["2005", "2006", "2007", "2008"],
        correct: 2
    },
    {
        category: "technology",
        question: "What does 'USB' stand for?",
        options: ["Universal Serial Bus", "United System Board", "Ultra Speed Buffer", "Universal System Bridge"],
        correct: 0
    },

    // ==================== NATURE & ANIMALS ====================
    {
        category: "nature",
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    },
    {
        category: "nature",
        question: "How many legs does a spider have?",
        options: ["6", "8", "10", "12"],
        correct: 1
    },
    {
        category: "nature",
        question: "What is a group of lions called?",
        options: ["Pack", "Herd", "Pride", "Flock"],
        correct: 2
    },
    {
        category: "nature",
        question: "Which bird is known for its ability to mimic human speech?",
        options: ["Eagle", "Parrot", "Owl", "Crow"],
        correct: 1
    },
    {
        category: "nature",
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Gazelle", "Horse"],
        correct: 1
    },
    {
        category: "nature",
        question: "How many hearts does an octopus have?",
        options: ["1", "2", "3", "4"],
        correct: 2
    },
    {
        category: "nature",
        question: "What is the largest species of bear?",
        options: ["Grizzly Bear", "Polar Bear", "Black Bear", "Panda Bear"],
        correct: 1
    }

    // ADD MORE QUESTIONS ABOVE THIS LINE
    // Don't forget the comma after each question object!
];

// Category display names (for UI)
const categoryNames = {
    "all": "All Categories",
    "general": "General Knowledge",
    "science": "Science",
    "history": "History",
    "geography": "Geography",
    "entertainment": "Entertainment & Culture",
    "sports": "Sports",
    "technology": "Technology",
    "nature": "Nature & Animals"
};
