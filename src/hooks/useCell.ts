// src/hooks/useCell.ts
import { useState, useCallback } from 'react';
import { cellRegistry } from '../services/cellRegistry';
import { CellAction, CellResult } from '../types/cell';

export const useCell = (cellId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CellResult | null>(null);

  const execute = useCallback(async (action: CellAction): Promise<CellResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const cellResult = await cellRegistry.execute(cellId, action);
      setResult(cellResult);
      
      if (!cellResult.success) {
        setError(cellResult.error || 'Unknown error');
      }
      
      return cellResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setResult({
        success: false,
        error: errorMessage
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cellId]);

  const cell = cellRegistry.getCell(cellId);

  return {
    cell,
    execute,
    isLoading,
    error,
    result,
    clearError: () => setError(null),
    clearResult: () => setResult(null)
  };
};