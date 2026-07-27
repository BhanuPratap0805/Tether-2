import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchRiskScore, type RiskContext } from '../services/safetyService';
import type { RiskScore, Coordinates } from '../types';

export function useSafeWalk() {
  const [isActive, setIsActive] = useState(false);
  const [riskScore, setRiskScore] = useState<RiskScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const locationRef = useRef<Coordinates | null>(null);
  const speedRef = useRef(0);
  const stopsRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  const startWalk = useCallback((currentLocation: Coordinates | null) => {
    setIsActive(true);
    locationRef.current = currentLocation;
    // Trigger immediate analysis
    triggerAnalysis();
    
    // Set up periodic analysis (every 30 seconds to save API calls/battery)
    intervalRef.current = window.setInterval(() => {
      triggerAnalysis();
    }, 30000); 
  }, []);

  const stopWalk = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const triggerAnalysis = async () => {
    setIsAnalyzing(true);
    const context: RiskContext = {
      location: locationRef.current || undefined,
      currentSpeed: speedRef.current,
      recentStops: stopsRef.current,
      // In a real app, you'd calculate this by comparing current path to historical paths
      isOnUsualRoute: true, 
    };
    
    const newScore = await fetchRiskScore(context);
    setRiskScore(newScore);
    setIsAnalyzing(false);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    isActive,
    riskScore,
    isAnalyzing,
    startWalk,
    stopWalk,
    triggerAnalysis,
  };
}
