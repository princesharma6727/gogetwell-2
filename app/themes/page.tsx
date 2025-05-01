"use client"

import type React from "react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Leaf, Sparkles } from "lucide-react"

export default function ThemesPage() {
  const { specialty, setSpecialty, isDarkMode, toggleDarkMode } = useTheme()

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Theme Selection</h1>

      <div className="mb-8">
        <Button variant={isDarkMode ? "default" : "outline"} onClick={toggleDarkMode} className="mb-4">
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
      </div>

      <Tabs defaultValue={specialty} onValueChange={(value) => setSpecialty(value as any)}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="default">Default</TabsTrigger>
          <TabsTrigger value="organ-transplant">Organ Transplant</TabsTrigger>
          <TabsTrigger value="cosmetic-surgery">Cosmetic Surgery</TabsTrigger>
        </TabsList>

        <div className="grid gap-6 md:grid-cols-3">
          <ThemeCard
            title="Default Theme"
            description="Our standard medical interface designed for general healthcare needs."
            active={specialty === "default"}
            onClick={() => setSpecialty("default")}
            icon={<Leaf className="h-10 w-10" />}
            colors={["bg-blue-500", "bg-blue-700", "bg-blue-300"]}
          />

          <ThemeCard
            title="Organ Transplant"
            description="Specialized interface for organ transplant specialists and patients."
            active={specialty === "organ-transplant"}
            onClick={() => setSpecialty("organ-transplant")}
            icon={<Heart className="h-10 w-10" />}
            colors={["bg-green-500", "bg-green-700", "bg-green-300"]}
          />

          <ThemeCard
            title="Cosmetic Surgery"
            description="Elegant interface designed for cosmetic surgery practices."
            active={specialty === "cosmetic-surgery"}
            onClick={() => setSpecialty("cosmetic-surgery")}
            icon={<Sparkles className="h-10 w-10" />}
            colors={["bg-purple-500", "bg-purple-700", "bg-purple-300"]}
          />
        </div>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Theme Preview</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <PreviewCard specialty={specialty} />
          <PreviewForm specialty={specialty} />
        </div>
      </div>
    </div>
  )
}

interface ThemeCardProps {
  title: string
  description: string
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  colors: string[]
}

function ThemeCard({ title, description, active, onClick, icon, colors }: ThemeCardProps) {
  return (
    <Card className={`overflow-hidden ${active ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-center mb-4">{icon}</div>
        <div className="flex gap-2 justify-center">
          {colors.map((color, i) => (
            <div key={i} className={`${color} w-6 h-6 rounded-full`} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} variant={active ? "default" : "outline"} className="w-full">
          {active ? "Current Theme" : "Select Theme"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function PreviewCard({ specialty }: { specialty: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Preview: UI Components</CardTitle>
        <CardDescription>See how UI elements look in this theme</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Typography</h3>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Heading 1</h1>
            <h2 className="text-xl font-semibold">Heading 2</h2>
            <p className="text-sm text-muted-foreground">
              This is how paragraph text appears in the {specialty} theme.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PreviewForm({ specialty }: { specialty: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Preview: Form Elements</CardTitle>
        <CardDescription>See how forms look in this theme</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Patient Name
            </label>
            <input id="name" placeholder="Enter patient name" className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="patient@example.com"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <Button type="button" className="w-full">
            Submit Form
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
