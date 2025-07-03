import { useState } from 'react';
import { Users, FileText, TrendingUp, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    totalTests: 24,
    activeUsers: 156,
    completedTests: 1420,
    avgScore: 78.5
  });

  const recentTests = [
    { id: 1, name: 'Mathematics Quiz 2024', students: 45, status: 'active', created: '2 days ago' },
    { id: 2, name: 'Science Assessment', students: 32, status: 'draft', created: '1 week ago' },
    { id: 3, name: 'History Final Exam', students: 28, status: 'completed', created: '2 weeks ago' },
    { id: 4, name: 'English Literature Test', students: 51, status: 'active', created: '3 days ago' },
  ];

  const recentActivity = [
    { action: 'Test "Math Quiz" completed by John Doe', time: '5 minutes ago' },
    { action: 'New user "Jane Smith" registered', time: '1 hour ago' },
    { action: 'Test "Science Assessment" published', time: '2 hours ago' },
    { action: 'Results exported for "History Exam"', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-lg transition-all px-6 py-2">
          <Plus className="w-4 h-4 mr-2" />
          Create New Test
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalTests}</p>
              </div>
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeUsers}</p>
              </div>
              <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Tests</p>
                <p className="text-2xl font-bold text-foreground">{stats.completedTests}</p>
              </div>
              <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-foreground">{stats.avgScore}%</p>
              </div>
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tests */}
        <Card className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle>Recent Tests</CardTitle>
            <CardDescription>Your latest test activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{test.name}</h4>
                    <p className="text-sm text-muted-foreground">{test.students} students • {test.created}</p>
                  </div>
                  <Badge 
                    variant={
                      test.status === 'active' ? 'default' : 
                      test.status === 'completed' ? 'secondary' : 
                      'outline'
                    }
                    className="ml-2"
                  >
                    {test.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;