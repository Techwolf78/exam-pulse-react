import { useState } from 'react';
import { Download, Eye, Filter, Search, TrendingUp, Users, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TestResult {
  id: string;
  testName: string;
  studentName: string;
  studentEmail: string;
  score: number;
  maxScore: number;
  completedAt: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

const Results = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTest, setFilterTest] = useState('all');

  const [results] = useState<TestResult[]>([
    {
      id: '1',
      testName: 'Mathematics Final Exam',
      studentName: 'John Doe',
      studentEmail: 'john.doe@example.com',
      score: 85,
      maxScore: 100,
      completedAt: '2024-01-15 14:30',
      duration: '45 min',
      status: 'completed',
    },
    {
      id: '2',
      testName: 'Science Assessment',
      studentName: 'Jane Smith',
      studentEmail: 'jane.smith@example.com',
      score: 92,
      maxScore: 100,
      completedAt: '2024-01-15 16:20',
      duration: '38 min',
      status: 'completed',
    },
    {
      id: '3',
      testName: 'History Quiz',
      studentName: 'Mike Johnson',
      studentEmail: 'mike.johnson@example.com',
      score: 78,
      maxScore: 100,
      completedAt: '2024-01-14 10:15',
      duration: '25 min',
      status: 'completed',
    },
    {
      id: '4',
      testName: 'Mathematics Final Exam',
      studentName: 'Sarah Wilson',
      studentEmail: 'sarah.wilson@example.com',
      score: 0,
      maxScore: 100,
      completedAt: '',
      duration: '',
      status: 'in-progress',
    },
    {
      id: '5',
      testName: 'English Literature Test',
      studentName: 'Tom Brown',
      studentEmail: 'tom.brown@example.com',
      score: 88,
      maxScore: 100,
      completedAt: '2024-01-13 09:45',
      duration: '52 min',
      status: 'completed',
    },
  ]);

  const filteredResults = results.filter(result => {
    const matchesSearch = 
      result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
    const matchesTest = filterTest === 'all' || result.testName === filterTest;
    
    return matchesSearch && matchesStatus && matchesTest;
  });

  const stats = {
    totalResults: results.length,
    averageScore: Math.round(results.filter(r => r.status === 'completed').reduce((acc, r) => acc + (r.score / r.maxScore) * 100, 0) / results.filter(r => r.status === 'completed').length),
    completedTests: results.filter(r => r.status === 'completed').length,
    inProgressTests: results.filter(r => r.status === 'in-progress').length,
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-primary';
    if (percentage >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success-light text-success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="border-warning text-warning">In Progress</Badge>;
      case 'not-started':
        return <Badge variant="secondary">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const uniqueTests = [...new Set(results.map(r => r.testName))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Results & Reports</h1>
          <p className="text-muted-foreground">View and analyze test performance data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="btn-ghost-premium">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button className="btn-premium">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Results</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalResults}</p>
              </div>
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-foreground">{stats.averageScore}%</p>
              </div>
              <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{stats.completedTests}</p>
              </div>
              <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-foreground">{stats.inProgressTests}</p>
              </div>
              <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="card-premium">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by student name, email, or test..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterTest} onValueChange={setFilterTest}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by test" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tests</SelectItem>
                {uniqueTests.map(test => (
                  <SelectItem key={test} value={test}>{test}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle>Test Results ({filteredResults.length})</CardTitle>
          <CardDescription>Detailed view of all test submissions and scores</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{result.studentName}</p>
                      <p className="text-sm text-muted-foreground">{result.studentEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">{result.testName}</p>
                  </TableCell>
                  <TableCell>
                    {result.status === 'completed' ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getScoreColor(result.score, result.maxScore)}`}>
                            {result.score}/{result.maxScore}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({Math.round((result.score / result.maxScore) * 100)}%)
                          </span>
                        </div>
                        <Progress 
                          value={(result.score / result.maxScore) * 100} 
                          className="h-1 w-20"
                        />
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(result.status)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {result.completedAt || '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {result.duration || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;