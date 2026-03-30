/**
 * Basic Usage Examples
 *
 * Demonstrates core components and common patterns in the
 * Lighthouse Health Design System
 */

import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Container,
  Stack,
  VStack,
  HStack,
  Badge,
  Alert,
  Input,
  Select,
  Progress,
} from '@lighthouse-hlth/ui';

// Example 1: Simple Card with Actions
export function BasicCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainability Dashboard</CardTitle>
        <CardDescription>
          Monitor your healthcare facility's environmental impact
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Track carbon emissions, energy usage, and waste reduction metrics in real-time.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">View Dashboard</Button>
        <Button variant="outline">Learn More</Button>
      </CardFooter>
    </Card>
  );
}

// Example 2: Emissions Tracking Card
export function EmissionsCard() {
  return (
    <Card variant="sustainability" hoverable>
      <CardHeader>
        <HStack justify="between" align="center">
          <CardTitle>Carbon Emissions</CardTitle>
          <Badge variant="emissionsLow" pill>
            23% Reduction
          </Badge>
        </HStack>
      </CardHeader>
      <CardContent>
        <VStack spacing={4}>
          <Progress
            value={77}
            max={100}
            variant="emissionsLow"
            label="Annual Target Progress"
            showLabel
          />

          <Alert variant="success" title="Great Progress!">
            Your facility has reduced emissions by 23% compared to last year,
            exceeding your sustainability goals.
          </Alert>
        </VStack>
      </CardContent>
    </Card>
  );
}

// Example 3: Form Layout
export function SustainabilityForm() {
  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your Footprint</CardTitle>
          <CardDescription>
            Enter your facility details to estimate carbon emissions
          </CardDescription>
        </CardHeader>

        <CardContent>
          <VStack spacing={4}>
            <Input
              label="Facility Name"
              placeholder="Enter facility name"
              helperText="The name of your healthcare facility"
            />

            <Select
              label="Facility Type"
              options={[
                { value: '', label: 'Select facility type' },
                { value: 'hospital', label: 'Hospital' },
                { value: 'clinic', label: 'Clinic' },
                { value: 'urgent-care', label: 'Urgent Care' },
              ]}
            />

            <Input
              label="Monthly Energy Usage (kWh)"
              type="number"
              placeholder="0"
              helperText="Average monthly electricity consumption"
            />
          </VStack>
        </CardContent>

        <CardFooter>
          <Button variant="secondary" fullWidth>
            Calculate Emissions
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}

// Example 4: Dashboard Grid Layout
export function DashboardLayout() {
  return (
    <Container maxWidth="xl">
      <VStack spacing={6}>
        <HStack justify="between" align="center">
          <div>
            <h1 className="text-4xl font-bold text-[#111827]">
              Sustainability Dashboard
            </h1>
            <p className="text-[#6B7280] mt-2">
              Be green, feel green - Track your environmental impact
            </p>
          </div>

          <Button variant="primary">Generate Report</Button>
        </HStack>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#10B981]">-23%</div>
              <p className="text-sm text-[#6B7280]">vs. last year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#0070E0]">87%</div>
              <p className="text-sm text-[#6B7280]">optimization rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#4CAF50]">$45.2K</div>
              <p className="text-sm text-[#6B7280]">this quarter</p>
            </CardContent>
          </Card>
        </div>
      </VStack>
    </Container>
  );
}
