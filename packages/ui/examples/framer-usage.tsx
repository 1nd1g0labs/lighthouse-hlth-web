/**
 * Framer-Specific Usage Examples
 *
 * Demonstrates how to use Lighthouse Health components in Framer
 * with motion and animation support
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Container,
  VStack,
  Badge,
  framerAnimations,
} from '@lighthouse-hlth/ui/framer';

// Example 1: Animated Hero Section for Framer
export function AnimatedHero() {
  return (
    <Container maxWidth="xl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Badge variant="secondary" size="lg" pill>
            Be green, feel green
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-6xl font-bold text-[#111827] mt-6"
        >
          Sustainable Healthcare Operations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-[#6B7280] mt-4 max-w-2xl mx-auto"
        >
          Less is more. Track your environmental footprint and achieve
          sustainable financial health.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </Container>
  );
}

// Example 2: Staggered Card Grid for Framer
export function StaggeredCardGrid() {
  const cards = [
    {
      title: 'Carbon Tracking',
      description: 'Monitor emissions in real-time',
      icon: '🌱',
      color: 'emissionsLow' as const,
    },
    {
      title: 'Energy Efficiency',
      description: 'Optimize resource usage',
      icon: '⚡',
      color: 'primary' as const,
    },
    {
      title: 'Cost Savings',
      description: 'Reduce operational expenses',
      icon: '💰',
      color: 'secondary' as const,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Container maxWidth="xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {cards.map((card, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card
              hoverable
              variant="sustainability"
              className="h-full cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{card.icon}</span>
                  <div>
                    <CardTitle>{card.title}</CardTitle>
                    <Badge variant={card.color} size="sm" className="mt-2">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#6B7280]">{card.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}

// Example 3: Framer Code Component
// This can be directly used in Framer as a Code Component
export function FramerCodeComponent({
  title = 'Sustainability Metric',
  value = '85%',
  trend = '+12%',
  variant = 'primary',
}: {
  title?: string;
  value?: string;
  trend?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card hoverable variant="elevated">
        <CardContent>
          <VStack spacing={2}>
            <p className="text-sm font-medium text-[#6B7280]">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[#111827]">{value}</span>
              <Badge
                variant={variant}
                size="sm"
                className="self-center"
              >
                {trend}
              </Badge>
            </div>
          </VStack>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Framer property controls for the above component
FramerCodeComponent.displayName = 'SustainabilityMetric';

// Export property controls for Framer
export const propertyControls = {
  title: {
    type: 'string',
    defaultValue: 'Sustainability Metric',
  },
  value: {
    type: 'string',
    defaultValue: '85%',
  },
  trend: {
    type: 'string',
    defaultValue: '+12%',
  },
  variant: {
    type: 'enum',
    options: ['primary', 'secondary', 'accent'],
    defaultValue: 'primary',
  },
};
