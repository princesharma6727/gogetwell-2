"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define theme types
type ThemeSpecialty = "default" | "organ-transplant" | "cosmetic-surgery"

// Theme state interface
interface ThemeState {
  specialty: ThemeSpecialty
  isDarkMode: boolean
  setSpecialty: (specialty: ThemeSpecialty) => void
  toggleDarkMode: () => void
}

// Create Zustand store with persistence
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      specialty: "default",
      isDarkMode: false,
      setSpecialty: (specialty) => set({ specialty }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "gogetwell-theme",
    },
  ),
)

// Create context for theme
type ThemeProviderProps = {
  children: React.ReactNode
  defaultSpecialty?: ThemeSpecialty
  defaultDarkMode?: boolean
}

type ThemeProviderState = {
  specialty: ThemeSpecialty
  isDarkMode: boolean
  setSpecialty: (specialty: ThemeSpecialty) => void
  toggleDarkMode: () => void
}

const initialState: ThemeProviderState = {
  specialty: "default",
  isDarkMode: false,
  setSpecialty: () => null,
  toggleDarkMode: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultSpecialty, defaultDarkMode = false }: ThemeProviderProps) {
  const themeStore = useThemeStore()

  // Initialize theme from store or props
  const [specialty, setSpecialtyState] = useState<ThemeSpecialty>(themeStore.specialty || defaultSpecialty || "default")

  const [isDarkMode, setIsDarkMode] = useState<boolean>(themeStore.isDarkMode || defaultDarkMode)

  // Update the theme in the store and state
  const setSpecialty = (newSpecialty: ThemeSpecialty) => {
    themeStore.setSpecialty(newSpecialty)
    setSpecialtyState(newSpecialty)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    themeStore.toggleDarkMode()
    setIsDarkMode(!isDarkMode)
  }

  // Apply theme classes to document
  useEffect(() => {
    const root = document.documentElement

    // Remove all theme classes
    root.classList.remove("theme-default", "theme-organ-transplant", "theme-cosmetic-surgery")

    // Add current theme class
    root.classList.add(`theme-${specialty}`)

    // Toggle dark mode class
    if (isDarkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [specialty, isDarkMode])

  const value = {
    specialty,
    isDarkMode,
    setSpecialty,
    toggleDarkMode,
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
