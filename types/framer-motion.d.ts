// Type declarations to fix Framer Motion compatibility issues

declare module 'framer-motion' {
  export interface MotionProps {
    className?: string
  }
}