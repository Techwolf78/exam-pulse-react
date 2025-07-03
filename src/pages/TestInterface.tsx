import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  points: number;
}

interface Answer {
  questionId: string;
  answer: string;
  flagged: boolean;
}

const TestInterface = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());

  // Demo test data
  const [test] = useState({
    id: testId,
    title: 'Mathematics Final Exam',
    description: 'Comprehensive mathematics assessment covering algebra, geometry, and calculus.',
    timeLimit: 60,
    questions: [
      {
        id: '1',
        type: 'multiple-choice' as const,
        question: 'What is the derivative of x²?',
        options: ['x', '2x', 'x²', '2x²'],
        points: 2,
      },
      {
        id: '2',
        type: 'multiple-choice' as const,
        question: 'What is the area of a circle with radius r?',
        options: ['πr', 'πr²', '2πr', 'πr³'],
        points: 2,
      },
      {
        id: '3',
        type: 'true-false' as const,
        question: 'The sum of angles in a triangle is always 180 degrees.',
        points: 1,
      },
      {
        id: '4',
        type: 'short-answer' as const,
        question: 'Solve for x: 2x + 5 = 13',
        points: 3,
      },
      {
        id: '5',
        type: 'essay' as const,
        question: 'Explain the Pythagorean theorem and provide an example of its application.',
        points: 5,
      },
    ],
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === test.questions[currentQuestionIndex].id);
  };

  const updateAnswer = (answer: string) => {
    const questionId = test.questions[currentQuestionIndex].id;
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => 
          a.questionId === questionId ? { ...a, answer } : a
        );
      }
      return [...prev, { questionId, answer, flagged: false }];
    });
  };

  const toggleFlag = () => {
    const questionId = test.questions[currentQuestionIndex].id;
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    // In a real app, submit answers to backend
    navigate('/results');
  };

  const currentQuestion = test.questions[currentQuestionIndex];
  const currentAnswer = getCurrentAnswer();
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;
  const answeredCount = answers.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Test Header */}
      <Card className="card-premium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{test.title}</CardTitle>
              <CardDescription>{test.description}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className={`font-mono font-medium ${timeRemaining < 300 ? 'text-destructive' : ''}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                {answeredCount}/{test.questions.length} Answered
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {test.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Content */}
      <Card className="card-premium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Question {currentQuestionIndex + 1}</Badge>
              <Badge variant="secondary">{currentQuestion.points} points</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFlag}
              className={flaggedQuestions.has(currentQuestion.id) ? 'text-warning' : 'text-muted-foreground'}
            >
              <Flag className="w-4 h-4 mr-2" />
              Flag for Review
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice */}
            {currentQuestion.type === 'multiple-choice' && (
              <RadioGroup 
                value={currentAnswer?.answer || ''} 
                onValueChange={updateAnswer}
              >
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {/* True/False */}
            {currentQuestion.type === 'true-false' && (
              <RadioGroup 
                value={currentAnswer?.answer || ''} 
                onValueChange={updateAnswer}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="true" />
                    <Label 
                      htmlFor="true" 
                      className="flex-1 cursor-pointer p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                    >
                      True
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="false" />
                    <Label 
                      htmlFor="false" 
                      className="flex-1 cursor-pointer p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                    >
                      False
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            )}

            {/* Short Answer */}
            {(currentQuestion.type === 'short-answer' || currentQuestion.type === 'essay') && (
              <Textarea
                value={currentAnswer?.answer || ''}
                onChange={(e) => updateAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-32"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentQuestionIndex === test.questions.length - 1 ? (
            <Button onClick={handleSubmitTest} className="btn-premium">
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Test
            </Button>
          ) : (
            <Button
              onClick={goToNextQuestion}
              className="btn-premium"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Question Navigator */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="text-sm">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {test.questions.map((_, index) => {
              const isAnswered = answers.some(a => a.questionId === test.questions[index].id);
              const isFlagged = flaggedQuestions.has(test.questions[index].id);
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <Button
                  key={index}
                  variant={isCurrent ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 p-0 ${
                    isAnswered ? 'bg-success-light border-success' : ''
                  } ${isFlagged ? 'border-warning' : ''}`}
                >
                  {index + 1}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestInterface;