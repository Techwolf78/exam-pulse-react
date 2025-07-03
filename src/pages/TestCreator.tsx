import { useState } from 'react';
import { Plus, Trash2, GripVertical, Save, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

const TestCreator = () => {
  const [testDetails, setTestDetails] = useState({
    title: '',
    description: '',
    timeLimit: 60,
    shuffleQuestions: false,
    showResults: true,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
      points: 1,
    },
  ]);

  const [currentStep, setCurrentStep] = useState(1);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const renderQuestionEditor = (question: Question, index: number) => (
    <Card key={question.id} className="card-premium">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
            <Badge variant="outline">Question {index + 1}</Badge>
            <Select
              value={question.type}
              onValueChange={(value) => updateQuestion(question.id, 'type', value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
                <SelectItem value="short-answer">Short Answer</SelectItem>
                <SelectItem value="essay">Essay</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={question.points}
              onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))}
              className="w-20"
              min="1"
            />
            <Label className="text-sm text-muted-foreground">pts</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteQuestion(question.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Question</Label>
          <Textarea
            value={question.question}
            onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
            placeholder="Enter your question here..."
            className="mt-1"
          />
        </div>

        {question.type === 'multiple-choice' && (
          <div className="space-y-2">
            <Label>Answer Options</Label>
            {question.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(question.options || [])];
                    newOptions[optionIndex] = e.target.value;
                    updateQuestion(question.id, 'options', newOptions);
                  }}
                  placeholder={`Option ${optionIndex + 1}`}
                />
                <Switch
                  checked={question.correctAnswer === option}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateQuestion(question.id, 'correctAnswer', option);
                    }
                  }}
                />
                <Label className="text-sm text-muted-foreground">Correct</Label>
              </div>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="space-y-2">
            <Label>Correct Answer</Label>
            <Select
              value={question.correctAnswer}
              onValueChange={(value) => updateQuestion(question.id, 'correctAnswer', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select correct answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Test Creator</h1>
          <p className="text-muted-foreground">Create and customize your test</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="btn-ghost-premium">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button className="btn-premium">
            <Save className="w-4 h-4 mr-2" />
            Save Test
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            1
          </div>
          <span className="text-sm font-medium">Test Details</span>
        </div>
        <div className="h-px bg-border flex-1"></div>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            2
          </div>
          <span className="text-sm font-medium">Questions</span>
        </div>
        <div className="h-px bg-border flex-1"></div>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            3
          </div>
          <span className="text-sm font-medium">Settings</span>
        </div>
      </div>

      {/* Test Details */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle>Test Information</CardTitle>
          <CardDescription>Basic details about your test</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Test Title</Label>
              <Input
                id="title"
                value={testDetails.title}
                onChange={(e) => setTestDetails({...testDetails, title: e.target.value})}
                placeholder="Enter test title"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={testDetails.timeLimit}
                onChange={(e) => setTestDetails({...testDetails, timeLimit: parseInt(e.target.value)})}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={testDetails.description}
              onChange={(e) => setTestDetails({...testDetails, description: e.target.value})}
              placeholder="Enter test description"
              className="mt-1"
            />
          </div>
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <Label>Shuffle Questions</Label>
              <p className="text-sm text-muted-foreground">Randomize question order for each student</p>
            </div>
            <Switch
              checked={testDetails.shuffleQuestions}
              onCheckedChange={(checked) => setTestDetails({...testDetails, shuffleQuestions: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Questions ({questions.length})</h2>
          <Button onClick={addQuestion} className="btn-premium">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        {questions.map((question, index) => renderQuestionEditor(question, index))}
      </div>
    </div>
  );
};

export default TestCreator;