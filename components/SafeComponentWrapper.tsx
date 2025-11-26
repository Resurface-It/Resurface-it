'use client'

import { Component, ReactNode } from 'react'

interface SafeComponentWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export class SafeComponentWrapper extends Component<
  SafeComponentWrapperProps,
  { hasError: boolean }
> {
  constructor(props: SafeComponentWrapperProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[SafeComponentWrapper] Error caught:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }

    return this.props.children
  }
}

