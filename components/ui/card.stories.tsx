import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component built with shadcn/ui patterns. Perfect for displaying content in a contained, elevated container.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a simple card with just a title and content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Status</CardTitle>
          <Badge variant="success">Active</Badge>
        </div>
        <CardDescription>Current project status and details</CardDescription>
      </CardHeader>
      <CardContent>
        <p>The project is currently in active development with all milestones on track.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button>Edit Project</Button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>WakeCap Pro</CardTitle>
        <CardDescription>Advanced safety management solution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Price:</span>
            <span className="font-semibold">$299/month</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Users:</span>
            <span>Up to 100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Features:</span>
            <span>All included</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="wakecap">
          Get Started
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">JD</span>
          </div>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Email:</span>
            <span className="text-sm">john.doe@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Department:</span>
            <span className="text-sm">Engineering</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge variant="success">Active</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Button variant="outline" className="flex-1">Message</Button>
        <Button className="flex-1">View Profile</Button>
      </CardFooter>
    </Card>
  ),
};

export const Statistics: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,350</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231</div>
          <p className="text-xs text-muted-foreground">+15.3% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 from last week</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">94.5%</div>
          <p className="text-xs text-muted-foreground">+1.2% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Notification: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">New Notification</CardTitle>
          <Badge variant="destructive">Urgent</Badge>
        </div>
        <CardDescription>System alert from WakeCap Safety</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm">
            A safety incident has been reported at Site Alpha. Please review the details and take appropriate action.
          </p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>•</span>
            <span>Reported 2 minutes ago</span>
            <span>•</span>
            <span>Site Alpha</span>
            <span>•</span>
            <span>High Priority</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Button variant="outline" className="flex-1">Dismiss</Button>
        <Button variant="destructive" className="flex-1">View Details</Button>
      </CardFooter>
    </Card>
  ),
};
