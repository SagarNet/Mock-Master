import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  // Update progress whenever current question changes
  useEffect(() => {
    if (questions.length > 0) {
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    }
  }, [currentQuestionIndex, questions]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const parsedQuestions = JSON.parse(data.questionsInput);
      
      // Validate questions before setting state
      parsedQuestions.forEach(q => {
        if (!q.id || !q.question || !q.options || !q.correctAnswer) {
          throw new Error("Missing required fields in question");
        }
        if (!q.options.includes(q.correctAnswer)) {
          throw new Error(`Correct answer not found in options for question ${q.id}`);
        }
      });

      if (Array.isArray(parsedQuestions)) {
        setQuestions(parsedQuestions);
        setTestStarted(true);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowResults(false);
        reset();
      } else {
        alert("Please enter a valid array of questions");
      }
    } catch (error) {
      alert(`Invalid question format: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetTest = () => {
    setTestStarted(false);
    setQuestions([]);
    setAnswers({});
    setShowResults(false);
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((question) => {
      if (answers[question.id] === undefined) {
        unanswered++;
      } else if (answers[question.id] === question.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { correct, incorrect, unanswered };
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
              <div className="p-8 sm:p-10">
                <div className="flex items-center justify-between mb-8 flex-col sm:flex-row">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
                  >
                    MockSprint
                  </motion.h1>
                  <div className="text-sm text-gray-400">
                    Premium Mock Test Platform
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                      <label
                        htmlFor="questions"
                        className="block text-sm font-medium text-gray-300 mb-3"
                      >
                        Enter Questions (JSON format) :
                      </label>
                      <textarea
                        id="questions"
                        rows={12}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                        {...register("questionsInput", {
                          required: "Questions are required",
                        })}
                        placeholder={`Example:\n[\n  {\n    "id": 1,\n    "question": "What is 2+2?",\n    "options": ["3", "4", "5", "6"],\n    "correctAnswer": "4"\n  },\n  {\n    "id": 2,\n    "question": "What is the capital of France?",\n    "options": ["London", "Berlin", "Paris", "Madrid"],\n    "correctAnswer": "Paris"\n  }\n]`}
                      />
                      {errors.questionsInput && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.questionsInput.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                        isLoading
                          ? "bg-purple-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      } text-white shadow-lg transition-all duration-300`}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Start Premium Test</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>

            <div className="mt-8 text-center text-gray-400 text-sm">
              <button
                onClick={toggleSteps}
                className="text-blue-400 font-bold hover:text-blue-300 cursor-pointer"
              >
                How to generate JSON format?
              </button>

              {showSteps && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg text-left">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Open ChatGPT or DeepSeek in your browser</li>
                    <li>
                      Request JSON formatted questions like this:
                      <p className="bg-gray-700 p-2 rounded mt-1 font-mono text-xs">
                        "Create a JSON array of 10 quiz questions about [TOPIC]
                        with: question text, 4 options, and correctAnswer"
                      </p>
                    </li>
                    <li>Copy the generated JSON output</li>
                    <li>Paste it into the above input field</li>
                    <li>
                      After pasting it, Click on start premium test button
                    </li>
                    <li>Enjoy your test, Best of luck for your exams !!</li>
                  </ol>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (showResults) {
    const { correct, incorrect, unanswered } = calculateResults();
    const score = questions.length > 0 
      ? Math.round((correct / questions.length) * 100)
      : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700"
          >
            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  Your Results
                </h1>
                <div className="text-sm text-gray-400">You Scored {score}%</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-gray-700 p-6 rounded-xl border border-green-500/30"
                >
                  <div className="text-5xl font-bold text-green-400 mb-2">
                    {correct}
                  </div>
                  <div className="text-gray-300">Correct Answers</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-700 p-6 rounded-xl border border-red-500/30"
                >
                  <div className="text-5xl font-bold text-red-400 mb-2">
                    {incorrect}
                  </div>
                  <div className="text-gray-300">Incorrect Answers</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-700 p-6 rounded-xl border border-yellow-500/30"
                >
                  <div className="text-5xl font-bold text-yellow-400 mb-2">
                    {unanswered}
                  </div>
                  <div className="text-gray-300">Unanswered Questions</div>
                </motion.div>
                
              </div>

              <div className="mb-8">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                    style={{ width: `${score}%` }} 
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-6">
                {questions.map((q) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-lg border ${
                      answers[q.id] === q.correctAnswer
                        ? "border-green-500/30 bg-green-500/10"
                        : answers[q.id]
                        ? "border-red-500/30 bg-red-500/10"
                        : "border-yellow-500/30 bg-yellow-500/10"
                    }`}
                  >
                    <h3 className="font-medium text-gray-200">{q.question}</h3>
                    <div
                      className={`mt-3 text-sm ${
                        answers[q.id] === q.correctAnswer
                          ? "text-green-400"
                          : answers[q.id]
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      Your answer: {answers[q.id] || "Not answered"}
                    </div>
                    <div className="text-sm text-blue-400">
                      Correct answer: {q.correctAnswer}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetTest}
                className="w-full mt-8 py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium shadow-lg transition-all duration-300"
              >
                Create New Test
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700"
        >
          <div className="h-1.5 bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-bold text-gray-200">ExamPro</h1>
                <p className="text-sm text-gray-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
              <div className="text-sm px-3 py-1 bg-gray-700 rounded-full text-gray-300">
                Current Score:{" "}
                {questions.length > 0
                  ? Math.round(
                      (questions.filter((q) => answers[q.id] === q.correctAnswer).length /
                        questions.length) *
                        100
                    )
                  : 0}
                %
              </div>
            </div>

            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-xl font-medium text-gray-200 mb-6 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      answers[currentQuestion.id] === option
                        ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/50 shadow-lg"
                        : "bg-gray-700 hover:bg-gray-700/80 border border-gray-600"
                    }`}
                    onClick={() =>
                      handleOptionSelect(currentQuestion.id, option)
                    }
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                          answers[currentQuestion.id] === option
                            ? "bg-gradient-to-r from-purple-500 to-blue-500"
                            : "bg-gray-600 border border-gray-500"
                        }`}
                      >
                        {answers[currentQuestion.id] === option && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-200">{option}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="flex justify-between pt-4 border-t border-gray-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`py-2.5 px-6 rounded-lg font-medium ${
                  currentQuestionIndex === 0
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                } transition-all duration-200`}
              >
                Previous
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToNextQuestion}
                className="py-2.5 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium shadow-md transition-all duration-200"
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Finish Test"
                  : "Next"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
