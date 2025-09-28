import { Activity, Heart, Thermometer, Users, Calendar, MessageSquare, Video, Phone, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Appointment {
  id: string;
  doctorName: string;
  doctorImage?: string;
  specialty: string;
  time: string;
  type: "consultation" | "follow-up" | "urgent";
}

interface VitalSign {
  id: string;
  type: "blood_pressure" | "heart_rate" | "temperature" | "weight";
  value: string;
  unit: string;
  status: "good" | "warning" | "danger";
  lastUpdated: string;
}

export function MedicalDashboard() {
  const appointments: Appointment[] = [
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      time: "Today, 2:30 PM",
      type: "consultation"
    },
    {
      id: "2", 
      doctorName: "Nurse Anna Berg",
      specialty: "Care Coordinator",
      time: "Tomorrow, 10:00 AM",
      type: "follow-up"
    }
  ];

  const vitals: VitalSign[] = [
    {
      id: "1",
      type: "blood_pressure",
      value: "142/89",
      unit: "mmHg",
      status: "warning",
      lastUpdated: "2 hours ago"
    },
    {
      id: "2",
      type: "heart_rate", 
      value: "72",
      unit: "bpm",
      status: "good",
      lastUpdated: "2 hours ago"
    },
    {
      id: "3",
      type: "weight",
      value: "78.5",
      unit: "kg", 
      status: "good",
      lastUpdated: "This morning"
    }
  ];

  const getVitalIcon = (type: string) => {
    switch (type) {
      case "blood_pressure":
        return <Activity className="h-6 w-6" />;
      case "heart_rate":
        return <Heart className="h-6 w-6" />;
      case "temperature":
        return <Thermometer className="h-6 w-6" />;
      default:
        return <Activity className="h-6 w-6" />;
    }
  };

  const getAppointmentBadgeVariant = (type: string) => {
    switch (type) {
      case "urgent":
        return "destructive";
      case "consultation":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-medical p-6 animate-fade-in">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Health Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Your personal health monitoring center
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="lg" className="bg-gradient-primary shadow-medical">
                <Users className="mr-2 h-5 w-5" />
                Contact Care Team
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Start Chat</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Video className="mr-2 h-4 w-4" />
                <span>Video Call</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Phone className="mr-2 h-4 w-4" />
                <span>Voice Call</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Vital Signs */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-slide-up">
          {vitals.map((vital) => (
            <StatCard
              key={vital.id}
              title={vital.type.replace('_', ' ').toUpperCase()}
              value={vital.value}
              unit={vital.unit}
              status={vital.status}
              trend={vital.status === "good" ? "stable" : "up"}
              trendValue={vital.status === "good" ? "Normal" : "Elevated"}
              icon={getVitalIcon(vital.type)}
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Upcoming Appointments */}
          <Card className="shadow-card-soft animate-slide-up">
            <CardHeader className="flex flex-row items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Upcoming Appointments</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:shadow-card-soft transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={appointment.doctorImage} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {appointment.doctorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.specialty}
                      </p>
                      <p className="text-sm text-foreground">
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getAppointmentBadgeVariant(appointment.type)}>
                    {appointment.type}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Appointments
              </Button>
            </CardContent>
          </Card>

          {/* Treatment Progress */}
          <Card className="shadow-card-soft animate-slide-up">
            <CardHeader className="flex flex-row items-center">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Treatment Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Blood Pressure Goal</span>
                  <span className="font-medium">72% achieved</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-primary h-2 rounded-full transition-all duration-500" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Medication Compliance</span>
                  <span className="font-medium text-success">95%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full transition-all duration-500" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lifestyle Goals</span>
                  <span className="font-medium">58%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full transition-all duration-500" style={{ width: '58%' }}></div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Detailed Progress
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card-soft animate-slide-up">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Activity className="h-6 w-6" />
                <span>Log Vitals</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <MessageSquare className="h-6 w-6" />
                <span>Chat</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Video className="h-6 w-6" />
                <span>Video Call</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Calendar className="h-6 w-6" />
                <span>Book Appointment</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <Heart className="h-6 w-6" />
                <span>Emergency</span>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}