"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Leaf, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { specialty } = useTheme()

  // Theme-specific content
  const themeContent = {
    default: {
      title: "Welcome to GoGetWell.ai",
      subtitle: "Your Comprehensive Healthcare Platform",
      description: "Providing advanced healthcare solutions for medical professionals and patients.",
      cta: "Get Started",
      icon: <Leaf className="h-12 w-12" />,
      features: [
        {
          title: "Patient Management",
          description: "Streamline patient records and appointments",
        },
        {
          title: "Medical Resources",
          description: "Access the latest medical research and guidelines",
        },
        {
          title: "Telehealth",
          description: "Connect with patients remotely and securely",
        },
      ],
    },
    "organ-transplant": {
      title: "Organ Transplant Specialists",
      subtitle: "Advanced Transplant Management System",
      description: "Specialized tools for organ transplant coordination, donor matching, and patient care.",
      cta: "Explore Transplant Solutions",
      icon: <Heart className="h-12 w-12" />,
      features: [
        {
          title: "Donor Matching",
          description: "Advanced algorithms for optimal donor-recipient matching",
        },
        {
          title: "Transplant Scheduling",
          description: "Coordinate complex transplant procedures efficiently",
        },
        {
          title: "Post-Transplant Care",
          description: "Comprehensive follow-up and medication management",
        },
      ],
    },
    "cosmetic-surgery": {
      title: "Cosmetic Surgery Excellence",
      subtitle: "Transform Your Practice",
      description: "Elegant solutions for cosmetic surgery practices, from consultation to post-operative care.",
      cta: "Elevate Your Practice",
      icon: <Sparkles className="h-12 w-12" />,
      features: [
        {
          title: "Visual Consultations",
          description: "Interactive 3D modeling for procedure visualization",
        },
        {
          title: "Aesthetic Portfolio",
          description: "Showcase your work with secure before/after galleries",
        },
        {
          title: "Recovery Tracking",
          description: "Monitor patient recovery with custom milestones",
        },
      ],
    },
  }

  const content = themeContent[specialty as keyof typeof themeContent]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <div className="flex justify-center mb-6">{content.icon}</div>
        <h1 className="text-4xl font-bold mb-4 md:text-5xl lg:text-6xl">{content.title}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">{content.subtitle}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">{content.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/themes">{content.cta}</Link>
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {content.features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Customize Your Experience</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Try our different specialty themes to find the perfect interface for your medical practice.
        </p>
        <Button asChild>
          <Link href="/themes">Explore Themes</Link>
        </Button>
      </section>
    </div>
  )
}
